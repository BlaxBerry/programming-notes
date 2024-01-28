import { type DefaultTheme } from "vitepress";

export const JS_ROOT = "/frontend/javascript";

export const JS_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "JS 基础",
    collapsed: false,
    items: [
      {
        text: "数据类型",
        collapsed: true,
        items: [
          {
            text: "基本数据类型",
            link: `${JS_ROOT}/base/data-types/primitive-data-types`,
          },
          {
            text: "引用数据类型",
            link: `${JS_ROOT}/base/data-types/reference-data-type`,
          },
        ],
      },

      {
        text: "面向对象",
        collapsed: false,
        items: [
          //     {
          //       text: "原型",
          //       link: ``,
          //     },
          //     {
          //       text: "类",
          //       link: ``,
          //     },
        ],
      },

      {
        text: "异步",
        collapsed: true,
        items: [
          {
            text: "Promise",
            link: `${JS_ROOT}/base/async-dev/promise`,
          },
          {
            text: "Generator",
            link: `${JS_ROOT}/base/async-dev/generator`,
          },
          {
            text: "async / await",
            link: `${JS_ROOT}/base/async-dev/async-await`,
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
