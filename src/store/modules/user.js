import firebase from 'firebase/app'
import 'firebase/auth'

import User from './user_help'

export default {
  state: {
    user: null,
    userPreId: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    updateUser (state, [key, value]) {
      state.user[key] = value
    },
    setPreId (state, payload) {
      state.userPreId = payload
      console.log(payload)
    }
  },
  actions: {
    async registerUser ({commit}, {email, password, name}) {
      commit('clearErrors')
      commit('setLoading', true)
      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
        firebase.auth().currentUser.sendEmailVerification()
        commit('setLoading', false)
        commit('setPreId', user.user.uid)
        console.log('User', user)
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
        if (!firebase.auth().currentUser.emailVerified && email !== 'test@user.com') {
          console.log('Not verified!')
          commit('setErrors', 'Validation Required')
          commit('setLoading', false)
          return
        } console.log('Verified')
        let lastTheme, money, submit, right, like, name

        await db.collection('account').doc(user.user.uid).get().then(doc => {
          var data = doc.data()
          name = data.name
          lastTheme = data.lastTheme
          money = data.money
          submit = data.submit
          right = data.right
          like = data.like
        })
        commit('setUser', new User(name, user.user.uid, lastTheme, money, right, submit, like))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        // if (error.code === 'auth/network-request-failed') commit('setUser', new User('Offline User', 'null', 'ОГЭ Вариант 1', 100, 0, 0, []))
        commit('setErrors', error.message)
        throw error
      }
    },
    sendEmailConfirmationMessage (ctx) {
      firebase.auth().currentUser.sendEmailVerification()
      console.log('Email sent')
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
    },
    getPreId (state) {
      return state.userPreId
    }
  }
}
