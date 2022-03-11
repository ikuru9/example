import { ref, UnwrapRef } from 'vue'

export function usePromise<F extends Fn>(promiseFn: PromiseFn<F>) {
  type ArgType = Parameters<F>
  type PromiseReturnType = Awaited<ReturnType<F>>

  const isLoading = ref<boolean>(false)
  const data = ref<Nullable<PromiseReturnType>>(null)
  const error = ref<Nullable<Error>>(null)

  async function getDataSource(
    ...arg: ArgType
  ): Promise<UnwrapRef<Nullable<PromiseReturnType>>> {
    let result: UnwrapRef<Nullable<PromiseReturnType>> = null
    try {
      isLoading.value = true
      result = (await promiseFn(...arg)) as UnwrapRef<PromiseReturnType>
      data.value = result
    } catch (e) {
      error.value = e as Error
    } finally {
      isLoading.value = false
    }

    return result
  }

  return {
    isLoading,
    data,
    error,
    getDataSource,
  }
}
