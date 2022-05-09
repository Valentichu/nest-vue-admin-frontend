<template>
  <div class="banner">
    <div class="banner-inner">
      <img src="@/assets/images/login-banner.png" alt="" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.banner {
  display: flex;
  align-items: center;
  justify-content: center;

  &-inner {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 70%;
    }
  }
}
</style>
