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
    text: "兴趣",
    icon: "Fire",
    children: [{ text: "Money", link: "/docs/interest/spring-home" }],
  },
  { text: "博客", link: "/posts", icon: "DocumentAttachment" },
  { text: "案例", link: "/docs/others/examples", icon: "Fire" },
];
