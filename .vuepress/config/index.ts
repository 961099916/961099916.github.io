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

  logo: "/logo.png",
  author: "张家豪",
  docsRepo: "https://github.com/961099916/961099916.github.io.git",
  docsBranch: "master",
  docsDir: "/",
  colorMode: "dark",
};
