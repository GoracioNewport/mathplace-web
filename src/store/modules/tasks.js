import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  actions: {
    async fetchTasks (ctx, taskCollection) {
      console.log('Fetching tasks from collection', taskCollection, 'and task', this.getters.getCurrentTopic)
      ctx.commit('updateTasksLoadingStatus', true)
      const db = firebase.firestore()
      var tasksDb = db.collection(taskCollection).doc(this.getters.getCurrentTopic)
      var userData = db.collection('account').doc(this.getters.getUser.id)
      var itemCount = 0
      var taskCount = 0
      var tasksInfo = {}
      var tasksList = []
      let userTopicDetails = []

      await userData.get()
        .then(usr => {
          var usrData = usr.data()
          tasksDb.get()
            .then(doc => {
              var docData = doc.data()
              // Обновление значений юзера в бд

              userTopicDetails = usrData[this.getters.getCurrentTopic]
              itemCount = docData.items
              if (userTopicDetails === undefined) {
                let blankArray = []
                for (let i = 0; i < itemCount; i++) blankArray.push(1)
                let topicStatus = this.getters.getCurrentTopic
                let solveStatus = this.getters.getCurrentTopic + 'Solution'
                db.collection('account').doc(this.getters.getUser.id).update({
                  [topicStatus]: blankArray,
                  [solveStatus]: blankArray
                })
                userTopicDetails = blankArray
              } else if (userTopicDetails.length < itemCount) {
                let blankArray = []
                for (let i = 0; i < itemCount; i++) blankArray.push(1)
                for (let i = userTopicDetails.length; i < itemCount; i++) userTopicDetails.push(1)
                let topicStatus = this.getters.getCurrentTopic
                let solveStatus = this.getters.getCurrentTopic + 'Solution'
                db.collection('account').doc(this.getters.getUser.id).update({
                  [topicStatus]: userTopicDetails,
                  [solveStatus]: blankArray
                })
              }

              // Парсинг задачи
              // 1 - Текст, 2 - Ответ, 3 - Сложность, 4 - Решение

              for (let i = 0; i < itemCount; i++) {
                let subTask = docData['task' + String(i)]
                let taskKind = '' // Теория, обычная, на доказательство, с загрузкой, множественный выбор, несколько ответов
                if (subTask[1] === 'theory') taskKind = 'theory'
                else if (subTask[1] === 'null') taskKind = 'proof'
                else if (subTask[1] === 'image') taskKind = 'upload'
                else if (subTask.length === 5) taskKind = 'multipleChoice'
                else if (subTask[1].indexOf('|') !== -1) taskKind = 'multipleAnswer'
                else taskKind = 'task'

                if (taskKind !== 'theory') taskCount++

                // Парсинг текста и картинок

                let comma = '\\'.concat('n')
                var splittedText = subTask[0].split(comma)
                var formattedText = []
                splittedText[splittedText.length - 1] += ' '
                for (let j = 0; j < splittedText.length; j++) {
                  let partition = []
                  let pointer = 0
                  let inImg = false
                  for (let k = 0; k < splittedText[j].length; k++) {
                    if ((splittedText[j].slice(k, k + 5) === '[http' && !inImg) || (splittedText[j][k - 1] === ']' && inImg)) {
                      let type = ''
                      inImg ? type = 'img' : type = 'text'
                      let partedText = splittedText[j].slice(pointer, k)
                      if (inImg) partedText = partedText.slice(1, partedText.length - 1)
                      partition.push({
                        type: type,
                        content: partedText
                      })
                      pointer = k
                      inImg = !inImg
                    }
                  }
                  partition.push({
                    type: 'text',
                    content: splittedText[j].slice(pointer, splittedText[j].length)
                  })
                  formattedText = formattedText.concat(partition)
                }

                // Пуш задачи в общий массив
                var options
                var answer = subTask[1]
                if (taskKind === 'multipleChoice') {
                  answer = subTask[1].split('|')
                  options = subTask[4].split('|')
                  answer.pop()
                  options.pop()
                  answer.sort()
                  options.sort()
                } else if (taskKind === 'multipleAnswer') {
                  answer = subTask[1].split('|')
                  answer.pop()
                  answer.sort()
                } var task = {
                  id: i,
                  taskId: taskCount,
                  text: formattedText,
                  type: taskKind,
                  answer: answer,
                  difficulty: subTask[2],
                  solution: subTask[3],
                  tries: userTopicDetails[i],
                  options: options
                }
                tasksList.push(task)
              }
              docData.name === undefined ? tasksInfo.name = this.getters.getCurrentTopic : tasksInfo.name = docData.name
            })
        })
      ctx.commit('updateTasks', tasksList)
      ctx.commit('updateTasksInfo', tasksInfo)
    },
    changeCurrentTopic (ctx, topic) {
      ctx.commit('updateCurrentTopic', topic)
    },
    changeCurrentLogo (ctx, logo) {
      ctx.commit('updateCurrentLogo', logo)
    },
    changeCollection (ctx, name) {
      ctx.commit('updateCollection', name)
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
    tasksInfo: {},
    tasksLoading: false,
    logo: 'MathPlace',
    collection: 'task2'
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
