import { type DefaultTheme } from "vitepress";

// frontend
import { HTML_ROOT, HTML_SIDEBAR } from "./frontend/_html";
import { JS_ROOT, JS_SIDEBAR } from "./frontend/_javascript";
import { REACT_ROOT, REACT_SIDEBAR } from "./frontend/_react";
import { TS_ROOT, TS_SIDEBAR } from "./frontend/_typescript";
import { VUE_ROOT, VUE_SIDEBAR } from "./frontend/_vue";
import { NEXT_JS_ROOT, NEXT_JS_SIDEBAR } from "./frontend/_next-js";
import { NUXT_JS_ROOT, NUXT_JS_SIDEBAR } from "./frontend/_nuxt-js";

// backend
import { NODEJS_ROOT, NODEJS_SIDEBAR } from "./backend/_node-js";
import { EXPRESS_JS_ROOT, EXPRESS_JS_SIDEBAR } from "./backend/_express-js";
import { PYTHON_ROOT, PYTHON_SIDEBAR } from "./backend/_python";
import { DJANGO_ROOT, DJANGO_SIDEBAR } from "./backend/_django";
import { GO_ROOT, GO_SIDEBAR } from "./backend/_go";
import { GIN_ROOT, GIN_SIDEBAR } from "./backend/_gin";

// others
import { GIT_ROOT, GIT_SIDEBAR } from "./others/tools/_git";

export const defaultThemeSidebars: DefaultTheme.Sidebar = {
  /**
   * frontend
   * ------------------------------------------------------------
   */
  // HTML
  [HTML_ROOT]: HTML_SIDEBAR,
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

  /**
   * backend
   * ------------------------------------------------------------
   */
  // Node.js
  [NODEJS_ROOT]: NODEJS_SIDEBAR,
  // Express.js
  [EXPRESS_JS_ROOT]: EXPRESS_JS_SIDEBAR,
  // Python
  [PYTHON_ROOT]: PYTHON_SIDEBAR,
  // Django
  [DJANGO_ROOT]: DJANGO_SIDEBAR,
  // Go
  [GO_ROOT]: GO_SIDEBAR,
  // Gin
  [GIN_ROOT]: GIN_SIDEBAR,

  /**
   * others
   * ------------------------------------------------------------
   */
  // Git
  [GIT_ROOT]: GIT_SIDEBAR,
};
