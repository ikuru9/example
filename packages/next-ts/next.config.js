const path = require('node:path')
const { deepmerge } = require('deepmerge-ts')

const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const defaultNextConfig = {
  // 운영 서버 인 경우 *.sample. 파일 제외
  pageExtensions: !isProd
    ? ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'].flatMap((ext) => [`sample.${ext}`, ext])
    : undefined,
  swcMinify: true,
  output: 'standalone',
  experimental: {
    // this includes files from the monorepo base two directories up
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'robohash.org',
        port: '',
      },
    ],
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
