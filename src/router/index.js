import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '*',
      redirect: {
        name: 'home'
      }
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/Categories.vue')
    },
    {
      path: '/books',
      name: 'books',
      component: () => import('../views/Books.vue')
    }
  ]
})

export default router
