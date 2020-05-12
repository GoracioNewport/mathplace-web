<template lang="pug">
  .content-wrapper
    //- img#imgSmile(src="@/components/images/back.png")
    .taskbar(v-if="!isLoading")
      a(href="/")
        img#imgBack(src="@/components/images/back.png")
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
                    :class = '{ solvedTask : task.tries === 2, failedTask : task.tries === 0, thisButton : task.activeTask === activeTask || (activeTask === 0 && task.id === 0), anotherButton : task.activeTask != activeTask  && !(activeTask === 0 && task.id === 0)}'
                    :src = 'taskImage')
                  img.img_taskbar(
                    v-if = "task.type == 'theory'"
                    :class = '{ solvedTask : task.tries === 3, failedTask : task.tries === 0, thisButton : task.activeTask === activeTask  || (activeTask === 0 && task.id === 0), anotherButton : task.activeTask != activeTask && !(activeTask === 0 && task.id === 0)}'
                    :src = "theoryImage")

    .loading-indicator
        loading(
          :active.sync = "this.isLoading",
          :is-full-page = 'true',
          color = '#763dca')
    .content(v-if="taskList.length > 1")
      .name
        span(
          v-if = 'this.taskList[this.activeTask].type == "task"'
        ) Задача {{ this.taskList[this.activeTask].taskId }}
        span(
          v-if = 'this.taskList[this.activeTask].type == "theory"'
        ) {{ getCurrentTopic }}

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
          @keyup.enter = 'sendAnswer',
          v-bind:class = "{ 'answerCorrect' : this.taskList[this.activeTask].tries == 2 || this.taskList[this.activeTask].tries == 3 , 'answerWrong' : this.taskList[this.activeTask].tries == 0 }")
      .enter
        .send
          //- a.but(href="#zatemnenie")
          //-   img(src='@/assets/images/lock.png',
          //-   v-if = 'this.taskList[this.activeTask].type == "task"', alt='Решения',id="lock")
          //- .but
          //-   img(src='@/assets/images/comment_1.png', alt='Комментарии')
          .but
            input#checkbox.checkbox(type='checkbox' v-model = 'topicLiked')
            label(for='checkbox' @click = 'likeButton')
              svg#heart-svg(viewBox='467 392 58 57', xmlns='http://www.w3.org/2000/svg')
                g#Group(fill='none', fill-rule='evenodd', transform='translate(467 392)')
                  path#heart(d='M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z', fill='#AAB8C2')
                  circle#main-circ(fill='#763DCA', opacity='0', cx='29.5', cy='29.5', r='1.5')
                  g#grp7(opacity='0', transform='translate(7 6)')
                    circle#oval1(fill='#9CD8C3', cx='2', cy='6', r='2')
                    circle#oval2(fill='#8CE8C3', cx='5', cy='2', r='2')
                  g#grp6(opacity='0', transform='translate(0 28)')
                    circle#oval1(fill='#CC8EF5', cx='2', cy='7', r='2')
                    circle#oval2(fill='#91D2FA', cx='3', cy='2', r='2')
                  g#grp3(opacity='0', transform='translate(52 28)')
                    circle#oval2(fill='#9CD8C3', cx='2', cy='7', r='2')
                    circle#oval1(fill='#8CE8C3', cx='4', cy='2', r='2')
                  g#grp2(opacity='0', transform='translate(44 6)')
                    circle#oval2(fill='#CC8EF5', cx='5', cy='6', r='2')
                    circle#oval1(fill='#CC8EF5', cx='2', cy='2', r='2')
                  g#grp5(opacity='0', transform='translate(14 50)')
                    circle#oval1(fill='#91D2FA', cx='6', cy='5', r='2')
                    circle#oval2(fill='#91D2FA', cx='2', cy='2', r='2')
                  g#grp4(opacity='0', transform='translate(35 50)')
                    circle#oval1(fill='#F48EA7', cx='6', cy='5', r='2')
                    circle#oval2(fill='#F48EA7', cx='2', cy='2', r='2')
                  g#grp1(opacity='0', transform='translate(24)')
                    circle#oval1(fill='#9FC7FA', cx='2.5', cy='3', r='2')
                    circle#oval2(fill='#9FC7FA', cx='7.5', cy='2', r='2')
          button.sub.submit-button(
            type = 'submit',
            @click = 'sendAnswer')
              span(v-if = 'this.taskList[this.activeTask].tries !== 2 && this.taskList[this.activeTask].type !== "theory"') Отправить
              span(v-else-if = 'this.activeTask !== (this.taskList.length - 1)') Дальше
              span(v-else) Завершить
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
import { mapActions, mapGetters } from 'vuex'
// import { beforeRouteLeave } from 'vue-router'

