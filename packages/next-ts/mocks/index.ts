export async function createMock() {
  if (typeof window === 'undefined') {
    const server = (await import('./server')).worker

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
