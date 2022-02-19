import 'vue-router'

declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component
}

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    layout: string
  }
}
