/**
 *  Introduces component library styles on demand.
 * https://github.com/anncwb/vite-plugin-style-import
 */
import { createStyleImportPlugin } from 'vite-plugin-style-import'

export function configStyleImportPlugin(_isBuild: boolean) {
  // if (!isBuild) {
  //   return [];
  // }
  const styleImportPlugin = createStyleImportPlugin({})
  return styleImportPlugin
}
