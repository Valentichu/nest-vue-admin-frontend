import { createApp } from 'vue'
import router from './router'
import store from './stores'
import directive from './directive'
import App from './App.vue'
import { AreaChartOutlined } from '@ant-design/icons-vue'

import '@/assets/style/global.less'
import 'ant-design-vue/es/message/style/css'
import 'ant-design-vue/es/modal/style/css'
import '@/api/interceptor'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

const app = createApp(App)

app.use(router)
app.use(store)
app.use(directive)
app.component('AreaChartOutlined', AreaChartOutlined)

app.mount('#app')
