export const navbar = [
  { text: "首页", link: "/", icon: "Home" },
  {
    text: "Java",
    icon: "Code",
    children: [
      {
        text: "JDK",
        children: [{ text: "Java", link: "/docs/it/java-home" }, { text: "JVM", link: "/docs/it/jvm-home" }],
      },
      {
        text: "框架",
        children: [{ text: "Spring", link: "/docs/it/framework-spring" }, { text: "Mybatis", link: "/docs/it/framework-mybatis" }],
      },
      {
        text: "运维",
        children: [{ text: "Docker", link: "/docs/it/operation-cloudplatform" }],
      },
    ],
  },
  {
    text: "兴趣",
    icon: "Fire",
    children: [{ text: "理财", children: [{ text: "基础知识", link: "/docs/interest/money-home" }, { text: "首板", link: "/docs/interest/first-home" }, { text: "数字货币", link: "/docs/interest/coin-home" }] }, { text: "读书", link: "/docs/book/book-1" }],
  },
  { text: "博客", link: "/posts", icon: "DocumentAttachment" },
  // { text: "案例", link: "/docs/others/examples", icon: "Fire" },
];
