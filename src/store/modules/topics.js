import firebase from 'firebase/app'
import 'firebase/firestore'

// import { sort } from 'semver'
// import User from './user'
import store from '@/store'

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
      var goodTheme = ['Тестовая тема']
      var innderId = 0
      var mapTopic = new Map()
      const db = firebase.firestore()
      // var docRef = db.collection('account').doc('FGffHhxvVUfa79meSj7bHMYviRs2')
      // docRef.get().then(function (doc2) {
      await db.collection('account').doc(this.getters.getUser.id).get()
        .then(usr => {
          db.collection('task2').get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                var right = 0
                var all = doc.data().cnt_task
                var like = Number(doc.data().like)
                let title = doc.id
                if (goodTheme.indexOf(title.toString()) === -1) {
                  var topic = usr.data()[title]
                  var theme = doc.data().theme
                  if (topic != null) {
                    for (let i = 0; i < topic.length; i++) {
                      if (topic[i] === 2) {
                        right++
                      }
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
                  var r = false
                  var sss = topics.length
                  for (let i = 0; i < sss; i++) {
                    if (like >= topics[i].like) {
                      r = true
                      topics.splice(i, 0, {
                        'id': innderId++,
                        'title': title,
                        'completed': (right * 100) / all,
                        'theme': theme,
                        'like': like
                      })
                      break
                    }
                  }
                  if (!r) {
                    topics.push({
                      'id': innderId++,
                      'title': title,
                      'completed': (right * 100) / all,
                      'theme': theme,
                      'like': like
                    })
                  }
                }
              })
            })
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
    async fetchLikes (ctx, taskCollection) {
      const db = firebase.firestore()
      db.collection(taskCollection).doc(this.getters.getCurrentTopic).get().then(doc => {
        ctx.commit('updateLikes', doc.data().like)
      })
    },
    sendTopic (ctx, payload) {
      // console.log(payload.token, payload.title)
      const db = firebase.firestore()
      db.collection('olympiad').doc(payload.token).set(payload.title)
    },
    async fetchCustomTopic (ctx, payload) {
      const db = firebase.firestore()
      ctx.commit('updateCustomTopic', '')
      await db.collection('olympiad').doc(payload).get().then(doc => {
        if (doc.data() === undefined) ctx.commit('updateCustomTopic', null)
        else ctx.commit('updateCustomTopic', doc.data().name)
      })
    },
    async addUserToTopicList (ctx) {
      const db = firebase.firestore()
      var users
      await db.collection(this.getters.getCollection).doc(this.getters.getCurrentTopic).get().then(doc => {
        users = doc.data().members
      })
      if (users === undefined) users = []
      if (!users.includes(this.getters.getUser.id)) {
        users.push(this.getters.getUser.id)
        db.collection(this.getters.getCollection).doc(this.getters.getCurrentTopic).update({ 'members': users })
      }
    },
    async fetchMyTopics (ctx) {
      const db = firebase.firestore()
      var topics
      await db.collection('account').doc(this.getters.getUser.id).get().then(doc => {
        if (doc.data().myTopics === undefined) topics = undefined
        else topics = doc.data().myTopics
      })
      ctx.commit('updateMyTopics', topics)
    },
    async addMyTopicsToList (ctx, payload) {
      const db = firebase.firestore()
      await store.dispatch('fetchMyTopics')
      var topics = this.getters.getMyTopics
      if (topics === undefined) topics = []
      topics.push(payload)
      ctx.commit('updateMyTopics', topics)
      db.collection('account').doc(this.getters.getUser.id).set({
        myTopics: topics
      }, { merge: true })
    },
    async fetchMyTopicsDetailedInfo (ctx) {
      const db = firebase.firestore()
      await store.dispatch('fetchMyTopics')
      var topicList = this.getters.getMyTopics
      var topicInfo = {}
      for (let i = 0; i < topicList.length; i++) {
        var topicsData = {}
        await db.collection('olympiad').doc(topicList[i]).get().then(doc => {
          topicsData['name'] = doc.data().name
          topicsData['members'] = doc.data().members
        })
        topicInfo[topicList[i]] = topicsData
      }
      ctx.commit('updateMyTopicsDetailedInfo', topicInfo)
    }
  },
  mutations: {
    updateTopics (state, map) {
      // state.topics = topicsg
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
    },
    updateCustomTopic (state, payload) {
      if (payload !== undefined) state.customTopicTitle = payload
      else state.customTopicTitle = null
    },
    updateMyTopics (state, payload) {
      state.myTopics = payload
    },
    updateMyTopicsDetailedInfo (state, payload) {
      state.myTopicsDetailedInfo = payload
    }
  },
  state: {
    topicsLoaded: false,
    mapTopic: new Map(),
    likes: 0,
    customTopicTitle: '',
    myTopics: []
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
    },
    getCustomTopic (state) {
      return state.customTopicTitle
    },
    getMyTopics (state) {
      return state.myTopics
    },
    getMyTopicsDetailedInfo (state) {
      return state.myTopicsDetailedInfo
    }
  }
}
