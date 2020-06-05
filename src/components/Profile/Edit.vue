<template lang="pug">
    .content-wrapper
        .content
            .avatar
                img.avatar(
                  class = "avatar",
                    src = '@/assets/images/account_new.png',
                    alt = 'Аватар')
                input(type='text', 
                    size='40',
                    class = "nickname",
                    value="Ваше имя")
                label {{this.getUser.name}}

            .info   
                strong Посылок: {{this.getUser.submit}}
                strong Решено: {{this.getUser.right}}
                strong Тугриков: {{this.getUser.money}}

</template>

<script>
import Loading from 'vue-loading-overlay'
import theoryImage from '@/assets/images/theory.png'
import taskImage from '@/assets/images/question.png'
import 'vue-loading-overlay/dist/vue-loading.css'
import { mapActions, mapGetters } from 'vuex'
// import { beforeRouteLeave } from 'vue-router'

export default {
  components: {
    Loading
  },
  computed: {
    ...mapGetters(['getCurrentTopic', 'getUser', 'getTopicLikes']),
  },
  methods: {
  }
}




</script>

<style scoped lang="stylus">
    .content
      font-family Roboto, Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
      margin-left 10%
      margin-right 10%
      margin-top 5%
      margin-bottom 5%
      background-color #FCFCFF
      box-shadow 0 0 10px rgba(0,0,0,0.5)
      border-radius 30px 30px 30px 30px
    .avatar
      margin-left 1%
      margin-right 1%
      margin-bottom 2%
      margin-top 2%
      width 100%
      img 
        width 15%
        height 15%
    // .name 
    //     text-align center
    .info
        text-align center
        margin-left 3%
        margin-right 3%
        margin-bottom 5%
        margin-top 5%
        strong 
          margin 10%
    .logout
      background-color #763DCA
      color #ffffff
      padding 0.7%
      box-shadow 0 0 10px rgba(0,0,0,0.5)
      border-radius 20px 20px 20px 20px

</style>