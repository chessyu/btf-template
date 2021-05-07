import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/login.vue')
  },
  {
    path: '/layout',
    name: 'layout',
    redirect:'/home',
    component: () => import(/* webpackChunkName: "layout" */ '../views/layout/layout.vue'),
    children:[
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/home/home.vue')
      },
      {
        path: '/care',
        name: 'care',
        component: () => import(/* webpackChunkName: "care" */ '../views/care/care.vue')
      },
      {
        path: '/private',
        name: 'private',
        component: () => import(/* webpackChunkName: "private" */ '../views/private/private.vue')
      },
    ]
  },
  {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "test" */ '../views/test.vue')
  },
  {
    path: '/template',
    name: 'template',
    component: () => import(/* webpackChunkName: "template" */ '../views/template.vue')
  },
  
]

const router = new VueRouter({
  routes,
  mode:'history',
  base:'/btf-template/'
})

export default router
