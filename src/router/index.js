import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Hall from '@/components/Hall'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {
        requireAuth: false
      },
      component: Home,
      props: true
    },
    {
      path: '/Hall',
      name: 'Hall',
      meta: {
        requireAuth: true
      },
      component: Hall,
      props: true
    }
  ]
})
