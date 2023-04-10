import { LoginReq, LoginRes, UserInfoRes } from '/@/apis/login/models'
import { defHttp } from '/@/utils/axios'

export function login(data: LoginReq) {
  return defHttp.post<LoginRes>('/api/login', data)
}

export function getMyInfo() {
  return defHttp.get<UserInfoRes>('/api/users/my-info')
}
