import {
  InjectionKey,
  provide,
  inject,
  reactive,
  readonly as defineReadonly,
  // defineComponent,
  UnwrapRef,
  UnwrapNestedRefs,
  DeepReadonly,
} from 'vue'

export interface CreateContextOptions {
  readonly?: boolean
  createProvider?: boolean
  native?: boolean
}

type ShallowUnwrap<T> = {
  [P in keyof T]: UnwrapRef<T[P]>
}

export function createContext<T extends object>(
  context: T,
  key: InjectionKey<T> = Symbol(),
  options: CreateContextOptions = {}
) {
  const { readonly = true, createProvider = false, native = false } = options

  const state = reactive(context)
  const provideData = readonly ? defineReadonly(state) : state
  if (!createProvider) {
    provide<
      | T
      | UnwrapNestedRefs<T>
      | DeepReadonly<UnwrapNestedRefs<UnwrapNestedRefs<T>>>
    >(key, native ? context : provideData)
  }

  return {
    state,
  }
}

export function useContext<T>(key: InjectionKey<T>, native?: boolean): T
export function useContext<T>(
  key: InjectionKey<T>,
  defaultValue?: T,
  native?: boolean
): T

export function useContext<T>(
  key: InjectionKey<T> = Symbol(),
  defaultValue?: T
): ShallowUnwrap<T> {
  return inject<ShallowUnwrap<T>>(key, defaultValue as ShallowUnwrap<T>)
}
