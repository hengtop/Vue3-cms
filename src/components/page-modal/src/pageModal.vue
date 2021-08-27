<template>
  <div class="page-modal">
    <el-dialog title="提示" v-model="centerDialogVisible" width="30%" center destroy-on-close>
      <saberForm v-bind="modalConfig" v-model="formData"></saberForm>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import saberForm from '@/base-ui/form';
import { useStore } from '@/store';

export default defineComponent({
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    //弹窗打开/关闭
    const centerDialogVisible = ref(false);
    //弹窗填写数据
    const formData = ref<any>({});

    //监听props里的defaultInfo
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`];
        }
      }
    );
    //处理弹窗确定
    const store = useStore();
    const handleConfirmClick = () => {
      //关闭弹窗
      centerDialogVisible.value = false;
      //这里要判断用户点击的是新建还是编辑（新建没有初始值，编辑有初始值）
      if (Object.keys(props.defaultInfo).length) {
        //编辑
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value },
          id: props.defaultInfo.id
        });
      } else {
        //新建
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value }
        });
      }
    };

    return {
      centerDialogVisible,
      handleConfirmClick,
      formData
    };
  },
  components: {
    saberForm
  }
});
</script>

<style lang="less" scoped></style>
