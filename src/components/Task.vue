<template lang="pug">
  .content-wrapper
    .navbar
        .container
          .navbar-content
            span.line.line-1
            span.line.line-2
            span.line.line-3

            .navbar-list__wrapper
              ul.navbar-list
                li.navbar-item(
                  v-for = "link in taskList"
                  :key = "link.title"
                )
                  router-link.navbar-link(:to='`${link.url}`')
                    img#img_navbar(:src="task")
                  //- router-link.navbar-link(
                  //-   :to = " `${link.url}`"
                  //- ) {{ link.src }}
    .name  Задача 1
      img(class="star" src='@/assets/images/star.png', alt='Звезда')
      img(class="star" src='@/assets/images/star.png', alt='Звезда')
      img(class="star" src='@/assets/images/star.png', alt='Звезда')
    .condition
      p В случайном эксперименте бросают две игральные кости. Найдите вероятность того, что сумма выпавших очков равна 10 Результат округлите до сотых.
      p С точностью 2 знака после запятой
    .answ
      input(size="40", placeholder="Введите ответ" class="ans")
    .enter
      a.but(href="#zatemnenie")
        img(src='@/assets/images/lock.png', alt='Решения',id="lock")
      a.but(href="#")
        img(src='@/assets/images/comment_1.png', alt='Комментарии')
      a.but(href="#taskexp")
        img(src='@/assets/images/like_none.png', alt='Лайк', @click='chg(this.id)')
      input.sub(type='button', value="Отправить")
    #zatemnenie
      #okno
        .solve
          .consolve
            //- strong {{condition}}
          .solsolve
            p Решение
          .anssolve
            //- strong {{answer}}
        a.close(href='#') Закрыть решение
</template>

<script>
import theory from '@/assets/images/theory.png'
import task from '@/assets/images/question.png'
import { mapActions } from 'vuex'
export default {
  async mounted () {
    await this.fetchTasks()
    this.taskList = this.$store.getters.getTasks
    console.log(this.taskList)
  },
  data () {
    return {
      theory,
      task,
      taskList: []
    }
  },
  methods: mapActions(['fetchTasks'])
}
</script>

<style lang="stylus" scoped>
  #img_navbar
    height 30px
    width 30px
  .star
    height 40px
    max-height 100px
    width auto

  .name
    background #763DCA
    text-align left
    color #ffffff
    padding 10px
    font-family: 'Roboto', sans-serif
    font-size: 30px
    font-weight: bold
    box-shadow 0 0 10px rgba(0,0,0,0.5)
    border-radius 10px 10px 0 0
    margin-top 50px
    margin-left 23%
    margin-right 23%
  img
    orientation right
    float right
    margin-right 5px
  .condition
    min-height 350px
    background #ffffff
    color #000000
    color:#525252
    font-family: 'Roboto', sans-serif
    font-size: 20px
    font-weight: 450
    border-radius 0 0 10px 10px
    box-shadow 0 0 5px rgba(0,0,0,0.5)
    padding 10px
    margin-left 23%
    margin-right 23%
  .answ
    margin-top 20px
    margin-left 23%
    margin-right 23%
  .enter
    margin-left 23%
    margin-right 23%
    display inline-block
  .sub
    background-color #763DCA
    color #ffffff
    padding 11px

    // color:#525252
    font-family: 'Roboto', sans-serif
    font-size: 25px
    font-weight: bold
    box-shadow 0 0 10px rgba(0,0,0,0.5)
    border-radius 10px
    outline none
    border none
    &:hover
        background #5E2DA6
    max-width 80%
    min-width 80%
    width 80%
    float right
  .but
    max-width 5%
    min-width 5%
    width 5%
    float left
  .ans
    background-color #ffffff
    border-radius 10px
    color:#525252
    font-family: 'Roboto', sans-serif
    font-size: 25px
    font-weight: bold
    box-shadow 0 0 10px rgba(0,0,0,0.5)
    padding 11px
    outline none
    border none
    max-width 100%
    min-width 100%
    width 100%
  #zatemnenie
    background rgba(102, 102, 102, 0.5)
    width 100%
    height 100%
    position absolute
    top 0
    left 0
    display none
    &:target
        display block

  #okno
    box-shadow 0 0 10px rgba(0,0,0,0.5)
    width 60%
    height 80%
    text-align center
    padding 15px
    border-radius 10px
    color #000000
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    margin auto
    background #ffffff

  .solve
    height 100%
  .consolve
    box-shadow 0 0 10px rgba(0,0,0,0.5)
    height 38%
    border-radius 10px
  .solsolve
    box-shadow 0 0 10px rgba(0,0,0,0.5)
    height 40%
    margin-top 2%
    border-radius 10px

  .anssolve
    box-shadow 0 0 10px rgba(0,0,0,0.5)
    height 17%
    margin-top 2%
    border-radius 10px

  .close
    display inline-block
    box-shadow 0 0 10px rgba(0,0,0,0.5)
    border-radius 7px
    color #ffffff
    padding 0 12px
    orientation bottom
    margin-top 5%
    text-decoration none
    background #763DCA
    font-size 14pt
    cursor pointer
    &:hover
        background #5E2DA6
  .navbar
    background-color #763DCA
    width 100%
    orientation top
    margin-top -1px
    align-items center
    diaply flex

  .wrapper
    width 100vw
    max-width: 100%
</style>
