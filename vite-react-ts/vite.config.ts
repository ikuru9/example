import { defineConfig, loadEnv, ConfigEnv, UserConfigExport } from 'vite'
import pkg from './package.json'
import dayjs from 'dayjs'
import { resolve } from 'path'

import { wrapperEnv } from './build/utils'
import { createVitePlugins } from './build/vite/plugin'
import { createProxy } from './build/vite/proxy'
import { OUTPUT_DIR } from './build/constant'

const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
}

// https://vitejs.dev/config/
export default function viteConfig({
  command,
  mode,
}: ConfigEnv): UserConfigExport {
  const root = process.cwd()
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv
  const isBuild = command === 'build'

  return defineConfig({
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: {
        '/@/': `${resolve(process.cwd(), 'src')}/`,
        '/#/': `${resolve(process.cwd(), 'types')}/`,
      },
    },
    server: {
      // https: true,
      // Listening on all local IPs
      host: true,
      port: VITE_PORT,
      // Load proxy configuration from .env
      proxy: createProxy(VITE_PROXY),
    },
    define: {
      // setting vue-i18-next
      // Suppress warning
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: OUTPUT_DIR,
      // minify: 'terser',
      // terserOptions: {
      //   compress: {
      //     keep_infinity: true,
      //     drop_console: VITE_DROP_CONSOLE,
      //   },
      // },
      // Turning off brotliSize display can slightly reduce packaging time
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
    optimizeDeps: {
      include: [],
    },
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: '@use "~/styles/variables.scss" as *;',
        },
      },
    },
    plugins: createVitePlugins(viteEnv, isBuild),
  })
}
