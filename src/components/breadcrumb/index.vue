<template>
  <a-breadcrumb>
    <a-breadcrumb-item>
      <windows-outlined />
    </a-breadcrumb-item>
    <a-breadcrumb-item v-for="item in items" :key="item">
      {{ item }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'

defineProps({
  items: {
    type: Array as PropType<string[]>,
    default() {
      return []
    },
  },
})
</script>

<style scoped lang="less"></style>
