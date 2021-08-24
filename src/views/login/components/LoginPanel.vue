<template>
  <div class="login-panel">
    <h1>后台管理系统</h1>
    <el-tabs type="border-card" v-model="currentTab" stretch>
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user"></i> 账号登陆</span>
        </template>
        <LoginAccount ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-phone"></i> 手机登陆</span>
        </template>
        <LoginPhone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox type="primary" v-model="isKeepPassword" @change="keepStatus"
        >记住密码</el-checkbox
      >
      <el-link type="primary" href="https://element.eleme.io" target="_blank">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" @click="handelLoginClick">立即登录</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import LoginAccount from './LoginAccount.vue';
import LoginPhone from './LoginPhone.vue';
import localCache from '@/utils/cache';

export default defineComponent({
  setup() {
    //记住密码
    const isKeepPassword = ref(localCache.getCache('isKeepPassword') ?? false);
    //获取账号登录组件,这里我们要获取我们定义的组件实例的类型
    const accountRef = ref<InstanceType<typeof LoginAccount>>();
    const phoneRef = ref<InstanceType<typeof LoginPhone>>();
    //当前选中的tab
    const currentTab = ref('account');
    //登录操作
    const handelLoginClick = () => {
      //value有值就调用
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value);
      }
      if (currentTab.value === 'phone') {
        phoneRef.value?.loginAction(isKeepPassword.value);
      }
    };
    //保存选择状态
    const keepStatus = () => {
      localCache.setCache('isKeepPassword', isKeepPassword.value);
    };
    return {
      isKeepPassword,
      handelLoginClick,
      accountRef,
      phoneRef,
      keepStatus,
      currentTab
    };
  },
  components: {
    LoginAccount,
    LoginPhone
  }
});
</script>

<style lang="less" scoped>
.login-panel {
  width: 320px;
  text-align: center;
  .account-control {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 45px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
