export async function createMock(isSSR: boolean): Promise<void> {
  await import('../public/mockServiceWorker.js?worker')

  if (isSSR) {
    const server = (await import('./server')).server

    server.listen({
      onUnhandledRequest: 'bypass',
    })
  } else {
    const worker = (await import('./browser')).worker

    worker.start({
      onUnhandledRequest: 'bypass',
    })
  }
}
