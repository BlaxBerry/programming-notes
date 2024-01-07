import { type DefaultTheme } from "vitepress";

export const TS_ROOT = "/frontend/typescript";

export const TS_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "TS 基础",
    collapsed: false,
    items: [
      {
        text: "基础类型",
        link: `${TS_ROOT}/base/fundamental-type`,
      },
      {
        text: "高级类型",
        link: `${TS_ROOT}/base/advanced-type`,
      },
      {
        text: "内置工具类",
        link: `${TS_ROOT}/base/utility-types`,
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
