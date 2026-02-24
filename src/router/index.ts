import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/index.vue'
import ErrorView from '../views/error.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IndexView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: ErrorView,
    },
  ],
})

export default router
