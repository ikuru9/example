export const SizeEnum = {
  DEFAULT: 'default',
  SMALL: 'small',
  LARGE: 'large',
} as const
export type SizeEnum = typeof SizeEnum[keyof typeof SizeEnum]

export const SizeNumberEnum = {
  DEFAULT: 48,
  SMALL: 16,
  LARGE: 64,
} as const
export type SizeNumberEnum = typeof SizeNumberEnum[keyof typeof SizeNumberEnum]

export const sizeMap: Map<SizeEnum, SizeNumberEnum> = (() => {
  const map = new Map<SizeEnum, SizeNumberEnum>()
  map.set(SizeEnum.DEFAULT, SizeNumberEnum.DEFAULT)
  map.set(SizeEnum.SMALL, SizeNumberEnum.SMALL)
  map.set(SizeEnum.LARGE, SizeNumberEnum.LARGE)
  return map
})()
