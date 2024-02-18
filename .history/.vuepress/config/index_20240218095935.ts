import * as zhConfig from './zh'

export const themeConfig = {
  locales: {
    "/": {
      selectLanguageText: "选择语言",
      selectLanguageName: "简体中文",
      lastUpdatedText: "最后更新时间",
      navbar: zhConfig.navbar,
      series: zhConfig.series,
      commentConfig: zhConfig.commentConfig,
      bulletin: zhConfig.bulletin,
    },
  },
  password: "05100fd3884c2ea6d044067f087092fb",
  logo: "/logo.png",
  author: "张家豪",
  docsRepo: "https://github.com/vuepress-reco/vuepress-theme-reco",
  docsBranch: "main",
  docsDir: "/",
  colorMode: "dark",
  vuePreviewsDir: "/.vuepress/vue-previews",
  componentsDir: "/.vuepress/components",
};
