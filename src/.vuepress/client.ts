/**
 * 客户端配置 - 注册全局组件和搜索引擎自动推送
 * 作者: jiuxialb
 * 创建时间: 2026-01-22
 */
import { defineClientConfig } from 'vuepress/client';
import { onMounted } from 'vue';
import DeployInfo from './components/DeployInfo.vue';

export default defineClientConfig({
    enhance({ app }) {
        // 注册部署信息组件为全局组件
        app.component('DeployInfo', DeployInfo);
    },
    setup() {
        onMounted(() => {
            // 仅在生产环境执行自动推送
            if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
                // 百度自动推送
                initBaiduPush();
                // 360自动推送
                init360Push();
                // 头条自动推送
                initToutiaoPush();
            }
        });
    },
});

/**
 * 百度自动推送
 * 当访客访问页面时，自动将页面URL推送给百度
 */
function initBaiduPush() {
    try {
        const bp = document.createElement('script');
        const curProtocol = window.location.protocol.split(':')[0];
        if (curProtocol === 'https') {
            bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
        } else {
            bp.src = 'http://push.zhanzhang.baidu.com/push.js';
        }
        bp.async = true;
        const s = document.getElementsByTagName('script')[0];
        s?.parentNode?.insertBefore(bp, s);
        console.log('[SEO] 百度自动推送已加载');
    } catch (e) {
        console.warn('[SEO] 百度自动推送加载失败', e);
    }
}

/**
 * 360自动推送
 */
function init360Push() {
    try {
        const src = document.location.protocol === 'https:'
            ? 'https://js.passport.qihucdn.com/11.0.1.js?d182b3f28525f2db83acfaaf6e696dba'
            : 'http://jspassport.ssl.qhimg.com/11.0.1.js?d182b3f28525f2db83acfaaf6e696dba';
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.id = 'sozz';
        const s = document.getElementsByTagName('script')[0];
        s?.parentNode?.insertBefore(script, s);
        console.log('[SEO] 360自动推送已加载');
    } catch (e) {
        console.warn('[SEO] 360自动推送加载失败', e);
    }
}

/**
 * 头条(字节跳动)自动推送
 */
function initToutiaoPush() {
    try {
        const el = document.createElement('script');
        el.src = 'https://lf1-cdn-tos.bytegoofy.com/goofy/ttzz/push.js?47a02b0c4b30ed2fd53e2ac4be75cf8420ecddecb9e360d8f05fea0359d41ca7f7d18e9b58f1b58e1f4bc2b4c912c15f5f42a519cb77dade7023ede5e8e377e2';
        el.async = true;
        const s = document.getElementsByTagName('script')[0];
        s?.parentNode?.insertBefore(el, s);
        console.log('[SEO] 头条自动推送已加载');
    } catch (e) {
        console.warn('[SEO] 头条自动推送加载失败', e);
    }
}
