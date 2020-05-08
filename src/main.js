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

Vue.use(Topic)
Vue.use(Vuelidate)
Vue.use(vueSmoothScroll)

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
      storageBucket: 'mathplace-842f7.appspot.com',
      messagingSenderId: '832330186047',
      appId: '1:832330186047:web:d9cbd636e61d42a459678a',
      measurementId: 'G-7P4W9J6CKS'
    }

    firebase.initializeApp(firebaseConfig)

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('loggedUser', user)
      }
    })
  }
})
