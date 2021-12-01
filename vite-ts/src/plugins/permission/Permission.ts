import {
  Action,
  Policies,
  Policy,
  Role,
  RoleType,
} from '@/plugins/permission/types'
import DEFAULT_POLICES from '@/polices'

export interface IPermission {
  setPolicies(policies: Policies): void
  getPermission(path: string, roleTypes: Array<RoleType>): Policy | undefined
  hasActionPermission(
    path: string,
    roleTypes: Array<RoleType>,
    action: string
  ): boolean
}

/**
 * 권한 관리
 *
 * route path 를 key로 사용하여 권한을 관리
 * redirect url 은 @/pages/* components 에 설정
 */
export default class Permission implements IPermission {
  protected policies: Policies

  constructor(policies: Policies = DEFAULT_POLICES) {
    this.policies = policies
  }

  public setPolicies(policies: Policies = DEFAULT_POLICES) {
    this.policies = policies
  }

  public getPermission(
    path: string,
    roleTypes: Array<RoleType>
  ): Policy | undefined {
    if (this.isAdmin(roleTypes)) {
      return {
        actions: [Action.ALL],
      }
    }

    return this.getPolicy(this.policies, path.split('/'), roleTypes)
  }

  public hasActionPermission(
    path: string,
    roleTypes: Array<RoleType>,
    action: string
  ): boolean {
    if (this.isAdmin(roleTypes)) {
      return true
    }

    const { actions, extraActions } = this.getPolicy(
      this.policies,
      path.split('/'),
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
    paths: Array<string>,
    roleTypes: Array<RoleType>,
    sliceIndex: number = 0
  ): Policy | undefined {
    let result: Policy | undefined

    const nameSize = paths.length - 1
    paths.slice(sliceIndex).some((name, index) => {
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
          result = this.getPolicy(children, paths, roleTypes, index - 1)
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
