import type { AxiosResponse, AxiosPromise, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import memoize from 'memoize'
import { type Storage } from './storage'

export interface RefreshTokenReturnType {
  accessToken: string
  accessExpires: number
  refreshToken: string
  refreshExpires: number
}

export type RefreshApiPromise = () => AxiosPromise<RefreshTokenReturnType>

export type onRequest = (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
export type onResponse = (response: AxiosResponse) => AxiosResponse
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type onError = (error: any) => any

const getRefreshToken = memoize(
  // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
  async (getRefreshTokenApi: RefreshApiPromise, storage: Storage): Promise<string | void> => {
    try {
      const {
        data: { accessToken, accessExpires, refreshToken, refreshExpires },
      } = await getRefreshTokenApi()
      storage.setAccessToken(accessToken, accessExpires)

      if (refreshToken !== null) {
        storage.setRefreshToken(refreshToken, refreshExpires)
      }

      return accessToken
    } catch (e) {
      storage.removeAccessToken()
      storage.removeRefreshToken()
    }
  },
  { maxAge: 1000 },
)

export function setupResponseInterceptor(
  axiosInstance: AxiosInstance,
  getRefreshTokenApi: RefreshApiPromise,
  storage: Storage,
  onRequest?: onRequest,
  onResponse?: onResponse,
  onError?: onError,
) {
  if (onRequest) {
    axiosInstance.interceptors.request.use((config) => onRequest(config))
  }
  axiosInstance.interceptors.response.use(
    (res) => (onResponse ? onResponse(res) : res),
    async (err) => {
      const {
        config,
        response: { status },
      } = err

      if (status !== 401 || config._sent) {
        return Promise.reject(err)
      }

      config._sent = true
      const accessToken = await getRefreshToken(getRefreshTokenApi, storage)

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
        return axiosInstance(config)
      }

      if (onError) {
        return onError(err)
      }

      return Promise.reject(err)
    },
  )
}
