<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: NuxtFire
- Package name: nuxt3-fire
- Description: My new Nuxt module
-->

# NuxtFire

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

My new Nuxt module for doing amazing things.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt3-fire?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->
- ⛰ &nbsp;Foo
- 🚠 &nbsp;Bar
- 🌲 &nbsp;Baz

## Quick Setup

1. Add `nuxt3-fire` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt3-fire

# Using yarn
yarn add --dev nuxt3-fire

# Using npm
npm install --save-dev nuxt3-fire
```

2. Add `nuxt3-fire` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt3-fire'
  ],
  nuxtFire: {
    // Your Firebase project config, obtained from the Firebase console
    config: {
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
      measurementId: ''
    },
    // Optionally specify emulator config in development mode
    emulatorConfig: {
        auth: { host: 'localhost', port: 9099 },
        firestore: { host: 'localhost', port: 8080 },
        functions: { host: 'localhost', port: 5001 },
        storage: { host: 'localhost', port: 9199 },
        database: { host: 'localhost', port: 9000 }
    },
    // Optionally enable analytics (default: false), only in production mode
    analyticsEnabled: true
  }
})
```

That's it! You can now use NuxtFire in your Nuxt app ✨

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt3-fire/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt3-fire

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt3-fire.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt3-fire

[license-src]: https://img.shields.io/npm/l/nuxt3-fire.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt3-fire

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
