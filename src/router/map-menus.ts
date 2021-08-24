import { RouteRecordRaw } from 'vue-router';

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
      } else {
        //递归调用
        recurseGetRoute(menu.children);
      }
    }
  };
  recurseGetRoute(userMenus);
  return routes;
};
