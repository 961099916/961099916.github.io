import { e as defineComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, t as toDisplayString, u as unref, _ as _export_sfc } from "./app-C3j6IhS3.js";
function useInfo() {
  const name = "reco";
  return { name };
}
const _hoisted_1 = { class: "demo-container" };
const _hoisted_2 = { style: {} };
const _hoisted_3 = /* @__PURE__ */ createBaseVNode(
  "p",
  null,
  "This is a vue preview demo.",
  -1
  /* HOISTED */
);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "demo",
  setup(__props) {
    const { name } = useInfo();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode(
          "h3",
          _hoisted_2,
          "My name is " + toDisplayString(unref(name)) + ".",
          1
          /* TEXT */
        ),
        _hoisted_3
      ]);
    };
  }
});
const demo = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "demo.vue"]]);
export {
  demo as default
};
