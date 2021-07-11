import { Module, VuexModule, MutationAction } from 'nuxt-property-decorator'
import { Role, RoleType } from '/@/utils/permission/types'

export interface UserState {
  id: string | null
  name: string | null
  roles: Array<RoleType>
}

@Module({
  name: 'user',
  stateFactory: true,
  namespaced: true,
})
class UserStore extends VuexModule<UserState> {
  user: UserState = {
    id: null,
    name: null,
    roles: [Role.OWNER],
  }

  public get id() {
    return this.user.id
  }

  public get name() {
    return this.user.name
  }

  public get roles() {
    return this.user.roles
  }

  @MutationAction({ mutate: ['user'] })
  public async setUser(user: UserState) {
    await Promise.resolve(true)

    return {
      user,
    }
  }
}

export default UserStore
