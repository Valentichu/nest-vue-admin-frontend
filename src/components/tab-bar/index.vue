<template>
  <div class="tab-bar-container">
    <a-affix ref="affixRef" :offset-top="offsetTop">
      <div class="tab-bar-box">
        <div class="tab-bar-scroll">
          <div class="tags-wrap">
            <span
              v-for="(tag, index) in tagList"
              :key="tag.fullPath"
              :class="{ 'link-actived': tag.fullPath === $route.fullPath }"
              @click="goto(tag)"
            >
              <span class="tag-link">
                {{ tag.title }}
              </span>
              <span
                @click.stop="tagClose(tag, index)"
              >
                <icon-close />
              </span>
            </span>
          </div>
        </div>
        <div class="tag-bar-operation"></div>
      </div>
    </a-affix>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import type { RouteLocationNormalized } from 'vue-router';
  import { listenerRouteChange } from '@/utils/route-listener';
  import { useAppStore, useTabBarStore } from '@/stores';
  import type { TagProps } from '@/stores/modules/tab-bar/types';

  const appStore = useAppStore();
  const tabBarStore = useTabBarStore();

  const router = useRouter();
  const affixRef = ref();
  const tagList = computed(() => {
    return tabBarStore.getTabList;
  });
  const offsetTop = computed(() => {
    return appStore.navbar ? 60 : 0;
  });

  watch(
    () => appStore.navbar,
    () => {
      affixRef.value.updatePosition();
    }
  );
  listenerRouteChange((route: RouteLocationNormalized) => {
    if (
      !route.meta.noAffix &&
      !tagList.value.some((tag) => tag.fullPath === route.fullPath)
    ) {
      tabBarStore.updateTabList(route);
    }
  }, true);
  const tagClose = (tag: TagProps, idx: number) => {
    tabBarStore.deleteTag(idx, tag);
    if (idx === tagList.value.length) {
      const latest = tagList.value[tagList.value.length - 1];
      router.push({ name: latest.name });
    }
  };
  const goto = (tag: TagProps) => {
    router.push({ ...tag });
  };
</script>

<style scoped lang="less">
  .tab-bar-container {
    position: relative;
    background-color: var(--color-bg-2);
    .tab-bar-box {
      display: flex;
      padding: 0 0 0 20px;
      background-color: var(--color-bg-2);
      border-bottom: 1px solid var(--color-border);
      .tab-bar-scroll {
        height: 32px;
        flex: 1;
        overflow: hidden;
        .tags-wrap {
          padding: 4px 0;
          height: 42px;
          white-space: nowrap;
          overflow-x: auto;
        }
      }
    }

    .tag-bar-operation {
      width: 100px;
      height: 32px;
    }
  }

  .tag-link {
    color: var(--color-text-2);
    text-decoration: none;
  }
  .link-actived {
    color: rgb(var(--link-6));
    .tag-link {
      color: rgb(var(--link-6));
    }
  }
</style>
