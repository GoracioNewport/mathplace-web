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

            .theoryEditBox
              .theoryComponent(
                v-for = 'component in task.text'
              )
                .theoryTextField(v-if ='component.type === "text"')
                  textarea.theoryText(placeholder = 'Введите текст здесь', v-model = "component.inner")
                .theoryText(v-if ='component.type === "img"')
                  label(for='img') Select image:
                  input#img(type='file', name='img', accept='image/*', @change="onFileSelected", @click="onFileButtonClicked(tasks.indexOf(task), task.text.indexOf(component))")
                .button.button-warning(@click='task.text.splice(task.text.indexOf(component), 1)') Удалить

              .button.button-success(@click='addContent(tasks.indexOf(task), "text")') Добавить абзац

              .button.button-success(
                @click='addContent(tasks.indexOf(task), "img")'
                ) Добавить картинку
            .taskEditBox(v-if ="task.type === 'task'")
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
import firebase from 'firebase/app'
import 'firebase/storage'
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
      ],
      currTaskId: 0,
      currComponentId: 0
    }
  },
  methods: {
    ...mapActions(['sendTopic']),
    addTask () {
      var task = {
        text: [],
        type: 'theory',
        answer: '',
        solution: '',
        difficulty: '1'
      }
      this.tasks.push(task)
    },
    addContent (id, type) {
      console.log(this.tasks, id, type)
      var data = {
        type: type,
        inner: ''
      }
      this.tasks[id].text.push(data)
    },
    nullifyContent (id) {
      this.tasks[id].text = []
    },
    onFileButtonClicked (taskId, componentId) {
      this.currTaskId = taskId
      this.currComponentId = componentId
    },
    onFileSelected (event) {
      this.tasks[this.currTaskId].text[this.currComponentId].inner = event.target.files[0]
      console.log(event.target.files[0])
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
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].type === 'task') this.cnt_task++
      } this.items = this.tasks.length
      var data = {
        author: this.getUser.name,
        like: 0,
        name: this.name,
        public: !this.private,
        theme: this.theme,
        cnt_task: this.cnt_task,
        items: this.items
      }

      for (let i = 0; i < this.tasks.length; i++) {
        var task = ['']
        console.log(this.tasks)
        for (let j = 0; j < this.tasks[i].text.length; j++) {
          if (this.tasks[i].text[j].type === 'text') {
            task[0] += this.tasks[i].text[j].inner.toString() + ' \n'
          } else {
            let file = this.tasks[i].text[j].inner
            let fileName = file.name
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            const ext = fileName.slice(fileName.lastIndexOf('.'))
            let currentTime = new Date().getTime()
            let imageUrl
            let imageTimeName = 'uploads/' + currentTime + ext
            await firebase.storage().ref(imageTimeName).put(file)
            await firebase.storage().ref(imageTimeName).getDownloadURL().then(function (url) {
              imageUrl = url
            })
            task[0] += '[' + imageUrl.toString() + '] \n'
          }
        }
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
      console.log(sendInformation)
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
