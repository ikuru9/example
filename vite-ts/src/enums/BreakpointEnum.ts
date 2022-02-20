export const SizeEnum: Readonly<Record<string, string>> = {
  XS: 'XS',
  SM: 'SM',
  MD: 'MD',
  LG: 'LG',
  XL: 'XL',
  XXL: 'XXL',
}

export type SizeEnum = Union<typeof SizeEnum>

export const ScreenEnum: Readonly<Record<string, number>> = {
  XS: 480,
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
  XXL: 1600,
}

export type ScreenEnum = Union<typeof ScreenEnum>

export const ScreenMap: Readonly<Map<SizeEnum, number>> = new Map<
  SizeEnum,
  number
>()

ScreenMap.set(SizeEnum.XS, ScreenEnum.XS)
ScreenMap.set(SizeEnum.SM, ScreenEnum.SM)
ScreenMap.set(SizeEnum.MD, ScreenEnum.MD)
ScreenMap.set(SizeEnum.LG, ScreenEnum.LG)
ScreenMap.set(SizeEnum.XL, ScreenEnum.XL)
ScreenMap.set(SizeEnum.XXL, ScreenEnum.XXL)

export type ScreenMap = Nullable<typeof ScreenMap>
