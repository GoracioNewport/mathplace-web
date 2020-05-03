import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  actions: {
    async fetchTopics (ctx) {
      ctx.commit('updateTopicsLoaded', false)

      var topics = []
      var innderId = 0
      const db = firebase.firestore()

      await db.collection('task2').get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            topics.push({
              'id': innderId++,
              'title': doc.id,
              'completed': Math.floor(Math.random() * 100),
              'theme': doc.data().theme
            })
          })
        })
        .catch((err) => {
          console.log('Error getting documents', err)
        })

      ctx.commit('updateTopics', topics)
      ctx.commit('updateTopicsLoaded', true)
    }
  },
  mutations: {
    updateTopics (state, topics) {
      state.topics = topics
    },
    updateTopicsLoaded (state, isLoaded) {
      state.topicsLoaded = isLoaded
    }
  },
  state: {
    topicsLoaded: false,
    topics: []
  },
  getters: {
    getTopics (state) {
      return state.topics
    },
    isTopicsLoaded (state) {
      return state.topicsLoaded
    }
  }
}
