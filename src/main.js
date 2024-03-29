// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App'
import router from './router'
import store from './store'
import VueCarousel from 'vue-carousel'

import firebase from 'firebase/app'

import Topic from './components/Topic'
import vueSmoothScroll from 'vue2-smooth-scroll'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material-design-icons/styles.css'
import 'vue-datetime/dist/vue-datetime.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/ru-RU'

// import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components'
// import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import Clipboard from 'v-clipboard'
// import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
// import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'

// Vue.use(MdButton)
// Vue.use(MdContent)
// Vue.use(MdTabs)

Vue.use(VueMaterial)
Vue.use(ElementUI, {locale})
// Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker)
Vue.use(VueCarousel)

Vue.use(Topic)
Vue.use(Vuelidate)
Vue.use(vueSmoothScroll)

Vue.use(Clipboard)

Vue.config.productionTip = false

const firebaseConfig = {
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
firebase.firestore().enablePersistence()
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)

// eslint-disable-next-line
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  beforeCreate () { this.$store.commit('initialiseStore') }
})
