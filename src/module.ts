import { defineNuxtModule, addPlugin, createResolver, addImports } from '@nuxt/kit'
//import type { FirebaseOptions } from 'firebase/app'
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

    nuxt.options.build.transpile.push(runtimeDir)

    // Add the plugins
    addPlugin(resolve('./runtime/app/plugin.client'))
    addPlugin(resolve('./runtime/analytics/plugin.client'))
    addPlugin(resolve('./runtime/auth/plugin.client'))
    addPlugin(resolve('./runtime/firestore/plugin.client'))
    addPlugin(resolve('./runtime/database/plugin.client'))
    addPlugin(resolve('./runtime/storage/plugin.client'))
    addPlugin(resolve('./runtime/functions/plugin.client'))

    // Import composables
    addImports([
      {
        from: resolve('./runtime/app/composables'),
        name: 'useFirebaseApp'
      },
      {
        from: resolve('./runtime/analytics/composables'),
        name: 'useAnalytics'
      },
      {
        from: resolve('./runtime/auth/composables'),
        name: 'useAuth'
      },
      {
        from: resolve('./runtime/firestore/composables'),
        name: 'useFirestore'
      },
      {
        from: resolve('./runtime/database/composables'),
        name: 'useDatabase'
      },
      {
        from: resolve('./runtime/storage/composables'),
        name: 'useStorage'
      },
      {
        from: resolve('./runtime/functions/composables'),
        name: 'useFunctions'
      }
    ])
  }
})
