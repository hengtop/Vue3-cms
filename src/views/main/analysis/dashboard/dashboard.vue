<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <template v-for="(item, index) in amountList" :key="index">
        <el-col :lg="6" :sm="12" :xs="24">
          <statisticalPanel :panelData="item" />
        </el-col>
      </template>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="7" :xs="24">
        <saberCard title="分类商品数量(饼图)">
          <PieEchart :pieData="categoryGoodsCount" />
        </saberCard>
      </el-col>
      <el-col :span="10" :xs="24">
        <saberCard title="不同城市商品销量">
          <MapEchart :mapData="addressGoodsSale" />
        </saberCard>
      </el-col>
      <el-col :span="7" :xs="24">
        <saberCard title="分类商品数量(玫瑰图)">
          <RoseEchart :roseData="categoryGoodsCount" />
        </saberCard>
      </el-col>
    </el-row>
    <el-row :gutter="12" class="content">
      <el-col :span="12" :xs="24">
        <saberCard title="分类商品销量">
          <LineEchart :lineData="categoryGoodsSale" />
        </saberCard>
      </el-col>
      <el-col :span="12" :xs="24">
        <saberCard title="分类上面的收藏">
          <BarEchart :barData="categoryGoodsFavor" />
        </saberCard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';

import saberCard from '@/base-ui/card';
import { PieEchart, RoseEchart, LineEchart, BarEchart, MapEchart } from '@/components/page-echarts';
import statisticalPanel from '@/components/statistical-panel';

export default defineComponent({
  name: 'dashboard',
  setup() {
    //获取数据
    const store = useStore();
    store.dispatch('dashboard/getDashboardDataAction');
    const amountList = computed(() => {
      console.log(store.state.dashboard.amountList[0]);
      return store.state.dashboard.amountList;
    });

    const categoryGoodsCount = computed(() =>
      store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount };
      })
    );

    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = [];
      const value: any[] = [];
      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale;
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name);
        value.push(item.goodsCount);
      }
      return { xLabels, value };
    });

    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = [];
      const value: any[] = [];
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor;
      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name);
        value.push(item.goodsFavor);
      }
      return { xLabels, value };
    });

    const addressGoodsSale = computed(() =>
      store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count };
      })
    );
    return {
      amountList,
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    };
  },
  components: {
    saberCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart,
    statisticalPanel
  }
});
</script>

<style scoped lang="less">
.echart {
  width: 600px;
  height: 400px;
}
.content {
  margin-top: 20px;
}
</style>
