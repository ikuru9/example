import { InjectionKey } from 'vue'
import {
  createStore as _createStore,
  Store as VuexStore,
  useStore as _useStore,
} from 'vuex'
import { loadModules } from './modules'

export interface RootState {
  flag: boolean
}

export const key: InjectionKey<VuexStore<RootState>> = Symbol()

function useStore(): VuexStore<RootState> {
  return _useStore(key)
}

export function createStore(): VuexStore<RootState> {
  const { contents, modules } = loadModules()

  const store = _createStore<RootState>({
    strict: import.meta.env.MODE !== 'production',
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

export default useStore()
