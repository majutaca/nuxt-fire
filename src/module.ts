import { defineNuxtModule, addPlugin, createResolver, addImportsDir } from '@nuxt/kit'
//import type { FirebaseOptions } from 'firebase/firebase'
import { markRaw } from 'vue'

type EmulatorConfigParam = {
  host: string
  port: number
}

type FirebaseEmulatorConfig = {
  auth?: EmulatorConfigParam
  database?: EmulatorConfigParam
  storage?: EmulatorConfigParam
  functions?: EmulatorConfigParam
  firestore?: EmulatorConfigParam
}
// Module options TypeScript interface definition
export interface ModuleOptions {
  //config?: FirebaseOptions,
  config?: any,
  emulatorConfig?: FirebaseEmulatorConfig,
  analyticsEnabled?: boolean,
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt3-fire',
    configKey: 'nuxtFire',
    compatibility: {
      nuxt: '>=3.0.0'
    }
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup (options, nuxt) {
    if(!options.config) {
      throw new Error('No Firebase config provided, Please provide one in nuxt.config.js')
    }
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = resolve('./runtime')

    // Let plugins and users access the firebase config
    nuxt.options.appConfig.firebaseConfig = markRaw(options.config)
    if (options.emulatorConfig) {
      nuxt.options.appConfig.emulatorConfig = markRaw(options.emulatorConfig)
    }
    if (options.analyticsEnabled) {
      nuxt.options.appConfig.analyticsEnabled = options.analyticsEnabled
    }

    //nuxt.options.build.transpile.push(runtimeDir)

    // Add the plugins
    addPlugin(resolve('./runtime/firebase/plugin.client'))

    // Import composables
    addImportsDir(runtimeDir + '/firebase/composables')

  }
})
