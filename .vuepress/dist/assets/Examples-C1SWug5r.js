import { h as defineComponent, v as ref, j as computed, o as openBlock, c as createElementBlock, a as createBaseVNode, F as Fragment, m as renderList, q as normalizeStyle, e as createVNode, u as unref, P as Pagation, _ as _export_sfc } from "./app-DdS92TXQ.js";
const examplesData = [
  {
    thumbnail: "https://avatars.githubusercontent.com/u/87223862?v=4",
    link: "https://zzh.4everland.website/",
    avator: "https://vue3-xiao-admin.4everland.app/static/png/logo-22eeabbe.png"
  },
  {
    name: "QFluentWidgets",
    desc: "无需书写 QSS，拖拽即可快速构建美观的界面",
    link: "https://qfluentwidgets.com",
    thumbnail: "https://raw.githubusercontent.com/zhiyiYo/QMaterialWidgets/master/docs/source/_static/Interface.jpg"
  },
  {
    name: "明",
    desc: "全栈分享",
    link: "https://www.stucoding.com/",
    thumbnail: "https://www.stucoding.com/assets/mybatis/1/1-1.png"
  },
  {
    thumbnail: "https://pic.imgdb.cn/item/64ffbee3661c6c8e54af2462.png",
    link: "https://sloving.top",
    avator: "https://sloving.top/head.png"
  },
  {
    thumbnail: "https://oss.bakerchen.top/img/2023-07-18-20-59-20.jpg",
    link: "https://www.bakerchen.top",
    avator: "https://www.bakerchen.top/logo.png"
  },
  {
    thumbnail: "https://user-images.githubusercontent.com/18067907/234058377-28a7e909-ae5c-4e7d-a35b-2968848bef89.png",
    link: "https://www.recoluan.com",
    avator: "https://www.recoluan.com/head.png"
  },
  {
    thumbnail: "https://www.wstee.com/banner.svg",
    link: "https://www.wstee.com",
    avator: "https://www.wstee.com/head.jpg"
  },
  {
    thumbnail: "https://qian-shen.github.io/images/wiki.png",
    link: "https://qian-shen.github.io/",
    avator: "https://qian-shen.github.io/icons/logo.png"
  },
  {
    thumbnail: "https://typora-licodeao.oss-cn-guangzhou.aliyuncs.com/typoraImg/home.png",
    link: "https://www.licodeao.top",
    avator: "https://www.licodeao.top/avatar.jpg"
  },
  {
    thumbnail: "https://github-production-user-asset-6210df.s3.amazonaws.com/75941562/241768717-21953f79-fe88-4dca-bfaf-306d4a8c1dac.png",
    link: "https://www.yixiangzhilv.com/",
    avator: "https://www.yixiangzhilv.com/head.png"
  },
  {
    thumbnail: "https://blog.latteandcat.cn/bg.jpg",
    link: "https://blog.latteandcat.cn/",
    avator: "https://blog.latteandcat.cn/head.png"
  },
  {
    thumbnail: "https://numb.run/homeIndex.jpg",
    link: "https://numb.run/",
    avator: "https://numb.run/homepage.jpg"
  },
  {
    thumbnail: "https://www.dreamai.world/assets/homeview.jpg",
    link: "https://www.dreamai.world/",
    avator: "https://www.dreamai.world/logo.png"
  }
];
const _hoisted_1 = { class: "examples__container" };
const _hoisted_2 = ["onClick"];
const perPage = 9;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Examples",
  setup(__props) {
    const jumpLink = (link) => {
      if (link) {
        window.open(link, "_blank");
      }
    };
    const currentPage = ref(1);
    const examplesOfCurrentPage = computed(() => {
      const start = (currentPage.value - 1) * perPage;
      const end = currentPage.value * perPage;
      return (examplesData || []).slice(start, end);
    });
    let handlePagation = (page) => {
      currentPage.value = page;
    };
    {
      handlePagation = (page) => {
        currentPage.value = page;
        setTimeout(() => {
          window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
        }, 100);
      };
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(
        Fragment,
        null,
        [
          createBaseVNode("div", _hoisted_1, [
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList(examplesOfCurrentPage.value, (item, index) => {
                return openBlock(), createElementBlock(
                  "div",
                  {
                    class: "examples__item",
                    key: index,
                    style: normalizeStyle({ backgroundImage: `url(${item.thumbnail})` })
                  },
                  [
                    createBaseVNode(
                      "div",
                      {
                        class: "examples__item__btn",
                        style: normalizeStyle({ backgroundImage: `url(${item.avator})` })
                      },
                      [
                        createBaseVNode("span", {
                          class: "btn--go",
                          onClick: ($event) => jumpLink(item.link)
                        }, "Go", 8, _hoisted_2)
                      ],
                      4
                      /* STYLE */
                    )
                  ],
                  4
                  /* STYLE */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]),
          createVNode(Pagation, {
            currentPage: currentPage.value,
            total: unref(examplesData).length,
            onChange: unref(handlePagation)
          }, null, 8, ["currentPage", "total", "onChange"])
        ],
        64
        /* STABLE_FRAGMENT */
      );
    };
  }
});
const Examples = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b8b5e4e5"], ["__file", "Examples.vue"]]);
export {
  Examples as default
};
