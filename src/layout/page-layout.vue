<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade-transform" mode="out-in" appear>
      <component :is="Component" :key="route.fullPath" />
    </transition>
  </router-view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useTabBarStore } from '@/stores'

const tabBarStore = useTabBarStore()
</script>

<style scoped lang="less">
/*fade-transform*/
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s ease;
}
.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
