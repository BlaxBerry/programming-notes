import { type DefaultTheme } from "vitepress";

export const NEXT_JS_ROOT = "/frontend/next-js";

export const NEXT_JS_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "Next.js 基础",
    collapsed: false,
    items: [],
  },

  {
    text: "相关目录",
    collapsed: true,
    items: [
      {
        text: "Next.js 基础 →",
        link: `/frontend/next-js/`,
      },
      {
        text: "React 基础 →",
        link: `/frontend/react/`,
      },
      {
        text: "前端相关 →",
        link: `/frontend/`,
      },
    ],
  },
];
