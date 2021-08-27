<template>
  <div class="header">
    <slot name="header"></slot>
  </div>
  <el-form :label-width="labelWidth">
    <el-row :gutter="10">
      <template v-for="(formItem, index) in formItems" :key="index">
        <el-col v-bind="itemLayout">
          <el-form-item
            v-if="!formItem.isHidden"
            :label="formItem.label"
            :style="itemStyle"
            :rule="itemRule"
          >
            <template v-if="formItem.type === 'input'">
              <el-input
                :placeholder="formItem.placeholder"
                v-bind="formItem.otherOptions"
                :model-value="modelValue[`${formItem.field}`]"
                @update:modelValue="handleValueChange($event, formItem.field)"
              ></el-input>
            </template>
            <template v-else-if="formItem.type === 'password'">
              <el-input
                type="password"
                show-password
                :placeholder="formItem.placeholder"
                v-bind="formItem.otherOptions"
                :model-value="modelValue[`${formItem.field}`]"
                @update:modelValue="handleValueChange($event, formItem.field)"
              ></el-input>
            </template>
            <template v-else-if="formItem.type === 'select'">
              <el-select
                :placeholder="formItem.placeholder"
                v-bind="formItem.otherOptions"
                :model-value="modelValue[`${formItem.field}`]"
                @update:modelValue="handleValueChange($event, formItem.field)"
              >
                <el-option
                  v-for="item in formItem.options"
                  :key="item.value"
                  :value="item.value"
                  :label="item.title"
                >
                  {{ item.title }}
                </el-option>
              </el-select>
            </template>
            <template v-else-if="formItem.type === 'datepicker'">
              <el-date-picker
                v-bind="formItem.otherOptions"
                :model-value="modelValue[`${formItem.field}`]"
                @update:modelValue="handleValueChange($event, formItem.field)"
                value-format="x"
              ></el-date-picker>
            </template>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
  <div class="footer">
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, watch, ref } from 'vue';
import type { saberFormItemType } from '../types';

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    //表格详细配置
    formItems: {
      type: Array as PropType<saberFormItemType[]>,
      default: () => []
    },
    //表格标题宽度
    labelWidth: {
      type: String,
      defalut: '100px'
    },
    //表格样式
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    //表格格栅布局
    itemLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    //接收父祖家传来的双向绑定字段，注意不要通过子组件来修改父组件的props
    //拷贝一份父组件传来的数据来监听修改传递事件，保证数据单向流原则
    //这里有两种写法
    /*     const formData = ref({ ...props.modelValue });
    watch(
      formData,
      (newValue) => {
        emit('update:modelValue', newValue);
      },
      { deep: true }
    ); */
    const handleValueChange = (value: any, field: string) => {
      //将所有表格数据发给父组件
      emit('update:modelValue', { ...props.modelValue, [field]: value });
    };
    return {
      //formData,
      handleValueChange
    };
  }
});
</script>

<style lang="less" scoped></style>