export default {
  components: {
    Loading
  },
  async mounted () {
    this.updateUser(['lastTheme', this.getCurrentTopic])
    this.changeCurrentLogo(this.getCurrentTopic)
    this.isLoading = true
    await this.fetchLikes()
    await this.fetchTasks()
    this.taskList = this.$store.getters.getTasks
    this.isLoading = false
    if (this.getUser.like.find(t => t === this.getCurrentTopic)) this.topicLiked = true
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
        type: 'task',
        answer: 0,
        difficulty: 0,
        solution: 0,
        tries: 1
      }],
      isLoading: true,
      answer: '',
      status: 'Idle',
      topicLiked: false
    }
  },
  methods: {
    ...mapActions(['fetchTasks', 'updateUser', 'like', 'fetchLikes', 'changeCurrentLogo']),
    changeActiveTask (i, thisTask) {
      console.log('Change Active Task', i + 1)
      this.status = 'Idle'
      this.activeTask = i
      thisTask.activeTask = i
      this.taskList[this.activeTask].tries === 2 ? this.answer = this.taskList[this.activeTask].answer : this.answer = ''
    },
    sendAnswer () {
      if (this.answer === '') alert('Поле для ввода пустое!')
      else {
        if (this.$store.getters.getUser === null) this.$router.push('/login')
        else if (this.activeTask === (this.taskList.length - 1) && (this.taskList[this.activeTask].tries === 2 || this.taskList[this.activeTask].tries === 3)) this.$router.push('/')
        else if (this.taskList[this.activeTask].tries !== 2 && this.taskList[this.activeTask].tries !== 3) { // Task complition
          this.answer = this.answer.replace(',', '.')
          let verdict = 1
          if (this.answer === this.taskList[this.activeTask].answer || this.taskList[this.activeTask].type === 'theory') {
            if (this.taskList[this.activeTask].type !== 'theory') {
              this.updateUser(['money', this.getUser.money + 3])
              this.updateUser(['right', this.getUser.right + 1])
            } this.status = 'Correct'
            if (this.taskList[this.activeTask].type === 'theory') verdict = 3
            else verdict = 2
          } else {
            this.status = 'Wrong'
            verdict = 0
          }

          if (this.taskList[this.activeTask].type !== 'theory') this.updateUser(['submit', this.getUser.submit + 1])
          let newStatus = []
          for (let i = 0; i < this.taskList.length; i++) newStatus[i] = this.taskList[i].tries
          newStatus[this.activeTask] = verdict
          this.updateUser([this.getCurrentTopic, newStatus])
          this.taskList[this.activeTask].tries = verdict
          if (this.taskList[this.activeTask].type === 'theory') this.changeActiveTask(this.activeTask + 1, this.taskList[this.activeTask + 1])
        } else {
          this.changeActiveTask(this.activeTask + 1, this.taskList[this.activeTask + 1])
        }
      }
    },
    likeButton () {
      let liked = this.getUser.like
      if (this.getUser.like.find(t => t === this.getCurrentTopic)) {
        console.log('ok')
        liked.splice(liked.indexOf(this.getCurrentTopic), 1)
        this.like(false)
      } else {
        console.log('not ok')
        liked.push(this.getCurrentTopic)
        this.like(true)
      }
      this.updateUser(['like', liked])
    }
  },
  computed: {
    ...mapGetters(['getCurrentTopic', 'getUser', 'getTopicLikes']),
    getDifficulty () {
      var dif = this.taskList[this.activeTask].difficulty
      if (dif !== 'null') return parseInt(dif, 10)
      else return 0
    }
  },
  beforeRouteLeave (to, from, next) {
    this.changeCurrentLogo('MathPlace')
    next()
  }
}
</script>

