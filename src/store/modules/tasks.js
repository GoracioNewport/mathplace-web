import firebase from 'firebase/app'
import 'firebase/firestore'
// eslint-disable-next-line
import { accountDb, tasksDb, olympiadDb, userTasksDb } from './global'

export default {
  actions: {
    async fetchTasks (ctx, taskCollection) {
      ctx.commit('updateTasksLoadingStatus', true)
      const db = firebase.firestore()
      var tasksDb = db.collection(taskCollection).doc(this.getters.getCurrentTopic)
      var userData = db.collection(accountDb).doc(this.getters.getUser.id).collection(userTasksDb).doc(this.getters.getCurrentTopic)
      var itemCount = 0
      var taskCount = 0
      var tasksInfo = {}
      var tasksList = []
      let userTopicDetails = []

      // Очищаем хранилище

      ctx.commit('updateTasks', tasksList)
      ctx.commit('updateTasksInfo', tasksInfo)

      // Работа с бд

      await userData.get()
        .then(async usr => {
          var usrData = usr.data()
          await tasksDb.get()
            .then(doc => {
              var docData = doc.data()
              // Обновление значений юзера в бд

              userTopicDetails = usrData
              itemCount = docData.items

              let newMember = false
              let modified = false
              if (userTopicDetails === undefined || userTopicDetails.lastAnswers === undefined || userTopicDetails.solution === undefined || userTopicDetails.grades === undefined) newMember = true
              if (!newMember && (userTopicDetails.lastAnswers.length !== itemCount || userTopicDetails.solution.length !== itemCount || userTopicDetails.grades.length !== itemCount)) modified = true

              if (userTopicDetails === undefined || userTopicDetails.lastAnswers === undefined || userTopicDetails.solution === undefined || userTopicDetails.grades === undefined || userTopicDetails.lastAnswers.length > itemCount || userTopicDetails.solution.length > itemCount || userTopicDetails.grades.length > itemCount) {
                let blankArray = []
                let nullArray = []
                for (let i = 0; i < itemCount; i++) blankArray.push(1)
                for (let i = 0; i < itemCount; i++) nullArray.push('null')
                userData.set({
                  grades: blankArray,
                  solution: blankArray,
                  lastAnswers: nullArray
                })
                userTopicDetails = {
                  'grades': blankArray,
                  'solution': blankArray,
                  'lastAnswers': nullArray
                }
              // Что делать, если чел зашел, а препод изменил тему...
              } else if (userTopicDetails.grades.length < itemCount) {
                for (let i = userTopicDetails.grades.length; i < itemCount; i++) {
                  userTopicDetails.grades.push(1)
                  userTopicDetails.solution.push(1)
                  userTopicDetails.lastAnswers.push('null')
                }
                userData.set({
                  grades: userTopicDetails.grades,
                  solution: userTopicDetails.solution,
                  lastAnswers: userTopicDetails.lastAnswers
                })
                userTopicDetails = {
                  'grades': userTopicDetails.grades,
                  'solution': userTopicDetails.solution,
                  'lastAnswers': userTopicDetails.lastAnswers
                }
              }

              let tasks = []
              // Вариант контроши. Если чел зашел первый раз или препод изменил тему:
              if (newMember || modified) {
                let generatePattern = []
                for (let i = 0; i < docData.tasks.length; i++) {
                  console.log(docData.tasks[i])
                  if (docData.tasks[i].type !== 'block') tasks.push(docData.tasks[i])
                  else {
                    var taskIndexes = [...Array(docData.tasks[i].tasks.length).keys()]
                    for (var k = taskIndexes.length - 1; k > 0; k--) { // Шафл
                      var j = Math.floor(Math.random() * (k + 1))
                      var temp = taskIndexes[k]
                      taskIndexes[k] = taskIndexes[j]
                      taskIndexes[j] = temp
                    }
                    let randomTasks = taskIndexes.slice(0, Number(docData.tasks[i].choiceTask))
                    console.log(randomTasks)
                    generatePattern.push(randomTasks)
                    for (let j = 0; j < randomTasks.length; j++) tasks.push(docData.tasks[i].tasks[randomTasks[j]])
                  }
                } var generatePatternMap = {}
                for (let i = 0; i < generatePattern.length; i++) generatePatternMap[i] = generatePattern[i]
                if (generatePattern.length > 0) userData.update({ 'generatePattern': generatePatternMap })
              } else {
                var blockCnt = 0
                for (let i = 0; i < docData.tasks.length; i++) {
                  console.log(userTopicDetails.generatePattern)
                  if (docData.tasks[i].type !== 'block') tasks.push(docData.tasks[i])
                  else {
                    console.log('enter block')
                    console.log('pattern: ', userTopicDetails.generatePattern[blockCnt], blockCnt)
                    for (let j = 0; j < userTopicDetails.generatePattern[blockCnt].length; j++) tasks.push(docData.tasks[i].tasks[userTopicDetails.generatePattern[blockCnt][j]])
                    console.log('aaa', blockCnt)
                    blockCnt += 1
                    console.log('bbb', blockCnt)
                  }
                }
              } docData.tasks = tasks
              console.log(docData.tasks)

              // Парсинг задач
              for (let i = 0; i < itemCount; i++) {
                // console.log(docData.tasks[i])
                var task = docData.tasks[i]
                if (task.type !== 'theory') taskCount++
                task.id = i
                task.taskId = taskCount
                task.tries = userTopicDetails.grades[i]
                task.userAnswer = userTopicDetails.lastAnswers[i]
                tasksList.push(task)
              }

              // Информация о теме

              docData.name === undefined ? tasksInfo.name = this.getters.getCurrentTopic : tasksInfo.name = docData.name
              docData.author === undefined ? tasksInfo.author = null : tasksInfo.author = docData.author
              docData.author === undefined ? tasksInfo.token = null : tasksInfo.token = this.getters.getCurrentTopic
              docData.time_start === undefined ? tasksInfo.time_start = null : tasksInfo.time_start = docData.time_start.toDate()
              docData.time_end === undefined ? tasksInfo.time_end = null : tasksInfo.time_end = docData.time_end.toDate()
            })
        })
      ctx.commit('updateTasksInfo', tasksInfo)
      ctx.commit('updateTasks', tasksList)
    },
    changeCurrentTopic (ctx, topic) {
      ctx.commit('updateCurrentTopic', topic)
    },
    changeCurrentLogo (ctx, logo) {
      ctx.commit('updateCurrentLogo', logo)
    },
    changeCollection (ctx, name) {
      ctx.commit('updateCollection', name)
    },
    // async fetchLessonStatistics (ctx, id) {
    //   const db = firebase.firestore()
    //   var members = this.getters.getMyTopicsDetailedInfo[id].members
    //   var sendData = []
    //   for (let i = 0; i < members.length; i++) {
    //     var info = {}
    //     await db.collection(accountDb).doc(members[i]).get().then(async doc => {
    //       var data = doc.data()
    //       info['id'] = members[i]
    //       info['name'] = data.name
    //       await db.collection(accountDb).doc(members[i]).collection(userTasksDb).doc(id).get().then(statDoc => {
    //         var statData = statDoc.data()
    //         info['solveStats'] = statData.grades
    //       })
    //       info['solveSum'] = 0
    //     })
    //     var cnt = 0
    //     for (let i = 0; i < info.solveStats.length; i++) {
    //       if (Number(info.solveStats[i]) === 3 || Number(info.solveStats[i]) === 2) cnt++
    //     }
    //     info.solveSum = cnt
    //     sendData.push(info)
    //   }
    //   ctx.commit('updateLessonStatistic', sendData)
    // },
    async sendImageSolution (ctx, payload) {
      // const db = firebase.firestore()
      let file = payload.image
      let fileName = file.name
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      // Получение данных для имени файла
      const ext = fileName.slice(fileName.lastIndexOf('.'))
      let currentTime = new Date().getTime()
      let imageUrl
      let imageTimeName = 'uploads/' + currentTime + ext
      // Загрузка в бд
      await firebase.storage().ref(imageTimeName).put(file)
      await firebase.storage().ref(imageTimeName).getDownloadURL().then(function (url) { imageUrl = url })
      imageUrl = imageUrl.toString()
      ctx.commit('updateImageURL', imageUrl)
      // Запись ссылки в бд
      // var grades = []
      // await db.collection(accountDb).doc(this.getters.getUser.id).collection(userTasksDb).doc(payload.id).get().then(doc => { grades = doc.data().grades })
      // grades[payload.i] = imageUrl
      // await db.collection(accountDb).doc(this.getters.getUser.id).collection(userTasksDb).doc(payload.id).update({
      //   grades: grades
      // })
    }
  },
  mutations: {
    updateCurrentTopic (state, topic) {
      state.currentTopic = topic
    },
    updateTasksLoadingStatus (state, payload) {
      state.tasksLoading = payload
    },
    updateTasks (state, payload) {
      state.tasks = payload
    },
    updateCurrentLogo (state, payload) {
      state.logo = payload
    },
    updateCollection (state, payload) {
      state.collection = payload
    },
    // updateLessonStatistic (state, payload) {
    //   state.lessonStatistics = payload
    // },
    updateTasksInfo (state, payload) {
      state.tasksInfo = payload
    },
    updateImageURL (state, payload) {
      state.loadImageURL = payload
    }
  },
  state: {
    currentTopic: 'ОГЭ Вариант 1',
    tasks: [],
    // lessonStatistics: [],
    tasksInfo: {
      name: '',
      author: ''
    },
    tasksLoading: false,
    logo: 'MathPlace',
    collection: 'tasks',
    loadImageURL: ''
  },
  getters: {
    getCurrentTopic (state) {
      return state.currentTopic
    },
    getTasks (state) {
      return state.tasks
    },
    // getMyLessonstatistics (state) {
    //   return state.lessonStatistics
    // },
    getCurrentLogo (state) {
      return state.logo
    },
    getCollection (state) {
      return state.collection
    },
    getTasksInfo (state) {
      return state.tasksInfo
    },
    getLoadedImageURL (state) {
      return state.loadImageURL
    }
  }
}
