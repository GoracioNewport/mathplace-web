import firebase from 'firebase/app'
import 'firebase/firestore'
// import { sort } from 'semver'
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
      // var docRef = db.collection('account').doc('FGffHhxvVUfa79meSj7bHMYviRs2')
      // docRef.get().then(function (doc2) {
      var userData = db.collection('account').doc(this.getters.getUser.id)
      await userData.get()
        .then(usr => {
          db.collection('task2').get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                var right = 0
                var all = doc.data().cnt_task
                var like = doc.data().like
                let title = doc.id
                var topic = usr.data()[title]
                var theme = doc.data().theme
                if (topic != null) {
                  for (let i = 0; i < topic.length; i++) {
                    if (topic[i] === 2) {
                      right++
                    }
                    // all++
                  }
                }
                if (theme === 'алгебра') {
                  algebra.push({
                    'id': innderId++,
                    'title': title,
                    'completed': (right * 100) / all,
                    'theme': theme,
                    'like': like
                  })
                } else if (theme === 'геометрия') {
                  geometry.push({
                    'id': innderId++,
                    'title': title,
                    'completed': (right * 100) / all,
                    'theme': theme,
                    'like': like
                  })
                } else if (theme === 'школа') {
                  school.push({
                    'id': innderId++,
                    'title': title,
                    'completed': (right * 100) / all,
                    'theme': theme,
                    'like': like
                  })
                } else if (theme === 'огэ') {
                  OGE.push({
                    'id': innderId++,
                    'title': title,
                    'completed': (right * 100) / all,
                    'theme': theme,
                    'like': like
                  })
                } else if (theme === 'комбинаторика') {
                  komba.push({
                    'id': innderId++,
                    'title': title,
                    'completed': (right * 100) / all,
                    'theme': theme,
                    'like': like
                  })
                } else if (theme === 'логика') {
                  logika.push({
                    'id': innderId++,
                    'title': title,
                    'completed': (right * 100) / all,
                    'theme': theme,
                    'like': like
                  })
                } else if (theme === 'графы') {
                  graf.push({
                    'id': innderId++,
                    'title': title,
                    'completed': (right * 100) / all,
                    'theme': theme,
                    'like': like
                  })
                } else if (theme === 'идеи') {
                  idea.push({
                    'id': innderId++,
                    'title': title,
                    'completed': (right * 100) / all,
                    'theme': theme,
                    'like': like
                  })
                }
                topics.push({
                  'id': innderId++,
                  'title': title,
                  'completed': (right * 100) / all,
                  'theme': theme,
                  'like': like
                })
              })
            })
        })
      topics.sort(function (a, b) {
        return b.like - a.like
      })
      mapTopic.set('популярные', topics)
      mapTopic.set('школа', school)
      mapTopic.set('огэ', OGE)
      mapTopic.set('геометрия', geometry)
      mapTopic.set('алгебра', algebra)
      mapTopic.set('комбинаторика', komba)
      mapTopic.set('логика', logika)
      mapTopic.set('графы', graf)
      mapTopic.set('идеи', komba)
      ctx.commit('updateTopics', mapTopic)
      ctx.commit('updateTopicsLoaded', true)
    },
    like (ctx, liked) {
      let n = 0
      if (liked) n = 1
      else n = -1
      let likes = this.getters.getTopicLikes
      ctx.commit('updateTopicDetailsDB', ['like', likes + n])
    },
    async fetchLikes (ctx) {
      const db = firebase.firestore()
      db.collection('task2').doc(this.getters.getCurrentTopic).get().then(doc => {
        ctx.commit('updateLikes', doc.data().like)
      })
    }
  },
  mutations: {
    updateTopics (state, map) {
      // state.topics = topics
      state.mapTopic = map
    },
    updateTopicsLoaded (state, isLoaded) {
      state.topicsLoaded = isLoaded
    },
    updateTopicDetailsDB (state, [key, value]) {
      const db = firebase.firestore()
      this.commit('updateLikes', value)
      db.collection('task2').doc(this.getters.getCurrentTopic).update({ [key]: value })
    },
    updateLikes (state, payload) {
      state.likes = payload
    }
  },
  state: {
    topicsLoaded: false,
    mapTopic: new Map(),
    likes: 0
  },
  getters: {
    getTopics (state) {
      return state.mapTopic
    },
    isTopicsLoaded (state) {
      return state.topicsLoaded
    },
    getTopicLikes (state) {
      return state.likes
    }
  }
}
