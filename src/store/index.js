import Vue from 'vue'
import Vuex from 'vuex'

import topic from './topic'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    topic
  }
})
