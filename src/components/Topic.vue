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
          :fill={ color: 'rgba(107, 204, 38, 1)' },
          empty-fill='rgba(204, 204, 204, .4)',
          :animation-start-value='0.0',
          :start-angle='-90',
          insert-mode='append',
          :thickness='5',
          :show-percent='true',
          @vue-circle-progress='progress',
          @vue-circle-end='progress_end')

          .topic-item-theme
            span
              <strong> {{theme}} </strong>

      .topic-item-body
        a.topic-item-title
          strong {{title}}
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
  }
}
</script>

<style lang="stylus" scoped>

  .circle
    margin 5%

  .topic-item-header
    background-color #601db3
    margin 0
    border-top-left-radius 30px
    border-top-right-radius 30px

  .topic-item-body
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
</style>
