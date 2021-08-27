<template>
  <div class="users">
    <pageSearch
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <pageTable
      ref="pageTableRef"
      :tableConfig="tableConfig"
      pageName="users"
      @newBtnClick="handleNewBtnClick"
      @editBtnClick="handleEditBtnClick"
    />
    <pageModal
      pageName="users"
      ref="pageModalRef"
      :modalConfig="modalConfigRef"
      :defaultInfo="defaultInfo"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';

import { searchFormConfig } from './config/search.config';
import { tableConfig } from './config/table.config';
import { modalConfig } from './config/modal.config';

import pageSearch from '@/components/page-search';
import pageTable from '@/components/page-table';
import pageModal from '@/components/page-modal';

import { usePageSearch } from '@/hooks/usePageSearch';
import { usePageModal } from '@/hooks/usePageModal';

export default defineComponent({
  name: 'users',
  setup() {
    //调用自定义hooks
    const [pageTableRef, handleResetClick, handleQueryClick] = usePageSearch();

    //新建/编辑回调
    const newCallback = () => {
      const passwordItem = modalConfig.formItems?.find((item) => item.type === 'password');
      passwordItem!.isHidden = false;
    };
    const editCallback = () => {
      const passwordItem = modalConfig.formItems?.find((item) => item.type === 'password');
      passwordItem!.isHidden = true;
    };
    const [pageModalRef, defaultInfo, handleEditBtnClick, handleNewBtnClick] = usePageModal(
      newCallback,
      editCallback
    );

    //获取部门和角色数据
    const store = useStore();
    //这里修改配置数据的代码要放置在计算属性中，因为vuex的数据可能还没有获取到，可能会导致配置没有更新
    const modalConfigRef = computed(() => {
      const departMentItem = modalConfig.formItems.find((item) => item.field === 'departmentId');
      departMentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id };
      });
      const roleItem = modalConfig.formItems.find((item) => item.field === 'roleId');
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id };
      });
      return modalConfig;
    });

    return {
      searchFormConfig,
      tableConfig,
      handleResetClick,
      handleQueryClick,
      pageTableRef,
      modalConfigRef,
      handleNewBtnClick,
      handleEditBtnClick,
      pageModalRef,
      defaultInfo
    };
  },
  components: {
    pageSearch,
    pageTable,
    pageModal
  }
});
</script>

<style scoped lang="less">
.users {
  padding: 10px;
}
</style>
