<template>
  <div class="chat">
    <saberEditor v-model="htmlString"></saberEditor>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import saberEditor from '@/base-ui/editor';

export default defineComponent({
  name: 'chat',
  setup() {
    const htmlString = ref<string>('我是一段文字');
    return {
      htmlString
    };
  },
  components: {
    saberEditor
  }
});
</script>

<style scoped>
.chat {
  width: 100%;
  height: 100%;
}
</style>
