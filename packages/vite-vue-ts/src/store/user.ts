import { defineStore } from 'pinia'
import { store } from '/@/store'
import { router } from '/@/router'
import { PageEnum } from '/@/enums/pageEnum'
import { RoleEnum } from '/@/enums/roleEnum'
import {
  setToken,
  removeToken,
  removeRefreshToken,
  getToken,
  setRefreshToken,
} from '/@/utils/auth'
import { UserInfoRes } from '/@/apis/login/models'
import { login, getMyInfo } from '/@/apis/login'

interface UserState {
  userInfo?: UserInfoRes
  lastLoginTime: number
}

const guestUser = {
  name: 'Guest',
  roles: [],
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userInfo: guestUser,
    lastLoginTime: 0,
  }),
  getters: {
    getName: (state) => state.userInfo?.name ?? null,
    getRoles: (state) => state.userInfo?.roles ?? [],
  },
  actions: {
    setRoles(roles: RoleEnum[]) {
      if (!this.userInfo) {
        throw 'User does not exist.'
      }

      this.userInfo.roles = roles
    },
    async login(username: string, password: string) {
      const { accessToken, refreshToken } = await login({
        username,
        password,
      })

      setToken(accessToken)
      if (refreshToken) {
        setRefreshToken(refreshToken)
      }

      this.getUserInfo(accessToken)

      // TODO:
    },
    async getUserInfo(token = getToken()) {
      if (!token) {
        return
      }
      const user = await getMyInfo()

      this.userInfo = user
      this.lastLoginTime = new Date().getTime()

      return user
    },
    logout(goLogin = false) {
      removeToken()
      removeRefreshToken()

      this.userInfo = guestUser
      this.lastLoginTime = 0

      if (goLogin) {
        router.push(PageEnum.BASE_LOGIN)
      }
    },
  },
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
