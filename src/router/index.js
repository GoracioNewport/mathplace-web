import Vue from 'vue'
import Router from 'vue-router'
import VueFirestore from 'vue-firestore'
import Uimini from 'uimini/dist/css/uimini.css'
import Store from '../store'

import Home from '@/components/Home'
import Main from '@/components/Main'
import Task from '@/components/Task'
import Registration from '@/components/Auth/Registration'
import Login from '@/components/Auth/Login'
import Logout from '@/components/Auth/Logout'

import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(Router)
Vue.use(VueFirestore)
Vue.use(Uimini)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/main',
      name: 'main',
      component: Main
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/task',
      name: 'task',
      component: Task
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
      beforeEnter (to, from, next) {
        firebase.auth().signOut().then(function () {
          console.log('Logged out succesfuly')
          Store.state.user.user = null
          next('/login')
        }).catch(function (error) {
          console.log('Logout error: ', error)
          Store.state.user.user = null
          next('/login')
        })
      }
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration
    }
  ]
})
