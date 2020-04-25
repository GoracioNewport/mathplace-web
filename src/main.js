// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/messaging'

Vue.config.productionTip = false

// db.collection('task2').get().then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//     topics.push(`${doc.id}`)
//   })
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  // eslint-disable-next-line
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
  }
})
