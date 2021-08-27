import { RouteRecordRaw } from 'vue-router';
import type { saberBreadcrumbType } from '@/base-ui/breadcrumb/types';

//保存默认重定向路由
let firstMenu: any = null;

export const mapMenusToRoutes = (userMenus: any[]): RouteRecordRaw[] => {
  const routes: RouteRecordRaw[] = [];
  //1.加载所有的routes
  const allRoutes: RouteRecordRaw[] = [];
  //递归获取路由文件，require为webpack自带的函数
  const routeFiles = require.context('./main', true, /\.ts$/);
  //获取所有路由文件的路径
  const routePaths = routeFiles.keys();
  //保存路由
  routePaths.forEach((key) => {
    const route = require('./main/' + key.split('./')[1]);
    allRoutes.push(route.default);
  });
  //2.根据菜单获取需要添加的routes
  const recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        //在所有的路由中找到路径一样的路由
        const route = allRoutes.find((route) => route.path === menu.url);
        if (route) routes.push(route);
        if (!firstMenu) {
          //保存默认重定向路由，这里选的第一个菜单
          firstMenu = menu;
        }
      } else {
        //递归调用
        recurseGetRoute(menu.children);
      }
    }
  };
  recurseGetRoute(userMenus);
  return routes;
};

//匹配选中的菜单和路径
export const mapPathToMenus = (
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: saberBreadcrumbType[]
): any => {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = mapPathToMenus(menu.children ?? [], currentPath);
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name, path: menu.url });
        breadcrumbs?.push({ name: findMenu.name, path: findMenu.url });
        return findMenu;
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu;
    }
  }
};

//面包屑数据处理
export const mapPathtoBreadcrumbs = (userMenus: any[], currentPath: string) => {
  const breadcrumbs: saberBreadcrumbType[] = [];
  mapPathToMenus(userMenus, currentPath, breadcrumbs);
  return breadcrumbs;
};

export { firstMenu };
