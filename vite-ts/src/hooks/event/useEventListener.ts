import type { Ref } from 'vue'
import { ref, watch, unref } from 'vue'
import { useThrottleFn, useDebounceFn } from '@vueuse/core'

export type RemoveEventFn = () => void
export interface UseEventParams {
  el?: Element | Ref<Element | undefined> | Window
  name: string
  listener: EventListener
  options?: boolean | AddEventListenerOptions
  autoRemove?: boolean
  isDebounce?: boolean
  wait?: number
}
export function useEventListener({
  el = window,
  name,
  listener,
  options,
  autoRemove = true,
  isDebounce = true,
  wait = 80,
}: UseEventParams): { removeEvent: RemoveEventFn } {
  const isAddRef = ref(false)

  if (el) {
    const element = ref(el as Element) as Ref<Element>

    const handler = isDebounce
      ? useDebounceFn(listener, wait)
      : useThrottleFn(listener, wait)
    const realHandler = wait ? handler : listener
    const removeEventListener = (e: Element) => {
      isAddRef.value = true
      e.removeEventListener(name, realHandler, options)
    }
    const addEventListener = (e: Element) =>
      e.addEventListener(name, realHandler, options)

    const removeWatch = watch(
      element,
      (v, _ov, cleanUp) => {
        if (v) {
          !unref(isAddRef) && addEventListener(v)
          cleanUp(() => {
            autoRemove && removeEventListener(v)
          })
        }
      },
      { immediate: true }
    )

    const removeEvent = () => {
      removeEventListener(element.value)
      removeWatch()
    }

    return {
      removeEvent,
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return { removeEvent: () => {} }
}
