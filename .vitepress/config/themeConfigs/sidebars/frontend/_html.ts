import { type DefaultTheme } from "vitepress";

export const HTML_ROOT = "/frontend/html";

export const HTML_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "HTML 基础",
    collapsed: false,
    items: [
      {
        text: "常用标签",
        collapsed: true,
        items: [
          {
            text: "基础标签",
            link: `${HTML_ROOT}/base/basic-tags`,
          },
          {
            text: "文本格式化标签",
            link: `${HTML_ROOT}/base/text-formatting-tags`,
          },
          {
            text: "语义化标签",
            link: `${HTML_ROOT}/base/semantic-tags`,
          },
          {
            text: "元信息标签",
            link: `${HTML_ROOT}/base/metadata-tags`,
          },
          {
            text: "表单标签",
            link: `${HTML_ROOT}/base/form-tags`,
          },
          {
            text: "多媒体标签",
            link: `${HTML_ROOT}/base/multimedia-tags`,
          },
        ],
      },
    ],
  },

  {
    text: "相关目录",
    collapsed: true,
    items: [
      {
        text: "HTML 基础 →",
        link: `/frontend/html/`,
      },
    ],
  },
];
