<template lang="pug">
  .wrapper
    header(v-if='!(this.$route.path.length > 7 && this.$route.path.substr(0, 7) === "/lesson")')
      .navbar.navbar--fixed
        .container
          .navbar-content
            .header-logo
              router-link(to = '/')
                img.mathplace-img-logo.md-display-3(src="@/components/images/logo_purple.png")
              //- router-link(to = '/main').mathplace-logo.md-display-3 MathPlace
            md-button.joinLesson(:class="{ active: menuShow}", @click="joinMenuShow = true") Присоединиться
            //- .button-burger(
            //-   @click ="menuShow = !menuShow"
            //-   :class="{ active: menuShow}"
            //- )
            //-   span.line.line-1
            //-   span.line.line-2
            //-   span.line.line-3

            .navbar-list__wrapper(
              :class="{ active: menuShow}"
            )
              ul.navbar-list
                li.navbar-item(
                  v-for="link in linkMenu"
                  :key="link.title"
                  @click="menuShow = false"
                )
                  router-link.navbar-link(
                    :to = " `${link.url}`"
                  )
                    md-button.router-link-title {{ link.title }}
            .header-logo-right
              //- button.button--round.designButtonLesson.router-link(to='/customTitle') Присоединиться
              router-link.button.button--round.designButtonLesson(v-if ='this.$store.getters.checkUser' to='/customTitle') Создать урок
              router-link.button.button--round.designButtonLesson(v-else to='/teacher') Стать автором
    .margin_bottom
    div(v-if = 'joinMenuShow')
      md-dialog(:md-active.sync='joinMenuShow')
        md-dialog-title Подключиться к уроку
        p(style="margin:20px;margin-top:0px;") У каждого урока есть свой уникальный код.<br> Введите код урока или попросите учителя отправить его вам
        div(style="margin:20px;margin-top:0px;")
          md-field
            label Введите код урока...
            md-input(v-model="customTopicId" md-counter='6')
        md-dialog-actions
          md-button.md-primary(@click='showDialog = false,joinMenuShow = false') Отмена
          md-button.md-primary(@click ='joinCourse(customTopicId), joinMenuShow = false') Подключиться

    div.bottomSheet(v-if='!(this.$route.path.length > 7 && this.$route.path.substr(0, 7) === "/lesson")')
      .phone-viewport
        md-bottom-bar(md-sync-route='', style="color: #763DCA")
          md-bottom-bar-item(to='/main' exact='' md-label='Главная' md-icon='home')
          md-bottom-bar-item(to='/profile' md-label='Профиль' md-icon='face')
          md-bottom-bar-item(to='/chat' md-label='Чаты' md-icon='chat')
    router-view
</template>

<script>

import { mapActions } from 'vuex'

export default {
  data () {
    return {
      menuShow: false,
      joinMenuShow: false
    }
  },
  mounted () {
    // console.log(this.$route.path.substr(0, 7) === '/lesson')
  },
  computed: {
    linkMenu () {
      if (this.$store.getters.checkUser) {
        return [
          // {title: 'Главная', url: '/main'},
          {title: 'Главная', url: '/main'},
          {title: 'Профиль', url: '/profile'},
          {title: 'Чаты', url: '/chat'}
        ]
      } else {
        return [
          // {title: 'Главная', url: '/Main'},
          {title: 'Войти', url: '/login'},
          {title: 'Регистрация', url: '/registration'}
        ]
      }
    }
  },
  methods: {
    ...mapActions(['fetchTopics', 'fetchCustomTopic']),
    async joinCourse (id) {
      await this.fetchCustomTopic(id)
      var res = this.getCustomTopic
      if (res !== null) {
        this.$router.push('/lesson/olympiads=' + id)
      } else {
        this.customTopicId = ''
        this.placeholder = 'Тема не найдена! Пожалуйста, убедитесь в правильности написании ключа'
        alert('Тема не найдена! Пожалуйста, убедитесь в правильности написании ключа')
      }
    }
  }

}
</script>

<style scoped lang="stylus">
  .phone-viewport
    position fixed
    bottom -1px
    right 0px
    z-index 10
    width: 100%;
    height auto
    // height: 200px;
    display: inline-flex;
    color #763DCA
    text-color #763DCA
    font-color #763DCA
    background-color #763DCA
    align-items: flex-end;
    overflow: hidden;
    border: 1px solid rgba(#000, .26);
    borde-right 0px
    background: rgba(#763DCA, .06);
    @media screen and (min-width: 500px)
      display none

  // .bottomSheet
  //   position fixed
  .button-burger
    position relative
    margin-rigth 0px
    float right
    margin-left 150px
  a
    text-decoration none !important
    transition 0.2s

  header
    position relative
    height 80px
    width 100%
    background-color #FFFFFF

  .navbar
    position fixed
    width 100%
    z-index 5
    opacity 0.9
    height 80px
    background-color #FFFFFF
    border-bottom-width 0px
    border-bottom-color #000000
    box-shadow 0 0 1px
  .container
    position absolute
    widht 100%
    right 0px
    left 0px
    text-align center
  .navbar-content
    position relative
    left 0px
    right 0px
    margin-left 0px
  .navbar-item
    padding 0
    padding-top 15px
    padding-bottom 15px
    strong
      padding-left 20px
      padding-right 20px
      padding-top 15px
      padding-bottom 15px
      transition 0.3s
      color #000000
    :hover
      color #763DCA /* Цвет текста активного пункта */
  .designButtonLesson
    padding-top 12.5px
    position relative
    height auto
    border: 2px solid #763DCA;
    border-radius 50px
    font-weight 550
    font-size 20px
    margin-left 20px
    color #763DCA !important
    background-color #FFFFFF
    opacity 0.5
    transition: 0.6s;
    text-align center
    vertical-align middle
    @media screen and (max-width: 500px)
      display none
  .designButtonLesson:hover
    transition: 0.6s;
    color #FFFFFF !important
    background-color #763DCA
  .joinLesson
    position relative
    padding 8px
    height auto
    border: 2px solid #763DCA;
    border-radius 50px
    font-weight 550
    font-size 16px
    float right
    right 0px
    margin-right 0px
    margin-left 40px
    color #763DCA !important
    background-color #FFFFFF
    opacity 0.9
    transition: 0.6s;
    text-align center
    vertical-align middle
    @media screen and (min-width: 500px)
      display none
  .joinLesson:hover
    transition: 0.6s;
    color #FFFFFF !important
    background-color #763DCA
  .navbar-link
    padding 0
  .mathplace-logo
    color #763DCA !important
    font-size 1.5em
    font-weight 500
  .mathplace-img-logo
    position relative
    height auto
    width 100px
    color #763DCA !important
    font-size 1.5em

  .wrapper
    max-width 9999px
  .span
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
  .header-logo
    font-size 2em
    color #000000
    float left
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    overflow hidden
    string
      color #000000
  .header-logo
    float right
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    overflow hidden
    string
      color #000000
  .router-link-title
    font-size 16px
    margin-left 10px
    color #000000
    @media screen and (max-width: 500px)
      color #000000
</style>
