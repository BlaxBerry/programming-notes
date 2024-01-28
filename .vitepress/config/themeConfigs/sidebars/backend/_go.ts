import { type DefaultTheme } from "vitepress";

export const GO_ROOT = "/backend/go";

export const GO_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "Go 基础",
    collapsed: false,
    items: [
      {
        text: "模块化开发",
        collapsed: false,
        items: [
          {
            text: "包、模块、工作区",
            link: `${GO_ROOT}/base/modules-dev/pkg-module-workspace`,
          },
          {
            text: "包管理 ( Go Modules )",
            link: `${GO_ROOT}/base/modules-dev/go-modules`,
          },

          {
            text: "常用内置包",
            collapsed: true,
            items: [
              {
                text: "fmt",
                link: `${GO_ROOT}/base/built-in-pkgs/fmt`,
              },
              {
                text: "os",
                link: `${GO_ROOT}/base/built-in-pkgs/os`,
              },
              {
                text: "io",
                link: `${GO_ROOT}/base/built-in-pkgs/io`,
              },
              {
                text: "reflect",
                link: `${GO_ROOT}/base/built-in-pkgs/reflect`,
              },
              {
                text: "strings",
                link: `${GO_ROOT}/base/built-in-pkgs/strings`,
              },
              {
                text: "time",
                link: `${GO_ROOT}/base/built-in-pkgs/time`,
              },
              {
                text: "testing",
                link: `${GO_ROOT}/base/built-in-pkgs/testing`,
              },
              {
                text: "encoding",
                link: `${GO_ROOT}/base/built-in-pkgs/encoding`,
              },
              {
                text: "net",
                link: `${GO_ROOT}/base/built-in-pkgs/net`,
              },
              {
                text: "runtime",
                link: `${GO_ROOT}/base/built-in-pkgs/runtime`,
              },
            ],
          },
        ],
      },
      {
        text: "指针 ( Pointer )",
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
        text: "异常处理",
        link: `${GO_ROOT}/base/error-exception`,
      },

      {
        text: "面向对象",
        collapsed: false,
        items: [
          {
            text: "结构体 ( Struct )",
            link: `${GO_ROOT}/base/oop/struct`,
          },
          {
            text: "接口 ( Interface )",
            link: `${GO_ROOT}/base/oop/interface`,
          },
          {
            text: "抽象、封装、继承、多态",
            link: `${GO_ROOT}/base/oop/oop-properties`,
          },
        ],
      },

      {
        text: "并发编程",
        collapsed: false,
        items: [
          {
            text: "协程 ( Goroutine )",
            link: `${GO_ROOT}/base/concurrent-dev/goroutine`,
          },
          {
            text: "通道 ( Channel )",
            link: `${GO_ROOT}/base/concurrent-dev/channel`,
          },
        ],
      },
    ],
  },

  {
    text: "Go 常用第三方包",
    collapsed: true,
    items: [
      {
        text: "gorm",
        link: `${GO_ROOT}/third-party-pkgs/orm/gorm`,
      },
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
      // {
      //   text: "Iris 基础 →",
      //   link: `/backend/iris/`,
      // },
      {
        text: "后端相关 →",
        link: `/backend/`,
      },
    ],
  },
];
