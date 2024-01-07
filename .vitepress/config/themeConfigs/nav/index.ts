import { type DefaultTheme } from "vitepress";
import { JS_ROOT } from "../sidebars/frontend/_javascript";
import { TS_ROOT } from "../sidebars/frontend/_typescript";
import { REACT_ROOT } from "../sidebars/frontend/_react";
import { VUE_ROOT } from "../sidebars/frontend/_vue";
import { GO_ROOT } from "../sidebars/backend/_go";
import { PYTHON_ROOT } from "../sidebars/backend/_python";
import { DJANGO_ROOT } from "../sidebars/backend/_django";
import { GIN_ROOT } from "../sidebars/backend/_gin";
import { GIT_ROOT } from "../sidebars/others/tools/_git";

export const defaultThemeNav: Array<DefaultTheme.NavItem> = [
  {
    text: "常用语言",
    items: [
      {
        items: [
          { text: "JavaScript", link: `${JS_ROOT}/` },
          { text: "TypeScript", link: `${TS_ROOT}/` },
        ],
      },
      {
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
        items: [
          { text: "React", link: `${REACT_ROOT}/` },
          { text: "Vue", link: `${VUE_ROOT}/` },
        ],
      },
      {
        items: [
          { text: "Django", link: `${DJANGO_ROOT}/` },
          { text: "Gin", link: `${GIN_ROOT}/` },
        ],
      },
    ],
  },

  {
    text: "常用工具",
    items: [
      { text: "Git", link: `${GIT_ROOT}/` },
      { text: "ASDF", link: `/others/tools/asdf/` },
      { text: "CURL", link: `/others/tools/curl/` },
    ],
  },
];
