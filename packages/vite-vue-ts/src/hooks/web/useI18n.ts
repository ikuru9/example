import { i18n } from '/@/locales/setupI18n'

type I18nGlobalTranslation = {
  (key: string): string
  (key: string, locale: string): string
  (key: string, locale: string, list: unknown[]): string
  (key: string, locale: string, named: Record<string, unknown>): string
  (key: string, list: unknown[]): string
  (key: string, named: Record<string, unknown>): string
}

function getKey(key: string, namespace?: string) {
  if (!namespace) {
    return key
  }
  if (key.startsWith(namespace)) {
    return key
  }
  return `${namespace}.${key}`
}

export function useI18n(namespace?: string): {
  t: I18nGlobalTranslation
} {
  const normalFn = {
    t: (key: string) => {
      return getKey(key, namespace)
    },
  }

  if (!i18n) {
    return normalFn
  }

  const { t, ...methods } = i18n.global

  const tFn: I18nGlobalTranslation = (key: string, ...arg: never[]) => {
    if (!key) return ''
    if (!key.includes('.') && !namespace) return key
    return t(getKey(key, namespace), ...arg)
  }
  return {
    ...methods,
    t: tFn,
  }
}

// Why write this function？
// Mainly to configure the vscode i18nn ally plugin. This function is only used for routing and menus. Please use useI18n for other places
export const t = (key: string) => key
