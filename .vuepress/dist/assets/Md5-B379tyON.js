import { h as defineComponent, v as ref, j as computed, x as md5, o as openBlock, c as createElementBlock, y as withDirectives, z as vModelText, a as createBaseVNode, t as toDisplayString, A as vShow, _ as _export_sfc } from "./app-xAEZVdTX.js";
const _hoisted_1 = { class: "md5-wrapper" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Md5",
  setup(__props) {
    const password = ref("");
    const md5Str = computed(() => {
      return password.value === "" ? "" : md5(md5(password.value));
    });
    const btnText = ref("Copy");
    async function copyToClipboard(text) {
      if (!text)
        return;
      try {
        const result = navigator.clipboard.writeText(text);
        btnText.value = "Copied";
        setTimeout(() => {
          btnText.value = "Copy";
        }, 1e3);
        return result;
      } catch {
        const element = document.createElement("textarea");
        const previouslyFocusedElement = document.activeElement;
        element.value = text;
        element.setAttribute("readonly", "");
        element.style.contain = "strict";
        element.style.position = "absolute";
        element.style.left = "-9999px";
        element.style.fontSize = "12pt";
        const selection = document.getSelection();
        const originalRange = selection ? selection.rangeCount > 0 && selection.getRangeAt(0) : null;
        document.body.appendChild(element);
        element.select();
        element.selectionStart = 0;
        element.selectionEnd = text.length;
        document.execCommand("copy");
        document.body.removeChild(element);
        if (originalRange) {
          selection.removeAllRanges();
          selection.addRange(originalRange);
        }
        if (previouslyFocusedElement) {
          previouslyFocusedElement.focus();
        }
        btnText.value = "Copied";
        setTimeout(() => {
          btnText.value = "Copy";
        }, 1e3);
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        withDirectives(createBaseVNode(
          "input",
          {
            type: "text",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => password.value = $event),
            placeholder: "Please input password",
            maxlength: "6"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vModelText, password.value]
        ]),
        createBaseVNode(
          "button",
          {
            class: "btn-copy",
            onClick: _cache[1] || (_cache[1] = ($event) => copyToClipboard(md5Str.value))
          },
          toDisplayString(btnText.value),
          1
          /* TEXT */
        ),
        createBaseVNode("p", null, [
          withDirectives(createBaseVNode(
            "span",
            null,
            "md5 密文：" + toDisplayString(md5Str.value),
            513
            /* TEXT, NEED_PATCH */
          ), [
            [vShow, md5Str.value !== ""]
          ])
        ])
      ]);
    };
  }
});
const Md5 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3d11454c"], ["__file", "Md5.vue"]]);
export {
  Md5 as default
};
