export const tableConfig = {
  //是否展示序号
  showIndexColumn: true,
  //是否展示选择项
  showSelectcolumn: true,
  //表格标题
  tableTitle: '用户列表',
  //表格项数据
  propList: [
    { prop: 'name', label: '用户名', minWidth: '100', slotName: 'name' },
    { prop: 'realname', label: '真实姓名', minWidth: '100', slotName: 'realname' },
    { prop: 'cellphone', label: '手机号码', minWidth: '100', slotName: 'cellphone' },
    { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
    { prop: 'createAt', label: '创建时间', minWidth: '150', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '150', slotName: 'updateAt' },
    { label: '操作', minWidth: '150', slotName: 'handle' }
  ]
};
