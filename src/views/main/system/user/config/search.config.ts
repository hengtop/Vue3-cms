import type { saberFormType } from '@/base-ui/form/types';

//配置表格属性
export const searchFormConfig: saberFormType = {
  labelWidth: '120px', //表格标签宽度
  //itemLayout: { span: 8 }, //布局方式
  itemStyle: { padding: '10px 18  px' }, //每个输入框的内边距
  //详细配置
  formItems: [
    {
      type: 'input',
      label: 'id',
      placeholder: '请输入用户id',
      field: 'id'
    },
    {
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名',
      field: 'name'
    },
    {
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名',
      field: 'realname'
    },
    {
      type: 'select',
      label: '用户状态',
      placeholder: '请选择请选择用户状态',
      field: 'enable',
      options: [
        { title: '启用', value: 1 },
        { title: '禁用', value: 0 }
      ],
      otherOptions: {
        style: 'width:100%'
      }
    },
    {
      type: 'datepicker',
      label: '创建时间',
      placeholder: '选择时间',
      field: 'createAt',
      otherOptions: {
        style: 'width:100%',
        'start-placeholder': '开始时间',
        'end-placeholder': '结束时间',
        type: 'daterange'
      }
    }
  ]
};
