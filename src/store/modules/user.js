import firebase from 'firebase/app'
import 'firebase/auth'

// eslint-disable-next-line
import { accountDb, tasksDb, olympiadDb, userTasksDb } from './global'

import User from './user_help'
import router from '@/router'

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
    },
    saveUser (state) {
      localStorage.setItem('user', JSON.stringify(state.user))
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
      } catch (error) {
        commit('setLoading', false)
        commit('setErrors', error.message)
        throw error
      }
    },
    async loginUser ({commit}, {email, password, remember}) {
      commit('clearErrors')
      commit('setLoading', true)
      const db = firebase.firestore()
      firebase.auth().setPersistence(remember ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION)
      try {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password)
        if (!firebase.auth().currentUser.emailVerified && email !== 'test@user.com') {
          commit('setErrors', 'Validation Required')
          commit('setLoading', false)
          return
        }
        let lastTheme, money, submit, right, like, name, image

        await db.collection(accountDb).doc(user.user.uid).get().then(doc => {
          var data = doc.data()
          name = data.name
          lastTheme = data.lastTheme
          money = data.money
          submit = data.submit
          right = data.right
          like = data.like
          image = data.image
        })
        var usr = new User(name, user.user.uid, lastTheme, money, right, submit, like, image)
        commit('setUser', usr)
        if (remember) localStorage.setItem('user', JSON.stringify(usr))
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
    },
    loggedUser ({commit}, payload) {
      commit('setUser', new User(payload.uid))
    },
    logoutUser ({commit}) {
      firebase.auth().signOut()
      router.go()
      commit('setUser', null)
    },
    updateUser ({commit}, [key, value]) {
      const db = firebase.firestore()
      commit('updateUser', [key, value])
      db.collection(accountDb).doc(this.getters.getUser.id).update({ [key]: value })
    },
    updateUserTopicStatus (ctx, payload) {
      const db = firebase.firestore()
      ctx.commit('updateUser', [payload.key, payload.value])
      db.collection(accountDb).doc(this.getters.getUser.id).collection(userTasksDb).doc(payload.key).update({
        [payload.field]: payload.value
      })
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
