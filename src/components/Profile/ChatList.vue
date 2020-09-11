<template lang="pug">
  .content-wrapper
    .loading-indicator
      loading(
        :active.sync = "this.loading"
        is-full-page = true
        color = "#763dca"
        :opacity = 0.5)
    .chatList
      .chat-fragment(v-for = '(chats, i) in chatList'
      @click = 'goToChat(chats.id)'
      )
        .chat-header
          .chat-image(v-if = 'chats.image === undefined')
            img.img_round(src="@/components/images/user.png")
          .chat-image(v-else)
            img.image_round(:src = "chats.image")
          .chat-info
            .chat-name
              label
                strong(v-if = 'chats.type === "group"') {{ chats.name }}
                strong(v-else) {{ chats['members'][chats.name] }}
            .chat-message(v-if = 'chats.msgCnt > 0')
              label
                span {{ chatList[i].members[chats.msgs[chats.msgCnt - 1].sender] }}: {{ chats.msgs[chats.msgCnt - 1].text }}
          .chat-time(v-if = 'chats.msgCnt > 0')
            label {{ chats.msgs[chats.msgCnt - 1].time }}
          .chat-border(v-if = 'i < chatList.length - 1')
    .newChatButton
      md-button.md-fab.md-fab-bottom-right.md-primary(@click = 'createNewChat()')
        md-icon add
    .joinMenu(v-if = 'this.joinMenuShow')
      .joinMenuBox(v-if = '!groupChat')
        .joinMenuText
          span.md-headline Введите почту собеседника
        .joinMenuField
          input(
                  type="text"
                  placeholder="Введите email"
                  v-model="personalEmail"
          )
        .joinMenuCancel
          .button.button--round.button-success(@click ='createChat("personal")') Готово
          .button.button--round.button-success(@click ='groupChat = true') Создать групповой чат
          .button.button--round.button-warning(@click ='joinMenuShow = false')  Отмена

      // Сверху персональное меню, снизу - групповое

      .joinMenuBox(v-else)
        .joinMenuText
          span.groupHeadText.md-headline Добавить пользователя
          md-button.buttonAdd.md-fab.md-primary(@click ='groupEmail.push("")')
            md-icon add
        .joinMenuField
          input.nameField(
                  type="text"
                  placeholder="Введите название чата"
                  v-model="groupName"
          )
        label(for='img') Выберите картинку
        input#img(type='file', name='img', accept='image/*', @change="onFileSelected")
        .joinMenuField(v-for = '(email, i) in groupEmail')
          input.emailField(
                  type="text"
                  placeholder="Введите email"
                  v-model="groupEmail[i]"
          )
          md-button.removeButton.md-accent.md-raised(@click ='groupEmail.splice(i, 1)') X
        .joinMenuCancel
          .button.button--round.button-success(@click ='createChat("group")') Готово
          .button.button--round.button-success(@click ='groupChat = false') Создать персональный чат
          .button.button--round.button-warning(@click ='joinMenuShow = false')  Отмена
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import firebase from 'firebase/app'
import 'firebase/firestore'
import Loading from 'vue-loading-overlay'

