import type { Functions } from 'firebase/functions'
import { useNuxtApp } from '#app'

export const useFunctions = (): Functions => useNuxtApp().$functions
