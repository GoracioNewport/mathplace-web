import Vue from 'vue'
import Vuex from 'vuex'

import topics from './modules/topics'
import user from './modules/user'
import common from './modules/common'
import tasks from './modules/tasks'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    topics,
    user,
    tasks
  }
})
