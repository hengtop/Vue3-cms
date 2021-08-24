import { createApp } from 'vue';
import registerApp from './global';
//引入默认样式
import 'normalize.css';
import './assets/css/index.less';
import App from './App.vue';
import router from './router';
import store from './store';
import { setupStore } from './store';
const app = createApp(App);
//use中如果传入函数vue会调用函数并传入app这个参数
app.use(store).use(router).use(registerApp).mount('#app');
//刷新后更新vuex中数据
setupStore();
