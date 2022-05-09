import axios from 'axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { message, Modal } from 'ant-design-vue';
import { useUserStore } from '@/stores';
import { getToken } from '@/utils/auth';

export interface HttpResponse<T = unknown> {
  msg: string;
  code: number;
  data: T;
}

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // let each request carry token
    // this example using the JWT token
    // Authorization is a custom headers key
    // please modify it according to the actual situation
    const token = getToken();
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);
// add response interceptors
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res = response.data;
    // if the custom code is not 200, it is judged as an error.
    if (![200, 401].includes(res.code)) {
      message.error({
        content: res.msg || '接口异常，请联系管理员',
        duration: 5,
      });
      // 401: token失效
      if (
        [401].includes(res.code)
      ) {
        Modal.error({
          title: '登出',
          content:
            '你的登录已经失效，请重新登录',
          okText: '重新登录',
          async onOk() {
            const userStore = useUserStore();

            await userStore.logout();
            window.location.reload();
          },
        });
      }
      return Promise.reject(new Error(res.msg || '接口异常，请联系管理员'));
    }
    return res;
  },
  (error) => {
    message.error({
      content: error.msg || '网络异常，请联系管理员',
      duration: 5,
    });
    return Promise.reject(new Error('网络异常，请联系管理员'));
  }
);
