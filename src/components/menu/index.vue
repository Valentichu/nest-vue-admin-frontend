<script lang="tsx">
import { defineComponent, ref, h, compile, computed } from 'vue'
import { useRouter, RouteRecordRaw, RouteRecordNormalized } from 'vue-router'
import usePermission from '@/hooks/permission'
import { listenerRouteChange } from '@/utils/route-listener'

export default defineComponent({
  emit: ['collapse'],
  setup() {
    const permission = usePermission()
    const router = useRouter()
    const appRoute = computed(() => {
      return router
        .getRoutes()
        .find((el) => el.name === 'root') as RouteRecordNormalized
    })
    const menuTree = computed(() => {
      const copyRouter = JSON.parse(JSON.stringify(appRoute.value.children))
      copyRouter.sort((a: RouteRecordNormalized, b: RouteRecordNormalized) => {
        return (a.meta.order || 0) - (b.meta.order || 0)
      })
      function travel(_routes: RouteRecordRaw[], layer: number) {
        if (!_routes) return null
        const collector: any = _routes.map((element) => {
          // no access
          if (!permission.accessRoute(element)) {
            return null
          }

          // leaf node
          if (!element.children) {
            return element
          }

          // route filter hideInMenu true
          element.children = element.children.filter(
            (x) => x.meta?.hideInMenu !== true
          )

          // Associated child node
          const subItem = travel(element.children, layer)
          if (subItem.length) {
            element.children = subItem
            return element
          }
          // the else logic
          if (layer > 1) {
            element.children = subItem
            return element
          }

          if (element.meta?.hideInMenu === false) {
            return element
          }

          return null
        })
        return collector.filter(Boolean)
      }
      return travel(copyRouter, 0)
    })

    // In this case only two levels of menus are available
    // You can expand as needed

    const selectedKey = ref<string[]>([])
    const goto = (item: RouteRecordRaw) => {
      router.push({
        name: item.name,
      })
    }
    listenerRouteChange((newRoute) => {
      if (newRoute.meta.requiresAuth && !newRoute.meta.hideInMenu) {
        const key = newRoute.matched[newRoute.matched.length - 1]
          ?.name as string
        selectedKey.value = [key]
      }
    }, true)
    const renderSubMenu = () => {
      function travel(_route: RouteRecordRaw[], nodes = []) {
        if (_route) {
          _route.forEach((element) => {
            // This is demo, modify nodes as needed
            const icon = element?.meta?.icon
              ? () => h(compile(`<${element?.meta?.icon}/>`))
              : null
            const r = element?.children ? (
              <a-sub-menu
                key={element?.name}
                v-slots={{
                  icon,
                  title: () => h(compile(element?.meta?.title || '')),
                }}
              >
                {travel(element?.children)}
              </a-sub-menu>
            ) : (
              <a-menu-item
                key={element?.name}
                v-slots={{ icon }}
                onClick={() => goto(element)}
              >
                {element?.meta?.title || ''}
              </a-menu-item>
            )
            nodes.push(r as never)
          })
        }
        return nodes
      }
      return travel(menuTree.value)
    }

    return () => (
      <a-menu
        selected-keys={selectedKey.value}
        mode="inline"
        style="border-right: 0px"
      >
        {renderSubMenu()}
      </a-menu>
    )
  },
})
</script>

<style lang="less" scoped></style>
