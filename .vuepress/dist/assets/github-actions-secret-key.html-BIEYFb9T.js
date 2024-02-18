import { _ as _export_sfc, r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createTextVNode, d as createVNode, e as createStaticVNode } from "./app-C7ug4_2w.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode(
  "h2",
  {
    id: "如何在-github-actions-时使用-secretkey",
    tabindex: "-1"
  },
  [
    /* @__PURE__ */ createBaseVNode("a", {
      class: "header-anchor",
      href: "#如何在-github-actions-时使用-secretkey",
      "aria-hidden": "true"
    }, "#"),
    /* @__PURE__ */ createTextVNode(" 如何在 GitHub Actions 时使用 secretKey")
  ],
  -1
  /* HOISTED */
);
const _hoisted_2 = /* @__PURE__ */ createBaseVNode(
  "h3",
  {
    id: "问题",
    tabindex: "-1"
  },
  [
    /* @__PURE__ */ createBaseVNode("a", {
      class: "header-anchor",
      href: "#问题",
      "aria-hidden": "true"
    }, "#"),
    /* @__PURE__ */ createTextVNode(" 问题")
  ],
  -1
  /* HOISTED */
);
const _hoisted_3 = {
  href: "https://www.lasy.site/views/%E5%89%8D%E7%AB%AF/%E4%BD%BF%E7%94%A8%20GitHub%20Actions%20%E8%87%AA%E5%8A%A8%E9%83%A8%E7%BD%B2%E5%8D%9A%E5%AE%A2.html",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_4 = /* @__PURE__ */ createBaseVNode(
  "code",
  null,
  "Github Action",
  -1
  /* HOISTED */
);
const _hoisted_5 = /* @__PURE__ */ createBaseVNode(
  "code",
  null,
  "VSSUE",
  -1
  /* HOISTED */
);
const _hoisted_6 = /* @__PURE__ */ createStaticVNode('<p>直接写在 <code>config</code> 里虽说并没有谁会盗用（吧 😃），但显然不太安全。这是原 workflow 文件中下面这段启发了我。其他的变量难道也可以这样传到服务器上？</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">with</span><span class="token punctuation">:</span>\n  <span class="token key atrule">ACCESS_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.ACCESS_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="解决方法" tabindex="-1"><a class="header-anchor" href="#解决方法" aria-hidden="true">#</a> 解决方法</h3><p>果然 <code>Github</code> 早就帮我们想好了解决办法。</p>', 4);
const _hoisted_10 = {
  href: "https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_11 = /* @__PURE__ */ createStaticVNode('<p>简单说就是在对应 repo 的 <code>Secrets</code> 区域里输入。</p><p><img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/470919/6d81c510-7f25-a039-5087-f07854d6d75e.png" alt="Screenshot 2020-03-23 13.08.05.png"></p><p><strong>注意⚠️</strong>：上图中画圈的位置的 <code>A</code>, 正确的英语语法是 <code>AN</code>, 不过这篇教程统一用 <code>A</code>, 和下面的</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>${{ secrets.THIS_IS_A_EXAMPLE }}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>也得一致!</p><p><s>英语好的朋友别嘲讽在下 😵</s></p><p>再在 <code>actions</code> 里用</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>${{ secrets.YOURKEY }}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>去取，通过 <code>env</code> 存入服务器的环境变量。就可以用啦 👻。</p><p>做个实验。<code>main.yaml</code> 里加上这样一段。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Pass Variables\n  <span class="token key atrule">env</span><span class="token punctuation">:</span>\n    <span class="token key atrule">EXAMPLE</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.THIS_IS_A_EXAMPLE <span class="token punctuation">}</span><span class="token punctuation">}</span>\n    <span class="token key atrule">NOTEXIST</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.NOT_EXIST <span class="token punctuation">}</span><span class="token punctuation">}</span>\n  <span class="token key atrule">run</span><span class="token punctuation">:</span> echo &#39;try to show secret 😉&#39; <span class="token important">&amp;&amp;</span> echo $EXAMPLE <span class="token important">&amp;&amp;</span> echo $NOT_EXIST\n</code></pre><div class="highlight-lines"><br><div class="highlight-line"> </div><div class="highlight-line"> </div><div class="highlight-line"> </div><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出下图这样的结果。github 把结果加密了，不过可以发现，有设置的 <code>THIS_IS_A_EXAMPLE</code> 和没有设置的 <code>NOT_EXIST</code>，<code>echo</code> 出来是不一样的。由此可见，已经设置成功了。</p><p><img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/470919/e72b8478-89cb-6f45-f406-e6938f81e1c7.png" alt="Screenshot 2020-03-23 13.11.39.png"></p><h3 id="实施" tabindex="-1"><a class="header-anchor" href="#实施" aria-hidden="true">#</a> 实施</h3><p>直接试试吧。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build\n  <span class="token key atrule">env</span><span class="token punctuation">:</span>\n    <span class="token key atrule">VSSUEID</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.VSSUEID <span class="token punctuation">}</span><span class="token punctuation">}</span>\n    <span class="token key atrule">VSSUESECRET</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.VSSUESECRET <span class="token punctuation">}</span><span class="token punctuation">}</span>\n  <span class="token key atrule">run</span><span class="token punctuation">:</span> npm install <span class="token important">&amp;&amp;</span> npm run build\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code>npm run build</code> 之前加上环境参数那一段。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>  <span class="token literal-property property">vssueConfig</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token literal-property property">platform</span><span class="token operator">:</span> <span class="token string">&#39;github&#39;</span><span class="token punctuation">,</span>\n    <span class="token literal-property property">owner</span><span class="token operator">:</span> <span class="token string">&#39;xyyolab&#39;</span><span class="token punctuation">,</span>\n    <span class="token literal-property property">repo</span><span class="token operator">:</span> <span class="token string">&#39;blog&#39;</span><span class="token punctuation">,</span>\n    <span class="token literal-property property">clientId</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">VSSUEID</span><span class="token punctuation">,</span>\n    <span class="token literal-property property">clientSecret</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">VSSUESECRET</span>\n  <span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>再在 <code>config</code> 内用 node 的语法去环境参数取就 OK 啦！</p><p>结果是评论功能可以使用了呀 😍。</p><p><img src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/470919/0a508150-59e8-948c-4601-b57012db2ed6.png" alt="Screenshot 2020-03-23 13.36.35.png"></p>', 21);
