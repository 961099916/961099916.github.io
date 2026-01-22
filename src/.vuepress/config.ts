import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "九夏的博客",
  description: "九夏的博客",
  theme,
  // 百度/360/头条 自动推送通过 client.ts 中的脚本实现
  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
