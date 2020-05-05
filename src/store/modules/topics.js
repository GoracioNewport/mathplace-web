import firebase from 'firebase/app'
import 'firebase/firestore'
import User from './user'

export default {
  actions: {
    async fetchTopics (ctx) {
      ctx.commit('updateTopicsLoaded', false)

      var topics = []
      var topicsAlgebra = []
      var topicsGeometry = []
      var topicsOGE = []
      var topicsSchool = []
      var topicsLogika = []
      var topicsGraf = []
      var topicsKomba = []
      var topicsIdea = []
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
                console.log('Add Algebra')
                topicsAlgebra.push({
                  'id': innderId++,
                  'title': doc.id,
                  'completed': Math.floor(right * 100 / all),
                  'theme': doc.data().theme
                })
              } else if (doc.data().theme === 'геометрия') {
                topicsGeometry.push({
                  'id': innderId++,
                  'title': doc.id,
                  'completed': Math.floor(right * 100 / all),
                  'theme': doc.data().theme
                })
              } else if (doc.data().theme === 'логика') {
                topicsLogika.push({
                  'id': innderId++,
                  'title': doc.id,
                  'completed': Math.floor(right * 100 / all),
                  'theme': doc.data().theme
                })
              } else if (doc.data().theme === 'комбинаторика') {
                topicsKomba.push({
                  'id': innderId++,
                  'title': doc.id,
                  'completed': Math.floor(right * 100 / all),
                  'theme': doc.data().theme
                })
              } else if (doc.data().theme === 'огэ') {
                topicsOGE.push({
                  'id': innderId++,
                  'title': doc.id,
                  'completed': Math.floor(right * 100 / all),
                  'theme': doc.data().theme
                })
              } else if (doc.data().theme === 'школа') {
                topicsSchool.push({
                  'id': innderId++,
                  'title': doc.id,
                  'completed': Math.floor(right * 100 / all),
                  'theme': doc.data().theme
                })
              } else if (doc.data().theme === 'идеи') {
                topicsIdea.push({
                  'id': innderId++,
                  'title': doc.id,
                  'completed': Math.floor(right * 100 / all),
                  'theme': doc.data().theme
                })
              } else if (doc.data().theme === 'графы') {
                topicsGraf.push({
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

      ctx.commit('updateTopics', topics, topicsAlgebra)
      ctx.commit('updateTopicsLoaded', true)
    }
  },
  mutations: {
    updateTopics (state, topics, topicsAlgebra) {
      state.topics = topics
      state.topicsAlgebra = topicsAlgebra
    },
    updateTopicsLoaded (state, isLoaded) {
      state.topicsLoaded = isLoaded
    }
  },
  state: {
    topicsLoaded: false,
    topics: [],

    topicsLoadedOGE: false,
    topicsOGE: [],

    topicsLoadedSchool: false,
    topicsSchool: [],

    topicsLoadedAlgebra: false,
    topicsAlgebra: [],

    topicsLoadedGeometry: false,
    topicsGeometry: [],

    // topicsLoadedAlgerba: false,
    // topicsAlgebra: [],

    topicsLoadedKomba: false,
    topicsKomba: [],

    topicsLoadedIdea: false,
    topicsIdea: [],

    topicsLoadedLogika: false,
    topicsLogika: [],

    topicsLoadedGraf: false,
    topicsGraf: []
  },
  getters: {
    getTopics (state) {
      return state.topics
    },
    isTopicsLoaded (state) {
      return state.topicsLoaded
    },
    getTopicsOGE (state) {
      return state.topicsOGE
    },
    isTopicsOGE (state) {
      return state.topicsLoadedOGE
    },
    getTopicsAlgebra (state) {
      return state.topicsAlgebra
    },
    isTopicsLoadedAlgebra (state) {
      return state.topicsLoadedAlgebra
    },
    getTopicsSchool (state) {
      return state.topicsSchool
    },
    isTopicsLoadedSchool (state) {
      return state.topicsLoadedSchool
    },
    getTopicsGeometry (state) {
      return state.topicsGeometry
    },
    isTopicsLoadedGeometry (state) {
      return state.topicsLoadedGeometry
    },
    getTopicsLogika (state) {
      return state.topicsLogika
    },
    isTopicsLoadedLogika (state) {
      return state.topicsLoadedLogika
    },
    getTopicsIdea (state) {
      return state.topicsIdea
    },
    isTopicsLoadedIdea (state) {
      return state.topicsLoadedIdea
    },
    getTopicsGraf (state) {
      return state.topicsGraf
    },
    isTopicsLoadedGraf (state) {
      return state.topicsLoadedGraf
    },
    getTopicsKomba (state) {
      return state.topicsKomba
    },
    isTopicsLoadedKomba (state) {
      return state.topicsLoadedKomba
    }
  }
}
