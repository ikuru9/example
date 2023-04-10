export type LocaleType = 'en' | 'ko_KR'

export interface GlobEnvConfig {
  // Site title
  VITE_GLOB_APP_TITLE: string
  // Service interface url
  VITE_GLOB_API_URL: string

  VITE_GLOB_APP_SHORT_NAME: string
  VITE_GLOB_API_URL_PREFIX: string
  VITE_GLOB_UPLOAD_URL: string
}

export interface LocaleSetting {
  showPicker: boolean
  // Current language
  locale: LocaleType
  // default language
  fallback: LocaleType
  // available Locales
  availableLocales: LocaleType[]
}
