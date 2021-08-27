export const tableConfig = {
  //是否展示序号
  showIndexColumn: true,
  //是否展示选择项
  showSelectcolumn: true,
  //表格标题
  tableTitle: '角色列表',
  //表格项数据
  propList: [
    { prop: 'name', label: '角色名', minWidth: '100', slotName: 'name' },
    { prop: 'intro', label: '权限介绍', minWidth: '100', slotName: 'realname' },
    { prop: 'createAt', label: '创建时间', minWidth: '150', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '150', slotName: 'updateAt' },
    { label: '操作', minWidth: '150', slotName: 'handle' }
  ]
};
