<template>
  <div class="user-info">
    <el-dropdown size="small">
      <span class="el-dropdown-link">
        <el-avatar
          class="avatar"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        个人信息<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="el-icon-user">个人信息</el-dropdown-item>
          <el-dropdown-item icon="el-icon-setting">设置</el-dropdown-item>
          <el-dropdown-item divided icon="el-icon-circle-close">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  }
});
</script>

<style lang="less" scoped>
.el-dropdown-link {
  display: flex;
  justify-content: center;
  align-items: center;
  .avatar {
    margin: 0 10px;
  }
}
</style>
'
