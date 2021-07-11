module.exports = function () {
  if (typeof window === 'undefined') {
    const { server } = require('./server.ts')

    return server.listen({
      onUnhandledRequest: 'bypass',
    })
  } else {
    const { worker } = require('./browser.ts')

    return worker.start({
      onUnhandledRequest: 'bypass',
    })
  }
}
