import { createRouter, createWebHistory, RouterView } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      components: {
        default: RouterView,
        header: () => import('@/components/app/AppHeader.vue'),
      },
      children: [
        { path: '', component: () => import('@/views/index.vue') },
        { path: 'watchlist', component: () => import('@/views/watchlist.vue') },
        {
          path: 'details',
          children: [
            {
              path: ':type(movie|tv)/:id',
              name: 'media-details',
              component: () => import('@/views/details/media.vue'),
            },
            {
              path: 'person/:id',
              name: 'person-details',
              component: () => import('@/views/details/person.vue'),
            },
          ],
        },
      ],
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: () => import('@/views/error.vue'),
    },
  ],
})

export default router
