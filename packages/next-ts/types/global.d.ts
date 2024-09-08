declare global {
  namespace NodeJS {
    interface PrivateProcessEnv {
      APP_ENV: 'local' | 'dev' | 'text' | 'prod'
    }

    interface PublicProcessEnv {
      NEXT_PUBLIC_API_URI?: string
      NEXT_PUBLIC_API_MOCKING?: 'enabled'
    }
    interface ProcessEnv extends PrivateProcessEnv, PublicProcessEnv {}
  }
}

export type {}
