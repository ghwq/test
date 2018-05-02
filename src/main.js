// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Home from './home/home'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/js/XMrem.js'
import 'animate.css/animate.min.css'
import { Swipe, SwipeItem } from 'vue-swipe'
import 'vue-swipe/dist/vue-swipe.css'
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$http = axios;
Vue.component('swipe', Swipe)
Vue.component('swipe-item', SwipeItem)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { 
  	Home
  },
  template: '<home/>'
})
