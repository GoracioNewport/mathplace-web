<template lang="pug">
  .content-wrapper
    .chat-box
      .chat-info(v-if = 'chat !== null')
        .chat-image(v-if = 'chat.image === undefined')
          img(src="@/components/images/user.png", width = "100px", height = "100px")
        .chat-image(v-else)
          img(:src = "chat.image", width = "100px", height = "100px")
        .chat-name
          label
            strong {{ chat.name }}
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
            info['members'][0] === this.getUser.id ? ind = 1 : ind = 0
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

  .chat-info
    background-color #763dca
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    display flex
  .message-fragment
    max-width 60%
    min-width 8%
    float right
    border-radius 10px 0px 10px 10px
    box-shadow 0 0 5px rgba(0,0,0,0.5)
    margin-top 10px
    margin-right 10px
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    display flex
    background-color #763DCA
  .message-info
    margin-left 1%
  .message-message
    margin-bottom 2%
    label
      margin-top 50%
      margin-bottom 50%
      color #FFFFFF
      text-align center
  .message-time
    height 100%
    float right
    margin-right 1%
    label
      margin-top 100%
      color #FFFFFF
      text-align bottom

  // .message-fragment2
  //   max-width 60%
  //   min-width 8%
  //   margin-top 10px
  //   margin-left 10px
  //   float left
  //   font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
  //   display flex
  //   border-radius 0px 10px 10px 10px
  //   box-shadow 0 0 5px rgba(0,0,0,0.5)
  //   background-color #FFFFFF
  // .message-image2
  //   margin 10px
  // .message-info2
  //   margin-left 1%
  // .message-message2
  //   margin-bottom 2%
  //   margin-right 10%
  //   label
  //     margin-left 10%
  //     margin-top 50%
  //     margin-bottom 50%
  //     color #763dca
  //     text-align center
  // .message-time2
  //   float right
  //   margin-right 1%
  //   label
  //     margin-top 80%
  //     margin-bottom 20%
  //     color #763dca
  //     text-align bottom
</style>
