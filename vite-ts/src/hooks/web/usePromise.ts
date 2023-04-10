import { computed, reactive } from 'vue'

export function usePromise<
  PromiseFn extends (...args: never[]) => Promise<never>
>(fn: PromiseFn) {
  const state: PromiseState<Fn<ReturnType<PromiseFn>>> = reactive({
    status: 'standby',
    result: undefined,
    error: undefined,
  })

  const getters: PromiseGetters = reactive({
    isStandby: computed(() => state.status === 'standby'),
    isPending: computed(() => state.status === 'pending'),
    isSettled: computed(
      () => state.status === 'fulfilled' || state.status === 'rejected'
    ),
    isFulfilled: computed(() =>
      getters.isSettled ? state.status === 'fulfilled' : undefined
    ),
    isRejected: computed(() =>
      getters.isSettled ? state.status === 'rejected' : undefined
    ),
    hasResult: computed(() =>
      getters.isSettled ? state.result != null : undefined
    ),
    hasError: computed(() =>
      getters.isSettled ? state.error != null : undefined
    ),
  })

  async function fnReactive(
    ...args: Parameters<PromiseFn>
  ): Promise<Fn<ReturnType<PromiseFn>>> {
    state.status = 'pending'
    state.result = undefined
    state.error = undefined

    try {
      const result = await fn(...args)
      state.status = 'fulfilled'
      state.result = result
      state.error = undefined

      return result
    } catch (error) {
      state.status = 'rejected'
      state.error = error

      throw error
    }
  }

  return [
    <PromiseFn>fnReactive,
    extend(
      reactive({
        status: computed(() => state.status),
        result: computed(() => state.result),
        error: computed(() => state.error),
      }),
      getters
    ),
  ]
}

export type PromiseState<R> = {
  status: 'standby' | 'pending' | 'fulfilled' | 'rejected'
  result: R | undefined
  error?: unknown
}

export type PromiseGetters = Readonly<{
  isStandby: boolean
  isPending: boolean
  isSettled: boolean
  isFulfilled: boolean | undefined
  isRejected: boolean | undefined
  hasResult: boolean | undefined
  hasError: boolean | undefined
}>

function extend<O extends Dictionary, E extends Dictionary>(
  object: O,
  extension: E
) {
  return <O & E>new Proxy(object, {
    get(...args) {
      const [, prop] = args

      if (prop in extension) {
        return extension[<string>prop]
      }

      return Reflect.get(...args)
    },

    set(...args) {
      const [, prop, value] = args
      if (prop in extension) {
        ;(<Dictionary>extension)[<string>prop] = value

        return true
      }

      Reflect.set(...args)

      return true
    },
  })
}

interface Dictionary {
  [key: string]: unknown
}
