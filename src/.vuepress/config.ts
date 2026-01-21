import { defineUserConfig } from "vuepress";
import { watermarkPlugin } from '@vuepress/plugin-watermark';
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "九夏的博客",
  description: "九夏的博客",
  theme,
  // 插件配置 - 作者: jiuxialb, 创建时间: 2026-01-22
  plugins: [
    // 水印插件
    watermarkPlugin({
      enabled: true,
      watermarkOptions: {
        content: '九夏',
        width: 200,
        height: 200,
        globalAlpha: 0.1,
        rotate: -22,
        fontSize: '14px',
        fontColor: '#999999',
        fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      },
    }),
  ],
  // 百度/360/头条 自动推送通过 client.ts 中的脚本实现
  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
