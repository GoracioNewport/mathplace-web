import firebase from 'firebase/app'
import 'firebase/auth'

import User from './user_help'

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    async registerUser ({commit}, {email, password}) {
      commit('clearErrors')
      commit('updateLoading', true)
      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
        commit('updateLoading', false)
        commit('setUser', new User(user.user.uid))
      } catch (error) {
        commit('updateLoading', false)
        commit('updateErrors', error.message)
        throw error
      }
    }
  },
  getters: {
    getUser (state) {
      return state.user
    },
    checkUser (state) {
      return state.user !== null
    }
  }
}
