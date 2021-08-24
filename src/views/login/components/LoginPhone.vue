<template>
  <div class="login-account">
    <el-form label-width="70px" :rules="phoneRules" :model="phone" ref="formRef">
      <el-form-item label="手机号" prop="number">
        <el-input type="text" v-model="phone.number" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input type="text" v-model="phone.code" />
          <el-button
            class="code-btn"
            type="primary"
            v-if="!isSend"
            @click="sendNote"
            :disabled="isSend"
            >发送验证码</el-button
          >
          <el-button v-else class="code-btn" :disabled="isSend"
            >{{ sendCount }}s后重新发送</el-button
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { ElForm } from 'element-plus';
import { phoneRules } from '../config/account-config';

export default defineComponent({
  setup() {
    //获取store
    const store = useStore();

    const phone = reactive({
      number: '',
      code: ''
    });
    //发送短信
    const isSend = ref(false);
    const sendCount = ref(5);
    const sendNote = () => {
      if (isSend.value) {
        return;
      }
      isSend.value = true;
      let timer: any = setInterval(() => {
        sendCount.value--;
        if (sendCount.value <= 0) {
          clearInterval(timer);
          timer = null;
          isSend.value = false;
          sendCount.value = 5;
        }
      }, 1000);
      //发送请求
      console.log('发送请求');
    };

    //获取表单组件
    const formRef = ref<InstanceType<typeof ElForm>>();
    //登录操作
    const loginAction = (isKeepPassword: boolean) => {
      console.log(isKeepPassword);
      formRef.value?.validate((valid) => {
        if (valid) {
          store.dispatch('login/phoneLoginAction', { ...phone });
          console.log('发送登录请求');
        } else {
          return;
        }
      });
    };

    return {
      phone,
      phoneRules,
      sendNote,
      isSend,
      sendCount,
      formRef,
      loginAction
    };
  }
});
</script>

<style lang="less" scoped>
.get-code {
  display: flex;
  .code-btn {
    margin-left: 8px;
  }
}
</style>
