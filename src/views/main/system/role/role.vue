<template>
  <div class="role">
    <pageSearch
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <pageTable ref="pageTableRef" :tableConfig="tableConfig" pageName="role" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { tableConfig } from './config/table.config';
import { searchFormConfig } from './config/search.config';

import pageTable from '@/components/page-table';
import pageSearch from '@/components/page-search';
import { usePageSearch } from '@/hooks/usePageSearch';

export default defineComponent({
  name: 'role',
  setup() {
    const [pageTableRef, handleResetClick, handleQueryClick] = usePageSearch();
    return {
      tableConfig,
      searchFormConfig,
      pageTableRef,
      handleResetClick,
      handleQueryClick
    };
  },
  components: {
    pageTable,
    pageSearch
  }
});
</script>

<style scoped lang="less">
.role {
  padding: 10px;
}
</style>
