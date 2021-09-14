export const tableConfig = {
  //是否展示序号
  showIndexColumn: true,
  //是否展示选择项
  showSelectcolumn: true,
  //表格标题
  tableTitle: '商品列表',
  //表格项数据
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '100', slotName: 'name' },
    { prop: 'oldPrice', label: '原价格', minWidth: '100', slotName: 'oldPrice' },
    { prop: 'newPrice', label: '现价格', minWidth: '100', slotName: 'newPrice' },
    { prop: 'desc', label: '描述', minWidth: '100', slotName: 'desc' },
    { prop: 'imgUrl', label: '图片', minWidth: '100', slotName: 'imageScope' },
    { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
    { prop: 'createAt', label: '创建时间', minWidth: '150', slotName: 'createAt' },
    { prop: 'updateAt', label: '更新时间', minWidth: '150', slotName: 'updateAt' },
    { label: '操作', minWidth: '150', slotName: 'handle' }
  ]
};
