<template lang="pug">
  .content-wrapper
    .editBox
      .titleInfo
        input(type = 'text', placeholder = 'Введите название вашей темы', v-model = "name")
        label(for = 'isPrivate') Приватная тема
          input#isPrivate(type = 'checkbox', v-model = "private")
        select(v-model = "theme")
          option(v-for = 'theme in themeList') {{ theme }}
      .tasksInfo
        .tasksContent
          .task(v-for = 'task in tasks')
            .taskType
              label(for='theory') Теория
                input#theory(type = 'radio', value = 'theory', v-model = "task.type")
              label(for='task') Задача
                input#task(type = 'radio', value = 'task', v-model = "task.type")

            .theoryEditBox(v-if ="task.type === 'theory'")
              textarea.theoryText(placeholder = 'Введите текст теории здесь', v-model = "task.text")
            .taskEditBox(v-if ="task.type === 'task'")
              textarea.taskText(placeholder = 'Введите текст задачи здесь', v-model = "task.text")
              input.taskAnswer(placeholder = 'Введите ответ на задачу', v-model = "task.answer")
              br
              span Выберите сложность своей задачи:

              label(for='difOne') Легкая
                input#difOne(type = 'radio', value = '1', v-model = "task.difficulty")
              label(for='difTwo') Средняя
                input#difTwo(type = 'radio', value = '2', v-model = "task.difficulty")
              label(for='difThree') Трудная
                input#difThree(type = 'radio', value = '3', v-model = "task.difficulty")

              textarea.taskSolution(placeholder = 'Введите подробное решение вашей задачи', v-model = "task.solution")
            .button.button-warning(@click='tasks.splice(tasks.indexOf(task), 1)') Удалить
        .button.button-warning(@click='addTask()') Добавить теорию или задачу
      .button.button-success(@click='sendTitle()') Опубликовать тему
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      name: '',
      class: '',
      cnt_task: 0,
      items: 0,
      like: 0,
      private: false,
      tasks: [],
      theme: 'Школа',
      themeList: [
        'Школа',
        'Экзамены',
        'Геометрия',
        'Алгебра',
        'Комбинаторика',
        'Логика',
        'Графы'
      ]
    }
  },
  methods: {
    ...mapActions(['sendTopic']),
    addTask () {
      var task = {
        text: '',
        type: 'theory',
        answer: '',
        solution: '',
        difficulty: '1'
      }
      this.tasks.push(task)
    },
    generateToken (length) {
      var a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('')
      var b = []
      for (var i = 0; i < length; i++) {
        var j = (Math.random() * (a.length - 1)).toFixed(0)
        b[i] = a[j]
      }

      // var succes = await this.isTokenValid
      var succes = true
      var returnTo = ''
      succes ? returnTo = b.join('') : returnTo = this.generateToken(length)
      return returnTo
    },
    async sendTitle () {
      this.theme = this.theme.toLowerCase()
      var data = {
        author: this.getUser.name,
        like: 0,
        name: this.name,
        public: !this.private,
        theme: this.theme
      }

      for (var i = 0; i < this.tasks.length; i++) {
        var task = []
        task.push(this.tasks[i].text)
        this.tasks[i].type === 'theory' ? task.push('theory') : task.push(this.tasks[i].answer)
        this.tasks[i].type === 'theory' ? task.push('null') : task.push(this.tasks[i].difficulty)
        this.tasks[i].type === 'theory' ? task.push('null') : task.push(this.tasks[i].solution)
        data['task'.concat(i.toString())] = task
      }
      var token = this.generateToken(5)
      var sendInformation = {
        token: token,
        title: data
      }
      this.sendTopic(sendInformation)
    }
  },
  computed: {
    ...mapGetters(['getUser', 'isTokenValid'])
  }
}
</script>

<style lang="stylus" scoped>
  label
    justify-items left
  .task
    border 1px solid #000000
    border-radius 10px
    margin 1%
    padding 1%
  .taskName
    margin 1%
</style>
