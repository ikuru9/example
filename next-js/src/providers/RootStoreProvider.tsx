import { enableStaticRendering } from 'mobx-react-lite'
import React, { createContext, ReactNode, useContext } from 'react'
import RootStore, { RootStoreHydration } from '/@/stores'

enableStaticRendering(typeof window === 'undefined')

let store: RootStore
const StoreContext = createContext<RootStore>(new RootStore())
StoreContext.displayName = 'StoreContext'

function initializeStore(initialData?: RootStoreHydration): RootStore {
  const _store = store ?? new RootStore()

  if (initialData) {
    _store.hydrate(initialData)
  }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useRootStore(): RootStore {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useRootStore must be used with in RootStoreProvider')
  }

  return context
}

export default function RootStoreProvider({
  children,
  hydrationData,
}: {
  children: ReactNode
  hydrationData?: RootStoreHydration
}): JSX.Element {
  const store = initializeStore(hydrationData)

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
