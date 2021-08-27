//获取菜单权限
export const mapMenusToPermissions = (userMenus: any[]) => {
  const permissions: string[] = [];
  const recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        recurseGetPermission(menu.children ?? []);
      } else if (menu.type === 3) {
        permissions.push(menu.permission);
      }
    }
  };
  //调用递归函数
  recurseGetPermission(userMenus);

  return permissions;
};
