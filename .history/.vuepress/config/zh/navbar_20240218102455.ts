export const navbar = [
  { text: "首页", link: "/", icon: "Home" },
  {
    text: "参考",
    icon: "Cafe",
    children: [
      {
        text: "JDK",
        children: [{ text: "Java", link: "/docs/it/java-home" }],
      },
      {
        text: "框架",
        children: [{ text: "Spring", link: "/docs/it/spring-home" }],
      },
    ],
  },
  {
    text: "x",
    icon: "Fire",
    children: [
      { text: "2.x(rc)", link: "https://vuepress-theme-reco.recoluan.com/" },
      {
        text: "1.x",
        link: "http://v1.vuepress-reco.recoluan.com/views/1.x/",
      },
    ],
  },
  { text: "博客", link: "/posts", icon: "DocumentAttachment" },
  { text: "案例", link: "/docs/others/examples", icon: "Fire" },
];
