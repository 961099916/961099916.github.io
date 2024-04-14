import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  { text: "每日复盘", icon: "mdi--calendar-day", link: "/每日复盘/" },
  {
    text: "Java",
    icon: "devicon-plain--java-wordmark",
    link: "/java/",
  },
  {
    text: "框架",
    icon: "iconoir--frame",
    link: "/框架/",
  },
  {
    text: "中间件",
    icon: "bxs--component",
    link: "/中间件/",
  },
  {
    text: "运维",
    icon: "carbon--operations-record",
    link: "/运维/",
  },
  {
    text: "理财",
    icon: "dashicons--money",
    link: "/理财/",
  },
  {
    text: "读书",
    icon: "iconoir--book",
    link: "/读书/",

  },
]);
