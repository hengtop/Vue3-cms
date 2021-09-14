import type { saberFormType } from '@/base-ui/form/types';
export const modalConfig: saberFormType = {
  labelWidth: '80px', //表格标签宽度
  itemStyle: { with: '100%' },
  formItems: [
    {
      type: 'input',
      label: '角色名',
      placeholder: '请输入角色名',
      field: 'name'
    },
    {
      type: 'input',
      label: '角色介绍',
      placeholder: '请输入角色介绍',
      field: 'intro'
    }
  ],
  itemLayout: {
    //独占一行
    span: 24
  }
};
