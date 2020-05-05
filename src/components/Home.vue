<template lang="pug">
  .content-wrapper
    section.header-title(v-if="this.isLoading")
      .container
        h1.ui-title-1
          strong Темы
        .loading-indicator
          loading(
            :active.sync="this.isLoading",
            :is-full-page='false')
    section(v-if="!this.isLoading")
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
import Loading from 'vue-loading-overlay'
import { mapGetters, mapActions } from 'vuex'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  components: {
    Topic,
    Loading
  },
  data () {
    return {
      isLoading: true
    }
  },
  // methods: {
  //   reverseMessage: function () {
  //     this.title = this.title.split('').reverse().join('')
  //   }
  // },
  computed: mapGetters(['getTopics', 'isTopicsLoaded']),
  async mounted () {
    await this.fetchTopics()
    this.isLoading = false
  },
  methods: mapActions(['fetchTopics'])
  // methods: {

  //   doAjax () {
  //     this.isLoading = true
  //     // simulate AJAX
  //     setTimeout(() => {
  //       this.isLoading = false
  //     }, 1000)
  //   }
  // }
}
</script>

<style lang="stylus" scoped>

  .ui-title-1
    font-size 4em

  .header-title
    margin-top 10px
    padding 0

  .loading-indicator
    padding-top 300px

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
