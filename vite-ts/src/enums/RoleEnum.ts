export const RoleEnum: Readonly<Record<string, string>> = {
  SUPER: 'super',
}

export type RoleEnum = Union<typeof RoleEnum>
