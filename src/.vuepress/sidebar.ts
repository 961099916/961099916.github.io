import { sidebar } from "vuepress-theme-hope";

export default sidebar({

  "/": [
  ],
  "/每日复盘/": [
    {
      text: "每日复盘",
      icon: "laptop-code",
      prefix: "",
      children: "structure",
    },
  ],
  "/java/": [
    {
      text: "JAVA",
      icon: "laptop-code",
      prefix: "",
      children: "structure",
    },
  ],
  "/中间件/": [
    {
      text: "中间件",
      icon: "laptop-code",
      prefix: "",
      children: "structure",
    },
  ],
  "/运维/": [
    {
      text: "运维",
      icon: "laptop-code",
      prefix: "",
      children: "structure",
    },
  ],
  "/理财/": [
    "总结",
    "看盘",
    "弱转强",
    {
      text: "游资",
      icon: "laptop-code",
      prefix: "游资",
      children: "structure",
    },
    {
      text: "个股信息",
      icon: "laptop-code",
      prefix: "个股信息",
      children: "structure",
    },
  ],
  "/读书/": [
    {
      text: "读书",
      icon: "laptop-code",
      prefix: "",
      children: "structure",
    },
  ],
  "/框架/": [
    {
      text: "框架",
      icon: "laptop-code",
      prefix: "",
      children: "structure",
    },
  ],
});
