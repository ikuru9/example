import Union from '../../../../types/Union'

export const Action = {
  ALL: 'ALL',
  REGISTER: 'REGISTER',
  MODIFY: 'MODIFY',
  REMOVE: 'REMOVE',
} as const

export type ActionType = Union<typeof Action>
