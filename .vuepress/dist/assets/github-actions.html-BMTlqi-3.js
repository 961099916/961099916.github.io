import { _ as _export_sfc, r as resolveComponent, o as openBlock, c as createElementBlock, a as createBaseVNode, b as createTextVNode, d as createVNode, e as createStaticVNode } from "./app-C7ug4_2w.js";
const _sfc_main = {};
const _hoisted_1 = /* @__PURE__ */ createStaticVNode('<h1 id="使用-github-actions-自动部署博客" tabindex="-1"><a class="header-anchor" href="#使用-github-actions-自动部署博客" aria-hidden="true">#</a> 使用 GitHub Actions 自动部署博客</h1><p>本篇以 Github Pages 为例，并且假设你已经掌握了 GitHub Pages 的使用。</p><p>假设你的文章和静态文件在同一个仓库，使用 <code>master</code> 分支管理文章和代码，使用 <code>gh-pages</code> 分支存放生成的静态文件</p><p>一般部署博客的流程是：</p><ol><li>写一篇文章</li><li>生成静态文件：<code>npm run build</code></li><li>切换 <code>gh-pages</code> 分支</li><li>复制静态文件到 <code>gh-pages</code> 分支</li><li>访问网址验证是否成功</li></ol><p>博客就是用来写文章的，每次写篇文章还要搞那么多操作。</p><p>当你使用了 GitHub Actions 之后，流程可以简化为：</p><ol><li>写一篇文章</li><li>提交到 GitHub</li></ol><p>结束了，是不是很方便？</p><p>从机械的流程中解脱，专注于写作。</p><p>那么开始打造我们的 GitHub Actions 吧。</p>', 11);
const _hoisted_12 = {
  href: "https://github.com/LasyIsLazy/gh-pages-Actions-demo",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_13 = /* @__PURE__ */ createBaseVNode(
  "h2",
  {
    id: "设置-secrets",
    tabindex: "-1"
  },
  [
    /* @__PURE__ */ createBaseVNode("a", {
      class: "header-anchor",
      href: "#设置-secrets",
      "aria-hidden": "true"
    }, "#"),
    /* @__PURE__ */ createTextVNode(" 设置 Secrets")
  ],
  -1
  /* HOISTED */
);
const _hoisted_14 = /* @__PURE__ */ createBaseVNode(
  "p",
  null,
  "后面部署的 Action 需要有操作你的仓库的权限，因此提前设置好 GitHub personal access（个人访问令牌）。",
  -1
  /* HOISTED */
);
const _hoisted_15 = {
  href: "https://help.github.com/cn/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_16 = /* @__PURE__ */ createStaticVNode('<p>授予权限的时候只给 <code>repo</code> 权限即可。</p><p><img src="https://s2.ax1x.com/2020/02/08/1W3GRA.png" alt="1W3GRA.png"></p><p>令牌名字一定要叫：<code>ACCESS_TOKEN</code>，这是后面的 Action 需要用的。</p><p><img src="https://s2.ax1x.com/2020/02/08/1W35i4.png" alt="1W35i4.png"></p><h2 id="编写-workflow-文件" tabindex="-1"><a class="header-anchor" href="#编写-workflow-文件" aria-hidden="true">#</a> 编写 workflow 文件</h2><blockquote><p>持续集成一次运行的过程，就是一个 workflow（工作流程）。</p></blockquote><p>项目结构如图：</p><p><img src="https://s2.ax1x.com/2020/02/07/123CDO.png" alt="123CDO.png"></p>', 8);
const _hoisted_24 = /* @__PURE__ */ createBaseVNode(
  "code",
  null,
  ".github/workflows/main.yml",
  -1
  /* HOISTED */
);
const _hoisted_25 = {
  href: "https://github.com/LasyIsLazy/gh-pages-action-demo/blob/master/.github/workflows/main.yml",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_26 = /* @__PURE__ */ createStaticVNode('<div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy GitHub Pages\n\n<span class="token comment"># 触发条件：在 push 到 master 分支后</span>\n<span class="token key atrule">on</span><span class="token punctuation">:</span>\n  <span class="token key atrule">push</span><span class="token punctuation">:</span>\n    <span class="token key atrule">branches</span><span class="token punctuation">:</span>\n      <span class="token punctuation">-</span> master\n\n<span class="token comment"># 任务</span>\n<span class="token key atrule">jobs</span><span class="token punctuation">:</span>\n  <span class="token key atrule">build-and-deploy</span><span class="token punctuation">:</span>\n    <span class="token comment"># 服务器环境：最新版 Ubuntu</span>\n    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest\n    <span class="token key atrule">steps</span><span class="token punctuation">:</span>\n      <span class="token comment"># 拉取代码</span>\n      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Checkout\n        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2\n        <span class="token key atrule">with</span><span class="token punctuation">:</span>\n          <span class="token key atrule">persist-credentials</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>\n\n      <span class="token comment"># 生成静态文件</span>\n      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build\n        <span class="token key atrule">run</span><span class="token punctuation">:</span> npm install <span class="token important">&amp;&amp;</span> npm run docs<span class="token punctuation">:</span>build\n\n      <span class="token comment"># 部署到 GitHub Pages</span>\n      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy\n        <span class="token key atrule">uses</span><span class="token punctuation">:</span> JamesIves/github<span class="token punctuation">-</span>pages<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span>action@releases/v3\n        <span class="token key atrule">with</span><span class="token punctuation">:</span>\n          <span class="token key atrule">ACCESS_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.ACCESS_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>\n          <span class="token key atrule">BRANCH</span><span class="token punctuation">:</span> gh<span class="token punctuation">-</span>pages\n          <span class="token key atrule">FOLDER</span><span class="token punctuation">:</span> docs/.vuepress/dist\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>', 1);
const _hoisted_27 = {
  href: "https://help.github.com/cn/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_28 = {
  href: "http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_29 = /* @__PURE__ */ createStaticVNode('<p>这里我写了三步：</p><ol><li>拉取代码。用到了一个 GitHub 官方 action：<code>actions/checkout</code> 。</li><li>生成静态文件。直接运行脚本，如果你不是用的 VuePress 或者脚本不一样，要修改成你自己的。</li><li>部署到 GitHub Pages。使用了第三方作者的 action：<code>JamesIves/github-pages-deploy-action@releases/v3</code>。我详细介绍下这个 action：</li></ol><p>使用 <code>with</code> 参数向环境中传入了三个环境变量：</p><ol><li><code>ACCESS_TOKEN</code>：读取 GitHub 仓库 secrets 的 <code>ACCESS_TOKEN</code> 变量，也就是我们前面设置的</li><li><code>BRANCH</code>：部署分支 <code>gh-pages</code>（GitHub Pages 读取的分支）</li><li><code>FOLDER</code>：需要部署的文件在 <code>docs/.vuepress/dist</code> 路径，也就是我们使用 <code>npm run docs:build</code> 生成的静态文件的位置</li></ol><blockquote><p>这里有一点需要注意：我使用的是 <code>v3</code> 版本，需要使用 <code>with</code> 参数传入环境变量，且需要自行构建；网上常见的教程使用的是 <code>v2</code> 版本，使用 <code>env</code> 参数传入环境变量，不需要自行构建，可使用 <code>BUILD_SCRIPT</code> 环境变量传入构建脚本</p></blockquote><p>至此，配置工作均已完成。提交你的代码，就会开启自动构建。</p><p>以后，你每次有代码 push 到 <code>master</code> 分支时，GitHub 都会开始自动构建。</p><h2 id="验证" tabindex="-1"><a class="header-anchor" href="#验证" aria-hidden="true">#</a> 验证</h2><h3 id="部署失败" tabindex="-1"><a class="header-anchor" href="#部署失败" aria-hidden="true">#</a> 部署失败</h3><p>按照教程是不会失败的，但是建议你了解下失败的情况。</p><p>如果部署失败你会收到一封部署失败的邮件</p><p><img src="https://s2.ax1x.com/2020/02/08/1WR8YQ.png" alt="1WR8YQ.png"></p><p>点击可以跳转到仓库的 Action 页面查看日志</p><p><img src="https://s2.ax1x.com/2020/02/08/1WRclR.png" alt="1WRclR.png"></p><p>展开错误的部署 job 查看日志</p><p><img src="https://s2.ax1x.com/2020/02/08/1WRX0f.png" alt="1WRX0f.png"></p><p>可以看到有这么一个错误日志：<code>No such file or directory</code>，经排查，是没有生成静态文件，因此导致路径不存在。</p><blockquote><p>我这个错误是由于参考了网上常见的教程导致的。网上大部分教程（包括前面提到的阮一峰老师的教程）使用的是：<code>JamesIves/github-pages-deploy-action</code> 的 <code>v2</code> 版本，然而引用的时候写的都是：<code>JamesIves/github-pages-deploy-action@master</code>，引用的 <code>master</code> 分支。在作者写的时候可能当时这个 action 最新的就是 <code>v2</code> 版本，所以没有什么问题。然而现在 <code>master</code> 分支已经是 <code>v3</code> 版本了，语法有变化，完全按照教程就会出错。如果继续使用他的教程可以改成<code>JamesIves/github-pages-deploy-action@releases/v2</code>。</p></blockquote><p>修复后重新提交，GitHub 会再次部署。</p><h3 id="部署成功" tabindex="-1"><a class="header-anchor" href="#部署成功" aria-hidden="true">#</a> 部署成功</h3><p>点击仓库的 Actions，查看部署情况。</p><p>如果正在部署中，应该是图中标出的这个样子。</p><p><img src="https://s2.ax1x.com/2020/02/08/1WWL8J.png" alt="1WWL8J.png"></p><p>这里显示所有的部署（应该叫做 <em>Workflow</em>，便于理解，就叫 <em>部署</em> 了）记录。图中有三种状态，分别是：部署中（黄色动态图标）、部署完成（绿色对号图标）、部署失败（红色错号图标）。</p><p>点击进入查看部署情况。</p><p><img src="https://s2.ax1x.com/2020/02/10/147bLD.png" alt="147bLD.png"></p><p>部署成功，全是绿色~</p>', 27);
const _hoisted_56 = {
  href: "https://lasyislazy.github.io/gh-pages-action-demo/",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_57 = /* @__PURE__ */ createStaticVNode('<p><img src="https://s2.ax1x.com/2020/02/08/1W4BuR.png" alt="1W4BuR.png"></p><p>完美结束，享受 GitHub Actions 带来的愉快体验吧~</p><h2 id="其他" tabindex="-1"><a class="header-anchor" href="#其他" aria-hidden="true">#</a> 其他</h2><p>鉴于还是有很多人不是用的 GitHub Pages，我这里再提供一下其他方式的思路，其实都是一样的，大概分成三步：</p><ol><li>拉取代码</li><li>生成静态文件</li><li>部署到服务器</li></ol><p>前两步都是一样的，不同的方式区别也就在于第三步。</p><p>使用 GitHub Pages 的话可以使用 <code>JamesIves/github-pages-deploy-action</code> 这个 action，使用其他的方式其实也可以找到对应的 action。</p><p>例如，我的网站是部署在虚拟主机空间上的，平时部署是用 FTP 的方式替换主机空间上的静态文件，因此找到了一个可以部署到 FTP 上的 acton <code>SamKirkland/FTP-Deploy-Action</code>，然后第三步就变为了：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code>      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> FTP Deploy\n        <span class="token key atrule">uses</span><span class="token punctuation">:</span> SamKirkland/FTP<span class="token punctuation">-</span>Deploy<span class="token punctuation">-</span>Action@2.0.0\n        <span class="token key atrule">env</span><span class="token punctuation">:</span>\n          <span class="token key atrule">FTP_SERVER</span><span class="token punctuation">:</span> xxx.xxx.com\n          <span class="token key atrule">FTP_USERNAME</span><span class="token punctuation">:</span> xxxx\n          <span class="token key atrule">FTP_PASSWORD</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.BLOG_FTP_PASSWORD <span class="token punctuation">}</span><span class="token punctuation">}</span>\n          <span class="token key atrule">LOCAL_DIR</span><span class="token punctuation">:</span> docs/.vuepress/dist\n          <span class="token key atrule">REMOTE_DIR</span><span class="token punctuation">:</span> /htdocs\n          <span class="token key atrule">ARGS</span><span class="token punctuation">:</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>delete <span class="token punctuation">-</span><span class="token punctuation">-</span>transfer<span class="token punctuation">-</span>all <span class="token punctuation">-</span><span class="token punctuation">-</span>exclude=logreport <span class="token punctuation">-</span><span class="token punctuation">-</span>verbose\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一般都是传一些环境变量进去就可以了，需要哪些环境变量去这个 action 的 GitHub 上看下介绍就好了。</p><p>最后再说一下怎么找 action，以下是几个常用的网址：</p>', 11);
const _hoisted_68 = {
  href: "https://github.com/actions",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_69 = {
  href: "https://github.com/marketplace?type=actions",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_70 = {
  href: "https://github.com/sdras/awesome-actions",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_71 = /* @__PURE__ */ createBaseVNode(
  "p",
  null,
  "然后就是要利用好搜索引擎了。",
  -1
  /* HOISTED */
);
const _hoisted_72 = /* @__PURE__ */ createBaseVNode(
  "p",
  null,
  "实在找不到就得自己写 action 了，本篇就不讨论了。",
  -1
  /* HOISTED */
);
const _hoisted_73 = {
  href: "https://www.lasy.site/",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_74 = { class: "custom-container tip" };
const _hoisted_75 = /* @__PURE__ */ createStaticVNode('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v4h1"></path></g></svg><p class="custom-container-title">TIP</p>', 2);
const _hoisted_77 = {
  href: "https://github.com/LasyIsLazy",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_78 = {
  href: "https://www.lasy.site",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_79 = /* @__PURE__ */ createBaseVNode(
  "p",
  null,
  "参考链接：",
  -1
  /* HOISTED */
);
const _hoisted_80 = {
  href: "https://help.github.com/en/github/working-with-github-pages/about-github-pages",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_81 = {
  href: "https://help.github.com/cn/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions",
  target: "_blank",
  rel: "noopener noreferrer"
};
const _hoisted_82 = {
  href: "http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html",
  target: "_blank",
  rel: "noopener noreferrer"
};
function _sfc_render(_ctx, _cache) {
  const _component_ExternalLinkIcon = resolveComponent("ExternalLinkIcon");
  return openBlock(), createElementBlock("div", null, [
    _hoisted_1,
    createBaseVNode("p", null, [
      createTextVNode("我创建了一个"),
      createBaseVNode("a", _hoisted_12, [
        createTextVNode("示例项目"),
        createVNode(_component_ExternalLinkIcon)
      ]),
      createTextVNode("在我的 GitHub 仓库，用的是 VuePress（一个 Vue 官方的静态站点生成器）。")
    ]),
    _hoisted_13,
    _hoisted_14,
    createBaseVNode("p", null, [
      createTextVNode("生成教程可以看 GitHub 官方的帮助文档："),
      createBaseVNode("a", _hoisted_15, [
        createTextVNode("创建用于命令行的个人访问令牌"),
        createVNode(_component_ExternalLinkIcon)
      ]),
      createTextVNode("。")
    ]),
    _hoisted_16,
    createBaseVNode("p", null, [
      createTextVNode("创建"),
      _hoisted_24,
      createTextVNode("文件（可以到我的"),
      createBaseVNode("a", _hoisted_25, [
        createTextVNode("示例仓库"),
        createVNode(_component_ExternalLinkIcon)
      ]),
      createTextVNode("中查看），内容如下：")
    ]),
    _hoisted_26,
    createBaseVNode("p", null, [
      createTextVNode("这里我就不对语法作讲解了，需要了解 workflow 的基本语法可以查看"),
      createBaseVNode("a", _hoisted_27, [
        createTextVNode("官方帮助"),
        createVNode(_component_ExternalLinkIcon)
      ]),
      createTextVNode("，也可以参考"),
      createBaseVNode("a", _hoisted_28, [
        createTextVNode("阮一峰老师的 GitHub Actions 入门教程"),
        createVNode(_component_ExternalLinkIcon)
      ]),
      createTextVNode("。")
    ]),
    _hoisted_29,
    createBaseVNode("p", null, [
      createTextVNode("接下来访问网站验证一下："),
      createBaseVNode("a", _hoisted_56, [
        createTextVNode("https://lasyislazy.github.io/gh-pages-action-demo/"),
        createVNode(_component_ExternalLinkIcon)
      ])
    ]),
    _hoisted_57,
    createBaseVNode("ul", null, [
      createBaseVNode("li", null, [
        createBaseVNode("a", _hoisted_68, [
          createTextVNode("https://github.com/actions"),
          createVNode(_component_ExternalLinkIcon)
        ]),
        createTextVNode("：GitHub 官方的 action")
      ]),
      createBaseVNode("li", null, [
        createBaseVNode("a", _hoisted_69, [
          createTextVNode("https://github.com/marketplace?type=actions"),
          createVNode(_component_ExternalLinkIcon)
        ]),
        createTextVNode("：GitHub 官方市场中的 action")
      ]),
      createBaseVNode("li", null, [
        createBaseVNode("a", _hoisted_70, [
          createTextVNode("https://github.com/sdras/awesome-actions"),
          createVNode(_component_ExternalLinkIcon)
        ]),
        createTextVNode("：第三方收集的有用的 action")
      ])
    ]),
    _hoisted_71,
    _hoisted_72,
    createBaseVNode("p", null, [
      createTextVNode("以上便是本篇教程全部内容，本篇首发于我的个人博客："),
      createBaseVNode("a", _hoisted_73, [
        createTextVNode("https://www.lasy.site/"),
        createVNode(_component_ExternalLinkIcon)
      ])
    ]),
    createBaseVNode("div", _hoisted_74, [
      _hoisted_75,
      createBaseVNode("p", null, [
        createTextVNode("本文作者 "),
        createBaseVNode("a", _hoisted_77, [
          createTextVNode("Lasy"),
          createVNode(_component_ExternalLinkIcon)
        ]),
        createTextVNode("，博客 "),
        createBaseVNode("a", _hoisted_78, [
          createTextVNode("Lasy"),
          createVNode(_component_ExternalLinkIcon)
        ]),
        createTextVNode("。")
      ])
    ]),
    _hoisted_79,
    createBaseVNode("ul", null, [
      createBaseVNode("li", null, [
        createBaseVNode("a", _hoisted_80, [
          createTextVNode("https://help.github.com/en/github/working-with-github-pages/about-github-pages"),
          createVNode(_component_ExternalLinkIcon)
        ])
      ]),
      createBaseVNode("li", null, [
        createBaseVNode("a", _hoisted_81, [
          createTextVNode("https://help.github.com/cn/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions"),
          createVNode(_component_ExternalLinkIcon)
        ])
      ]),
      createBaseVNode("li", null, [
        createBaseVNode("a", _hoisted_82, [
          createTextVNode("http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html"),
          createVNode(_component_ExternalLinkIcon)
        ])
      ])
    ])
  ]);
}
const githubActions_html = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "github-actions.html.vue"]]);
export {
  githubActions_html as default
};
