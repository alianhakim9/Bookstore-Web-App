import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import store from '../store/index'

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
    },
    {
      path: '/category/:slug',
      name: 'category',
      component: () => import('../views/Category.vue')
    },
    {
      path: '/book/:slug',
      name: 'book',
      component: () => import('../views/Book.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/Checkout.vue'),
      meta: { auth: true }
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import('../views/Payment.vue'),
      meta: { auth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/Profile.vue'),
      meta: { auth: true }
    },
    {
      path: '/my-order',
      name: 'my-order',
      component: () => import('../views/MyOrder.vue'),
      meta: { auth: true }
    }
  ]
})


router.beforeEach((to, from, next) => {
  // Jika routing ada meta auth-nya maka
  if (to.matched.some(record => record.meta.auth)) {
    // Jika user adalah gues
    if (store.getters['auth/guest']) {
      // tampilkan pesan bahwa harus login dulu
      store.dispatch('alert/set', {
        status: true,
        text: 'Login first',
        color: 'error'
      });
      store.dispatch('setPrevUrl', to.path);
      // tampilkan form login
      store.dispatch('dialog/setComponent', 'Login')
    } else {
      next();
    }
  } else {
    next();
  }
})
export default router
