//login模块state的类型
interface LoginState {
  token: string;
  userInfo: any;
  userMenus: any;
  permissions: string[];
}

export { LoginState };
