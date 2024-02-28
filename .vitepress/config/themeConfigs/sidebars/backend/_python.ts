import { type DefaultTheme } from "vitepress";

export const PYTHON_ROOT = "/backend/python";

export const PYTHON_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "Python 基础",
    collapsed: false,
    items: [
      {
        text: "虚拟环境",
        collapsed: true,
        items: [
          {
            text: "venv",
            link: `${PYTHON_ROOT}/base/virtual-env/venv`,
          },
        ],
      },
      {
        text: "数据类型",
        collapsed: true,
        items: [
          {
            text: "类型分类、判断、转换",
            link: `${PYTHON_ROOT}/base/data-types/division-determination-conversion`,
          },
          {
            text: "基本数据类型",
            link: `${PYTHON_ROOT}/base/data-types/primitive-data-types`,
          },
          {
            text: "复合数据类型",
            link: `${PYTHON_ROOT}/base/data-types/composite-data-types`,
          },
          {
            text: "数据类型的常用内置方法",
            collapsed: true,
            items: [
              {
                text: "字符串",
                link: `${PYTHON_ROOT}/base/built-in-apis/str`,
              },
              {
                text: "列表",
                link: `${PYTHON_ROOT}/base/built-in-apis/list`,
              },
              {
                text: "字典",
                link: `${PYTHON_ROOT}/base/built-in-apis/dict`,
              },
            ],
          },
        ],
      },

      {
        text: "变量、常量",
        link: `${PYTHON_ROOT}/base/variable-constant`,
      },
      {
        text: "运算符",
        link: `${PYTHON_ROOT}/base/operators`,
      },
      {
        text: "流程控制",
        link: `${PYTHON_ROOT}/base/control-flows`,
      },
      {
        text: "函数",
        link: `${PYTHON_ROOT}/base/function`,
      },
      {
        text: "异常处理",
        link: `${PYTHON_ROOT}/base/error-exception`,
      },

      {
        text: "面向对象",
        collapsed: false,
        items: [
          {
            text: "类 ( Class )",
            link: `${PYTHON_ROOT}/base/oop/class`,
          },
        ],
      },

      {
        text: "模块化开发",
        collapsed: false,
        items: [
          {
            text: "模块、包",
            link: `${PYTHON_ROOT}/base/modules-dev/module-pkg`,
          },
          {
            text: "常用内置模块与包",
            collapsed: true,
            items: [
              {
                text: "json",
                link: `${PYTHON_ROOT}/base/built-in-modules/json`,
              },
            ],
          },
          {
            text: "包管理工具",
            collapsed: true,
            items: [
              {
                text: "pip",
                link: `${PYTHON_ROOT}/pkg-management/pip`,
              },
              {
                text: "PDM",
                link: `${PYTHON_ROOT}/pkg-management/pdm`,
              },
            ],
          },
        ],
      },

      {
        text: "文件操作",
        link: `${PYTHON_ROOT}/base/file-control`,
      },
    ],
  },

  {
    text: "Python 常用第三方包",
    collapsed: true,
    items: [
      {
        text: "request",
        link: `${PYTHON_ROOT}/third-party-pkgs/requests`,
      },
    ],
  },

  // {
  //   text: "网络爬虫",
  //   collapsed: true,
  //   items: [
  //     {
  //       text: "Scrapy",
  //       link: `/backend/scrapy/`,
  //     },
  //   ],
  // },

  // {
  //   text: "数据分析",
  //   collapsed: true,
  //   items: [
  //     {
  //       text: "NumPy",
  //       link: ``,
  //     },
  //     {
  //       text: "Pandas",
  //       link: ``,
  //     },
  //   ],
  // },

  {
    text: "相关目录",
    collapsed: true,
    items: [
      {
        text: "Python 基础 →",
        link: `/backend/python/`,
      },
      {
        text: "Django 基础 →",
        link: `/backend/django/`,
      },
      {
        text: "后端相关 →",
        link: `/backend/`,
      },
    ],
  },
];
