import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Registre from '@/components/Registre'
import User from '@/components/User'
import Confirmer from '@/components/Confirmer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/registre',
      name: 'Registre',
      component: Registre
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/confirmation',
      name: 'Confirmer',
      component: Confirmer
    }
  ]
})
