<template lang="pug">
  div
    .navbar
        .container
          .navbar-content
            .button-burger(
              @click = "menuShow = !menuShow"
              :class="{ active: menuShow}"
            )
              span.line.line-1
              span.line.line-2
              span.line.line-3

            .navbar-list__wrapper(
              :class="{ active: menuShow}"
            )
              ul.navbar-list
                li.navbar-item(
                  v-for = "link in linkMenu"
                  :key = "link.title"
                  @click = "menuShow = false"
                )
                  router-link.navbar-link(:to=' `${link.url}`')
                    img#img_navbar(:src="task")
                  //- router-link.navbar-link(
                  //-   :to = " `${link.url}`"
                  //- ) {{ link.src }}
    .name  Задача 1
      img(class="star1", src='@/assets/images/star.png', alt='Звезда', height="30", width="30")
      img(class="star2", src='@/assets/images/star.png', alt='Звезда', height="30", width="30")
      img(class="star3", src='@/assets/images/star.png', alt='Звезда', height="30", width="30")
    .condition
      p В случайном эксперименте бросают две игральные кости. Найдите вероятность того, что сумма выпавших очков равна 10 Результат округлите до сотых.
      p С точностью 2 знака после запятой
    .answ
      input(size="40", placeholder="Введите ответ" class="ans")
    .enter
      a(href="#zatemnenie")
        img(class="but", src='@/assets/images/lock.png', alt='Решения',id="lock")
      a(href="#")
        img(class="but", src='@/assets/images/comment_1.png', alt='Решения')
      a(href="#taskexp")
        img(class="but", src='@/assets/images/like_none.png', alt='Решения', v-on:click='chg(this.id)')
      input(type='submit', value="Отправить", class="sub")
    #zatemnenie
      #okno
        .solve
          .consolve
            strong {{condition}}
          .solsolve
            p Решение
          .anssolve
            strong {{answer}}
        a.close(href='#') Закрыть решение
</template>

<script>
import theory from '@/assets/images/theory.png'
import task from '@/assets/images/question.png'
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
    answer: {
      default: 0,
      type: Number
    },
    solving: {
      default: '',
      type: String
    },
    condition: {
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
    }
  },
  data () {
    return {
      theory,
      task,
      topics: [
      ],
      menuShow: false,
      linkMenu: [
        {title: 'Theory', url: '/task', src: '@/assets/images/star.png'},
        {title: 'Task', url: '/task', src: '@/src/assets/question.png'},
        {title: 'Task', url: '/task', src: '@/src/assets/question.png'},
        {title: 'Task', url: '/task', src: '@/src/assets/question.png'}
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
  #img_navbar
    height 20px
    width 30px

  .name
    background #763DCA
    text-align left
    color #ffffff
    padding 10px
    box-shadow 0 0 10px rgba(0,0,0,0.5)
    border-radius 10px 10px 0 0
    margin-top 50px
    margin-left 30%
    margin-right 30%
  img
    orientation right
    float right
    margin-right 5px
  .condition
    background #ffffff
    color #000000
    border-radius 0 0 10px 10px
    box-shadow 0 0 5px rgba(0,0,0,0.5)
    padding 10px
    margin-left 30%
    margin-right 30%
  .answ
    margin-top 20px
    margin-left 30%
    margin-right 30%
  .enter
    margin-left 30%
    margin-right 30%
    display inline-block
  .sub
    background-color #763DCA
    color #ffffff
    padding 11px
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
    color #655cb5
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
  .wrapper
    width 100vw
    max-width: 100%
</style>
