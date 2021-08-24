//传入参数的类型
interface AccountType {
  username: string;
  password: string;
}
//接收参数的类型
interface LoginDataType {
  code: number;
  data: any;
}

export { AccountType, LoginDataType };
