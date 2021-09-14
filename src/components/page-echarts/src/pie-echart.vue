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
    pieData: {
      type: Array as PropType<EchartDataType[]>,
      required: true
    }
  },
  setup(props) {
    const options = computed(() => {
      return {
        title: {
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
          left: 'left'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: props.pieData,
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
