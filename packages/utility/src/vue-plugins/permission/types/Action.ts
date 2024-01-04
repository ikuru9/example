/**
 * 권한 종류
 */
export const Action = {
  ALL: 'ALL',
  SAVE: 'SAVE',
  REMOVE: 'REMOVE',
} as const

export type ActionType = (typeof Action)[keyof typeof Action]
