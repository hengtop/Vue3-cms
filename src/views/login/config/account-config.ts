//编写校验规则
export const accountRules = {
  username: [
    { required: true, message: '账号不能为空', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{3,10}$/,
      message: '必须为3到10个字符',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      pattern: /^[0-9a-zA-Z!@#$^]{6,18}$/,
      message: '必须为6位以上',
      trigger: 'blur'
    }
  ]
};
export const phoneRules = {
  number: [
    { required: true, message: '手机号不能为空', trigger: 'blur' },
    {
      pattern: /^1[3-9][0-9]{9}$/,
      message: '请填写正确的手机号',
      trigger: 'blur'
    }
  ],
  code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
};
