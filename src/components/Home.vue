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

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/messaging'

export default {
  data () {
    return {
      topics: []
    }
  },

  mounted () {
    var firebaseConfig = {
      apiKey: 'AIzaSyAwxefCuoxvrMYCWbgQcJVUgTvL6CPEErA',
      authDomain: 'mathplace-842f7.firebaseapp.com',
      databaseURL: 'https://mathplace-842f7.firebaseio.com',
      projectId: 'mathplace-842f7',
      storageBucket: 'mathplace-842f7.appspot.com',
      messagingSenderId: '832330186047',
      appId: '1:832330186047:web:d9cbd636e61d42a459678a',
      measurementId: 'G-7P4W9J6CKS'
    }

    firebase.initializeApp(firebaseConfig)

    const db = firebase.firestore()

    db.collection('task2').get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.topics.push({
            'id': 1,
            'title': doc.id,
            'completed': 0
          })
        })
      })
      .catch((err) => {
        console.log('Error getting documents', err)
      })
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
