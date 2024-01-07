import { type DefaultTheme } from "vitepress";

// frontend
import { JS_ROOT, JS_SIDEBAR } from "./frontend/_javascript";
import { REACT_ROOT, REACT_SIDEBAR } from "./frontend/_react";
import { TS_ROOT, TS_SIDEBAR } from "./frontend/_typescript";
import { VUE_ROOT, VUE_SIDEBAR } from "./frontend/_vue";
import { NEXT_JS_ROOT, NEXT_JS_SIDEBAR } from "./frontend/_next-js";
import { NUXT_JS_ROOT, NUXT_JS_SIDEBAR } from "./frontend/_nuxt-js";

// backend
import { PYTHON_ROOT, PYTHON_SIDEBAR } from "./backend/_python";
import { DJANGO_ROOT, DJANGO_SIDEBAR } from "./backend/_django";
import { GO_ROOT, GO_SIDEBAR } from "./backend/_go";
import { GIN_ROOT, GIN_SIDEBAR } from "./backend/_gin";

// others
import { GIT_ROOT, GIT_SIDEBAR } from "./others/tools/_git";

export const defaultThemeSidebars: DefaultTheme.Sidebar = {
  // Javascript
  [JS_ROOT]: JS_SIDEBAR,
  // Typescript
  [TS_ROOT]: TS_SIDEBAR,
  // React
  [REACT_ROOT]: REACT_SIDEBAR,
  // Vue
  [VUE_ROOT]: VUE_SIDEBAR,
  // Next.js
  [NEXT_JS_ROOT]: NEXT_JS_SIDEBAR,
  // Nuxt.js
  [NUXT_JS_ROOT]: NUXT_JS_SIDEBAR,

  // Python
  [PYTHON_ROOT]: PYTHON_SIDEBAR,
  // Django
  [DJANGO_ROOT]: DJANGO_SIDEBAR,
  // Go
  [GO_ROOT]: GO_SIDEBAR,
  // Gin
  [GIN_ROOT]: GIN_SIDEBAR,

  // Git
  [GIT_ROOT]: GIT_SIDEBAR,
};
