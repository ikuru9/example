import type { App, Plugin } from 'vue'
import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router'
import { isObject } from '/@/utils/is'

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(
  baseUrl: string,
  obj: Recordable<string | number | boolean>
): string {
  let parameters = ''
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
  }
  parameters = parameters.replace(/&$/, '')
  return /\?$/.test(baseUrl)
    ? baseUrl + parameters
    : baseUrl.replace(/\/?$/, '?') + parameters
}

const LINE_FEED = 10 // '\n'

function getByteLength(decimal: number) {
  return decimal >> 7 || LINE_FEED === decimal ? 2 : 1
}

export function getByte(str: string) {
  return str
    .split('')
    .map((s) => s.charCodeAt(0))
    .reduce(
      (prev, unicodeDecimalValue) => prev + getByteLength(unicodeDecimalValue),
      0
    )
}

export function getLimitedByteText(inputText: string, maxByte: number) {
  const characters = inputText.split('')
  const _maxByte = maxByte + 1
  let validText = ''
  let totalByte = 0

  for (let i = 0, size = characters.length; i < size; i += 1) {
    const character = characters[i]
    const decimal = character.charCodeAt(0)
    const byte = getByteLength(decimal) // 글자 한 개가 몇 바이트 길이인지 구해주기

    // 현재까지의 바이트 길이와 더해 최대 바이트 길이를 넘지 않으면
    if (totalByte + byte < _maxByte) {
      totalByte += byte // 바이트 길이 값을 더해 현재까지의 총 바이트 길이 값을 구함
      validText += character // 글자를 더해 현재까지의 총 문자열 값을 구함
    } else {
      // 최대 바이트 길이를 넘으면
      break // for 루프 종료
    }
  }

  return validText
}

export function deepMerge<T>(src: any, target: any): T {
  let key: string
  for (key in target) {
    src[key] = isObject(src[key])
      ? deepMerge(src[key], target[key])
      : (src[key] = target[key])
  }
  return src
}

export function openWindow(
  url: string,
  opt?: {
    target?: TargetContext | string
    noopener?: boolean
    noreferrer?: boolean
  }
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {}
  const feature: string[] = []

  noopener && feature.push('noopener=yes')
  noreferrer && feature.push('noreferrer=yes')

  window.open(url, target, feature.join(','))
}

export function getRawRoute(
  route: RouteLocationNormalized
): RouteLocationNormalized {
  if (!route) return route
  const { matched, ...opt } = route
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  }
}

export const withInstall = <T>(component: T, alias?: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const comp = component as any
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, comp)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as T & Plugin
}
