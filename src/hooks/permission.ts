import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores'
import _ from 'lodash'

import { superAdmin } from '@/config/const'

export default function usePermission() {
  const userStore = useUserStore()
  return {
    accessRoute(route: RouteLocationNormalized | RouteRecordRaw) {
      return (
        !route.meta?.requiresAuth ||
        !route.meta?.permissions ||
        userStore.roleName === superAdmin ||
        route.meta?.permissions?.includes('*') ||
        route.meta?.permissions?.includes(userStore.roleName as string)
      )
    },
    findFirstPermissionRoute(_routers: any): any {
      const cloneRouters = [..._routers]
      while (cloneRouters.length) {
        const firstElement = cloneRouters.shift()
        if (this.accessRoute(firstElement)) {
          if (!firstElement?.children) {
            return { name: firstElement.name }
          }
          if (this.findFirstPermissionRoute(firstElement.children)) {
            return this.findFirstPermissionRoute(firstElement.children)
          }
        }
      }
      return null
    },
  }
}
