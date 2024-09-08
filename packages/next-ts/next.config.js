const path = require('node:path')
const { deepmerge } = require('deepmerge-ts')

const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const defaultNextConfig = {
  // 운영 서버 인 경우 *.sample 파일 제외
  pageExtensions: !isProd
    ? ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'].flatMap((ext) => [`sample.${ext}`, ext])
    : undefined,
  swcMinify: true,
  output: 'standalone',
  experimental: {
    instrumentationHook: true,
    // this includes files from the monorepo base two directories up
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
      },
    ],
  },
  webpack(config, { isServer }) {
    if (isServer) {
      // next server build => ignore msw/browser
      if (Array.isArray(config.resolve.alias)) {
        config.resolve.alias.push({
          name: 'msw/browser',
          alias: false,
        })
      } else {
        config.resolve.alias['msw/browser'] = false
      }
    } else {
      // browser => ignore msw/node
      if (Array.isArray(config.resolve.alias)) {
        config.resolve.alias.push({ name: 'msw/node', alias: false })
      } else {
        config.resolve.alias['msw/node'] = false
      }
    }

    return config
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
