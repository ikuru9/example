declare type Fn<T> = T extends (infer U)[]
  ? U
  : T extends (...args: never[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T

declare type LabelValueOptions = {
  label: string
  value: never
  [key: string]: string | number | boolean
}[]

declare type TargetContext = '_self' | '_blank'

declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T
}

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> =
  ComponentElRef<T> | null

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>
