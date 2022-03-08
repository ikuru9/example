import { router, setupRouter } from '/@/router'
import { setupStore } from '/@/store'
import { createApp, createSSRApp } from 'vue'

import '/@/styles/index.scss'
import App from '/@/App.vue'
import { setupRouterGuards } from '/@/router/guards'

const isSSR = import.meta.env.SSR

async function bootstrap() {
  const app = isSSR ? createSSRApp(App) : createApp(App)

  if (import.meta.env.VITE_USE_MOCK) {
    const { createMock } = await import('../mocks')
    await createMock(isSSR)
  }

  setupStore(app)

  setupRouter(app)

  setupRouterGuards(router)

  app.mount('#app')
}

bootstrap()
