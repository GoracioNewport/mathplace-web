import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/messaging'

export default {
  actions: {
    async fetchTopics (ctx) {
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

      var topics = []

      db.collection('task2').get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            topics.push({
              'id': 1,
              'title': doc.id,
              'completed': 0
            })
          })
        })
        .catch((err) => {
          console.log('Error getting documents', err)
        })

      ctx.commit('updateTopics', topics)
    }
  },
  mutations: {
    updateTopics (state, topics) {
      state.topics = topics
    }
  },
  state: {
    topics: []
  },
  getters: {
    getTopics (state) {
      return state.topics
    }
  }
}
