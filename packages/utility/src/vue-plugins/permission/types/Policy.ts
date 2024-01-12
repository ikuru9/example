import type { ActionEnum, RoleEnum } from '../enums'

export interface Policy {
  actions: ActionEnum[]
  extraActions?: string[]
  redirect?: string
}

type RolePolicy = Partial<Record<RoleEnum, Policy>>

export interface Policies {
  [key: string]: {
    rolePolicy: RolePolicy
    children?: Policies
  }
}
