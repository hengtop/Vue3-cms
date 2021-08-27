<template>
  <div class="table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ tableTitle }}</div>
        <div class="handler">
          <slot name="headerHandler"> </slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      row-key="id"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column v-if="showSelectcolumn" type="selection" align="center"></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="60"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <!-- 动态的插槽 -->
          <template #default="{ row }">
            <slot :name="propItem.slotName" :row="row">{{ row[propItem.prop] }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div v-if="showFooter" class="footer">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    listData: {
      type: Array,
      required: true
    },
    listCount: {
      type: Number,
      default: 0
    },
    propList: {
      type: Array,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectcolumn: {
      type: Boolean,
      default: false
    },
    tableTitle: {
      type: String,
      default: '列表'
    },
    //树形表格的属性
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    //处理表格选择事件
    const handleSelectionChange = (selection: any): void => {
      emit('selectionChange', selection);
    };
    //处理分页事件
    const handleSizeChange = (pageSize: number) => {
      console.log('223');
      emit('update:page', { ...props.page, pageSize });
    };
    const handleCurrentChange = (currentPage: number) => {
      console.log(currentPage);

      emit('update:page', { ...props.page, currentPage });
    };
    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    };
  }
});
</script>

<style lang="less" scoped>
.table {
  padding: 20px 10px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px;
    .title {
      font-size: 16px;
      color: #000;
    }
  }
  .footer {
    margin-top: 10px;
  }
}
</style>
