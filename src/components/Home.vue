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
        <div>
          p.title_topic Популярные
          p.all_topic См.Все
        </div>
        .topic-list
          .topic-item-wrapper(
            v-for = "topic in getTopics",
            v-if='topic.id<169',
            :key = "topic.id"
          )
            Topic(
              v-bind:id='topic.id',
              v-bind:title='topic.title'
              v-bind:percentage='topic.completed'
              v-bind:theme='topic.theme'
            )
        p.title_topic ОГЭ 2020
        .topic-list
          .topic-item-wrapper(
            v-for = "topic in getTopics"
            v-if='topic.id<16',
            :key = "topic.id"
          )
            Topic(
              v-bind:id='topic.id',
              v-bind:title='topic.title'
              v-bind:percentage='topic.completed'
              v-bind:theme='topic.theme'
            )
        p.title_topic Геометрия
        .topic-list
          .topic-item-wrapper(
            v-for = "topic in getTopics"
            v-if='topic.id<16',
            :key = "topic.id"
          )
            Topic(
              v-bind:id='topic.id',
              v-bind:title='topic.title'
              v-bind:percentage='topic.completed'
              v-bind:theme='topic.theme'
            )
        p.title_topic Алгебра
        .topic-list
          .topic-item-wrapper(
            v-for = "topic in getTopics"
            v-if='topic.id<16',
            :key = "topic.id"
          )
            Topic(
              v-bind:id='topic.id',
              v-bind:title='topic.title'
              v-bind:percentage='topic.completed'
              v-bind:theme='topic.theme'
            )
        p.title_topic Комбинаторика
        .topic-list
          .topic-item-wrapper(
            v-for = "topic in getTopics"
            v-if='topic.id<16',
            :key = "topic.id"
          )
            Topic(
              v-bind:id='topic.id',
              v-bind:title='topic.title'
              v-bind:percentage='topic.completed'
              v-bind:theme='topic.theme'
            )
        p.title_topic Логика
        .topic-list
          .topic-item-wrapper(
            v-for = "topic in getTopics"
            v-if='topic.id<16',
            :key = "topic.id"
          )
            Topic(
              v-bind:id='topic.id',
              v-bind:title='topic.title'
              v-bind:percentage='topic.completed'
              v-bind:theme='topic.theme'
            )
        p.title_topic Графы
        .topic-list
          .topic-item-wrapper(
            v-for = "topic in getTopics"
            v-if='topic.id<16',
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
  computed: mapGetters(['getTopics', 'isTopicsLoaded']),
  async mounted () {
    await this.fetchTopics()
    this.isLoading = false
  },
  methods: mapActions(['fetchTopics'])
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

  .title_topic
    display grid
    color: #525252
    font-family: 'Roboto', sans-serif
    font-size: 62px
    margin-left 1%
    margin-bottom 1%
    font-weight: bold

  .topic-list
    display grid
    grid-template-columns repeat(auto-fit, minmax(320px, 1fr))
    margin-top 0px

  .all_topic
    width 100%
    color: #763DCA
    text-align right
    font-family: 'Roboto', sans-serif
    font-size: 40px
    font-weight: bold

</style>
