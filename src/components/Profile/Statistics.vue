<template lang='pug'>
  .content-wrapper
    .loading-indicator(v-if = 'myTopicsLoading')
      loading(
        :active.sync = "this.myTopicsLoading"
        :is-full-page = 'true'
        color = "#763dca"
        :opacity = 0.5)
    md-dialog-confirm(:md-active.sync='active' md-title="Вы уверены, что хотите удалить урок?" md-content='Вы больше не сможете зайти в этот урок' md-confirm-text='Удалить' md-cancel-text='Отмена' @md-cancel='active = false' @md-confirm='deleteMyTopic(deletedTopicToken, deletedTopicId)')
    .topicsBox(v-if = 'myTopics.length !== 0')
      .topicItem(v-for = '(topic, topicIndex) in myTopics.slice().reverse()'
      :key = 'topic.token')
        .img-tooltip
          img.imageButton(src ='@/assets/images/bin2.png' @click ='active = true; deletedTopicId = (myTopics.length - topicIndex - 1); deletedTopicToken = topic.token')
          md-tooltip(md-direction='right') Удалить урок
        .img-tooltip
          img.imageButton(src ='@/assets/images/code3.png' @click ='$router.push("/customTitle/" + topic.token)')
          md-tooltip(md-direction='right') Редактировать урок
        .img-tooltip(@click='showSnack = true')
          img.imageButton(src ='@/assets/images/share_24px.png' @click ='showSnackbar=true, $clipboard("Чтобы присоединиться к уроку, нажмите на эту ссылку: https://mathplace.page.link?apn=com.math4.user.mathplace&ibi=com.example.ios&link=https%3A%2F%2Fmathplace.ru%2Flesson%2Folympiads%3D" + topic.token)')
          md-tooltip(md-direction='right') Скопировать ссылку на урок
        span.md-title.topicName {{ topic.name }}
        span.md-body-1.topicToken Ключ: {{ topic.token }}
        md-button.md-raised.md-primary.showStatsButton(v-if = 'topic.showStats' @click ='toggleStats(topic.token)') Скрыть статистику
        //- button.showStatsButton.button--round.button-primary(v-if = 'topic.showStats' @click ='toggleStats(topic.token)') Скрыть статистику
        //- button.showStatsButton.button--round.button-primary(v-else @click ='toggleStats(topic.token)') Показать статистику
        md-button.md-raised.md-primary.showStatsButton(v-else @click ='toggleStats(topic.token)') Показать статистику
        md-button.md-primary.showStatsButton(style="margin-left: 10px;", @click ='joinCourse(topic.token)') Открыть урок
        .statsBox(v-if = 'topic.showStats')
          .loadingBox(v-if = 'Object.keys(topic.stats).length == 0')
            md-empty-state(md-rounded='' md-icon='access_time' md-label='В уроке пока нет учеников' md-description="В данный урок пока не присоединились ученики.")
          //- .errorBox(v-else-if = 'topic.')
          .loadedBox(v-else)
            md-table.statsTable(v-model='myTopics[myTopics.indexOf(topic)].stats', md-sort='name', md-sort-order='asc', md-fixed-header='')
              md-table-toolbar
                .md-toolbar-section-start
                  h1.md-title Пользователи
                //- md-field.md-toolbar-section-end(md-clearable='')
                  md-input(placeholder='Поиск по имени...', v-model='search', @input='searchOnTable')
              md-table-empty-state(md-label='Пользователи не найдены', :md-description="`По запросу '${search}' ничего не нашлось. Попробуйте другое имя.`")
              md-table-row(slot='md-table-row', slot-scope='{ item }')
                md-table-cell.nameSlot(md-label='Имя', md-sort-by='name') {{ item.name }}
                md-table-cell.nameSlot(md-label='Решено всего', md-sort-by='solveSum') {{ item.solveSum }}
                md-table-cell.taskSlot(v-for = '(task, taskIndex) in item.solveStats' :key = 'taskIndex' :md-label = '(taskIndex + 1).toString()')
                  .answerImageWrapper(@click ='showSolution(topicIndex, taskIndex, item.id)')
                    Dots.answerNo.answerLabel(v-if = 'Number(task) === 1')
                    img.answerWrong.answerLabel(src = '@/assets/images/wrong.png' v-else-if = 'Number(task) == 0')
                    img.answerRight.answerLabel(src = '@/assets/images/right.png' v-else-if = 'Number(task) == 3 || Number(task) == 2')
                    img.answerUnknown.answerLabel(src = '@/assets/images/unknown.png' v-else)
    md-snackbar(md-position='center' :md-duration='4000' :md-active.sync='showSnackbar' md-persistent='')
      span Ссылка скопирована. Отправьте её ученикам!
      md-button.md-primary(@click='showSnackbar = false') Скрыть
    md-dialog(:md-active.sync='solutionImageShown' v-if ='solutionImageShown')
      md-dialog-title Информация по задаче
      md-tabs
        md-tab(md-label='Условие')
          .solutionBox
            .solutionComponent(v-for='component in myTopics[imageTopic].stats[imageUser].userTasks[imageTask].statement')
              span.solutionText(v-if ='component.type === "text"' v-html = "component.inner") {{ component.inner }}
              img.solutionImage(v-else :src ='component.inner')
        md-tab(md-label='Ответ ученика' v-if ='myTopics[imageTopic].stats[imageUser].userTasks[imageTask].type !== "theory" && myTopics[imageTopic].stats[imageUser].userTasks[imageTask].answer !== "proof"')
          .solutionBox
            //- span {{ myTopics[imageTopic].stats[imageUser].answers }}
            .solutionComponent(v-if='(Number(myTopics[imageTopic].stats[imageUser].solveStats[imageTask]) === 1) || (myTopics[imageTopic].stats[imageUser].answers[imageTask] === "null")')
              span.solutionText Ученик пока не решил эту задачу
            .solutionWrapper(v-else)
              .solutionComponent(v-if='myTopics[imageTopic].stats[imageUser].userTasks[imageTask].type === "upload"')
                .wrap(v-for='component in myTopics[imageTopic].stats[imageUser].answers[imageTask]')
                  span.solutionText(v-if ='component.type === "text"' v-html = "component.inner") {{ component.inner }}
                  img.solutionImage(v-else :src ='component.inner')
              .solutionComponent(v-else)
                span.solutionText {{ (typeof myTopics[imageTopic].stats[imageUser].answers[imageTask] === "string") ? myTopics[imageTopic].stats[imageUser].answers[imageTask] : myTopics[imageTopic].stats[imageUser].answers[imageTask].join(", ") }}
          .buttonJudgeBox(v-if ='myTopics[imageTopic].stats[imageUser].userTasks[imageTask].type !== "theory" && myTopics[imageTopic].stats[imageUser].userTasks[imageTask].type !== "proof"')
            md-button.md-raised(@click ='markSolutionAs("right")').md-primary Правильно
            md-button.md-raised(@click ='markSolutionAs("wrong")').md-accent Неправильно
        md-tab(md-label='Правильный ответ' v-if ='myTopics[imageTopic].stats[imageUser].userTasks[imageTask].type !== "upload" && myTopics[imageTopic].stats[imageUser].userTasks[imageTask].type !== "theory" && myTopics[imageTopic].stats[imageUser].userTasks[imageTask].answer !== "proof"')
          .solutionBox
            .solutionComponent
              span.solutionText {{ (typeof myTopics[imageTopic].stats[imageUser].userTasks[imageTask].answer === "string") ? myTopics[imageTopic].stats[imageUser].userTasks[imageTask].answer : myTopics[imageTopic].stats[imageUser].userTasks[imageTask].answer.join(", ") }}
        md-tab(md-label='Решение' v-if ='myTopics[imageTopic].stats[imageUser].userTasks[imageTask].solutionType === "solution"')
          .solutionBox
            span.solutionText {{ myTopics[imageTopic].stats[imageUser].userTasks[imageTask].solution }}
      md-dialog-actions
        md-button.md-raised(@click ='solutionImageShown = !solutionImageShown') Отмена

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Loading from 'vue-loading-overlay'
import Right from 'vue-material-design-icons/CheckboxMarkedCircleOutline.vue'
import Dots from 'vue-material-design-icons/DotsHorizontal.vue'
import Wrong from 'vue-material-design-icons/Close.vue'

