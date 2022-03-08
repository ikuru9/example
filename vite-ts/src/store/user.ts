import { defineStore } from 'pinia'
import { RoleType } from '/@/modules/permission/types'
import { store } from '/@/store'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface UserState {
  name: string
  roles: RoleType[]
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    name: 'Guest',
    roles: [],
  }),
  getters: {
    getName: (state) => state.name,
    getRoles: (state) => state.roles,
  },
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
