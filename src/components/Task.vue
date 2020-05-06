<template lang="pug">
  .content-wrapper
    .taskbar
        .container
          .taskbar-content
            .taskbar-list__wrapper
              .taskbar-list
                .taskbar-item(
                  v-for = "task in this.taskList"
                  :key = "task.id"
                )
                  .taskbar-link(@click='changeActiveTask(task.id)')

                    img.img_taskbar(
                      v-if = 'task.type == "task"'
                      :src = 'taskImage')
                    img.img_taskbar(
                      v-if = "task.type == 'theory'"
                      :src = "theoryImage")
    .content
      .name
        span(
          v-if = 'this.taskList[this.activeTask].type == "task"'
        ) Задача {{ this.taskList[this.activeTask].taskId }}
        span(
          v-if = 'this.taskList[this.activeTask].type == "theory"'
        ) Теория
        img.star(class="star1", src='@/assets/images/star.png', alt='Звезда')
        img.star(class="star2", src='@/assets/images/star.png', alt='Звезда')
        img.star(class="star3", src='@/assets/images/star.png', alt='Звезда')
      .condition
        .text-part(
          v-for = "part in this.taskList[this.activeTask].text"
        )
          span(
            v-if = 'part.type == "text"'
          ) {{ part.content }}

          img.condition-image(
            v-else-if = 'part.type == "img"'
            :src = 'part.content'
          )
      .answ
        input(size="40", placeholder="Введите ответ" class="ans")
      .enter
        a.but(href="#zatemnenie")
          img(src='@/assets/images/lock.png', alt='Решения',id="lock")
        .but
          img(src='@/assets/images/comment_1.png', alt='Комментарии')
        .but
          img(src='@/assets/images/like_none.png', alt='Лайк')
        input.sub(type='submit', value="Отправить")
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
import theoryImage from '@/assets/images/theory.png'
import taskImage from '@/assets/images/question.png'
import { mapActions } from 'vuex'
export default {
  async mounted () {
    await this.fetchTasks()
    this.taskList = this.$store.getters.getTasks
  },
  data () {
    return {
      theoryImage,
      taskImage,
      activeTask: 0,
      taskList: []
    }
  },
  methods: {
    ...mapActions(['fetchTasks']),
    changeActiveTask (i) {
      this.activeTask = i
    }
  }
}
</script>

<style lang="stylus" scoped>
  .condition-image
    display block
    float none
    margin-left auto
    margin-right auto
  .star
    height 40px
    max-height 100px
    width auto
  .taskbar-list
    margin 0 auto
    display table
  .taskbar-item
    padding 13px 10px 10px 20px
    float left
  .content
    font-family Roboto, Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
  .img_taskbar
    height 42px
    width 42px
    padding 10px
    border 2px #ffffff solid
    border-radius 17%
    background-size 100%
    background rgba(102, 102, 102, 0.5)
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
  .taskbar
    background-color #763DCA
    width 100%
    height 68px
    orientation top
    align-items center
    diaply flex
  .wrapper
    width 100vw
    max-width: 100%

  .taskbar-link
    &:hover
      cursor pointer
</style>
