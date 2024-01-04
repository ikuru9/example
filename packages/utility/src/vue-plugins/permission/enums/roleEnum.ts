export const RoleEnum = {
  ADMIN: 'admin',
  GUEST: 'guest',
} as const

export type RoleEnum = (typeof RoleEnum)[keyof typeof RoleEnum]
