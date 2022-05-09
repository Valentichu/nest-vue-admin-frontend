<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :header-style="{ paddingBottom: '0' }"
      :body-style="{
        padding: '20px',
      }"
    >
      <template #title> 查看 </template>
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
import useLoading from "@/hooks/loading";

const { loading } = useLoading();
</script>

<style scoped lang="less"></style>
