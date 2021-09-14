<template>
  <div class="echart">
    <div ref="echartRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType, watchEffect } from 'vue';
import { EChartsOption } from 'echarts';

import { useEchart } from '../hooks/useEchart';

export default defineComponent({
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '360px'
    },
    options: {
      type: Object as PropType<EChartsOption>,
      required: true
    }
  },
  setup(props) {
    const echartRef = ref<HTMLElement>();
    onMounted(() => {
      const { setOptions } = useEchart(echartRef.value!);
      //监听数据改变重新设置
      watchEffect(() => {
        setOptions(props.options);
      });
    });
    return {
      echartRef
    };
  }
});
</script>

<style lang="less" scoped>
.echart {
  width: 100%;
}
</style>
