<template>
  <div class="editor" ref="editorRef" :style="{ width: width ? `${width}px` : '100%' }"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, reactive } from 'vue';
import Editor from 'wangeditor';
import type wangeditor from 'wangeditor';
export interface EditorInfo {
  html: string;
  text: string;
}
export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: 'test'
    },
    zIndex: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
    },
    width: {
      type: Number,
      default: 0
    },
    focus: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    //选中元素
    const editorRef = ref<HTMLDivElement | null>(null);
    //创建富文本实例
    const instance = ref<wangeditor | null>(null);

    const isInitContent = ref<boolean>(false);
    const content = reactive<EditorInfo>({
      html: '',
      text: ''
    });

    onMounted(() => {
      createEditor();
    });
    onBeforeUnmount(() => {
      instance.value?.destroy();
      instance.value = null;
    });

    //创建实例
    const createEditor = () => {
      instance.value = new Editor(editorRef.value);
      setEditorConfig();
      instance.value.create();
      //创建好后初始化内容
      initEditorContent(props.modelValue);
    };
    //初始化内容
    const initEditorContent = (htmlStr: string, isFocus = false) => {
      if (!instance.value) return;
      const editor = instance.value;
      editor.config.focus = isFocus;
      if (!htmlStr) return;
      //有初始化的值
      isInitContent.value = true;
      editor.txt.html(htmlStr);
    };
    //富文本设置
    const setEditorConfig = () => {
      if (!instance.value) return;
      // 设置编辑区域高度为 500px
      const editor = instance.value;
      //设设置提示出现在上边还是下边
      editor.config.menuTooltipPosition = 'down';
      editor.config.height = props.height;
      // 设计z-index
      editor.config.zIndex = props.zIndex;
      // 取消自动 focus
      editor.config.focus = props.focus;
      //设置对齐方式
      // 配置 onchange 回调函数,获取内容html和纯文字版
      editor.config.onchange = function (newHtml: string) {
        content.html = newHtml;
        content.text = editor.txt.text();
        if (!isInitContent.value) {
          emit('update:value', content.html);
          console.log(content.html, content.text);
        }
        // 最后标记为 false
        isInitContent.value = false;
        // emit('onChange', content.html, content.text)
      };
      // 配置触发 onchange 的时间频率，默认为 200ms
      editor.config.onchangeTimeout = 500; // 修改为 500ms
      //配置菜单栏顺序和项
      editor.config.menus = [
        'head',
        'bold',
        'fontSize',
        'fontName',
        'italic',
        'underline',
        'strikeThrough',
        'indent',
        'lineHeight',
        'foreColor',
        'backColor',
        'link',
        'list',
        // 'todo',
        'justify',
        'quote',
        // 'emoticon',
        // 'image',
        // 'video',
        // 'table',
        'code',
        'splitLine',
        'undo',
        'redo'
      ];
    };
    return {
      editorRef
    };
  }
  /* components: {
    'mavon-editor': mavonEditor
  } */
});
</script>

<style lang="less" scoped>
.editor {
  margin-top: 20px;
  width: 100%;
  height: 100%;
  text-align: left;
}
</style>
