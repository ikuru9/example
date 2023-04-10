/**
 * Data processing class, can be configured according to the project
 */
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import type { RequestOptions } from '/#/axios'

export interface CreateAxiosOptions extends AxiosRequestConfig {
  authenticationScheme?: string
  transform?: AxiosTransform
  requestOptions?: RequestOptions
}

export abstract class AxiosTransform {
  /**
   * @description: Process configuration before request
   */
  beforeRequestHook?: (
    config: AxiosRequestConfig,
    options: RequestOptions
  ) => AxiosRequestConfig

  /**
   * @description:
   */
  transformResponseHook?: (
    res: AxiosResponse,
    options: RequestOptions
  ) => AxiosResponse

  /**
   * @description:
   */
  requestCatchHook?: (e: Error, options: RequestOptions) => AxiosError

  /**
   * @description:
   */
  requestInterceptors?: (
    config: AxiosRequestConfig,
    options: CreateAxiosOptions
  ) => AxiosRequestConfig

  /**
   * @description:
   */
  responseInterceptors?: (res: AxiosResponse) => AxiosResponse

  /**
   * @description:
   */
  requestInterceptorsCatch?: (error: Error) => void

  /**
   * @description:
   */
  responseInterceptorsCatch?: (
    axiosInstance: AxiosInstance,
    error: Error
  ) => void
}
