<template lang="pug">
  .wrapper
    header
      .navbar.navbar--fixed
        .container
          .navbar-content
            .header-logo
              router-link(to = '/main')
                img.mathplace-img-logo.md-display-3(src="@/components/images/logo_purple.png")
              //- router-link(to = '/main').mathplace-logo.md-display-3 MathPlace
            .button-burger(
              @click = "menuShow = !menuShow"
              :class="{ active: menuShow}"
            )
              span.line.line-1
              span.line.line-2
              span.line.line-3

            .navbar-list__wrapper(
              :class="{ active: menuShow}"
            )
              ul.navbar-list
                li.navbar-item(
                  v-for = "link in linkMenu"
                  :key = "link.title"
                  @click = "menuShow = false"
                )
                  router-link.navbar-link(
                    :to = " `${link.url}`"
                  ) <strong class="router-link-title">{{ link.title }}</strong>
            .header-logo-right
              button.button--round.designButtonLesson.router-link(to='/customTitle') Создать урок
    .margin_bottom
    router-view
</template>

<script>
export default {
  data () {
    return {
      menuShow: false
    }
  },
  computed: {
    linkMenu () {
      if (this.$store.getters.checkUser) {
        return [
          // {title: 'Главная', url: '/main'},
          {title: 'Главная', url: '/'},
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
  }
}
</script>

<style scoped lang="stylus">
  header
    position relative
    height 80px
    width 100%
    background-color #FFFFFF

  .navbar
    position fixed
    width 100%
    z-index 1000
    opacity 0.85
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
      color #000000
    :hover
      color #763DCA /* Цвет текста активного пункта */
  .designButtonLesson
    position relative
    height 50px
    border: 2px solid #763DCA;
    border-radius 50px
    font-weight 550
    color #763DCA
    background-color #FFFFFF
    opacity 0.5
    text-align center
    vertical-align middle
    @media screen and (max-width: 480px)
      display none
  .designButtonLesson:hover
    transition: 0.6s;
    color #FFFFFF
    background-color #763DCA
  .navbar-link
    padding 0
  .mathplace-logo
    color #763DCA !important
    font-size 1.5em
    font-weight 500
  .mathplace-img-logo
    position relative
    height 60px
    width auto
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
    font-size 1.3em
    color #ffffff
    @media screen and (max-width: 480px)
      color #000000
</style>
