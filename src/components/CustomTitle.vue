<template lang="pug">
  .content-wrapper
    .editBox
      .marginBox
        .titleInfo
          p.olympTitle Создать урок
          input.olympName(type = 'text', placeholder = 'Введите название вашей темы', v-model = "name")
          label(for = 'isPrivate') Приватная тема
            input#isPrivate(type = 'checkbox', v-model = "private")
          select.olympTheme(v-model = "theme")
            option(v-for = 'theme in themeList') {{ theme }}
        .tasksInfo
          .tasksContent
            .task(v-for = 'task in tasks')
              .taskType
                label(for='theory') Теория
                  input#theory(type = 'radio', value = 'theory', v-model = "task.type")
                label(for='task') Задача
                  input#task(type = 'radio', value = 'task', v-model = "task.type")

              .button.img.delete_button(@click='tasks.splice(tasks.indexOf(task), 1)')
              .theoryEditBox
                .theoryComponent(
                  v-for = 'component in task.text'
                )
                  .button.img.delete_button(@click='task.text.splice(task.text.indexOf(component), 1)')
                  .theoryTextField(v-if ='component.type === "text"')
                    textarea.theoryText(placeholder = 'Введите текст здесь', v-model = "component.inner")
                  .theoryText(v-if ='component.type === "img"')
                    label(for='img') Выберите картинку
                    input#img(type='file', name='img', accept='image/*', @change="onFileSelected", @click="onFileButtonClicked(tasks.indexOf(task), task.text.indexOf(component))")

                .button.button--round.button-success.buttonAdd(@click='addContent(tasks.indexOf(task), "text")') Добавить абзац

                .button.button--round.button-success(
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
          .button.button--round.button-success(@click='addTask()') Добавить теорию или задачу
        .button.button--round.button-success.buttonPost(@click='sendTitle()') Опубликовать тему
    .successMenu(v-if = 'this.success')
      .successMenuBox
        .successText(v-if = 'this.loading')
          strong.titleTokenText Пожалуйста, подождите
          br
          span Мы публикуем вашу тему. Это может занять некоторое время.
          .vld-parent
            loading(
              :active.sync = "this.loading"
              :is-full-page = "this.falseVar"
              color = "#763dca"
              loader = 'dots'
              opacity = 0
              width = 150)
        .successText(v-else)
          strong.titleTokenText Готово!
          br
          span.titleTokenText Ключ темы:
          strong.titleTokenText  {{ this.token }}
          br
          br
          span Тема появится в сети через несколько минут.
          br
          span Поделитесь ключом со своими учениками, что бы они могли изучать вашу тему!
          .successGoButton
            .button.button--round.successButton.button-primary(@click = 'goToProfile') Понятно!
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import firebase from 'firebase/app'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'firebase/storage'
export default {
  components: {
    Loading
  },
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
      currComponentId: 0,
      success: false,
      token: 'null',
      loading: false,
      falseVar: false
    }
  },
  methods: {
    ...mapActions(['sendTopic']),
    goToProfile () {
      this.$router.push('/profile')
    },
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
      this.success = true
      this.loading = true
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
      this.token = token
      try {
        await this.sendTopic(sendInformation)
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    }
  },
  computed: {
    ...mapGetters(['getUser', 'isTokenValid'])
  }
}
</script>

<style lang="stylus" scoped>
  .vld-parent
    position relavite
    padding 5%
    padding-top 10%
  .titleTokenText
    font-size 1.4em
  .successText
    padding 10%
  .successGoButton
    padding 5%
    padding-bottom 0
  .successMenu
    font-family Roboto, Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    font-size 2vw
    background-color rgba(0, 0, 0, .5)
    width 100%
    height 100%
    position fixed
    top 0
    left 0
  .successButton
    width 20%
    height 20%

  .successMenuBox
    text-align center
    background-color #FFFFFF
    margin-top 10%
    margin-left 20%
    margin-right 20%
    min-width 350px
    border 2px #000000 solid
    border-radius 10px

  .editBox
    position relative
    margin-top 50px
    margin-left 25%
    margin-right 25%
    background-color #FCFCFF
    box-shadow 0 0 5px rgba(0,0,0,0.5)
    border-radius 20px 20px 20px 20px
    // @media screen and (max-width: 2100px) {
    //   margin-left 16%
    //   margin-right 16%
    // }

  .theoryComponent
    position relative
    width 450px
    margin-bottom 20px

  .theoryTextField
    position relative
    height auto
    width 90%
    margin-bottom 0px
    display inline-block
    margin-top 0p

  .marginBox
    position relative
    margin 20px

  .olympName
    width 300px
    height auto
    margin-top 20px
    font-family -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    font-size 0.8em

  .olympTitle
    position relative
    width autod
    font-family -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    font-size 2em
    font-weight 700

  .buttonPost
      position relative
      font-size 19px
      float right
      background #763dcb
      font-family -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
      width auto
      font-weight 500
      height auto
      margin-right 0px
      margin-bottom 20px

  .olympTheme
    width 300px
    font-family -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    font-size 1.1em
    text-align center
    vertical-align middle

  .delete_button
      position relative
      display inline-block
      width 32px
      height 32px
      float right
      background-image url(images/clear.png)
      background-size 100%

  .taskSolution
    position relative
    width 600px

  .buttonAdd
    position relative
    margin-right 20px
  .taskType
    position relative
    display inline-block

  label
    justify-items left
  .task
    border 1px solid #999
    border-radius 10px
    margin 1%
    padding 1%
  .taskName
    margin 1%
</style>
