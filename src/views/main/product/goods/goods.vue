<template>
  <div class="goods">
    <pageSearch
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <pageTable ref="pageTableRef" :tableConfig="tableConfig" pageName="goods">
      <template #imageScope="{ row }">
        <el-image
          style="width: 60px; height: 60px"
          :src="row.imgUrl"
          :preview-src-list="[row.imgUrl]"
        >
        </el-image>
      </template>
      <template #oldPrice="{ row }">
        {{ '￥' + row.oldPrice }}
      </template>
    </pageTable>
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
  name: 'goods',
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
