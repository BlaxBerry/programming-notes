import { type DefaultTheme } from "vitepress";

export const GIN_ROOT = "/backend/gin";

export const GIN_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "Gin 基础",
    collapsed: false,
    items: [
      {
        text: "路由、请求",
        link: `${GIN_ROOT}/base/route-request`,
      },
      {
        text: "中间件",
        link: `${GIN_ROOT}/base/middleware`,
      },
      {
        text: "模版、静态资源",
        link: `${GIN_ROOT}/base/template-static`,
      },
      {
        text: "会话控制",
        link: `${GIN_ROOT}/base/cookie-session`,
      },
    ],
  },

  {
    text: "相关目录",
    collapsed: true,
    items: [
      {
        text: "Gin 基础 →",
        link: `/backend/gin/`,
      },
      {
        text: "Go 基础 →",
        link: `/backend/go/`,
      },
      {
        text: "后端相关 →",
        link: `/backend/`,
      },
    ],
  },
];
