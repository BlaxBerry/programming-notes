import { type DefaultTheme } from "vitepress";

export const GO_ROOT = "/backend/go";

export const GO_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "Go 基础",
    collapsed: false,
    items: [
      {
        text: "模块化开发",
        collapsed: true,
        items: [
          {
            text: "包、模块、工作区",
            collapsed: true,
            link: `${GO_ROOT}/base/modules-dev/pkg-module-workspace`,
          },
          {
            text: "包管理 ( Go Modules )",
            collapsed: true,
            link: `${GO_ROOT}/base/modules-dev/go-modules`,
          },
        ],
      },
      {
        text: "指针",
        link: `${GO_ROOT}/base/pointer`,
      },
      {
        text: "数据类型",
        collapsed: true,
        items: [
          {
            text: "类型分类、判断、转换",
            link: `${GO_ROOT}/base/data-types/division-determination-conversion`,
          },
          {
            text: "基本数据类型",
            link: `${GO_ROOT}/base/data-types/primitive-data-types`,
          },
          {
            text: "复合数据类型",
            link: `${GO_ROOT}/base/data-types/composite-data-types`,
          },
        ],
      },
      {
        text: "变量、常量",
        link: `${GO_ROOT}/base/variable-constant`,
      },
      {
        text: "运算符",
        link: `${GO_ROOT}/base/operators`,
      },
      {
        text: "流程控制",
        link: `${GO_ROOT}/base/control-flows`,
      },
      {
        text: "函数、方法",
        link: `${GO_ROOT}/base/function-method`,
      },
      {
        text: "面向对象",
        link: `${GO_ROOT}/base/oop`,
      },
      {
        text: "内置标准库",
        collapsed: true,
        items: [
          {
            text: "fmt",
            link: `${GO_ROOT}/base/built-in-pkgs/fmt`,
          },
        ],
      },
      // {
      //   text: "test 单元测试",
      //   link: `${GO_ROOT}/`,
      // },
      // {
      //   text: "ini 配置文件",
      //   link: `${GO_ROOT}/`,
      // },
    ],
  },

  {
    text: "相关目录",
    collapsed: true,
    items: [
      {
        text: "Go 基础 →",
        link: `/backend/go/`,
      },
      {
        text: "Gin 基础 →",
        link: `/backend/gin/`,
      },
      {
        text: "后端相关 →",
        link: `/backend/`,
      },
    ],
  },
];
