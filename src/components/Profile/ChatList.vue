<template lang="pug">
  .content-wrapper
    .chatList
      .chat-fragment(v-for = '(chats, i) in chatList')
        .chat-image(v-if = 'chats.img === undefined')
          img(src="@/components/images/user.png", width= "100px", height = "100px")
        .chat-info
          .chat-name
            label
              strong {{ chats.name }}
          .chat-message
            label
              span {{ chats.msgs[chats.msgCnt - 1].sender }}: {{ chats.msgs[chats.msgCnt - 1].text }}
          .chat-time
            label {{ chats.msgs[chats.msgCnt - 1].time }}
        //- .chat-image
        //-   img(src="@/components/images/user.png", width= "100px", height = "100px")
        //- .chat-info
        //-   .chat-name
        //-     label
        //-       strong Павел Никульшин
        //-   .chat-message
        //-     label Вы: Привет
        //- .chat-empty
        //- .chat-time
        //-   label 16:30
    //- .chatFrame
      Chat
</template>

<script>

import Chat from './Chat'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      chatList: []
    }
  },
  components: {
    Chat
  },
  methods: {
    ...mapActions(['fetchMyChats'])
  },
  async mounted () {
    await this.fetchMyChats()
    this.chatList = this.getMyChats
    console.log(this.chatList.length, this.chatList)
  },
  computed: {
    ...mapGetters(['getMyChats'])
  }
}
</script>

<style lang="stylus" scoped>
  .body
    height 100%
  .chatList
    width 30%
    height 100vh
    border 1px solid #aaaaaa
  .chatFrame
    width 70%
    float right
    border 1px solid #aaaaaa

  .chat-fragment
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    display flex
    border 1px solid #aaaaaa
  .chat-image
    margin 10px
  .chat-info
    margin-left 1%
  .chat-name
    margin-top 15%
    label
      font-size 1.2em
      color #763DCA
  .chat-message
    margin-top 10%
    margin-bottom 2%
    label
      color #696174
      text-align bottom
  .chat-empty
    width 60%
  .chat-time
    width 10%
    float right
    margin-right 1%
    label
      margin-top 50%
      margin-bottom 50%
      color #696174
      text-align center
</style>