<style lang="stylus" scoped>
  #imgSmile
    position relative
    height 90%
    width 90%
  .taskbar-content
    position relative
  #imgBack
    position absolute
    float left
    padding 6px
    height 36px
    width 36px
    margin-left 2%
    margin-top 15px
    // display block
    // margin 0px auto
    // text-align center
    // margin-top 5%
    // vertical-align middle
  .solvedTask
    background rgba(0, 255, 0, .5) !important
  .failedTask
    background rgba(255, 0, 0, .5) !important
  .answerCorrect
    background-color rgba(0, 255, 0, .4)
  .answerWrong
    background-color rgba(255, 0, 0, .4)
  .submit-button
    text-align center
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
    max-height 300px
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
    padding 13px 9px 9px 20px
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
    @media screen and (max-width: 500px) {
        width 88%
        margin-right 6%
        margin-left 6%
    }
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
    @media screen and (max-width: 500px) {
        width 88%
        margin-right 6%
        margin-left 6%
    }
  .answ
    heigth auto
    // width 67.5%
    margin-top 20px
    margin-left 23%
    margin-right 23%
    @media screen and (max-width: 500px) {
        width 88%
        margin-right 0%
        margin-left 0%
    }
  .enter
    position relative
    width 54%
    height 100%
    margin-left 23%
    margin-right 23%
    @media screen and (max-width: 500px) {
        width 88%
        margin-right 6%
        margin-left 6%
    }
  .submit-field
    position relative
    width 100%
    margin-top 0px
    margin-left 0%
    margin-right 0%
    display inline-block
    @media screen and (max-width: 500px) {
        width 88%
        margin-right 6%
        margin-left 6%
    }

  .send
    positine relative
    height auto
    width 100%
    margin-left 0%
    margin-right 0%
    margin-top 8px
    // dispaly flex
    float right
  .sub
    position relative
    width 90%
    height auto
    // margin-top 6%
    display inline-block
    color #ffffff
    padding 9px
    font-family: 'Roboto', sans-serif
    font-size: 25px
    font-weight: bold
    background-color #763DCA
    box-shadow 0 0 10px rgba(0,0,0,0.5)
    border-radius 10px
    outline none
    border none
    vertical-align middle
    &:hover
        background #5E2DA6
  .but
    position relative
    width 10%
    height 100%
    display inline-block
    vertical-align middle
    text-align center
    // margin auto
  .ans
    postion relative
    height 50px
    width 100%
    border-radius 10px
    margin-bottom 0px
    color:#525252
    font-family: 'Roboto', sans-serif
    font-size: 25px
    font-weight: bold
    box-shadow 0 0 10px rgba(0,0,0,0.5)
    padding 11px
    outline none
    border none
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
    height auto
    orientation top
    align-items center
    diaply flex
  .wrapper
    width 100vw
    max-width: 100%

  .taskbar-link
    &:hover
      cursor pointer

