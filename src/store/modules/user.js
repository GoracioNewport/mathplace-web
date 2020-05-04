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
      commit('setLoading', true)
      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
        commit('setUser', new User(user.user.uid))

        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setErrors', error.message)
        throw error
      }
    },
    async loginUser ({commit}, {email, password}) {
      commit('clearErrors')
      commit('setLoading', true)
      try {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password)
        commit('setUser', new User(user.user.uid))

        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setErrors', error.message)
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
