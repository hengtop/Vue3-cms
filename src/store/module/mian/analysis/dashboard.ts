import { Module } from 'vuex';
import {
  getAmountList,
  getAddressGoodsSale,
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getCategoryGoodsSale
} from '@/network/api/main/analysis/dashboard';

import type { DashboardState } from './types';
import type { RootState } from '../../../types';

const dashboardModule: Module<DashboardState, RootState> = {
  namespaced: true,
  state() {
    return {
      amountList: [],
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    };
  },
  mutations: {
    changeAmountList(state, list) {
      state.amountList = list;
    },
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list;
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list;
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list;
    },
    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list;
    }
  },
  actions: {
    //请求获取图表数据
    async getDashboardDataAction({ commit }) {
      const { data: amountListRes } = await getAmountList();
      commit('changeAmountList', amountListRes);

      const { data: categoryGoodsCountRes } = await getCategoryGoodsCount();
      commit('changeCategoryGoodsSale', categoryGoodsCountRes);

      const { data: categoryGoodsSaleRes } = await getCategoryGoodsSale();
      commit('changeCategoryGoodsCount', categoryGoodsSaleRes);

      const { data: categoryGoodsFavorRes } = await getCategoryGoodsFavor();
      commit('changeCategoryGoodsFavor', categoryGoodsFavorRes);

      const { data: addressGoodsSaleRes } = await getAddressGoodsSale();
      commit('changeAddressGoodsSale', addressGoodsSaleRes);
    }
  }
};

export default dashboardModule;
