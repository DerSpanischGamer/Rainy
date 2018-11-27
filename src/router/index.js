import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Registre from '@/components/Registre'
import User from '@/components/User'
import Confirmer from '@/components/Nuls/Confirmer'
import Oublie from '@/components/Nuls/Oublie'
import Fini from '@/components/Nuls/Fini'
import Error from '@/components/Nuls/404'
import Vide from '@/components/Vide'
import Communaute from '@/components/Communaute'

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
      path: '/user&:id',
      name: 'User',
      component: User
    },
    {
      path: '/communaute&:id',
      name: 'Communaute',
      component: Communaute
    },
    {
      path: '/confirmation',
      name: 'Confirmer',
      component: Confirmer
    },
    {
      path: '/oublie',
      name: 'Oublie',
      component: Oublie
    },
    {
      path: '/fini',
      name: 'Fini',
      component: Fini
    },
    {
      path: '/test',
      name: 'Vide',
      component: Vide
    },
    {
      path: '*',
      name: '404',
      component: Error
    }
  ]
})
