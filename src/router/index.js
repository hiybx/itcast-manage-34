// 引入vue
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 引入登录组件
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import Welcome from '@/views/welcome.vue'
import Users from '@/views/users/user.vue'
// 使用
Vue.use(VueRouter)
// 创建路由对象
const router = new VueRouter({
  routes: [{
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'default',
    path: '/',
    redirect: { name: 'login' }
  },
  {
    name: 'home',
    path: '/home',
    component: Home,
    redirect: { name: 'welcome' },
    children: [{
      name: 'welcome',
      path: 'welcome',
      component: Welcome
    },
    {
      name: 'users',
      path: 'users',
      component: Users
    }
    ]
  }

  ]
})
// 暴露
export default router
