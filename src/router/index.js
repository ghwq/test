import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/home/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: './home',
      name: 'Home',
      component: Home
    }
  ]
})
