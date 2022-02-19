/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />
/// <reference types="vite-plugin-vue-layouts/client" />

interface ImportMetaEnv extends ViteEnv {
  readonly __: unknown
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare interface ViteEnv {
  readonly VITE_PORT: number
  readonly VITE_USE_MOCK: boolean
  readonly VITE_PUBLIC_PATH: string
  readonly VITE_PROXY: [string, string][]
  readonly VITE_GLOB_APP_TITLE: string
  readonly VITE_GLOB_APP_SHORT_NAME: string
  readonly VITE_USE_CDN: boolean
  readonly VITE_DROP_CONSOLE: boolean
  readonly VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
  readonly VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
  readonly VITE_LEGACY: boolean
  readonly VITE_USE_IMAGEMIN: boolean
}
