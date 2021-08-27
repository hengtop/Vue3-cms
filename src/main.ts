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
app.use(store);
//刷新后更新vuex中数据，这里执行顺序很重要，此时刷新保证路由(保证动态路由生成完毕后再跳转，否则可能会跳转到404)跳转正确
setupStore();
app.use(router);
app.use(registerApp);

app.mount('#app');
