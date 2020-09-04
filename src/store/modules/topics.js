import firebase from 'firebase/app'
import 'firebase/firestore'

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
      await db.collection('account').doc(this.getters.getUser.id).get()
        .then(usr => {
          var usrData = usr.data()
          db.collection('task2').get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                var docData = doc.data()
                var right = 0
                var all = docData.cnt_task
                var like = Number(docData.like)
                let title = doc.id
                if (goodTheme.indexOf(title.toString()) === -1) {
                  var topic = usrData[title]
                  var theme = docData.theme
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
      const db = firebase.firestore()
      db.collection('olympiad').doc(payload.token).set(payload.title)
    },
    async fetchCustomTopic (ctx, payload) {
      const db = firebase.firestore()
      ctx.commit('updateCustomTopic', '')
      await db.collection('olympiad').doc(payload).get().then(doc => {
        var data = doc.data()
        if (data === undefined) ctx.commit('updateCustomTopic', null)
        else ctx.commit('updateCustomTopic', data.name)
      })
    },
    async addUserToTopicList (ctx) {
      const db = firebase.firestore()
      var users
      console.log(this.getters.getCollection, this.getters.getCurrentTopic)
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
        var data = doc.data()
        if (data.myTopics === undefined) topics = undefined
        else topics = data.myTopics
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
          var data = doc.data()
          console.log(topicList[i])
          topicsData['token'] = topicList[i]
          topicsData['name'] = data.name
          topicsData['members'] = data.members
          topicsData['showStats'] = false
          topicsData['stats'] = {}
        })
        topicInfo[topicList[i]] = topicsData
      }
      ctx.commit('updateMyTopicsDetailedInfo', topicInfo)
    },
    async fetchTopicStatistics (ctx, id) {
      const db = firebase.firestore()
      var members = this.getters.getMyTopicsDetailedInfo[id].members
      var sendData = []
      for (let i = 0; i < members.length; i++) {
        var info = {}
        await db.collection('account').doc(members[i]).get().then(doc => {
          var data = doc.data()
          info['id'] = members[i]
          info['name'] = data.name
          info['solveStats'] = data[id]
          info['solveSum'] = 0
        })
        var cnt = 0
        for (let i = 0; i < info.solveStats.length; i++) {
          if (info.solveStats[i] === 3 || info.solveStats[i] === 2) cnt++
        }
        info.solveSum = cnt
        sendData.push(info)
      }
      var usrData = {
        id: id,
        data: sendData
      }
      ctx.commit('updateTopicStats', usrData)
    },
    markDBSolutionAs (ctx, payload) {
      // console.log(payload)
      const db = firebase.firestore()
      db.collection('account').doc(payload.userId).set({
        [payload.topicName]: payload.newStats
      }, { merge: true })
      // console.log(payload.topicName, payload.newStats)
    },
    async fetchMyTopic (ctx, id) {
      const db = firebase.firestore()
      var topic = {}
      await db.collection('olympiad').doc(id).get().then(doc => {
        var rawTopic = doc.data()
        topic['author'] = rawTopic.author
        topic['name'] = rawTopic.name
        topic['cnt_task'] = rawTopic.cnt_task
        topic['items'] = rawTopic.items
        topic['private'] = !rawTopic.public
        topic['theme'] = rawTopic.theme.charAt(0).toUpperCase() + rawTopic.theme.slice(1)
        topic['class'] = rawTopic.class
        topic['tasks'] = []
        for (let i = 0; i < rawTopic.items; i++) {
          var rawTask = rawTopic['task' + String(i)]
          var task = {}
          task['answer'] = rawTask[1]
          if (rawTask[2] === 1) task['difficulty'] = 'Легкая'
          else if (rawTask[2] === 2) task['difficulty'] = 'Средняя'
          else task['difficulty'] = 'Сложная'
          task['solution'] = rawTask[3]
          let comma = '\\'.concat('n')
          var rawText = rawTask[0].split(comma)
          console.log(comma, rawText)
          var text = []
          for (let j = 0; j < rawText.length; j++) {
            var type
            rawText[j].slice(0, 5) === '[http' ? type = 'img' : type = 'text'
            text.push({ type: type, inner: rawText[j] })
          }
          if (text.length !== 1) text.pop()
          task['text'] = text
          if (rawTask[4] !== undefined) task['options'] = rawTask[4]
          let taskKind = '' // Теория, обычная, на доказательство, с загрузкой, множественный выбор, несколько ответов
          if (rawTask[1] === 'theory') taskKind = 'theory'
          else if (rawTask[1] === 'null') taskKind = 'proof'
          else if (rawTask[1] === 'image') taskKind = 'upload'
          else if (rawTask.length === 5) taskKind = 'multipleChoice'
          else if (rawTask[1].indexOf('|') !== -1) taskKind = 'multipleAnswer'
          else taskKind = 'task'
          task['type'] = taskKind
          topic['tasks'].push(task)
        }
      })
      console.log(topic)
      ctx.commit('updateMyTopic', topic)
    },
    deleteTopic (ctx, payload) {
      console.log('Deleting ', payload)
      const db = firebase.firestore()
      var docRef = db.collection('account').doc(this.getters.getUser.id)
      db.runTransaction(function (transaction) {
        return transaction.get(docRef).then(function (doc) {
          var list = doc.data().myTopics
          list = list.filter(e => e !== payload)
          transaction.update(docRef, { myTopics: list })
        })
      })
      console.log(this.getters.getUser.id, payload)
      db.collection('olympiad').doc(payload).delete()
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
    },
    updateTopicStats (state, payload) {
      state.myTopicsDetailedInfo[payload.id].stats = payload.data
    },
    updateMyTopic (state, payload) {
      state.myTopic = payload
    }
  },
  state: {
    topicsLoaded: false,
    mapTopic: new Map(),
    likes: 0,
    customTopicTitle: '',
    myTopics: [],
    myTopic: {}
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
    },
    getMyTopic (state) {
      return state.myTopic
    }
  }
}
