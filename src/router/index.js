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
    redirect:'/layout/home',
    component: () => import(/* webpackChunkName: "layout" */ '../views/layout/layout.vue'),
    children:[
      {
        path: '/layout/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/home/home.vue')
      },
      {
        path: '/layout/care',
        name: 'care',
        component: () => import(/* webpackChunkName: "care" */ '../views/care/care.vue')
      },
      {
        path: '/layout/private',
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
  routes
})

export default router
