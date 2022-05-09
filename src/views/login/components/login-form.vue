<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">Nest Vue Admin</div>
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <a-form
      ref="loginForm"
      :model="userInfo"
      name="normal_login"
      class="login-form"
      layout="vertical"
      @finish="onFinish"
    >
      <a-form-item
        label="用户名"
        name="username"
        :rules="[{ required: true, message: '请输入用户名' }]"
      >
        <a-input v-model:value="userInfo.username">
          <template #prefix>
            <user-outlined />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        label="密码"
        name="password"
        :rules="[{ required: true, message: '请输入密码' }]"
      >
        <a-input-password v-model:value="userInfo.password" allow-clear>
          <template #prefix>
            <lock-outlined />
          </template>
        </a-input-password>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <div class="login-form-password-actions">
          <a-checkbox
            :checked="loginConfig.rememberPassword"
            @change="setRememberPassword"
          >
            记住密码
          </a-checkbox>
        </div>
        <a-button type="primary" html-type="submit" long :loading="loading">
          登录
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { useStorage } from "@vueuse/core";
import { useUserStore } from "@/stores";
import useLoading from "@/hooks/loading";
import { LoginData } from "@/api/user";

const router = useRouter();
const errorMessage = ref("");
const { loading, setLoading } = useLoading();
const userStore = useUserStore();

const loginConfig = useStorage("login-config", {
  rememberPassword: true,
  username: "", // 演示默认值
  password: "", // demo default value
});
const userInfo = reactive({
  username: loginConfig.value.username,
  password: loginConfig.value.password,
});

const onFinish = async (values: LoginData) => {
  setLoading(true);
  try {
    await userStore.login(values);
    const { redirect, ...othersQuery } = router.currentRoute.value.query;
    router.push({
      name: (redirect as string) || "Workplace",
      query: {
        ...othersQuery,
      },
    });
    message.success("登录成功");
    const { rememberPassword } = loginConfig.value;
    const { username, password } = values;
    // 实际生产环境需要进行加密存储。
    // The actual production environment requires encrypted storage.
    loginConfig.value.username = rememberPassword ? username : "";
    loginConfig.value.password = rememberPassword ? password : "";
  } catch (err) {
    errorMessage.value = (err as Error).message;
  } finally {
    setLoading(false);
  }
};
const setRememberPassword = (e: any) => {
  loginConfig.value.rememberPassword = e.target.checked;
};
</script>

<style lang="less" scoped>
.login-form {
  &-wrapper {
    width: 320px;
  }

  &-title {
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
  }

  &-error-msg {
    height: 32px;
    color: #ff4d4f;
    line-height: 32px;
  }
}
</style>
