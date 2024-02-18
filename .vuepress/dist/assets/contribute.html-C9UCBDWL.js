import { _ as _export_sfc, r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createTextVNode, d as createVNode, e as createStaticVNode } from "./app-Bka8etBM.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode(
  "p",
  null,
  "欢迎大家为 reco 主题贡献代码！",
  -1
  /* HOISTED */
);
const _hoisted_2 = /* @__PURE__ */ createBaseVNode(
  "h2",
  {
    id: "项目初始化",
    tabindex: "-1"
  },
  [
    /* @__PURE__ */ createBaseVNode("a", {
      class: "header-anchor",
      href: "#项目初始化",
      "aria-hidden": "true"
    }, "#"),
    /* @__PURE__ */ createTextVNode(" 项目初始化")
  ],
  -1
  /* HOISTED */
);
const _hoisted_3 = {
  href: "https://github.com/vuepress-reco/vuepress-theme-reco",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_4 = /* @__PURE__ */ createBaseVNode(
  "code",
  null,
  "pnpm",
  -1
  /* HOISTED */
);
const _hoisted_5 = /* @__PURE__ */ createStaticVNode('<p>以上准备工作完成以后，进入项目文件夹，并执行以下命令：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装</span>\n<span class="token function">pnpm</span> <span class="token function">install</span>\n\n<span class="token comment"># 编译</span>\n<span class="token function">pnpm</span> build\n\n<span class="token comment"># 启动</span>\n<span class="token function">pnpm</span> dev\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个时候，项目已经启动，你可以 <code>example</code> 中去测试你的功能，要确保你的代码已经经过详细测试，并通过了 <code>pnpm example:build</code> 命令，功能测试完一定要同步文档。</p><h2 id="代码提交规范" tabindex="-1"><a class="header-anchor" href="#代码提交规范" aria-hidden="true">#</a> 代码提交规范</h2><p>提交 commit 请使用 <code>pnpm commit</code> 命令，严格按照规范去提交代码，commit 信息务必使用英文。</p><h2 id="pr-规范" tabindex="-1"><a class="header-anchor" href="#pr-规范" aria-hidden="true">#</a> PR 规范</h2><p>PR 标题简单明了，PR 详情中要详细描述你所提交的内容，必要时要贴图，PR 信息务必使用英文。</p>', 7);
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    _hoisted_2,
    createBaseVNode("p", null, [
      createTextVNode("首先你需要 fork 一份 "),
      createBaseVNode("a", _hoisted_3, [
        createTextVNode("reco 主题仓库"),
        createVNode(_component_ExternalLinkIcon)
      ]),
      createTextVNode("，并 clone 到本地，并确保本地已经安装了 "),
      _hoisted_4,
      createTextVNode("。")
    ]),
    _hoisted_5
  ]);
}
const contribute_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "contribute.html.vue"]]);
export {
  contribute_html as default
};
