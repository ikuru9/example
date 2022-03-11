type Fn = (...arg: unknown[]) => unknown | void

type PromiseFn<T extends Fn> = (...args: Parameters<T>) => ReturnType<T>
