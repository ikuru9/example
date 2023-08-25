import { RoleType } from '/@/modules/permission/types/Role'

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    layout: string
    roles: RoleType[]
    ignoreRoute: boolean
  }
}

export {}
