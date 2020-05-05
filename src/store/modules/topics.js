import firebase from 'firebase/app'
import 'firebase/firestore'
import User from './user'

export default {
  actions: {
    async fetchTopics (ctx) {
      ctx.commit('updateTopicsLoaded', false)

      var topics = []
      var topicsAlgebra = []
      var innderId = 0
      const db = firebase.firestore()

      await db.collection('task2').get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            var right = 0
            var all = 1
            let theme = doc.id
            var docRef = db.collection('account').doc(User.state.user.id)
            docRef.get().then(function (doc2) {
              var topic = doc2.data()[theme]
              if (topic != null) {
                console.log(String(theme) + ' ' + doc2.data()[theme].toString())
                for (let i = 0; i < topic.length; i++) {
                  console.log('Start')
                  if (topic[i] === 2) {
                    right++
                  }
                  all++
                }
              }
              if (doc.data().theme === 'алгебра') {
                topicsAlgebra.push({
                  'id': innderId++,
                  'title': doc.id,
                  'completed': Math.floor(right * 100 / all),
                  'theme': doc.data().theme
                })
              } else if (doc.data().theme === 'геометрия') {
                topicsAlgebra.push({
                  'id': innderId++,
                  'title': doc.id,
                  'completed': Math.floor(right * 100 / all),
                  'theme': doc.data().theme
                })
              } else if (doc.data().theme === 'логика') {
                topicsAlgebra.push({
                  'id': innderId++,
                  'title': doc.id,
                  'completed': Math.floor(right * 100 / all),
                  'theme': doc.data().theme
                })
              } else if (doc.data().theme === 'комбинаторика') {
                topicsAlgebra.push({
                  'id': innderId++,
                  'title': doc.id,
                  'completed': Math.floor(right * 100 / all),
                  'theme': doc.data().theme
                })
              } else if (doc.data().theme === 'огэ') {
                topicsAlgebra.push({
                  'id': innderId++,
                  'title': doc.id,
                  'completed': Math.floor(right * 100 / all),
                  'theme': doc.data().theme
                })
              } else if (doc.data().theme === 'школа') {
                topicsAlgebra.push({
                  'id': innderId++,
                  'title': doc.id,
                  'completed': Math.floor(right * 100 / all),
                  'theme': doc.data().theme
                })
              } else if (doc.data().theme === 'идеи') {
                topicsAlgebra.push({
                  'id': innderId++,
                  'title': doc.id,
                  'completed': Math.floor(right * 100 / all),
                  'theme': doc.data().theme
                })
              }

              topics.push({
                'id': innderId++,
                'title': theme,
                'completed': (right * 100) / all,
                'theme': doc.data().theme
              })
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
