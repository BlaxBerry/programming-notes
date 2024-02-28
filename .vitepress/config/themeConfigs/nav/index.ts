import { type DefaultTheme } from "vitepress";
import { JS_ROOT } from "../sidebars/frontend/_javascript";
import { TS_ROOT } from "../sidebars/frontend/_typescript";
import { REACT_ROOT } from "../sidebars/frontend/_react";
import { VUE_ROOT } from "../sidebars/frontend/_vue";
import { GO_ROOT } from "../sidebars/backend/_go";
import { PYTHON_ROOT } from "../sidebars/backend/_python";
import { DJANGO_ROOT } from "../sidebars/backend/_django";
import { GIN_ROOT } from "../sidebars/backend/_gin";
// import { EXPRESSJS_ROOT } from "../sidebars/backend/_express-js";

export const defaultThemeNav: Array<DefaultTheme.NavItem> = [
  {
    text: "常用语言",
    items: [
      {
        text: "前端",
        items: [
          { text: "JavaScript", link: `${JS_ROOT}/` },
          { text: "TypeScript", link: `${TS_ROOT}/` },
        ],
      },
      {
        text: "后端",
        items: [
          { text: "Python", link: `${PYTHON_ROOT}/` },
          { text: "Go", link: `${GO_ROOT}/` },
        ],
      },
    ],
  },

  {
    text: "常用框架",
    items: [
      {
        text: "前端",
        items: [
          { text: "React", link: `${REACT_ROOT}/` },
          { text: "Vue", link: `${VUE_ROOT}/` },
        ],
      },
      {
        text: "后端",
        items: [
          // { text: "Express.js", link: `${EXPRESSJS_ROOT}/` },
          { text: "Django", link: `${DJANGO_ROOT}/` },
          { text: "Gin", link: `${GIN_ROOT}/` },
        ],
      },
    ],
  },
  {
    text: "其他内容",
    items: [
      {
        text: "互联网基础",
        link: `/others/web/`,
      },
      {
        text: "常用工具",
        link: `/others/tools/`,
      },
      {
        text: "数据格式与传输",
        link: `/others/data-format/`,
      },
    ],
  },
];
