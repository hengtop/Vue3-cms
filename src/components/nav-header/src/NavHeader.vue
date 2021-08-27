<template>
  <div class="nav-header">
    <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="handleFoldChick"></i>
    <div class="content">
      <div class="nav-crumbs">
        <saberBreadcrumb :breadcrumbs="breadcrumbs" />
      </div>
      <div class="use-info">
        <UserInfo />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import UserInfo from './UserInfo.vue';
import saberBreadcrumb from '@/base-ui/breadcrumb';
import { useStore } from '@/store/index';
import { mapPathtoBreadcrumbs } from '@/router/map-menus';
import { useRoute } from 'vue-router';

export default defineComponent({
  emits: ['isCollapseChange'],
  setup(props, { emit }) {
    //控制左侧菜单栏折叠
    const isCollapse = ref(false);
    const handleFoldChick = () => {
      isCollapse.value = !isCollapse.value;
      emit('isCollapseChange', isCollapse.value);
    };

    //面包屑数据
    const store = useStore();
    const route = useRoute();
    //点击菜单切换时计算属性检测到菜单数据或者路由变化重新计算
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus;
      const currentPath = route.path;
      return mapPathtoBreadcrumbs(userMenus, currentPath);
    });
    return {
      handleFoldChick,
      isCollapse,
      breadcrumbs
    };
  },
  components: {
    UserInfo,
    saberBreadcrumb
  }
});
</script>

<style lang="less" scoped>
.nav-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  .content {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
    .nav-crumbs {
      font-size: 14px;
    }
    .use-info {
      text-align: right;
      cursor: pointer;
    }
  }
}
</style>
