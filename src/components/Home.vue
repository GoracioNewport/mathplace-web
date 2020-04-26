<template lang="pug">
  .content-wrapper
    section
      .container
        h1.ui-title-1 Home
    section
      .container
        .topic-list
          .topic-item(
            v-for = "topic in topics"
            :key = "topic.id"
          )
            .ui-card.ui-card--shadow
              .topic-item__info
                //span {{topic.completed}}%
                a(href="#")
                  strong {{topic.title}}
</template>

<script>
export default {
  data () {
    return {
      topics: [
        {
          'id': 1,
          'title': 'Ivan sosi',
          'completed': 100
        },
        {
          'id': 2,
          'title': 'Ivan sosi',
          'completed': 100
        },
        {
          'id': 3,
          'title': 'Ivan Task',
          'completed': 100
        },
        {
          'id': 4,
          'title': 'Test Task',
          'completed': 100
        },
        {
          'id': 5,
          'title': 'Test Task',
          'completed': 100
        },
        {
          'id': 5,
          'title': 'Test Task',
          'completed': 100
        },
        {
          'id': 5,
          'title': 'Test Task',
          'completed': 100
        },
        {
          'id': 5,
          'title': 'Test Task',
          'completed': 100
        },
        {
          'id': 5,
          'title': 'Test Task',
          'completed': 100
        },
        {
          'id': 5,
          'title': 'Test Task',
          'completed': 100
        },
        {
          'id': 5,
          'title': 'Test Task',
          'completed': 100
        },
        {
          'id': 5,
          'title': 'Test Task',
          'completed': 100
        },
        {
          'id': 5,
          'title': 'Test Task',
          'completed': 100
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>

  .topic-list
    display grid
    grid-template-columns repeat(auto-fit, minmax(300px, 1fr))

  .topic-item
    padding-left 5%
    padding-right 5%
    padding-bottom 5%
    height 200px

  a
    color #763DCA

  .ui-card
    border-width 1px
</style>
