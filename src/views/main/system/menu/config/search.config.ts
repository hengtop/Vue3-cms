import type { saberFormType } from '@/base-ui/form/types';

//配置表格属性
export const searchFormConfig: saberFormType = {
  labelWidth: '120px', //表格标签宽度
  //itemLayout: { span: 8 }, //布局方式
  itemStyle: { padding: '10px 25px' }, //每个输入框的内边距
  //详细配置
  formItems: [
    {
      type: 'input',
      label: '角色名称',
      placeholder: '请输入角色名称',
      field: 'name'
    },
    {
      type: 'input',
      label: '权限介绍',
      placeholder: '请输入权限介绍',
      field: 'intro'
    },
    {
      type: 'datepicker',
      label: '创建时间',
      placeholder: '选择时间',
      field: 'createTime',
      otherOptions: {
        style: 'width:100%',
        'start-placeholder': '开始时间',
        'end-placeholder': '结束时间',
        type: 'daterange'
      }
    }
  ]
};
