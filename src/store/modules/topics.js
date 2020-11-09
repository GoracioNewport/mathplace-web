import firebase from 'firebase/app'
import 'firebase/firestore'

import store from '@/store'

// eslint-disable-next-line
import { accountDb, tasksDb, olympiadDb, userTasksDb } from './global'

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
      await db.collection(accountDb).doc(this.getters.getUser.id).get()
        .then(async usr => {
          var usrData = usr.data()
          await db.collection(tasksDb).get()
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
      let userLikes = this.getters.getUser.like
      console.log(userLikes.length)
      userLikes.push(this.getters.getCurrentTopic)
      ctx.commit('updateUser', ['like', userLikes])
      console.log(userLikes.length)
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
      db.collection(olympiadDb).doc(payload.token).set(payload.title)
    },
    async fetchCustomTopic (ctx, payload) {
      const db = firebase.firestore()
      ctx.commit('updateCustomTopic', '')
      await db.collection(olympiadDb).doc(payload).get().then(doc => {
        var data = doc.data()
        if (data === undefined) ctx.commit('updateCustomTopic', null)
        else ctx.commit('updateCustomTopic', data.name)
      })
    },
    async addUserToTopicList (ctx) {
      const db = firebase.firestore()
      var users
      await db.collection(this.getters.getCollection).doc(this.getters.getCurrentTopic).get().then(doc => {
        users = doc.data().members
      })
      if (users === undefined || users === null) users = []
      if (!users.includes(this.getters.getUser.id)) {
        users.push(this.getters.getUser.id)
        users = [...new Set(users)] // Из-за какого-то бага иногда пользователь может встречаться несколько раз, по этому удаляем все дупликаты...
        db.collection(this.getters.getCollection).doc(this.getters.getCurrentTopic).update({ 'members': users })
      }
    },
    async fetchMyTopics (ctx) {
      ctx.commit('updateMyTopics', [])
      const db = firebase.firestore()
      var topics
      await db.collection(accountDb).doc(this.getters.getUser.id).get().then(doc => {
        var data = doc.data()
        if (data.myTopics === undefined) topics = undefined
        else topics = data.myTopics
      })
      ctx.commit('updateMyTopics', topics)
    },
    async addMyTopicsToList (ctx, payload) {
      const db = firebase.firestore()
      await store.dispatch('fetchMyTopics')
      var topics = [...new Set(this.getters.getMyTopics)]
      if (topics === undefined) topics = []
      topics.push(payload)
      ctx.commit('updateMyTopics', topics)
      db.collection(accountDb).doc(this.getters.getUser.id).set({
        myTopics: topics
      }, { merge: true })
    },
    async fetchMyTopicsDetailedInfo (ctx) {
      ctx.commit('updateMyTopicsDetailedInfo', {})
      const db = firebase.firestore()
      await store.dispatch('fetchMyTopics')
      var topicList = this.getters.getMyTopics
      var topicInfo = {}
      for (let i = 0; i < topicList.length; i++) {
        var topicsData = {}
        let brokenTopic = false
        await db.collection(olympiadDb).doc(topicList[i]).get().then(doc => {
          var data = doc.data()
          if (data === undefined) brokenTopic = true
          else {
            topicsData['token'] = topicList[i]
            topicsData['name'] = data.name
            topicsData['members'] = data.members
            topicsData['showStats'] = false
            topicsData['statsLoaded'] = false
            topicsData['stats'] = {}
          }
        })
        if (!brokenTopic) topicInfo[topicList[i]] = topicsData
        else console.log('Topic ', topicList[i], ' either deleted or corrupted')
      }
      ctx.commit('updateMyTopicsDetailedInfo', topicInfo)
    },
    async fetchTopicStatistics (ctx, id) {
      const db = firebase.firestore()
      var members = this.getters.getMyTopicsDetailedInfo[id].members
      var sendData = []
      for (let i = 0; i < members.length; i++) {
        var info = {}
        await db.collection(accountDb).doc(members[i]).get().then(async doc => {
          var data = doc.data()
          info['id'] = members[i]
          info['name'] = data.name
          await db.collection(accountDb).doc(members[i]).collection(userTasksDb).doc(id).get().then(statDoc => {
            var statData = statDoc.data()
            info['solveStats'] = statData.grades
          })
          info['solveSum'] = 0
        })
        var cnt = 0
        for (let i = 0; i < info.solveStats.length; i++) {
          if (Number(info.solveStats[i]) === 3 || Number(info.solveStats[i]) === 2) cnt++
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
      db.collection(accountDb).doc(payload.userId).collection(userTasksDb).doc(payload.topicName).update({
        grades: payload.newStats
      })
      // console.log(payload.topicName, payload.newStats)
    },
    async fetchMyTopic (ctx, id) {
      const db = firebase.firestore()
      var topic = {}
      await db.collection(olympiadDb).doc(id).get().then(doc => {
        var rawTopic = doc.data()
        topic['author'] = rawTopic.author
        topic['name'] = rawTopic.name
        topic['cnt_task'] = rawTopic.cnt_task
        topic['items'] = rawTopic.items
        topic['private'] = !rawTopic.public
        topic['theme'] = rawTopic.theme.charAt(0).toUpperCase() + rawTopic.theme.slice(1)
        topic['class'] = rawTopic.class
        topic['tasks'] = rawTopic.tasks
        topic['time_start'] = rawTopic.time_start
        topic['time_end'] = rawTopic.time_end
        for (let i = 0; i < rawTopic.items; i++) {
          var rawTask = topic.tasks[i]
          if (rawTask.difficulty === 1) rawTask.difficulty = 'Легкая'
          else if (rawTask.difficulty === 2) rawTask.difficulty = 'Средняя'
          else rawTask.difficulty = 'Сложная'
        }
      })
      ctx.commit('updateMyTopic', topic)
    },
    deleteTopic (ctx, payload) {
      const db = firebase.firestore()
      var docRef = db.collection(accountDb).doc(this.getters.getUser.id)
      db.runTransaction(function (transaction) {
        return transaction.get(docRef).then(function (doc) {
          var list = doc.data().myTopics
          list = list.filter(e => e !== payload)
          transaction.update(docRef, { myTopics: list })
        })
      })
      db.collection(olympiadDb).doc(payload).delete()
    },
    async fetchTopicList (ctx) {
      const db = firebase.firestore()
      var list = []
      // Читаем все личные задачи
      var myTopics
      await db.collection(accountDb).doc(this.getters.getUser.id).get().then(doc => { doc.data().myTopics !== undefined ? myTopics = doc.data().myTopics : myTopics = [] })
      for await (var topic of myTopics) {
        db.collection(olympiadDb).doc(topic).get().then(doc => {
          var data = JSON.parse(JSON.stringify(doc.data()))
          var info = {}
          info.collection = 'user'
          info.name = data.name
          data.tasks !== undefined ? info.tasks = data.tasks : info.tasks = []
          var taskInd = 0
          // Парсинг задач
          for (let i = 0; i < info.tasks.length; i++) {
            info.tasks[i].originData = JSON.parse(JSON.stringify(data.tasks[i]))
            if (info.tasks[i].type !== 'theory') taskInd++
            info.tasks[i].taskInd = taskInd
            // Парсинг текста
            var text = ''
            for (let j = 0; j < info.tasks[i].statement.length; j++) {
              if (info.tasks[i].statement[j].type === 'text') text += info.tasks[i].statement[j].inner
            }
            info.tasks[i].textPreview = text
          }
          list.push(info)
        })
      }
      // Читаем все задачи из MathPlace
      await db.collection(tasksDb).get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            var data = JSON.parse(JSON.stringify(doc.data()))
            var info = {}
            info.collection = 'mathplace'
            info.name = doc.id
            data.tasks !== undefined ? info.tasks = data.tasks : info.tasks = []
            var taskInd = 0
            // Парсинг задач
            for (let i = 0; i < info.tasks.length; i++) {
              info.tasks[i].originData = JSON.parse(JSON.stringify(data.tasks[i]))
              if (info.tasks[i].type !== 'theory') taskInd++
              info.tasks[i].taskInd = taskInd
              // Парсинг текста
              var text = ''
              for (let j = 0; j < info.tasks[i].statement.length; j++) {
                if (info.tasks[i].statement[j].type === 'text') text += info.tasks[i].statement[j].inner
              }
              info.tasks[i].textPreview = text
            }
            list.push(info)
          })
        })
      ctx.commit('updateTopicList', list)
    }
  },
  mutations: {
    updateTopics (state, map) {
      state.mapTopic = map
    },
    updateTopicsLoaded (state, isLoaded) {
      state.topicsLoaded = isLoaded
    },
    updateTopicDetailsDB (state, [key, value]) {
      const db = firebase.firestore()
      this.commit('updateLikes', value)
      db.collection(tasksDb).doc(this.getters.getCurrentTopic).update({ [key]: value })
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
    },
    updateTopicList (state, payload) {
      state.topicList = payload
    }
  },
  state: {
    topicsLoaded: false,
    mapTopic: new Map(),
    likes: 0,
    customTopicTitle: '',
    myTopics: [],
    myTopic: {},
    topicList: []
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
      if (state.myTopics === undefined) return []
      else return state.myTopics
    },
    getMyTopicsDetailedInfo (state) {
      return state.myTopicsDetailedInfo
    },
    getMyTopic (state) {
      return state.myTopic
    },
    getTopicList (state) {
      return state.topicList
    }
  }
}
