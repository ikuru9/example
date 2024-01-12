import { type CreateAxiosDefaults, default as _axios } from 'axios'
import { setupInterceptor } from './interceptor'
import { Storage } from './storage'
import type { RefreshTokenReturnType, fnRefreshApi, onError, onRequest, onResponse } from './type'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function createAxios<Token extends RefreshTokenReturnType, T = any, D = any>(
  config: CreateAxiosDefaults<D>,
  fetchRefreshTokenApi: fnRefreshApi<Token>,
  storage: Storage,
  onRequest: onRequest<D>,
  onResponse?: onResponse<T, D>,
  onError?: onError,
) {
  const axios = _axios.create(config)

  setupInterceptor(axios, fetchRefreshTokenApi, storage, onRequest, onResponse, onError)

  return axios
}
