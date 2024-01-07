import { type DefaultTheme } from "vitepress";

export const DJANGO_ROOT = "/backend/django";

export const DJANGO_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "Django 基础",
    collapsed: false,
    items: [],
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
