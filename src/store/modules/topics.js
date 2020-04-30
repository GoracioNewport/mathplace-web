import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  actions: {
    async fetchTopics (ctx) {
      var topics = []
      const db = firebase.firestore()

      db.collection('task2').get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            topics.push({
              'id': 1,
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
      ctx.commit('updateLoaded', true)
    }
  },
  mutations: {
    updateTopics (state, topics) {
      state.topics = topics
    },
    updateLoaded (state, isLoaded) {
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
