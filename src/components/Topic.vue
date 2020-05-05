<template lang="pug">
  .content-wrapper
    .topic-item
      .topic-item-header
        .topic-item-percentage

          vue-circle.percentageCircle(
          :progress='percentage',
          :size='60',
          :reverse='false',
          line-cap='round',
          :fill="{ color: 'rgba(38, 222, 129, 1)' }",
          empty-fill='rgba(204, 204, 204, .4)',
          :animation-start-value='0.0',
          :start-angle='-90',
          insert-mode='append',
          :thickness='5',
          :show-percent='true',
          @vue-circle-progress='progress',
          @vue-circle-end='progress_end')

          .topic-item-theme(v-if='theme.length < 9')
            span
              strong  {{theme}}
          .topic-item-theme_gey(v-if='theme.length == 9')
            span
              strong  {{theme}}
          .topic-item-theme_komba(v-if='theme.length > 9')
            span
              strong  {{theme}}

      .topic-item-body
        a.topic-item-title
          strong {{title}}
      a(href='/task')
        .topic-item-solve(v-on:click="openTopic")
          .button.button--round.button-success Решать

</template>

<script>
import VueCircle from 'vue2-circle-progress'
export default {

  components: {
    VueCircle
  },
  props: {
    id: {
      default: 0,
      type: Number
    },
    title: {
      default: 'Null',
      type: String
    },
    percentage: {
      default: 0,
      type: Number
    },
    theme: {
      default: '',
      type: String
    }
  },
  methods: {
    progress (event, progress, stepValue) {
      // console.log(stepValue)
    },
    progress_end (event) {
      // console.log('Circle progress end')
    },
    openTopic: function (event) {
      // `this` внутри методов указывает на экземпляр Vue
      // alert('Привет, ' + this.title + '!')
      // window.open('/login')
    }
  }
}
</script>

<style lang="stylus" scoped>

  .content-wrapper
    max-height 400px

  .circle
    margin 5%

  .topic-item-header
    background-color #601db3
    margin 0
    border-top-left-radius 30px
    border-top-right-radius 30px

  .topic-item-body
    height 45%
    padding 7%

  .topic-item
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    font-size 1.2em
    color #FFFFFF
    background-color #763DCA
    border-radius 10%
    height 300px
    margin 5%

  .topic-item-percentage
    font-size 2em

  .topic-item-title
    display flex
    color #ffffff

  .topic-item-theme
    float right
    font-size 0.8em
    margin 7%

  .topic-item-theme_gey
    float right
    font-size 0.7em
    margin 8%

  .topic-item-theme_komba
    float right
    font-size 0.55em
    margin-top 9%
    margin-right 5%

  .topic-item-solve
    display flex
    float right
    margin-bottom 70px
    margin-right 20px

</style>
