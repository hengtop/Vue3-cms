<template>
  <div class="content">
    <saberTable
      :listData="tableList"
      :listCount="tableCount"
      v-bind="tableConfig"
      v-model:page="pageInfo"
      @selectionChange="handleSelectionChange"
    >
      <!-- 头部插槽 -->
      <template #headerHandler>
        <el-button type="primary" size="medium" v-if="isCreate" @click="handleCreateClick"
          >新建用户</el-button
        >
      </template>
      <!-- 动态插槽 -->
      <template #status="{ row }">
        <el-button :type="row.enable ? 'success' : 'danger'" size="mini">{{
          row.enable ? '启用' : '禁用'
        }}</el-button>
      </template>
      <template #createAt="{ row }">
        <strong type="primary" size="mini">{{ $filters.formatTime(row.createAt) }}</strong>
      </template>
      <template #updateAt="{ row }">
        <strong type="primary" size="mini">{{ $filters.formatTime(row.updateAt) }}</strong>
      </template>
      <template #handle="{ row }">
        <div class="handle-btns">
          <el-button
            icon="el-icon-edit"
            size="mini"
            type="text"
            v-if="isUpdate"
            @click="handleEdiitClick(row)"
            >编辑</el-button
          >
          <el-button
            icon="el-icon-delete"
            size="mini"
            type="text"
            v-if="isDelete"
            @click="handleDeleteClick(row)"
            >删除</el-button
          >
        </div>
      </template>
      <!-- 图片插槽 -->
      <!--  <template #imageScope="{ row }">
        <el-image
          style="width: 60px; height: 60px"
          :src="row.imgUrl"
          :preview-src-list="[row.imgUrl]"
        >
        </el-image>
      </template> -->
      <template
        v-for="slotItem in otherPropSlots"
        :key="slotItem.prop"
        #[slotItem.slotName]="{ row }"
      >
        <template v-if="slotItem.slotName">
          <slot :name="slotItem.slotName" :row="row"></slot>
        </template>
      </template>
    </saberTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';
import { useStore } from '@/store/index';
import saberTable from '@/base-ui/table';
import { usePermission } from '@/hooks/usePermission';

export default defineComponent({
  props: {
    tableConfig: {
      type: Object,
      required: true
    },
    //获取表格数据的类型
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    //判断权限
    const isCreate = usePermission(props.pageName, 'create');
    const isUpdate = usePermission(props.pageName, 'update');
    const isDelete = usePermission(props.pageName, 'delete');
    const isQuery = usePermission(props.pageName, 'query');

    //发送请求获取列表数据
    const store = useStore();
    //双向绑定分页数据        offset          size
    const pageInfo = ref({ currentPage: 1, pageSize: 5 });

    const getPageData = (queryInfo: any = {}) => {
      //是否有查询权限
      if (!isQuery) {
        return;
      }
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      });
    };
    //这个方法父组件会用到所以需要return出去
    getPageData();
    const tableList = computed(() => store.getters['system/getPageListData'](props.pageName));
    const tableCount = computed(() => store.getters['system/getPageListCount'](props.pageName));

    //获取选中的表格项数据
    const handleSelectionChange = (value: any): void => {
      console.log(value);
    };
    //处理删除操作
    const handleDeleteClick = (value: any): void => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: value.id
      });
    };
    //新建列表数据
    const handleCreateClick = (): void => {
      emit('newBtnClick');
    };
    //编辑列表数据
    const handleEdiitClick = (value: any): void => {
      console.log(value);
      emit('editBtnClick', value);
    };
    //监听pageInfo改变调用数据
    watch(pageInfo, () => getPageData(), { deep: true });

    //获取其他的动态插槽，这里主要是将一些页面特有的插槽写在页面组件里，虽然插槽写在这里也可以，但为了使该页面不那么臃肿就分离出去了
    const otherPropSlots = props.tableConfig?.propList.filter((item: any) => {
      //todo 将status提出去,成为页面单独设置
      if (item.slotName === 'status') return false;
      if (item.slotName === 'createAt') return false;
      if (item.slotName === 'updateAt') return false;
      if (item.slotName === 'handle') return false;
      return true;
    });

    return {
      tableList,
      tableCount,
      handleSelectionChange,
      getPageData,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleDeleteClick,
      handleCreateClick,
      handleEdiitClick
    };
  },
  components: {
    saberTable
  }
});
</script>

<style scoped lang="less">
.content {
  padding: 20px 10px;
  .title {
    font-size: 16px;
    color: #000;
  }
}
</style>
