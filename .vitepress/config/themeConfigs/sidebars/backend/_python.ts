import { type DefaultTheme } from "vitepress";

export const PYTHON_ROOT = "/backend/python";

export const PYTHON_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "Python 基础",
    collapsed: false,
    items: [
      {
        text: "函数",
        link: `${PYTHON_ROOT}/base/function`,
      },
    ],
  },

  {
    text: "虚拟环境",
    collapsed: true,
    items: [
      {
        text: "venv",
        link: `${PYTHON_ROOT}/virtual-env/venv`,
      },
    ],
  },

  {
    text: "相关目录",
    collapsed: true,
    items: [
      {
        text: "Django 基础 →",
        link: `/backend/django/`,
      },
      {
        text: "Python 基础 →",
        link: `/backend/python/`,
      },
      {
        text: "后端相关 →",
        link: `/backend/`,
      },
    ],
  },
];
