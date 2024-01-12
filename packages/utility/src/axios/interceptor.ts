import type { AxiosInstance } from 'axios'
import memoize from 'memoize'
import { Storage } from './storage'
import type { RefreshTokenReturnType, fnRefreshApi, onError, onRequest, onResponse } from './type'

const getRefreshToken = memoize(
  async <T extends RefreshTokenReturnType>(fetchRefreshTokenApi: fnRefreshApi<T>, storage: Storage) => {
    try {
      const {
        data: { accessToken, accessExpires, refreshToken, refreshExpires },
      } = await fetchRefreshTokenApi()
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

export function setupInterceptor<T extends RefreshTokenReturnType>(
  axiosInstance: AxiosInstance,
  fetchRefreshTokenApi: fnRefreshApi<T>,
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
      const accessToken = await getRefreshToken(fetchRefreshTokenApi, storage)

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
