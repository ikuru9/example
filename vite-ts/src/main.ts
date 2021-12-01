import App from '@/App.vue'
import { createRouter } from '@/router'
import { createStore, key } from '@/store'
import { createApp as _createApp, createSSRApp } from 'vue'
import { createMock } from '../mocks'
import './style.css'

const isSSR = import.meta.env.SSR

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function createApp() {
  const app = isSSR ? createSSRApp(App) : _createApp(App)
  const router = createRouter()
  const store = createStore()

  app.use(router)
  app.use(store, key)

  return { app, store, router }
}

if (import.meta.env.VITE_API_MOCKING === 'enabled') {
  createMock(isSSR).then(() => {
    createApp().app.mount('#app')
  })
} else {
  createApp().app.mount('#app')
}
