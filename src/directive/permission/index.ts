import { DirectiveBinding } from 'vue'
import { useUserStore } from '@/stores'
import _ from 'lodash'
import { superAdmin } from '@/config/const'

function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  const { value } = binding
  const userStore = useUserStore()
  const { roleName } = userStore

  if (Array.isArray(value)) {
    if (value.length > 0) {
      const permissionValues = value

      const hasPermission =
        permissionValues.includes(roleName) || roleName === superAdmin
      if (!hasPermission && el.parentNode) {
        el.parentNode.removeChild(el)
      }
    }
  } else {
    throw new Error(`need roles! Like v-permission="['admin','user']"`)
  }
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  },
}
