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
    },
    updateUser (state, [key, value]) {
      state.user[key] = value
    }
  },
  actions: {
    async registerUser ({commit}, {email, password, name}) {
      commit('clearErrors')
      commit('setLoading', true)
      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
        commit('setUser', new User(name, user.user.uid, 'ОГЭ Вариант 1', 100, 0, 0, []))
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
      const db = firebase.firestore()
      try {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password)
        let lastTheme, money, submit, right, like, name

        await db.collection('account').doc(user.user.uid).get().then(doc => {
          name = doc.data().name
          lastTheme = doc.data().lastTheme
          money = doc.data().money
          submit = doc.data().submit
          right = doc.data().right
          like = doc.data().like
        })
        commit('setUser', new User(name, user.user.uid, lastTheme, money, right, submit, like))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setErrors', error.message)
        throw error
      }
    },
    loggedUser ({commit}, payload) {
      commit('setUser', new User(payload.uid))
    },
    logoutUser ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    updateUser ({commit}, [key, value]) {
      const db = firebase.firestore()
      commit('updateUser', [key, value])
      db.collection('account').doc(this.getters.getUser.id).update({ [key]: value })
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
