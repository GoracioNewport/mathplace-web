<template lang="pug">
  .content-wrapper
    .loading-indicator(v-if = 'myTopicLoading')
      loading(
        :active.sync = "myTopicLoading"
        :is-full-page = 'true'
        color = "#763dca"
        :opacity = 0.5)
    .editBox(v-else)
      .marginBox
       span.olympTitle {{ this.edit ? 'Обновить' : 'Создать' }} урок
      md-steppers(md-vertical)
        md-step#first(md-label='Шаг №1' md-description='Основная информация')
          .titleInfo
            //- input.olympName(type = 'text', placeholder = 'Введите название вашей темы', v-model = "name")
            md-field.olympName
              label Введите название темы
              md-input(v-model='name' maxlength = "30")

            //- label(for = 'isPrivate') Приватная тема
              //- input#isPrivate(type = 'checkbox', v-model = "private")
            //- span {{ timeStart }} {{ timeFinish }}

            //- select.olympTheme(v-model = "theme")
            //-   option(v-for = 'theme in themeList') {{ theme }}
            .md-layout-item.olympTheme2
              md-field
                label(for="theme") Выберите тему урока
                md-select.olympTheme2#theme(v-model = "theme" placeholder='Выберите тему урока')
                  md-option(v-for = '(theme, i) in themeList' :key="i" :value="theme") {{ theme }}

            md-field.classCnt
              label Введите класс
              md-input(v-model='classCnt' type='number')
              span.md-helper-text Число от 1 до 11
        md-step#second(md-label='Шаг №2' md-description='Настройка доступа')
          .titleInfo
            .checkboxBox
              md-checkbox.olympPrivate(v-model='private') Приватная тема
              md-tooltip(md-direction='left') Приватная тема показывается только вашим ученикам
            .checkboxBox
              md-checkbox.olympPrivate(v-model='timeStartOn') Ограничить время начала
              md-tooltip(md-direction='left') Урок начнется в установленное время
            .checkboxBox
              md-checkbox.olympPrivate(v-model='timeFinishOn') Ограничить время конца
              md-tooltip(md-direction='left') Урок закончится в установленое время
              //- datetime(v-if ='timeFinishOn' type='datetime' v-model='timeFinish')
              //- VueCtkDateTimePicker(v-if = 'timeFinishOn' v-model="timeFinish" :no-value-to-custom-elem="true" :overlay="true")
              //-   md-field(md-inline)
              //-     label Укажите время конца
              //-     md-input(v-model='timeFinish')
            el-date-picker(v-if = 'timeStartOn' v-model='timeStart' type='datetime' placeholder='Дата начала' style='margin: 1%')
            el-date-picker(v-if = 'timeFinishOn' v-model='timeFinish' type='datetime' placeholder='Дата конца' style='margin: 1%')

        md-step#third(md-label='Шаг №3' md-description='Материал')
          .tasksInfo
            .tasksContent
              .task(v-for = '(task, taskId) in tasks')
                .button.img.delete_button(@click='tasks.splice(tasks.indexOf(task), 1)')
                .preMadeBox(v-if = 'task.type === "preMade"')
                  .componentName
                    strong(v-if = 'task.originData.type === "theory"') Теория из темы "{{ task.topicName }}"
                    strong(v-else) Задача №{{ task.taskInd }} из темы "{{ task.topicName }}"
                .componentBox(v-else)
                  .componentName
                    strong(v-if = 'task.type === "theory"') Теория
                    strong(v-else) Задача
                  //- .taskType
                  //-   label(for='theory') Теория
                  //-     input#theory(type = 'radio', value = 'theory', v-model = "task.type")
                  //-   label(for='task') Задача
                  //-     input#task(type = 'radio', value = 'task', v-model = "task.type")

                  .theoryEditBox
                    .theoryComponent(
                      v-for = 'component in task.statement'
                    )
                      .button.img.delete_button(@click='task.statement.splice(task.statement.indexOf(component), 1)')
                      .theoryTextField(v-if ='component.type === "text"')
                        vue-editor.theoryText(placeholder = 'Введите текст здесь', v-model = "component.inner" :editorToolbar ='[["bold", "italic", "underline", "strike"], [{ "color": [] }, { "background": [] }], ["link", "video"], ["clean"]]')
                      .theoryText(v-if ='component.type === "img"')
                        label(for='img') Выберите картинку
                        input#img(type='file', name='img', accept='image/*', @change="onFileSelected", @click="onFileButtonClicked(tasks.indexOf(task), task.statement.indexOf(component))")
                      .theoryTextFile(v-else-if ='component.type === "file"')
                        label(for='file') Выберите PDF-Файл
                        input#img(type='file', name='file', accept='application/pdf', @change="onFileSelected", @click="onFileButtonClicked(tasks.indexOf(task), task.statement.indexOf(component))")

                    md-button.md-raised.md-primary(@click='addContent(tasks.indexOf(task), "text")') Добавить абзац

                    md-button.md-raised.md-primary(
                      @click='addContent(tasks.indexOf(task), "img")'
                      ) Добавить картинку
                    md-button.md-primary(
                      @click='addContent(tasks.indexOf(task), "file")'
                      ) Загрузить PDF-файл
                  .taskEditBox(v-if ="task.type === 'task'")
                    .taskAnswerBox
                      md-field.taskTypeSelect
                        label(for='taskType') Тип ответа
                        md-select#taskType(v-model='task.taskType' name='taskTypeText' @md-selected='changeAnswerType(task.taskType, taskId)')
                          md-option(value='task') Единственный ответ
                          md-option(value='multipleAnswer') Несколько ответов
                          md-option(value='multipleChoice') Множественный выбор
                          md-option(value='upload') Загрузка развернутого решения
                          md-option(value='proof') Без ответа
                      md-field(v-if='task.taskType == "task"')
                        md-input.taskAnswer(placeholder = 'Введите ответ на задачу', v-model = "task.answer")
                      span.md-body-2(v-else-if='task.taskType == "upload"') Вы сможете проверить ответ ученика в личном кабинете в разделе 'Мои темы'.
                      span.md-body-2(v-else-if='task.taskType == "proof"') Дополнительная задача не подразумевает проверку ответа. Пожалуйста, напишите развернутый ответ в секции 'Решение', что бы ученики могли проверить себя самостоятельно.
                      md-chips(v-else-if='task.taskType == "multipleAnswer"' v-model='task.answer' md-placeholder='Введите ответ и нажмите Enter...')
                      .checkboxesBox(v-else-if='task.taskType == "multipleChoice"')
                        md-field
                          label Введите вариант ответа
                          md-input(v-model='newCheckboxAnswer' placeholder='Добавить вариант ответа')
                          md-button.addMemeberButton(@click ='addCheckBoxAnswer(newCheckboxAnswer, taskId)') Добавить
                        span.md-body-2(v-if='task.options.length > 0') Отметьте правильные ответы
                        br
                        .checkboxesBoxCheckboxes(v-for ='(op, opI) in task.options' :key="opI" )
                          md-checkbox(v-model='task.answer' :value='op') {{ op }}
                          md-button.removeButton.md-accent.md-raised(@click ='task.options.splice(opI, 1); if (task.answer.findIndex(f => f === op) !== -1) task.answer.splice(task.answer.findIndex(f => f === op), 1);') X
                        //- span {{ task.answer }}

                    br
                    //- span Выберите сложность
                    br

                    .md-layout-item.olympTheme2
                      md-field
                        md-select.olympTheme2(v-model = "task.difficulty" placeholder="Выберите сложность")
                          md-option(v-for = '(diff, i) in difficultyList' :key="i" :value="diff") {{ diff }}
                        md-tooltip(md-direction='left') Укажите, чтобы ученикам было проще ориентироваться

                    //- label(for='difOne') Легкая
                    //-   input#difOne(type = 'radio', value = '1', v-model = "task.difficulty")
                    //- label(for='difTwo') Средняя
                    //-   input#difTwo(type = 'radio', value = '2', v-model = "task.difficulty")
                    //- label(for='difThree') Трудная
                    //-   input#difThree(type = 'radio', value = '3', v-model = "task.difficulty")

                    md-field
                      label(for='solutionType') Тип решения
                      md-select#solutionType(v-model='task.solutionType' name='solutionTypeText')
                        md-option(value='hide') Без решения
                        md-option(value='solution') Показывать решение
                        md-option(v-if ='task.taskType != "proof" && task.taskType != "upload"' value='answer') Показывать ответ
                      md-tooltip(md-direction='left') Решение показывается всем ученикам
                    md-field(v-if ='task.solutionType !== "hide" && task.solutionType !== "answer"')
                      label Решение
                      md-textarea.taskSolution(placeholder = 'Введите подробное решение вашей задачи (необязательно)', v-model = "task.solution")
            div(style="margin-top:20px")
              md-button.md-raised.md-primary(@click='addTask("theory")') Добавить теорию
              md-button.md-raised.md-primary(@click='addTask("task")') Добавить задачу
              md-button.md-primary(@click='addTask("material")') Добавить готовый материал
            .button.button--round.button-success.buttonPost(@click='sendTitle()')
              span {{ this.edit ? 'Обновить' : 'Опубликовать' }} тему
    .successMenu(v-if = 'this.success')
      .successMenuBox
        .successText(v-if = 'this.loading')
          strong.md-display-3.titleTokenText Пожалуйста, подождите
          br
          span.md-title Мы {{ this.edit ? 'обновляем' : 'публикуем' }} вашу тему. Это может занять некоторое время.
          .vld-parent
            loading(
              :active.sync = "this.loading"
              :is-full-page = "this.falseVar"
              color = "#763dca"
              loader = 'dots'
              :opacity = 0
              :width = 150)
        .div(v-else)
          md-dialog(:md-active.sync='showDialog')
            md-dialog-title Урок опубликован!
            div(style='position:relative; margin: 0px 20px 20px 20px')
              span.md-title Ключ темы:
              strong.md-title  {{ this.token }}
              br
              p.md-text(style="position:relative;font-size:18px;margin-top:30px;") Поделитесь ключом со своими учениками, что бы они могли подключиться к вашему уроку!
            md-dialog-actions
              md-button.md-primary(@click='showDialog = false') Понятно
              md-button.md-primary(:to="'/lesson/olympiads=' + this.token",@click='showDialog = false') Перейти в урок
    .materialMenu(v-if = 'materialMenuShow')
      .materialMenuBox
        .materialMenuText
          span.md-headline Выберите тему
        .materialMenuField
          .md-layout.md-gutter
            .md-layout-item
              md-field
                label(for='theme') Тема
                md-select#theme(v-model='selectedMaterialTheme', name='theme' @md-selected = 'selectTopic(selectedMaterialTheme)')
                  md-optgroup(label='Ваши темы')
                    md-option(v-for = '(topic, i) in topicList' v-if = 'topic.collection === "user"' :key = 'topic.name' :value='topic.name') {{ topic.name }}
                  md-optgroup(label='Темы MathPlace')
                    md-option(v-for = '(topic, i) in topicList' v-if = 'topic.collection === "mathplace"' :key = 'topic.name' :value='topic.name') {{ topic.name }}
        .materialMenuTaskBox(v-if = 'materialMenuTaskSectionShow')
          .emptyTopicMessage(v-if = 'topicList[selectedMaterialThemeIndex].tasks.length === 0')
            span Тут пока нет задач!
          .materialMenuCards(v-else)
              md-card.materialContent(v-for ='(task, taskIndex) in topicList[selectedMaterialThemeIndex].tasks' :key ='taskIndex' md-with-hover='')
                md-ripple
                  md-card-header
                    .md-title(v-if = 'task.type === "theory"') Теория
                    .md-title(v-else) Задача №{{ task.taskInd }}
                  md-card-content.materialContentText
                    span {{ task.textPreview }}
                  md-card-actions
                    md-button(@click ='addTask("preMadeMaterial", taskIndex)') Добавить
        .materialMenuCancel
          .button.button--round.button-warning(@click ='materialMenuShow = false')  Отмена

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required, minLength, maxLength, between } from 'vuelidate/lib/validators'
import firebase from 'firebase/app'
import Loading from 'vue-loading-overlay'
import { Datetime } from 'vue-datetime'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'firebase/storage'
import { VueEditor } from 'vue2-editor'
import { Settings } from 'luxon'