// Like animation

  svg {
    cursor: pointer;
    overflow: visible;
    width: 100%
  }

  svg #heart {
    transform-origin: center;
    animation: animateHeartOut .3s linear forwards;
  }

  svg #main-circ {
    transform-origin: 29.5px 29.5px;
  }

  .checkbox {
    display: none;
  }

  .checkbox:checked+label svg #heart {
    transform: scale(0.2);
    fill: #763DCA;
    animation: animateHeart .3s linear forwards .25s;
  }

  .checkbox:checked+label svg #main-circ {
    transition: all 2s;
    animation: animateCircle .3s linear forwards;
    opacity: 1;
  }

  .checkbox:checked+label svg #grp1 {
    opacity: 1;
    transition: .1s all .3s;
  }

  .checkbox:checked+label svg #grp1 #oval1 {
    transform: scale(0) translate(0, -30px);
    transform-origin: 0 0 0;
    transition: .5s transform .3s;
  }

  .checkbox:checked+label svg #grp1 #oval2 {
    transform: scale(0) translate(10px, -50px);
    transform-origin: 0 0 0;
    transition: 1.5s transform .3s;
  }

  .checkbox:checked+label svg #grp2 {
    opacity: 1;
    transition: .1s all .3s;
  }

  .checkbox:checked+label svg #grp2 #oval1 {
    transform: scale(0) translate(30px, -15px);
    transform-origin: 0 0 0;
    transition: .5s transform .3s;
  }

  .checkbox:checked+label svg #grp2 #oval2 {
    transform: scale(0) translate(60px, -15px);
    transform-origin: 0 0 0;
    transition: 1.5s transform .3s;
  }

  .checkbox:checked+label svg #grp3 {
    opacity: 1;
    transition: .1s all .3s;
  }

  .checkbox:checked+label svg #grp3 #oval1 {
    transform: scale(0) translate(30px, 0px);
    transform-origin: 0 0 0;
    transition: .5s transform .3s;
  }

  .checkbox:checked+label svg #grp3 #oval2 {
    transform: scale(0) translate(60px, 10px);
    transform-origin: 0 0 0;
    transition: 1.5s transform .3s;
  }

  .checkbox:checked+label svg #grp4 {
    opacity: 1;
    transition: .1s all .3s;
  }

  .checkbox:checked+label svg #grp4 #oval1 {
    transform: scale(0) translate(30px, 15px);
    transform-origin: 0 0 0;
    transition: .5s transform .3s;
  }

  .checkbox:checked+label svg #grp4 #oval2 {
    transform: scale(0) translate(40px, 50px);
    transform-origin: 0 0 0;
    transition: 1.5s transform .3s;
  }

  .checkbox:checked+label svg #grp5 {
    opacity: 1;
    transition: .1s all .3s;
  }

  .checkbox:checked+label svg #grp5 #oval1 {
    transform: scale(0) translate(-10px, 20px);
    transform-origin: 0 0 0;
    transition: .5s transform .3s;
  }

  .checkbox:checked+label svg #grp5 #oval2 {
    transform: scale(0) translate(-60px, 30px);
    transform-origin: 0 0 0;
    transition: 1.5s transform .3s;
  }

  .checkbox:checked+label svg #grp6 {
    opacity: 1;
    transition: .1s all .3s;
  }

  .checkbox:checked+label svg #grp6 #oval1 {
    transform: scale(0) translate(-30px, 0px);
    transform-origin: 0 0 0;
    transition: .5s transform .3s;
  }

  .checkbox:checked+label svg #grp6 #oval2 {
    transform: scale(0) translate(-60px, -5px);
    transform-origin: 0 0 0;
    transition: 1.5s transform .3s;
  }

  .checkbox:checked+label svg #grp7 {
    opacity: 1;
    transition: .1s all .3s;
  }

  .checkbox:checked+label svg #grp7 #oval1 {
    transform: scale(0) translate(-30px, -15px);
    transform-origin: 0 0 0;
    transition: .5s transform .3s;
  }

  .checkbox:checked+label svg #grp7 #oval2 {
    transform: scale(0) translate(-55px, -30px);
    transform-origin: 0 0 0;
    transition: 1.5s transform .3s;
  }

  .checkbox:checked+label svg #grp2 {
    opacity: 1;
    transition: .1s opacity .3s;
  }

  .checkbox:checked+label svg #grp3 {
    opacity: 1;
    transition: .1s opacity .3s;
  }

  .checkbox:checked+label svg #grp4 {
    opacity: 1;
    transition: .1s opacity .3s;
  }

  .checkbox:checked+label svg #grp5 {
    opacity: 1;
    transition: .1s opacity .3s;
  }

  .checkbox:checked+label svg #grp6 {
    opacity: 1;
    transition: .1s opacity .3s;
  }

  .checkbox:checked+label svg #grp7 {
    opacity: 1;
    transition: .1s opacity .3s;
  }

  @keyframes animateCircle {
    40% {
      transform: scale(10);
      opacity: 1;
      fill: #DD4688;
    }
    55% {
      transform: scale(11);
      opacity: 1;
      fill: #D46ABF;
    }
    65% {
      transform: scale(12);
      opacity: 1;
      fill: #CC8EF5;
    }
    75% {
      transform: scale(13);
      opacity: 1;
      fill: transparent;
      stroke: #CC8EF5;
      stroke-width: .5;
    }
    85% {
      transform: scale(17);
      opacity: 1;
      fill: transparent;
      stroke: #CC8EF5;
      stroke-width: .2;
    }
    95% {
      transform: scale(18);
      opacity: 1;
      fill: transparent;
      stroke: #CC8EF5;
      stroke-width: .1;
    }
    100% {
      transform: scale(19);
      opacity: 1;
      fill: transparent;
      stroke: #CC8EF5;
      stroke-width: 0;
    }
  }

  @keyframes animateHeart {
    0% {
      transform: scale(0.2);
    }
    40% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes animateHeartOut {
    0% {
      transform: scale(1.4);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
