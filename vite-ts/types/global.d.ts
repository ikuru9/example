import type { VNodeChild, PropType as VuePropType } from 'vue'

declare global {
  type __APP_INFO__ = {
    pkg: {
      name: string
      version: string
      dependencies: Recordable<string>
      devDependencies: Recordable<string>
    }
    lastBuildTime: string
  }

  // vue
  type PropType<T> = VuePropType<T>
  type VueNode = VNodeChild | JSX.Element

  export type Writable<T> = {
    -readonly [P in keyof T]: T[P]
  }

  type Nullable<T> = T | null
  type Recordable<T = unknown> = Record<string, T>
  type ReadonlyRecordable<T = unknown> = {
    readonly [key: string]: T
  }

  interface ImportMetaEnv extends ViteEnv {
    readonly __: unknown
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }

  interface ViteEnv {
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
    readonly VITE_USE_PWA: boolean
  }
}

export {}