export default {
  components: {
    Loading
  },
  data () {
    return {
      chatList: [],
      joinMenuShow: false,
      groupChat: false,
      personalEmail: '',
      groupEmail: [''],
      groupName: '',
      groupPhoto: null,
      error: '',
      loading: false
    }
  },
  methods: {
    ...mapActions(['fetchMyChats']),
    goToChat (id) {
      this.$router.push('/pm/' + id)
    },
    createNewChat () {
      this.joinMenuShow = true
    },
    async createChat (type) {
      this.loading = true
      const db = firebase.firestore()
      var chatName = null
      var chatId = null
      var chatInfo = {
        members: [],
        chat_type: type,
        all_message: 0
      }
      var chatMembers = new Set()
      chatMembers.add(this.getUser.id)
      if (type === 'personal') {
        await db.collection('account').where('email', '==', this.personalEmail)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              chatName = doc.id
              chatMembers.add(doc.id)
            })
          })
      } else {
        chatName = this.groupName
        for (let i = 0; i < this.groupEmail.length; i++) {
          await db.collection('account').where('email', '==', this.groupEmail[i])
            .get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                chatMembers.add(doc.id)
              })
            })
        }
      }
      chatInfo.members = Array.from(chatMembers)
      if (chatName === null) {
        this.error = 'Пользователь не найден'
        alert(this.error)
        return
      } else if (type === 'group' && chatInfo.members.length < 3) {
        this.groupEmail.length < 3 ? this.error = 'В групповом чате должно быть хотя бы 3 пользователя' : this.error = 'Пользователи не найдены'
        alert(this.error)
        return
      } else if (type === 'personal' && chatInfo.members.length === 1) {
        this.error = 'Нельзя создать диалог с самим собой'
        alert(this.error)
        return
      }
      var exists = false
      if (type === 'personal') {
        chatInfo.members.sort()
        chatId = chatInfo.members[0] + '_' + chatInfo.members[1]
        await db.collection('chat').doc(chatId).get().then(doc => {
          if (doc.exists) exists = true
        })
      } else {
        chatInfo.name = chatName
        chatId = await this.generateToken(7)
        if (this.groupPhoto !== undefined) {
          let file = this.groupPhoto
          let fileName = file.name
          const fileReader = new FileReader()
          fileReader.readAsDataURL(file)
          const ext = fileName.slice(fileName.lastIndexOf('.'))
          let currentTime = new Date().getTime()
          let imageUrl
          let imageTimeName = 'uploads/' + currentTime + ext
          await firebase.storage().ref(imageTimeName).put(file)
          await firebase.storage().ref(imageTimeName).getDownloadURL().then(function (url) { imageUrl = url })
          chatInfo.image = imageUrl
        }
      }
      if (exists) {
        this.error = 'Диалог уже существует'
        this.$router.push('/pm/' + chatId)
        return
      }
      // console.log(chatId, chatInfo)
      await db.collection('chat').doc(chatId).set(chatInfo)
      // Добавление в myChats для каждого пользователя
      for (let j = 0; j < chatInfo.members.length; j++) {
        var myChats = []
        await db.collection('account').doc(chatInfo.members[j]).get().then(doc => {
          var data = doc.data()
          if (data.myChats !== undefined) myChats = data.myChats
          // console.log('Existing data: ', myChats)
        })
        myChats.push(chatId)
        // console.log('Writing new data: ', myChats, 'to ', chatInfo.members[j])
        await db.collection('account').doc(chatInfo.members[j]).set({
          myChats: myChats
        }, { merge: true })
      }
      this.loading = false
      this.$router.push('/pm/' + chatId)
    },
    async generateToken (length) {
      var a = 'abcdefghijklmnopqrstuvwxyz'.split('')
      var b = []

      var succes = false
      while (!succes) {
        for (var i = 0; i < length; i++) {
          var j = (Math.random() * (a.length - 1)).toFixed(0)
          b[i] = a[j]
        }
        try {
          succes = await this.isTokenValid(b.join(''))
        } catch (error) {
          b = ['a', 'a', 'a', 'a', 'a']
          succes = true
          throw error
        }
      }
      return b.join('')
    },
    async isTokenValid (token) {
      const db = firebase.firestore()
      var result
      await db.collection('chat').doc(token)
        .get().then(
          doc => {
            if (doc.exists) {
              result = false
            } else result = true
          })
      console.log('Result: ', result)
      return result
    },
    onFileSelected (event) {
      this.groupPhoto = event.target.files[0]
    }
  },
  async mounted () {
    this.loading = true
    await this.fetchMyChats()
    this.chatList = this.getMyChats
    // console.log(this.chatList)
    this.loading = false
  },
  computed: {
    ...mapGetters(['getMyChats', 'getUser'])
  }
}
</script>

<style lang="stylus" scoped>
  .md-fab
   position fixed
  .loading-indicator
    z-index 50001
  .buttonAdd
    width 50px
    height 50px
  .emailField
    width 90%
  .removeButton
    min-width 0
    width 30px
    height 30px
  .joinMenuText
    font-size 1.3em
    padding-bottom 1%
  .joinMenuField
    input
      border-color #000000
      border-width 1%
  .joinMenu
    z-index 50000
    font-family Roboto, Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    font-size 2vw
    background-color rgba(0, 0, 0, .5)
    width 100%
    height 100%
    position fixed
    top 0
    left 0
  .joinMenuBox
    padding 5%
    padding-left 10%
    padding-right 10%
    text-align center
    background-color #FFFFFF
    margin-top 10%
    margin-left 20%
    margin-right 20%
    min-width 350px
    border 2px #000000 solid
    border-radius 10px
    .button
      font-size 0.6em
      margin 2%

  .content-wrapper
    min-height 0
  .chatList
    margin-left 25%
    margin-right 25%
    margin-top 5%
    width auto
    height auto
    background-color #FCFCFF
    box-shadow 0 0 5px rgba(0,0,0,0.5)
    border-radius 20px 20px 20px 20px
    @media screen and (max-width: 2600px) {
      margin-left 16%
      margin-right 16%
    }
    @media screen and (max-width: 2100px) {
      margin-left 16%
      margin-right 16%
    }

  .chat-header
    width 100%
    margin-top 30px
    margin-bottom 30px
    margin-left 30px
    border-margin-left 20px

  .chat-border
    width auto
    height 2px
    margin-top 20px
    margin-left 230px
    background-color #aaaaaa

  .chatFrame
    width 100%
    height auto
    float right

  .chat-fragment
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    display flex
    &:hover
      cursor pointer
  .chat-image
    display inline-block
    width 200px
    height auto
    overflow hidden
    border-radius 50%
    vertical-align middle

  .chat-info
    display inline-block
    margin-left 50px
    vertical-align middle
  .chat-name
    margin-top 10px
    label
      font-size 2.6em
      color #763DCA
  .chat-message
    margin-top 10%
    margin-bottom 2%
    label
      font-size 1.5em
      color #666174
      text-align bottom
  .chat-empty
    width 60%
  .chat-time
    display inline-block
    width 300px
    height auto
    float right
    margin-top 40px
    label
      font-size 1.2em
      color #696174
      text-align center
</style>
