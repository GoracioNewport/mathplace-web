import firebase from 'firebase/app'
import 'firebase/firestore'

import store from '@/store'

// eslint-disable-next-line
import { accountDb, tasksDb, olympiadDb, userTasksDb, commentsDb, AllCommentsDb } from './global'

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
    async fetchMyTopicForLesson (ctx, token) {
      // ctx.commit('updateMyTopics', [])
      const db = firebase.firestore()
      var topics = [token]
      // await db.collection(accountDb).doc(this.getters.getUser.id).get().then(doc => {
      //   var data = doc.data()
      //   if (data.myTopics === undefined) topics = undefined
      //   else topics = data.myTopics
      // })
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
    async fetchComments (ctx, token) {
      console.log(token)
      const db = firebase.firestore()
      var allComments = []
      await db.collection(olympiadDb).doc(token).collection(commentsDb).doc(AllCommentsDb).get().then(doc => {
        var data = doc.data()
        allComments = data.messages
        for (let i = 0; i < allComments.length; i++) {
          console.log(allComments[i].userId)
          db.collection(accountDb).doc(allComments[i].userId).get().then(doc => {
            allComments[i]['userName'] = doc.data().name
          })
        }
      })
      console.log(allComments)
      ctx.commit('updateAllComments', allComments)
    },
    async sendComments (ctx, {token, userId, text}) {
      const db = firebase.firestore()
      var allComments = []
      console.log(token)
      await db.collection(olympiadDb).doc(token).collection(commentsDb).doc(AllCommentsDb).get().then(doc => {
        var data = doc.data()
        allComments = data.messages
      })

      var newMessage = {}
      newMessage['userId'] = userId
      newMessage['text'] = text
      allComments.push(newMessage)
      console.log(allComments)
      await db.collection(olympiadDb).doc(token).collection(commentsDb).doc(AllCommentsDb).update({ 'messages': allComments })
    },
    async fetchMyTopicsDetailedInfo (ctx) {
      ctx.commit('updateMyTopicsDetailedInfo', {})
      const db = firebase.firestore()
      await store.dispatch('fetchMyTopics')

      var topicList = this.getters.getMyTopics

      // console.log(topicList)

      const topicsPromArray = topicList.map(topicId => new Promise(async (resolve, reject) => {
        const topicData = (await db.collection(olympiadDb).doc(topicId).get()).data()

        // console.log(topicData)

        if (!topicData) {
          // console.log("brokenTopic")
          return resolve()
        }

        const {name, members} = topicData

        // if(topicData.grades !== null){
        const {grades} = topicData
        // }


        resolve ({
          token: topicId,
          name,
          members,
          showStats: false,
          statsLoaded: false,
          grades,
          stats: {}
        })
      }))

      const topicInfo = await Promise.all(topicsPromArray)
      // console.log(topicInfo)
      const topicInfoObject = topicInfo.reduce((acc, value) => value ? ({...acc, [value.token]: value}) : acc, {})
      // console.log(topicInfoObject)
      // console.log(topicInfo)
      ctx.commit('updateMyTopicsDetailedInfo', topicInfoObject)
      // var topicInfo = {}
      // for (let i = 0; i < topicList.length; i++) {
      //   var topicsData = {}
      //   let brokenTopic = false
      //   await db.collection(olympiadDb).doc(topicList[i]).get().then(doc => {
      //     var data = doc.data()
      //     if (data === undefined) brokenTopic = true
      //     else {
      //       topicsData['token'] = topicList[i]
      //       topicsData['name'] = data.name
      //       topicsData['members'] = data.members
      //       topicsData['showStats'] = false
      //       topicsData['statsLoaded'] = false
      //       topicsData['stats'] = {}
      //     }
      //   })
      //   if (!brokenTopic) topicInfo[topicList[i]] = topicsData
      //   else console.log('Topic ', topicList[i], ' either deleted or corrupted')
      // }
    },
    async fetchTopicStatistics (ctx, id) {
      const db = firebase.firestore()
      var members = this.getters.getMyTopicsDetailedInfo[id].members
      console.log(this.getters.getMyTopicsDetailedInfo[id])
      var lessonGrade = this.getters.getMyTopicsDetailedInfo[id].grades
      var membersPromArray = members.map(memberId => new Promise( async (resolve, reject) => {
        const memberDoc = (await db.collection(accountDb).doc(memberId).get()).data()

        const {name} = memberDoc

        const memberTaskDoc = (await db.collection(accountDb).doc(memberId).collection(userTasksDb).doc(id).get()).data()

        const {grades: solveStats, lastAnswers: answers} = memberTaskDoc

        const solveSum = solveStats.reduce((acc, value) => (+value === 3 || +value === 2) ? ++acc : acc, 0)

        let gradeUser = null
        if ( lessonGrade !== null && lessonGrade !== undefined ) {
          // console.log(lessonGrade)
          gradeUser = 1
          for( let grade of Object.keys(lessonGrade) ) {
            // console.log(lessonGrade[grade], solveSum)
            if( lessonGrade[grade] <= solveSum ) {
              gradeUser = grade
            }
          }
        }

        // console.log(gradeUser, lessonGrade)

        resolve ({
          id: memberId,
          name,
          solveStats,
          answers,
          solveSum,
          grade: gradeUser,
        })
      }))

      const sendData = await Promise.all(membersPromArray)

      // var sendData = []
      // for (let i = 0; i < members.length; i++) {
      //   var info = {}
      //   await db.collection(accountDb).doc(members[i]).get().then(async doc => {
      //     var data = doc.data()
      //     info['id'] = members[i]
      //     info['name'] = data.name
      //     await db.collection(accountDb).doc(members[i]).collection(userTasksDb).doc(id).get().then(statDoc => {
      //       var statData = statDoc.data()
      //       info['solveStats'] = statData.grades
      //       info['answers'] = statData.lastAnswers
      //     })
      //     info['solveSum'] = 0
      //   })
      //   var cnt = 0
      //   for (let i = 0; i < info.solveStats.length; i++) {
      //     if (Number(info.solveStats[i]) === 3 || Number(info.solveStats[i]) === 2) cnt++
      //   }
      //   info.solveSum = cnt
      //   sendData.push(info)
      // }
      var usrData = {
        id: id,
        data: sendData
      }
      ctx.commit('updateTopicStats', usrData)
    },
    async fetchLessonStatistics (ctx, id) {
      const db = firebase.firestore()
      console.log(id)
      var sendDataLesson = []

      await db.collection(olympiadDb).doc(id).get().then(async doc => {
        var lesson = doc.data()
        console.log(lesson)
        var members = lesson.members
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
            // sendData[members[i]] = info
            sendDataLesson.push(info)
          })
          var cnt = 0
          for (let i = 0; i < info.solveStats.length; i++) {
            if (Number(info.solveStats[i]) === 3 || Number(info.solveStats[i]) === 2) cnt++
          }
          info.solveSum = cnt
        }
      })
      console.log(sendDataLesson)
      ctx.commit('updateLessonStatistic', sendDataLesson)
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
        topic['isHiddenResults'] = rawTopic.isHiddenResults
        for (let i = 0; i < rawTopic.tasks.length; i++) {
          var rawTask = topic.tasks[i]
          if (rawTask.difficulty === 1) rawTask.difficulty = 'Легкая'
          else if (rawTask.difficulty === 2) rawTask.difficulty = 'Средняя'
          else rawTask.difficulty = 'Сложная'
          if (rawTask.type === 'block') {
            for (let j = 0; j < rawTask.tasks.length; j++) {
              var rawBlockTask = rawTask.tasks[j]
              if (rawBlockTask.difficulty === 1) rawBlockTask.difficulty = 'Легкая'
              else if (rawBlockTask.difficulty === 2) rawBlockTask.difficulty = 'Средняя'
              else rawBlockTask.difficulty = 'Сложная'
            }
          }
        }
      })
      ctx.commit('updateMyTopic', topic)
    },
    async deleteTopic (ctx, payload) {
      const db = firebase.firestore()
      var docRef = db.collection(accountDb).doc(this.getters.getUser.id)
      let userTopicList = []
      await docRef.get().then(doc => {
        let data = doc.data()
        userTopicList = data.myTopics
      })
      console.log(userTopicList, userTopicList.length)
      userTopicList.splice(userTopicList.findIndex(e => e === payload), 1)
      console.log(userTopicList, userTopicList.length)
      console.log(payload)
      docRef.update({
        myTopics: userTopicList
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
          if (doc.data() === undefined) return
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
    },
    async fetchMembersStatistics (ctx, id) {
      ctx.commit('updateMembersSort', [])
      const db = firebase.firestore()
      console.log(id)
      var members = this.getters.getMyTopicsDetailedInfo[id].members
      var sendData = {}
      var membersSort = []
      for (let i = 0; i < members.length; i++) {
        var info = {}
        membersSort.push(members[i])
        await db.collection(accountDb).doc(members[i]).get().then(async doc => {
          var data = doc.data()
          info['id'] = members[i]
          console.log(data)
          info['name'] = data.name
          await db.collection(accountDb).doc(members[i]).collection(userTasksDb).doc(id).get().then(statDoc => {
            var statData = statDoc.data()
            info['solveStats'] = statData.grades
          })
          info['solveSum'] = 0
        })
        var cnt = 0
        for (let i = 0; i < info.solveStats.length; i++) {
          if (Number(info.solveStats[i]) === 2) cnt++
        }
        info.solveSum = cnt
        sendData[members[i]] = info
      }
      // var usrData = {
      //   id: id,
      //   data: sendData
      // }
      membersSort.sort(function (a, b) {
        if (sendData[a].solveSum < sendData[b].solveSum) {
          return 1
        } else {
          return -1
        }
      })
      console.log(sendData)
      ctx.commit('updateMembersSort', membersSort)
      ctx.commit('updateMembersStats', sendData)
    },
    async banLessonMember (ctx, payload) {
      const db = firebase.firestore()
      // Стираем прогресс пользователя
      await db.collection(accountDb).doc(payload.id).collection(userTasksDb).doc(payload.token).delete()
      // Убираем из массива members
      var members, blacklist
      await db.collection(olympiadDb).doc(payload.token).get().then(doc => { members = doc.data().members; blacklist = doc.data().blacklist })
      members.splice(members.findIndex(e => e === payload.id), 1)
      await db.collection(olympiadDb).doc(payload.token).update({ members: members })
      // Если надо забанить, то добавляем пользователя в блеклист
      if (payload.ban === true) {
        if (blacklist === undefined) blacklist = []
        blacklist.push(payload.id)
        await db.collection(olympiadDb).doc(payload.token).update({ blacklist: blacklist })
      }
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
    updateAllComments (state, payload) {
      state.allComments = payload
    },
    updateTopicStats (state, payload) {
      console.log('UPDATE')
      state.myTopicsDetailedInfo[payload.id].stats = payload.data
      // console.log(state.myTopicsDetailedInfo[payload.id])
    },
    updateLessonStatistic (state, payload) {
      state.lessonStatistics = payload
    },
    updateMembersStats (state, payload) {
      state.MembersStatistics = payload
    },
    updateMembersSort (state, payload) {
      state.MembersSort = payload
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
    allComments: [],
    lessonStatistics: [],
    topicList: [],
    MembersSort: [],
    MembersStatistics: {}
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
    getCommentsFromLesson (state) {
      return state.allComments
    },
    getMyLessonstatistics (state) {
      console.log(state.lessonStatistics)
      return state.lessonStatistics
    },
    getMyTopic (state) {
      return state.myTopic
    },
    getTopicList (state) {
      return state.topicList
    },
    getMembersStatistics (state) {
      return state.MembersStatistics
    },
    getMembersSort (state) {
      return state.MembersSort
    }
  }
}
