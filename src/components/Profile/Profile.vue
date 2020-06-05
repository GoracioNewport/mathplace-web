<template lang='pug'>
    .content-wrapper
        .content-main
            .avatar
                img.avatar(
                  class = 'avatar',
                    src = '@/assets/images/account_new.png',
                    alt = 'Аватар')
                strong {{this.getUser.name}}
                a(href='/logout')
                  strong.logout Выйти
                a(href='/profile/edit')
                  strong.logout Редактировать

            //- .name
            //-     strong {{this.getUser.name}}
            .info
                strong Посылок: {{this.getUser.submit}}
                strong Решено: {{this.getUser.right}}
                strong Тугриков: {{this.getUser.money}}
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
              span(
              ) {{ part.name }}
              span(
              ) {{ part.condition }}
              span(
              ) {{ part.progress }}
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
              span(
              ) {{ part.name }}
              span(
              ) {{ part.condition }}
              span(
              ) {{ part.progress }}
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
              span(
              ) {{ part.name }}
              span(
              ) {{ part.condition }}
              span(
              ) {{ part.progress }}

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
    .content-main
      font-family Roboto, Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
      margin-left 10%
      margin-right 10%
      margin-top 5%
      background-color #FCFCFF
      box-shadow 0 0 10px rgba(0,0,0,0.5)
      border-radius 20px 20px 0px 0px

    .content-achieve
      font-family Roboto, Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
      margin-left 10%
      margin-right 10%
      margin-bottom 5%
      background-color #FCFCFF
      box-shadow 0 0 10px rgba(0,0,0,0.5)
      border-radius 0px 0px 20px 20px

    .avatar
      margin-left 1%
      margin-right 1%
      margin-bottom 2%
      margin-top 2%
      width 100%
      img
        width 15%
        height 15%

    .info
        text-align center
        margin-left 2%
        margin-right 2%
        margin-bottom 5%
        margin-top 5%
        strong
          margin 9%
    .logout
      background-color #763DCA
      color #ffffff
      padding 0.7%
      box-shadow 0 0 10px rgba(0,0,0,0.5)
      border-radius 20px 20px 20px 20px

    .icon
      img
        width 15%
        margin-left 10%
        margin-bottom 3%
        margin-top 3%
</style>
