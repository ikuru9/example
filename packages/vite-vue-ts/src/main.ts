import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import '/@/design/index.less'
import 'virtual:windi-utilities.css'
// Register icon sprite
import 'virtual:svg-icons-register'
import App from './App.vue'
import { setupErrorHandle } from '/@/logics/error-handle'
import { router, setupRouter } from '/@/router'
import { setupRouterGuards } from '/@/router/guards'
import { setupGlobDirectives } from '/@/directives'
import { setupI18n } from '/@/locales/setupI18n'
import { registerGlobComp } from '/@/components/registerGlobComp'
import { setupStore } from '/@/store'
import { createApp, createSSRApp } from 'vue'

const isSSR = import.meta.env.SSR

async function bootstrap() {
  const app = isSSR ? createSSRApp(App) : createApp(App)

  // FIXME: build 시 오류 발생
  // if (import.meta.env.VITE_USE_MOCK) {
  //   const createMock = (await import('../mocks')).createMock
  //   await createMock(isSSR)
  // }

  setupStore(app)

  // Register global components
  registerGlobComp(app)

  // Multilingual configuration
  // Asynchronous case: language files may be obtained from the server side
  await setupI18n(app)

  // Register global directive
  setupGlobDirectives(app)

  // Configure global error handling
  setupErrorHandle(app)

  setupRouter(app)

  setupRouterGuards(router)

  app.mount('#app')
}

bootstrap()
