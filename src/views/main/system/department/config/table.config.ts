export const tableConfig = {
  //是否展示序号
  showIndexColumn: true,
  //是否展示选择项
  showSelectcolumn: true,
  //表格标题
  tableTitle: '部门列表',
  //表格项数据
  propList: [
    { prop: 'name', label: '部门名称', minWidth: '100', slotName: 'name' },
    { prop: 'leader', label: '部门领导', minWidth: '100', slotName: 'url' },
    { prop: 'parentId', label: '上级部门', minWidth: '100', slotName: 'icon' },
    { prop: 'createAt', label: '创建时间', minWidth: '150', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '150', slotName: 'updateAt' },
    { label: '操作', minWidth: '150', slotName: 'handle' }
  ],
  /* childProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  }, */
  //展示底部分页
  showFooter: true
};
