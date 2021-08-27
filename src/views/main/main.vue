<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside :width="isCollapse ? '60px' : '210px'" class="main-container-aside">
        <NavMenu :isCollapse="isCollapse" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <NavHeader @isCollapseChange="isCollapseChange" />
        </el-header>
        <el-main class="page-main">
          <router-view></router-view>
        </el-main>
        <el-footer class="page-footer">Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import NavMenu from '@/components/nav-menu';
import NavHeader from '@/components/nav-header';

/* 从js角度来看这样包裹是没有意义的（defineComponent就是一个函数，传入对象再原封不动的返回），在ts角度才有意义，做类型限制 */
export default defineComponent({
  setup() {
    //接收子组件传来折叠菜单事件
    const isCollapse = ref(false);
    const isCollapseChange = (isFold: boolean) => {
      isCollapse.value = isFold;
    };
    return {
      isCollapseChange,
      isCollapse
    };
  },
  components: {
    NavMenu,
    NavHeader
  }
});
</script>

<style lang="less" scoped>
//todo 菜单有点样式问题
.main {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  height: 100%;
  width: 100%;
  .main-container,
  .main-container-aside {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.page {
  height: 100%;
  .page-header,
  .page-footer {
    height: 60px;
  }
  .page-main {
    height: calc(100% - 120px);
  }
}

/* element-plus样式 */
.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  text-align: left;
  cursor: pointer; /* 鼠标移入样式类型 */
  background-color: #001529;
  transition: width 0.1s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #fff;
}
</style>
