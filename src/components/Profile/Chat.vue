<template lang="pug">
  .content-wrapper
    .loading-indicator
        .vld-parent
          loading(
            :active.sync = "this.loading"
            is-full-page = false
            color = "#763dca"
            :opacity = 0.5)
    .backButtonBox(v-if = '!loading' @click ='$router.push("/chat")')
      span.backButtonText Назад
      br
      span.backButtonText <-
    .chat-main(v-if = '!loading && chat.members !== undefined')
      .chat-info(v-if = 'chat !== null')
          .chat-image(v-if = 'chat.image === undefined')
            img(src="@/components/images/user.png", width = "100px", height = "100px")
          .chat-image(v-else)
            img(:src = "chat.image", width = "100px", height = "100px")
          .chat-name
            label
              strong(v-if = 'chat.type === "group"') {{ chat.name }}
              strong(v-else) {{ chatMembers[chat.name] }}
          .chat-modify(v-if = 'admin')
            img.settingIcon(v-if ='chat.type === "group"' @click ='settingsMenuShow = true' src='@/assets/images/settings.png')
      .chat-box
        .message(v-for = '(msg, i) in chat.msgs')
          //- Системные сообщения
          .systemMessage(v-if = 'msg.sender === "System"')
            label.systemMessageText.message-message.md-caption {{ msg.text }}
          //- Обычные сообщения
          .message-fragment(v-else)
            .message-info
              .message-sender
                label {{ chatMembers[msg.sender] }}
              .message-message
                label {{ msg.text }}
            .message-time
              label(v-if ='typeof msg.time === "string"') {{ msg.time }}
              label(v-else) ...
      .send-field-box
        input(
          @keyup.enter = 'sendMessage'
          v-model = 'messageField'
          type = 'text'
          placeholder = 'Введите сообщение')
    .loadingOverlay(v-else)
      .loading-indicator
          loading(
            active.sync = "chat === null"
            :is-full-page = 'false'
            color = "#763dca"
            :opacity = 0)
    .settingsMenu(v-if = 'settingsMenuShow && !loading')
        .settingsMenuBox
          .settingsAdminBox(v-if = 'admin')
            .settingsMenuText
              span.md-headline Изменение имени
            .settingsMenuField
              md-field(md-inline='')
                label Введите имя
                md-input(v-model='newName')

            .settingsMenuText
              span.md-headline Изменение аватара
            .settingsMenuField
              md-field
                label Выберите картинку
                md-file(v-model='newAvatarName' @md-change ='onFilePicked')
          .settingsMenuText
            span.md-headline Участники
          .settingsMenuField
            .memberBox
              md-field
                label Введите email
                md-input(v-model='newMemberEmail' placeholder='Добавить участника')
                md-button.addMemeberButton(@click ='addMember') Добавить
            .memberBox(v-for ='(mem, memId) in chatMembers' :key = 'memId' v-if ='!removedUsers[memId]')
              span.memberText.md-body-2 {{ mem }}
              img.memberCross(v-if ='admin || memId === getUser.id' src = '@/assets/images/wrong.png' @click ='deleteMember(memId, mem)')
          .settingsMenuCancel
            .button.button--round.button-success(v-if ='admin' @click ='saveProfile') Сохранить
            .button.button--round.button-warning(@click ='settingsMenuShow = false')  Отмена
            .button.button--round.button-light(@click ='deleteMember(getUser.id, getUser.name)') Выйти из беседы
            .button.button--round.button-default(@click ='$clipboard("mathplace.ru/pm/" + id)') Скопировать ссылку на беседу
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import Loading from 'vue-loading-overlay'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Loading
  },
  watch: {
    '$route' (to, from) {
      this.id = to.params.chatId
    }
  },
  data () {
    return {
      id: this.$route.params.chatId,
      chat: {},
      chatMembers: {},
      messageField: null,
      loading: false,
      settingsMenuShow: false,
      lastReadMessage: null,
      newName: '',
      newAvatarName: '',
      newAvatarFile: null,
      admin: false,
      newMemberEmail: '',
      removedUsers: {},
      chatCreated: true
    }
  },
  methods: {
    ...mapActions(['changeChatSettings', 'addMemberToChat', 'removeMemberFromChat']),
    async fetchChatById (id) {
      const db = firebase.firestore()
      var vueInstance = this
      // Проверяем, есть ли вообще чат или нет (это надо для личных чатов, что бы не создавать их пока никто не написал сообщение)
      await db.collection('chat').doc(id).get().then(doc => { vueInstance.chatCreated = doc.exists })
      if (this.chatCreated) {
        var moment = require('moment')
        var first = true
        var info = {}
        await this.fetchPreLoadInformation(id)
        await db.collection('chat').doc(id)
          .onSnapshot(async function (doc) {
            var data = doc.data()
            info['msgCnt'] = data.all_message
            var newMemb = await vueInstance.parseMembers(data.members)
            // var oldMemb = vueInstance.chat.members
            // let difference = await newMemb.filter(x => !oldMemb.includes(x))

            // // Обрабатываем новых пользователей, если они зашли
            // for (let i = 0; i < difference.length; i++) {
            //   await db.collection('account').doc(difference[i]).get().then(doc => {
            //     vueInstance.chatMembers[difference[i]] = doc.data().name
            //   })
            // }
            // То, что находится выше я заменяю проходом по всем сообщеням и подгрузкой всех удаленных и новых ников, это в любом случае надо для обработкир удаленных пользователей

            info['members'] = newMemb
            info['msgs'] = {}
            for (let j = 0; j < data.all_message; j++) {
              info['msgs'][j] = data['message' + j.toString()]
              if (info['msgs'][j].time !== null) info['msgs'][j].time = moment.unix(info['msgs'][j].time.seconds).format('MMMM Do YYYY, h:mm:ss a')
              if (vueInstance.chatMembers[info.msgs[j].sender] === undefined && info.msgs[j].sender !== 'System') { await db.collection('account').doc(info.msgs[j].sender).get().then(async doc => { vueInstance.chatMembers[info.msgs[j].sender] = doc.data().name }) }
            }

            // Пробегаюсь по всем сообщеням для подгрузки недостающих ников

            vueInstance.chat = Object.assign(vueInstance.chat, info)
            // Если это первая загрузка или мы сами отправили сообщение, скролим в самый низ
            if (first || (Object.keys(vueInstance.chat.msgs).length > 0 && vueInstance.chat.msgs[Object.keys(vueInstance.chat.msgs).length - 1].sender === vueInstance.getUser.id)) {
              const el = vueInstance.$el.getElementsByClassName('message-fragment')
              if (el[el.length - 1]) el[el.length - 1].scrollIntoView()
              first = false
            }
            await vueInstance.$forceUpdate()
            vueInstance.loading = false
          })
      }
    },
    async fetchPreLoadInformation (id) {
      const db = firebase.firestore()
      var vueInstance = this
      var memb
      var ind
      await db.collection('chat').doc(id).get().then(async doc => {
        var data = doc.data()
        vueInstance.chat.members = await vueInstance.parseMembers(data.members)
        if (data.admin === this.getUser.id) this.admin = true
        this.newName = data.name
        memb = await vueInstance.parseMembers(data.members)
        // Что делать, если чела нет в чатах
        if (memb.findIndex(id => id === vueInstance.getUser.id) === -1) {
          if (data.chat_type === 'personal') {
            vueInstance.$router.push('/chat')
            return
          } else {
            // Пишем сообщение о новом юзере, заносим его в список и добавляем чат в список чатов клиента
            data.members.push({ last_message: data.all_message, userId: this.getUser.id })
            var varName = 'message'.concat(data.all_message.toString())
            var msg = {
              sender: 'System',
              text: this.getUser.name.concat(' присоединился к чату через ссылку'),
              time: firebase.firestore.Timestamp.now()
            }
            await db.collection('chat').doc(id).update({
              members: data.members,
              [varName]: msg,
              all_message: ++data.all_message
            })
            var chatList
            await db.collection('account').doc(this.getUser.id).get().then(doc => { doc.data().myChats === undefined ? chatList = [] : chatList = doc.data().myChats })
            chatList.push(id)
            await db.collection('account').doc(this.getUser.id).update({ myChats: chatList })
          }
        }
        vueInstance.chat.type = data.chat_type
        vueInstance.chat.name = data.name
        if (data.chat_type === 'group') vueInstance.chat.image = data.image
        else {
          memb[0] === vueInstance.getUser.id ? ind = memb[1] : ind = memb[0]
          vueInstance.chat.name = ind
        } vueInstance.chat.msgs = {}
        if (vueInstance.chat.type === 'personal') await db.collection('account').doc(ind).get().then(doc => { vueInstance.chat.image = doc.data().image })
      })
      for (let i = 0; i < memb.length; i++) {
        await db.collection('account').doc(memb[i]).get().then(async doc => {
          vueInstance.chatMembers[memb[i]] = doc.data().name
        })
      }
    },
    async sendMessage () {
      const db = firebase.firestore()
      if (this.messageField === '' || this.messageField === null) return
      if (!this.chatCreated) {
        var chatId = this.id
        console.log(this.getPreChatInfo)
        var chatInfo = {
          all_message: 0,
          members: this.getPreChatInfo.members,
          chat_type: this.getPreChatInfo.chat_type
        }
        await db.collection('chat').doc(chatId).set(chatInfo)
        this.fetchChatById(this.id)
      }
      var data = {
        text: this.messageField,
        sender: this.getUser.id,
        time: firebase.firestore.Timestamp.now()
      }
      this.chat.msgs[this.chat.msgs.length] = data
      var varName = 'message'.concat(this.chat.msgCnt)
      this.chat.msgCnt++
      // var curMsg
      // await db.collection('chat').doc(this.id).get().then(doc => { curMsg = doc.data().all_message })
      console.log('Sending message№', varName, data)
      db.collection('chat').doc(this.id).set({
        [varName]: data,
        all_message: this.chat.msgCnt
      }, { merge: true })
      this.messageField = null
      if (!this.chatCreated) {
        var members = await this.parseMembers(chatInfo.members)
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
        this.chatCreated = true
      }
    },
    async parseMembers (membersArray) {
      var membersArrayReturn = []
      for (let i = 0; i < membersArray.length; i++) {
        membersArrayReturn.push(membersArray[i].userId)
        if (membersArray[i].userId === this.getUser.id) this.lastReadMessage = membersArray[i].last_message
      }
      return membersArrayReturn
    },
    async saveProfile () {
      this.loading = true
      this.settingsMenuShow = false
      if (this.newName === this.chat.name || this.newName === '') this.newName = null
      await this.changeChatSettings({chatId: this.id, name: this.newName, avatar: this.newAvatarFile})
      this.$router.go()
    },
    onFilePicked (event) {
      this.newAvatarFile = event[0]
    },
    // Добавление и удаление пользователей из чата
    async addMember () {
      this.loading = true
      await this.addMemberToChat({chatId: this.id, userId: this.getUser.id, userEmail: this.newMemberEmail})
      this.newMemberEmail = ''
      this.loading = false
    },
    async deleteMember (id, name) {
      console.log(this.chatMembers)
      // delete this.chatMembers[id]
      this.removedUsers[id] = true
      this.$forceUpdate()
      await this.removeMemberFromChat({chatId: this.id, userId: id, userName: name})
      if (id === this.getUser.id) this.$router.push('/chat')
    },
    async fetchEmptyChat () {
      const db = firebase.firestore()
      this.chat = this.getPreChatInfo
      var chatMembersArray = this.id.split('_')
      var ind
      chatMembersArray[0] === this.getUser.id ? ind = 1 : ind = 0
      this.chatMembers[this.getUser.id] = this.getUser.name
      var vueInstance = this
      await db.collection('account').doc(chatMembersArray[ind]).get().then(doc => {
        var data = doc.data()
        vueInstance.chatMembers[chatMembersArray[ind]] = data.name
        vueInstance.chat.name = doc.id
        vueInstance.chat.image = data.image
      })
      // Объявляем локальные переменные
      this.chat.msgs = {}
      this.chat.msgCnt = 0
    }
  },
  async mounted () {
    this.loading = true
    await this.fetchChatById(this.id)
    if (!this.chatCreated) {
      await this.fetchEmptyChat()
    }
    this.loading = false
  },
  computed: {
    ...mapGetters(['getUser', 'getPreChatInfo'])
  }
}
</script>

