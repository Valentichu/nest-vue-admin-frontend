<template>
  <div class="navbar">
    <div class="left-side">
      <a-space>
        <a-typography-title :style="{ margin: 0, fontSize: '18px' }" :level="5">
          Nest Vue Admin
        </a-typography-title>
      </a-space>
    </div>
    <div class="right-side">
      <a-dropdown :trigger="['click']">
        <a-avatar
          :size="32"
          :style="{
            marginRight: '16px',
            cursor: 'pointer',
            backgroundColor: '#87d068',
          }"
        >
          <template #icon>
            <user-outlined />
          </template>
        </a-avatar>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a-space @click="handleLogout">
                <export-outlined />
                <span> 登出 </span>
              </a-space>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useUser from '@/hooks/user'
const { logout } = useUser()
const handleLogout = () => {
  logout()
}
</script>

<style scoped lang="less">
.navbar {
  display: flex;
  justify-content: space-between;
  height: 100%;
  background-color: white;
  border-bottom: 1px solid rgb(229, 230, 235);
}

.left-side,
.right-side {
  display: flex;
  align-items: center;
  padding-left: 20px;
}
</style>
