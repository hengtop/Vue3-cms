<template>
  <div class="category">
    <pageSearch
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <pageTable ref="pageTableRef" :tableConfig="tableConfig" pageName="category"></pageTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { searchFormConfig } from './config/search.config';
import { tableConfig } from './config/table.config';

import pageSearch from '@/components/page-search';
import pageTable from '@/components/page-table';

import { usePageSearch } from '@/hooks/usePageSearch';

export default defineComponent({
  name: 'category',
  setup() {
    //调用自定义hooks
    const [pageTableRef, handleResetClick, handleQueryClick] = usePageSearch();
    return {
      searchFormConfig,
      tableConfig,
      handleResetClick,
      handleQueryClick,
      pageTableRef
    };
  },
  components: {
    pageSearch,
    pageTable
  }
});
</script>

<style scoped lang="less">
.user {
  padding: 10px;
}
</style>
