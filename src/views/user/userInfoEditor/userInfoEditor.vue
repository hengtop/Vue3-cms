<template>
  <div class="userinfo-editor">
    <div>用户头像修改</div>
    <avatarLoader @updateAvatar="updateAvatar"></avatarLoader>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from '@/store';
import { avatarLoader } from '@/base-ui/file-loader';

export default defineComponent({
  name: 'userInfoEditor',
  setup() {
    const imgUrl = ref('');
    const store = useStore();
    //将头像保存在vuex中
    const updateAvatar = (url: any) => {
      store.commit('changeAvatarUrl', url);
    };
    return {
      updateAvatar,
      imgUrl
    };
  },
  components: {
    avatarLoader
  }
});
</script>

<style lang="less" scoped>
.userinfo-editor {
  width: 1000px;
  height: 100%;
  margin: 0 auto;
  background-color: #f2f3f4;
}
</style>
