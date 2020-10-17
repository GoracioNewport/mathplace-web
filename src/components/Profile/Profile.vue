<template lang='pug'>
    .content-wrapper
      .loading-indicator(v-if = 'isLoading')
        loading(
          :active.sync = "this.isLoading"
          is-full-page = true
          color = "#763dca"
          :opacity = 0
          :width = 150)

      .content-block(v-else)

        .content-main
            .avatar
                md-avatar
                  img.avatarImage.avatar(
                    @mouseover ='avatarHover = true'
                    @mouseleave ='avatarHover = false'
                    @click ='settingsMenuShow = true'
                    v-if = 'getUser.image === undefined'
                      src = '@/assets/images/account_new.png',
                      alt = 'Аватар')
                  img.avatarImage.avatar(
                    @mouseover ='avatarHover = true'
                    @mouseleave ='avatarHover = false'
                    @click ='settingsMenuShow = true'
                    v-else
                      :src = 'getUser.image',
                      alt = 'Аватар')
                img.avatarChange(
                  v-if = 'avatarHover'
                  src = '@/assets/images/camera.png'
                )
                .userInf
                  p.userName {{ this.getUser.name }}
                  .info
                    p.textInf Посылок {{this.getUser.submit}}
                    p.textInf Решено {{this.getUser.right}}
                    p.textInf Тугриков {{this.getUser.money}}
                  router-link.button.button--round.button.button-primary(to='/statistics') Мои уроки
                  .button.button--round.button.button-primary(@click ='settingsMenuShow = true') Редактировать
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
      .settingsMenu(v-if = 'settingsMenuShow')
        .settingsMenuBox
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
              md-file(v-model='newAvatarName' @md-change ='onFilePicked' accept ="image/*")

          .settingsMenuCancel
            .button.button--round.button-success(@click ='saveProfile') Сохранить
            .button.button--round.button-warning(@click ='settingsMenuShow = false')  Отмена
      .createTopicButton
        router-link(to='/customTitle').button.mdc-fab.mdc-fab--extended.button--round.bottom_button
          .createTopicButtonBox
          span.createTopicButtonText Создать свой урок

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
    this.newName = this.getUser.name
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
      isLoading: true,
      avatarHover: false,
      settingsMenuShow: false,
      newName: '',
      newAvatarName: '',
      newAvatarFile: null,
      trueVar: true
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
    ...mapActions(['fetchAchivements', 'updateUser', 'changeProfileSettings']),
    async saveProfile () {
      this.isLoading = true
      this.settingsMenuShow = false
      if (this.newName === this.getUser.name || this.newName === '') this.newName = null
      await this.changeProfileSettings({name: this.newName, avatar: this.newAvatarFile})
      this.$router.go()
    },
    onFilePicked (event) {
      this.newAvatarFile = event[0]
    }
  }
}

</script>

<style scoped lang='stylus'>
  .md-avatar
    width 10vh
    height 10vh
    border-radius 60%
    vertical-align top
  .createTopicButton
    z-index 10
  .settingsMenuBox
    padding 5%
    padding-left 10%
    padding-right 10%
    .button
      font-size 0.6em
      margin 2%
  .settingsMenuText
    font-size 1.3em
    padding-bottom 3%

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
  .avatarChange
    top 55%
    right 93.8%
    position absolute
    height 30px
    width 30px
  .avatarImage
    position absolute
    height 100%
    width 100%
    overflow hidden
    transition filter 0.5s
    &:hover
      filter brightness(0.8)
  .content-wrapper
    min-height 0

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
    box-shadow 0px 0px 10px rgba(0,0,0,0.5)
  .userInf
    width 70%
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
    margin-bottom 20px

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
    @media screen and (max-width: 1000px) {
      width 100%
      margin-left 15px
      margin-right 15px
      margin-top 50px
    }

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

  .achivText
    position relative
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
      font-size 1.2em
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
    img
      width 19%
      height auto
      margin-left 10%
      margin-bottom 3%
      margin-top 3%
</style>
