import { _ as _export_sfc, r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createTextVNode, d as createVNode, e as createStaticVNode } from "./app-C7ug4_2w.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<div class="custom-container tip"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v4h1"></path></g></svg><p class="custom-container-title">TIP</p><p>我们默认配置了 postcss 的 plugins ，这是保证项目启动的基本配置。</p></div>', 1);
const _hoisted_2 = {
  href: "https://v2.vuepress.vuejs.org/reference/bundler/vite.html",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_3 = /* @__PURE__ */ createBaseVNode(
  "h2",
  {
    id: "配置",
    tabindex: "-1"
  },
  [
    /* @__PURE__ */ createBaseVNode("a", {
      class: "header-anchor",
      href: "#配置",
      "aria-hidden": "true"
    }, "#"),
    /* @__PURE__ */ createTextVNode(" 配置")
  ],
  -1
  /* HOISTED */
);
const _hoisted_4 = /* @__PURE__ */ createBaseVNode(
  "h3",
  {
    id: "vitebundler",
    tabindex: "-1"
  },
  [
    /* @__PURE__ */ createBaseVNode("a", {
      class: "header-anchor",
      href: "#vitebundler",
      "aria-hidden": "true"
    }, "#"),
    /* @__PURE__ */ createTextVNode(" viteBundler")
  ],
  -1
  /* HOISTED */
);
const _hoisted_5 = /* @__PURE__ */ createBaseVNode(
  "li",
  null,
  "描述：自定义打包配置",
  -1
  /* HOISTED */
);
const _hoisted_6 = /* @__PURE__ */ createBaseVNode(
  "li",
  null,
  "viteOptions：接受 Vite 的所有选项。",
  -1
  /* HOISTED */
);
const _hoisted_7 = {
  href: "https://www.npmjs.com/package/@vitejs/plugin-vue",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_8 = /* @__PURE__ */ createStaticVNode('<div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineUserConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vuepress&#39;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> recoTheme <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vuepress-theme-reco&#39;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineUserConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  theme<span class="token operator">:</span> <span class="token function">recoTheme</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    viteBundler<span class="token operator">:</span> <span class="token punctuation">{</span>\n      viteOptions<span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token operator">...</span><span class="token keyword">do</span> somthing\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n      vuePluginOptions<span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token operator">...</span><span class="token keyword">do</span> somthing\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>', 1);
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("p", null, [
      createTextVNode("如果你不满意我们现有的打包或者想要自定义打包配置，你可以使用该功能，该配置为 vuepress@2.x 提供的基于 Vite 的打包配置，"),
      createBaseVNode("a", _hoisted_2, [
        createTextVNode("详情参考"),
        createVNode(_component_ExternalLinkIcon)
      ]),
      createTextVNode("，")
    ]),
    _hoisted_3,
    _hoisted_4,
    createBaseVNode("ul", null, [
      _hoisted_5,
      createBaseVNode("li", null, [
        createTextVNode("配置项： "),
        createBaseVNode("ul", null, [
          _hoisted_6,
          createBaseVNode("li", null, [
            createTextVNode("vuePluginOptions： 接受 "),
            createBaseVNode("a", _hoisted_7, [
              createTextVNode("@vitejs/plugin-vue"),
              createVNode(_component_ExternalLinkIcon)
            ]),
            createTextVNode(" 的所有选项")
          ])
        ])
      ])
    ]),
    _hoisted_8
  ]);
}
const setViteBundler_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "set-vite-bundler.html.vue"]]);
export {
  setViteBundler_html as default
};
