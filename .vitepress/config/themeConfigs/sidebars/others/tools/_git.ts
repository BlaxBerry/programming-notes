import { type DefaultTheme } from "vitepress";

export const GIT_ROOT = "/others/tools/git";

export const GIT_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "Git 基础",
    collapsed: false,
    items: [
      {
        text: "常用命令",
        link: `${GIT_ROOT}/commands`,
      },
    ],
  },

  {
    text: "相关目录",
    collapsed: true,
    items: [
      {
        text: "Git 基础 →",
        link: `/others/tools/git/`,
      },
    ],
  },
];
