type FormType = 'input' | 'password' | 'select' | 'datepicker';
export interface saberFormItemType {
  type: FormType;
  label?: string;
  rules?: any[];
  placeholder?: any;
  //针对select
  options?: any;
  //针对所有的属性
  otherOptions?: any;
  field: string; //双向绑定值的字段
  isHidden?: boolean;
}

export interface saberFormType {
  formItems: saberFormItemType[];
  labelWidth?: string;
  itemLayout?: any;
  itemStyle?: any;
}
