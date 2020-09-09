<template lang="pug">
  .content-wrapper
    .loading-indicator
      loading(
        :active.sync = "this.loading"
        is-full-page = true
        color = "#763dca"
        :opacity = 0.5)
    .chat-main(v-if = '!loading')
      .chat-box
        .chat-info(v-if = 'chat !== null')
          .chat-image(v-if = 'chat.image === undefined')
            img(src="@/components/images/user.png", width = "100px", height = "100px")
          .chat-image(v-else)
            img(:src = "chat.image", width = "100px", height = "100px")
          .chat-name
            label
              strong(v-if = 'chat.type === "group"') {{ chat.name }}
              strong(v-else) {{ chatMembers[chat.name] }}
          .chat-modify(v-if = 'getUser.id === chat.members[0]')
            img.settingIcon(@click ='settingsMenuShow = true' src='@/assets/images/settings.png')
          .message(v-for = '(msg, i) in chat.msgs')
            .message-fragment
              .message-info
                .message-sender
                  label {{ chatMembers[msg.sender] }}
                .message-message
                  label {{ msg.text }}
              .message-time
                label {{ msg.time }}
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
    .settingsMenu(v-if = 'settingsMenuShow')
      .settingsMenuBox
        .settingsMenuText
          span.md-headline Введите ключ темы
        .jsettingsMenuField
          input(
                  type="text"
                  :placeholder="this.placeholder"
                  v-model="customTopicId"
          )
        .settingsMenuCancel
          .button.button--round.button-success(@click ='joinCourse(customTopicId)') Подключиться
          .button.button--round.button-warning(@click ='settingsMenuShow = false')  Отмена
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import Loading from 'vue-loading-overlay'
import { mapGetters } from 'vuex'

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
      settingsMenuShow: false
    }
  },
  methods: {
    async fetchChatById (id) {
      const db = firebase.firestore()
      var moment = require('moment')
      var info = {}
      var ind
      var vueInstance = this
      var memb
      await this.fetchMembers(id)
      await db.collection('chat').doc(id)
        .onSnapshot(function (doc) {
          var data = doc.data()
          info['msgCnt'] = data.all_message
          info['type'] = data.chat_type
          info['name'] = data.name
          info['members'] = data.members
          memb = data.members
          if (data.chat_type === 'group') info['image'] = data.image
          else {
            memb[0] === vueInstance.getUser.id ? ind = memb[1] : ind = memb[0]
            info['name'] = ind
          } info['msgs'] = {}
          for (let j = 0; j < data.all_message; j++) {
            info['msgs'][j] = data['message' + j.toString()]
            info['msgs'][j].time = moment.unix(info['msgs'][j].time.seconds).format('MMMM Do YYYY, h:mm:ss a')
          }
          if (info['type'] === 'personal') db.collection('account').doc(ind).get().then(doc => { info['image'] = doc.data().image })
          console.log('Got update!', info)
          vueInstance.chat = info
          vueInstance.loading = false
          console.log(info.members[0] === vueInstance.getUser.id)
        })
    },
    async fetchMembers (id) {
      const db = firebase.firestore()
      var vueInstance = this
      var memb
      await db.collection('chat').doc(id).get().then(doc => { memb = doc.data().members })
      await db.collection('chat').doc(id).get().then(doc => { memb = doc.data().members })
      for (let i = 0; i < memb.length; i++) {
        await db.collection('account').doc(memb[i]).get().then(doc => {
          vueInstance.chatMembers[memb[i]] = doc.data().name
          // if (vueInstance.messageField === '') vueInstance.messageField = null
          // else if (vueInstance.messageField === null) vueInstance.messageField = ''
          // else vueInstance.messageField += ' '
        })
      }
    },
    async sendMessage () {
      if (this.messageField === '' || this.messageField === null) return
      var data = {
        text: this.messageField,
        sender: this.getUser.id,
        time: firebase.firestore.Timestamp.now()
      }
      this.chat.msgs[this.chat.msgs.length] = data
      var varName = 'message'.concat(this.chat.msgCnt)
      this.chat.msgCnt++
      const db = firebase.firestore()
      // var curMsg
      // await db.collection('chat').doc(this.id).get().then(doc => { curMsg = doc.data().all_message })
      db.collection('chat').doc(this.id).set({
        [varName]: data,
        all_message: this.chat.msgCnt
      }, { merge: true })
      this.messageField = null
    }
  },
  async mounted () {
    this.loading = true
    await this.fetchChatById(this.id)
  },
  computed: {
    ...mapGetters(['getUser'])
  }
}
</script>

<style lang="stylus" scoped>
  .settingsMenuBox
    padding 5%
    padding-left 10%
    padding-right 10%
    .button
      font-size 0.6em
      margin 2%
  .settingsMenuText
    font-size 1.3em
    padding-bottom 10%

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
  .chat-box
    max-height 70vh
    overfolow auto

  .chat-main
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

  .chat-info
    height 100%
    width  100%
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    background-color #763DCA
    border-radius 10px 10px 0px 0px
    box-shadow 0 0 5px rgba(0,0,0,0.5)

  .chat-image
    position relative
    display inline-block
    margin 10px
    overflow hidden
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
      color #FFFFFF
      font-size 2.5em

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
    margin-left 2%
    width auto
    height auto
    float left
    clear both
    border-radius 0px 15px 15px 15px
    margin-top 20px
    margin-right 10px
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    background-color #EAE9EC
  .message-info
    width 100%
    height auto
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
