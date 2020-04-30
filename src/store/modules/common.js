export default {
  state: {
    loading: false,
    errors: null
  },
  mutations: {
    updateLoading (state, payload) {
      state.loading = payload
    },
    updateErrors (state, payload) {
      state.errors = payload
    },
    clearErrors (state) {
      state.errors = null
    }
  },
  actions: {
    setLoading ({commit}, payload) {
      commit('updateLoading', payload)
    },
    setErrors ({commit}, payload) {
      commit('updateErrors', payload)
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
