<template lang="pug">
  .content-wrapper
    section
      .container
        h1.ui-title-1 Темы
    section
      .container
        .topic-list
          .topic-item(
            v-for = "topic in getTopics"
            :key = "topic.id"
          )
            .topic-item__info
              span.topic-item__percentage {{topic.completed}}%
              a.topic-item__title
                strong {{topic.title}}
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters(['getTopics']),
  async mounted () {
    this.fetchTopics()
  },
  methods: mapActions(['fetchTopics'])
}
</script>

<style lang="stylus" scoped>

  .ui-title-1
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif

  .topic-list
    display grid
    grid-template-columns repeat(auto-fit, minmax(300px, 1fr))
    margin-top 0px

  .topic-item
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    font-size 1.2em
    color #FFFFFF
    background-color #9e68d1
    border-color #cccccc
    border-radius 10%
    border-width 2px
    padding-left 5%
    padding-right 5%
    padding-bottom 5%
    height 200px
    margin 10px

  .topic-item__info
    padding 5%

  .topic-item__percentage
    font-size 2em

  .topic-item__title
    display flex
    color #ffffff

</style>
