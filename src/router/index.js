import Vue from 'vue'
import Router from 'vue-router'

import home from '../pages/home.vue'

import myRoll from '../pages/myRoll/myRoll.vue'

// ------------------------------------------------------------------ //



// ------------------------------------------------------------------ //

import changeTheme from '../pages/setting/changeTheme.vue'
import voiceControl from '../pages/setting/voiceControl.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home' //重定向
    },
    // 首页
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
    },
    // 更多
    // {
    //   path: '/myRoll',
    //   name: 'addEvent',
    //   component: myRoll      
    // },
    
    // 设置
    {
      path:'/changeTheme',
      name: 'changeTheme',
      component: changeTheme
    },{
      path:'/voiceControl',
      name: 'voiceControl',
      component: voiceControl
    }
  ]
}) 