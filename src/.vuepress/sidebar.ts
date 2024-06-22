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
      icon: "",
      prefix: "tomcat",
      children: "structure",
    },
    {
      text: "xxl-job",
      icon: "",
      prefix: "xxl-job",
      children: "structure",
    },
    {
      text: "nacos",
      icon: "",
      prefix: "nacos",
      children: "structure",
    },
    {
      text: "rocketmq",
      icon: "",
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
      icon: "",
      prefix: "docker",
      children: "structure",
    },
    {
      text: "Kubernetes",
      icon: "",
      prefix: "kubernetes",
      children: "structure",
    },
    {
      text: "istio",
      icon: "",
      prefix: "istio",
      children: "structure",
    },
    {
      text: "linux",
      icon: "",
      prefix: "linux",
      children: "structure",
    },
  ],
  "/架构/": [
    {
      text: "架构",
      icon: "",
      prefix: "",
      children: "structure",
    },
  ],
  "/数据库/": [
    {
      text: "mysql",
      icon: "",
      prefix: "mysql",
      children: "structure",
    },
    {
      text: "redis",
      icon: "",
      prefix: "redis",
      children: "structure",
    },
    {
      text: "elasticsearch",
      icon: "",
      prefix: "elasticsearch",
      children: "structure",
    },
    {
      text: "mongodb",
      icon: "",
      prefix: "mongodb",
      children: "structure",
    },

  ],
  "/算法/": [
    {
      text: "数据结构",
      icon: "",
      prefix: "数据结构",
      children: "structure",
    },
    {
      text: "排序",
      icon: "",
      prefix: "排序",
      children: "structure",
    },
    {
      text: "搜索",
      icon: "",
      prefix: "搜索",
      children: "structure",
    },
    {
      text: "领域算法",
      icon: "",
      prefix: "领域算法",
      children: "structure",
    },
    {
      text: "算法思想",
      icon: "",
      prefix: "算法思想",
      children: "structure",
    },
  ],
  "/通用/": [
    {
      text: "设计模式",
      icon: "",
      prefix: "设计模式",
      children: "structure",
    },
    {
      text: "操作系统",
      icon: "",
      prefix: "操作系统",
      children: "structure",
    },
  ],
  "/实践/": [
    {
      text: "实践",
      icon: "",
      prefix: "",
      children: "structure",
    },
  ],
  "/每日复盘/": [
    {
      text: "每日复盘",
      icon: "",
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
      icon: "",
      prefix: "游资",
      children: "structure",
    },
    {
      text: "个股信息",
      icon: "",
      prefix: "个股信息",
      children: "structure",
    },
    {
      text: "题材",
      icon: "",
      prefix: "题材",
      children: "structure",
    },
  ],
  "/读书/": [
    {
      text: "读书",
      icon: "",
      prefix: "",
      children: "structure",
    },
  ],

});
