<template>
  <div class="tab-bar-container">
    <a-tag
      v-for="(tag, index) in tagList"
      :key="tag.fullPath"
      :color="tag.fullPath === $route.fullPath ? 'blue' : ''"
      @click="goto(tag)"
      @close="tagClose(tag, index)"
      :closable="index > 0"
    >
      {{ tag.title }}
    </a-tag>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'
import { listenerRouteChange } from '@/utils/route-listener'
import { useTabBarStore } from '@/stores'
import type { TagProps } from '@/stores/modules/tab-bar/types'

const tabBarStore = useTabBarStore()

const router = useRouter()
const tagList = computed(() => {
  return tabBarStore.getTabList
})

listenerRouteChange((route: RouteLocationNormalized) => {
  if (!route.meta.noAffix && !tagList.value.some((tag) => tag.fullPath === route.fullPath)) {
    tabBarStore.updateTabList(route)
  }
}, true)
const tagClose = (tag: TagProps, idx: number) => {
  tabBarStore.deleteTag(idx, tag)
  if (idx === tagList.value.length) {
    const latest = tagList.value[tagList.value.length - 1]
    router.push({ name: latest.name })
  }
}
const goto = (tag: TagProps) => {
  router.push({ ...tag })
}
</script>

<style scoped lang="less">
.tab-bar-container {
  background-color: #fff;
  padding: 5px 20px;
  border-bottom: 1px solid rgb(229, 230, 235);
}
</style>
