import type { ActionType, RoleType } from '../types'

export interface Policy {
  actions: ActionType[]
  extraActions?: string[]
  redirect?: string
}

type RolePolicy = Partial<Record<RoleType, Policy>>

export interface Policies {
  [key: string]: {
    rolePolicy: RolePolicy
    children?: Policies
  }
}
