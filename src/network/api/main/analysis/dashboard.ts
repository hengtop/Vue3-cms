import vueRequest from '@/network';
import type { DashboardType } from './types';

enum DashboardAPI {
  AmountList = '/goods/amount/list',
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}

export const getCategoryGoodsCount = (): Promise<DashboardType> => {
  return vueRequest.request<DashboardType>({
    method: 'GET',
    url: DashboardAPI.categoryGoodsCount
  });
};

export const getCategoryGoodsSale = (): Promise<DashboardType> => {
  return vueRequest.request<DashboardType>({
    method: 'GET',
    url: DashboardAPI.categoryGoodsSale
  });
};

export const getCategoryGoodsFavor = (): Promise<DashboardType> => {
  return vueRequest.request<DashboardType>({
    method: 'GET',
    url: DashboardAPI.categoryGoodsFavor
  });
};

export const getAddressGoodsSale = (): Promise<DashboardType> => {
  return vueRequest.request<DashboardType>({
    method: 'GET',
    url: DashboardAPI.addressGoodsSale
  });
};
export const getAmountList = (): Promise<DashboardType> => {
  return vueRequest.request<DashboardType>({
    method: 'GET',
    url: DashboardAPI.AmountList
  });
};
