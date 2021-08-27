import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import localCache from '@/utils/cache';
import { firstMenu } from './map-menus';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/:pathMath(.*)*',
    name: 'notFound',
    component: () => import('@/views/errorPage/404.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token');
    if (!token) {
      return '/login';
    }
  }
  if (to.path === '/main') {
    return firstMenu.url;
  }
});

export default router;
