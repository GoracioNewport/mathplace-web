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
// import Draft from '@/components/Draft'
import Profile from '@/components/Profile/Profile'
import CustomTitle from '@/components/CustomTitle'
import Statistics from '@/components/Profile/Statistics'
import ChatList from '@/components/Profile/ChatList'
import Chat from '@/components/Profile/Chat'
import TeacherLanding from '@/components/TeacherLanding'

Vue.use(Router)
Vue.use(VueFirestore)
Vue.use(Uimini)

export default new Router({
  mode: 'history',
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/main',
      name: 'home',
      component: Home
    },
    {
      path: '/lesson/:collectionId=:taskId',
      name: 'lesson',
      component: Lesson,
      beforeEnter (to, from, next) {
        Store.getters.checkUser ? next() : next({ name: 'login', query: { redirect: to.fullPath } })
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // {
    //   path: '/draft',
    //   name: 'draft',
    //   component: Draft
    // },
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
      beforeEnter (to, from, next) {
        Store.dispatch('logoutUser')
        // Очищаем все данные сайта
        window.localStorage.clear()
        // next('/login')
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
        Store.getters.checkUser ? next() : next({ name: 'login', query: { redirect: to.fullPath } })
      }
    },
    {
      path: '/customTitle/:topicId?',
      name: 'customTitle',
      component: CustomTitle,
      beforeEnter (to, from, next) {
        Store.getters.checkUser ? next() : next({ name: 'login', query: { redirect: to.fullPath } })
      }
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: Statistics,
      beforeEnter (to, from, next) {
        Store.getters.checkUser ? next() : next({ name: 'login', query: { redirect: to.fullPath } })
      }
    },
    {
      path: '/chat',
      name: 'chatList',
      component: ChatList,
      beforeEnter (to, from, next) {
        Store.getters.checkUser ? next() : next({ name: 'login', query: { redirect: to.fullPath } })
      }
    },
    {
      path: '/pm/:chatId',
      name: 'chat',
      component: Chat,
      beforeEnter (to, from, next) {
        Store.getters.checkUser ? next() : next({ name: 'login', query: { redirect: to.fullPath } })
      }
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: TeacherLanding
    }
  ]
})
