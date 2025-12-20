import type { CreateAxiosDefaults } from "axios";
import { default as _axios } from "axios";
import { setupInterceptor } from "./interceptor";
import type { TokenStorage } from "./token-storage";
import type { RefreshTokenReturnType, fnRefreshApi, onError, onRequest, onResponse } from "./type";

export function createAxios<
  Token extends RefreshTokenReturnType,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  T = any,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  D = any,
>(
  config: CreateAxiosDefaults<D>,
  fetchRefreshTokenApi: fnRefreshApi<Token>,
  storage: TokenStorage,
  onRequest: onRequest<D>,
  onResponse?: onResponse<T, D>,
  onError?: onError,
) {
  const axios = _axios.create(config);

  setupInterceptor(axios, fetchRefreshTokenApi, storage, onRequest, onResponse, onError);

  return axios;
}
