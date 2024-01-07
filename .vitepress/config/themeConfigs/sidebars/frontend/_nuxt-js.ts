import { type DefaultTheme } from "vitepress";

export const NUXT_JS_ROOT = "/frontend/nuxt-js";

export const NUXT_JS_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "Nuxt.js 基础",
    collapsed: false,
    items: [],
  },

  {
    text: "相关目录",
    collapsed: true,
    items: [
      {
        text: "Vue 基础 →",
        link: `/frontend/vue/`,
      },
      {
        text: "Nuxt.js 基础→",
        link: `/frontend/nuxt-js/`,
      },
      {
        text: "前端相关 →",
        link: `/frontend/`,
      },
    ],
  },
];
