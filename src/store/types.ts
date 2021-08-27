import type { LoginState } from './module/login/types';
import type { SystemState } from './module/mian/system/types';
//根state的类型
export interface RootState {
  name: string;
  age: number;
  entireDepartment: any[];
  entireRole: any[];
}

//一些模块的类型
export interface ModuleState {
  login: LoginState;
  system: SystemState;
}

//交叉类型后导出
export type RootStateWithModule = RootState & ModuleState;
