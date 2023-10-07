import { StartReturnType } from 'msw/lib/types/setupWorker/glossary'

export async function createMock(isSSR: boolean): Promise<StartReturnType> {
  await import('../public/mockServiceWorker.js?worker')

  if (isSSR) {
    const server = (await import('./server')).server

    server.listen({
      onUnhandledRequest: 'bypass',
    })
  } else {
    const worker = (await import('./browser')).worker

    return worker.start({
      onUnhandledRequest: 'bypass',
    })
  }
}
