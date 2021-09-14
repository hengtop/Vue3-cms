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
import { mapMenusToRoutes } from '@/router/map-menus';
import { mapMenusToPermissions } from '@/utils/menusPermission';

//Module这个类型需要传入泛型，一个是模块中state的类型，一个是根模块中state的类型
const loginModule: Module<LoginState, RootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
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
      //动态生成路由
      const routes = mapMenusToRoutes(userMenus);
      routes.forEach((route) => {
        //为·/main·动态添加子路由
        router.addRoute('main', route);
      });

      //获取菜单权限
      const permissions = mapMenusToPermissions(userMenus);
      state.permissions = permissions;
    }
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: AccountType) {
      //1.调用接口获取token
      const loginRes = await accountLoginRequest(payload);
      const { id, token } = loginRes.data;
      commit('changeToken', token);
      localCache.setCache('token', token);

      //获取一些初始化数据请求（所有的角色和部门信息）
      dispatch('getInitialDataAction', null, { root: true });

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

    //保证刷新vuex中的数据持久化,
    loadLocalLoginData({ commit, dispatch }) {
      const token = localCache.getCache('token');
      if (token) {
        commit('changeToken', token);
        //获取一些初始化数据请求（所有的角色和部门信息）
        dispatch('getInitialDataAction', null, { root: true });
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
