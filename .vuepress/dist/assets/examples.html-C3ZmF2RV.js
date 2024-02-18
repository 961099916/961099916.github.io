import { _ as _export_sfc, r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createTextVNode, e as createVNode, d as createStaticVNode } from "./app-xAEZVdTX.js";
const _sfc_main = {};
const _hoisted_1 = { class: "custom-container tip" };
const _hoisted_2 = /* @__PURE__ */ createStaticVNode('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v4h1"></path></g></svg><p class="custom-container-title">TIP</p>', 2);
const _hoisted_4 = {
  href: "https://github.com/vuepress-reco/vuepress-theme-reco/edit/main/docs/.vuepress/data/examples.ts",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_5 = /* @__PURE__ */ createBaseVNode(
  "strong",
  null,
  "要求：站点不可删除 footer 的主题推荐。",
  -1
  /* HOISTED */
);
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  const _component_examples = resolveComponent("examples");
  return openBlock(), createElementBlock("div", null, [
    createBaseVNode("div", _hoisted_1, [
      _hoisted_2,
      createBaseVNode("p", null, [
        createTextVNode("添加案例请点击 "),
        createBaseVNode("a", _hoisted_4, [
          createTextVNode("这里"),
          createVNode(_component_ExternalLinkIcon)
        ]),
        createTextVNode(" 在最上面添加配置信息。（"),
        _hoisted_5,
        createTextVNode("）")
      ])
    ]),
    createVNode(_component_examples)
  ]);
}
const examples_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "examples.html.vue"]]);
export {
  examples_html as default
};
