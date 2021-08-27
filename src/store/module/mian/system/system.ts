import { Module } from 'vuex';
import {
  deletePageData,
  getPageListData,
  createPageData,
  editPageData
} from '@/network/api/main/system/system';
import type { RootState } from '@/store/types';
import type { SystemState } from './types';

const systemModule: Module<SystemState, RootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    };
  },
  getters: {
    getPageListData(state: SystemState) {
      return (pageName: string) => {
        switch (pageName) {
          case 'users':
            return state.usersList;
          case 'role':
            return state.roleList;
          case 'goods':
            return state.goodsList;
          case 'menu':
            return state.menuList;
        }
      };
    },
    getPageListCount(state) {
      return (pageName: string) => {
        //与上面的函数一样，这里两种写法
        return (state as any)[`${pageName}Count`];
      };
    }
  },
  mutations: {
    changeusersList(state, usersList: any[]) {
      state.usersList = usersList;
    },
    changeusersCount(state, usersCount: number) {
      state.usersCount = usersCount;
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList;
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount;
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList;
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount;
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList;
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount;
    }
  },
  actions: {
    //发送请求获取列表数据
    async getPageListAction({ commit }, payload: any) {
      const pageName = payload.pageName;
      let pageUrl = '';
      switch (pageName) {
        case 'users':
          pageUrl = '/users/list';
          break;
        case 'role':
          pageUrl = '/role/list';
          break;
        case 'goods':
          pageUrl = '/goods/list';
          break;
        case 'menu':
          pageUrl = '/menu/list';
      }
      const pageListRes = await getPageListData(pageUrl, payload.queryInfo);
      const { list, totalCount } = pageListRes.data;
      switch (pageName) {
        case 'users':
          commit('changeusersList', list);
          commit('changeusersCount', totalCount);
          break;
        case 'role':
          commit('changeRoleList', list);
          commit('changeRoleCount', totalCount);
          break;
        case 'goods':
          commit('changeGoodsList', list);
          commit('changeGoodsCount', totalCount);
          break;
        case 'menu':
          commit('changeMenuList', list);
          commit('changeMenuCount', totalCount);
      }
    },
    //删除某条列表数据
    async deletePageDataAction({ dispatch }, payload: any) {
      const { pageName, id } = payload;
      const pageUrl = `${pageName}/${id}`;
      await deletePageData(pageUrl);
      //重新请求最新数据
      dispatch('getPageListAction', {
        pageName,
        //todo 这里可以将页面的搜索参数和分页数据放置在vuex中共享
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    },

    //新建数据
    async createPageDataAction({ dispatch }, payload: any) {
      const { pageName, newData } = payload;
      const pageUrl = `/${pageName}`;
      await createPageData(pageUrl, newData);
      //请求最新数据
      dispatch('getPageListAction', {
        pageName,
        //todo 这里可以将页面的搜索参数和分页数据放置在vuex中共享
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    },
    //编辑数据
    async editPageDataAction({ dispatch }, payload: any) {
      const { pageName, newData, id } = payload;
      const pageUrl = `/${pageName}/${id}`;
      await editPageData(pageUrl, newData);
      //请求最新数据
      dispatch('getPageListAction', {
        pageName,
        //todo 这里可以将页面的搜索参数和分页数据放置在vuex中共享
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    }
  }
};

export default systemModule;
