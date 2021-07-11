import { ActionType, RoleType } from '/@/utils/permission/types'

export interface Policy {
  actions: Array<ActionType>
  extraActions?: Array<string>
  redirect?: string
}

type RolePolicy = Partial<Record<RoleType, Policy>>

export interface Policies {
  [key: string]: {
    rolePolicy: RolePolicy
    children?: Policies
  }
}
