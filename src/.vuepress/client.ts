/**
 * 客户端配置 - 注册全局组件
 * 作者: jiuxialb
 * 创建时间: 2026-01-22
 */
import { defineClientConfig } from 'vuepress/client';
import DeployInfo from './components/DeployInfo.vue';

export default defineClientConfig({
    enhance({ app }) {
        // 注册部署信息组件为全局组件
        app.component('DeployInfo', DeployInfo);
    },
});
