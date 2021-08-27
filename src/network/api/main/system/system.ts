import systemModule from '@/store/module/mian/system/system';
import vueRequest from '../../../index';
import type { SystemType } from './types';

export const getPageListData = (url: string, queryInfo: any): Promise<SystemType> => {
  return vueRequest.request<SystemType>({
    url: url,
    method: 'POST',
    data: queryInfo
  });
};

//删除操作
export const deletePageData = (url: string): Promise<SystemType> => {
  return vueRequest.request<SystemType>({
    url: url,
    method: 'DELETE'
  });
};

//新增操作
export const createPageData = (url: string, newData: any): Promise<SystemType> => {
  return vueRequest.request<SystemType>({
    url: url,
    method: 'POST',
    data: newData
  });
};
//编辑
export const editPageData = (url: string, editData: any): Promise<SystemType> => {
  return vueRequest.request<SystemType>({
    url: url,
    method: 'PATCH',
    data: editData
  });
};
