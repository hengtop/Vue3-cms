<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '默认标题'
    }
  },
  setup() {
    return {};
  }
});
</script>

<style lang="less" scoped>
/deep/.el-card__header {
  border: none;
}
.card-header {
  text-align: left;
}
/deep/.el-card__body {
  padding: 10px;
}
</style>
