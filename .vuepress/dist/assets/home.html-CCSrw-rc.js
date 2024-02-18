import { _ as _export_sfc, r as resolveComponent, o as openBlock, c as createElementBlock, e as createVNode, f as withCtx, d as createStaticVNode, a as createBaseVNode, b as createTextVNode } from "./app-EyHCcPZy.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2><p>某些场景下，文档的首页并不一定是文档根目录的 <code>README.md</code> 文件，这时我们可以在 <code>Frontmatter</code> 中设置 <code>home: true</code> 来置顶首页，并通过 <code>themeConfig.home</code> 来指定首页路径。</p><h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h2>', 3);
const _hoisted_4 = /* @__PURE__ */ createBaseVNode(
  "div",
  {
    class: "language-yaml line-numbers-mode",
    "data-ext": "yml"
  },
  [
    /* @__PURE__ */ createBaseVNode("pre", { class: "language-yaml" }, [
      /* @__PURE__ */ createBaseVNode("code", null, [
        /* @__PURE__ */ createBaseVNode("span", { class: "token comment" }, "# another-home-path.md"),
        /* @__PURE__ */ createTextVNode("\n"),
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "---"),
        /* @__PURE__ */ createTextVNode("\n"),
        /* @__PURE__ */ createBaseVNode("span", { class: "token key atrule" }, "title"),
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ":"),
        /* @__PURE__ */ createTextVNode(" 指定首页\n"),
        /* @__PURE__ */ createBaseVNode("span", { class: "token key atrule" }, "home"),
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ":"),
        /* @__PURE__ */ createTextVNode(),
        /* @__PURE__ */ createBaseVNode("span", { class: "token boolean important" }, "true"),
        /* @__PURE__ */ createTextVNode("\n"),
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "---"),
        /* @__PURE__ */ createTextVNode("\n")
      ])
    ]),
    /* @__PURE__ */ createBaseVNode("div", {
      class: "line-numbers",
      "aria-hidden": "true"
    }, [
      /* @__PURE__ */ createBaseVNode("div", { class: "line-number" }),
      /* @__PURE__ */ createBaseVNode("div", { class: "line-number" }),
      /* @__PURE__ */ createBaseVNode("div", { class: "line-number" }),
      /* @__PURE__ */ createBaseVNode("div", { class: "line-number" }),
      /* @__PURE__ */ createBaseVNode("div", { class: "line-number" })
    ])
  ],
  -1
  /* HOISTED */
);
const _hoisted_5 = /* @__PURE__ */ createBaseVNode(
  "div",
  {
    class: "language-typescript line-numbers-mode",
    "data-ext": "ts"
  },
  [
    /* @__PURE__ */ createBaseVNode("pre", { class: "language-typescript" }, [
      /* @__PURE__ */ createBaseVNode("code", null, [
        /* @__PURE__ */ createBaseVNode("span", { class: "token comment" }, "// .vuepress/config.ts"),
        /* @__PURE__ */ createTextVNode("\n\n"),
        /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "import"),
        /* @__PURE__ */ createTextVNode(),
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
        /* @__PURE__ */ createTextVNode(" defineUserConfig "),
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
        /* @__PURE__ */ createTextVNode(),
        /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "from"),
        /* @__PURE__ */ createTextVNode(),
        /* @__PURE__ */ createBaseVNode("span", { class: "token string" }, "'vuepress'"),
        /* @__PURE__ */ createTextVNode("\n"),
        /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "import"),
        /* @__PURE__ */ createTextVNode(),
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
        /* @__PURE__ */ createTextVNode(" recoTheme "),
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
        /* @__PURE__ */ createTextVNode(),
        /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "from"),
        /* @__PURE__ */ createTextVNode(),
        /* @__PURE__ */ createBaseVNode("span", { class: "token string" }, "'vuepress-theme-reco'"),
        /* @__PURE__ */ createTextVNode("\n\n"),
        /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "export"),
        /* @__PURE__ */ createTextVNode(),
        /* @__PURE__ */ createBaseVNode("span", { class: "token keyword" }, "default"),
        /* @__PURE__ */ createTextVNode(),
        /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "defineUserConfig"),
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
        /* @__PURE__ */ createTextVNode("\n  theme"),
        /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, ":"),
        /* @__PURE__ */ createTextVNode(),
        /* @__PURE__ */ createBaseVNode("span", { class: "token function" }, "recoTheme"),
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "("),
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "{"),
        /* @__PURE__ */ createTextVNode("\n    home"),
        /* @__PURE__ */ createBaseVNode("span", { class: "token operator" }, ":"),
        /* @__PURE__ */ createTextVNode(),
        /* @__PURE__ */ createBaseVNode("span", { class: "token string" }, "'/another-home-path'"),
        /* @__PURE__ */ createTextVNode("\n  "),
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
        /* @__PURE__ */ createTextVNode("\n"),
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, "}"),
        /* @__PURE__ */ createBaseVNode("span", { class: "token punctuation" }, ")"),
        /* @__PURE__ */ createTextVNode("\n")
      ])
    ]),
    /* @__PURE__ */ createBaseVNode("div", {
      class: "line-numbers",
      "aria-hidden": "true"
    }, [
      /* @__PURE__ */ createBaseVNode("div", { class: "line-number" }),
      /* @__PURE__ */ createBaseVNode("div", { class: "line-number" }),
      /* @__PURE__ */ createBaseVNode("div", { class: "line-number" }),
      /* @__PURE__ */ createBaseVNode("div", { class: "line-number" }),
      /* @__PURE__ */ createBaseVNode("div", { class: "line-number" }),
      /* @__PURE__ */ createBaseVNode("div", { class: "line-number" }),
      /* @__PURE__ */ createBaseVNode("div", { class: "line-number" }),
      /* @__PURE__ */ createBaseVNode("div", { class: "line-number" }),
      /* @__PURE__ */ createBaseVNode("div", { class: "line-number" }),
      /* @__PURE__ */ createBaseVNode("div", { class: "line-number" })
    ])
  ],
  -1
  /* HOISTED */
);
function _sfc_render(_ctx, _cache) {
  const _component_CodeGroupItem = resolveComponent("CodeGroupItem");
  const _component_CodeGroup = resolveComponent("CodeGroup");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createVNode(_component_CodeGroup, null, {
      default: withCtx(() => [
        createVNode(_component_CodeGroupItem, { title: "指定首页" }, {
          default: withCtx(() => [
            _hoisted_4
          ]),
          _: 1
          /* STABLE */
        }),
        createVNode(_component_CodeGroupItem, { title: "指定首页路径" }, {
          default: withCtx(() => [
            _hoisted_5
          ]),
          _: 1
          /* STABLE */
        })
      ]),
      _: 1
      /* STABLE */
    })
  ]);
}
const home_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "home.html.vue"]]);
export {
  home_html as default
};
