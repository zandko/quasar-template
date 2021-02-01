import { RouteConfig } from 'vue-router';

const constantRoutes: RouteConfig[] = [
  {
    path: '/logon',
    name: 'logon',
    meta: {
      title: '登录',
    },
    component: () => import('pages/logon/index.vue'),
  },
  {
    path: '*',
    meta: {
      title: '404',
      isHidden: true,
    },
    component: () => import('pages/Error404.vue'),
  },
];

export default constantRoutes;
