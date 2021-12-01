import {
  Action,
  Policy,
  Role,
  RoleType,
  Policies,
} from '/@/utils/permission/types'
import DEFAULT_POLICES from '/@/polices'

/**
 * 권한 관리
 *
 * route name 를 key로 사용하여 권한을 관리
 * redirect url 은 @/pages/* components 에 설정
 */
export default class Permission {
  protected policies: Policies

  constructor(policies: Policies = DEFAULT_POLICES) {
    this.policies = policies
  }

  public setPolicies(policies: Policies = DEFAULT_POLICES) {
    this.policies = policies
  }

  public getPermission(
    name: string,
    roleTypes: Array<RoleType>
  ): Policy | undefined {
    if (this.isAdmin(roleTypes)) {
      return {
        actions: [Action.ALL],
      }
    }

    return this.getPolicy(this.policies, name.split('-'), roleTypes)
  }

  public hasActionPermission(
    name: string,
    roleTypes: Array<RoleType>,
    action: string
  ): boolean {
    if (this.isAdmin(roleTypes)) {
      return true
    }

    const { actions, extraActions } = this.getPolicy(
      this.policies,
      name.split('-'),
      roleTypes
    ) ?? { actions: undefined }

    return (
      actions?.includes(Action.ALL) ||
      actions?.includes(Action[action as keyof typeof Action]) ||
      extraActions?.includes(<string>action) ||
      false
    )
  }

  private getPolicy(
    policies: Policies,
    names: Array<string>,
    roleTypes: Array<RoleType>,
    sliceIndex: number = 0
  ): Policy | undefined {
    let result: Policy | undefined

    const nameSize = names.length - 1
    names.slice(sliceIndex).some((name, index) => {
      const policy = policies[name]

      if (!policy) {
        console.warn('No policy set.\n', `[Route Name]: ${name}`)
        return false
      }

      if (
        Object.keys(policy.rolePolicy).some((roleType) =>
          roleTypes.includes(<RoleType>roleType)
        )
      ) {
        const children = policy?.children
        if (children && nameSize > index) {
          result = this.getPolicy(children, names, roleTypes, index - 1)
          return true
        }
        roleTypes.some((roleType) => {
          result = policy.rolePolicy[roleType]
          return !!result
        })

        return true
      }

      return false
    })

    return result
  }

  protected isAdmin(roleType: RoleType | Array<RoleType>): boolean {
    if (Array.isArray(roleType)) {
      return roleType.includes(Role.ADMIN)
    } else {
      return roleType === Role.ADMIN
    }
  }
}
