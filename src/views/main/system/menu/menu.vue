<template>
  <div class="role">
    <pageTable :tableConfig="tableConfig" pageName="menu" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { tableConfig } from './config/table.config';
import { searchFormConfig } from './config/search.config';

import pageTable from '@/components/page-table';
export default defineComponent({
  name: 'role',
  setup() {
    return {
      tableConfig,
      searchFormConfig
    };
  },
  components: {
    pageTable
  }
});
</script>

<style scoped lang="less">
.role {
  padding: 10px;
}
</style>
