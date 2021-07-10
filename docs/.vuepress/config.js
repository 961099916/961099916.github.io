module.exports = {
  title: "张家豪的学习记录", // 设置网站标题
  description: "记录本人学习过程", //描述
  dest: "./dist", // 设置输出目录
  port: 65000, //端口
  head: [
    [
      "link",
      { rel: "shortcut icon", type: "image/x-icon", href: `./favicon.jpg` },
    ],
  ],
  plugins: {
    "vuepress-plugin-auto-sidebar": {},
    "@vuepress/last-updated": {},
    "@vuepress/back-to-top": true,
    "@vuepress/nprogress": false,
    'last-reading': {},
    'reading-progress': {},
    'vuepress-plugin-reading-time': {},
    'vuepress-plugin-right-anchor': {
      showDepth: 5,
      expand: {
        trigger: 'click',
        clickModeDefaultOpen: true
      },
    },
    '@xiaopanda/vuepress-plugin-code-copy': {
      buttonStaticIcon: Boolean,
      buttonIconTitle: String,
      buttonAlign: String,
      buttonColor: String
    },
    'permalink-pinyin': {
      lowercase: true, // Converted into lowercase, default: true
      separator: '-' // Separator of the slug, default: '-'
    },
    'gitalk-maker':
    {
      gitalkConfig: {
        clientID: 'e946073ce51670c56338',
        clientSecret: '6e42e7989cf509acb87f76e7b2b418175f450d07',
        repo: '961099916.github.io',
        owner: '961099916',
        admin: ['961099916'],
        // id: location.pathname, // 无法配置默认用 location.pathname
        distractionFreeMode: false, // Facebook-like distraction free mode
      },
    },
  },
  themeConfig: {
    //主题配置
    lastUpdated: "上次更新时间",
    // 添加导航栏
    nav: [
      { text: "主页", link: "/" }, // 导航条
      { text: "软件",
        items: [
          {text: "源码",link: "/software/yuan-ma/000-string-yuan-ma"},
          {text: "常用技术",link: "/software/chang-yong-ji-shu/README"},
          {text: "容器化",link: "/software/rong-qi-hua/201-docker-an-zhuang"},
          {text: "数据库",link: "/software/shu-ju-ku/400-mysql"},
          {text: "设计模式",link: "/software/she-ji-mo-shi/300--gong-han-mo-shi"},
          {text: "算法",link: "/software/suan-fa/500--pan-ding-zi-fu-shi-fou-wei-yi"},
          {text: "项目总结",link: "/software/xiang-mu-zong-jie/600--shu-ju-kan-ban"},
        ]
      },
      { text: "硬件",
        items: [
          {text: "树莓派",link: "/hardware/shu-mei-pai/00--xi-tong-an-zhuang"},
          {text: "ESP8266",link: "/hardware/esp8266/00--gu-jian-shua-ru"},

        ]
      },
      { text: " 杂项",
        items: [
          {text: "产品经理",link: "/sundry/chan-pin-jing-li/00--ren-ren-du-shi-chan-pin-jing-li"},
          {text: "心理学",link: "/sundry/xin-li-xue/00--zi-bei-yu-chao-yue"},
          {text: "博弈论",link: "/sundry/bo-yi-lun/00--bo-yi-lun-jiao-cheng"},
          {text: "金融",link: "/sundry/jin-rong/00--chan-lun"},
          {text: "道家",link: "/sundry/dao-jia/00--mei-hua-yi-shu"},
        ]
      },
      {
        text: "联系方式",
        items: [
          { text: "Gitee", link: "https://gitee.com/jiuxialb/" },
          { text: "GitHub", link: "https://github.com/961099916" },
          {
            text: "QQ",
            link: "tencent://message/?uin=961099916&Site=&Menu=yes",
          },
          { text: "CSDN", link: "https://blog.csdn.net/qq_34833599" },
          { text: "博客园", link: "https://www.cnblogs.com/jiuxialb/" },
        ],
      },
    ],
  },
};
