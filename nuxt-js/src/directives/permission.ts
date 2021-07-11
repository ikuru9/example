import { DirectiveOptions, VNode } from 'vue'
import { DirectiveBinding } from 'vue/types/options'
import { RoleType } from '../utils/permission/types'

function checkPermission(
  el: HTMLElement,
  binding: DirectiveBinding,
  vNode: VNode
) {
  const { value } = binding
  const {
    $permission,
    $store: { getters },
    $route: { name },
  } = vNode.context!

  if (value) {
    const roles: Array<RoleType> = getters['user/roles']

    if (!$permission?.hasActionPermission(name ?? '', roles, value)) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error(`need roles! Like v-permission="'REGISTER'"`)
  }
}

const permission: DirectiveOptions = {
  inserted(el, binding, vNode) {
    checkPermission(el, binding, vNode)
  },
  update(el, binding, vNode) {
    checkPermission(el, binding, vNode)
  },
}

export default permission
