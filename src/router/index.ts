import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/index.vue'
import ErrorView from '../views/error.vue'
import WatchlistView from '../views/watchlist.vue'
import AppHeader from '@/components/app/AppHeader.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      components: {
        default: IndexView,
        header: AppHeader,
      },
    },
    {
      path: '/watchlist',
      name: 'watchlist',
      components: {
        default: WatchlistView,
        header: AppHeader,
      },
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: ErrorView,
    },
  ],
})

export default router
