import type { LocaleSetting, LocaleType } from '/#/config'

import { defineStore } from 'pinia'
import { store } from '/@/store'

import { LOCALE_KEY } from '/@/enums/cacheEnum'
import { localeSetting } from '/@/settings/localeSetting'

const localeStorage = window.localStorage.getItem(LOCALE_KEY)
  ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    JSON.parse(window.localStorage.getItem(LOCALE_KEY)!)
  : null

const lsLocaleSetting = (localeStorage || localeSetting) as LocaleSetting

interface LocaleState {
  localInfo: LocaleSetting
}

export const useLocaleStore = defineStore({
  id: 'app-locale',
  state: (): LocaleState => ({
    localInfo: lsLocaleSetting,
  }),
  getters: {
    getShowPicker(): boolean {
      return !!this.localInfo?.showPicker
    },
    getLocale(): LocaleType {
      return this.localInfo?.locale ?? 'zh_CN'
    },
  },
  actions: {
    /**
     * Set up multilingual information and cache
     * @param info multilingual info
     */
    setLocaleInfo(info: Partial<LocaleSetting>) {
      this.localInfo = { ...this.localInfo, ...info }
      window.localStorage.setItem(LOCALE_KEY, JSON.stringify(this.localInfo))
    },
    /**
     * Initialize multilingual information and load the existing configuration from the local cache
     */
    initLocale() {
      this.setLocaleInfo({
        ...localeSetting,
        ...this.localInfo,
      })
    },
  },
})

// Need to be used outside the setup
export function useLocaleStoreWithOut() {
  return useLocaleStore(store)
}
