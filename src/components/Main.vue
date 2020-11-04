<template lang="pug">
.content-wrapper
    #online
      .Main
        #design6.gradient
        p#FeatureTitle
          | Создавайте онлайн-уроки в конструкторе
        p#FeatureText
          | Делитесь знаниями на нашей образовательной платформе
        #design5.gradient
    
    button.design(onclick="document.location='https://mathplace.ru/customTitle'")
        | Попробовать

    img.photo(src="./images/Web_View.png")
    
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

</template>

<script>

export default {
  data () {
    return {
      state: 0,
      answer: ''
    }
  },
  methods: {
    sendAnswer () {
      if (this.answer === '10') this.state = 1
      else this.state = 2
    }
  }
}

</script>

<style lang="stylus" scoped>

.answerCorrect
  background rgba(0, 255, 0, .5)
.answerWrong
  background rgba(255, 0, 0, .5)

#Content
    position absolute
    width 100%
    height auto

.content-wrapper
    // clear both
    position relative
    display block
    width 100%
    height 300px

.Main2
    width 33%
    justify-content center
    text-align center
    margin-bottom 3%
    margin-left 1%
    margin-right 1%
    font-size 2em
    line-height 1
    color #525252
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
    flex-direction row
    justify-content center

#FeatureTitle
    position relative
    height auto
    min-height 30px
    z-index 10
    width 50%
    min-width 450px
    text-align center
    margin 7% auto
    color #525252
    font-weight 500
    font-family  'Roboto', sans-serif
    font-size  4em
    line-height 1
    @media screen and (max-width: 450px) {
        width 80%
        min-width 100px
    }

#FeatureText
    position relative
    height auto
    min-height 100px
    z-index 10
    width 50%
    min-width 450px
    text-align center
    margin 7% auto
    color #525252
    font-weight 400
    font-family  'Roboto', sans-serif
    font-size  2.5em
    line-height 1
    @media screen and (max-width: 450px) {
        width 80%
        min-width 100px
    }

#FeatureTitle2
    position relative
    height auto
    min-height 30px
    z-index 10
    width auto
    margin 1% auto
    min-width 40px
    text-align center
    color #525252
    font-weight 500
    font-family  'Roboto', sans-serif
    font-size  3em
    line-height 1
    @media screen and (max-width: 450px) {
        width 80%
        min-width 100px
    }

#FeatureText2
    position relative
    height auto
    min-height 40px
    z-index 10
    min-width 40px
    text-align center
    color #525252
    font-weight 400
    font-family  'Roboto', sans-serif
    font-size  2.5em
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
    font-size 3em
    margin-bottom 3%
    text-align center
    font-color #ffffff
    text-color #ffffff

</style>
