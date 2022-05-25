import type { RouteLocationNormalized } from 'vue-router'
import { defineStore } from 'pinia'
import { TabBarState, TagProps } from './types'

const formatTag = (route: RouteLocationNormalized): TagProps => {
  const { name, meta, fullPath, query } = route
  return {
    title: meta.title || '',
    name: String(name),
    fullPath,
    query,
  }
}

const useAppStore = defineStore('tabBar', {
  state: (): TabBarState => ({
    tagList: [],
  }),

  getters: {
    getTabList(): TagProps[] {
      return this.tagList
    },
  },

  actions: {
    updateTabList(route: RouteLocationNormalized) {
      this.tagList.push(formatTag(route))
    },
    deleteTag(idx: number, tag: TagProps) {
      this.tagList.splice(idx, 1)
    },
  },
})

export default useAppStore
