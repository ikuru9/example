import { Context } from '@nuxt/types'
import Permission from '/@/utils/permission'

export default (ctx: Context, inject: any) => {
  // TODO: 권한 부여
  const permission = new Permission()
  ctx.$permission = permission
  inject('permission', permission)
}
