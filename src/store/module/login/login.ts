import { Module } from 'vuex';
import type { LoginState } from './types';
import type { RootState } from '../../types';
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMeunsByRoleId
} from '@/network/api/login/login';
import type { AccountType } from '@/network/api/login/types';
import localCache from '@/utils/cache';
import router from '@/router';
//Module这个类型需要传入泛型，一个是模块中state的类型，一个是根模块中state的类型
const loginModule: Module<LoginState, RootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    };
  },
  getters: {},
  mutations: {
    //保存token
    changeToken(state, token: string) {
      state.token = token;
    },
    //保存用户信息
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    //保存用户菜单信息
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus;
    }
  },
  actions: {
    //1.调用接口获取token
    async accountLoginAction({ commit }, payload: AccountType) {
      const loginRes = await accountLoginRequest(payload);
      const { id, token } = loginRes.data;
      commit('changeToken', token);
      localCache.setCache('token', token);

      //2.通过id获取用户信息
      const userInfoRes = await getUserInfoById(id);
      const userInfo = userInfoRes.data;
      commit('changeUserInfo', userInfo);
      localCache.setCache('userInfo', userInfo);

      //3.获取用户菜单信息
      const userMenusRes = await getUserMeunsByRoleId(userInfo.role.id);
      const userMenus = userMenusRes.data;
      commit('changeUserMenus', userMenus);
      localCache.setCache('userMenus', userMenus);

      //跳转到首页
      router.push('/main');
    },
    //手机加验证码方式登录，暂未实现
    /* phoneLoginAction({ commit }, payload: any) {
      console.log('执行action', payload);
    }, */
    
    //保证刷新vuex中的数据持久化
    loadLocalLoginData({ commit }) {
      const token = localCache.getCache('token');
      if (token) {
        commit('changeToken', token);
      }
      const userInfo = localCache.getCache('userInfo');
      if (userInfo) {
        commit('changeUserInfo', userInfo);
      }
      const userMenus = localCache.getCache('userMenus');
      if (userMenus) {
        commit('changeUserMenus', userMenus);
      }
    }
  }
};

export default loginModule;
