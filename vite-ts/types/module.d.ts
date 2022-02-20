declare module '*.vue' {
  import { defineComponent } from 'vue'
  const Component: ReturnType<typeof defineComponent>
  export default Component
}

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    layout: string
  }
}

export {}
