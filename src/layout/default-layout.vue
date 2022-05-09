<template>
  <a-layout class="layout">
    <a-layout-header v-if="navbar" class="layout-navbar" :style="{ height: `${navbarHeight}px` }">
      <Navbar />
    </a-layout-header>

    <a-layout>
      <a-layout-sider v-if="renderMenu" class="layout-sider" :width="menuWidth">
        <Menu></Menu>
      </a-layout-sider>
      <!-- <a-layout-content class="layout-content" :style="paddingStyle">
        <TabBar v-if="appStore.tabBar" />
        <PageLayout />
      </a-layout-content> -->
    </a-layout>

    <!-- <a-layout-footer v-if="footer">
      <Footer></Footer>
    </a-layout-footer> -->
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
const navbar = computed(() => appStore.navbar);
const navbarHeight = computed(() => appStore.navbarHeight);
const renderMenu = computed(() => appStore.menu);
const footer = computed(() => appStore.footer);
const menuWidth = computed(() => {
  return appStore.menuCollapse ? 48 : appStore.menuWidth;
});
const collapsed = computed(() => {
  return appStore.menuCollapse;
});
const setCollapsed = (val: boolean) => {
  appStore.updateSettings({ menuCollapse: val });
};
watch(
  () => userStore.permissions,
  (permissions) => {
    if (permissions && !permission.accessRoute(route))
      router.push({ name: "notFound" });
  }
);
</script>

<style scoped lang="less">
@nav-size-height: 60px;
@layout-max-width: 1100px;

.layout {
  width: 100%;
  height: 100vh;
}

.layout-navbar {
  padding: 0;
}

.layout-sider {
  background-color: white;
}

</style>
