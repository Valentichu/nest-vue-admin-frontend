import type { Router, LocationQueryRaw } from 'vue-router'
import NProgress from 'nprogress' // progress bar

import usePermission from '@/hooks/permission'
import { useUserStore } from '@/stores'
import { isLogin } from '@/utils/auth'
import appRoutes from '../routes'

export default function setupPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    NProgress.start()
    const userStore = useUserStore()
    async function crossroads() {
      const Permission = usePermission()
      if (Permission.accessRoute(to) && !['/', '/login'].includes(to.path)) {
        next()
      } else {
        const destination = Permission.findFirstPermissionRoute(appRoutes) || {
          name: 'notFound',
        }
        next(destination)
      }
      NProgress.done()
    }
    if (isLogin()) {
      if (userStore.permissions) {
        crossroads()
      } else {
        try {
          await userStore.info()
          crossroads()
        } catch (error) {
          await userStore.logout()
          next({
            name: 'login',
            query: {
              redirect: to.name,
              ...to.query,
            } as LocationQueryRaw,
          })
          NProgress.done()
        }
      }
    } else {
      if (to.name === 'login') {
        next()
        NProgress.done()
        return
      }
      next({
        name: 'login',
        query:
          to.name !== 'root'
            ? ({
                redirect: to.name,
                ...to.query,
              } as LocationQueryRaw)
            : undefined,
      })
      NProgress.done()
    }
  })
}
