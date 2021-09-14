<template>
  <div>
    <saberEchart :options="options" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import type { EchartDataType } from '../types';
import saberEchart from '@/base-ui/base-echart';

export default defineComponent({
  props: {
    roseData: {
      type: Array as PropType<EchartDataType[]>,
      required: true
    }
  },
  setup(props) {
    const options = computed(() => {
      return {
        legend: {
          top: 'bottom'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '面积模式',
            type: 'pie',
            radius: [10, 100],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: props.roseData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
    });
    return { options };
  },
  components: {
    saberEchart
  }
});
</script>

<style lang="less" scoped></style>
