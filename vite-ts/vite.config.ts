import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { join } from 'path'
import { defineConfig, loadEnv, UserConfig, UserConfigExport } from 'vite'
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default function viteConfig({ mode }: UserConfig): UserConfigExport {
  const viteEnv = loadEnv(mode, process.cwd())

  console.log('mode', mode)
  console.log('env', viteEnv)

  return defineConfig({
    resolve: {
      alias: {
        '@': join(__dirname, 'src'),
      },
    },
    server: {
      proxy: {
        '/sample-api/': {
          target: 'http://dummy.restapiexample.com',
          changeOrigin: true,
          rewrite: (path) => {
            const rePath = path.replace(/^\/sample-api/, '/api')
            console.log('rePath', rePath)
            return path.replace(/^\/sample-api/, '/api')
          },
        },
      },
    },
    plugins: [vue(), vueJsx(), Pages()],
  })
}
