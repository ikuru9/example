import { ref, watch } from 'vue'

import { isDef } from '/@/utils/is'

interface Options {
  target?: HTMLElement
}

export function useCopyToClipboard(initial?: string) {
  const clipboardRef = ref(initial || '')
  const isSuccessRef = ref(false)
  const copiedRef = ref(false)

  watch(
    clipboardRef,
    async (str?: string) => {
      if (isDef(str)) {
        copiedRef.value = true
        isSuccessRef.value = await copyTextToClipboard(str)
      }
    },
    { immediate: !!initial, flush: 'sync' }
  )

  return { clipboardRef, isSuccessRef, copiedRef }
}

export async function copyTextToClipboard(
  input: string,
  { target = document.body }: Options = {}
) {
  const element = document.createElement('textarea')
  const previouslyFocusedElement = document.activeElement

  element.value = input

  element.setAttribute('readonly', '')
  element.style.contain = 'strict'
  element.style.position = 'absolute'
  element.style.left = '-9999px'
  element.style.fontSize = '12pt'

  const selection = document.getSelection()
  let originalRange
  if (selection && selection.rangeCount > 0) {
    originalRange = selection.getRangeAt(0)
  }

  target.append(element)
  element.select()

  element.selectionStart = 0
  element.selectionEnd = input.length

  let isSuccess = false
  try {
    await navigator.clipboard.writeText('copy')
    isSuccess = true
  } catch (e: unknown) {
    throw e as Error
  }

  element.remove()

  if (originalRange && selection) {
    selection.removeAllRanges()
    selection.addRange(originalRange)
  }

  if (previouslyFocusedElement) {
    ;(previouslyFocusedElement as HTMLElement).focus()
  }
  return isSuccess
}
