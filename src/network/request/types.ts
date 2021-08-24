//使得我们可以选择性的传入拦截器
import { AxiosRequestConfig, AxiosResponse } from 'axios';
//我们需要扩展下AxiosRequestConfig这个接口,注意这里使用泛型主要是为例规范返回结果res的类型
interface VueRequestInterInterceptor<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}
//继承AxiosRequestConfig这个接口
interface VueRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: VueRequestInterInterceptor<T>;
  showLoading?: boolean;
}

export { VueRequestInterInterceptor, VueRequestConfig };
