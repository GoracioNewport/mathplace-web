import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  actions: {
    async fetchTasks (ctx) {
      ctx.commit('updateTasksLoadingStatus', true)
      const db = firebase.firestore()
      var tasksDb = db.collection('task2').doc(this.getters.getCurrentTopic)
      var tasksCount = 0
      var tasksList = []

      await tasksDb.get()
        .then(doc => {
          tasksCount = doc.data().items
          for (let i = 0; i < tasksCount; i++) {
            tasksList.push(doc.data()['task' + String(i)])
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
