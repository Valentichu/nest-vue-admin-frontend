<template>
  <a-card
    class="general-card"
    title="文档"
    :header-style="{ paddingBottom: 0 }"
    :body-style="{ paddingTop: 0 }"
    style="height: 160px"
  >
    <template #extra>
      <a-link>查看更多</a-link>
    </template>
    <a-row>
      <a-col :span="12">
        <a-link> 查看 </a-link>
      </a-col>
      <a-col :span="12">
        <a-link> 查看 </a-link>
      </a-col>
      <a-col :span="12">
        <a-link> 查看 </a-link>
      </a-col>
      <a-col :span="12">
        <a-link> 查看 </a-link>
      </a-col>
    </a-row>
  </a-card>
</template>

<style lang="less" scoped></style>
