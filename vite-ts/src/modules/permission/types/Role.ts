export const Role = {
  ADMIN: 'ADMIN',
  OWNER: 'OWNER',
  MANAGER: 'MANAGER',
  USER: 'USER',
  GUEST: 'GUEST',
} as const

export type RoleType = Union<typeof Role>
