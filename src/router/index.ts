import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'

import DefaultLayout from '@/layout/default-layout.vue'
import appRoutes from './routes'
import createRouteGuard from './guard'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/',
      name: 'root',
      component: DefaultLayout,
      children: appRoutes,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/not-found/index.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

createRouteGuard(router)

export default router
