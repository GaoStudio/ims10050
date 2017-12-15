import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) =>
  dynamic({
    app,
    models: () => models.map(m => import(`../models/${m}.js`)),
    component,
  });

// nav data
export const getNavData = app => [
  {
    component: dynamicWrapper(app, ['user', 'login'], () =>
      import('../layouts/BasicLayout')
    ),
    layout: 'BasicLayout',
    name: '首页', // for breadcrumb
    path: '/',
    children: [
      {
        name: '图书室',
        path: 'book',
        icon: 'book',
        children: [
          {
            name: '书库管理',
            path: 'store',
            component: dynamicWrapper(app, ['list'], () =>
              import('../routes/Books/BookStore')
            ),
          },
          {
            name: '图书管理',
            path: 'books',
            component: dynamicWrapper(app, ['list'], () =>
              import('../routes/Books/BookManage')
            ),
          },
          {
            name: '图书借阅',
            path: 'borrow',
            component: dynamicWrapper(app, ['list'], () =>
              import('../routes/Books/BookBorrow')
            ),
          },
          {
            name: '基础设置',
            path: 'setting',
            component: dynamicWrapper(app, ['profile'], () =>
              import('../routes/Books/BookSetting')
            ),
          },
        ],
      },
    ],
  },
  {
    component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    path: '/user',
    layout: 'UserLayout',
    children: [
      {
        name: '用户',
        icon: 'user',
        path: 'user',
        children: [
          {
            name: '登录',
            path: 'login',
            component: dynamicWrapper(app, ['login'], () =>
              import('../routes/User/Login')
            ),
          },
          {
            name: '注册',
            path: 'register',
            component: dynamicWrapper(app, ['register'], () =>
              import('../routes/User/Register')
            ),
          },
          {
            name: '注册结果',
            path: 'register-result',
            component: dynamicWrapper(app, [], () =>
              import('../routes/User/RegisterResult')
            ),
          },
        ],
      },
    ],
  },
  {
    component: dynamicWrapper(app, [], () => import('../layouts/BlankLayout')),
    layout: 'BlankLayout',
    children: {
      name: '使用文档',
      path: 'http://pro.ant.design/docs/getting-started',
      target: '_blank',
      icon: 'book',
    },
  },
];
