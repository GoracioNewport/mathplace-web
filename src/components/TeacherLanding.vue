<template lang="pug">
  .content-wrapper
    .content
      .functionalityBox
        .functionalityHeader.topicHeader
          span.md-display-4 Функционал
        .functionalityCards
          md-card.functionalityCard(md-with-hover v-for = '(func, i) in funionalityList' :key='id')
            md-ripple
              md-card-content
                .md-title {{ func.title }}
              md-card-actions
                md-button(@click ='showTip(i)') Подробнее
    .dialogWindow
      md-dialog(:md-active.sync='showDialog')
        md-dialog-title {{ funionalityList[activeTip].title }}
          md-tab
            span {{ funionalityList[activeTip].description }}
        md-dialog-actions
          md-button.md-raised.md-primary(to ='/customTitle') Создать свой урок
          md-button.md-primary(@click='showDialog = false') Закрыть

</template>

<script>
export default {
  data () {
    return {
      funionalityList: [
        {
          id: 1,
          title: 'Test',
          description: 'Test'
        },
        {
          id: 2,
          title: 'Testaaaaaaa aaaaaa aaaaaaaaa aaaaa a aaaaaa aaaaaaaaaaaaaaaaaaaa',
          description: 'Test'
        },
        {
          id: 3,
          title: 'Test',
          description: 'Test'
        },
        {
          id: 4,
          title: 'Test',
          description: 'Test'
        },
        {
          id: 5,
          title: 'Test',
          description: 'Test'
        },
        {
          id: 6,
          title: 'Test',
          description: 'Test'
        },
        {
          id: 7,
          title: 'Test',
          description: 'Test'
        }
      ],
      showDialog: false,
      activeTip: 0
    }
  },
  methods: {
    showTip (i) {
      this.activeTip = i
      this.showDialog = true
    }
  }
}
</script>

<style lang="stylus" scoped>
.topicHeader
  margin 3%
  display flex
  align-items center
  justify-content center
  span
    color #000000
    text-align center
    font-size 7vw
.functionalityCards
  padding 5%
  padding-left 15%
  padding-right 15%
  display grid
  grid-template-columns repeat(auto-fit, minmax(300px, 1fr))
.functionalityCard
  min-height 20vh
  max-width 40vw
  margin 1vw
  float left
  .md-card-content
    display flex
    height 75%

</style>
