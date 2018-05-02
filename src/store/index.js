import Vue from 'vue'
import vuex from 'vuex'


Vue.use(vuex);

import home from './home_store';//引入某个store对象
import sub from './sub_store';//引入某个store对象


export default new vuex.Store({
    modules: {
        home,
        sub
    }
})