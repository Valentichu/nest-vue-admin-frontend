import { defineStore } from 'pinia'
import defaultSettings from '@/config/settings.json'
import { AppState } from './types'

const useAppStore = defineStore('app', {
  state: (): AppState => ({ ...defaultSettings }),
})

export default useAppStore
