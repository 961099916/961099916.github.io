import { _ as _export_sfc, o as openBlock, c as createElementBlock, d as createStaticVNode } from "./app-DdS92TXQ.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<p>通过 <code>catalogTitle</code> 设置文章右侧目录的标题。</p><h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h2><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// .vuepress/config.ts</span>\n\n<span class="token keyword">import</span> <span class="token punctuation">{</span> defineUserConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vuepress&#39;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> recoTheme <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vuepress-theme-reco&#39;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineUserConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  theme<span class="token operator">:</span> <span class="token function">recoTheme</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    catalogTitle<span class="token operator">:</span> <span class="token string">&#39;自定义目录标题&#39;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>', 3);
const _hoisted_4 = [
  _hoisted_1
];
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("div", null, _hoisted_4);
}
const customCatalogTitle_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "custom-catalog-title.html.vue"]]);
export {
  customCatalogTitle_html as default
};
