import { hopeTheme } from "vuepress-theme-hope";
import { watermarkPlugin } from '@vuepress/plugin-watermark'
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";
import { MR_HOPE_AVATAR } from "./logo.js";

export default hopeTheme({
  head: [
    ['meta', { name: 'keywords', content: 'antdocs,antdeisgn,vuepress,vuepress-theme,theme,ant,docs,antd,antdocs of vuepress,主题,vuepress主题,antd设计,blog,vuepress-blog' }],
    ['meta', { name: 'baidu-site-verification', content: 'codeva-fi0B6bPNUy' }],
    [
      'script', { type: 'text/javascript', src: 'https://cdn.staticfile.org/echarts/4.3.0/echarts.min.js' }
    ]

  ],
  hostname: "https://961099916.github.io",
  darkmode: "switch",
  author: {
    name: "九夏",
    url: "https://blog.jiuxialb.top/",
  },
  iconAssets: "fontawesome-with-brands",
  logo: "logo.png",
  repo: "961099916/961099916.github.io",
  docsDir: "src",
  // 导航栏
  navbar,
  // 侧边栏
  sidebar,
  sidebarSorter: ["order", "date-desc"],
  // 页脚
  footer: "九夏博客",
  displayFooter: false,
  // 博客相关
  blog: {
    description: "学习",
    // intro: "/intro.html",
    medias: {

    },
  },
  headerDepth: 4,
  // 加密配置
  encrypt: {
    config: {
      "/读书": ["410439"],
      "/理财": ["410439"],
      // "/每日复盘": ["410439"],
    },
  },
  // 多语言配置
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
  // hotReload: true,
  // 在这里配置主题提供的插件
  plugins: {
    watermarkPlugin: {
      enabled: true,
      watermarkOptions: {
        content: '九夏',
      }
    },
    searchPro: {
      customFields: [
        {
          getter: (page) => page.frontmatter.category,
          formatter: {
            "/": "Category: $content",
            "/zh/": "分类：$content",
          },
        },
        {
          getter: (page) => page.frontmatter.tag,
          formatter: {
            "/": "Tag: $content",
            "/zh/": "标签：$content",
          },
        },

      ],
    },
    sitemap: true,
    search: true,
    blog: true,
    // 启用之前需安装 @waline/client
    // 警告: 这是一个仅供演示的测试服务，在生产环境中请自行部署并使用自己的服务！
    comment: {
      provider: "Waline",
      serverURL: "https://vercel-nine-henna-21.vercel.app/",
      meta: ['nick'],

    },
    components: {
      components: ["Badge", "VPCard"],
    },
    // 此处开启了很多功能用于演示，你应仅保留用到的功能。
    mdEnhance: {
      align: true,
      attrs: true,
      codetabs: true,
      component: true,
      demo: true,
      figure: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      mark: true,
      markmap: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      tasklist: true,
      vPre: true,
      // 在启用之前安装 chart.js
      // chart: true,
      // insert component easily
      // 在启用之前安装 echarts
      echarts: true,
      // 在启用之前安装 flowchart.ts
      flowchart: true,

      // gfm requires mathjax-full to provide tex support
      gfm: true,

      // 在启用之前安装 katex
      katex: true,

      // 在启用之前安装 mathjax-full
      mathjax: true,

      // 在启用之前安装 mermaid
      mermaid: true,

      playground: {
        presets: ["ts", "vue"],
      },

      // 在启用之前安装 reveal.js
      revealJs: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },

      // 在启用之前安装 @vue/repl
      vuePlayground: true,
      spoiler: true,
      plantuml: true,

      // install sandpack-vue3 before enabling it
      sandpack: true,
    },
    photoSwipe: {
      scrollToClose: false
    },
    // 如果你需要 PWA。安装 @vuepress/plugin-pwa 并取消下方注释
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cachePic: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
});
