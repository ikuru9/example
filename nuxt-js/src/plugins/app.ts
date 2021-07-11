import { Plugin } from '@nuxt/types'
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import permission from '@/directives/permission'

const app: Plugin = () => {
  Vue.directive('permission', permission)
  Vue.use(VueCompositionAPI)
}

export default app
