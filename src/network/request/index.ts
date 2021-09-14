//封装axios
import axios from 'axios';
import { ElLoading } from 'element-plus';
//导入类型
import type { AxiosInstance } from 'axios';
import type { VueRequestConfig, VueRequestInterInterceptor } from './types';
import type { ILoadingInstance } from 'element-plus/packages/loading/src/loading.type';

const DEAFULT_LOADING = true;

export default class VueRequest {
  instance: AxiosInstance;
  interceptors?: VueRequestInterInterceptor;
  loading?: ILoadingInstance;
  showLoading?: boolean;
  constructor(config: VueRequestConfig) {
    //创建一个axios实例
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    this.showLoading = config.showLoading ?? DEAFULT_LOADING;
    //配置拦截器
    //请求
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    //响应
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
    //每个实例的请求都有的拦截器
    this.instance.interceptors.request.use((config) => {
      if (this.showLoading) {
        this.loading = ElLoading.service({
          fullscreen: true,
          lock: true,
          text: '正在加载中。。。'
        });
      }
      console.log('每个实例都有的拦截器');
      return config;
    });
    this.instance.interceptors.response.use((res) => {
      this.loading?.close();
      return res.data;
    });
  }
  request<T>(config: VueRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      //单个请求的请求拦截器,这里的请求和响应拦截器为我们自己定义的回调函数，不是axios内部的
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      // 判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          //单个请求的响应拦截器
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          //将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING;
          resolve(res);
        })
        .catch((err) => {
          this.showLoading = DEAFULT_LOADING;
          reject(err);
        });
    });
  }
}
