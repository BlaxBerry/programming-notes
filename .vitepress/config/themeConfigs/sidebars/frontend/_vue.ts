import { type DefaultTheme } from "vitepress";

export const VUE_ROOT = "/frontend/vue";

export const VUE_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "Vue 基础",
    collapsed: false,
    items: [
      {
        text: "生命周期",
        link: `${VUE_ROOT}/base/life-cycles`,
      },
    ],
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
        text: "Nuxt.js →",
        link: `/frontend/nuxt-js/`,
      },
      {
        text: "前端相关 →",
        link: `/frontend/`,
      },
    ],
  },
];
