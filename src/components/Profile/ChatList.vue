<template lang="pug">
  .content-wrapper
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
          .chat-border
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
    //- .newChatButton
      md-button.md-fab.md-fab-bottom-right.md-primary
        md-icon add
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      chatList: []
    }
  },
  methods: {
    ...mapActions(['fetchMyChats']),
    goToChat (id) {
      this.$router.push('/pm/' + id)
    }
  },
  async mounted () {
    await this.fetchMyChats()
    this.chatList = this.getMyChats
    console.log(this.chatList)
  },
  computed: {
    ...mapGetters(['getMyChats'])
  }
}
</script>

<style lang="stylus" scoped>
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
