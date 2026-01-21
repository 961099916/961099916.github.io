import { defineUserConfig } from "vuepress";
import { watermarkPlugin } from '@vuepress/plugin-watermark';
import { searchConsolePlugin } from 'vuepress-plugin-china-search-console';
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
        width: 200,                   // 水印宽度
        height: 200,                  // 水印高度
        globalAlpha: 0.1,             // 透明度 (0.0-1.0)，非常淡雅
        rotate: -22,                  // 旋转角度
        fontSize: '14px',             // 字体大小
        fontColor: '#999999',         // 字体颜色，淡灰色
        fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      },
    }),
    // 中国搜索引擎自动推送插件
    searchConsolePlugin({
      // 百度自动推送 - 访客访问页面时自动推送给百度
      baiduAutoPush: true,
      // 360自动推送 - 访客访问页面时自动推送给360搜索
      autoPush360: true,
      // 头条(字节跳动)自动推送 - 访客访问页面时自动推送给头条搜索
      toutiaoAutoPush: true,
    }),
  ],
  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
