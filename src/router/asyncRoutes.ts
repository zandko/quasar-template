import { RouteConfig } from 'vue-router';
import MainLayout from 'layouts/MainLayout.vue';
import BlankLayout from 'layouts/BlankLayout.vue';
import home from 'pages/Index.vue';

const asyncRoutesChildren: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '主页',
      icon: 'eva-home-outline',
      keepAlive: true,
    },
    component: home,
  },
  // {
  //   path: '/banner',
  //   name: 'Banner',
  //   meta: {
  //     title: '轮播图管理',
  //     icon: 'eva-image-outline',
  //     keepAlive: true,
  //   },
  //   component: home,
  // },
  // {
  //   path: '/subject',
  //   name: 'Subject',
  //   meta: {
  //     title: '分类管理',
  //     icon: 'eva-grid-outline',
  //     keepAlive: true,
  //   },
  //   component: home,
  // },
  // {
  //   path: '/course',
  //   name: 'Course',
  //   meta: {
  //     title: '课程管理',
  //     icon: 'eva-book-outline',
  //     keepAlive: true,
  //   },
  //   component: home,
  // },
  // {
  //   path: '/account',
  //   name: 'Account',
  //   meta: {
  //     title: '个人中心',
  //     icon: 'eva-person-outline',
  //   },
  //   component: BlankLayout,
  //   children: [
  //     {
  //       path: 'settings',
  //       name: 'Settings',
  //       meta: {
  //         title: '个人设置',
  //         icon: 'ti-settings',
  //       },
  //       component: () => import('pages/account/settings.vue'),
  //     },
  //   ],
  // },
  // {
  //   path: '/message',
  //   name: 'Message',
  //   meta: {
  //     title: '信息',
  //     icon: 'eva-message-square-outline',
  //     keepAlive: true,
  //   },
  //   component: () => import('pages/message/index.vue'),
  // },
  {
    path: '/system',
    name: 'System',
    meta: {
      title: '系统设置',
      icon: 'eva-settings-outline',
    },
    component: BlankLayout,
    children: [
      {
        path: 'member',
        name: 'Member',
        meta: {
          title: '会员列表',
          icon: 'eva-people-outline',
          keepAlive: true,
        },
        component: () => import('pages/system/logs.vue'),
      },
      {
        path: 'role',
        name: 'Role',
        meta: {
          title: '角色列表',
          icon: 'eva-person-outline',
          keepAlive: true,
        },
        component: () => import('pages/system/logs.vue'),
      },
      {
        path: 'permission',
        name: 'Permission',
        meta: {
          title: '权限列表',
          icon: 'eva-list-outline',
          keepAlive: true,
        },
        component: () => import('pages/system/logs.vue'),
      },
      {
        path: 'logs',
        name: 'Logs',
        meta: {
          title: '系统日志',
          icon: 'eva-monitor-outline',
          keepAlive: true,
        },
        component: () => import('pages/system/logs.vue'),
      },
      {
        path: 'logs/form',
        name: 'LogsForm',
        meta: {
          title: '系统日志表单',
          icon: 'eva-form-outline',
          keepAlive: true,
        },
        component: () => import('pages/form/index.vue'),
      },
    ],
  },
];

const asyncRoutes: RouteConfig[] = [
  {
    path: '/',
    name: 'index',
    redirect: '/',
    component: MainLayout,
    children: asyncRoutesChildren,
  },
];

export default asyncRoutes;
