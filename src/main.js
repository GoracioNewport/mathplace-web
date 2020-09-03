// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App'
import router from './router'
import store from './store'

import firebase from 'firebase/app'

import Topic from './components/Topic'
import vueSmoothScroll from 'vue2-smooth-scroll'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material-design-icons/styles.css'

// import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components'
// import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import pdf from 'vue-pdf'
import { VueEditor } from 'vue2-editor'

// Vue.use(MdButton)
// Vue.use(MdContent)
// Vue.use(MdTabs)

Vue.use(VueMaterial)

Vue.use(Topic)
Vue.use(Vuelidate)
Vue.use(vueSmoothScroll)
Vue.use(VueEditor)
Vue.use(pdf)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App, Topic },
  template: '<App/>',
  created () {
    var firebaseConfig = {
      apiKey: 'AIzaSyAwxefCuoxvrMYCWbgQcJVUgTvL6CPEErA',
      authDomain: 'mathplace-842f7.firebaseapp.com',
      databaseURL: 'https://mathplace-842f7.firebaseio.com',
      projectId: 'mathplace-842f7',
      storageBucket: 'gs://mathplace-842f7.appspot.com',
      messagingSenderId: '832330186047',
      appId: '1:832330186047:web:d9cbd636e61d42a459678a',
      measurementId: 'G-7P4W9J6CKS'
    }

    firebase.initializeApp(firebaseConfig)
  }
})
