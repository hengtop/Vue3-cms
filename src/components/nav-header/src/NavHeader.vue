<template>
  <div class="nav-header">
    <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="handleFoldChick"></i>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  emits: ['isCollapseChange'],
  setup(props, { emit }) {
    //控制左侧菜单栏折叠
    const isCollapse = ref(false);
    const handleFoldChick = () => {
      isCollapse.value = !isCollapse.value;
      emit('isCollapseChange', isCollapse.value);
    };

    return {
      handleFoldChick,
      isCollapse
    };
  }
});
</script>

<style lang="less" scoped></style>
