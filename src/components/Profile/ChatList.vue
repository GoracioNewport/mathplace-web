<template lang="pug">
  .content-wrapper
    .loading-indicator
      loading(
        :active.sync = "this.loading"
        is-full-page = true
        color = "#763dca"
        :opacity = 0.5)
    .chatList
      div(v-if ='chatList.length === 0')
        //- .chat-fragment
          //- md-empty-state(md-icon='devices_other' md-label='Create your first project' md-description="Creating project, you'll be able to upload your design and collaborate with people.")
        md-empty-state(md-rounded='' md-icon='create' md-label=" У вас нету ни одного чата" md-description="Создайте личный или гурпповой чат")
          md-button.md-primary.md-raised(@click = 'createNewChat()') Создать чат

      div(v-else)
        .chat-fragment(v-for = '(chats, i) in chatList'
        @click = 'goToChat(chats.id)'
        )
          .chat-header
            .chat-image(v-if = 'chats.image === undefined')
              img(src="@/components/images/user.png")
            .chat-image(v-else)
              img.image_round(:src = "chats.image")
            .chat-info(v-if='chats.msgs[chats.msgCnt - 1] !== undefined')
              div.chat-top
                .chat-time(v-if = 'chats.msgCnt > 0 && chats.msgs[chats.msgCnt - 1] !== null')
                  label {{ chats.msgs[chats.msgCnt - 1].time }}
                .chat-name
                  label
                    strong(v-if = 'chats.type === "group"') {{ chats.name }}
                    strong(v-else) {{ chats['members'][chats.name] }}
              .chat-message(v-if = 'chats.msgCnt > 0')
                label
                  span(v-if ='chatList[i].members[chats.msgs[chats.msgCnt - 1].sender] === undefined') {{ chats.msgs[chats.msgCnt - 1].text }}
                  span(v-else) {{ chatList[i].members[chats.msgs[chats.msgCnt - 1].sender] }}: {{ chats.msgs[chats.msgCnt - 1].text }}
          .chat-border(v-if = 'i < chatList.length - 1')
    .newChatButton
      //- md-button.md-fab.mdc-fab--extended.md-fab-bottom-right.md-primary(@click = 'createNewChat()')
      //-   md-icon add
      button.button--round.designButtonLesson.md-fab-bottom-right.md-primary.md-fab(@click = 'createNewChat()') Создать новый чат

    .joinMenu(v-if = 'this.joinMenuShow')
      .joinMenuMain
        img(src="@/components/images/clear.png", @click ='joinMenuShow = false; groupChat = false').delete_button
        .joinMenuBox(v-if = '!groupChat')
          .joinMenuText
            span.md-headline.enterEmail Введите почту собеседника
          .joinMenuField
            input(
                    type="text"
                    placeholder="Введите email участника"
                    v-model="personalEmail"
            )
          .joinMenuCancel
            .button.button--round.designButtonLesson(@click ='createChat("personal")') Начать чат
            .button.button--round.designButtonLesson(@click ='groupChat = true') Создать групповой чат
            //- .button.button--round.button-warning(@click ='joinMenuShow = false; groupChat = false')  Отмена

        // Сверху персональное меню, снизу - групповое

        .joinMenuBox(v-else)
          .joinMenuText
            span.groupHeadText.md-headline.enterEmail Добавить пользователя
            md-button.buttonAdd.md-fab.md-primary(@click ='groupEmail.push("")')
              md-icon add
          .joinMenuField
            input.nameField(
                    type="text"
                    placeholder="Введите название чата"
                    v-model="groupName"
            )
          label(for='img') Выберите картинку беседы
          input#img(type='file', name='img', accept='image/*', @change="onFileSelected")
          .joinMenuField(v-for = '(email, i) in groupEmail')
            input.emailField(
                    type="text"
                    placeholder="Введите email участника"
                    v-model="groupEmail[i]"
            )
            md-button.removeButton.md-accent.md-raised(@click ='groupEmail.splice(i, 1)') X
          .joinMenuCancel
            .button.button--round.designButtonLesson(@click ='createChat("group")') Создать беседу
            //- .button.button--round.button-success(@click ='groupChat = false') Создать персональный чат
            //- .button.delete_button(@click ='joinMenuShow = false; groupChat = false')  Отмена
</template>

<script>

import { mapGetters, mapActions, mapMutations } from 'vuex'
import firebase from 'firebase/app'
import 'firebase/firestore'
import Loading from 'vue-loading-overlay'

