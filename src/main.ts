import { createApp } from 'vue';
import router from './router';
import store from './stores';
import directive from './directive';
import App from './App.vue';

import '@/assets/style/global.less';
import '@/api/interceptor';

const app = createApp(App);

app.use(router);
app.use(store);
app.use(directive);

app.mount('#app');
