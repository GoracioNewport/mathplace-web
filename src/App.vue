<template lang="pug">
  .wrapper
    header
      .navbar
        .container
          .navbar-content
            router-link.header-logo(
              to = "/"
            ) <strong class="mathplace-logo"> MathPlace </strong>
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
                  ) {{ link.title }}
    router-view
</template>

<script>
export default {
  data () {
    return {
      menuShow: false,
      linkMenu: [
        {title: 'Главная', url: '/main'},
        {title: 'Темы', url: '/'},
        {title: 'Войти', url: '/login'},
        {title: 'Регистрация', url: '/registration'}
      ]
    }
  }
}
</script>

<style scoped lang="stylus">
  .mathplace-logo
    color #763DCA
    font-size 1.8em
  .navbar-content
    margin-top 2%
    margin-bottom 2%
  .wrapper
    margin 0
    margin-bottom 5%
    max-width 9999px
  .span
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
  .header-logo
    font-size 2em
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
</style>
