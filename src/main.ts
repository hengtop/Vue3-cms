import { createApp } from 'vue';
import registerApp from './global';
import App from './App.vue';
import router from './router';
import store from './store';
import { test } from './network/api/test1';
test().then((res) => {
  console.log(res);
  console.log(res.);
});
const app = createApp(App);
//use中如果传入函数vue会调用函数并传入app这个参数
app.use(store).use(router).use(registerApp).mount('#app');
