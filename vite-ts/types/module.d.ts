declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    layout: string
  }
}

export {}
