<template lang="pug">
  .content-wrapper
    .chat-main
      .chat-box
        .chat-info(v-if = 'chat !== null')
          .chat-image(v-if = 'chat.image === undefined')
            img(src="@/components/images/user.png", width = "100px", height = "100px")
          .chat-image(v-else)
            img(:src = "chat.image", width = "100px", height = "100px")
          .chat-name
            label
              strong chatName
        .message(v-for = 'msg in chat.msgs')
          .message-fragment
            .message-info
              .message-sender
                label {{ msg.sender }}
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
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import { mapGetters } from 'vuex'

export default {
  watch: {
    '$route' (to, from) {
      this.id = to.params.chatId
    }
  },
  data () {
    return {
      id: this.$route.params.chatId,
      chat: null,
      messageField: null
    }
  },
  methods: {
    async fetchChatById (id) {
      const db = firebase.firestore()
      var moment = require('moment')
      var info = {}
      var ind
      var vueInstance = this
      await db.collection('chat').doc(id)
        .onSnapshot(function (doc) {
          info['msgCnt'] = doc.data().all_message
          info['type'] = doc.data().chat_type
          info['name'] = doc.data().name
          info['members'] = doc.data().members
          if (doc.data().chat_type === 'group') info['image'] = doc.data().image
          else {
            info['members'][0] === vueInstance.getUser.id ? ind = 1 : ind = 0
          } info['msgs'] = {}
          for (let j = 0; j < doc.data().all_message; j++) {
            info['msgs'][j] = doc.data()['message' + j.toString()]
            info['msgs'][j].time = moment().format('MMMM Do YYYY, h:mm:ss a')
          }
          if (info['type'] === 'personal') db.collection('account').doc(info['members'][ind]).get().then(doc => { info['image'] = doc.data().image })
          console.log('Got update!', info)
          vueInstance.chat = info
        })
    },
    sendMessage () {
      const db = firebase.firestore()
      var varName = 'message'.concat(this.chat.msgCnt)
      var data = {
        text: this.messageField,
        sender: this.getUser.id,
        time: firebase.firestore.Timestamp.now()
      }
      console.log(varName, data)
      db.collection('chat').doc(this.id).set({
        [varName]: data
      }, { merge: true })
      var chatRef = db.collection('chat').doc(this.id)
      db.runTransaction(function (transaction) {
        return transaction.get(chatRef).then(function (chatDoc) {
          var newCnt = chatDoc.data().all_message + 1
          transaction.update(chatRef, { all_message: newCnt })
        })
      })
      this.messageField = null
    }
  },
  async mounted () {
    await this.fetchChatById(this.id)
  },
  computed: {
    ...mapGetters(['getUser'])
  }
}
</script>

<style lang="stylus" scoped>

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
    display inline-block
    margin 6px
    overflow hidden
    border-radius 50%
    vertical-align middle

  .chat-name
    display inline-block
    height 100%
    width auto
    margin-left 20px
    vertical-align middle
    label
      color #FFFFFF
      font-size 2.9em

  .message-sender
    margin 15px
    label
      font-size 1.8em
      font-weight 500
      font-family Roboto
      color #FFFFFF
      text-align bottom

  .message-fragment
    margin-left 40%
    width auto
    display inline
    float right
    border-radius 10px 0px 10px 10px
    box-shadow 0 0 5px rgba(0,0,0,0.5)
    margin-top 10px
    margin-right 10px
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    background-color #763DCA
  .message-info
    width 100%
    height auto
    margin-left 1%

  .message-message
    label
      font-size 1.9em
      color #FFFFFF
      text-align center
  .message-time
    height 100%
    float right
    margin-right 1%
    label
      font-size 1.2em
      color #FFFFFF
      text-align bottom

  .send-field-box
    height 100%
    margin-bottom 0px
    input
      height 50px
      width 100%
      margin-bottom 0px
      border-radius 0px 0px 20px 20px
      background-color #FF6FFF
      margin-top 20px
</style>
