const path = require('node:path')
const { deepmerge } = require('deepmerge-ts')

const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const defaultNextConfig = {
  swcMinify: true,
  output: 'standalone',
  experimental: {
    // this includes files from the monorepo base two directories up
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
}

if (isProd) {
  /** @type {import('next').NextConfig} */
  const prodNextConfig = {
    compiler: {
      removeConsole: isProd
        ? {
            exclude: ['error'],
          }
        : undefined,
    },
  }
  module.exports = deepmerge(defaultNextConfig, prodNextConfig)
} else {
  module.exports = defaultNextConfig
}
