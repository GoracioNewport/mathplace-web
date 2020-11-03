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
      .reviewBox
        .reviewHeader.topicHeader
          span.md-display-4 Отзывы
        .reviewCarousel
          carousel(:per-page="1" :center-mode="true" pagination-color='#bababa' pagination-active-color='#763DCA').carouselBox
            slide(v-for = 'slide in slides' :key='id')
              p.md-body-2.reviewText {{ slide.text }}
              p.md-body-1.reviewAuthor {{ slide.author }}
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
      activeTip: 0,
      slides: [
        {
          id: 1,
          text: 'Mathplace говно просто какое-то пиздец просто а не приложение пойду посру лушче на телефон чем скачиывать это буду',
          author: 'Синебот Валера'
        },
        {
          id: 2,
          text: 'Mathplace говно говно говно говно говно говно говно говно говно говно говно говно говно',
          author: 'Винебот Салера'
        },
        {
          id: 3,
          text: 'Mathplace Mathplace Mathplace Mathplace Mathplace Mathplace Mathplace Mathplace Mathplace Mathplace Mathplace Mathplace Mathplace Mathplace Mathplace Mathplace Mathplace Mathplace Mathplace Mathplace Mathplace Mathplace Mathplace Mathplace Mathplace Mathplace Mathplace Mathplace Mathplace Mathplace Mathplace Mathplace Mathplace ',
          author: 'Гордей Завьялов'
        },
        {
          id: 4,
          text: 'Мне стыдно жить в стране, где водка стоит в 20 раз дороже гантель',
          author: 'Джейсон Стетхем'
        }
      ]
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

.reviewCarousel
  display flex
  justify-content center
  margin-bottom 10%

.carouselBox
  max-width max(600px, 100vw)
  p
    min-height 90%
    font-size 24pt
    line-height auto
    text-align center
    padding 20px
    padding-top 0

.topicHeader
  margin 3%
  display flex
  align-items center
  justify-content center
  span
    color #000000
    text-align center
    font-size 40pt
    font-weight normal

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
