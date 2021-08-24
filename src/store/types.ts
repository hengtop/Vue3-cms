import type { LoginState } from './module/login/types';
//根state的类型
export interface RootState {
  name: string;
  age: number;
}

//一些模块的类型
export interface ModuleState {
  login: LoginState;
}

//交叉导出
export type RootStateWithModule = RootState & ModuleState;
