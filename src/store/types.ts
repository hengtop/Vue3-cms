import type { LoginState } from './module/login/types';
import type { SystemState } from './module/mian/system/types';
import type { DashboardState } from './module/mian/analysis/types';
//根state的类型
export interface RootState {
  name: string;
  age: number;
  avatarUrl: string;
  entireDepartment: any[];
  entireRole: any[];
  entireMenu: any[];
}

//一些模块的类型
export interface ModuleState {
  login: LoginState;
  system: SystemState;
  dashboard: DashboardState;
}

//交叉类型后导出
export type RootStateWithModule = RootState & ModuleState;
