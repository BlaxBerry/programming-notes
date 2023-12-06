import { type DefaultTheme } from "vitepress";

export const JS_ROOT = "/frontend/javascript";

export const JS_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "JS 基础",
    collapsed: false,
    items: [
      {
        text: "Promise",
        link: `${JS_ROOT}/base/promise`,
      },
      {
        text: "Async Await",
        link: `${JS_ROOT}/base/async-await`,
      },
    ],
  },
];
