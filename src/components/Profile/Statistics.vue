<template lang='pug'>
    .content-wrapper
      .topicsBox
        .topicItem(v-for = 'topic in myTopics'
        :key = 'topic.name')
          span {{ topic.name }}
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  async mounted () {
    await this.fetchMyTopicsDetailedInfo()
    this.myTopics = this.getMyTopicsDetailedInfo
    console.log(this.myTopics)
  },
  data () {
    return {
      myTopics: {}
    }
  },
  methods: {
    ...mapActions(['fetchMyTopicsDetailedInfo'])
  },
  computed: {
    ...mapGetters(['getMyTopicsDetailedInfo'])
  }
}
</script>

<style lang="stylus" scoped>
  .topicsBox
    border 1px solid
    border-radius 5px
</style>
