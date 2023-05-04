import type { Auth } from 'firebase/auth'
import { useNuxtApp } from '#app'

export const useAuth = (): Auth => useNuxtApp().$auth
