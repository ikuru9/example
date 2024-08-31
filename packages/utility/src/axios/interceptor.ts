import type { AxiosInstance } from 'axios'
import mem from 'mem'
import type { TokenStorage } from './token-storage'
import type { RefreshTokenReturnType, fnRefreshApi, onError, onRequest, onResponse } from './type'

const getRefreshToken = mem(
  async <T extends RefreshTokenReturnType>(fetchRefreshTokenApi: fnRefreshApi<T>, storage: TokenStorage) => {
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
  storage: TokenStorage,
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

      if (status !== 401 || config._refresh_token_sent) {
        return Promise.reject(err)
      }

      config._refresh_token_sent = true
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
