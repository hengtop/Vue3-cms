<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.name">
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { saberBreadcrumbType } from '../types';

export default defineComponent({
  props: {
    breadcrumbs: {
      type: Array as PropType<saberBreadcrumbType[]>,
      default: () => []
    }
  },
  setup() {
    return {};
  }
});
</script>

<style lang="less" scoped></style>