export default {
  components: {
    Loading,
    VueEditor,
    Datetime
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
      difficultyList: [
        'Легкая',
        'Средняя',
        'Сложная'
      ],
      currTaskId: 0,
      currComponentId: 0,
      success: false,
      token: 'null',
      loading: false,
      falseVar: false,
      classCnt: '',
      showDialog: false,
      submitStatus: null,
      myTopicLoading: false,
      edit: false,
      topicList: [],
      topicListLoading: false,
      materialMenuShow: false,
      materialMenuTaskSectionShow: false,
      selectedMaterialTheme: '',
      selectedMaterialThemeIndex: 0,
      newCheckboxAnswer: '',
      timeStartOn: false,
      timeFinishOn: false,
      timeStart: '',
      timeFinish: ''
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(30)
    },
    classCnt: {
      required,
      between: between(1, 11)
    },
    tasks: {
      $each: {
        answer: {
        },
        statement: {
          minLength: minLength(1)
        }
      }
    }
  },
  methods: {
    ...mapActions(['sendTopic', 'addMyTopicsToList', 'fetchMyTopic', 'fetchTopicList', 'fetchCustomTopic']),
    addCheckBoxAnswer (ans, i) {
      this.newCheckboxAnswer = ''
      if (this.tasks[i].options.findIndex(f => f === ans) === -1) this.tasks[i].options.push(ans)
    },
    changeAnswerType (type, i) {
      if (type === 'multipleChoice' || type === 'multipleAnswer') this.tasks[i].answer = []
      else if (type === 'task') this.tasks[i].answer = ''
    },
    goToProfile () {
      this.$router.push('/profile')
    },
    selectTopic (task) {
      if (task === '') {
        alert('Пожалуйста, выберите тему!')
        return
      }
      var i = this.topicList.map(e => e.name).indexOf(task)
      this.selectedMaterialThemeIndex = i
      this.materialMenuTaskSectionShow = true
    },
    async joinCourse (id) {
      await this.fetchCustomTopic(id)
      var res = this.getCustomTopic
      if (res !== null) {
        this.$router.push('/lesson/olympiads=' + id)
      } else {
        this.customTopicId = ''
        this.placeholder = 'Тема не найдена! Пожалуйста, убедитесь в правильности написании ключа'
        alert('Тема не найдена! Пожалуйста, убедитесь в правильности написании ключа')
      }
    },
    async addTask (type, ind) {
      var task
      if (type === 'material') {
        this.selectedMaterialThemeIndex = 0
        this.materialMenuShow = true
        this.topicListLoading = true
        await this.fetchTopicList()
        this.topicList = this.getTopicList
        this.topicListLoading = false
      } else if (type === 'preMadeMaterial') {
        this.materialMenuShow = false
        task = this.topicList[this.selectedMaterialThemeIndex].tasks[ind]
        task.type = 'preMade'
        task.topicName = this.topicList[this.selectedMaterialThemeIndex].name
        this.tasks.push(task)
      } else {
        task = {
          statement: [{
            type: 'text',
            inner: ''
          }],
          type: type,
          answer: '',
          solutionType: 'hide',
          solution: '',
          difficulty: 'Легкая',
          taskType: 'task',
          options: []
        }
        this.tasks.push(task)
      }
    },
    addContent (id, type) {
      var data = {
        type: type,
        inner: ''
      }
      this.tasks[id].statement.push(data)
    },
    nullifyContent (id) {
      this.tasks[id].statement = []
    },
    onFileButtonClicked (taskId, componentId) {
      this.currTaskId = taskId
      this.currComponentId = componentId
    },
    onFileSelected (event) {
      this.tasks[this.currTaskId].statement[this.currComponentId].inner = event.target.files[0]
    },
    async generateToken (length) {
      var a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('')
      var b = []

      var succes = false
      while (!succes) {
        for (var i = 0; i < length; i++) {
          var j = (Math.random() * (a.length - 1)).toFixed(0)
          b[i] = a[j]
        }
        try {
          succes = await this.isTokenValid(b.join(''))
        } catch (error) {
          b = ['a', 'a', 'a', 'a', 'a']
          succes = true
          throw error
        }
      }
      return b.join('')
    },
    async sendTitle () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'error'
        alert('Проверьте правильность заполнения полей!')
        return
      }

      this.success = true
      this.loading = true
      this.theme = this.theme.toLowerCase()
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].type === 'task') this.cnt_task++
      } this.items = this.tasks.length
      var data = {
        author: this.getUser.id,
        like: 0,
        name: this.name,
        public: !this.private,
        theme: this.theme,
        cnt_task: this.cnt_task,
        items: this.items,
        members: [],
        class: this.classCnt,
        tasks: [],
        created: firebase.firestore.Timestamp.now()
      }
      // Время начала и конца
      if (this.timeStartOn && this.timeStart !== null) data.time_start = firebase.firestore.Timestamp.fromDate(this.timeStart)
      if (this.timeFinishOn && this.timeFinish !== null) data.time_end = firebase.firestore.Timestamp.fromDate(this.timeFinish)
      // console.log(data.time_start, data.time_end)
      // Парсинг задач
      for (let i = 0; i < this.tasks.length; i++) {
        var task = {}
        for (let j = 0; j < this.tasks[i].statement.length; j++) {
          // Обработка картинок и файлов
          if ((this.tasks[i].statement[j].type === 'img' || this.tasks[i].statement[j].type === 'file') && typeof this.tasks[i].statement[j].inner !== 'string') {
            // Чтение файла
            let file = this.tasks[i].statement[j].inner
            let fileName = file.name
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            // Получение данных для имени файла
            const ext = fileName.slice(fileName.lastIndexOf('.'))
            let currentTime = new Date().getTime()
            let imageUrl
            let imageTimeName = 'uploads/' + currentTime + ext
            // Загрузка в бд
            await firebase.storage().ref(imageTimeName).put(file)
            await firebase.storage().ref(imageTimeName).getDownloadURL().then(function (url) { imageUrl = url })
            this.tasks[i].statement[j].inner = imageUrl.toString()
          }
        }
        // Обработка решения задачи
        if (this.tasks[i].solutionType === 'hide') this.tasks[i].solution = 'hide' // Тупой костыль, но без него никак
        else if (this.tasks[i].solutionType === 'answer') this.tasks[i].solution = 'null'
        // hide в этом поле означает, что надо показывать ответ вместо решения
        // Обработка сложности
        if (this.tasks[i].difficulty === 'Легкая') this.tasks[i].difficulty = 1
        else if (this.tasks[i].difficulty === 'Средняя') this.tasks[i].difficulty = 2
        else this.tasks[i].difficulty = 3
        // Обработка типов задач
        if (this.tasks[i].type === 'task') this.tasks[i].type = this.tasks[i].taskType
        // Обработка заготовленных заданий
        if (this.tasks[i].type === 'preMade') task = this.tasks[i].originData
        else task = this.tasks[i]
        data.tasks.push(task)
      }
      var token
      if (!this.edit) token = await this.generateToken(5)
      else token = this.token
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
      this.addMyTopicsToList(token)
      this.loading = false
      this.showDialog = true
    },
    async isTokenValid (token) {
      const db = firebase.firestore()
      var result
      await db.collection('olympiads').doc(token)
        .get().then(
          doc => {
            if (doc.data() !== undefined) {
              result = false
            } else result = true
          })
      return result
    }
  },
  async mounted () {
    Settings.defaultLocale = 'ru'
    if (this.$route.params.topicId !== undefined) {
      this.myTopicLoading = true
      await this.fetchMyTopic(this.$route.params.topicId)
      var myTopic = this.getMyTopic
      if (myTopic.author !== this.getUser.id) this.$router.push('/customTitle')
      else {
        this.edit = true
        this.name = myTopic.name
        this.classCnt = myTopic.class
        this.cnt_task = myTopic.cnt_task
        this.items = myTopic.cnt_items
        this.private = myTopic.private
        this.theme = myTopic.theme
        if (myTopic.time_start !== undefined) {
          this.timeStartOn = true
          this.timeStart = myTopic.time_start.toDate()
        } if (myTopic.time_end !== undefined) {
          this.timeFinishOn = true
          this.timeFinish = myTopic.time_end.toDate()
        }
        // Парсинг задач
        for (let i = 0; i < myTopic.tasks.length; i++) {
          this.tasks.push(myTopic.tasks[i])
          if (myTopic.tasks[i].type !== 'theory') {
            this.tasks[i].taskType = myTopic.tasks[i].type
            this.tasks[i].type = 'task'
          }
        }
        this.token = this.$route.params.topicId
      }
      this.myTopicLoading = false
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getMyTopic', 'getTopicList', 'getCustomTopic'])
  }
}
</script>

