import { type DefaultTheme } from "vitepress";

export const NODEJS_ROOT = "/backend/node-js";

export const NODEJS_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "Node.js 基础",
    collapsed: false,
    items: [
      {
        text: "常用内置模块",
        collapsed: true,
        items: [],
      },
    ],
  },

  {
    text: "相关目录",
    collapsed: true,
    items: [
      {
        text: "Node.js 基础 →",
        link: `/backend/node-js/`,
      },
      {
        text: "Express.js 基础 →",
        link: `/backend/express-js/`,
      },
      {
        text: "后端相关 →",
        link: `/backend/`,
      },
    ],
  },
];
