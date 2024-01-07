import { defineConfig } from "vitepress";
import { defaultThemeNav } from "./themeConfigs/nav";
import { defaultThemeSidebars } from "./themeConfigs/sidebars";
import { siteHead } from "./siteHead";

export default defineConfig({
  base: "/programming-notes/", // 站点部署 https://blaxberry.github.io/programming-notes/
  srcDir: "./contents", // 项目根目录下的 contents 目录
  vite: {
    publicDir: "../public", // 项目根目录下的 public 目录
  },
  markdown: {
    cache: false, // 开发期间禁用 markdown 缓存
    theme: {
      light: "github-light",
      dark: "github-dark-dimmed",
    },
  },
  cleanUrls: true,
  ignoreDeadLinks: true,
  appearance: "dark",

  // 网站元数据
  title: "编程笔记",
  titleTemplate: ":title | BlaxBerry",
  description: "BlaxBerry's Programming Study Notes",
  head: siteHead,

  // 自定义覆盖默认主题
  themeConfig: {
    siteTitle: "BlaxBerry's 编程笔记",
    logo: "/favicon.ico",
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2023-present BlaxBerry",
    },

    // 各页面对应边栏菜单
    sidebar: defaultThemeSidebars,
    // 网站导航连接
    nav: defaultThemeNav,
    // 外部链接
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/BlaxBerry/programming-notes",
        ariaLabel: "Github",
      },
      {
        icon: "x",
        link: "https://twitter.com/chenjiaxu333",
        ariaLabel: "X",
      },
      {
        icon: "mastodon",
        link: "https://mastodon.social/@blaxberry",
        ariaLabel: "Mastodon",
      },
    ],

    // 文章章节
    aside: true,
    outline: {
      label: "文章目录",
      level: "deep",
    },

    // 覆盖默认文本内容
    darkModeSwitchLabel: "外观模式",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    lastUpdated: {
      text: "最近更新",
    },
    docFooter: {
      prev: "前一篇文章",
      next: "下一篇文章",
    },

    // 404 页面内容
    notFound: {
      title: "Not Found",
      quote: "访问地址对应的文档不存在，请检查访问地址或者返回首页查看更多文档",
      linkText: "返回首页",
    },
  },
});