<style lang="stylus" scoped>
  .checkboxBox
    position relative
    width 300px
    height auto
    display block
  .vdatetime
    width 20vw
    float right
    input
      border-color #000000
  .removeButton
    margin-left 3%
    min-width 0
    width 30px
    height 30px
  .taskAnswerBox
    margin-bottom 3%
  .taskTypeSelect
    margin-top 5%
  #taskType
    max-width 330px
  .materialContentText
    max-height 15vh
    min-height 15vh
    overflow hidden
  .materialContent
    max-height 30vh
    margin 5%
    width 40%
    float left
  .materialMenuTaskBox
    max-height 40vh
    overflow auto
  .materialMenuBox
    background-color #FFFFFF
    margin-top 5%
    margin-left 15%
    margin-right 15%
    min-width 350px
    border 2px #000000 solid
    border-radius 10px
    padding 5%
    padding-left 10%
    padding-right 10%
    text-align center
    .button
      font-size 20pt
      margin 2%
    @media screen and (max-width: 600px)
      margin 1%
      margin-top 20%
  .materialMenuText
    font-size 1.3em
    padding-bottom 1%

  .materialMenuField
    md-field
      border-color #000000
      border-width 1%
  .materialMenu
    z-index 5
    font-family Roboto, Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    font-size 2vw
    background-color rgba(0, 0, 0, .5)
    width 100%
    height 100%
    position fixed
    top 0
    left 0
  .content-wrapper
    min-height 0
  textarea
    margin-bottom auto
  body
    line-height auto !important
  .md-input
    margin-bottom 1%
  .componentName
    font-size 2em
    padding 3%
    padding-left 0
    padding-top 0
  .taskAnswer
    border-radius 10px
    padding 1%
    margin-left 0%
  .classCnt
    position relative
    width 300px
  .buttonAddContent
    margin 1%
  #isPrivate
    border-width 3px
  .vld-parent
    position relavite
    padding 5%
    padding-top 10%
  .titleTokenText
    color #000000
    font-size 1.4em
  .successText
    padding 10%
  .successGoButton
    padding 5%
    padding-bottom 0
  .successMenu
    z-index 5
    font-family Roboto, Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    font-size 2vw
    background-color rgba(0, 0, 0, .5)
    width 100%
    height 100%
    position fixed
    top 0
    left 0
  .successButton
    width auto
    height 20%
  .md-avatar
    margin: 36px;

  .successMenuBox
    text-align center
    background-color #FFFFFF
    margin-top 10%
    margin-left 20%
    margin-right 20%
    min-width 350px
    @media screen and (max-width: 600px)
      margin 1%
      margin-top 20%
      font-size 12pt

  .editBox
    position relative
    margin-top 50px
    margin-left 25%
    margin-right 25%
    margin-bottom 10%
    background-color #FFFFFF
    box-shadow 0 0 5px rgba(0,0,0,0.5)
    border-radius 20px 20px 20px 20px
    @media screen and (max-width: 1000px)
      margin 1%
      margin-top 3%

  .theoryComponent
    position relative
    width 90%
    margin-bottom 20px

  .theoryTextField
    position relative
    height auto
    width 95%
    margin-bottom 0px
    display inline-block
    margin-top 0p

  .marginBox
    position relative
    margin 3%

  .olympName
    position relative
    width 300px
    height auto
    margin-bottom 30px
    margin-top 20px
    font-family -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    font-size 0.8em
  .olympPrivate
    width auto

  .olympTitle
    position relative
    width auto
    font-family -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    font-size 2.5em
    font-weight 700

  .buttonPost
    position relative
    height 50px
    border: 2px solid #763DCA;
    border-radius 50px
    font-weight 550
    color #763DCA
    background-color #FFFFFF
    opacity 1.0
    margin-right 0px
    margin-top 25px
    margin-bottom 20px
    transition: 0.6s;
    text-align center
    float right
    padding 13px
    vertical-align middle
  .buttonPost:hover
    transition: 0.6s;
    color #FFFFFF
    background-color #763DCA

  .olympTheme
    position relative
    height auto
    width 100px
    max-width: 300px;
    display block
    font-family -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    font-size 1.1em
    text-align center
    vertical-align middle
    option
      font-size 0.8em
      margin 1%
    font-size 1em
    padding 0

  .olympTheme2
    position relative
    max-width: 300px

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
    margin 10px
  .taskType
    position relative
    display inline-block

  label
    justify-items left
  .task
    position relative
    border 1px solid #999
    border-radius 10px
    margin-top 50px
    padding 3%
  .taskName
    margin 1%
</style>
