import { type DefaultTheme } from "vitepress";

export const EXPRESS_JS_ROOT = "/backend/express-js";

export const EXPRESS_JS_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "Express.js 基础",
    collapsed: false,
    items: [
      {
        text: "路由、请求",
        link: `${EXPRESS_JS_ROOT}/base/route-request`,
      },
      {
        text: "中间件",
        link: `${EXPRESS_JS_ROOT}/base/middleware`,
      },
      {
        text: "跨域访问",
        link: `${EXPRESS_JS_ROOT}/base/cors`,
      },
    ],
  },

  {
    text: "相关目录",
    collapsed: true,
    items: [
      {
        text: "Express.js 基础 →",
        link: `/backend/express-js/`,
      },
      {
        text: "Node.js 基础 →",
        link: `/backend/node-js/`,
      },
      {
        text: "后端相关 →",
        link: `/backend/`,
      },
    ],
  },
];
