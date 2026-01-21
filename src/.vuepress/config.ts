import { defineUserConfig } from "vuepress";
import { watermarkPlugin } from '@vuepress/plugin-watermark';
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "九夏的博客",
  description: "九夏的博客",
  theme,
  // 水印插件配置 - 作者: jiuxialb, 创建时间: 2026-01-22
  plugins: [
    watermarkPlugin({
      enabled: true,
      watermarkOptions: {
        content: '九夏',
        width: 200,                   // 水印宽度
        height: 200,                  // 水印高度
        globalAlpha: 0.1,             // 透明度 (0.0-1.0)，非常淡雅
        rotate: -22,                  // 旋转角度
        fontSize: '14px',             // 字体大小
        fontColor: '#999999',         // 字体颜色，淡灰色
        fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      },
    }),
  ],
  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
