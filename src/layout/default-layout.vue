<template>
  <a-layout class="layout">
    <a-layout-header v-if="navbar" class="layout-navbar">
      <Navbar />
    </a-layout-header>

    <a-layout>
      <a-layout-sider v-if="renderMenu" v-show="!hideMenu" class="layout-sider" :collapsed="collapsed"
        :collapsible="true" :width="menuWidth" :style="{ paddingTop: navbar ? '60px' : '' }" :hide-trigger="true"
        @collapse="setCollapsed">
        <div class="menu-wrapper">
          <Menu></Menu>
        </div>
      </a-layout-sider>
      <a-layout-content class="layout-content" :style="paddingStyle">
        <TabBar v-if="appStore.tabBar" />
        <PageLayout />
      </a-layout-content>
    </a-layout>

    <a-layout-footer v-if="footer">
      <Footer></Footer>
    </a-layout-footer>
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
const navbarHeight = `60px`;
const navbar = computed(() => appStore.navbar);
const renderMenu = computed(() => appStore.menu);
const hideMenu = computed(() => appStore.hideMenu);
const footer = computed(() => appStore.footer);
const menuWidth = computed(() => {
  return appStore.menuCollapse ? 48 : appStore.menuWidth;
});
const collapsed = computed(() => {
  return appStore.menuCollapse;
});
const paddingStyle = computed(() => {
  const paddingLeft =
    renderMenu.value && !hideMenu.value
      ? { paddingLeft: `${menuWidth.value}px` }
      : {};
  const paddingTop = navbar.value ? { paddingTop: navbarHeight } : {};
  return { ...paddingLeft, ...paddingTop };
});
const setCollapsed = (val: boolean) => {
  appStore.updateSettings({ menuCollapse: val });
};
watch(
  () => userStore.permissions,
  (roleValue) => {
    if (roleValue && !permission.accessRoute(route))
      router.push({ name: "notFound" });
  }
);
const drawerVisible = ref(false);
const drawerCancel = () => {
  drawerVisible.value = false;
};
provide("toggleDrawerMenu", () => {
  drawerVisible.value = !drawerVisible.value;
});
</script>

<style scoped lang="less">
@nav-size-height: 60px;
@layout-max-width: 1100px;

.layout {
  width: 100%;
  height: 100%;
}

.layout-navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  padding: 0;
  height: @nav-size-height;
}

.layout-sider {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  height: 100%;
  transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  &::after {
    position: absolute;
    top: 0;
    right: -1px;
    display: block;
    width: 1px;
    height: 100%;
    background-color: var(--color-border);
    content: "";
  }
}

.menu-wrapper {
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
}

.layout-content {
  min-height: 100vh;
  overflow-y: hidden;
  transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
}
</style>
