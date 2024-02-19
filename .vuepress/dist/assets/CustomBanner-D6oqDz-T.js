import { e as defineComponent, f as usePageFrontmatter, g as computed, h as withBase, i as createOneColor, r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, u as unref, t as toDisplayString, j as createCommentVNode, F as Fragment, k as renderList, l as createBlock, n as normalizeClass, m as createVNode, p as normalizeStyle, d as createStaticVNode, _ as _export_sfc } from "./app-B86TF650.js";
const _hoisted_1 = { class: "banner-brand__content" };
const _hoisted_2 = {
  key: 0,
  class: "title"
};
const _hoisted_3 = {
  key: 1,
  class: "description"
};
const _hoisted_4 = {
  key: 2,
  class: "tagline"
};
const _hoisted_5 = {
  key: 3,
  class: "btn-group"
};
const _hoisted_6 = {
  key: 4,
  class: "social-links"
};
const _hoisted_7 = /* @__PURE__ */ createStaticVNode('<div class="shields-wrapper" data-v-6310fb66><img alt="GitHub license" src="https://img.shields.io/github/license/vuepress-reco/vuepress-theme-reco?style=flat-square&amp;logo=github&amp;color=616ae5" data-v-6310fb66><img alt="GitHub stars" src="https://img.shields.io/github/stars/vuepress-reco/vuepress-theme-reco?style=flat-square&amp;logo=github&amp;color=616ae5" data-v-6310fb66><img alt="GitHub forks" src="https://img.shields.io/github/forks/vuepress-reco/vuepress-theme-reco?style=flat-square&amp;logo=github&amp;color=616ae5" data-v-6310fb66><img alt="Npm downloads" src="https://img.shields.io/npm/dt/vuepress-theme-reco?style=flat-square&amp;logo=npm&amp;color=616ae5" data-v-6310fb66><img alt="GitHub package.json version (subfolder of monorepo)" src="https://img.shields.io/github/package-json/v/vuepress-reco/vuepress-theme-reco?filename=packages%2Fvuepress-theme-reco%2Fpackage.json&amp;style=flat-square&amp;color=616ae5&amp;logo=npm" data-v-6310fb66><img alt="Npm version" src="https://img.shields.io/badge/tailwindcss-3.1.6-616ae5?style=flat-square&amp;logo=tailwindcss" data-v-6310fb66></div>', 1);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CustomBanner",
  setup(__props) {
    const frontmatter = usePageFrontmatter();
    computed(() => {
      var _a, _b, _c, _d;
      return ((_b = (_a = frontmatter.value) == null ? void 0 : _a.customBanner) == null ? void 0 : _b.heroImage) ? withBase((_d = (_c = frontmatter.value) == null ? void 0 : _c.customBanner) == null ? void 0 : _d.heroImage) : null;
    });
    const buttons = computed(() => {
      var _a, _b;
      return ((_b = (_a = frontmatter.value) == null ? void 0 : _a.customBanner) == null ? void 0 : _b.buttons) || [];
    });
    const socialLinks = computed(() => {
      var _a, _b;
      return (((_b = (_a = frontmatter.value) == null ? void 0 : _a.customBanner) == null ? void 0 : _b.socialLinks) || []).map((item) => {
        if (!item.color)
          item.color = createOneColor();
        return item;
      });
    });
    computed(
      () => frontmatter.value.customBanner.heroImageStyle || {}
    );
    const bgImageStyle = computed(() => {
      var _a;
      const { bgImageStyle: bgImageStyle2, bgImage } = ((_a = frontmatter.value) == null ? void 0 : _a.customBanner) || {};
      const initBgImageStyle = bgImage ? {
        overflow: "hidden",
        background: `url(${withBase(bgImage)}) center/cover no-repeat`
      } : {};
      return bgImageStyle2 ? { ...initBgImageStyle, ...bgImageStyle2 } : initBgImageStyle;
    });
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
      const _component_Xicons = resolveComponent("Xicons");
      return openBlock(), createElementBlock(
        "section",
        {
          class: "banner-brand__wrapper",
          style: normalizeStyle({ ...bgImageStyle.value })
        },
        [
          createBaseVNode("div", _hoisted_1, [
            ((_b = (_a = unref(frontmatter)) == null ? void 0 : _a.customBanner) == null ? void 0 : _b.title) ? (openBlock(), createElementBlock(
              "h1",
              _hoisted_2,
              toDisplayString((_d = (_c = unref(frontmatter)) == null ? void 0 : _c.customBanner) == null ? void 0 : _d.title),
              1
              /* TEXT */
            )) : createCommentVNode("v-if", true),
            ((_f = (_e = unref(frontmatter)) == null ? void 0 : _e.customBanner) == null ? void 0 : _f.description) ? (openBlock(), createElementBlock(
              "p",
              _hoisted_3,
              toDisplayString((_h = (_g = unref(frontmatter)) == null ? void 0 : _g.customBanner) == null ? void 0 : _h.description),
              1
              /* TEXT */
            )) : createCommentVNode("v-if", true),
            ((_j = (_i = unref(frontmatter)) == null ? void 0 : _i.customBanner) == null ? void 0 : _j.tagline) ? (openBlock(), createElementBlock(
              "p",
              _hoisted_4,
              toDisplayString((_l = (_k = unref(frontmatter)) == null ? void 0 : _k.customBanner) == null ? void 0 : _l.tagline),
              1
              /* TEXT */
            )) : createCommentVNode("v-if", true),
            buttons.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_5, [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(buttons.value, (btn, index) => {
                  return openBlock(), createBlock(_component_Xicons, {
                    class: normalizeClass(btn.type),
                    key: index,
                    icon: btn.icon,
                    text: btn.text,
                    link: btn.link,
                    "icon-size": "18",
                    "text-size": "14"
                  }, null, 8, ["class", "icon", "text", "link"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])) : createCommentVNode("v-if", true),
            socialLinks.value.length > 0 ? (openBlock(), createElementBlock("ul", _hoisted_6, [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList(socialLinks.value, (item, index) => {
                  return openBlock(), createElementBlock("li", {
                    class: "social-item",
                    key: index
                  }, [
                    createVNode(_component_Xicons, {
                      icon: item.icon,
                      link: item.link,
                      style: normalizeStyle({ color: item.color }),
                      target: "_blank"
                    }, null, 8, ["icon", "link", "style"])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])) : createCommentVNode("v-if", true),
            _hoisted_7
          ])
        ],
        4
        /* STYLE */
      );
    };
  }
});
const CustomBanner = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6310fb66"], ["__file", "CustomBanner.vue"]]);
export {
  CustomBanner as default
};
