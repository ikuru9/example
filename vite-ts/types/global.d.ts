type ValueType = string | number | boolean | symbol | naver

const __APP_INFO__: {
  pkg: {
    name: string
    version: string
    dependencies: Recordable<string>
    devDependencies: Recordable<string>
  }
  lastBuildTime: string
}
export type Writable<T> = {
  -readonly [P in keyof T]: T[P]
}

declare type Nullable<T> = T | null
declare type Recordable<T = any> = Record<string, T>
declare type ReadonlyRecordable<T = any> = {
  readonly [key: string]: T
}

declare type Union<
  T extends { [k: string]: ValueType } | ReadonlyArray<ValueType>
> = T extends ReadonlyArray<ValueType>
  ? T[number]
  : T extends { [k: string]: infer U }
  ? U
  : never
