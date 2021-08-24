<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="accountRules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="username">
        <el-input type="text" v-model="account.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { accountRules } from '../config/account-config';
import localCache from '@/utils/cache';
import { ElForm } from 'element-plus';

export default defineComponent({
  setup() {
    //获取store
    const store = useStore();

    const account = reactive({
      username: localCache.getCache('username') ?? '',
      password: localCache.getCache('password') ?? ''
    });
    //获取表单组件
    const formRef = ref<InstanceType<typeof ElForm>>();
    //登录操作
    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          //1.判断是否需要记住密码
          if (isKeepPassword) {
            localCache.setCache('username', account.username);
            localCache.setCache('password', account.password);
          } else {
            localCache.removeCache('username');
            localCache.removeCache('password');
          }
          //登录
          store.dispatch('login/accountLoginAction', { ...account });
        } else {
          return;
        }
      });
    };

    return {
      account,
      accountRules,
      loginAction,
      formRef
    };
  }
});
</script>

<style lang="less" scoped></style>