<style lang="stylus" scoped>
  .backButtonBox
    display table-cell
    text-align center
    vertical-align middle
    position fixed
    height 100%
    width 10%
    transition 0.3s
    padding-top 45vh
    .backButtonText
      font-size 2em
      text-align center
      font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    &:hover
      cursor pointer
      background-color rgba(0, 0, 0, .08)
  .chat-box
    max-height 60vh
    min-height 60vh
    overflow auto
  .systemMessage
    padding 5px
    width 100%
    float left
    .message-message
      text-align center
    .systemMessageText
      font-size 1.2em
  .memberBox
    padding 1%
    display flex
    justify-content space-between
    .memberText
      font-size 0.7em
    .memberCross
      width 4%
      &:hover
        cursor pointer
  .md-input
    margin-bottom 0
  .settingsMenuBox
    padding 5%
    padding-left 10%
    padding-right 10%
    overflow auto
    max-height 70vh
    .button
      font-size 0.6em
      margin 2%
  .settingsMenuText
    font-size 1.3em
    padding-bottom 2%

  .settingsMenuField
    input
      border-color #000000
      border-width 1%
  .settingsMenu
    z-index 50000
    font-family Roboto, Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    font-size 2vw
    background-color rgba(0, 0, 0, .5)
    width 100%
    height 100%
    position fixed
    top 0
    left 0
  .settingsMenuBox
    text-align center
    background-color #FFFFFF
    margin-top 10%
    margin-left 20%
    margin-right 20%
    min-width 350px
    border 2px #000000 solid
    border-radius 10px
  .chat-modify
    position relative
  .settingIcon
    position absolute
    width 5vh
    right 1%
    top -6.5vh
  .content-wrapper
    min-height 0

  .chat-main
    margin-left 25%
    margin-right 25%
    margin-top 2%
    margin-bottom 2%
    width auto
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
    @media screen and (max-width: 700px) {
      margin-left 5%
      margin-right 5%
    }

  .chat-info
    position relative
    overflow hidden
    width  100%
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    background-color #EAE9EC
    border-radius 10px 10px 0px 0px
    box-shadow 0 0 5px rgba(0,0,0,0.5)

  .chat-image
    position relative
    display inline-block
    margin 8px
    widht 200px
    overflow hidden
    background-repeat no-repeat
    background-position 50%
    background-size 100% 100%
    border-radius 50%
    vertical-align middle

  .chat-name
    position relative
    display inline-block
    height 100%
    width auto
    margin-top 7px
    margin-left 20px
    vertical-align middle
    label
      color #763DCA
      font-size 2.0em
      font-weight 600
  .message-sender
    margin 15px
    label
      font-size 1.55em
      font-weight 500
      font-family Roboto
      color #763DCA
      text-align bottom

  .message-info
    margin-left 10%
    width auto
    display block
    float left
  .message-fragment
    positine relative
    margin 10px
    margin-left 2%
    max-width 90%
    line-height 30px
    float left
    clear both
    border-radius 0px 15px 15px 15px
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    background-color #EAE9EC
  .message-info
    width 100%
    margin-left 1%

  .message-message
    margin-left 15px
    label
      font-size 2.0em
      font-family Roboto
      color #000000
      text-align left
  .message-time
    height 100%
    float right
    margin-top 10px
    margin-right 10px
    label
      font-size 1.0em
      color #000000
      text-align bottom

  .send-field-box
    height 100%
    margin-bottom 0px
    input
      height 50px
      width 100%
      margin-bottom 0px
      border-radius 0px 0px 20px 20px
      // background-color #FF6FFF
      margin-top 20px
</style>
