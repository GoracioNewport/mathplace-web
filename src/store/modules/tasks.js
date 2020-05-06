import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  actions: {
    async fetchTasks (ctx) {
      ctx.commit('updateTasksLoadingStatus', true)
      const db = firebase.firestore()
      var tasksDb = db.collection('task2').doc(this.getters.getCurrentTopic)
      var itemCount = 0
      var taskCount = 0
      var tasksList = []

      await tasksDb.get()
        .then(doc => {
          itemCount = doc.data().items
          for (let i = 0; i < itemCount; i++) {
            let subTask = doc.data()['task' + String(i)]
            let taskKind = ''
            subTask[1] === 'theory' ? taskKind = 'theory' : taskKind = 'task'
            if (taskKind === 'task') taskCount++
            let comma = '\\'.concat('n')
            var splittedText = subTask[0].split(comma)

            var task = {
              id: i,
              taskId: taskCount,
              text: splittedText,
              type: taskKind,
              answer: subTask[1],
              difficulty: subTask[2],
              solution: subTask[3]
            }
            tasksList.push(task)
          }
        })

      ctx.commit('updateTasks', tasksList)
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
    }
  },
  state: {
    currentTopic: 'ОГЭ Вариант 1',
    tasks: [],
    tasksLoading: false
  },
  getters: {
    getCurrentTopic (state) {
      return state.currentTopic
    },
    getTasks (state) {
      return state.tasks
    }
  }
}
