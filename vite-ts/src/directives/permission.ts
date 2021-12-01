import { RoleType } from '@/utils/permission/types/Role'
import { DirectiveBinding, ObjectDirective, VNode } from 'vue'

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
  } = vNode.appContext!

  if (value) {
    const roles: Array<RoleType> = getters['user/roles']

    if (!$permission?.hasActionPermission(name ?? '', roles, value)) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error(`need roles! Like v-permission="'REGISTER'"`)
  }
}

const permission: ObjectDirective<HTMLElement> = {
  created(el, binding, vNode) {
    checkPermission(el, binding, vNode)
  },
  updated(el, binding, vNode) {
    checkPermission(el, binding, vNode)
  },
}

export default permission
