<template lang='pug'>
    .content-wrapper
      .topicsBox(v-if = 'myTopics.length !== 0')
        .topicItem(v-for = 'topic in myTopics'
        :key = 'topic.token')
          span.topicName() {{ topic.name }}
          .button.button--round.button-primary.showStatsButton(@click ='toggleStats(topic.token)') Показать подробную статистику
          .statsBox(v-if = 'topic.showStats')
            span.loadingBox(v-if = 'Object.keys(topic.stats).length == 0') Загрузка...
            .loadedBox(v-else)
              md-table(v-model='myTopics[myTopics.indexOf(topic)].stats', md-sort='name', md-sort-order='asc', md-fixed-header='')
                md-table-toolbar
                  .md-toolbar-section-start
                    h1.md-title Пользователи
                  md-field.md-toolbar-section-end(md-clearable='')
                    md-input(placeholder='Поиск по имени...', v-model='search', @input='searchOnTable')
                md-table-empty-state(md-label='Пользователи не найдены', :md-description="`По запросу '${search}' ничего не нашлось. Попробуйте другое имя.`")
                md-table-row(slot='md-table-row', slot-scope='{ item }')
                  md-table-cell(md-label='Name', md-sort-by='name') {{ item.name }}
                  md-table-cell(v-for = '(task, index) in item.solveStats' :key = 'index'
                  :md-label = '(index + 1).toString()')
                    Dots(v-if = 'task === 1')
                    Wrong(v-else-if = 'task == 0')
                    Right(v-else)

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
    this.myTopics = this.convertToArray(this.getMyTopicsDetailedInfo)
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
        console.log(this.myTopics)
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
  .topicItem
    border 1px solid
    border-radius 5px
    margin 3%
    padding 2%
</style>
