import { defineStore } from 'pinia'
import { store } from '@/store'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppState {
  // TODO:
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({}),
})

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store)
}
