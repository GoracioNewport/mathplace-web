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
            var formattedText = []

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
              solution: subTask[3]
            }
            tasksList.push(task)
          }
        })

      ctx.commit('updateTasks', tasksList)
    },
    changeCurrentTopic (ctx, topic) {
      ctx.commit('updateCurrentTopic', topic)
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
