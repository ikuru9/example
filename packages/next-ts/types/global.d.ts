declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ENV: 'local' | 'dev' | 'text' | 'prod'
    }
  }
}

export {}
