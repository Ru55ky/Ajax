import Vue from 'vue'
import Router from 'vue-router'
import Home from '../Home'
import newRealtor from '../realtor/newRealtor'
import listRealtors from '../realtor/listRealtors'
import realtor from '@/realtor/realtor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/realtor/newRealtor',
      name: 'newRealtor',
      component: newRealtor
    },
    {
      path: '/realtor/listRealtors',
      name: 'listRealtors',
      component: listRealtors
    },
    {
      path: '/realtor/:id',
      name: 'realtor',
      component: realtor,
      props: true
    }
  ],
  mode: 'history'
})
