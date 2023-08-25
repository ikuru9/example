import type { ActionType } from '../types'
import type { RoleEnum } from '/@/enums/roleEnum'

export interface Policy {
  actions: ActionType[]
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
