<template>
  <a-layout class="layout">
    <a-layout-header
      v-if="appStore.navbar"
      class="layout-navbar"
      :style="{ height: `${navbarHeight}px` }"
    >
      <Navbar />
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        v-if="appStore.menu"
        class="layout-sider"
        :width="menuWidth"
      >
        <Menu></Menu>
      </a-layout-sider>
      <a-layout-content class="layout-content">
        <TabBar v-if="appStore.tabBar" />
        <div class="layout-main">
          <PageLayout />
          <Footer v-if="appStore.footer"></Footer>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { ref, computed, watch, provide } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAppStore, useUserStore } from "@/stores";
import usePermission from "@/hooks/permission";
import PageLayout from "./page-layout.vue";
import Navbar from "@/components/navbar/index.vue";
import Menu from "@/components/menu/index.vue";
import Footer from "@/components/footer/index.vue";
import TabBar from "@/components/tab-bar/index.vue";

const appStore = useAppStore();
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const permission = usePermission();
const navbarHeight = computed(() => appStore.navbarHeight);
const menuWidth = computed(() => {
  return appStore.menuCollapse ? 48 : appStore.menuWidth;
});
watch(
  () => userStore.permissions,
  (permissions) => {
    if (permissions && !permission.accessRoute(route))
      router.push({ name: "notFound" });
  }
);
</script>

<style scoped lang="less">
.layout {
  width: 100%;
  height: 100vh;
}

.layout-navbar {
  padding: 0;
}

.layout-sider {
  background-color: white;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 8%);
}

.layout-content {
  display: flex;
  flex-direction: column;
}

.layout-main {
  height: 0;
  flex: auto;
  overflow: auto;
}
</style>
