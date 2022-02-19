import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layout from 'vite-plugin-vue-layouts'
import legacy from '@vitejs/plugin-legacy'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import { configHtmlPlugin } from './html'
import { configCompressPlugin } from './compress'
import { configStyleImportPlugin } from './styleImport'
import { configVisualizerConfig } from './visualizer'
import { configImageminPlugin } from './imagemin'
import { configSvgIconsPlugin } from './svgSprite'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    VITE_USE_IMAGEMIN,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // have to
    vue(),
    // support name
    vueSetupExtend(),
    Pages({
      routeBlockLang: 'yaml',
    }),
    Layout(),
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
      ...configCompressPlugin(
        VITE_BUILD_COMPRESS,
        VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
      )
    )
  }

  return vitePlugins
}
