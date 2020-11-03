<template lang="pug">
  .content-wrapper
    .content
      .infoBox
        #online
          .Main
            #design6.gradient
            p.md-display-4#FeatureTitle Создавайте онлайн-уроки в конструкторе
            p#FeatureText
              | Делитесь знаниями на нашей образовательной платформе
            #design5.gradient
          .tryButton
            router-link.button.button--round.designButtonLesson(to='/customTitle') Попробовать

        img.photo(src="@/assets/images/Web_View.png")

        #whatis
          .Main
            #design6.gradient
            p#FeatureTitle
              | Что такое MathPlace?
            p#FeatureText
              | Многофункциональная и гибкая платформа для занятий математикой
            #design5.gradient

        #Properties
            .Main2
                #design6.gradient
                p#FeatureTitle2
                strong Достижения
                p#FeatureText2
                | Вы можете выполнять достижения и соревноваться с друзьями
                #design5.gradient
            .Main2
                #design6.gradient
                p#FeatureTitle2
                strong Мобильное приложение
                p#FeatureText2
                | Ученики могут заниматься в удобном приложение MathPlace для Android
                #design5.gradient
            .Main2
                #design6.gradient
                p#FeatureTitle2
                strong Простота
                p#FeatureText2
                | Для вашего удобства темы структурированы по классам, разделам и темам. Вы обязательно найдете то что вам нужно
                #design5.gradient
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
          carousel(:per-page="1" pagination-color='#bababa' pagination-active-color='#763DCA').carouselBox
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
          title: 'Статистика',
          description: 'Test'
        },
        {
          id: 2,
          title: 'Ограничения по времени',
          description: 'Test'
        },
        {
          id: 3,
          title: 'Автоматическая и ручная проверка',
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

.tryButton
  padding-bottom 10%
  display flex
  justify-content center

.designButtonLesson
  padding-top 12.5px
  position relative
  height 50px
  border: 2px solid #763DCA;
  border-radius 50px
  font-weight 550
  font-size 20pt
  color #763DCA !important
  background-color #FFFFFF
  opacity 0.5
  transition: 0.6s;
  text-align center
  vertical-align middle
  &:hover
    transition: 0.6s;
    color #FFFFFF !important
    background-color #763DCA
    text-decoration none

#Content
  position absolute
  width 100%
  height auto

.content-wrapper
  // clear both
  position relative
  display block
  width 100%
  background-image: repeating-linear-gradient(135deg, rgba(86, 86, 86, 0.02) 0px, rgba(86, 86, 86, 0.02) 22px,rgba(202, 202, 202, 0.02) 22px, rgba(202, 202, 202, 0.02) 67px,rgba(247, 247, 247, 0.02) 67px, rgba(247, 247, 247, 0.02) 113px,rgba(135, 135, 135, 0.02) 113px, rgba(135, 135, 135, 0.02) 132px,rgba(157, 157, 157, 0.02) 132px, rgba(157, 157, 157, 0.02) 153px,rgba(53, 53, 53, 0.02) 153px, rgba(53, 53, 53, 0.02) 171px,rgba(17, 17, 17, 0.02) 171px, rgba(17, 17, 17, 0.02) 181px,rgba(179, 179, 179, 0.02) 181px, rgba(179, 179, 179, 0.02) 220px),repeating-linear-gradient(135deg, rgba(58, 58, 58, 0.02) 0px, rgba(58, 58, 58, 0.02) 41px,rgba(198, 198, 198, 0.02) 41px, rgba(198, 198, 198, 0.02) 60px,rgba(176, 176, 176, 0.02) 60px, rgba(176, 176, 176, 0.02) 99px,rgba(173, 173, 173, 0.02) 99px, rgba(173, 173, 173, 0.02) 146px,rgba(239,161,231, 0.05) 146px, rgba(239,161,231, 0.05) 167px,rgba(179, 179, 179, 0.02) 167px, rgba(179, 179, 179, 0.02) 205px,rgba(228, 228, 228, 0.02) 205px, rgba(228, 228, 228, 0.02) 230px,rgba(23, 23, 23, 0.02) 230px, rgba(23, 23, 23, 0.02) 241px),repeating-linear-gradient(135deg, rgba(243,172,241, 0.06) 0px, rgba(243,172,241, 0.06) 15px,rgba(74, 74, 74, 0.02) 15px, rgba(74, 74, 74, 0.02) 45px,rgba(235,144,230, 0.08) 45px, rgba(235,144,230, 0.08) 71px,rgba(43, 43, 43, 0.02) 71px, rgba(43, 43, 43, 0.02) 95px,rgba(131, 131, 131, 0.02) 95px, rgba(131, 131, 131, 0.02) 118px,rgba(21, 21, 21, 0.02) 118px, rgba(21, 21, 21, 0.02) 130px,rgba(77, 77, 77, 0.02) 130px, rgba(77, 77, 77, 0.02) 167px,rgba(229,36,235, 0.04) 167px, rgba(229,36,235, 0.04) 189px),linear-gradient(90deg, rgb(251, 251, 251),rgb(250, 250, 250))

.Main2
  width 33%
  min-width 330px
  justify-content center
  text-align center
  margin-bottom 3%
  margin-left 1%
  margin-right 1%
  font-size 20pt
  line-height 1
  color #000000
  font-weight 400
  font-family  'Roboto', sans-serif

.photo
  width 80%
  justify-content center
  display inline
  margin-right 10%
  margin-left 10%

@import url(http://fonts.googleapis.com/css?family=Roboto:700,400&subset=latin,cyrillic);
#Feature
  position relative
  height auto
  width 100%

#Properties
  margin 10% auto
  width 90%
  display flex
  justify-content center
  align-items center
  flex-direction row
  @media screen and (max-width: 1000px)
    flex-direction column

#FeatureTitle
  position relative
  height auto
  min-height 30px
  z-index 2
  width 50%
  min-width 450px
  text-align center
  margin 7% auto
  color #000000
  font-weight 500
  font-family  'Roboto', sans-serif
  font-size 30pt
  line-height 1
  @media screen and (max-width: 450px) {
    width 80%
    min-width 100px
  }

#FeatureText
  position relative
  height auto
  min-height 100px
  z-index 2
  width 50%
  min-width 450px
  text-align center
  margin 7% auto
  margin-bottom 30px
  color #000000
  font-weight 400
  font-family  'Roboto', sans-serif
  font-size 18pt
  line-height 1
  @media screen and (max-width: 450px) {
    width 80%
    min-width 100px
  }

#FeatureTitle2
  position relative
  height auto
  min-height 30px
  z-index 2
  width auto
  margin 1% auto
  min-width 40px
  text-align center
  color #000000
  font-weight 500
  font-family  'Roboto', sans-serif
  font-size 30pt
  line-height 1
  @media screen and (max-width: 450px) {
    width 80%
    min-width 100px
  }

#FeatureText2
  position relative
  height auto
  min-height 40px
  z-index 2
  min-width 40px
  text-align center
  color #000000
  font-weight 400
  font-family  'Roboto', sans-serif
  font-size  25pt
  line-height 1
  @media screen and (max-width: 450px) {
    width 80%
    min-width 100px
  }

.design
  display inline-block
  margin-right 40%
  margin-left 40%
  width auto
  padding 15px
  text-decoration none
  cursor pointer
  background #763dca
  border-radius 10px
  border 1px solid #765dca
  font 12px/1 Roboto, sans-serif
  color #ffffff
  font-size 30pt
  margin-bottom 3%
  text-align center
  font-color #ffffff
  text-color #ffffff

.reviewCarousel
  margin-bottom 10%
  .carouselBox
    margin auto

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
  padding-left max(calc(15% - 100px), 20px)
  padding-right max(calc(15% - 100px), 20px)
  display grid
  grid-template-columns repeat(4, 25%)
  @media screen and (max-width: 800px)
    grid-template-columns repeat(2, 50%)
.functionalityCard
  padding 3px
  min-height 20vh
  margin 1vw
  border solid #763DCA 1px
  border-radius 25px
  border-bottom-left-radius 3px
  float left
  .md-card-content
    display flex
    height 65%
  .md-card-actions
    .md-button
      margin 10px

</style>
