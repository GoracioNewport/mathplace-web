import Vue from 'vue'
import Router from 'vue-router'
import VueFirestore from 'vue-firestore'
import Uimini from 'uimini/dist/css/uimini.css'
import Home from '@/components/Home'
import Registration from '@/components/Auth/Registration'
import Login from '@/components/Auth/Login'
import Main from '@/components/Main'
import Task from '@/components/Task'

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
      path: '/registration',
      name: 'registration',
      component: Registration
    }
  ]
})
