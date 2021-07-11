import { InjectionKey } from 'vue'
import { loadModules } from './modules'
import {
  createStore as _createStore,
  useStore as _useStore,
  Store as VuexStore,
} from 'vuex'

export interface RootState {
  flag: boolean
}

export const key: InjectionKey<VuexStore<RootState>> = Symbol()

export function useStore(): VuexStore<RootState> {
  return _useStore(key)
}

export function createStore(): VuexStore<RootState> {
  const { contents, modules } = loadModules()

  const store = _createStore<RootState>({
    strict: process.env.NODE_ENV !== 'production',
    modules,
  })

  if (import.meta.hot) {
    import.meta.hot?.accept(contents, () => {
      const { modules } = loadModules()
      store.hotUpdate({
        modules,
      })
    })
  }

  return store
}
