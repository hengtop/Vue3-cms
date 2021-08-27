import { ref } from 'vue';
import pageTable from '@/components/page-table';

//重置和搜索功能
export function usePageSearch() {
  //获取子组件对象
  const pageTableRef = ref<InstanceType<typeof pageTable>>();
  //子组件事件
  const handleResetClick = () => {
    pageTableRef.value?.getPageData();
  };
  const handleQueryClick = (queryInfo: any) => {
    pageTableRef.value?.getPageData(queryInfo);
  };

  return [pageTableRef, handleResetClick, handleQueryClick];
}
