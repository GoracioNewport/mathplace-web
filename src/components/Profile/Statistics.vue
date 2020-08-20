<template lang='pug'>
    .content-wrapper
      .topicsBox(v-if = 'myTopics.length !== 0')
        .topicItem(v-for = 'topic in myTopics'
        :key = 'topic.token')
          .button.button--round.button-primary.showStatsButton(v-if = 'topic.showStats' @click ='toggleStats(topic.token)') Скрыть подробную статистику
          .button.button--round.button-primary.showStatsButton(v-else @click ='toggleStats(topic.token)') Показать подробную статистику
          span.md-title.topicName {{ topic.name }}
          span.md-body-1 Ключ: {{ topic.token }}
          .statsBox(v-if = 'topic.showStats')
            span.loadingBox(v-if = 'Object.keys(topic.stats).length == 0') Загрузка...
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
                  md-table-cell.taskSlot(v-for = '(task, index) in item.solveStats' :key = 'index'
                  :md-label = '(index + 1).toString()')
                    Dots.answerNo.answerLabel(v-if = 'task === 1')
                    img.answerWrong.answerLabel(src = '@/assets/images/wrong.png' v-else-if = 'task == 0')
                    img.answerRight.answerLabel(src = '@/assets/images/right.png' v-else)
                  md-table-cell.nameSlot(md-label='Решено всего', md-sort-by='solveSum') {{ item.solveSum }}

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
    Wrong
  },
  async mounted () {
    await this.fetchMyTopicsDetailedInfo()
    this.myTopics = this.convertToArray(this.getMyTopicsDetailedInfo).reverse()
  },
  data () {
    return {
      myTopics: [],
      search: null,
      searched: {}
    }
  },
  methods: {
    ...mapActions(['fetchMyTopicsDetailedInfo', 'fetchTopicStatistics']),
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
  .md-body-1
    margin-left 5%
  .topicName
    font-size 2.5em
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
    background-color #763dca
    float right
  .answerRight
    height 2em !important
    width 2em
  .topicItem
    background-color #ffffff
    box-shadow 0 0 5px rgba(0,0,0,0.5)
    border-radius 20px 20px 20px 20px
    margin 3%
    margin-left 17%
    margin-right 17%
    padding 2%
</style>
