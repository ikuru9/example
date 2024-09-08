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
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.ts',
        },
      },
    },
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

    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'))

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

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
