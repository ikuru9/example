import { type CreateAxiosDefaults, default as _axios } from 'axios'
import {
  type RefreshApiPromise,
  type onError,
  onRequest,
  type onResponse,
  setupResponseInterceptor,
} from './interceptor'
import { Storage } from './storage'

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
