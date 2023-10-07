import type { ActionType, Policies } from './types'
import type { RoleEnum } from '/@/enums/roleEnum'
import type {
  ComponentPublicInstance,
  Directive,
  DirectiveBinding,
  Plugin,
} from 'vue'
import Permission, { IPermission } from './Permission'
import { useUserStoreWithOut } from '/@/store/user'

function checkPermission(
  el: HTMLElement,
  binding: DirectiveBinding<ActionType | string>
) {
  const { value, instance } = binding
  const { $permission, $route } = instance as ComponentPublicInstance

  if (value) {
    const userStore = useUserStoreWithOut()
    const roles: RoleEnum[] = userStore.getRoles

    if (
      !$permission?.hasActionPermission(
        $route,
        roles,
        value as ActionType | string
      )
    ) {
      el.parentNode && el.parentNode.removeChild(el)
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

    const directive: Directive<HTMLElement, ActionType | string> = {
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
