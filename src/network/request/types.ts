//使得我们可以选择性的传入拦截器
import { AxiosRequestConfig, AxiosResponse } from 'axios';
//我们需要扩展下AxiosRequestConfig这个接口
interface VueRequestInterInterceptor {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (config: any) => any;
  responseInterceptorCatch?: (error: any) => any;
}
//继承AxiosRequestConfig这个接口
interface VueRequestConfig extends AxiosRequestConfig {
  interceptors?: VueRequestInterInterceptor;
  showLoading?: boolean;
}

export { VueRequestInterInterceptor, VueRequestConfig };