export default {
  components: {
    Loading
  },
  watch: {
    '$store.state.profile.chatList': function () {
      this.chatList = JSON.parse(JSON.stringify(this.getMyChats))
      this.chatList.sort(function (a, b) { return b.lastMessageTime - a.lastMessageTime })
    }
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
    ...mapMutations(['updatePreChatInfo']),
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
      var members = Array.from(chatMembers)
      for (let i = 0; i < members.length; i++) {
        chatInfo.members.push({last_message: 0, userId: members[i]})
      }
      if (chatName === null) {
        this.error = 'Пользователь не найден'
        this.loading = false
        alert(this.error)
        return
      } else if (type === 'group' && chatInfo.members.length < 3) {
        this.groupEmail.length < 3 ? this.error = 'В групповом чате должно быть хотя бы 3 пользователя' : this.error = 'Пользователи не найдены'
        this.loading = false
        alert(this.error)
        return
      } else if (type === 'personal' && chatInfo.members.length === 1) {
        this.error = 'Нельзя создать диалог с самим собой'
        this.loading = false
        alert(this.error)
        return
      }
      var exists = false
      if (type === 'personal') {
        chatInfo.members.sort()
        chatId = chatInfo.members[0].userId + '_' + chatInfo.members[1].userId
        await db.collection('chat').doc(chatId).get().then(doc => {
          if (doc.exists) exists = true
        })
      } else {
        // Имя, владелец и токен
        chatInfo.name = chatName
        chatInfo.admin = this.getUser.id
        chatId = await this.generateToken(7)
        // Загрузка аватарки
        if (this.groupPhoto !== undefined && this.groupPhoto !== null) {
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
        this.loading = false
        return
      }
      if (type === 'group') {
        chatInfo.all_message = 1
        chatInfo['message0'] = {
          sender: 'System',
          text: 'new ' + chatInfo.name,
          time: firebase.firestore.Timestamp.now()
        }
        await db.collection('chat').doc(chatId).set(chatInfo)
        for (let j = 0; j < chatInfo.members.length; j++) {
          var myChats = []
          await db.collection('account').doc(members[j]).get().then(doc => {
            var data = doc.data()
            if (data.myChats !== undefined) myChats = data.myChats
          })
          myChats.push(chatId)
          await db.collection('account').doc(members[j]).set({
            myChats: myChats
          }, { merge: true })
        }
      } else this.updatePreChatInfo(chatInfo)
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
  .designButtonLesson
    padding-top 12.5px
    position relative
    height auto
    border: 2px solid #763DCA;
    border-radius 50px
    font-weight 550
    font-size 23px
    margin-left 20px
    color #763DCA !important
    background-color #FFFFFF
    opacity 0.5
    transition: 0.6s;
  .designButtonLesson:hover
    transition: 0.6s;
    color #FFFFFF !important
    background-color #763DCA
  .delete_button
    position relative
    display inline-block
    width 40px
    cursor pointer
    height 40px
    margin-top 30px
    margin-right 30px
    float right

  .md-fab
   position fixed
   width auto
   margin 20px
  .loading-indicator
    z-index 50001
  .buttonAdd
    width 50px
    height 50px
  .emailField
    width 80%
  .removeButton
    min-width 0
    width 30px
    height 30px
  .joinMenuText
    position relative
    padding-bottom 40px
    span
      font-weight 500
      font-family -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
      font-size 24pt
  .joinMenuField
    input
      border-color #000000
      border-width 1%
      font-size 18px
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
  .joinMenuMain
    positine relative
    text-align center
    background-color #FFFFFF
    margin-top 10%
    margin-left 20%
    margin-right 20%
    min-width 350px
    border-radius 25px
  .joinMenuBox
    positine relative
    padding 5%
    padding-left 10%
    padding-right 10%
    text-align center
    background-color #FFFFFF
    min-width 350px
    border 0px #000000 solid
    border-radius 25px
    .button
      font-size 14pt
      margin 2%
    @media screen and (max-width: 600px)
      margin 1%
      margin-top 20%
  .content-wrapper
    min-height 0
  .chatList
    margin-left 25%
    margin-right 25%
    margin-top 3%
    margin-bottom 3%
    width auto
    height auto
    background-color #FCFCFF
    box-shadow 0 0 5px rgba(0,0,0,0.5)
    border-radius 20px 20px 20px 20px
    @media screen and (max-width: 1200px) {
      margin-left 15%
      margin-right 15%
    }
    @media screen and (max-width: 500px) {
      margin-left 5%
      margin-right 5%
    }
  .chat-top
    position relative
    width 100%

  .chat-header
    position position
    display grid
    grid-template-columns 15% 70% 15%
    grid-template-rows 48% 48% 1%
    width 100%
    margin-top 20px
    margin-bottom 20px
    margin-left 10px
    border-margin-left 20px

  .chat-border
    width auto
    height 1.2px
    margin-top 20px
    margin-left 20%
    margin-right 5%
    right 0px
    background-color #aaaaaa
    @media screen and (max-width: 1500px) {
    }

  .chatFrame
    width 100%
    height auto
    float right

  .chat-fragment
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    display block
    &:hover
      cursor pointer
  .chat-image
    border-radius: 50%;
    overflow: hidden;
    width 80px
    height 80px
    margin-left 20px
    margin-top 0px
    img
      display: block;
      min-width: 100%;
      min-height: 100%;
    @media screen and (max-width: 1500px) {
      width 100px
      height 100px
    }
    @media screen and (max-width: 1200px) {
      width 90px
      height 90px
    }
    @media screen and (max-width: 1100px) {
      width 70px
      height 70px
    }
    @media screen and (max-width: 700px) {
      width 50px
      height 50px
    }

  .chat-info
    position relative
    display inline-block
    width 100%
    right 0px
    margin-right 0px
    margin-left 20px
    vertical-align middle
  .chat-name
    margin-top 1px
    position relative
    width auto
    height auto
    label
      font-size 2.0em
      color #763DCA
  .chat-message
    position relative
    width 100%
    margin-top 20px
    margin-bottom 0%
    label
      white-space: nowrap
      overflow: hidden
      padding: 5px
      text-overflow: ellipsis
      font-size 18px
      color #666174
      text-align bottom
    label:hover {
      background #f0f0f0
      white-space normal
    }
  .chat-empty
    width 60%
  .chat-time
    position relative
    right 5%
    display inline-block
    grid-column-start 3
    grid-column-end 3
    grid-row-start 1
    grid-row-end 2
    width auto
    height auto
    float right
    vertical-align middle
    label
      font-size 1.2em
      color #696174
      text-align center
    @media screen and (max-width: 900px)
      visibility hidden
      display none

</style>
