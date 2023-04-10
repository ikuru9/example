/**RoleEnum
 * @description: Exception related enumeration
 */
export const ExceptionEnum = {
  // page not access
  PAGE_NOT_ACCESS: 403,

  // page not found
  PAGE_NOT_FOUND: 404,

  // error
  ERROR: 500,

  // net work error
  NET_WORK_ERROR: 10000,

  // No data on the page. In fact, it is not an exception page
  PAGE_NOT_DATA: 10100,
} as const
export type ExceptionEnum = typeof ExceptionEnum[keyof typeof ExceptionEnum]

export const ErrorTypeEnum = {
  VUE: 'vue',
  SCRIPT: 'script',
  RESOURCE: 'resource',
  AJAX: 'ajax',
  PROMISE: 'promise',
} as const
export type ErrorTypeEnum = typeof ErrorTypeEnum[keyof typeof ErrorTypeEnum]
