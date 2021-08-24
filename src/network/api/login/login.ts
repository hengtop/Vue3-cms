import vueRequest from '../../index';
import type { AccountType, LoginDataType } from './types';

enum LoginAPI {
  AccountLogin = '/login',
  GetUserInfo = '/users/',
  GetUserMenus = '/role/'
}

//登录获取token和用户id
export const accountLoginRequest = (account: AccountType): Promise<LoginDataType> => {
  return vueRequest.request<LoginDataType>({
    url: LoginAPI.AccountLogin,
    method: 'POST',
    data: {
      name: account.username,
      password: account.password
    }
  });
};

//通过id获取用户信息
export const getUserInfoById = (id: number): Promise<LoginDataType> => {
  return vueRequest.request<LoginDataType>({
    url: LoginAPI.GetUserInfo + id,
    method: 'get',
    showLoading: false
  });
};

//通过用户id获取菜单
export const getUserMeunsByRoleId = (id: number): Promise<LoginDataType> => {
  return vueRequest.request<LoginDataType>({
    url: LoginAPI.GetUserMenus + id + '/menu',
    method: 'get',
    showLoading: false
  });
};
