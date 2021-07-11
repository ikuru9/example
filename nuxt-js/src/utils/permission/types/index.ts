import Permission from '/@/utils/permission'

export * from '/@/utils/permission/types/Action'
export * from '/@/utils/permission/types/Role'
export * from '/@/utils/permission/types/Policy'

declare module '@nuxt/types' {
  interface Context {
    $permission: Permission
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $permission: Permission
  }
}
