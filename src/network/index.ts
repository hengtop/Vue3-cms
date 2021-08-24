//导出请求的实例
import VueRequest from './request';
import localCache from '@/utils/cache';

const vueRequest = new VueRequest({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000,
  interceptors: {
    requestInterceptor: (config) => {
      //获取token加入请求头中
      const token = localCache.getCache('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log('单个实例请求成功的拦截');
      return config;
    },
    requestInterceptorCatch: (err) => {
      console.log('请求失败的拦截');
      return err;
    },
    responseInterceptor: (config) => {
      console.log('单个实例响应成功的拦截');
      return config;
    },
    responseInterceptorCatch: (err) => {
      console.log('响应失败的拦截');
      return err;
    }
  }
});
export default vueRequest;
