import VueRequest from '@/network/request';
import localCache from '@/utils/cache';

const fileLoaderRequest = new VueRequest({
  baseURL: process.env.VUE_APP_FILE_LOADER_URL,
  timeout: 8000,
  interceptors: {
    requestInterceptor: (config) => {
      //获取token加入请求头中
      const token = localCache.getCache('token');
      if (token) {
        config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoic2FiZXIiLCJpYXQiOjE2MzE2MjI5NzgsImV4cCI6MTYzMTYyNjU3OH0.kSwhFfeeAVqRagpGEQ89UBqgRc3KLYhQqTx_6PRwOkZVFBjRRTQMdvpXsKfhKlnHmgDwMxU0S3Px7J5Rj0lONlTws5J9WzYIrKZ0N8kmsv_Hmw3wTyX0SC88AzGUyTgaS4e41urqn172ywx_hm5O6HJq0n9ypZNfP4T0JLyMCHQ`;
      }
      console.log('单个实例请求成功的拦截');
      return config;
    }
  }
});

export default fileLoaderRequest;
