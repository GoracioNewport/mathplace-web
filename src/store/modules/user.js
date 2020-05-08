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
      console.log('User state changed\n', payload)
    },
    updateUser (state, [key, value]) {
      console.log(key, value)
      state.user[key] = value
    }
  },
  actions: {
    async registerUser ({commit}, {email, password}) {
      commit('clearErrors')
      commit('setLoading', true)
      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
        commit('setUser', new User(user.user.uid, 'ОГЭ Вариант 1', 100, 0, 0, []))
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
        let lastTheme, money, submit, right, like

        await db.collection('account').doc(user.user.uid).get().then(doc => {
          lastTheme = doc.data().lastTheme
          money = doc.data().money
          submit = doc.data().submit
          right = doc.data().right
          like = doc.data().like
        })
        commit('setUser', new User(user.user.uid, lastTheme, money, right, submit, like))
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
      console.log('Log out initiated')
      firebase.auth().signOut()
      commit('setUser', null)
    },
    updateUser ({commit}, [key, value]) {
      const db = firebase.firestore()
      console.log('User update!\n', key, value)
      console.log(this.getters.getUser)
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
