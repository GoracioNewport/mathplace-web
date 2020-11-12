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
                    v-if = 'getUser.image === undefined'
                      src = '@/assets/images/account_new.png',
                      alt = 'Аватар')
                  img.avatarImage.avatar(
                    v-else
                      :src = 'getUser.image',
                      alt = 'Аватар')
                .userInf
                  p.userName {{ this.getUser.name }}
                  .info
                    p.textInf Посылок {{this.getUser.submit}}
                    p.textInf Решено {{this.getUser.right}}
                    p.textInf Тугриков {{this.getUser.money}}
                .userButton
                  router-link(to='/statistics')
                    button.designButtonMini Мои уроки
                  button.designButtonMini(@click ='settingsMenuShow = true, showDialog = true') Редактировать профиль
                  //- router-link(to='/logout')
                    //- button.designButtonMini Выйти
                  button.designButtonMini(@click='active = true') Выйти
                  md-dialog-confirm(:md-active.sync='active' md-title="Вы уверены, что хотите выйти?" md-content='Вы сможете перезайти в другой аккаунт' md-confirm-text='Выйти' md-cancel-text='Отмена' @md-cancel='onCancel' @md-confirm='onConfirm')

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
      div(v-if = 'settingsMenuShow')
        md-dialog(:md-active.sync='showDialog')
          md-dialog-title Изменить профиль
          md-tab(md-label='Участники')
            .settingsMenuBox
              .settingsMenuText
                p Введите имя
              .settingsMenuField
                md-field(md-inline='')
                  label Введите имя
                  md-input(v-model='newName')

              .settingsMenuText
                p Добавьте иконку профиля
              .settingsMenuField
                md-field
                  label Выберите картинку
                  md-file(v-model='newAvatarName' @md-change ='onFilePicked' accept ="image/*")
          md-dialog-actions
            md-button.md-primary(@click='showDialog = false,settingsMenuShow = false') Закрыть
            md-button.md-primary(@click='saveProfile') Сохранить
        //- .joinMenuMain
        //-   img(src="@/components/images/clear.png", @click ='settingsMenuShow = false').delete_button
        //-   .settingsMenuBox
        //-     .settingsMenuText
        //-       p Введите имя
        //-     .settingsMenuField
        //-       md-field(md-inline='')
        //-         label Введите имя
        //-         md-input(v-model='newName')

        //-     .settingsMenuText
        //-       p Добавьте иконку профиля
        //-     .settingsMenuField
        //-       md-field
        //-         label Выберите картинку
        //-         md-file(v-model='newAvatarName' @md-change ='onFilePicked' accept ="image/*")

        //-     .settingsMenuCancel
        //-       button.designButtonLesson(@click ='saveProfile') Сохранить
        //-       //- .button.button--round.button-warning(@click ='settingsMenuShow = false')  Отмена
      .createTopicButton
        router-link(to='/customTitle').mdc-fab.bottom_button
          .createTopicButtonBox
          button.designButtonLesson Создать свой урок

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
      active: false,
      value: null,
      isLoading: true,
      showDialog: false,
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
    },
    onConfirm () {
      this.$router.push('/logout')
    },
    onCancel () {
    }
  }
}

</script>

<style scoped lang='stylus'>
  .delete_button
    position relative
    display inline-block
    width 33px
    cursor pointer
    height 33px
    margin-top 30px
    margin-right 30px
    float right
  .joinMenuMain
    positine relative
    text-align center
    background-color #FFFFFF
    margin-top 10%
    margin-left 20%
    margin-right 20%
    min-width 350px
    border-radius 10px
  .designButtonMini
    padding-top 10px
    position relative
    height auto
    border: 2px solid #763DCA;
    border-radius 50px
    font-weight 550
    font-size 17px
    margin-left 20px
    color #763DCA !important
    background-color #FFFFFF
    opacity 0.5
    transition: 0.6s;
  .designButtonMini:hover
    transition: 0.6s;
    color #FFFFFF !important
    background-color #763DCA
  .designButtonLesson
    padding-top 12.5px
    position relative
    height auto
    border: 2px solid #763DCA;
    border-radius 50px
    font-weight 550
    font-size 23px
    margin-left 20px
    color #763DCA !important
    background-color #FFFFFF
    opacity 0.5
    margin-top 20px
    transition: 0.6s;
  .designButtonLesson:hover
    transition: 0.6s;
    color #FFFFFF !important
    background-color #763DCA
  .md-avatar
    width 10vh
    height 10vh
    border-radius 50%
    vertical-align top
  .createTopicButton
    z-index 10
  .settingsMenuBox
    padding 10px
  .settingsMenuText
    font-weight 400
    font-family -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    font-size 24pt
    margin-top 10px
    margin-bottom 40px

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
  .avatarChange
    top 55%
    right 93.8%
    position absolute
    height 30px
    width 30px
  .avatarImage
    position relative
    display inline-block
    overflow hidden
    transition filter 0.5s
    border-radius: 50%;
    margin-bottom 10px
    overflow: hidden;
    width 120px
    height 120px
    img
      display: block;
      min-width: 100%;
      min-height: 100%;

    &:hover
      filter brightness(0.8)
  .content-wrapper
    min-height 0

  .button
    color #FFFFFF !important

  .button-primary
    margin-top 12px
    margin-right 10px

  .test_button
    position absolute
    height 100%
    width 100%

  .bottom_button
    position fixed
    bottom 20px
    font-size 22px
    // background #763dca
    // font-family -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    width auto
    // font-weight 500
    height auto
    right 20px
    // box-shadow 0px 0px 10px rgba(0,0,0,0.5)
  .userInf
    width 60%
    margin-top 20px
    margin-left 30px
    display inline-block
  .userButton
    position relative
    height auto
    width auto
    margin-left 30px
    margin-top 20px
    display block
  .textInf
    font-weight 450
    margin-right 40px
    font-family -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    margin-left 0px
    align left
    margin-top 10px
    font-size 18px
    display inline-block

  .userName
    font-family -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    font-weight 550
    font-size 30pt
    margin-bottom 30px

  .content-block
    margin-left 25%
    margin-right 25%
    margin-top 5%
    margin-bottom 10%
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
      margin-right 0px
      margin-top 50px
    }

  .content-achieve
    position relative
    width 100%
    margin-top 50px
    height auto
    font-family Roboto, Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    margin-bottom 5%

  .avatar
    position relative
    height 100%
    margin-left 5%
    margin-right 1%
    margin-bottom 0%
    margin-top 2%

  .achivText
    position relative
    display inline-block
    margin-left 10pt
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
    position relative
    height auto
    width auto
    margin-right 0%
    margin-bottom 5%
    margin-top 10px
    font-size 1.2em
    strong
      margin 0%
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
    margin-left 10px
    margin-right 10px
    margin-bottom 20px
    img
      width 19%
      height auto
      margin-left 10%
      @media screen and (max-width: 600px)
        margin-left 0
      margin-bottom 3%
      margin-top 3%
    &:hover
      box-shadow 0 0 5px 0px rgba(0,0,0,0.5)
      border-radius 10px
</style>
