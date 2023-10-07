import { RoleEnum } from '/@/enums/roleEnum'

export interface LoginReq {
  username: string
  password: string
}

export interface LoginRes {
  accessToken: string
  refreshToken: string
}

export interface UserInfoRes {
  name: string
  roles: RoleEnum[]
}
