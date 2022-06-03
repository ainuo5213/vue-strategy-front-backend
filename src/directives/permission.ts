import store from '@/store'
import { DirectiveBinding, warn } from 'vue'

function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  let { value } = binding
  const pointPermissions = store.getters.userInfo.permission.points
  if (typeof value === 'undefined') {
    warn('v-permission value must have a value')
    return
  }
  value = Array.isArray(value) ? value : [value]
  if (Array.isArray(value)) {
    const hasPermission = pointPermissions.some((r) => value.includes(r))
    if (!hasPermission) {
      el.remove()
    }
  }
}
export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding)
  }
}
