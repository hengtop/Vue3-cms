import type { saberFormType } from '@/base-ui/form/types';
export const modalConfig: saberFormType = {
  labelWidth: '80px', //表格标签宽度
  itemStyle: { with: '100%' },
  formItems: [
    {
      type: 'input',
      label: '部门名称',
      placeholder: '请输入部门名称',
      field: 'name'
    },

    {
      type: 'input',
      label: '领导名称',
      placeholder: '请输入领导名称',
      field: 'leader'
    },
    {
      type: 'select',
      label: '上级部门',
      placeholder: '请选择上级部门',
      field: 'parentId',
      options: []
    }
  ],
  itemLayout: {
    //独占一行
    span: 24
  }
};
