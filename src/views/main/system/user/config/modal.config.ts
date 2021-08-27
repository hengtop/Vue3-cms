import type { saberFormType } from '@/base-ui/form/types';
export const modalConfig: saberFormType = {
  labelWidth: '80px', //表格标签宽度
  itemStyle: { with: '100%' },
  formItems: [
    {
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户用户名',
      field: 'name'
    },
    {
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入用户真实姓名',
      field: 'realname'
    },
    {
      type: 'password',
      label: '用户密码',
      placeholder: '请输入用户密码',
      field: 'password',
      isHidden: true
    },
    {
      type: 'input',
      label: '电话号码',
      placeholder: '请输入用户电话号码',
      field: 'cellphone'
    },
    {
      type: 'select',
      label: '选择部门',
      placeholder: '请选择部门',
      field: 'departmentId',
      options: []
    },
    {
      type: 'select',
      label: '选择角色',
      placeholder: '请选择角色',
      field: 'roleId',
      options: []
    }
  ],
  itemLayout: {
    //独占一行
    span: 24
  }
};
