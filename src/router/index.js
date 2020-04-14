/*
 * @Description:
 * @Author: sxy
 * @Date: 2020-03-18 10:02:02
 * @LastEditors: sxy
 * @LastEditTime: 2020-04-13 20:22:57
 * hideInMenu: 控制是否在侧边栏显示
 * hideChildrenInMenu 控制侧边栏路由下的子界面，是否显示在侧边栏
 */
import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress"; // 导入进度条，页面跳转的时候显示在头部的进度条
import "nprogress/nprogress.css";
import findLast from "lodash/findLast";
import Forbidden from "../views/403.vue";
import NotFound from "../views/404.vue";
import { notification } from "ant-design-vue";
import { check, isLogin } from "../utils/auth";
Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    hideInMenu: true, //  控制是否在侧边栏显示路由
    // component: { render: h => h("router-view") }, // 承载路由渲染 相当于新建一个vue单页面，里面只存放<view-router>
    component: () =>
      import(/* webpackChunkName: "about" */ "../layouts/UserLayout"),
    children: [
      // 在每一个有子路由的节点下面指定一个默认跳转
      {
        path: "/user",
        redirect: "/user/login" // 默认路由为user的时候定位到login界面
      },
      {
        path: "/user/login",
        name: "Login",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/User/Login")
      },
      {
        path: "/user/register",
        name: "Register",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/User/Register")
      }
    ]
  },
  // dashboard 有name字段的就会渲染到菜单上
  {
    path: "/", // 根目录
    meta: { authority: ["admin", "user"] },
    component: () =>
      import(/* webpackChunkName: "about" */ "../layouts/BasicLayout"), // 承载头部 侧边栏 底部
    children: [
      // dashboard
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          icon: "dashboard",
          title: "仪表盘"
        },
        component: {
          render: h => h("router-view")
        },
        children: [
          {
            path: "/dashboard",
            redirect: "/dashboard/analysis"
          },
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: {
              title: "分析页"
            },
            component: () =>
              import(
                /* webpackChunkName: "about" */
                "../views/Dashboard/Analysis" // 默认显示 相当于内容区域
              )
          }
        ]
      }
    ]
  },
  // form
  {
    path: "/form",
    name: "form",
    component: () =>
      import(/* webpackChunkName: "about" */ "../layouts/BasicLayout"), // 承载头部 侧边栏 底部
    meta: {
      icon: "form",
      title: "表单",
      authority: ["admin"]
    },
    children: [
      {
        path: "/form/basicFrom",
        name: "basicFrom",
        meta: {
          title: "基础表单"
        },
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Forms/BasicFrom")
      },
      {
        path: "/form/step-form",
        name: "stepForm",
        hideChildrenInMenu: true,
        meta: {
          title: "分布表单"
        },
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Forms/StepForm"),
        children: [
          {
            path: "/form/step-form",
            redirect: "/form/step-form/info"
          },
          {
            path: "/form/step-form/info",
            name: "info",
            component: () =>
              import(
                /* webpackChunkName: "about" */
                "../views/Forms/StepForm/Step1"
              )
          },
          {
            path: "/form/step-form/confirm",
            name: "confirm",
            component: () =>
              import(
                /* webpackChunkName: "about" */
                "../views/Forms/StepForm/Step2"
              )
          },
          {
            path: "/form/step-form/result",
            name: "result",
            component: () =>
              import(
                /* webpackChunkName: "about" */
                "../views/Forms/StepForm/Step3"
              )
          }
        ]
      }
    ]
  },
  // blob 文件导出
  {
    path: "/export",
    name: "export",
    component: () =>
      import(/* webpackChunkName: "about" */ "../layouts/BasicLayout"), // 承载头部 侧边栏 底部
    meta: {
      icon: "form",
      title: "导出表格",
      authority: ["admin"]
    },
    children: [
      {
        path: "/export/exportTable",
        name: "exportTable",
        meta: {
          title: "导出表格"
        },
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Export/exportTable")
      }
    ]
  },
   // Lodop打印
   {
    path: "/lodop",
    name: "lodop",
    component: () =>
      import(/* webpackChunkName: "about" */ "../layouts/BasicLayout"), // 承载头部 侧边栏 底部
    meta: {
      icon: "form",
      title: "lodop打印",
      authority: ["admin"]
    },
    children: [
      {
        path: "/lodop/lodopPrint",
        name: "lodopPrint",
        meta: {
          title: "lodop打印"
        },
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/LodopPrint/index")
      }
    ]
  },
  {
    path: "/403",
    name: "403",
    hideInMenu: true,
    component: Forbidden
  },
  {
    path: "*",
    name: "404",
    hideInMenu: true,
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// 设置路由跳转时候顶部的进度条
router.beforeEach((to, form, next) => {
  console.log(to);
  if (to.path !== form.path) {
    // 只有真的跳转路由的时候执行顶部进度条 修改路由参数时候不执行顶部进度条
    NProgress.start();
  }
  // _.findLast([1, 2, 3, 4], function(n) {
  //   return n % 2 == 1;
  // });
  // // => 3
  const record = findLast(to.matched, record => record.meta.authority);
  if (record && !check(record.meta.authority)) {
    if (!isLogin && to.path !== "/user/login") {
      next({
        path: "/user/login"
      });
    } else if (to.path !== "/403") {
      notification.error({
        message: "403",
        description: "您没有权限访问,请联系管理员"
      });
      next({
        path: "/403"
      });
    }
    NProgress.done();
  }
  next();
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
