import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 前台页面开发
  {
    path: '/',
    component: () => import('../views/frontend/home/Index')
  },
  // 后台页面开发
  {
    path: '/admin',
    name: 'login',
    component: () => import('../views/backend/login/Login')
  },
  {
    path: '/admin/index',
    redirect: '/admin/welcome',
    component: () => import('../views/backend/home/Index'),
    children: [
      { path: '/admin/welcome', component: () => import('../views/backend/home/Welcome') },
      { path: '/admin/goods', component: () => import('../views/backend/goods/Goods') },
      { path: '/admin/goods/bin', component: () => import('../views/backend/goods/GoodsBin') }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
