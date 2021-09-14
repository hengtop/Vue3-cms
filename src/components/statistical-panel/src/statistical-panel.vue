<template>
  <div class="panel-container">
    <div class="title">
      <span>{{ panelData.title }}</span>
      <el-tooltip class="item" effect="dark" :content="panelData.tips" placement="top">
        <i class="el-icon-warning-outline"></i
      ></el-tooltip>
    </div>
    <div class="count">
      <saberCountUp
        :number="panelData.number1"
        :option="panelData.amount === 'saleroom' ? counterOption2 : counterOption1"
      />
    </div>
    <div class="desc">
      <span>{{ panelData.subtitle }}</span>
      <saberCountUp
        :number="panelData.number1"
        :option="panelData.amount === 'saleroom' ? counterOption2 : counterOption1"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import saberCountUp from '@/base-ui/count-up';

export default defineComponent({
  props: {
    panelData: {
      type: Object,
      default: function () {
        return {};
      }
    }
  },
  setup() {
    const counterOption1 = {
      decimalPlaces: 0, // 保留两位
      prefix: '' // 单位
    };
    const counterOption2 = {
      decimalPlaces: 2, // 保留两位
      prefix: '￥' // 单位
    };
    return {
      counterOption1,
      counterOption2
    };
  },
  components: {
    saberCountUp
  }
});
</script>

<style lang="less" scoped>
.panel-container {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  .count {
    font-size: 26px;
    text-align: left;
    color: #000;
    padding-bottom: 10px;
    border-bottom: 1px solid #f4f4f4;
    margin-bottom: 10px;
  }
  .desc {
    display: flex;
    justify-content: space-between;
  }
}
</style>
