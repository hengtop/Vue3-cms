<template>
  <pageSearch
    :searchFormConfig="searchFormConfig"
    @resetBtnClick="handleResetClick"
    @queryBtnClick="handleQueryClick"
  ></pageSearch>
  <pageTable
    :tableConfig="tableConfig"
    ref="pageTableRef"
    pageName="department"
    @editBtnClick="handleEditBtnClick"
    @newBtnClick="handleNewBtnClick"
  ></pageTable>
  <pageModal
    ref="pageModalRef"
    :defaultInfo="defaultInfo"
    :modalConfig="modalConfigRef"
    pageName="department"
  />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';

import pageSearch from '@/components/page-search';
import pageTable from '@/components/page-table';
import pageModal from '@/components/page-modal';
import { searchFormConfig } from './config/search.config';
import { tableConfig } from './config/table.config';
import { modalConfig } from './config/modal.config';

import { usePageSearch } from '@/hooks/usePageSearch';
import { usePageModal } from '@/hooks/usePageModal';

export default defineComponent({
  name: 'department',
  setup() {
    //处理搜索框的hooks
    const [pageTableRef, handleResetClick, handleQueryClick] = usePageSearch();

    //处理弹窗的hooks
    const store = useStore();
    const modalConfigRef = computed(() => {
      console.log(modalConfig);
      const parentIdItem = modalConfig?.formItems.find((item) => {
        return item.field === 'parentId';
      });
      parentIdItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id };
      });
      return modalConfig;
    });

    const [pageModalRef, defaultInfo, handleEditBtnClick, handleNewBtnClick] = usePageModal();

    return {
      searchFormConfig,
      tableConfig,
      modalConfigRef,
      pageTableRef,
      handleResetClick,
      handleQueryClick,
      pageModalRef,
      defaultInfo,
      handleEditBtnClick,
      handleNewBtnClick
    };
  },
  components: {
    pageSearch,
    pageTable,
    pageModal
  }
});
</script>

<style scoped></style>
