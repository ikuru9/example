import { Middleware } from '@nuxt/types'
import { Location } from 'vue-router'
import { RoleType } from '/@/utils/permission/types'

const EXCLUDE_PATHS = ['/']

const permission: Middleware = ({
  $permission,
  route: { path, meta, name },
  store: { getters },
  redirect,
}) => {
  if (EXCLUDE_PATHS.includes(path)) {
    return
  }

  const roles: Array<RoleType> = getters['user/roles']

  const policy = $permission.getPermission(name ?? '', roles)

  if (!policy) {
    console.warn(
      'You do not have permission.\n',
      `[Role]: ${roles.join(',')} /`,
      `[Route Name]: ${name}`
    )
    const redirectUrl = meta?.permission?.redirect ?? '/'
    if (typeof redirectUrl === 'string') {
      redirect(redirectUrl)
    } else {
      redirect(<Location>redirectUrl)
    }
  }
}

export default permission
