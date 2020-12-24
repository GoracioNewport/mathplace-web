export default {
  state: {
    loading: false,
    errors: null
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setErrors (state, payload) {
      state.errors = payload
    },
    clearErrors (state) {
      state.errors = null
    }
  },
  actions: {
    setLoading ({commit}, payload) {
      commit('setLoading', payload)
    },
    setErrors ({commit}, payload) {
      commit('setErrors', payload)
    },
    clearErrors ({commit}, payload) {
      commit('clearErrors')
    }
  },
  getters: {
    getLoading (state) {
      return state.loading
    },
    getErrors (state) {
      return state.errors
    }
  }
}