const toLower = text => {
  return text.toString().toLowerCase()
}

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.name).includes(toLower(term)))
  }

  return items
}

export default {

  components: {
    Right,
    Dots,
    Wrong,
    Loading
  },
  async mounted () {
    this.myTopicsLoading = true
    await this.fetchMyTopicsDetailedInfo()
    this.myTopics = this.convertToArray(this.getMyTopicsDetailedInfo)
    this.myTopicsLoading = false
  },
  data () {
    return {
      position: 'center',
      duration: 4000,
      isInfinity: false,
      myTopics: [],
      search: null,
      active: false,
      searched: {},
      solutionImageShown: false,
      imageTopic: 0,
      imageTask: 0,
      imageUser: 0,
      imageUserId: '',
      myTopicsLoading: false,
      showSnack: false,
      showSnackbar: false,
      deletedTopicId: 0,
      deletedTopicToken: ''
    }
  },
  methods: {
    ...mapActions(['fetchMyTopicsDetailedInfo', 'fetchTopicStatistics', 'markDBSolutionAs', 'deleteTopic', 'fetchCustomTopic']),
    async toggleStats (id) {
      let obj = this.myTopics.find(x => x.token === id)
      let index = this.myTopics.indexOf(obj)
      this.myTopics[index].showStats = !this.myTopics[index].showStats
      if (this.myTopics[index].showStats) {
        await this.fetchTopicStatistics(id)
        this.myTopics = this.convertToArray(this.getMyTopicsDetailedInfo)
      }
    },
    // async getUserStatisctics(){
    //     await this.fetchTopicStatistics(id);
    // },
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
    searchOnTable () {
      this.searched = searchByName(this.myTopics, this.search)
    },
    convertToArray (map) {
      return Object.values(map)
    },
    showSolution (topicIndex, taskIndex, userIndex) {
      this.imageTopic = (this.myTopics.length - topicIndex - 1)
      this.imageTask = taskIndex
      this.imageUserId = userIndex
      for (let i = 0; i < this.myTopics[this.imageTopic].stats.length; i++) {
        if (this.myTopics[this.imageTopic].stats[i].id === userIndex) this.imageUser = i
      }
      this.solutionImageShown = !this.solutionImageShown
    },
    markSolutionAs (status) {
      status === 'right' ? this.myTopics[this.imageTopic].stats[this.imageUser].solveStats[this.imageTask] = 2 : this.myTopics[this.imageTopic].stats[this.imageUser].solveStats[this.imageTask] = 0
      if (status === 'right') this.myTopics[this.imageTopic].stats[this.imageUser].solveSum++
      this.solutionImageShown = false
      this.markDBSolutionAs({ userId: this.imageUserId, topicName: this.myTopics[this.imageTopic].token, taskId: this.imageTask, newStats: this.myTopics[this.imageTopic].stats[this.imageUser].solveStats })
    },
    deleteMyTopic (token, i) {
      this.myTopics.splice(i, 1)
      this.deleteTopic(token)
      this.$forceUpdate()
    }
  },
  created () {
    this.searched = this.myTopics
  },
  computed: {
    ...mapGetters(['getMyTopicsDetailedInfo', 'getCustomTopic'])
  }
}
</script>

