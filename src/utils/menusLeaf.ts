export const getMenuLeafkeys = (menuList: any[]) => {
  const leftKeys: number[] = [];
  const recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        recurseGetLeaf(menu.children);
      } else {
        leftKeys.push(menu.id);
      }
    }
  };
  recurseGetLeaf(menuList);
  return leftKeys;
};
