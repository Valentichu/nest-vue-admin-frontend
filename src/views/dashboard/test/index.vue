<template>
  <div class="page-container">
    <Breadcrumb :items="['首页', '测试页面']" />
  </div>
</template>

<script lang="ts" setup>
import Breadcrumb from '@/components/breadcrumb/index.vue'
</script>

<script lang="ts">
export default {
  name: 'Demo', // If you want the include property of keep-alive to take effect, you must name the component
}
</script>

<style lang="less" scoped></style>