<style lang="stylus" scoped>
  .solutionComponent
    margin 5px
  .solutionText
    font-size 16pt
  .buttonJudgeBox
    display flex
    justify-content space-around
  .solutionBox
    margin 24px
    margin-top 10px
    border solid #7e7e7e
    border-width 1px
    border-radius 5px
    padding 1%
    max-height 50vh
    overflow auto
  .solutionImage
    max-width 60vw
    max-height 60vh
  .sdnds
    position relative
    height auto
  .img-tooltip
    position relative
    height auto
    width auto
  .imageButton
    width 25px
    float right
    margin 8px
    // &:hover
    //   cursor pointer
  .vld-parent
    min-height 15vh
  .content-wrapper
    min-height 0
  .solutionMenuBox
    padding 5%
    padding-left 10%
    padding-right 10%
    .button
      font-size 0.6em
      margin 2%
  .solutionMenuText
    font-size 1.3em
    padding-bottom 10%
  .topicsBox
    position relative
    width auto
    margin-left 15%
    margin-right 15%
    @media screen and (max-width: 1300px)
      margin-left 18%
      margin-right 18%
    @media screen and (max-width: 700px)
      margin-left 2%
      margin-right 2%
  .editButton
    position relative
    height auto
    margin-left 10px
  .solutionMenuField
    input
      border-color #000000
      border-width 1%
  .solutionMenu
    z-index 5
    font-family Roboto, Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    font-size 2vw
    background-color rgba(0, 0, 0, .5)
    width 100%
    height 100%
    position fixed
    top 0
    left 0
  .solutionMenuBox
    text-align center
    background-color #FFFFFF
    margin-top 10%
    margin-left 20%
    margin-right 20%
    min-width 350px
    border 2px #000000 solid
    border-radius 10px
  .md-body-1
    margin-left 5%
  .topicName
    display block
    font-size 23pt
  .topicToken
    position relative
    margin-top 10px
    margin-left 0px
    display block
    font-size 12pt
  .loadedBox
   margin-top 3%
  .taskSlot
    width 50px
    margin auto
  .answerLabel
    display block
    margin-left auto
    margin-right auto
    align-items flex
    max-width 15px
    max-height  15px
  .statsTable
    margin auto
    width 100%
  .showStatsButton
    position relative
    margin-bottom 0px
    margin-left 0px
    margin-top 20px
  .answerRight
    height 2em !important
    width 2em
  .topicItem
    position relative
    height auto
    background-color #ffffff
    box-shadow 0 0 2px 0px rgba(0,0,0,0.5)
    border-radius 20px 20px 20px 20px
    margin 3%
    padding-left 15px
    padding-right 2%
    padding-top 15px
    padding-bottom 20px
</style>
