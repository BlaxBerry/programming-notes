import { type DefaultTheme } from "vitepress";

export const REACT_ROOT = "/frontend/react";

export const REACT_SIDEBAR: Array<DefaultTheme.SidebarItem> = [
  {
    text: "React 基础",
    collapsed: false,
    items: [
      {
        text: "组件开发",
        collapsed: true,
        items: [
          {
            text: "JSX",
            link: `${REACT_ROOT}/base/jsx`,
          },
          {
            text: "组件基础",
            link: `${REACT_ROOT}/base/component`,
          },
          {
            text: "内置组件",
            link: `${REACT_ROOT}/base/built-in-components`,
          },
          {
            text: "内置方法",
            link: `${REACT_ROOT}/base/built-in-functions`,
          },
        ],
      },
      {
        text: "常用 Hooks",
        collapsed: true,
        items: [
          {
            text: "useState",
            link: `${REACT_ROOT}/base/hooks/useState`,
          },
          {
            text: "useEffect",
            link: `${REACT_ROOT}/base/hooks/useEffect`,
          },
          {
            text: "useMemo",
            link: `${REACT_ROOT}/base/hooks/useMemo`,
          },
          {
            text: "useRef",
            link: `${REACT_ROOT}/base/hooks/useRef`,
          },
          {
            text: " useImperativeHandle",
            link: `${REACT_ROOT}/base/hooks/useImperativeHandle`,
          },
          {
            text: "useTransition",
            link: `${REACT_ROOT}/base/hooks/useTransition`,
          },
          {
            text: "useDeferredValue",
            link: `${REACT_ROOT}/base/hooks/useDeferredValue`,
          },
        ],
      },
    ],
  },

  {
    text: "性能优化",
    collapsed: false,
    items: [
      {
        text: "重新渲染",
        link: `${REACT_ROOT}/performance/re-render`,
      },
      {
        text: "并发",
        link: `${REACT_ROOT}/performance/concurrency`,
      },
      {
        text: "缓存",
        link: ``,
      },
      {
        text: "懒加载",
        link: ``,
      },
    ],
  },

  {
    text: "相关目录",
    collapsed: true,
    items: [
      {
        text: "Next.js 基础 →",
        link: `/frontend/next-js/`,
      },
      {
        text: "React 基础 →",
        link: `/frontend/react/`,
      },
      {
        text: "前端相关 →",
        link: `/frontend/`,
      },
    ],
  },
];
