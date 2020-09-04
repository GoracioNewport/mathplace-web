<template lang='pug'>
    .content-wrapper
      .test_button
        router-link.button--round.button.button-primary.bottom_button(to='/customTitle') Создать свою тему

      .content-block

        .content-main
            .avatar
                img.avatar(
                  class = 'avatar',
                    src = '@/assets/images/account_new.png',
                    alt = 'Аватар')
                .userInf
                  p.userName {{this.getUser.name}}
                  .info
                    p.textInf Посылок {{this.getUser.submit}}
                    p.textInf Решено {{this.getUser.right}}
                    p.textInf Тугриков {{this.getUser.money}}
                  router-link.button.button--round.button.button-primary(to='/statistics') Мои уроки
                  router-link.button.button--round.button.button-primary(to='/editProfile') Редактировать
                  router-link.button.button--round.button.button-primary(to='/logout') Выйти

        .content-achieve
          .text-part(
          v-for = 'part in this.achivementsFull'
          )
            .icon(
            v-if = 'part.difficulty == "normal"'
            )
              img(
                v-if = 'part.done == 1'
                src = '@/assets/images/mediumachivon.png'
              )
              img(
                v-else-if = 'part.done == 0'
                src = '@/assets/images/mediumachivoff.png'
              )
              .achivText
                p.achivName(
                  ) {{ part.name }}
                p.achivCondition(
                ) {{ part.condition }}
                p.achivProgress(
                ) {{"Прогресс "}} {{ part.progress }}{{" %"}}
                //- k-progress(status='success', type='line', :percent='20')
            .icon(
            v-if = 'part.difficulty == "complicated"'
            )
              img(
                v-if = 'part.done == 1'
                src = '@/assets/images/heavyachivon.png'
              )
              img(
                v-else-if = 'part.done == 0'
                src = '@/assets/images/heavyachivoff.png'
              )
              .achivText
                p.achivName(
                ) {{ part.name }}
                p.achivCondition(
                ) {{ part.condition }}
                p.achivProgress(
                ) {{"Прогресс "}} {{ part.progress }}{{" %"}}
            .icon(
            v-if = 'part.difficulty == "easy"'
            )
              img(
                v-if = 'part.done == 1'
                src = '@/assets/images/smallachivon.png'
              )
              img(
                v-else-if = 'part.done == 0'
                src = '@/assets/images/smallachivoff.png'
              )
              .achivText
                p.achivName(
                ) {{ part.name }}
                p.achivCondition(
                ) {{ part.condition }}
                p.achivProgress(
                ) {{"Прогресс "}} {{ part.progress }}{{" %"}}

</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { mapActions, mapGetters } from 'vuex'
// import { beforeRouteLeave } from 'vue-router'

export default {
  components: {
    Loading
  },
  async mounted () {
    this.isLoading = true
    await this.fetchAchivements()
    this.achivementsFull = this.$store.getters.getAchievements
    this.isLoading = false
  },
  data () {
    return {
      achivementsFull: [{
        name: 'Достижение',
        condition: 'недостижимо',
        progress: 0,
        done: 0,
        difficulty: 'easy'
      }],
      isLoading: true
    }
  },
  // props: {
  //   id: {
  //     default: 0,
  //     type: Number
  //   },
  //   name: {
  //     default: ' ',
  //     type: String
  //   },
  //   condition: {
  //     default: ' ',
  //     type: String
  //   },
  //   progress: {
  //     default: 0,
  //     type: Number
  //   },
  //   done: {
  //     default: 0,
  //     type: Number
  //   }
  // },
  computed: {
    ...mapGetters(['getAchievements', 'getUser'])
  },
  methods: {
    ...mapActions(['fetchAchivements', 'updateUser'])
  }
}

</script>

<style scoped lang='stylus'>

    .button
      color #FFFFFF !important

    .button-primary
      margin-right 10px

    .test_button
      position absolute
      height 100%
      width 100%

    .bottom_button
      position fixed
      bottom 20px
      font-size 22px
      background #763dca
      font-family -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
      width auto
      font-weight 500
      height auto
      right 20px

    .userInf
      width 40%
      display inline-block
    .textInf
      font-weight 600
      margin-right 40px
      margin-left 0px
      align left
      display inline-block

    .userName
      font-family Roboto, Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
      font-weight 700
      font-size 2.1em

    .content-block
      margin-left 25%
      margin-right 25%
      margin-top 5%
      background-color #FCFCFF
      box-shadow 0 0 5px rgba(0,0,0,0.5)
      border-radius 20px 20px 20px 20px
      @media screen and (max-width: 2100px) {
        margin-left 16%
        margin-right 16%
      }

      @media screen and (max-width: 1800px) {
        margin-left 50px
        margin-right 50px
      }

      @media screen and (max-width: 600px) {
        margin-left 15px
        margin-right 15px
        margin-top 50px
      }

    .content-main
      font-family Roboto, Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif

    .text-part
      position relative
      display inline-block
      width 50%
      height auto

    .content-achieve
      position relative
      width 100%
      height auto
      font-family Roboto, Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
      margin-bottom 5%

    .avatar
      position relative
      margin-left 1%
      margin-right 1%
      margin-bottom 2%
      margin-top 2%
      width 100%
      img
        vertical-align middle
        width 12%
        height 12%

    .achivText
      display inline-block
      margin-left 20px
      vertical-align middle

    .achivName
      font-size 2em
      font-weight 700
      text-color #763dca
      color #763dca

    .achivCondition
      font-size 1.3em
      color #5B6175
      margin-top 10px
      margin-bottom 10px
    .achivProgress
      font-size 1em

    .info
        margin-right 2%
        margin-bottom 5%
        margin-top 10px
        strong
          margin 9%
    .logout
      background-color #763DCA
      color #ffffff
      padding 0.7%
      box-shadow 0 0 10px rgba(0,0,0,0.5)
      border-radius 20px 20px 20px 20px

    .icon
      position relative
      display inline-block
      min-width 250px
      height 100%
      img
        width 19%
        margin-left 10%
        margin-bottom 3%
        margin-top 3%
</style>
