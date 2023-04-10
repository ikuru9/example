import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import type { RequestOptions } from '/#/axios'
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform'
import { clone } from 'lodash-es'
import { useGlobSetting } from '/@/hooks/setting'
import { useMessage } from '/@/hooks/web/useMessage'
import { RequestEnum, ResultEnum, ContentTypeEnum } from '/@/enums/httpEnum'
import { setObjToUrlParams, deepMerge } from '/@/utils'
import { isString } from '/@/utils/is'
import { getToken } from '/@/utils/auth'
import { useI18n } from '/@/hooks/web/useI18n'
import { useErrorLogStoreWithOut } from '/@/store/errorLog'
import { useUserStoreWithOut } from '/@/store/user'
import { VAxios } from './Axios'
import { checkStatus } from './checkStatus'
import { AxiosRetry } from './axiosRetry'
import { joinTimestamp, formatRequestDate } from './helper'

const globSetting = useGlobSetting()
const urlPrefix = globSetting.urlPrefix
const { createMessage, createErrorModal } = useMessage()

/**
 * @description:
 */
const transform: AxiosTransform = {
  /**
   * @description:
   */
  transformResponseHook: (res: AxiosResponse, options: RequestOptions) => {
    const { t } = useI18n()
    const { isTransformResponse, isReturnNativeResponse } = options
    if (isReturnNativeResponse) {
      return res
    }
    if (!isTransformResponse) {
      return res.data
    }

    const { data } = res
    if (!data) {
      // return '[HTTP] Request has no return value';
      throw new Error(t('sys.api.apiRequestFailed'))
    }
    const { code, result, message } = data

    const hasSuccess =
      data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS
    if (hasSuccess) {
      return result
    }

    let timeoutMsg = ''
    switch (code) {
      case ResultEnum.TIMEOUT:
        timeoutMsg = t('sys.api.timeoutMessage')
        // eslint-disable-next-line no-case-declarations
        const userStore = useUserStoreWithOut()
        userStore.logout(true)
        break
      default:
        if (message) {
          timeoutMsg = message
        }
    }

    // errorMessageMode=‘modal’
    // errorMessageMode='none'
    if (options.errorMessageMode === 'modal') {
      createErrorModal({ title: t('sys.api.errorTip'), content: timeoutMsg })
    } else if (options.errorMessageMode === 'message') {
      createMessage.error(timeoutMsg)
    }

    throw new Error(timeoutMsg || t('sys.api.apiRequestFailed'))
  },
  beforeRequestHook: (config, options) => {
    const {
      apiUrl,
      joinPrefix,
      joinParamsToUrl,
      formatDate,
      joinTime = true,
      urlPrefix,
    } = options

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`
    }

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`
    }
    const params = config.params || {}
    const data = config.data || false
    formatDate && data && !isString(data) && formatRequestDate(data)
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        config.params = Object.assign(
          params || {},
          joinTimestamp(joinTime, false)
        )
      } else {
        // restful
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`
        config.params = undefined
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params)
        if (
          Reflect.has(config, 'data') &&
          config.data &&
          (Object.keys(config.data).length > 0 ||
            config.data instanceof FormData)
        ) {
          config.data = data
          config.params = params
        } else {
          config.data = params
          config.params = undefined
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data)
          )
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params
        config.params = undefined
      }
    }
    return config
  },

  /**
   * @description:
   */
  requestInterceptors: (config, options) => {
    const token = getToken()
    if (token && config?.requestOptions?.withToken !== false) {
      // jwt token
      if (config.headers) {
        config.headers.Authorization = options.authenticationScheme
          ? `${options.authenticationScheme} ${token}`
          : token
      }
    }
    return config
  },

  /**
   * @description:
   */
  responseInterceptors: (res: AxiosResponse<never>) => {
    return res
  },

  /**
   * @description:
   */
  responseInterceptorsCatch: (
    axiosInstance: AxiosInstance,
    error: AxiosError
  ) => {
    const { t } = useI18n()
    const errorLogStore = useErrorLogStoreWithOut()
    errorLogStore.addAjaxErrorInfo(error)
    const { response, code, message, config } = error
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { method, requestOptions } = config!
    const errorMessageMode = requestOptions?.errorMessageMode || 'none'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const msg: string = (response?.data as any)?.message ?? ''
    const err: string = error?.toString?.() ?? ''
    let errMessage = ''

    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        errMessage = t('sys.api.apiTimeoutMessage')
      }
      if (err?.includes('Network Error')) {
        errMessage = t('sys.api.networkExceptionMsg')
      }

      if (errMessage) {
        if (errorMessageMode === 'modal') {
          createErrorModal({
            title: t('sys.api.errorTip'),
            content: errMessage,
          })
        } else if (errorMessageMode === 'message') {
          createMessage.error(errMessage)
        }
        return Promise.reject(error)
      }
    } catch (error) {
      throw new Error(error as unknown as string)
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    checkStatus(error!.response!.status, msg, errorMessageMode)

    const retryRequest = new AxiosRetry()
    const isOpenRetry = requestOptions?.retryRequest?.isOpenRetry
    if (method?.toUpperCase() === RequestEnum.GET && isOpenRetry) {
      retryRequest.retry(axiosInstance, error)
    }
    return Promise.reject(error)
  },
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        // authentication schemes，e.g: Bearer
        // authenticationScheme: 'Bearer',
        authenticationScheme: '',
        timeout: 10 * 1000,
        // baseURL: globSetting.apiUrl,
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        transform: clone(transform),
        requestOptions: {
          joinPrefix: true,
          isReturnNativeResponse: false,
          isTransformResponse: true,
          joinParamsToUrl: false,
          formatDate: true,
          errorMessageMode: 'message',
          apiUrl: globSetting.apiUrl,
          urlPrefix: urlPrefix,
          joinTime: true,
          ignoreCancelToken: true,
          withToken: true,
          retryRequest: {
            isOpenRetry: true,
            count: 5,
            waitTime: 100,
          },
        },
      },
      opt || {}
    )
  )
}
export const defHttp = createAxios()

// other api url
// export const otherHttp = createAxios({
//   requestOptions: {
//     apiUrl: 'xxx',
//     urlPrefix: 'xxx',
//   },
// });
