import Vue from 'vue'
import Router from 'vue-router'
import VueFirestore from 'vue-firestore'
import Uimini from 'uimini/dist/css/uimini.css'
import Store from '../store'

import Home from '@/components/Home'
import Main from '@/components/Main'
import Lesson from '@/components/Lesson'
import Registration from '@/components/Auth/Registration'
import Login from '@/components/Auth/Login'
import Logout from '@/components/Auth/Logout'
import Profile from '@/components/Profile/Profile'
import CustomTitle from '@/components/CustomTitle'
import Statistics from '@/components/Profile/Statistics'
import ChatList from '@/components/Profile/ChatList'
import Chat from '@/components/Profile/Chat'

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
      path: '/lesson/:collectionId=:taskId',
      name: 'lesson',
      component: Lesson,
      beforeEnter (to, from, next) {
        Store.getters.checkUser ? next() : next('/login')
      }
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
        Store.dispatch('logoutUser')
        window.localStorage.clear()
        next('/login')
      }
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter (to, from, next) {
        Store.getters.checkUser ? next() : next('/login')
      }
    },
    {
      path: '/customTitle/:topicId?',
      name: 'customTitle',
      component: CustomTitle,
      beforeEnter (to, from, next) {
        Store.getters.checkUser ? next() : next('/login')
      }
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: Statistics,
      beforeEnter (to, from, next) {
        Store.getters.checkUser ? next() : next('/login')
      }
    },
    {
      path: '/chat',
      name: 'chatList',
      component: ChatList,
      beforeEnter (to, from, next) {
        Store.getters.checkUser ? next() : next('/login')
      }
    },
    {
      path: '/pm/:chatId',
      name: 'chat',
      component: Chat,
      beforeEnter (to, from, next) {
        Store.getters.checkUser ? next() : next('/login')
      }
    }
  ]
})
