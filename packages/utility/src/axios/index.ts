import {
  setupResponseInterceptor,
  type RefreshApiPromise,
  type onResponse,
  type onError,
  onRequest,
} from './interceptor'
import { Storage } from './storage'
import { default as _axios, type CreateAxiosDefaults } from 'axios'

export function createAxios(
  config: CreateAxiosDefaults,
  getRefreshTokenApi: RefreshApiPromise,
  storage: Storage,
  onRequest: onRequest,
  onResponse?: onResponse,
  onError?: onError,
) {
  const axios = _axios.create(config)

  setupResponseInterceptor(axios, getRefreshTokenApi, storage, onRequest, onResponse, onError)

  return axios
}
