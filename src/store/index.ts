import { createStore, useStore as useVuexStore, Store } from 'vuex';
import type { RootState } from './types';
import type { RootStateWithModule } from './types';
import login from './module/login/login';
import system from './module/mian/system/system';
import dashboard from './module/mian/analysis/dashboard';
import { getPageListData } from '@/network/api/main/system/system';
import { getavatarById } from '@/network/api/fileLoader/avatarLoader';

const store = createStore<RootState>({
  state() {
    return {
      name: '',
      age: 12,
      //部门数据，角色数据
      entireDepartment: [],
      entireRole: [],
      entireMenu: [],
      avatarUrl: ''
    };
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list;
    },
    changeEntireRole(state, list) {
      state.entireRole = list;
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list;
    },
    changeAvatarUrl(state, url) {
      state.avatarUrl = url;
    }
  },
  actions: {
    //获取一些初始化数据
    async getInitialDataAction({ commit }) {
      const {
        data: { list: deapartmentList }
      } = await getPageListData('department/list', {
        offset: 0,
        size: 1000
      });
      const {
        data: { list: roleList }
      } = await getPageListData('role/list', {
        offset: 0,
        size: 1000
      });
      const {
        data: { list: menuList }
      } = await getPageListData('menu/list', {
        offset: 0,
        size: 1000
      });
      //获取头像

      const avatarRes: any = await getavatarById('15');
      //解析图片数据流
      const blob = new Blob([avatarRes], { type: 'image/jpeg' });
      const imgUrl = URL.createObjectURL(blob);

      //保存
      commit('changeEntireDepartment', deapartmentList);
      commit('changeEntireRole', roleList);
      commit('changeEntireMenu', menuList);
      commit('changeAvatarUrl', imgUrl);
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
});

//保证vuex数据持久化
export const setupStore = (): void => {
  store.dispatch('login/loadLocalLoginData');
};

//自己导出一个具有类型的useStore hook
export const useStore = (): Store<RootStateWithModule> => {
  return useVuexStore();
};

export default store;
