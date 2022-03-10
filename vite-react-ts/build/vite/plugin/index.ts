import type { PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import Pages from 'vite-plugin-pages'
import legacy from '@vitejs/plugin-legacy'
import { configHtmlPlugin } from './html'
import { configCompressPlugin } from './compress'
import { configStyleImportPlugin } from './styleImport'
import { configVisualizerConfig } from './visualizer'
import { configImageminPlugin } from './imageMin'
import { configSvgIconsPlugin } from './svgSprite'
import { configPwaConfig } from './pwa'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_USE_IMAGEMIN,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // have to
    react(),
    Pages({
      routeBlockLang: 'yaml',
      exclude: ['**/components/*.vue'],
    }),
  ]

  // @vitejs/plugin-legacy
  VITE_LEGACY && isBuild && vitePlugins.push(legacy())

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild))

  // vite-plugin-style-import
  vitePlugins.push(configStyleImportPlugin(isBuild))

  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizerConfig())

  // The following plugins only work in the production environment
  if (isBuild) {
    // vite-plugin-imagemin
    VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin())

    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(
        VITE_BUILD_COMPRESS,
        VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
      )
    )

    // vite-plugin-pwa
    vitePlugins.push(configPwaConfig(viteEnv))
  }

  return vitePlugins
}
