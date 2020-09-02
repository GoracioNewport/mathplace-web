import Vue from 'vue'
import Vuex from 'vuex'

import topics from './modules/topics'
import user from './modules/user'
import common from './modules/common'
import tasks from './modules/tasks'
import profile from './modules/profile'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    agreedToPrivacy: true
  },
  mutations: {
    agreePrivacyPolicy (state) {
      localStorage.setItem('agreedToPrivacy', true)
      state.agreedToPrivacy = true
    },
    initialiseStore (state) {
      console.log('Store Initiated')
      if (localStorage.getItem('agreedToPrivacy')) {
        state.agreedToPrivacy = true
      }

      if (localStorage.getItem('user')) {
        console.log(state)
        state.user.user = JSON.parse(localStorage.getItem('user'))
      }
    }
  },
  modules: {
    common,
    topics,
    user,
    tasks,
    profile
  },
  plugins: [createPersistedState({
    storage: sessionStorage
  })]
})
