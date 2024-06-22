import { sidebar } from "vuepress-theme-hope";

export default sidebar({

  "/": [
  ],

  "/java/": [
    {
      text: "教程",
      icon: "",
      prefix: "教程",
      children: "structure",
    },
    {
      text: "面试",
      icon: "",
      prefix: "面试",
      children: "structure",
    },
  ],
  "/中间件/": [
    {
      text: "tomcat",
      icon: "bxs--component",
      prefix: "tomcat",
      children: "structure",
    },
    {
      text: "xxl-job",
      icon: "bxs--component",
      prefix: "xxl-job",
      children: "structure",
    },
    {
      text: "nacos",
      icon: "bxs--component",
      prefix: "nacos",
      children: "structure",
    },
    {
      text: "rocketmq",
      icon: "bxs--component",
      prefix: "rocketmq",
      children: "structure",
    },
  ],
  "/框架/": [
    {
      text: "mybatis",
      icon: "",
      prefix: "mybatis",
      children: "structure",
    },
    {
      text: "spring",
      icon: "",
      prefix: "spring",
      children: "structure",
    },
  ],
  "/运维/": [
    {
      text: "Docker",
      icon: "carbon--operations-record",
      prefix: "docker",
      children: "structure",
    },
    {
      text: "Kubernetes",
      icon: "carbon--operations-record",
      prefix: "kubernetes",
      children: "structure",
    },
    {
      text: "istio",
      icon: "carbon--operations-record",
      prefix: "istio",
      children: "structure",
    },
    {
      text: "linux",
      icon: "carbon--operations-record",
      prefix: "linux",
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
      text: "mysql",
      icon: "database",
      prefix: "mysql",
      children: "structure",
    },
    {
      text: "redis",
      icon: "database",
      prefix: "redis",
      children: "structure",
    },
    {
      text: "elasticsearch",
      icon: "database",
      prefix: "elasticsearch",
      children: "structure",
    },
    {
      text: "mongodb",
      icon: "database",
      prefix: "mongodb",
      children: "structure",
    },

  ],
  "/算法/": [
    {
      text: "数据结构",
      icon: "algorithms",
      prefix: "数据结构",
      children: "structure",
    },
    {
      text: "排序",
      icon: "algorithms",
      prefix: "排序",
      children: "structure",
    },
    {
      text: "搜索",
      icon: "algorithms",
      prefix: "搜索",
      children: "structure",
    },
    {
      text: "领域算法",
      icon: "algorithms",
      prefix: "领域算法",
      children: "structure",
    },
    {
      text: "算法思想",
      icon: "algorithms",
      prefix: "算法思想",
      children: "structure",
    },
  ],
  "/通用/": [
    {
      text: "设计模式",
      icon: "cics-program",
      prefix: "设计模式",
      children: "structure",
    },
    {
      text: "操作系统",
      icon: "cics-program",
      prefix: "操作系统",
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
