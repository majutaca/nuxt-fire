import type { Database } from 'firebase/database'
import { useNuxtApp } from '#app'

export const useDatabase = (): Database => useNuxtApp().$database
