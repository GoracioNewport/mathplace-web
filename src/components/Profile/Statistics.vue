<template lang='pug'>
  .content-wrapper
    .loading-indicator(v-if = 'myTopicsLoading')
      loading(
        :active.sync = "this.myTopicsLoading"
        :is-full-page = 'true'
        color = "#763dca"
        :opacity = 0.5)
    .topicsBox(v-if = 'myTopics.length !== 0')
      .topicItem(v-for = '(topic, topicIndex) in myTopics.slice().reverse()'
      :key = 'topic.token')
        .img-tooltip
          img.imageButton(src ='@/assets/images/bin2.png' @click ='deleteMyTopic(topic.token, topicIndex)')
          md-tooltip(md-direction='right') Удалить урок
        .img-tooltip
          img.imageButton(src ='@/assets/images/code3.png' @click ='$router.push("/customTitle/" + topic.token)')
          md-tooltip(md-direction='right') Редактировать урок
        .img-tooltip(@click='showSnack = true')
          img.imageButton(src ='@/assets/images/share_24px.png' @click ='$clipboard("https://mathplace.page.link?apn=com.math4.user.mathplace&ibi=com.example.ios&link=https%3A%2F%2Fmathplace.ru%2Flesson%2Folympiad%3D" + topic.token)')
          md-snackbar(md-position='center' :md-active.sync='showSnack' :md-persistent='true')
            span Ссылка скопирована в буфер обмена
            md-button.md-primary(@click='showSnackbar = false') Ок!
          md-tooltip(md-direction='right') Скопировать ссылку на урок
        span.md-title.topicName {{ topic.name }}
        span.md-body-1.topicToken Ключ: {{ topic.token }}
        button.showStatsButton.button--round.button-primary(v-if = 'topic.showStats' @click ='toggleStats(topic.token)') Скрыть статистику
        button.showStatsButton.button--round.button-primary(v-else @click ='toggleStats(topic.token)') Показать статистику
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
                md-table-cell.taskSlot(v-for = '(task, taskIndex) in item.solveStats' :key = 'taskIndex'
                :md-label = '(taskIndex + 1).toString()')
                  Dots.answerNo.answerLabel(v-if = 'Number(task) === 1')
                  img.answerWrong.answerLabel(src = '@/assets/images/wrong.png' v-else-if = 'Number(task) == 0')
                  img.answerRight.answerLabel(src = '@/assets/images/right.png' v-else-if = 'Number(task) == 3 || Number(task) == 2')
                  img.answerUnknown.answerLabel(src = '@/assets/images/unknown.png' v-else @click ='showSolution(topicIndex, taskIndex, item.id)')
                md-table-cell.nameSlot(md-label='Решено всего', md-sort-by='solveSum') {{ item.solveSum }}
    .solutionMenu(v-if = 'solutionImageShown')
      .solutionMenuBox
        .solutionInner
          img.solutionImage(:src = "myTopics[imageTopic].stats[imageUser].solveStats[imageTask]")
        .solutionMenuButtons
          md-button.md-raised(@click ='markSolutionAs("right")').md-primary Правильно
          md-button.md-raised(@click ='markSolutionAs("wrong")').md-accent Неправильно
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
      showSnackbar: false,
      position: 'center',
      duration: 4000,
      isInfinity: false,
      myTopics: [],
      search: null,
      searched: {},
      solutionImageShown: false,
      imageTopic: 0,
      imageTask: 0,
      imageUser: 0,
      imageUserId: '',
      myTopicsLoading: false,
      showSnack: false
    }
  },
  methods: {
    ...mapActions(['fetchMyTopicsDetailedInfo', 'fetchTopicStatistics', 'markDBSolutionAs', 'deleteTopic']),
    async toggleStats (id) {
      let obj = this.myTopics.find(x => x.token === id)
      let index = this.myTopics.indexOf(obj)
      this.myTopics[index].showStats = !this.myTopics[index].showStats
      if (this.myTopics[index].showStats) {
        await this.fetchTopicStatistics(id)
        this.myTopics = this.convertToArray(this.getMyTopicsDetailedInfo)
      }
    },
    searchOnTable () {
      this.searched = searchByName(this.myTopics, this.search)
    },
    convertToArray (map) {
      return Object.values(map)
    },
    showSolution (topicIndex, taskIndex, userIndex) {
      this.imageTopic = topicIndex
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
    }
  },
  created () {
    this.searched = this.myTopics
  },
  computed: {
    ...mapGetters(['getMyTopicsDetailedInfo'])
  }
}
</script>

<style lang="stylus" scoped>
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
    &:hover
      cursor pointer
  .vld-parent
    min-height 15vh
  .content-wrapper
    min-height 0
  .solutionImage
    height 50vh
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
    margin-left 25%
    margin-right 25%
    @media screen and (max-width: 1300px)
      margin-left 6%
      margin-right 6%
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
    height auto
    background-color #763dca
    margin-bottom 10px
    margin-top 10px
  .answerRight
    height 2em !important
    width 2em
  .topicItem
    position relative
    height auto
    background-color #ffffff
    box-shadow 0 0 5px rgba(0,0,0,0.5)
    border-radius 20px 20px 20px 20px
    margin 3%
    padding-left 15px
    padding-right 2%
    padding-top 15px
    padding-bottom 20px
</style>
