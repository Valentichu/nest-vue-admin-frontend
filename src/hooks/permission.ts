import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores'
import _ from 'lodash'

export default function usePermission() {
  const userStore = useUserStore()
  return {
    accessRoute(route: RouteLocationNormalized | RouteRecordRaw) {
      return (
        !route.meta?.requiresAuth ||
        !route.meta?.permissions ||
        route.meta?.permissions?.includes('*') ||
        _.intersection(route.meta?.permissions, userStore.permissions).length > 0
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
