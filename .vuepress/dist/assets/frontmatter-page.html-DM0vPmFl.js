import { _ as _export_sfc, r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createTextVNode, e as createVNode, f as withCtx, d as createStaticVNode } from "./app-DdS92TXQ.js";
const _sfc_main = {};
const _hoisted_1 = { class: "custom-container tip" };
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v4h1"></path></g></svg><p class="custom-container-title">TIP</p>', 2);
const _hoisted_4 = /* @__PURE__ */ createBaseVNode(
  "code",
  null,
  "vuepress-theme-reco",
  -1
  /* HOISTED */
);
const _hoisted_5 = /* @__PURE__ */ createBaseVNode(
  "code",
  null,
  "Frontmatter",
  -1
  /* HOISTED */
);
const _hoisted_6 = {
  href: "https://v2.vuepress.vuejs.org/zh/reference/frontmatter.html",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_7 = /* @__PURE__ */ createBaseVNode(
  "h2",
  {
    id: "password",
    tabindex: "-1"
  },
  [
    /* @__PURE__ */ createBaseVNode("a", {
      class: "header-anchor",
      href: "#password",
      "aria-hidden": "true"
    }, "#"),
    /* @__PURE__ */ createTextVNode(" password")
  ],
  -1
  /* HOISTED */
);
const _hoisted_8 = /* @__PURE__ */ createBaseVNode(
  "li",
  null,
  [
    /* @__PURE__ */ createTextVNode("类型："),
    /* @__PURE__ */ createBaseVNode("code", null, "string ｜ string[]")
  ],
  -1
  /* HOISTED */
);
const _hoisted_9 = /* @__PURE__ */ createBaseVNode(
  "li",
  null,
  "详情：页面加密密码。",
  -1
  /* HOISTED */
);
const _hoisted_10 = /* @__PURE__ */ createBaseVNode(
  "h2",
  {
    id: "sticky",
    tabindex: "-1"
  },
  [
    /* @__PURE__ */ createBaseVNode("a", {
      class: "header-anchor",
      href: "#sticky",
      "aria-hidden": "true"
    }, "#"),
    /* @__PURE__ */ createTextVNode(" sticky")
  ],
  -1
  /* HOISTED */
);
const _hoisted_11 = /* @__PURE__ */ createBaseVNode(
  "ul",
  null,
  [
    /* @__PURE__ */ createBaseVNode("li", null, [
      /* @__PURE__ */ createTextVNode("类型："),
      /* @__PURE__ */ createBaseVNode("code", null, "number")
    ]),
    /* @__PURE__ */ createBaseVNode("li", null, "详情：文章置顶，按照 1, 2, 3, ... 来降序排序。")
  ],
  -1
  /* HOISTED */
);
const _hoisted_12 = /* @__PURE__ */ createBaseVNode(
  "h2",
  {
    id: "pageclass",
    tabindex: "-1"
  },
  [
    /* @__PURE__ */ createBaseVNode("a", {
      class: "header-anchor",
      href: "#pageclass",
      "aria-hidden": "true"
    }, "#"),
    /* @__PURE__ */ createTextVNode(" pageClass")
  ],
  -1
  /* HOISTED */
);
const _hoisted_13 = /* @__PURE__ */ createStaticVNode('<li><p>类型： <code>string</code></p></li><li><p>详情：为当前页面添加额外的类名。</p></li><li><p>示例：</p><div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>  <span class="token hr punctuation">---</span>\n  pageClass: custom-page-class\n  <span class="token hr punctuation">---</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后你可以在 <code>.vuepress/styles/index.css</code> 文件中为这个页面添加自定义样式：</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.theme-container</span> <span class="token punctuation">{</span>\n  <span class="token selector">.custom-page-class</span> <span class="token punctuation">{</span>\n    <span class="token comment">/* 页面样式 */</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>', 3);
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  const _component_RouterLink = resolveComponent("RouterLink");
  return openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1, [
      _hoisted_2,
      createBaseVNode("p", null, [
        createTextVNode("以下为 "),
        _hoisted_4,
        createTextVNode(" 特有的 "),
        _hoisted_5,
        createTextVNode(" 配置，其他配置请参考 "),
        createBaseVNode("a", _hoisted_6, [
          createTextVNode("Vuepress Frontmatter"),
          createVNode(_component_ExternalLinkIcon)
        ]),
        createTextVNode("。")
      ])
    ]),
    _hoisted_7,
    createBaseVNode("ul", null, [
      _hoisted_8,
      _hoisted_9,
      createBaseVNode("li", null, [
        createTextVNode("参考："),
        createVNode(_component_RouterLink, { to: "/docs/theme/password.html" }, {
          default: withCtx(() => [
            createTextVNode("参考 -> 主题配置 -> 加密")
          ]),
          _: 1
          /* STABLE */
        })
      ])
    ]),
    _hoisted_10,
    _hoisted_11,
    _hoisted_12,
    createBaseVNode("ul", null, [
      _hoisted_13,
      createBaseVNode("li", null, [
        createBaseVNode("p", null, [
          createTextVNode("参考："),
          createVNode(_component_RouterLink, { to: "/docs/theme/custom-style.html" }, {
            default: withCtx(() => [
              createTextVNode("默认主题 > 样式 > Style 文件")
            ]),
            _: 1
            /* STABLE */
          })
        ])
      ])
    ])
  ]);
}
const frontmatterPage_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "frontmatter-page.html.vue"]]);
export {
  frontmatterPage_html as default
};
