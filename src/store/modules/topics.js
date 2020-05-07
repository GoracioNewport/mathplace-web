import firebase from 'firebase/app'
import 'firebase/firestore'
// import User from './user'

export default {
  actions: {
    async fetchTopics (ctx) {
      ctx.commit('updateTopicsLoaded', false)

      var topics = []
      var algebra = []
      var geometry = []
      var school = []
      var OGE = []
      var komba = []
      var logika = []
      var graf = []
      var idea = []
      var innderId = 0
      var mapTopic = new Map()
      const db = firebase.firestore()

      await db.collection('task2').get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            var right = 0
            var all = 1
            let title = doc.id
            // var docRef = db.collection('account').doc(User.state.user.id)
            // docRef.get().then(function (doc2) {
            // var topic = doc2.data()[title]
            var theme = doc.data().theme
            // if (topic != null) {
            //   // console.log(String(theme) + ' ' + doc2.data()[theme].toString())
            //   for (let i = 0; i < topic.length; i++) {
            //     console.log('Start')
            //     if (topic[i] === 2) {
            //       right++
            //     }
            //     all++
            //   }
            // }
            if (theme === 'алгебра') {
              algebra.push({
                'id': innderId++,
                'title': title,
                'completed': (right * 100) / all,
                'theme': theme
              })
            } else if (theme === 'геометрия') {
              geometry.push({
                'id': innderId++,
                'title': title,
                'completed': (right * 100) / all,
                'theme': theme
              })
            } else if (theme === 'школа') {
              school.push({
                'id': innderId++,
                'title': title,
                'completed': (right * 100) / all,
                'theme': theme
              })
            } else if (theme === 'огэ') {
              OGE.push({
                'id': innderId++,
                'title': title,
                'completed': (right * 100) / all,
                'theme': theme
              })
            } else if (theme === 'комбинаторика') {
              komba.push({
                'id': innderId++,
                'title': title,
                'completed': (right * 100) / all,
                'theme': theme
              })
            } else if (theme === 'логика') {
              logika.push({
                'id': innderId++,
                'title': title,
                'completed': (right * 100) / all,
                'theme': theme
              })
            } else if (theme === 'графы') {
              graf.push({
                'id': innderId++,
                'title': title,
                'completed': (right * 100) / all,
                'theme': theme
              })
            } else if (theme === 'идеи') {
              idea.push({
                'id': innderId++,
                'title': title,
                'completed': (right * 100) / all,
                'theme': theme
              })
            }
            // arrayTopic = []
            // for (var i in mapTopic.get(theme)) {
            //   arrayTopic.push(Array(i))
            // }
            // var arrayTopic2
            // if (mapTopic.get(theme) != null) {
            //   arrayTopic2 = new Array(mapTopic.get(theme))
            // } else {
            //   arrayTopic2 = [[]]
            // }
            // // arrayTopic = Array(mapTopic[theme])
            // arrayTopic2.push({
            //   'id': innderId++,
            //   'title': title,
            //   'completed': (right * 100) / all,
            //   'theme': theme
            // })
            topics.push({
              'id': innderId++,
              'title': title,
              'completed': (right * 100) / all,
              'theme': theme
            })
            // })
          })
        })
        .catch((err) => {
          console.log('Error getting documents', err)
        })
      mapTopic.set('школа', school)
      mapTopic.set('огэ', OGE)
      mapTopic.set('геометрия', geometry)
      mapTopic.set('алгебра', algebra)
      mapTopic.set('комбинаторика', komba)
      mapTopic.set('логика', komba)
      mapTopic.set('графы', komba)
      mapTopic.set('идеи', komba)
      ctx.commit('updateTopics', mapTopic)
      ctx.commit('updateTopicsLoaded', true)
    }
  },
  mutations: {
    updateTopics (state, map) {
      // state.topics = topics
      state.mapTopic = map
    },
    updateTopicsLoaded (state, isLoaded) {
      state.topicsLoaded = isLoaded
    }
  },
  state: {
    topicsLoaded: false,
    // topics: [],
    mapTopic: new Map()
  },
  getters: {
    getTopics (state) {
      return state.mapTopic
    },
    isTopicsLoaded (state) {
      return state.topicsLoaded
    }
  }
}
