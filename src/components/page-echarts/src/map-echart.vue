<template>
  <div>
    <saberEchart :options="options" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import type { EchartDataType } from '../types';
import saberEchart from '@/base-ui/base-echart';
import { convertData } from '../utils/convertData';

export default defineComponent({
  props: {
    mapData: {
      type: Array as PropType<EchartDataType[]>,
      required: true
    }
  },
  setup(props) {
    //城市匹配经纬度
    const options = computed(() => {
      return {
        backgroundColor: '#fff',
        /* title: {
          text: '全国泵机销售情况',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        }, */
        tooltip: {
          trigger: 'item',
          formatter: function (params: any) {
            return params.name + ' : ' + params.value[2];
          }
        },
        legend: {
          orient: 'vertical',
          right: 20,
          top: 10,
          data: ['销量'],
          textStyle: {
            color: '#000'
          }
        },
        visualMap: {
          min: 0,
          max: 200,
          left: 20,
          bottom: 20,
          calculable: true,
          text: ['高', '低'],
          inRange: {
            color: ['rgb(70, 240, 252)', 'rgb(250, 220, 46)', 'rgb(245, 38, 186)']
          },
          textStyle: {
            color: '#000'
          }
        },
        geo: {
          map: 'china',
          roam: 'scale',
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: 'rgb(255, 255, 255)',
              borderColor: 'rgb(9, 54, 95)'
            },
            emphasis: {
              areaColor: '#bfa'
            }
          }
        },
        series: [
          {
            name: '销量',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(props.mapData),
            symbolSize: 12,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              emphasis: {
                borderColor: '#000',
                borderWidth: 1
              }
            }
          },
          {
            type: 'map',
            map: 'china',
            geoIndex: 0,
            aspectScale: 0.75,
            tooltip: {
              show: false
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
