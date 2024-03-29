import type { RouteLocation } from 'vue-router'
import { ActionEnum, RoleEnum } from './enums'
import type { Policies, Policy } from './types'

export interface IPermission {
  setPolicies(policies: Policies): void
  getPermission(route: RouteLocation, roleTypes: RoleEnum[]): Policy | undefined
  hasActionPermission(route: RouteLocation, roleTypes: RoleEnum[], action: ActionEnum | string): boolean
}

/**
 * 권한 관리
 *
 * route name 를 key로 사용하여 권한을 관리
 * redirect url 은 @/pages/* components 에 설정
 */
export class Permission implements IPermission {
  protected policies: Policies

  constructor(policies: Policies) {
    this.policies = policies
  }

  /**
   * 권한 정책 설정
   * @param policies 권한 정책
   */
  public setPolicies(policies: Policies) {
    this.policies = policies
  }

  /**
   * 해당 route 의 권한 가져오기
   * @param route
   * @param roleTypes
   * @returns
   */
  public getPermission(route: RouteLocation, roleTypes: RoleEnum[]) {
    if (this.isAdmin(roleTypes)) {
      return {
        actions: [ActionEnum.ALL],
      }
    }

    return this.getPolicy(this.policies, route, roleTypes)
  }

  /**
   * 해당 route 의 Action 권한 존재 유무
   * @param route
   * @param roleTypes
   * @param action
   * @returns
   */
  public hasActionPermission(route: RouteLocation, roleTypes: RoleEnum[], action: ActionEnum | string) {
    if (this.isAdmin(roleTypes)) {
      return true
    }

    const { actions, extraActions } = this.getPolicy(this.policies, route, roleTypes) ?? { actions: undefined }

    return (
      actions?.includes(ActionEnum.ALL) ||
      actions?.includes(ActionEnum[action as keyof typeof ActionEnum]) ||
      extraActions?.includes(<string>action) ||
      false
    )
  }

  private getPolicy(policies: Policies, route: RouteLocation, roleTypes: RoleEnum[], sliceIndex = 0) {
    let result: Policy | undefined

    const names = ((route.name as string) ?? '').split('-')
    const nameSize = names.length - 1

    names.slice(sliceIndex).some((name, index) => {
      const policy = policies[name]

      if (!policy) {
        console.warn('No policy set.\n', `[Route Name]: ${name}`)
        return false
      }

      if (Object.keys(policy.rolePolicy).some((roleType) => roleTypes.includes(<RoleEnum>roleType))) {
        const children = policy?.children
        if (children && nameSize > index) {
          result = this.getPolicy(children, route, roleTypes, index - 1)
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

  protected isAdmin(roleType: RoleEnum | RoleEnum[]) {
    if (Array.isArray(roleType)) {
      return roleType.includes(RoleEnum.ADMIN)
    }

    return roleType === RoleEnum.ADMIN
  }
}
