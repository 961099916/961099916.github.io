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
            { text: '源码阅读',
            items:[
                {text:'Java源码',link:'/源码阅读/Java/00-String源码'},
                {text:'Spring源码',link:'/源码阅读/Spring/00-SpringIOC'},
                {text:'Mybatis源码',link:'/源码阅读/mybatis/00-整体流程'}
            ]
        },
            { text: '常用技术',
            items:[
                { text: 'Shiro',link:'/常用技术/shiro/00-shiro学习.md'},
                { text: 'security', link: '/常用技术/security/00-security.md' },
                { text: 'redis', link: '/常用技术/redis/00-Redis学习.md' },
                { text: 'MQ', link: '/常用技术/MQ/00-shiro学习.md' },
                { text: 'git', link: '/常用技术/git/00-git.md' },
                { text: 'activiti', link: '/常用技术/activiti/00-activiti.md' },
                { text: 'caffeine', link: '/常用技术/caffeine/00-caffeine学习.md' },
                { text: 'elasticsearch', link: '/常用技术/elasticsearch/00-SpringBoot整合Elasticsearh.md' },
                { text: 'oauth2', link: '/常用技术/oauth2/00-oauth2.md' },
                { text: 'ORM', link: '/常用技术/ORM/00-SpringDataJPA.md' },
                { text: 'rpc', link: '/常用技术/rpc/00-rpc.md' },
                { text: '注册中心', link: '/常用技术/注册中心/00-注册中心.md' },
                { text: '配置中心', link: '/常用技术/配置中心/00-config.md' },
                { text: '服务治理', link: '/常用技术/服务治理/00-sentinel.md' },
                { text: '服务监控', link: '/常用技术/服务监控/00-服务监控.md' },
                { text: '链路追踪', link: '/常用技术/链路追踪/00-链路追踪.md' },
                { text: '分布式事务', link: '/常用技术/分布式事务/00-分布式事务.md' },
                { text: '单点登录', link: '/常用技术/单点登录/00-SSO单点登录.md' },
                { text: '虚拟机', link: '/常用技术/虚拟机/00-jvm.md' }
            ]
              },
            { text: '算法', link: '/算法/00-判定字符是否唯一' },
            {text:'数据库',link:'/数据库/00-入门'},
            {text:'大数据',link:'/大数据/00-数据仓库'},
            {text:'运维',link:'/运维/00-Docker安装'},
            {text:'设计模式',link:'/设计模式/00-工厂模式'},
            {text:'案例学习',
                items:[
                    {text:'项目思考',link:'/实践学习/项目思考/00-该栏用途'},
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
