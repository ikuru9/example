type Fn = (...arg: unknown[] | undefined) => unknown | void

type PromiseFn<T extends Fn> = (
  ...args: Parameters<T> | undefined
) => ReturnType<T>
