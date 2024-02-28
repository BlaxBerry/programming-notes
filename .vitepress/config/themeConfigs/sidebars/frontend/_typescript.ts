import { type DefaultTheme } from "vitepress";

export const TS_ROOT = "/frontend/typescript";

export const TS_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "TS 基础",
    collapsed: false,
    items: [
      {
        text: "数据类型",
        collapsed: false,
        items: [
          {
            text: "基本数据类型",
            link: `${TS_ROOT}/base/primitive-type`,
          },
          {
            text: "引用数据类型",
            link: `${TS_ROOT}/base/reference-data-type`,
          },
          {
            text: "字面量类型",
            link: `${TS_ROOT}/base/template-literal-type`,
          },
        ],
      },
      {
        text: "高级类型",
        collapsed: false,
        items: [
          {
            text: "联合类型、交叉类型",
            link: `${TS_ROOT}/base/union-intersection-type`,
          },
          {
            text: "映射类型、条件类型",
            link: `${TS_ROOT}/base/mapped-conditional-type`,
          },
          {
            text: "索引访问类型",
            link: `${TS_ROOT}/base/indexed-access-type`,
          },
          {
            text: "内置工具类",
            link: `${TS_ROOT}/base/utility-types`,
          },
        ],
      },
      {
        text: "类型操作",
        collapsed: false,
        items: [
          {
            text: "类型断言、类型推断",
            link: `${TS_ROOT}/base/type-assertion-inference`,
          },
          {
            text: "类型保护",
            link: `${TS_ROOT}/base/type-guard`,
          },
          {
            text: "属性修饰符",
            link: `${TS_ROOT}/base/type-property-modifier`,
          },
          {
            text: "泛型",
            link: `${TS_ROOT}/base/generic`,
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
        text: "TypeScript 基础 →",
        link: `/frontend/typescript/`,
      },
      {
        text: "JavaScript 基础 →",
        link: `/frontend/javascript/`,
      },
      {
        text: "前端相关 →",
        link: `/frontend/`,
      },
    ],
  },
];
