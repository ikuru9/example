<script lang="ts">
import { defineComponent, toRefs, ref, unref } from 'vue'
import { createAppProviderContext } from '../src/useAppContext'
import { createBreakpointListen } from '/@/hooks/event/useBreakpoint'
import { prefixCls } from '/@/settings/designSetting'
// import { useAppStore } from '/@/store/app'

export default defineComponent({
  name: 'AppProvider',
  inheritAttrs: false,
  props: {
    /**
     * class style prefix
     */
    prefixCls: { type: String, default: prefixCls },
  },
  setup(props, { slots }) {
    const isMobile = ref(false)
    const isSetState = ref(false)
    // Monitor screen breakpoint information changes
    createBreakpointListen(({ screenMap, sizeEnum, width }) => {
      const lgWidth = screenMap.get(sizeEnum.LG)
      if (lgWidth) {
        isMobile.value = width.value - 1 < lgWidth
      }
      handleRestoreState()
    })
    const { prefixCls } = toRefs(props)
    // Inject variables into the global
    createAppProviderContext({ prefixCls, isMobile })

    // TODO: Menu settings
    // const appStore = useAppStore()
    /**
     * Used to maintain the state before the window changes
     */
    function handleRestoreState() {
      if (unref(isMobile)) {
        if (!unref(isSetState)) {
          isSetState.value = true
          // TODO: Menu settings
        }
      } else {
        if (unref(isSetState)) {
          isSetState.value = false
          // TODO: Menu settings
        }
      }
    }
    return () => slots.default?.()
  },
})
</script>
