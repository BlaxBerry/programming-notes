import { type DefaultTheme } from "vitepress";
import { JS_ROOT } from "../sidebars/frontend/_javascript";
import { TS_ROOT } from "../sidebars/frontend/_typescript";
import { NEXT_JS_ROOT } from "../sidebars/frontend/_next-js";
import { NUXT_JS_ROOT } from "../sidebars/frontend/_nuxt-js";
import { GO_ROOT } from "../sidebars/backend/_go";
import { PYTHON_ROOT } from "../sidebars/backend/_python";
import { DJANGO_ROOT } from "../sidebars/backend/_django";
import { GIN_ROOT } from "../sidebars/backend/_gin";
import { GIT_ROOT } from "../sidebars/others/_git";
import { ASDF_ROOT } from "../sidebars/others/_asdf";
import { CURL_ROOT } from "../sidebars/others/_curl";

export const defaultThemeNav: Array<DefaultTheme.NavItem> = [
  {
    text: "常用语言",
    items: [
      { text: "JavaScript", link: `${JS_ROOT}/` },
      { text: "TypeScript", link: `${TS_ROOT}/` },
      { text: "Python", link: `${PYTHON_ROOT}/` },
      { text: "Go", link: `${GO_ROOT}/` },
    ],
  },

  {
    text: "常用框架",
    items: [
      // { text: "React", link: `${REACT_ROOT}/` },
      // { text: "Vue", link: `${VUE_ROOT}/` },
      { text: "Next.js", link: `${NEXT_JS_ROOT}/` },
      { text: "Nuxt.js", link: `${NUXT_JS_ROOT}/` },
      { text: "Django", link: `${DJANGO_ROOT}/` },
      { text: "Gin", link: `${GIN_ROOT}/` },
    ],
  },

  {
    text: "常用工具",
    items: [
      { text: "Git", link: `${GIT_ROOT}/` },
      { text: "ASDF", link: `${ASDF_ROOT}/` },
      { text: "CURL", link: `${CURL_ROOT}/` },
    ],
  },

  // {
  //   text: "后端",
  //   items: [
  //     {
  //       text: "常用语言",
  //       items: [
  //         { text: "Python", link: `${PYTHON_ROOT}/` },
  //         { text: "Go", link: `${GO_ROOT}/` },
  //       ],
  //     },
  //     { text: "目录首页", link: "/backend/" },
  //   ],
  // },
];
