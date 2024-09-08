'use client'

import { useEffect, useState } from 'react'

export default function MSWProvider({ children }: React.PropsWithChildren) {
  const [ready, setReady] = useState<ServiceWorkerRegistration>()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const init = async () => {
        const { worker } = await import('../../mocks/browser')
        setReady(
          await worker.start({
            onUnhandledRequest: 'bypass',
          }),
        )
      }

      if (!ready) {
        init()
      }
    }
  }, [ready])

  if (!ready) {
    return null
  }

  return <>{children}</>
}
