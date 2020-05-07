<template lang="pug">
  .content-wrapper
    .taskbar(v-if="!isLoading")
      .container
        .taskbar-content
          .taskbar-list__wrapper
            .taskbar-list
              .taskbar-item(
                v-if = "taskList.length"
                v-for = "task in this.taskList"
                @click = 'changeActiveTask(task.id, task)'
                :key = "task.id"
              )
                .taskbar-link

                  img.img_taskbar(
                    v-if = 'task.type == "task"'
                    :class='{ thisButton : task.activeTask === activeTask || (activeTask === 0 && task.id === 0), anotherButton : task.activeTask != activeTask}'
                    :src = 'taskImage')
                  img.img_taskbar(
                    v-if = "task.type == 'theory'"
                    :class='{ thisButton : task.activeTask === activeTask  || (activeTask === 0 && task.id === 0), anotherButton : task.activeTask != activeTask && !(activeTask === 0 && task.id === 0)}'
                    :src = "theoryImage")

    .loading-indicator
        loading(
          :active.sync = "this.isLoading",
          :is-full-page = 'true',
          color = '#763dca')
    .content(v-if="!isLoading")
      .name
        span(
          v-if = 'this.taskList[this.activeTask].type == "task"'
        ) Задача {{ this.taskList[this.activeTask].taskId }}
        span(
          v-if = 'this.taskList[this.activeTask].type == "theory"'
        ) Теория

        img.star(
          class = "star1",
          src = '@/assets/images/star.png',
          alt = 'Звезда',
          v-for = 'i in getDifficulty')

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
      .answ(
        v-if='this.taskList[this.activeTask].type == "task"'
      )
        input.submit-field(
          size = "40",
          placeholder = "Введите ответ",
          class = "ans",
          v-bind:disabled = "this.taskList[this.activeTask].tries === 2",
          v-model = 'answer',
          v-bind:class = "{ 'answerCorrect' : this.taskList[this.activeTask].tries == 2, 'answerWrong' : this.taskList[this.activeTask].tries == 0 }")
      .enter
        a.but(href="#zatemnenie")
          img(src='@/assets/images/lock.png', alt='Решения',id="lock")
        .but
          img(src='@/assets/images/comment_1.png', alt='Комментарии')
        .but
          img(src='@/assets/images/like_none.png', alt='Лайк')
        input.sub.submit-button(
          type = 'submit',
          value = 'Отправить',
          v-if = 'this.taskList[this.activeTask].type == "task"',
          @click = 'sendAnswer')
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
import Loading from 'vue-loading-overlay'
import theoryImage from '@/assets/images/theory.png'
import taskImage from '@/assets/images/question.png'
import 'vue-loading-overlay/dist/vue-loading.css'
import { mapActions } from 'vuex'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  components: {
    Loading
  },
  async mounted () {
    this.isLoading = true
    await this.fetchTasks()
    this.taskList = this.$store.getters.getTasks
    this.isLoading = false
  },
  data () {
    return {
      theoryImage,
      taskImage,
      activeTask: 0,
      taskList: [{
        id: 0,
        taskId: 0,
        text: '',
        type: 'text',
        answer: 0,
        difficulty: 0,
        solution: 0,
        tries: 1
      }],
      isLoading: true,
      answer: '',
      status: 'Idle'
    }
  },
  methods: {
    ...mapActions(['fetchTasks']),
    changeActiveTask (i, thisTask) {
      this.status = 'Idle'
      this.activeTask = i
      thisTask.activeTask = i
      this.taskList[this.activeTask].tries === 2 ? this.answer = this.taskList[this.activeTask].answer : this.answer = ''
    },
    sendAnswer () {
      let verdict = 1
      if (this.answer === this.taskList[this.activeTask].answer) {
        this.status = 'Correct'
        verdict = 2
      } else {
        this.status = 'Wrong'
        verdict = 0
      }
      const db = firebase.firestore()
      let newStatus = []
      for (let i = 0; i < this.taskList.length; i++) newStatus[i] = this.taskList[i].tries
      newStatus[this.activeTask] = verdict
      db.collection('account').doc(this.$store.getters.getUser.id).update({
        [this.$store.getters.getCurrentTopic]: newStatus
      })
      this.taskList[this.activeTask].tries = verdict
    }
  },
  computed: {
    getDifficulty () {
      var dif = this.taskList[this.activeTask].difficulty
      if (dif !== 'null') return parseInt(dif, 10)
      else return 0
    }
  }
}
</script>

<style lang="stylus" scoped>
  .answerCorrect
    background-color rgba(0, 255, 0, .4)
  .answerWrong
    background-color rgba(255, 0, 0, .4)
  .submit-button
    &:hover
      cursor pointer
  .thisButton
    height 42px
    width 42px
    padding 10px
    border 2px #ffffff solid
    border-radius 17%
    background-size 100%
    background rgba(102, 102, 102, 0.5)
  .anotherButton
    height 42px
    width 42px
    padding 10px
    border 0px #ffffff solid
    border-radius 17%
    background-size 100%
    background rgba(102, 102, 102, 0.5)
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
    margin auto
  .ans
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
