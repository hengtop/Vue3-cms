<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!isCollapse" class="title">我的后台系统</span>
    </div>
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#409EFF"
      :collapse="isCollapse"
      :collapse-transition="false"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 多级菜单 -->
        <template v-if="item.type === 1">
          <el-submenu :index="item.id + ''">
            <template #title>
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <!-- 子级菜单 -->
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.id + ''" @click="handleMenuItemClick(subItem)">
                <i v-if="subItem.icon" :class="subItem.icon"></i>
                <span>{{ subItem.name }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <template #title>
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from '@/store/index';
import { useRouter, useRoute } from 'vue-router';
import { mapPathToMenus } from '@/router/map-menus';

export default defineComponent({
  props: {
    isCollapse: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  setup() {
    //获取菜单
    const store = useStore();
    const userMenus = computed(() => store.state.login.userMenus);

    //获取路由
    const router = useRouter();
    const route = useRoute();

    //默认菜单选中处理,传入菜单列表和当前路由表路径
    const menu = mapPathToMenus(userMenus.value, route.path);
    const defaultValue = ref(menu.id + '');
    //处理菜单点击跳转事件
    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.url ?? '/notFound'
      });
    };
    return {
      userMenus,
      defaultValue,
      handleMenuItemClick
    };
  }
});
</script>

<style lang="less" scoped>
.nav-menu {
  width: 100%;
  height: 100%;
  background-color: #001529;
  .logo {
    width: 100%;
    display: flex;
    height: 28px;
    padding: 16px 10px 16px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    width: 100%;
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 60px);
}
</style>
