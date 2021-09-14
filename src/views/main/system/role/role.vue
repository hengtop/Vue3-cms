<template>
  <div class="role">
    <pageSearch
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <pageTable
      ref="pageTableRef"
      :tableConfig="tableConfig"
      pageName="role"
      @newBtnClick="handleNewBtnClick"
      @editBtnClick="handleEditBtnClick"
    />
    <pageModal
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfig"
      pageName="role"
      :otherInfo="otherInfo"
    >
      <el-tree
        ref="elTreeRef"
        class="el-tree"
        :data="menus"
        show-checkbox
        node-key="id"
        :props="{ children: 'children', label: 'name' }"
        @check="handleCheckChange"
      >
      </el-tree>
    </pageModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue';
import { useStore } from '@/store';

import { tableConfig } from './config/table.config';
import { searchFormConfig } from './config/search.config';
import { modalConfig } from './config/modal.config';

import pageTable from '@/components/page-table';
import pageSearch from '@/components/page-search';
import pageModal from '@/components/page-modal';
import { usePageSearch } from '@/hooks/usePageSearch';
import { usePageModal } from '@/hooks/usePageModal';

import { getMenuLeafkeys } from '@/utils/menusLeaf';
import { ElTree } from 'element-plus';

export default defineComponent({
  name: 'role',
  setup() {
    //编辑弹窗获取角色的菜单权限树
    const elTreeRef = ref<InstanceType<typeof ElTree>>();
    const editCallback = (item: any) => {
      //获取树结构所有的叶子节点
      const leafKeys = getMenuLeafkeys(item.menuList);
      //设置目前勾选的节点,这里要放置在nexttick中，因为点击编辑弹窗出现ref还没来得及绑定
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false);
      });
    };
    //使用自定义hooks
    const [pageTableRef, handleResetClick, handleQueryClick] = usePageSearch();
    const [pageModalRef, defaultInfo, handleEditBtnClick, handleNewBtnClick] = usePageModal(
      undefined,
      editCallback
    );

    //获取权限菜单数据
    const store = useStore();
    const menus = computed(() => store.state.entireMenu);
    const otherInfo = ref({});
    //菜单树点击数据改变事件
    const handleCheckChange = (data: any, checkedData: any) => {
      //拼接全选和半选的
      const checkedKeys = checkedData.checkedKeys;
      const halfCheckedKeys = checkedData.halfCheckedKeys;
      const menuList = [...checkedKeys, ...halfCheckedKeys];
      otherInfo.value = { menuList };
    };
    return {
      tableConfig,
      searchFormConfig,
      pageTableRef,
      handleResetClick,
      handleQueryClick,
      modalConfig,
      pageModalRef,
      defaultInfo,
      handleEditBtnClick,
      handleNewBtnClick,
      menus,
      otherInfo,
      handleCheckChange,
      elTreeRef
    };
  },
  components: {
    pageTable,
    pageSearch,
    pageModal,
    ElTree
  }
});
</script>

<style scoped lang="less">
.role {
  padding: 10px;
}
.el-tree {
  padding-left: 30px;
}
</style>
