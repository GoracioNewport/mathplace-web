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
              itemCount = docData.tasks.length
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

              // Парсинг задач
              for (let i = 0; i < itemCount; i++) {
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
    async sendImageSolution (ctx, payload) {
      const db = firebase.firestore()
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
      // Запись ссылки в бд
      var grades = []
      await db.collection(accountDb).doc(this.getters.getUser.id).collection(userTasksDb).doc(payload.id).get().then(doc => { grades = doc.data().grades })
      grades[payload.i] = imageUrl
      await db.collection(accountDb).doc(this.getters.getUser.id).collection(userTasksDb).doc(payload.id).update({
        grades: grades
      })
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
    updateTasksInfo (state, payload) {
      state.tasksInfo = payload
    }
  },
  state: {
    currentTopic: 'ОГЭ Вариант 1',
    tasks: [],
    tasksInfo: {
      name: '',
      author: ''
    },
    tasksLoading: false,
    logo: 'MathPlace',
    collection: 'tasks'
  },
  getters: {
    getCurrentTopic (state) {
      return state.currentTopic
    },
    getTasks (state) {
      return state.tasks
    },
    getCurrentLogo (state) {
      return state.logo
    },
    getCollection (state) {
      return state.collection
    },
    getTasksInfo (state) {
      return state.tasksInfo
    }
  }
}
