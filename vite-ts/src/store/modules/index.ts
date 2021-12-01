import { ModuleTree } from 'vuex'

export function loadModules(): {
  contents: Array<string>
  modules: { [key: string]: ModuleTree<unknown> }
} {
  const context = import.meta.globEager('./[^(index)].ts$/')

  const modules: { [key: string]: ModuleTree<unknown> } = {}

  const contents = Object.keys(context)

  contents.forEach((key: string) => {
    modules[key.replace(/(\.\/|\.ts)/g, '')] = {
      namespaced: true,
      ...context[key].default,
    }
  })

  return { contents, modules }
}
