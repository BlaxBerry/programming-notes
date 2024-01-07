import { type DefaultTheme } from "vitepress";

export const JS_ROOT = "/frontend/javascript";

export const JS_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "JS 基础",
    collapsed: false,
    items: [
      {
        text: "异步",
        collapsed: true,
        items: [
          {
            text: "Promise",
            link: `${JS_ROOT}/base/promise`,
          },
          {
            text: "Generator",
            link: `${JS_ROOT}/base/generator`,
          },
          {
            text: "async / await",
            link: `${JS_ROOT}/base/async-await`,
          },
        ],
      },
    ],
  },

  {
    text: "相关目录",
    collapsed: true,
    items: [
      {
        text: "JavaScript 基础 →",
        link: `/frontend/javascript/`,
      },
      {
        text: "TypeScript 基础 →",
        link: `/frontend/typescript/`,
      },
      {
        text: "前端相关 →",
        link: `/frontend/`,
      },
    ],
  },
];
