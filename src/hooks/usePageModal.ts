import { ref } from 'vue';
import pageModal from '@/components/page-modal';

//定义一个回调函数来处理一些不是公共的逻辑，比如弹窗，有些表单项是不一定显示的
type callbackFn = () => void;
export function usePageModal(newCb?: callbackFn, editCb?: callbackFn) {
  //获取子组件
  const pageModalRef = ref<InstanceType<typeof pageModal>>();
  //默认表单值
  const defaultInfo = ref({});
  //监听子组件按钮点击事件
  const handleNewBtnClick = () => {
    //新建不需要值
    defaultInfo.value = {};
    if (pageModalRef.value) {
      pageModalRef.value.centerDialogVisible = true;
    }
    newCb && newCb();
  };
  const handleEditBtnClick = (item: any) => {
    defaultInfo.value = { ...item };
    if (pageModalRef.value) {
      pageModalRef.value.centerDialogVisible = true;
    }
    editCb && editCb();
  };

  return [pageModalRef, defaultInfo, handleEditBtnClick, handleNewBtnClick];
}
