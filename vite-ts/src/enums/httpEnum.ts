/**
 * @description: Request result set
 */
export const RESULT_ENUM = {
  SUCCESS: 0,
  ERROR: 1,
  TIMEOUT: 401,
  TYPE: 'success',
} as const
export type RESULT_ENUM = typeof RESULT_ENUM[keyof typeof RESULT_ENUM]

/**
 * @description: request method
 */
export const METHOD_ENUM = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  FETCH: 'FETCH',
} as const
export type METHOD_ENUM = typeof METHOD_ENUM[keyof typeof METHOD_ENUM]

/**
 * @description:  contentType
 */
export const CONTENT_TYPE = {
  // json
  JSON: 'application/json;charset:UTF-8',
  // form-data qs
  FORM_URLENCODED: 'application/x-www-form-urlencoded;charset:UTF-8',
  // form-data  upload
  FORM_DATA: 'multipart/form-data;charset:UTF-8',
} as const
export type CONTENT_TYPE = typeof CONTENT_TYPE[keyof typeof CONTENT_TYPE]
