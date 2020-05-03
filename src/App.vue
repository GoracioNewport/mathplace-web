<template lang="pug">
  .wrapper
    header
      .navbar.navbar--fixed
        .container
          .navbar-content
            router-link.header-logo(
              to = "/"
            ) <strong class="mathplace-logo">MathPlace</strong>
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
          {title: 'Главная', url: '/main'},
          {title: 'Темы', url: '/'},
          {title: 'Выйти', url: '/logout'}
        ]
      }
      return [
        {title: 'Главная', url: '/Main'},
        {title: 'Войти', url: '/login'},
        {title: 'Регистрация', url: '/registration'}
      ]
    }
  }
}
</script>

<style scoped lang="stylus">
  header
    background-color #763DCA

  .navbar
    background-color #763DCA
    border-bottom-width 0px
    border-bottom-color #000000
    box-shadow 0 0 10px
  .mathplace-logo
    color #FFFFFF
    font-size 1.5em

  .wrapper
    margin 0
    margin-bottom 5%
    max-width 9999px
  .span
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
  .header-logo
    font-size 2em
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
  .router-link-title
    font-size 1.3em
    color #ffffff
</style>
