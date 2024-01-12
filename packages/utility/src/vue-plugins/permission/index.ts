import type { ComponentPublicInstance, Directive, DirectiveBinding, Plugin } from 'vue'
import { IPermission, Permission } from './Permission'
import { type ActionEnum, RoleEnum } from './enums'
import type { Policies } from './types'

function checkPermission(el: HTMLElement, binding: DirectiveBinding<ActionEnum | string>) {
  const { value, instance } = binding
  const { $permission, $route } = instance as ComponentPublicInstance

  if (value) {
    // TODO: Get user Roles
    const roles: RoleEnum[] = []

    if (!$permission?.hasActionPermission($route, roles, value as ActionEnum | string)) {
      el.parentNode?.removeChild(el)
    }
  } else {
    throw new Error(`need roles! Like v-permission="'REGISTER'"`)
  }
}

export interface PermissionOptions {
  defaultPolices: Policies
}

const permission: Plugin = {
  install(app, options: PermissionOptions) {
    const permission = new Permission(options.defaultPolices)
    app.config.globalProperties.$permission = permission

    const directive: Directive<HTMLElement, ActionEnum | string> = {
      mounted(el, binding) {
        checkPermission(el, binding)
      },
      updated(el, binding) {
        checkPermission(el, binding)
      },
    }

    app.directive('permission', directive)
  },
}

export default permission

declare module 'vue' {
  export interface ComponentCustomProperties {
    $permission: IPermission
  }
}
