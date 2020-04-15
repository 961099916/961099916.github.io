module.exports = {
    title: '张家豪的学习记录', // 设置网站标题
    description: '记录本人学习过程', //描述
    dest: './dist',   // 设置输出目录
    port: 65000, //端口
    head: [
        ['link', { rel: 'shortcut icon', type: "image/x-icon", href: `./favicon.jpg` }]
    ],
  plugins:{
    "vuepress-plugin-auto-sidebar": {},
     '@vuepress/last-updated':{},
     '@vuepress/back-to-top': true,

},
    themeConfig: { //主题配置
         lastUpdated: '上次更新时间',
        // 添加导航栏
        nav: [
            { text: '主页', link: '/' }, // 导航条
            { text: 'Java',link:'/Java/00-String源码'},
            { text: '常用技术',
            items:[
                {text:'基本技术',link:'/常用技术/基本技术/00-MQ学习.md'},
                {text:'SpringBoot',link:'/常用技术/SpringBoot/00-SpringBoot多数据源.md'},
                {text:'SpringCloud',link:'/常用技术/SpringCloud/00-eureka.md'},
                {text:'微服务',link:'/常用技术/微服务/00-注册中心'}
            ]
              },
            { text: '算法', link: '/算法/00-判定字符是否唯一' },
            {text:'数据库',link:'/数据库/00-入门'},
            {text:'大数据',link:'/大数据/00-数据仓库'},
            {text:'运维',link:'/运维/00-Docker安装'},
            {text:'设计模式',link:'/设计模式/00-工厂模式'},
            {text:'案例学习',
                items:[
                    {text:'数据看板',link:'/实践学习/数据看板/00-数据看板.md'},
                    {text:'服务智能',link:'/实践学习/服务智能/00-服务智能.md'},
                    {text:'人人快速开发',link:'/实践学习/人人/00-renren-fast.md'},
                    {text:'Pig',link:'/实践学习/Pig/00-pig.md'},

                ]
            },
            { text: '待整理', link: '/待整理/00-README.md' },
            { text: '联系方式',
                items:[
                {text:'Gitee',link:'https://gitee.com/limitzjh/'},
                {text:'GitHub',link:"https://github.com/961099916"},
                {text:'QQ',link:'tencent://message/?uin=961099916&Site=&Menu=yes'},
                {text:'CSDN',link:'https://blog.csdn.net/qq_34833599'}
                ]
            }
        ]


    }
}
