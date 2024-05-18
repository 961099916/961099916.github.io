import { sidebar } from "vuepress-theme-hope";

export default sidebar({

  "/": [
  ],

  "/java/": [
    {
      text: "JAVA",
      icon: "devicon-plain--java-wordmark",
      prefix: "",
      children: "structure",
    },
  ],
  "/中间件/": [
    {
      text: "中间件",
      icon: "bxs--component",
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
  "/运维/": [
    {
      text: "运维",
      icon: "carbon--operations-record",
      prefix: "",
      children: "structure",
    },
  ],
  "/架构/": [
    {
      text: "架构",
      icon: "reference-architecture",
      prefix: "",
      children: "structure",
    },
  ],
  "/数据库/": [
    {
      text: "数据库",
      icon: "database",
      prefix: "",
      children: "structure",
    },
  ],
  "/算法/": [
    {
      text: "算法",
      icon: "algorithms",
      prefix: "",
      children: "structure",
    },
  ],
  "/通用/": [
    {
      text: "通用",
      icon: "cics-program",
      prefix: "",
      children: "structure",
    },
  ],
  "/实践/": [
    {
      text: "实践",
      icon: "mask-happly-bold",
      prefix: "",
      children: "structure",
    },
  ],
  "/每日复盘/": [
    {
      text: "每日复盘",
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
    {
      text: "题材",
      icon: "laptop-code",
      prefix: "题材",
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

});
