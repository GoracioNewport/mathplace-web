export default {
  state: {
    topics: [
      {
        'id': 1,
        'title': 'Ivan task',
        'completed': 100
      },
      {
        'id': 2,
        'title': 'Gordey task',
        'completed': 75
      },
      {
        'id': 3,
        'title': 'Pavel task',
        'completed': 25
      }
    ]
  },
  mutations: {
    newTopic (state, payload) {
      state.topics.push(payload)
    }
  },
  actions: {
    newTopic ({commit}, payload) {
      commit('newTopic', payload)
    }
  },
  getters: {
    topics (state) {
      return state.topics
    }
  }
}
