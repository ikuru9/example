import type { App } from 'vue'
import type { Router } from 'vue-router'
import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'

const WHITE_NAME_LIST: string[] = []

const isSSR = import.meta.env.SSR
const publicPath = import.meta.env.VITE_PUBLIC_PATH

// app router
export const router: Router = createRouter({
  history: isSSR
    ? createMemoryHistory(publicPath)
    : createWebHistory(publicPath),
  routes: setupLayouts(generatedRoutes),
  strict: true,
})

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

// config router
export function setupRouter(app: App<Element>) {
  app.use(router)
}
