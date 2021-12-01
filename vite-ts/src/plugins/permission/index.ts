import { ComponentPublicInstance, DirectiveBinding, Plugin } from 'vue'
import Permission, { IPermission } from './Permission'
import { RoleType } from './types'

function checkPermission(el: HTMLElement, binding: DirectiveBinding<RoleType>) {
  const { value, instance } = binding
  const {
    $permission,
    $store: { getters },
    $route: { path },
  } = instance as ComponentPublicInstance

  if (value) {
    const roles: Array<RoleType> = getters['user/roles']

    if (!$permission?.hasActionPermission(path, roles, value)) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error(`need roles! Like v-permission="'REGISTER'"`)
  }
}

const permission: Plugin = {
  install(app, options?) {
    // TODO: 권한 부여
    const permission = new Permission()
    app.config.globalProperties.$permission = permission

    app.directive('permission', {
      mounted(el, binding) {
        checkPermission(el, binding)
      },
      updated(el, binding) {
        checkPermission(el, binding)
      },
    })
  },
}

export default permission

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $permission: IPermission
  }
}
