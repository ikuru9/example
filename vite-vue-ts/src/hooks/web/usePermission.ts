import type { RouteRecordRaw } from 'vue-router'

import { useUserStore } from '/@/store/user'
import { router, resetRouter } from '/@/router'
import { RoleEnum } from '/@/enums/roleEnum'

import { intersection } from 'lodash-es'
import { isArray } from '/@/utils/is'

// User permissions related operations
export function usePermission() {
  const userStore = useUserStore()

  /**
   * Reset and regain authority resource information
   * @param id
   */
  async function resume() {
    resetRouter()
    // TODO: Router permission
    const routes = []
    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw)
    })
  }

  /**
   * Determine whether there is permission
   */
  function hasPermission(
    value?: RoleEnum | RoleEnum[] | string | string[],
    def = true
  ): boolean {
    // Visible by default
    if (!value) {
      return def
    }

    if (!isArray(value)) {
      return userStore.getRoles?.includes(value as RoleEnum)
    }
    return (intersection(value, userStore.getRoles) as RoleEnum[]).length > 0
  }

  /**
   * Change roles
   * @param roles
   */
  async function changeRole(roles: RoleEnum[]): Promise<void> {
    if (!isArray(roles)) {
      roles = [roles]
    }
    userStore.setRoles(roles)
    await resume()
  }

  /**
   * refresh menu data
   */
  async function refreshMenu() {
    resume()
  }

  return { changeRole, hasPermission, refreshMenu }
}
