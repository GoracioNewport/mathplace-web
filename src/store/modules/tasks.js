import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  actions: {
    async fetchTasks (ctx) {
      ctx.commit('updateTasksLoadingStatus', true)
      const db = firebase.firestore()
      var tasksDb = db.collection('task2').doc(this.getters.getCurrentTopic)
      var userData = db.collection('account').doc(this.getters.getUser.id)
      var itemCount = 0
      var taskCount = 0
      var tasksList = []
      let userTopicDetails = []

      await userData.get()
        .then(usr => {
          tasksDb.get()
            .then(doc => {
              userTopicDetails = usr.data()[this.getters.getCurrentTopic]
              itemCount = doc.data().items
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
              }

              for (let i = 0; i < itemCount; i++) {
                let subTask = doc.data()['task' + String(i)]
                let taskKind = ''
                subTask[1] === 'theory' ? taskKind = 'theory' : taskKind = 'task'
                if (taskKind === 'task') taskCount++
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

                var task = {
                  id: i,
                  taskId: taskCount,
                  text: formattedText,
                  type: taskKind,
                  answer: subTask[1],
                  difficulty: subTask[2],
                  solution: subTask[3],
                  tries: userTopicDetails[i]
                }
                console.log(subTask)
                tasksList.push(task)
              }
            })
        })
      ctx.commit('updateTasks', tasksList)
    },
    changeCurrentTopic (ctx, topic) {
      ctx.commit('updateCurrentTopic', topic)
    },
    changeCurrentLogo (ctx, logo) {
      ctx.commit('updateCurrentLogo', logo)
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
    }
  },
  state: {
    currentTopic: 'ОГЭ Вариант 1',
    tasks: [],
    tasksLoading: false,
    logo: 'MathPlace'
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
    }
  }
}
