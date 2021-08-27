import { useStore } from '@/store';

//判断权限
export const usePermission = (pageName: string, handleName: string) => {
  const store = useStore();
  const permissions = store.state.login.permissions;
  const verifyPermission = `system:${pageName}:${handleName}`;
  return !!permissions.find((item) => item === verifyPermission);
};
