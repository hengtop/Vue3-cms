<template>
  <div class="user">
    <div class="search-container">
      <saberForm v-bind="searchFormConfig" v-model="formData">
        <template #header>
          <h2>高级检索</h2>
        </template>
        <template #footer>
          <el-button type="primary" icon="el-icon-refresh" @click="handleResetClick"
            >重置</el-button
          >
          <el-button type="primary" icon="el-icon-search" @click="showFormData">搜索</el-button>
        </template>
      </saberForm>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import saberForm from '@/base-ui/form/index';
import type { saberFormType } from '@/base-ui/form/types';
export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object as PropType<saberFormType>,
      required: true
    }
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    const forDataField: any = {};
    const formItems = props.searchFormConfig?.formItems ?? [];
    for (const item of formItems) {
      forDataField[item.field] = '';
    }
    let formData = ref(forDataField);
    //展示筛选后的结果
    const showFormData = () => {
      //向父组件发送事件重新请求数据
      emit('queryBtnClick', { ...formData.value });
    };
    //重置表单,这里要注意引用关系
    const handleResetClick = () => {
      /*  for (const key in forDataField) {
        formData.value[key] = forDataField[key];
      } */
      formData.value = forDataField;
      //向父组件发送事件重新请求数据
      emit('resetBtnClick');
    };
    return {
      formData,
      showFormData,
      handleResetClick
    };
  },
  components: {
    saberForm
  }
});
</script>

<style scoped lang="less">
.search-container {
  padding: 10px;
}
</style>
