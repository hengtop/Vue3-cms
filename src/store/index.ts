import { createStore, useStore as useVuexStore, Store } from 'vuex';
import type { RootState } from './types';
import type { RootStateWithModule } from './types';
import login from './module/login/login';

const store = createStore<RootState>({
  state() {
    return {
      name: '',
      age: 12
    };
  },
  mutations: {},
  actions: {},
  modules: {
    login
  }
});

//保证vuex数据持久化
export const setupStore = () => {
  store.dispatch('login/loadLocalLoginData');
};

//自己导出一个具有类型的useStore hook
export const useStore = (): Store<RootStateWithModule> => {
  return useVuexStore();
};

export default store;
