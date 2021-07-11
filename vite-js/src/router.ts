import {
  Router,
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
} from 'vue-router'
import routes from 'virtual:generated-pages'

export function createRouter(): Router {
  return _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
  })
}
