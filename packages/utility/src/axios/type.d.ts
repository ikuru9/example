import type { AxiosPromise, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export type RefreshTokenReturnType = {
  accessToken: string
  accessExpires: number
  refreshToken: string
  refreshExpires: number
}

export type fnRefreshApi<T extends RefreshTokenReturnType> = () => AxiosPromise<T>
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type onRequest<D = any> = (config: InternalAxiosRequestConfig<D>) => InternalAxiosRequestConfig<D>
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type onResponse<T = any, D = any> = (response: AxiosResponse<T, D>) => AxiosResponse<T, D>
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type onError = (error: any) => any
