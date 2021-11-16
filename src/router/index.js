import Vue from 'vue'
import Router from 'vue-router'

import home from '../pages/home.vue'

import myRoll from '../pages/myRoll/myRoll.vue'

// ------------------------------------------------------------------ //



// ------------------------------------------------------------------ //


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home' //重定向
    },
    // 首页登录
    {
      path: '/home',
      name: 'home',
      component: home
    },
    // 我的转盘
    {
      path: '/myRoll',
      name: 'myRoll',
      component: myRoll
    }
  ]
}) 