/**
 * 권한 종류
 */
export const ActionEnum = {
  ALL: 'ALL',
  SAVE: 'SAVE',
  REMOVE: 'REMOVE',
} as const

export type ActionEnum = (typeof ActionEnum)[keyof typeof ActionEnum]
