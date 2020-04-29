<template lang="pug">
  .content-wrapper
    section.header-title
      .container
        h1.ui-title-1
          strong Темы
    section
      .container
        .topic-list
          .topic-item-wrapper(
            v-for = "topic in getTopics"
            :key = "topic.id"
          )
            Topic(
              v-bind:id='topic.id',
              v-bind:title='topic.title'
              v-bind:percentage='topic.completed'
              v-bind:theme='topic.theme'
            )

</template>

<script>

import Topic from './Topic.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Topic
  },
  computed: mapGetters(['getTopics']),
  async mounted () {
    this.fetchTopics()
  },
  methods: mapActions(['fetchTopics'])
}
</script>

<style lang="stylus" scoped>

  .header-title
    padding 0

  .topic-item-wrapper
    height 400px

  .container
    align-items center
    max-width 1600px

  .ui-title-1
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    padding-top 4%
    text-align center

  .topic-list
    display grid
    grid-template-columns repeat(auto-fit, minmax(320px, 1fr))
    margin-top 0px

</style>
