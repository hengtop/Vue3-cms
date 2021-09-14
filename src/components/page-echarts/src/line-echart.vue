<template>
  <div>
    <saberEchart :options="options" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import type { LineEchartDataType } from '../types';
import saberEchart from '@/base-ui/base-echart';

export default defineComponent({
  props: {
    lineData: {
      type: Object as PropType<LineEchartDataType>,
      required: true
    }
  },
  setup(props) {
    const options = computed(() => {
      return {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: props.lineData.xLabels
        },
        yAxis: {
          type: 'value'
        },
        legend: {
          data: ['分类销量统计']
        },
        series: [
          {
            name: '分类销量统计',
            data: props.lineData.value,
            type: 'line',
            areaStyle: {},
            emphasis: {
              focus: 'series'
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
