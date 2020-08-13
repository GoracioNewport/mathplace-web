<template lang="pug">
  .content-wrapper
    .chat-info
      .chat-photo
        img(src="@/components/images/user.png", width= "100px", height = "100px")
      .chat-name
        label
          strong Павел Никульшин
    .message
      .message-fragment1
        .message-info1
          .message-message1
            label Привет
        .message-time1
          label 16:30
    .message
      .message-fragment2
        .message-info2
          .message-message2
            label Пока
        .message-time2
          label 16:32
</template>

<script>

</script>

<style lang="stylus" scoped>

  .chat-info
    background-color #763dca
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    display flex
  .message-fragment1
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
  .message-info1
    margin-left 1%
  .message-message1
    margin-bottom 2%
    label
      margin-top 50%
      margin-bottom 50%
      color #FFFFFF
      text-align center
  .message-time1
    height 100%
    float right
    margin-right 1%
    label
      margin-top 100%
      color #FFFFFF
      text-align bottom

  .message-fragment2
    max-width 60%
    min-width 8%
    margin-top 10px
    margin-left 10px
    float left
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    display flex
    border-radius 0px 10px 10px 10px
    box-shadow 0 0 5px rgba(0,0,0,0.5)
    background-color #FFFFFF
  .message-image2
    margin 10px
  .message-info2
    margin-left 1%
  .message-message2
    margin-bottom 2%
    margin-right 10%
    label
      margin-left 10%
      margin-top 50%
      margin-bottom 50%
      color #763dca
      text-align center
  .message-time2
    float right
    margin-right 1%
    label
      margin-top 80%
      margin-bottom 20%
      color #763dca
      text-align bottom
</style>
