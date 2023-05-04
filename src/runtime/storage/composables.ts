import type { FirebaseStorage } from 'firebase/storage'
import { useNuxtApp } from '#app'

export const useStorage = (): FirebaseStorage => useNuxtApp().$storage
