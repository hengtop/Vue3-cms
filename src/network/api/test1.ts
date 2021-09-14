//各类接口编写
import vueRequest from '../index';
interface DataType {
  data: any;
  returnCode: string;
  success: boolean;
}
export const test = (): Promise<DataType> => {
  return vueRequest.request<DataType>({
    url: '/home/multidata',
    method: 'GET',
    showLoading: true,
    interceptors: {
      requestInterceptor: (config) => {
        console.log('单个请求的拦截器');
        return config;
      },
      responseInterceptor: (res) => {
        console.log('单个响应的拦截器');
        return res;
      }
    }
  });
};
