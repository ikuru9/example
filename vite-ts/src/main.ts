import { router, setupRouter } from '/@/router'
import { setupStore } from '/@/store'
import { createApp, createSSRApp } from 'vue'
import { createMock } from '../mocks'

import '@/styles/index.scss'
import App from '/@/App.vue'
import { setupRouterGuards } from '/@/router/guards'

const isSSR = import.meta.env.SSR

async function bootstrap() {
  const app = isSSR ? createSSRApp(App) : createApp(App)

  setupStore(app)

  setupRouter(app)

  setupRouterGuards(router)

  if (import.meta.env.VITE_USE_MOCK) {
    await createMock(isSSR)
  }

  app.mount('#app')
}

bootstrap()
