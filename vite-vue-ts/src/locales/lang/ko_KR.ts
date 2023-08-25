import { genMessage } from '../helper'
import antdLocale from 'ant-design-vue/es/locale/ko_KR'

const modules = import.meta.glob('./ko_KR/**/*.ts')
export default {
  message: {
    ...genMessage(modules, 'ko_KR'),
    antdLocale,
  },
  dateLocale: null,
  dateLocaleName: 'ko_KR',
}
