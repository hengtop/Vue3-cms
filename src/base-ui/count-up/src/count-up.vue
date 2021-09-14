<template>
  <span ref="countRef"></span>
</template>

<script lang="ts">
import { onMounted, ref, watch } from 'vue';
import { CountUp } from 'countup.js';
import type { CountUpOptions } from 'countup.js';
import { defineComponent } from 'vue';

const defaultOptions: CountUpOptions = {
  decimalPlaces: 2, //小数位保留
  duration: 2, //动画时常
  separator: ',', //千分位分隔符
  decimal: '.', //小数位分割
  prefix: '￥'
};
export default defineComponent({
  props: {
    number: {
      type: Number,
      default: 0
    },
    option: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  setup(props) {
    //元素dom
    const countRef = ref<HTMLSpanElement | null>(null);
    //计数实例
    const instance = ref<CountUp | null>(null);

    //监听元素变化,重新执行动画
    watch(
      () => props.option.number,
      () => {
        update(props.option.number);
      }
    );

    //元素挂载完毕后开始创建实例
    onMounted(() => {
      createCountUp();
    });

    //创建实例
    const createCountUp = () => {
      if (!countRef?.value) return;
      //合并父组件传递过来的选项
      const opts = Object.assign(defaultOptions, props.option);
      instance.value = new CountUp(countRef?.value, props.number, opts);
      //开始
      start();
    };
    //开始动画
    const start = () => {
      if (!instance.value) return;
      instance.value.start();
    };
    //动画更新结束值
    const update = (number: number) => {
      instance?.value?.update(number);
    };
    return {
      countRef
    };
  }
});
</script>

<style lang="less" scoped></style>
