const TOKEN_KEY = 'TOKEN__'

export function getToken(): Nullable<string> {
  return window.localStorage.getItem(TOKEN_KEY + 'ACCESS')
}

export function setToken(value: string): void {
  window.localStorage.setItem(TOKEN_KEY + 'ACCESS', value)
}
export function removeToken() {
  window.localStorage.removeItem(TOKEN_KEY + 'ACCESS')
}

export function getRefreshToken(): Nullable<string> {
  return window.localStorage.getItem(TOKEN_KEY + 'REFRESH')
}

export function setRefreshToken(value: string): void {
  window.localStorage.setItem(TOKEN_KEY + 'REFRESH', value)
}

export function removeRefreshToken() {
  window.localStorage.removeItem(TOKEN_KEY + 'REFRESH')
}