const _hoisted_32 = /* @__PURE__ */ createBaseVNode(
  "code",
  null,
  "main.yaml",
  -1
  /* HOISTED */
);
const _hoisted_33 = {
  href: "https://github.com/xyyolab/blog/blob/master/.github/workflows/main.yml",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_34 = /* @__PURE__ */ createBaseVNode(
  "p",
  null,
  "看起来一个小步骤但解决了大问题呢 💃。",
  -1
  /* HOISTED */
);
const _hoisted_35 = /* @__PURE__ */ createBaseVNode(
  "hr",
  null,
  null,
  -1
  /* HOISTED */
);
const _hoisted_36 = { class: "custom-container tip" };
const _hoisted_37 = /* @__PURE__ */ createStaticVNode('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v4h1"></path></g></svg><p class="custom-container-title">TIP</p>', 2);
const _hoisted_39 = {
  href: "https://github.com/xyyolab",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_40 = {
  href: "https://blog.xyyolab.com",
  target: "_blank",
  rel: "noopener noreferrer"
};
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    _hoisted_2,
    createBaseVNode("p", null, [
      createTextVNode("当我参考"),
      createBaseVNode("a", _hoisted_3, [
        createTextVNode("这篇"),
        createVNode(_component_ExternalLinkIcon)
      ]),
      createTextVNode("，使用 "),
      _hoisted_4,
      createTextVNode(" 自动部署的时候发现要使用 Secret Key 去使用 "),
      _hoisted_5,
      createTextVNode(" 评论功能，我就犯愁了。")
    ]),
    _hoisted_6,
    createBaseVNode("ul", null, [
      createBaseVNode("li", null, [
        createBaseVNode("a", _hoisted_10, [
          createTextVNode("Creating and storing encrypted secrets"),
          createVNode(_component_ExternalLinkIcon)
        ])
      ])
    ]),
    _hoisted_11,
    createBaseVNode("ul", null, [
      createBaseVNode("li", null, [
        createTextVNode("完整的 "),
        _hoisted_32,
        createTextVNode(" 请参考我的 "),
        createBaseVNode("a", _hoisted_33, [
          createTextVNode("Github"),
          createVNode(_component_ExternalLinkIcon)
        ])
      ])
    ]),
    _hoisted_34,
    _hoisted_35,
    createBaseVNode("div", _hoisted_36, [
      _hoisted_37,
      createBaseVNode("p", null, [
        createTextVNode("本文作者 "),
        createBaseVNode("a", _hoisted_39, [
          createTextVNode("xyh 🐸"),
          createVNode(_component_ExternalLinkIcon)
        ]),
        createTextVNode("，博客 "),
        createBaseVNode("a", _hoisted_40, [
          createTextVNode("xyh 🐸"),
          createVNode(_component_ExternalLinkIcon)
        ]),
        createTextVNode("。")
      ])
    ])
  ]);
}
const githubActionsSecretKey_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "github-actions-secret-key.html.vue"]]);
export {
  githubActionsSecretKey_html as default
};
