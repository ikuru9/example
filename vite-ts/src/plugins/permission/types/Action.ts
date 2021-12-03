import Union from '@/types/Union'

/**
 * 권한 종류
 */
export const Action = {
  ALL: 'ALL',
  SAVE: 'SAVE',
  REMOVE: 'REMOVE',
}

export type ActionType = Union<typeof Action>
