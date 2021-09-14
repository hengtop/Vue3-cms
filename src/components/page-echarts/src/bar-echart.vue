<template>
  <div>
    <saberEchart :options="options" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import type { LineEchartDataType } from '../types';
import saberEchart from '@/base-ui/base-echart';
import * as echarts from 'echarts';

export default defineComponent({
  props: {
    barData: {
      type: Object as PropType<LineEchartDataType>,
      required: true
    }
  },
  setup(props) {
    const options = computed(() => {
      return {
        title: {
          text: '特性示例：渐变色 阴影 点击缩放'
        },
        xAxis: {
          data: props.barData.xLabels,
          axisLabel: {
            inside: true,
            textStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#999'
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          {
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            },
            data: props.barData.value
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
