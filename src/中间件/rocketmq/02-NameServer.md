---
title: NameServer原理
order: 2
category:
- it
tags:
- 中间件
- RocketMQ
- 源码
---

# NameServer原理

```markmap
# 总览

## 架构设计

## 启动流程

## 路由注册、故障剔除
### 路由元信息
### 路由删除
### 路由发现


```

## 架构设计

![架构设计](https://zhangjiahao-prd.oss-cn-beijing.aliyuncs.com/uPic/ha0E6L.png)

1. NameServer 启动后每隔 10s 扫描一下 brokerLiveTable，检测表中上次心跳包的时间，如果间隔超过 120s 则认为该 broker 不可用，移出路由表中与该 broker 相关的路由信息。
2. broker 启动后每过 30s 向 NameServer 发送心跳包，并传输路由信息，NameServer 进行保存。
3. 生产者启动后会和 NameServer、broker 进行长连接。生产者每隔 30s 向 NameServer 获取路由信息。
4. 消费者每 30s 向 NameServer 获取路由信息
## 启动流程

总的流程为：运行 NameServer 中 main 方法---> 创建 NameServer---> 启动 NameServer；

### 创建 NameServer
主要逻辑为通过配置文件创建 NameServer对象。

### 启动 NameServer
主要的过程为：NameServer#initialize和NameServer#start
#### initialize
1. 加载 kv 配置
2. 创建 netty remote server
3. 注册处理器
4. 每隔 10s 扫描存活的 broker，去除间隔超过 120s broker 的相关信息
5. 每隔 10 分钟打印一次 kv 信息
6. 判断是否禁用 tls，并添加文件监控，如果文件发生改变则重新加载 ssl 文件

#### start
1. 启动 netty remote server
2. 启动文件监控

### 源码

```java
public class NamesrvStartup {

    private static InternalLogger log;
    private static Properties properties = null;
    private static CommandLine commandLine = null;

    public static void main(String[] args) {
        main0(args);
    }

    public static NamesrvController main0(String[] args) {

        try {
            // 根据参数创建 nameSrvController
            NamesrvController controller = createNamesrvController(args);
            // 启动 nameSrvController
            start(controller);
            //打印日志
            String tip = "The Name Server boot success. serializeType=" + RemotingCommand.getSerializeTypeConfigInThisServer();
            log.info(tip);
            System.out.printf("%s%n", tip);
            return controller;
        } catch (Throwable e) {
            e.printStackTrace();
            System.exit(-1);
        }

        return null;
    }

    /**
     * 创建namesrv控制器
     *
     * @param args arg游戏
     * @return {@link NamesrvController}
     * @throws IOException    ioexception
     * @throws JoranException joran例外
     */
    public static NamesrvController createNamesrvController(String[] args) throws IOException, JoranException {
        // 设置版本
        System.setProperty(RemotingCommand.REMOTING_VERSION_KEY, Integer.toString(MQVersion.CURRENT_VERSION));
        // 创建命令行选项
        Options options = ServerUtil.buildCommandlineOptions(new Options());
        // 解析命令行
        commandLine = ServerUtil.parseCmdLine("mqnamesrv", args, buildCommandlineOptions(options), new PosixParser());
        // 没有命令行则退出
        if (null == commandLine) {
            System.exit(-1);
            return null;
        }
        // NameSrv 的配置
        final NamesrvConfig namesrvConfig = new NamesrvConfig();
        // NettyServer 的配置
        final NettyServerConfig nettyServerConfig = new NettyServerConfig();
        // 设置监听端口
        nettyServerConfig.setListenPort(9876);
        // 如果存在 c 命令则读取文件配置 nettyConfig 和 nameSrvConfig
        if (commandLine.hasOption('c')) {
            // 获取配置文件路径
            String file = commandLine.getOptionValue('c');
            // 如果配置文件不为空
            if (file != null) {
                InputStream in = new BufferedInputStream(new FileInputStream(file));
                // 配置文件加载为 properties
                properties = new Properties();
                properties.load(in);
                // 将配置文件中的配置加载到 namesrvConfig 和 nettyServerConfig 中
                MixAll.properties2Object(properties, namesrvConfig);
                MixAll.properties2Object(properties, nettyServerConfig);
                // 设置配置文件路径
                namesrvConfig.setConfigStorePath(file);
                // 打印日志
                System.out.printf("load config properties file OK, %s%n", file);
                in.close();
            }
        }
        // 如果命令行中有p 则打印配置
        if (commandLine.hasOption('p')) {
            // 加载 console 日志
            InternalLogger console = InternalLoggerFactory.getLogger(LoggerName.NAMESRV_CONSOLE_NAME);
            // 打印配置
            MixAll.printObjectProperties(console, namesrvConfig);
            MixAll.printObjectProperties(console, nettyServerConfig);
            // 退出
            System.exit(0);
        }
        // 命令行填充到 nameSrvConfig
        MixAll.properties2Object(ServerUtil.commandLine2Properties(commandLine), namesrvConfig);
        // 检查是否设置了 rocketMQ 的 Home
        if (null == namesrvConfig.getRocketmqHome()) {
            System.out.printf("Please set the %s variable in your environment to match the location of the RocketMQ installation%n", MixAll.ROCKETMQ_HOME_ENV);
            System.exit(-2);
        }
        // 设置 log
        LoggerContext lc = (LoggerContext) LoggerFactory.getILoggerFactory();
        JoranConfigurator configurator = new JoranConfigurator();
        configurator.setContext(lc);
        lc.reset();
        configurator.doConfigure(namesrvConfig.getRocketmqHome() + "/conf/logback_namesrv.xml");

        log = InternalLoggerFactory.getLogger(LoggerName.NAMESRV_LOGGER_NAME);
        // 打印配置
        MixAll.printObjectProperties(log, namesrvConfig);
        MixAll.printObjectProperties(log, nettyServerConfig);
        // 创建 nameSrvController
        final NamesrvController controller = new NamesrvController(namesrvConfig, nettyServerConfig);
        // 注册配置文件
        // remember all configs to prevent discard
        controller.getConfiguration().registerConfig(properties);
        // 返回 controller
        return controller;
    }

    public static NamesrvController start(final NamesrvController controller) throws Exception {
        // 如果 controller 为空则抛出异常
        if (null == controller) {
            throw new IllegalArgumentException("NamesrvController is null");
        }
        // controller 初始化
        boolean initResult = controller.initialize();
        // 初始化失败则退出
        if (!initResult) {
            controller.shutdown();
            System.exit(-3);
        }
        // 停止钩子
        Runtime.getRuntime().addShutdownHook(new ShutdownHookThread(log, (Callable<Void>) () -> {
            controller.shutdown();
            return null;
        }));

        controller.start();

        return controller;
    }

    public static void shutdown(final NamesrvController controller) {
        controller.shutdown();
    }

    public static Options buildCommandlineOptions(final Options options) {
        Option opt = new Option("c", "configFile", true, "Name server config properties file");
        opt.setRequired(false);
        options.addOption(opt);

        opt = new Option("p", "printConfigItem", false, "Print all config items");
        opt.setRequired(false);
        options.addOption(opt);

        return options;
    }

    public static Properties getProperties() {
        return properties;
    }
}

```
```java
public class NamesrvController {
    private static final InternalLogger log = InternalLoggerFactory.getLogger(LoggerName.NAMESRV_LOGGER_NAME);

    private final NamesrvConfig namesrvConfig;

    private final NettyServerConfig nettyServerConfig;

    private final ScheduledExecutorService scheduledExecutorService = Executors.newSingleThreadScheduledExecutor(new ThreadFactoryImpl(
        "NSScheduledThread"));
    private final KVConfigManager kvConfigManager;
    private final RouteInfoManager routeInfoManager;

    private RemotingServer remotingServer;

    private BrokerHousekeepingService brokerHousekeepingService;

    private ExecutorService remotingExecutor;

    private Configuration configuration;
    private FileWatchService fileWatchService;

    public NamesrvController(NamesrvConfig namesrvConfig, NettyServerConfig nettyServerConfig) {
        this.namesrvConfig = namesrvConfig;
        this.nettyServerConfig = nettyServerConfig;
        this.kvConfigManager = new KVConfigManager(this);
        this.routeInfoManager = new RouteInfoManager();
        this.brokerHousekeepingService = new BrokerHousekeepingService(this);
        this.configuration = new Configuration(
            log,
            this.namesrvConfig, this.nettyServerConfig
        );
        this.configuration.setStorePathFromConfig(this.namesrvConfig, "configStorePath");
    }

    /**
     * 初始化
     *
     * @return boolean
     */
    public boolean initialize() {
        // 加载 KV 配置管理
        this.kvConfigManager.load();
        // 创建Netty远程Server
        this.remotingServer = new NettyRemotingServer(this.nettyServerConfig, this.brokerHousekeepingService);
        // 创建远程线程池
        this.remotingExecutor =
            Executors.newFixedThreadPool(nettyServerConfig.getServerWorkerThreads(), new ThreadFactoryImpl("RemotingExecutorThread_"));
        // 注册处理器
        this.registerProcessor();
        // 每隔10s 扫描Broker 是否存活，移除不存活的Broker
        this.scheduledExecutorService.scheduleAtFixedRate(NamesrvController.this.routeInfoManager::scanNotActiveBroker, 5, 10, TimeUnit.SECONDS);
        // 每隔十分钟定时打印KV配置
        this.scheduledExecutorService.scheduleAtFixedRate(NamesrvController.this.kvConfigManager::printAllPeriodically, 1, 10, TimeUnit.MINUTES);
        // 若未禁用 tls 则开启
        if (TlsSystemConfig.tlsMode != TlsMode.DISABLED) {
            // Register a listener to reload SslContext
            try {
                fileWatchService = new FileWatchService(
                    new String[] {
                        TlsSystemConfig.tlsServerCertPath,
                        TlsSystemConfig.tlsServerKeyPath,
                        TlsSystemConfig.tlsServerTrustCertPath
                    },
                        // 文件监听器
                    new FileWatchService.Listener() {
                        boolean certChanged, keyChanged = false;
                        @Override
                        public void onChanged(String path) {
                            if (path.equals(TlsSystemConfig.tlsServerTrustCertPath)) {
                                log.info("The trust certificate changed, reload the ssl context");
                                reloadServerSslContext();
                            }
                            if (path.equals(TlsSystemConfig.tlsServerCertPath)) {
                                certChanged = true;
                            }
                            if (path.equals(TlsSystemConfig.tlsServerKeyPath)) {
                                keyChanged = true;
                            }
                            if (certChanged && keyChanged) {
                                log.info("The certificate and private key changed, reload the ssl context");
                                certChanged = keyChanged = false;
                                reloadServerSslContext();
                            }
                        }
                        private void reloadServerSslContext() {
                            ((NettyRemotingServer) remotingServer).loadSslContext();
                        }
                    });
            } catch (Exception e) {
                log.warn("FileWatchService created error, can't load the certificate dynamically");
            }
        }

        return true;
    }

    private void registerProcessor() {
        if (namesrvConfig.isClusterTest()) {

            this.remotingServer.registerDefaultProcessor(new ClusterTestRequestProcessor(this, namesrvConfig.getProductEnvName()),
                this.remotingExecutor);
        } else {

            this.remotingServer.registerDefaultProcessor(new DefaultRequestProcessor(this), this.remotingExecutor);
        }
    }

    public void start() throws Exception {
        // netty 启动
        this.remotingServer.start();
        // tls 文件监控服启动
        if (this.fileWatchService != null) {
            this.fileWatchService.start();
        }
    }

    public void shutdown() {
        this.remotingServer.shutdown();
        this.remotingExecutor.shutdown();
        this.scheduledExecutorService.shutdown();

        if (this.fileWatchService != null) {
            this.fileWatchService.shutdown();
        }
    }

    public NamesrvConfig getNamesrvConfig() {
        return namesrvConfig;
    }

    public NettyServerConfig getNettyServerConfig() {
        return nettyServerConfig;
    }

    public KVConfigManager getKvConfigManager() {
        return kvConfigManager;
    }

    public RouteInfoManager getRouteInfoManager() {
        return routeInfoManager;
    }

    public RemotingServer getRemotingServer() {
        return remotingServer;
    }

    public void setRemotingServer(RemotingServer remotingServer) {
        this.remotingServer = remotingServer;
    }

    public Configuration getConfiguration() {
        return configuration;
    }
}
```


## 路由注册、故障剔除
### 路由元信息
### 路由删除
### 路由发现
