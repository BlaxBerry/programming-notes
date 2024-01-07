import { type DefaultTheme } from "vitepress";

export const GIN_ROOT = "/backend/gin";

export const GIN_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "Gin 基础",
    collapsed: false,
    items: [],
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
