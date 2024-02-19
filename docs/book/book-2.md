---
title: 《RocketMQ技术内幕》
date: 2024-02-18
---

## 1. 设计理念与目标

### 理念：追求简单和性能高效

- 设计简单：摒弃了业界常用 ZK 作为信息管理的注册中心，自研了 NameServer 实现元数据的管理，路由信息无需在集群内保持强一直，而是追求了最总一致性，并能容忍分钟级别的不一致，降低了 NameServer 的复杂度，对网络的要求也降低了不少，性能也相较于 Zk 有了极大的提升
- 高效的 I/O 存储机制：RocketMQ 追求信息发送的高吞吐量，RocketMQ 的消息存储文件被设计成文件组的概念，组内单个文件大小固定，方便引入内存映射机制，所有的主题消息存储按顺序编写，极大地提升了消息的写性能，同时为了兼顾消息的消费和消息查找引入了消息消费队列文件和索引文件
- 容忍存在设计缺陷：适当的将某些工作下发给 RocketMQ 使用者，例如经常遇见的一个难题：如何保证消息一定被消息消费者消费，并且只消费一次

### 目标

- 架构模式

  - 采用发布订阅模式，主要参与组件包括：消息发送者、消息服务器（消息存储）、消息消费和路由发现

- 顺序消息

  - 消息消费者按照消息达到消息存储服务器的顺序消费，RokcetMQ 是阉割保证消息顺序

- 消息过滤

  - 消息消费者可以对同一主题下的消息按照规则只消费自己感兴趣的消息。RocketMQ 消息过滤是由服务端和消费端共同完成的

- 消息存储

  - 消息堆积能力
  - 消息存储性能

- 高可用性

  - Broker 异常崩溃
  - 操作系统崩溃
  - 机器断电，但能立即回复供电
  - 机器无法开机
  - 磁盘设备损坏

- 消息消费低延迟

  - 长轮训模式实现准实时的消息推送

- 确保消息必须被消费一次

  - 确认机制确保消息至少被消费一次，无法保证只被消费一次，所以存在多次消费的可能

- 回溯消息

  - 可重新消费消息，支持时间前后的回溯，可精确到毫秒

- 消息堆积

  - 消息中间件的主要功能是异步解耦，必须能应对前端的数据洪峰，提高后端系统的可用性，这必然要求消息中间件具备一定的消息堆积能力。RocketMQ 使用磁盘文件存储消息（内存映射机制），并且在物理布局上为多个大小相等的文件组成逻辑文件组，可以无限循环使用。RocketMQ 消息存储文件并不是永久存储在消息服务器端的，而是提供了过期机制，默认保留 3 天。

- 定时消息

  - 到了特定实现或等待特定的时间后才能被消费端消费，如果支持任意精度的定时消息消费，就必须消费服务器对消息进行排序，会带来很大的性能损耗，所以 RocketMQ 只支持特定延迟级别

- 消息重试机制

  - 消息重试是指在消息消费时如果发生异常，消息中间件支持消息重新投递。

## 2. NameServer

### 设计

- 要解决的问题

  - 持久化存储
  - 根据订阅信息（路由信息）推送给消费者 推送模式或者消费者主动向消息服务器拉取消息 拉模式

    - broker 启动时向所有的 NameServer 注册，生产者消息发送前从 NameServer 获取 Broker 服务器地址列表，然后根据负载均衡算法从列表中选择一台发送小，NameServer 与每一条的 Broker 服务器保持长链接，并间隔 10s 检查一下是否存活，如果检测到宕机则将其移出，路由变化不会通知生产者，降低 NameServer 的设计复杂度，通过高可用解决单点故障

  - 避免单点故障导致系统瘫痪

    - NameServer 本身的高可用性可通过部署多台 NameServer 服务器来实现，但彼此之间互不通信。虽然 NameServer 服务器之间在某一时刻的数据并不会完全相同，但对消息发送不会造成重大影响，无非就是短暂造成消息发送不均衡，这也是 RocketMQ NameServer 设计的一个亮点。

  - 生产者不重启服务如何感知消息服务器

    - 不会通知，降低 NameServer 的复杂性，因此需要消息发送提供容错机制来保证消息发送的高可用性

- 核心架构设计

  - 1. broker 每隔 30s 向 NameServer 集群的每一台机器发送心跳包，包含自身创建的 topic 路由等信息
  - 2.消息客户端每隔 30s 向 NameServer 更新对应的 topic 的路由信息
  - 3.NameServer 收到了 broker 发送的心跳包时会记录时间戳
  - 4.NameServer 每隔 10s 会扫描一次 brokerLiveTable（存在心跳包的时间戳信息），如果 120s 内没有收到心跳包，则认为 broker 失效，更新 topic 的路由消息，并将是的 broker 信息移除

### 启动流程

- 1. 解析文件，填充 NameSrvConfig 和 NettyServerConfig 属性值

  - NamesrvConfig 属性

    - rocketmqhone：RocketMQ 主目录，通过-Drocketmq.home.dir=path 或者通过 ROCKET_HOME 进行配置
    - kvConfigPath：NameServer 存储 KV 配置属性的持久化路径
    - configStorePath：NameServer 默认配置文件路径。NameServer 启动时如果通过配置文件配置 NameServer 启动属性，请使用-c 选项
    - orderMessageEnable：是否支持顺序消息，默认是不支持

  - NettyServerConfig 属性

    - listenPort：NameServer 监听端口，默认是 9876
    - serverWorkerThreads：Netty 业务线程池个数
    - serverCallbackExecutorThreads：Netty public 任务线程池线程个数。Netty 网络会根据业务类型创建不同的线程池，比如处理消息发送、消息消费、心跳检测等。如果该业务类型（RequestCode）未注册线程池，则由 public 线程池执行。
    - serverSelectorThreads：I/O 线程池线程个数，主要是 NameServer、Broker 端解析请求、返回相应的线程个数。这类线程主要用于处理网络请求，先解析请求包，然后转发到各个业务线程池完成具体的业务操作，最后将结果返回给调用方。
    - serverOnewaySemaphoreValue：send oneway 消息请求的并发度（Broker 端参数）。
    - serverAsyncSemaphoreValue：异步消息发送的最大并发度（Broker 端参数）。
    - serverChannelMaxIdleTimeSeconds：网络连接最大空闲时间，默认为 120s。如果连接空闲时间超过该参数设置的值，连接将被关闭。
    - serverSocketSndBufSize：网络 socket 发送缓存区大小，默认为 64KB。
    - serverSocketRcvBufSize：网络 socket 接收缓存区大小，默认为 64KB。
    - serverPooledByteBufAllocatorEnable：ByteBuffer 是否开启缓存，建议开启。
    - useEpollNativeSelector：是否启用 Epoll I/O 模型，Linux 环境下建议开启。

  - 小技巧

    - 在启动 NameServer 时，可以先使用./mqnameserver -c configFile -p 命令打印当前加载的配置属性。

- 2. 创建 NamesrvController 实例，并进行初始化

  - 1.NameServer 每隔 10s 扫描一次 broker，移除未激活状态的 Broker
  - 2.NameServer 每个 10min 打印一次 KV 配置

- 3. 注册 JVM 钩子函数并启动服务器，以便监听 Broker、消息生产者的网络请求

### 路由注册

- 路由元信息：RouteInfoManager

  - topicQueueTable：topic 消息队列的路由信息，消息发送时根据路由表进行负载均衡。

    - HashMap<String,QueueData>

  - brokerAddrTable：Broker 基础信息，包含 brokerName、所属集群名称、主备 Broker 地址。

    - HashMap<String,BrokerData>

  - clusterAddrTable：Broker 集群信息，存储集群中所有 Broker 的名称。

    - HashMap<String,Set<String>>

  - brokerLiveTable：Broker 状态信息，NameServer 每次收到心跳包时会替换该信息。

    - HashMap<String,BrokerLiveInfo>

  - filterServerTable：Broker 上的 FilterServer 列表，用于类模式消息过滤。类模式过滤机制在 4.4 及以后版本被废弃。

    - HashMap<String,LIst<String>>

  - 数据格式

    - RocketMQ 2 主 2 从数据结构展示图
    - topicQueueTable、brokerAddrTable 运行时内存结构
    - brokerLiveTable、clusterAddrTable 运行时内存结构

- RocketMQ 路由注册是通过 Broker 与 NameServer 的心跳功能实现的。Broker 启动时向集群中所有的 NameServer 发送心跳语句，每隔 30s 向集群中所有的 NameServer 发送心跳包，NameServer 收到 Broker 心跳包时会先更新 brokerLiveTable 缓存中 BrokerLiveInfo 的 lastUpdateTimestamp，然后每隔 10s 扫描一次 brokerLiveTable，如果连续 120s 没有收到心跳包，NameServer 将移除该 Broker 的路由信息，同时关闭 Socket 连接。

  - 1. Broker 发送心跳包：遍历所有的 NameServer 列表，Broker 消息服务器一次向 NameServer 发送心跳包

    - 心跳包

      - brokerAddr：broker 地址
      - brokerId：=0 表示主节点，>0 表示从节点
      - brokerName：broker 名称
      - clausterName：集群名称
      - haServerAdd：主节点地址，初次请求时该值为空，从节点向 NameServer 注册后返回
      - requestBody：topicConfigWrapper，主题配置，topicConfigWrapper 内部封装的是 TopicConfig Manager 中的 topicConfigTable，内部存储的是 Broker 启动时默认的一些 topic，如 MixAll.SELF_TEST_TOPIC、MixAll.DEFAULT_TOPIC（AutoCreateTopic-Enable=true）、MixAll.BENCHMARK_TOPIC、MixAll.OFFSET_MOVED_EVENT、BrokerConfig#brokerClusterName、BrokerConfig#brokerName。Broker 中 topic 默认存储在${Rocket_Home}/store/confg/topics.json 中。filterServerList，消息过滤服务器列表。

  - 2.NameServer 处理心跳包

    - org.apache.rocketmq.namesrv.processor.DefaultRequestProcessor 是网络处理器解析请求类型，如果请求类型为 RequestCode.REGISTER_BROKER，则请求最终转发到 RouteInfoMan ager#registerBroker
    - 1. 路由注册需要加写锁，防止并发修改 RouteInfoManager 中的路由表。首先判断 Broker 所属集群是否存在，如果不存在，则创建集群，然后将 broker 名加入集群 Broker 集合
    - 2.维护 BrokerData 信息，首先从 brokerAddrTable 中根据 broker 名尝试获取 Broker 信息，如果不存在，则新建 BrokerData 并放入 brokerAddrTable，registerFirst 设置为 true；如果存在，直接替换原先的 Broker 信息，registerFirst 设置为 false，表示非第一次注册，
    - 3. 如果 Broker 为主节点，并且 Broker 的 topic 配置信息发生变化或者是初次注册，则需要创建或更新 topic 路由元数据，并填充 topicQueueTable，其实就是为默认主题自动注册路由信息，其中包含 MixAll.DEFAULT_TOPIC 的路由信息。当消息生产者发送主题时，如果该主题未创建，并且 BrokerConfig 的 autoCreateTopicEnable 为 true，则返回 MixAll.DEFAULT_TOPIC 的路由信息
    - 4. 更新 BrokerLiveInfo，存储状态正常的 Broker 信息表，BrokeLiveInfo 是执行路由删除操作的重要依据
    - 5. 注册 Broker 的过滤器 Server 地址列表，一个 Broker 上会关联多个 FilterServer 消息过滤服务器，此部分内容将在第 6 章详细介绍。如果此 Broker 为从节点，则需要查找该 Broker 的主节点信息，并更新对应的 masterAddr 属性

- 设计亮点：NameServer 与 Broker 保持长连接，Broker 的状态信息存储在 brokerLive-Table 中，NameServer 每收到一个心跳包，将更新 brokerLiveTable 中关于 Broker 的状态信息以及路由表（topicQueueTable、brokerAddrTable、brokerLiveTable、filterServer-Table）。更新上述路由表（HashTable）使用了锁粒度较少的读写锁，允许多个消息发送者并发读操作，保证消息发送时的高并发。同一时刻 NameServer 只处理一个 Broker 心跳包，多个心跳包请求串行执行。这也是读写锁经典的使用场景，

### 路由删除

- NameServer 会每隔 10s 扫描一次 brokerLiveTable 状态表，如果 BrokerLive 的 lastUpdate-Timestamp 时间戳距当前时间超过 120s，则认为 Broker 失效，移除该 Broker，关闭与 Broker 的连接，同时更新 topicQueueTable、brokerAddrTable、brokerLiveTable、filterServerTable。
- 触发条件

  - 定时任务，发现超过 120s
  - broker 正常关闭

- 删除流程

  - 1. 申请写锁。根据 brokerAddress 从 brokerLiveTable、filterServerTable 中移除 Broker 相关的信息
  - 2. 维护 brokerAddrTable。遍历 HashMap<String/_ brokerName _/, BrokerData>brokerAddrTable，从 BrokerData 的 HashMap<Long/_ brokerId _/, String/_ broker address _/>brokerAddrs 中，找到具体的 Broker，从 BrokerData 中将其移除。如果移除后在 BrokerData 中不再包含其他 Broker，则在 brokerAddrTable 中移除该 brokerName 对应的条目
  - 3. 根据 BrokerName，从 clusterAddrTable 中找到 Broker 并将其从集群中移除。如果移除后，集群中不包含任何 Broker，则将该集群从 clusterAddrTable 中移除
  - 4. 根据 BrokerName，遍历所有主题的队列，如果队列中包含当前 Broker 的队列，则移除，如果 topic 只包含待移除 Broker 的队列，从路由表中删除该 topic
  - 5. 释放锁，完成路由删除。

### 路由发现

- RocketMQ 路由发现是非实时的，当 topic 路由出现变化后，NameServer 不主动推送给客户端，而是由客户端定时拉取主题最新的路由。根据主题名称拉取路由信息的命令编码为 GET_ROUTEINTO_BY_TOPIC。

  - 1. 调用 RouterInfoManager 的方法，从路由表 topicQueueTable、brokerAddrTable、filterServerTable 中分别填充 TopicRouteData 中的 List<QueueData>、List<BrokerData>和 filterServer 地址表
  - 2. 如果找到主题对应的路由信息并且该主题为顺序消息，则从 NameServer KVConfig 中获取关于顺序消息相关的配置填充路由信息。如果找不到路由信息 Code，则使用 TOPIC_NOT_EXISTS，表示没有找到对应的路由。

## 3. 消息发送

### 设计

- 3 种发送方式

  - 同步：发送者向 RocketMQ 执行发送消息 API 时，同步等待，直到消息服务器返回发送结果。
  - 异步：发送者向 RocketMQ 执行发送消息 API 时，指定消息发送成功后的回调函数，调用消息发送 API 后，立即返回，消息发送者线程不阻塞，直到运行结束，消息发送成功或失败的回调任务在一个新的线程中执行。
  - 单向：消息发送者向 RocketMQ 执行发送消息 API 时，直接返回，不等待消息服务器的结果，也不注册回调函数。简单地说，就是只管发，不在乎消息是否成功存储在消息服务器上。

- 3 个问题

  - 消息队列如何进行负载？

    - 消息发送者向某一个 topic 发送消息时，需要查询 topic 的路由信息。初次发送时会根据 topic 的名称向 NameServer 集群查询 topic 的路由信息，然后将其存储在本地内存缓存中，并且每隔 30s 依次遍历缓存中的 topic，向 NameServer 查询最新的路由信息。如果成功查询到路由信息，会将这些信息更新至本地缓存，实现 topic 路由信息的动态感知。
    - RocketMQ 提供了自动创建主题（topic）的机制，消息发送者向一个不存在的主题发送消息时，向 NameServer 查询该主题的路由信息会先返回空，如果开启了自动创建主题机制，会使用一个默认的主题名再次从 NameServer 查询路由信息，然后消息发送者会使用默认主题的路由信息进行负载均衡，但不会直接使用默认路由信息为新主题创建对应的路由信息。使用默认主题创建路由信息的
    - 注意

      - RocketMQ 中的路由消息是持久化在 Broker 中的，NameServer 中的路由信息来自 Broker 的心跳包并存储在内存中。

  - 消息发送如何实现高可用？

    - 发送端在自动发现主题的路由信息后，RocketMQ 默认使用轮询算法进行路由的负载均衡。RocketMQ 在消息发送时支持自定义的队列负载算法，需要特别注意的是，使用自定义的路由负载算法后，RocketMQ 的重试机制将失效。

      - 消息发送重试机制

        - RocketMQ 在消息发送时如果出现失败，默认会重试两次。

      - 故障规避机制

        - 当消息第一次发送失败时，如果下一次消息还是发送到刚刚失败的 Broker 上，其消息发送大概率还是会失败，因此为了保证重试的可靠性，在重试时会尽量避开刚刚接收失败的 Broker，而是选择其他 Broker 上的队列进行发送，从而提高消息发送的成功率。

  - 批量消息发送如何实现一致性？

### 消息对象

- topic：主题
- flag：消息标记

  - COMPRESSED_FLAG = 0x1
  - MULTI_TAGS_FLAG = 0x1<<1
  - TRANSACTION_PREPARED_TYPE = 0x1<<2
  - TRANSACTION_COMMIT_TYPE = 0x2<<2
  - TRANSCATION_ROLLBACK_TYPE= 0x3<<2
  - TRANSACTION_NOT_TYPE = 0

- properties：扩展属性

  - tags：消息 tag，用于消息过滤
  - keys：消息索引键，用空格隔开，RocketMQ 可以根据这些 Key（键）快速检索消息
  - waitStoreMsgOk：消息发送时是否等待消息存储完成后再返回

- byte[]：消息体

### 生产者启动流程

- DefaultMQProducer

  - 方法

    - void createTopic(String key, String newTopic, int queueNum, int topicSysFlag)：创建主题。
    - long searchOffset(final MessageQueue mq, final long timestamp)：根据时间戳从队列中查找其偏移量。
    - long maxOffset(final MessageQueue mq)：查找该消息队列中最大的物理偏移量。
    - long minOffset(final MessageQueue mq)：查找该消息队列中的最小物理偏移量。
    - MessageExt viewMessage(final String offsetMsgId)：根据消息偏移量查找消息。
    - QueryResult queryMessage(String topic, String key, int maxNum, long begin, long end)：根据条件查询消息。
    - MessageExt viewMessage(String topic,String msgId)：根据主题与消息 ID 查找消息。
    - List fetchPublishMessageQueues(final String topic)：查找该主题下所有的消息队列。
    - SendResult send(Message msg)：同步发送消息，具体发送到主题中的哪个消息队列由负载算法决定。
    - SendResult send(Message msg, final long timeout)：同步发送消息，如果发送超过 timeout 则抛出超时异常。
    - void send(Message msg, SendCallback sendCallback)：异步发送消息，sendCallback 参数是消息发送成功后的回调方法。
    - void send(Message msg, SendCallback sendCallback, long timeout)：异步发送消息，如果发送超过 timeout 则抛出超时异常。
    - void sendOneway(Message msg)：单向消息发送，即不在乎发送结果，消息发送出去后该方法立即返回。
    - SendResult send(Message msg, MessageQueue mq, final long timeout)：同步方式发送消息，且发送到指定的消息队列。
    - void send(final Message msg, final MessageQueue mq, final SendCallback sendCallback,long timeout)：异步方式发送消息，且发送到指定的消息队列。
    - void sendOneway(Message msg, MessageQueue Selector selector, Object arg)：单向方式发送消息，且发送到指定的消息队列。
    - SendResult send(final Message msg, final MessageQueueSelector selector, final Object arg)：消息发送，指定消息选择算法，覆盖消息生产者默认的消息队列负载。
    - SendResult send(final Collection msgs)：同步批量消息发送。

  - 属性

    - producerGroup：生产者所属组，消息服务器在回查事务状态时会随机选择该组中任何一个生产者发起的事务回查请求。
    - createTopicKey：默认 topicKey。
    - defaultTopicQueueNums：默认主题在每一个 Broker 队列的数量。
    - sendMsgTimeout：发送消息的超时时间，默认为 3s。
    - compressMsgBodyOverHowmuch：消息体超过该值则启用压缩，默认为 4KB。
    - retryTimesWhenSendFailed：同步方式发送消息重试次数，默认为 2，总共执行 3 次。
    - retryTimesWhenSendAsyncFailed：异步方式发送消息的重试次数，默认为 2。
    - retryAnotherBrokerWhenNotStoreOK：消息重试时选择另外一个 Broker，是否不等待存储结果就返回，默认为 false。
    - maxMessageSize：允许发送的最大消息长度，默认为 4MB，最大值为 2 的 32 次方-1。

- 0. 运行 start 方法
- 1. 检查 producerGroup 是否符合要求，改变生产者的 instanceName 为进程 ID
- 2. 创建 MQClientInstance 实例。整个 JVM 实例中只存在一个 MQClientManager 实例，维护一个 MQClientInstance 缓存表 ConcurrentMap<String/_ clientId _/, MQClientInstance>factoryTable =new ConcurrentHashMap<String, MQClientInstance>()，即同一个 clientId 只会创建一个 MQClientInstance 实例

  - clientId 为客户端 IP+instance+unitname（可选）
  - 如果在同一台物理服务器部署两个应用程序，应用程序的 clientId 岂不是相同，这样是不是会造成混乱？

    - 为了避免出现这个问题，如果 instance 为默认值 DEFAULT，RocketMQ 会自动将 instance 设置为进程 ID，这样就避免了不同进程相互影响，但同一个 JVM 中相同 clientId 的消费者和生产者在启动时获取的 MQClientInstane 实例都是同一个

- 3. 向 MQClientInstance 注册服务，将当前生产者加入 MQClientInstance 管理，方便后续调用网络请求、进行心跳检测等。
- 4. 启动 MQClientInstance，如果 MQClientInstance 已经启动，则本次启动不会真正执行

### 发送基本流程

- 详细流程
- 1. 验证消息

  - 在消息发送之前，首先确保生产者处于运行状态，然后验证消息是否符合相应的规范。具体的规范要求是主题名称、消息体不能为空，消息长度不能等于 0 且默认不能超过允许发送消息的最大长度 4MB（maxMessageSize=1024×1024×4）

- 2. 查找路由

  - tryToFindTopicPublishInfo 是查找主题的路由信息的方法。如果生产者中缓存了 topic 的路由信息，且该路由信息包含消息队列，则直接返回该路由信息。如果没有缓存或没有包含消息队列，则向 NameServer 查询该 topic 的路由信息。如果最终未找到路由信息，则抛出异常，表示无法找到主题相关路由信息异常。

    - TopicPublishInfo 属性

      - orderTopic：是否是顺序消息。
      - List messageQueueList：该主题队列的消息队列。
      - sendWhichQueue：每选择一次消息队列，该值会自增 1，如果超过 Integer.MAX_VALUE，则重置为 0，用于选择消息队列。
      - List queueDatas：topic 队列元数据。
      - List brokerDatas：topic 分布的 broker 元数据。
      - HashMapfilterServerTable：broker 上过滤服务器的地址列表

    - 第一次发送消息时，本地没有缓存 topic 的路由信息，查询 NameServer 尝试获取路由信息，如果路由信息未找到，再次尝试用默认主题 DefaultMQProducerImpl#createTopicKey 去查询。如果 BrokerConfig#autoCreateTopicEnable 为 true，NameServer 将返回路由信息；如果 autoCreateTopicEnable 为 false，将抛出无法找到 topic 路由异常
    - 更新 topic 信息

      - 1.  如果 isDefault 为 true，则使用默认主题查询，如果查询到路由信息，则将路由信息中读写队列的个数替换为消息生产者默认的队列个数（defaultTopicQueueNums）；如果 isDefault 为 false，则使用参数 topic 查询，如果未查询到路由信息，则返回 false，表示路由信息未变化
      - 2.  如果找到路由信息，则与本地缓存中的路由信息进行对比，判断路由信息是否发生了改变，如果未发生变化，则直接返回 false。
      - 3.  第三步：更新 MQClientInstance Broker 地址缓存表，如代码清单 3-12 所示。
      - 4.  将 topicRouteData 中的 List<QueueData> 转换成 topicPublishInfo 的 List <MessageQueue>列表，具体实现在 topicRouteData2TopicPublishInfo 中。然后更新该 MQClientInstance 管辖的所有消息，发送关于 topic 的路由信息

    - 注意

      - 在生产环境中不建议开启自动创建主题，因为这会导致新创建的主题只存在于集群中的部分节点上

- 3. 选择消息队列

  - 首先消息发送端采用重试机制，由 retryTimesWhenSendFailed 指定同步方式重试次数，异步重试机制在收到消息发送结果执行回调之前进行重试，由 retryTimesWhenSend AsyncFailed 指定异常重试次数。接下来就是循环执行，选择消息队列、发送消息，发送成功则返回，收到异常则重试。
  - 两种选择队列的方式

    - sendLatencyFaultEnable=false，默认不启用 Broker 故障延迟机制。调用 TopicPublishInfo#selectOneMessageQueue

      - 在消息发送过程中，可能会多次执行选择消息队列这个方法，lastBrokerName 就是上一次选择的执行发送消息失败的 Broker。第一次执行消息队列选择时，lastBrokerName 为 null，此时直接用 sendWhichQueue 自增再获取值，与当前路由表中消息队列的个数取模，返回该位置的 MessageQueue(selectOneMessageQueue()方法，如果消息发送失败，下次进行消息队列选择时规避上次 MesageQueue 所在的 Broker，否则有可能再次失败。或许有读者会问，Broker 不可用后，路由信息中为什么还会包含该 Broker 的路由信息呢？其实这不难解释：首先，NameServer 检测 Broker 是否可用是有延迟的，最短为一次心跳检测间隔（10s）；其次，NameServer 不是检测到 Broker 宕机后马上推送消息给消息生产者，而是消息生产者每隔 30s 更新一次路由信息，因此消息生产者最快感知 Broker 最新的路由信息也需要 30s。这就需要引入一种机制，在 Broker 宕机期间，一次消息发送失败后，将该 Broker 暂时排除在消息队列的选择范围中。

    - ## sendLatencyFaultEnable=true，启用 Broker 故障延迟机制。调用 MQFaultStrategy#selectOneMessageQueue

          - 1. 轮询获取一个消息队列。
          - 2. 验证该消息队列是否可用，latencyFaultTolerance.isAvailable(mq.getBrokerName())是关键。
          - 3. 如果返回的MessageQueue可用，则移除latencyFaultTolerance关于该topic的条目，表明该Broker故障已经修复。

      - 故障延迟设计

        - LatencyFaultTolerance：延迟机制接口规范。

          - void updateFaultItem(T name, long currentLatency, long notAvailable Duration)：更新失败条目。

            - 如果在发送过程中抛出了异常，则调用 DefaultMQProducerImpl#updateFaultItem 方法，该方法直接调用 MQFaultStrategy#updateFaultItem 方法
            - 是否规避 Broker，该参数如果为 true，则使用默认时长 30s 来计算 Broker 故障规避时长，如果为 false，则使用本次消息发送延迟时间来计算 Broker 故障规避时长

          - boolean isAvailable(final T name)：判断 Broker 是否可用。
          - void remove(final T name)：移除失败条目，意味着 Broker 重新参与路由计算。
          - T pickOneAtLeast()：尝试从规避的 Broker 中选择一个可用的 Broker，如果没有找到，则返回 null。

        - FaultItem：失败条目（规避规则条目）。

          - private final String name：条目唯一键，这里为 brokerName。
          - private volatile long currentLatency：本次消息发送的延迟时间。
          - private volatile long startTimestamp：故障规避的开始时间。

        - MQFaultStrategy：消息失败策略，延迟实现的门面类。

          - long[] latencyMax = {50L, 100L, 550L, 1000L, 2000L, 3000L, 15000L}。
          - long[] notAvailableDuration = {0L, 0L, 30000L, 60000L, 120000L, 180000L, 600000L}。

        - 根据 currentLatency 本次消息发送的延迟时间，从 latencyMax 尾部向前找到第一个比 currentLatency 小的索引 index，如果没有找到，则返回 0。然后根据这个索引从 notAvailable-Duration 数组中取出对应的时间，在这个时长内，Broker 将设置为不可用。

  - 注意

    - 开启所谓的故障延迟机制，即设置 sendLatencyFaultEnable 为 ture，其实是一种较为悲观的做法。当消息发送者遇到一次消息发送失败后，就会悲观地认为 Broker 不可用，在接下来的一段时间内就不再向其发送消息，直接避开该 Broker。而不开启延迟规避机制，就只会在本次消息发送的重试过程中规避该 Broker，下一次消息发送还是会继续尝试。

- 4. 消息发送（包含异常处理机制）

  - DefaultMQProducerImpl#sendKernelImpl

    - Message msg：待发送消息。
    - MessageQueue mq：消息将发送到该消息队列上。
    - CommunicationMode communicationMode：消息发送模式，包括 SYNC、ASYNC、ONEWAY。
    - SendCallback sendCallback：异步消息回调函数
    - TopicPublishInfo topicPublishInfo：主题路由信息。
    - long timeout：消息发送超时时间

  - 1. 根据 MessageQueue 获取 Broker 的网络地址。如果 MQClientInstance 的 brokerAddrTable 未缓存该 Broker 的信息，则从 NameServer 主动更新 topic 的路由信息。如果路由更新后还是找不到 Broker 信息，则抛出 MQClientException，提示 Broker 不存在
  - 2. 为消息分配全局唯一 ID，如果消息体默认超过 4KB（compressMsgBody-OverHowmuch），则对消息体采用 zip 压缩，并设置消息的系统标记为 MessageSysFlag.COMPRESSED_FLAG。如果是事务 Prepared 消息，则设置消息的系统标记为 MessageSysFlag. TRANSACTION_PREPARED_TYPE
  - 3. 如果注册了消息发送钩子函数，则执行消息发送之前的增强逻辑。通过 DefaultMQProducerImpl#registerSendMessageHook 注册钩子处理类，并且可以注册多个
  - 4. 如果注册了消息发送钩子函数，则执行消息发送之前的增强逻辑。通过 DefaultMQProducerImpl#registerSendMessageHook 注册钩子处理类，并且可以注册多个

    - 主要包含如下重要信息：生产者组、主题名称、默认创建主题 key、该主题在单个 Broker 上的默认队列数、队列 ID（队列序号）、消息系统标记（MessageSysFlag）、消息发送时间、消息标记（RocketMQ 对消息中的标记不做任何处理，供应用程序使用）、消息扩展属性、消息重试次数、是否是批量消息等

  - 5. 根据消息发送方式（同步、异步、单向）进行网络传输

    - 同步

      - 1.  检查消息发送是否合理

        - 1. 检查 Broker 是否有写权限
        - 2. 检查 topic 是否可以进行消息发送。主要针对默认主题，默认主题不能发送消息，仅供路由查找。
        - 3. 在 NameServer 端存储主题的配置信息，默认路径为${ROCKET_HOME}/store/ config/topic.json
        - 4. 检查队列，如果队列不合法，则返回错误码。

      - 2.  如果消息重试次数超过允许的最大重试次数，消息将进入 DLQ 死信队列。死信队列主题为%DLQ%+消费组名。
      - 3.  调用 DefaultMessageStore#putMessage 进行消息存储。

    - 异步

      - 异步发送是指消息生产者调用发送的 API 后，无须等待消息服务器返回本次消息发送的结果，只需要提供一个回调函数，供消息发送客户端在收到响应结果后回调。异步发送方式相比于同步发送方式，虽然消息发送端的发送性能会显著提高，但是为了降低消息服务器的负载压力，RocketMQ 对消息发送的异步消息进行了并发控制，通过参数 clientAsyncSemaphoreValue 实现，默认为 65535。异步消息发送虽然也可以通过 DefaultMQProducer#retryTimesWhenSendAsyncFailed 属性来控制消息的发送重试次数，但是重试的调用入口是在收到服务端响应包时进行的，如果出现网络异常、网络超时等情况将不会重试。

    - 单向

      - 单向发送是指消息生产者调用消息发送的 API 后，无须等待消息服务器返回本次消息发送的结果，并且无须提供回调函数，这表示压根就不关心本次消息发送是否成功，其实现原理与异步消息发送相同，只是消息发送客户端在收到响应结果后什么都不做了，并且没有重试机制。

  - 6. 如果注册了消息发送钩子函数，则执行 after 逻辑。注意，就算消息发送过程中发生 RemotingException、MQBrokerException、InterruptedException 操作，该方法也会执行。

- 4.2 批量消息发送

  - 批量消息发送是将同一主题的多条消息一起打包发送到消息服务端，减少网络调用次数，提高网络传输效率。当然，并不是在同一批次中发送的消息数量越多，性能就越好，判断依据是单条消息的长度，如果单条消息内容比较长，则打包发送多条消息会影响其他线程发送消息的响应时间，并且单批次消息发送总长度不能超过 Default MQProducer#maxMessageSize
  - RemotingCommand 的属性

    - code：请求命令编码，请求命令类型。
    - version：版本号。
    - opaque：客户端请求序号。
    - flag：标记。倒数第一位表示请求类型，0 表示请求；1 表示返回。倒数第二位，1 表示单向发送。
    - remark：描述。
    - extFields：扩展属性。
    - customeHeader：每个请求对应的请求头信息。
    - byte[] body：消息体内容。

  - 发送单条消息时，消息体的内容将保存在 body 中。发送批量消息时，需要将多条消息体的内容存储在 body 中。如何存储更便于服务端正确解析每条消息呢？RocketMQ 采取的方式是，对单条消息内容使用固定格式进行存储，

## 4. 消息存储

### 设计

- 三个文件

  - CommitLog：消息存储，消息写入过程中追求极致的磁盘顺序写，所有主题的消息全部写入一个文件，即 CommitLog 文件。所有消息按抵达顺序依次追加到 CommitLog 文件中，消息一旦写入，不支持修改。

    - CommitLog 文件的命名方式也是极具技巧性

      - 消息主体以及元数据的存储主体，存储消息生产端写入的消息主体内容，消息内容不是定长的。单个文件大小默认 1GB，文件名长度为 20 位，左边补零，剩余为起始偏移量，比如 00000000000000000000 代表了第一个文件，起始偏移量为 0，文件大小为 1G=1073741824。第二个文件为 00000000001073741824，起始偏移量为 1073741824，以此类推。消息主要是顺序写入日志文件，当文件满了，写入下一个文件。

  - ConsumeQueue：消息消费队列，消息到达 CommitLog 文件后，将异步转发到 ConsumeQuene 文件中，供消息消费者消费。

    - ConsumeQueue 作为消费消息的索引，保存了指定 topic 下的队列消息在 CommitLog 中的起始物理偏移量，消息大小和消息 tag 的哈希码。ConsumeQueue 文件可以看作基于 topic 的 CommitLog 索引文件，故 ConsumeQueue 文件夹的组织方式为 topic/queue/file 三层组织结构，具体存储路径为$HOME/store/consumequeue/{topic}/{queueId}/{fileName}。同样，ConsumeQueue 文件采取定长设计，每一个条目 20 字节，分别为 8 字节的 CommitLog 物理偏移量、4 字节的消息长度、8 字节 tag 哈希码，单个文件由 30 万个条目组成，可以像数组一样随机访问每一个条目，每个 ConsumeQueue 文件大小约 5.72MB。

  - Index：消息索引，主要存储消息 key 与 offset 的对应关系。

    - Index 文件基于物理磁盘文件实现哈希索引。Index 文件由 40 字节的文件头、500 万个哈希槽、2000 万个 Index 条目组成，每个哈希槽 4 字节、每个 Index 条目含有 20 个字节，分别为 4 字节索引 key 的哈希码、8 字节消息物理偏移量、4 字节时间戳、4 字节的前一个 Index 条目（哈希冲突的链表结构）。

- ## 存储流程

  - Dispatch 操作

        - 短轮询：longPollingEnable=false，第一次未拉取到消息后等待shortPollingTimeMills时间后再试。shortPollingTimeMills默认为1s。
        - 长轮询：longPollingEnable=true，以消费者端设置的挂起超时时间为依据，受Default MQPullConsumer的brokerSuspendMaxTimeMillis控制，默认20s，长轮询有两个线程来相互实现。PullRequestHoldService默认每隔5s重试一次。DefaultMessageStore#ReputMessageService方法在每当有消息到达后，转发消息，然后调用PullRequestHoldService线程中的拉取任务，尝试拉取，每处理一次，线程休眠1ms，继续下一次检查。

  - Consumer

        - 先从rebalanceImpl实例的本地缓存变量topicSubscribeInfoTable中，获取该topic主题下的消息消费队列集合mqSet。
        - 然后以topic和consumerGroup为参数调用mQClientFactory.findConsumerIdList()方法向Broker端发送获取该消费组下消费者ID列表的RPC通信请求（Broker端基于前面消息消费端上报的心跳包数据构建的consumerTable做出响应返回，业务请求码为GET_CONSUMER_LIST_BY_GROUP）。
        - 接着对topic下的消息消费队列、消费者ID进行排序，然后用消息队列分配策略算法（默认为消息队列的平均分配算法），计算待拉取的消息队列。这里的平均分配算法类似于分页算法，求出每一页需要包含的平均大小和每个页面记录的范围，遍历整个范围，计算当前消息消费端应该分配到的记录（这里即为MessageQueue）。
        - 最后调用updateProcessQueueTableInRebalance()方法，具体的做法是先将分配到的消息队列集合与processQueueTable做一个过滤比对，为过滤后的消息队列集合中的每个MessageQueue创建一个ProcessQueue对象并存入RebalanceImpl的processQueueTable队列中，其中调用RebalanceImpl实例的computePullFromWhere(MessageQueue mq)方法获取该MessageQueue对象的下一个进度消费值offset，随后填充至接下来要创建的pullRequest对象属性中。创建拉取请求对象pullRequest添加到拉取列表pullRequestList中，最后执行dispatchPullRequest()方法，将PullRequest依次放入PullMessageService服务线程的阻塞队列pullRequestQueue中，待服务线程取出后向Broker端发起拉取消息的请求。

- 内存映射

  - RocketMQ 又引入了内存映射，将磁盘文件映射到内存中，以操作内存的方式操作磁盘，将性能又提升了一个档次。

    - 在 Java 中可通过 FileChannel 的 map 方法创建内存映射文件。在 Linux 服务器中由该方法创建的文件使用的就是操作系统的页缓存（pagecache）。Linux 操作系统中内存使用策略时会尽可能地利用机器的物理内存，并常驻内存中，即页缓存。在操作系统的内存不够的情况下，采用缓存置换算法，例如 LRU 将不常用的页缓存回收，即操作系统会自动管理这部分内存。
    - 如果 RocketMQ Broker 进程异常退出，存储在页缓存中的数据并不会丢失，操作系统会定时将页缓存中的数据持久化到磁盘，实现数据安全可靠。不过如果是机器断电等异常情况，存储在页缓存中的数据也有可能丢失。

- 灵活多变的刷盘策略

  - 同步
  - 异步

    - 同步刷盘的优点是能保证消息不丢失，即向客户端返回成功就代表这条消息已被持久化到磁盘，但这是以牺牲写入性能为代价的，不过因为 RocketMQ 的消息是先写入 pagecache，所以消息丢失的可能性较小，如果能容忍一定概率的消息丢失或者在丢失后能够低成本的快速重推，可以考虑使用异步刷盘策略。
    - 异步刷盘指的是 broker 将消息存储到 pagecache 后就立即返回成功，然后开启一个异步线程定时执行 FileChannel 的 force 方法，将内存中的数据定时写入磁盘，默认间隔时间为 500ms。

- transientStorePoolEnable 机制

  - RocketMQ 为了降低 pagecache 的使用压力，引入了 transientStorePoolEnable 机制，即内存级别的读写分离机制。
  - 默认情况下，RocketMQ 将消息写入 pagecache，消息消费时从 pagecache 中读取，这样在高并发时 pagecache 的压力会比较大，容易出现瞬时 broker busy 的异常。RocketMQ 通过 transientStorePoolEnable 机制，将消息先写入堆外内存并立即返回，然后异步将堆外内存中的数据提交到 pagecache，再异步刷盘到磁盘中。因为堆外内存中的数据并未提交，所以认为是不可信的数据，消息在消费时不会从堆外内存中读取，而是从 pagecache 中读取，这样就形成了内存级别的读写分离，即写入消息时主要面对堆外内存，而读取消息时主要面对 pagecache。
  - 该机制使消息直接写入堆外内存，然后异步写入 pagecache，相比每条消息追加直接写入 pagechae，最大的优势是实现了批量化消息写入。
  - 该机制的缺点是如果由于某些意外操作导致 broker 进程异常退出，已经放入 pagecache 的数据不会丢失，而存储在堆外内存的数据会丢失。

- 文件恢复机制

  - 故障场景

    - 消息采用同步刷盘方式写入 CommitLog 文件，准备转发给 ConsumeQueue 文件时由于断电等异常，导致存储失败。
    - 在刷盘的时候，突然记录了 100MB 消息，准备将这 100MB 消息写入磁盘，由于机器突然断电，只写入 50MB 消息到 CommitLog 文件。
    - 在 RocketMQ 存储目录下有一个检查点（Checkpoint）文件，用于记录 CommitLog 等文件的刷盘点。但将数据写入 CommitLog 文件后才会将刷盘点记录到检查点文件中，有可能在从刷盘点写入检查点文件前数据就丢失了。

  - 恢复流程

    - 尝试恢复 ConsumeQueue 文件，根据文件的存储格式（8 字节物理偏移量、4 字节长度、8 字节 tag 哈希码），找到最后一条完整的消息格式所对应的物理偏移量，用 maxPhysical OfConsumequeue 表示。
    - 尝试恢复 CommitLog 文件，先通过文件的魔数判断该文件是否为 ComitLog 文件，然后按照消息的存储格式寻找最后一条合格的消息，拿到其物理偏移量，如果 CommitLog 文件的有效偏移量小于 ConsumeQueue 文件存储的最大物理偏移量，将会删除 ConsumeQueue 中多余的内容，如果大于，说明 ConsuemQueue 文件存储的内容少于 CommitLog 文件，则会重推数据。

  - 定位要恢复的文件

    - 正常停止刷盘的情况下，先从倒数第三个文件开始进行恢复，然后按照消息的存储格式进行查找，如果该文件中所有的消息都符合消息存储格式，则继续查找下一个文件，直到找到最后一条消息所在的位置。
    - 异常停止刷盘的情况下，RocketMQ 会借助检查点文件，即存储的刷盘点，定位恢复的文件。刷盘点记录的是 CommitLog、ConsuemQueue、Index 文件最后的刷盘时间戳，但并不是只认为该时间戳之前的消息是有效的，超过这个时间戳之后的消息就是不可靠的。
    - 异常停止刷盘时，从最后一个文件开始寻找，在寻找时读取该文件第一条消息的存储时间，如果这个存储时间小于检查点文件中的刷盘时间，就可以从这个文件开始恢复，如果这个文件中第一条消息的存储时间大于刷盘点，说明不能从这个文件开始恢复，需要寻找上一个文件，因为检查点文件中的刷盘点代表的是 100%可靠的消息。

### 消息存储

- DefaultMessageStore

  - MessageStoreConfig messageStoreConfig：消息存储配置属性。
  - CommitLog commitLog：CommitLog 文件的存储实现类。
  - ConcurrentMap consumeQueueTable：消息队列存储缓存表，按消息主题分组。
  - FlushConsumeQueueService flushConsumeQueueService：ConsumeQueue 文件刷盘线程。
  - CleanCommitLogService cleanCommitLogService：清除 CommitLog 文件服务。
  - CleanConsumeQueueService cleanConsumeQueueService：清除 ConsumeQueue 文件服务。
  - IndexService indexService：Index 文件实现类。
  - AllocateMappedFileService allocateMappedFileService：MappedFile 分配服务。
  - ReputMessageService reputMessageService：CommitLog 消息分发，根据 CommitLog 文件构建 ConsumeQueue、Index 文件。
  - HAService haService：存储高可用机制。
  - TransientStorePool transientStorePool：消息堆内存缓存。
  - MessageArrivingListener messageArrivingListener：在消息拉取长轮询模式下的消息达到监听器。
  - BrokerConfig brokerConfig：Broker 配置属性。
  - StoreCheckpoint storeCheckpoint：文件刷盘检测点。
  - LinkedList dispatcherList：CommitLog 文件转发请求。

### 消息发送存储流程

- 1. 如果当前 broker 停止工作或当前不支持写入，则拒绝消息写入。如果消息主题长度超过 127 个字符、消息属性长度超过 32767 个字符，同样拒绝该消息写入。如果日志中出现“message store is not writeable, so putMessage is forbidden”提示，最有可能是因为磁盘空间不足，在写入 ConsumeQueue、Index 文件出现错误时会拒绝消息再次写入。
- 2. 如果消息的延迟级别大于 0，将消息的原主题名称与原消息队列 ID 存入消息属性中，用延迟消息主题 SCHEDULE_TOPIC_XXXX、消息队列 ID 更新原先消息的主题与队列，
- 3. 获取当前可以写入的 CommitLog 文件
- 4. 在将消息写入 CommitLog 之前，先申请 putMessageLock
- 5. 设置消息的存储时间，如果 mappedFile 为空，表明${ROCKET_HOME}/store/commitlog 目录下不存在任何文件，说明本次消息是第一次发送，用偏移量 0 创建第一个 CommitLog 文件，文件名为 00000000000000000000，如果文件创建失败，抛出 CREATE_MAPEDFILE_FAILED，这很有可能是磁盘空间不足或权限不够导致的
- 6. 将消息追加到 MappedFile 中。首先获取 MappedFile 当前的写指针，如果 currentPos 大于或等于文件大小，表明文件已写满，抛出 AppendMessageStatus. UNKNOWN_ERROR。如果 currentPos 小于文件大小，通过 slice()方法创建一个与原 ByteBuffer 共享的内存区，且拥有独立的 position、limit、capacity 等指针，并设置 position 为当前指针
- 7. 创建全局唯一消息 ID，消息 ID 有 16 字节
- 8. 获取该消息在消息队列的物理偏移量。CommitLog 中保存了当前所有消息队列的待写入物理偏移量，
- 9. 根据消息体、主题和属性的长度，结合消息存储格式，计算消息的总长度，

  - RocketMQ 消息存储格式

    - TOTALSIZE：消息条目总长度，4 字节。
    - MAGICCODE：魔数，4 字节。固定值 0xdaa320a7。
    - BODYCRC：消息体的 crc 校验码，4 字节。
    - QUEUEID：消息消费队列 ID，4 字节
    - FLAG：消息标记，RocketMQ 对其不做处理，供应用程序使用，默认 4 字节。
    - QUEUEOFFSET：消息在 ConsumeQuene 文件中的物理偏移量，8 字节。
    - PHYSICALOFFSET：消息在 CommitLog 文件中的物理偏移量，8 字节。
    - SYSFLAG：消息系统标记，例如是否压缩、是否是事务消息等，4 字节。
    - BORNTIMESTAMP：消息生产者调用消息发送 API 的时间戳，8 字节。
    - BORNHOST：消息发送者 IP、端口号，8 字节。
    - STORETIMESTAMP：消息存储时间戳，8 字节。
    - STOREHOSTADDRESS：Broker 服务器 IP+端口号，8 字节。
    - RECONSUMETIMES：消息重试次数，4 字节。
    - Prepared Transaction Offset：事务消息的物理偏移量，8 字节。
    - BodyLength：消息体长度，4 字节。
    - Body：消息体内容，长度为 bodyLenth 中存储的值。
    - TopicLength：主题存储长度，1 字节，表示主题名称不能超过 255 个字符。
    - Topic：主题，长度为 TopicLength 中存储的值。
    - PropertiesLength：消息属性长度，2 字节，表示消息属性长度不能超过 65536 个字符。
    - Properties：消息属性，长度为 PropertiesLength 中存储的值。

  - CommitLog 条目是不定长的，每一个条目的长度存储在前 4 个字节中。

- 10. 如果消息长度+END_FILE_MIN_BLANK_LENGTH 大于 CommitLog 文件的空闲空间，则返回 AppendMessageStatus. END_OF_FILE，Broker 会创建一个新的 CommitLog 文件来存储该消息。从这里可以看出，每个 CommitLog 文件最少空闲 8 字节，高 4 字节存储当前文件的剩余空间，低 4 字节存储魔数 CommitLog. BLANK_MAGIC_CODE
- 11. 将消息内容存储到 ByteBuffer 中，然后创建 AppendMessageResult。这里只是将消息存储在 MappedFile 对应的内存映射 Buffer 中，并没有写入磁盘，追加结果

  - AppendMessageResult

    - AppendMessageStatus status：消息追加结果，取值为 PUT_OK 则代表追加成功、END_OF_FILE 则代表超过文件大小、MESSAGE_SIZE_EXCEEDED 则代表消息长度超过最大允许长度、PROPERTIES_SIZE_EXCEEDED 则代表消息属性超过最大允许长度、UNKNOWN_ERROR 则代表未知异常。
    - long wroteOffset：消息的物理偏移量。
    - String msgId：消息 ID。
    - long storeTimestamp：消息存储时间戳。
    - long logicsOffset：消息消费队列的逻辑偏移量，类似于数组下标。
    - long pagecacheRT = 0：写入页缓存的响应时间。
    - int msgNum = 1：批量发送消息时的消息条数。

- 12. 更新消息队列的逻辑偏移量。
- 13. 处理完消息追加逻辑后将释放 putMessageLock，
- 14. DefaultAppendMessageCallback#doAppend 只是将消息追加到内存中，需要根据采取的是同步刷盘方式还是异步刷盘方式，将内存中的数据持久化到磁盘中

### 存储文件组织与内存映射

### 存储文件

### 实时更新 ConsumeQueue 与 Index 文件

### ConsumeQueue 与 Index 文件恢复

### 文件刷盘

### 过期文件删除

### 同步双写

## 5. 消息消费

### 概述

- 介绍

  - 消息消费以组的模式开展，一个消费组可以包含多个消费者，每个消费组可以订阅多个主题，消费组之间有集群模式和广播模式两种消费模式。集群模式是当前主题下的同一条消息只允许被其中一个消费者消费。广播模式是当前主题下的同一条消息将被集群内的所有消费者消费一次。
  - 消息服务器与消费者之间的消息传送也有两种方式：推模式和拉模式。所谓的拉模式，是消费端主动发起拉取消息的请求，而推模式是消息到达消息服务器后，再推送给消息消费者。RocketMQ 消息推模式基于拉模式实现，在拉模式上包装一层，一个拉取任务完成后开始下一个拉取任务。
  - 集群模式下，多个消费者如何对消息队列进行负载呢？消息队列负载机制遵循一个通用的思想：一个消息队列同一时间只允许被一个消费者消费，一个消费者可以消费多个消息队列。
  - RocketMQ 支持局部顺序消息消费，也就是保证同一个消息队列上的消息按顺序消费。不支持消息全局顺序消费，如果要实现某一主题的全局顺序消息消费，可以将该主题的队列数设置为 1，牺牲高可用性。
  - RocketMQ 支持两种消息过滤模式：表达式（TAG、SQL92）与类过滤模式。
  - 消息拉模式主要是由客户端手动调用消息拉取 API，而消息推模式是消息服务器主动将消息推送到消息消费端，

- 负载机制

  - 两种消费模式

    - 广播模式中所有的消费者会消费全部的队列，故没有所谓的消费队列负载问题
    - 集群模式下需要考虑同一个消费组内的多个消费者之间如何分配队列。

  - 例如 8 个队列分别为 b1_q0、b1_q1、b1_q2、b1_q3、b2_q0、b2_q1、b2_q2、b2_q3，一个消费组有 3 个消费者，分别用 C1、C2、C3 表示
  - 两种分配机制

    - 举例条件
    - 采用 AVG 的分配机制

      - c1：b1_q0、b1_q1、b1_q2
      - c2：b1_q3、b2_q0、b2_q1
      - c3：b2_q2、b2_q3

    - 采用 AVG_BY_CIRCLE 的分配机制

      - c1：b1_q0、b1_q3、b2_q2
      - c2：b1_q1、b2_q0 b2_q3
      - c3：b1_q2、b2_q1

  - 使用场景

    - 采用 AVG 的分配机制：通常要求发送方发送的消息尽量在各个队列上分布均匀

    - 采用 AVG_BY_CIRCLE 的分配机制：一台 Broker 上的消息会明显多于第二台，

- 重平衡

  - 在消费时间过程中可能会遇到消息消费队列增加或减少、消息消费者增加或减少，比如需要对消息消费队列进行重新平衡，即重新分配，这就是所谓的重平衡机制。在 RocketMQ 中，每隔 20s 会根据当前队列数量、消费者数量重新进行队列负载计算，如果计算出来的结果与当前不一样，则触发消息消费队列的重平衡。

- 并发消费模型

  - 客户端为每一个消费组创建独立的消费线程池，即在并发消费模式下，单个消费组内的并发度为线程池线程个数。线程池处理一批消息后会向 Broker 汇报消息消费进度。

- ## 消息消费进度反馈机制

  - 消费线程池在处理完一批消息后，会将消息消费进度存储在本地内存中。
  - 客户端会启动一个定时线程，每 5s 将存储在本地内存中的所有队列消息消费偏移量提交到 Broker 中。
  - Broker 收到的消息消费进度会存储在内存中，每隔 5s 将消息消费偏移量持久化到磁盘文件中。
  - 在客户端向 Broker 拉取消息时也会将该队列的消息消费偏移量提交到 Broker。

  * 消息 msg3 的偏移量大于 msg1、msg2 的偏移量，由于支持并发消费，如果线程 t3 先处理完 msg3，而 t1、t2 还未处理，那么线程 t3 如何提交消费偏移量呢？

    - 试想一下，如果提交 msg3 的偏移量是作为消费进度被提交，如果此时消费端重启，消息消费 msg1、msg2 就不会再被消费，这样就会造成“消息丢失”。因此 t3 线程并不会提交 msg3 的偏移量，而是提交线程池中偏移量最小的消息的偏移量，即 t3 线程在消费完 msg3 后，提交的消息消费进度依然是 msg1 的偏移量，这样能避免消息丢失，但同样有消息重复消费的风险。

### 初探

- MQPushConsume

  - void sendMessageBack（MessageExt msg, int delayLevel, String brokerName）消息消费失败，将消息重新发送到 Broker 服务器。
  - Set fetchSubscribeMessageQueues（String topic）：获取消费者对 topic 分配了哪些消息队列。
  - void registerMessageListener（MessageListenerConcurrently messageListener）：注册并发消息事件监听器。
  - void registerMessageListener（MessageListenerOrderly messageListener）：注册顺序消费事件监听器。
  - void subscribe（String topic, String subExpression）：基于主题订阅消息。
  - void subscribe（String topic, String fullClassName, String filterClassSource）：基于主题订阅消息，消息过滤方式使用类模式。
  - void unsubscribe（final String topic）：取消消息订阅

- DefaultMQPushConsumer

  - consumerGroup：消费者所属组
  - messageModel：消息消费模式，分为集群模式、广播模式，默认为集群模式。
  - ConsumeFromWhere consumeFromWhere：第一次消费时指定消费策略。

    - CONSUME_FROM_LAST_OFFSET：此处分为两种情况，如果磁盘消息未过期且未被删除，则从最小偏移量开始消费。如果磁盘已过期并被删除，则从最大偏移量开始消费。
    - CONSUME_FROM_FIRST_OFFSET：从队列当前最小偏移量开始消费。
    - CONSUME_FROM_TIMESTAMP：从消费者指定时间戳开始消费。
    - 如果从消息进度服务 OffsetStore 读取到 MessageQueue 中的偏移量不小于 0，则使用读取到的偏移量拉取消息，只有在读到的偏移量小于 0 时，上述策略才会生效。

  - allocateMessageQueueStrategy：集群模式下消息队列的负载策略。
  - Map subscription：订阅信息。
  - MessageListener messageListener：消息业务监听器。
  - OffsetStore offsetStore：消息消费进度存储器
  - int consumeThreadMin = 20：消费者最小线程数
  - int consumeThreadMax = 64：消费者最大线程数，因为消费者线程池使用无界队列，所以此参数不生效。
  - consumeConcurrentlyMaxSpan=2000：并发消息消费时处理队列最大跨度，默认 2000，表示如果消息处理队列中偏移量最大的消息与偏移量最小的消息的跨度超过 2000，则延迟 50ms 后再拉取消息。
  - int pullThresholdForQueue=1000：默认 1000，表示每 1000 次流控后打印流控日志。
  - long pullInterval = 0：推模式下拉取任务的间隔时间，默认一次拉取任务完成后继续拉取。
  - int pullBatchSize=32：每次消息拉取的条数，默认 32 条
  - int consumeMessageBatchMaxSize=1：消息并发消费时一次消费消息的条数，通俗点说，就是每次传入 MessageListener#consumeMessage 中的消息条数。
  - postSubscriptionWhenPull=false：是否每次拉取消息都更新订阅信息，默认为 false。
  - maxReconsumeTimes=-1：最大消费重试次数。如果消息消费次数超过 maxReconsume Times 还未成功，则将该消息转移到一个失败队列，等待被删除。
  - suspendCurrentQueueTimeMillis=1000：延迟将该队列的消息提交到消费者线程的等待时间，默认延迟 1s。
  - long consumeTimeout=15：消息消费超时时间，默认为 15，单位为分钟。

### 消费者启动流程

- 1. 构建主题订阅信息 SubscriptionData 并加入 RebalanceImpl 的订阅消息中

  - 订阅关系来源主要有两个

    - 1. 通过调用 DefaultMQPushConsumerImpl#subscribe（String topic, String subExpression）方法获取。
    - 2. 订阅重试主题消息。RocketMQ 消息重试是以消费组为单位，而不是主题，消息重试主题名为%RETRY%+消费组名。消费者在启动时会自动订阅该主题，参与该主题的消息队列负载。

- 2. 初始化 MQClientInstance、RebalanceImple（消息重新负载实现类）等
- 3. 初始化消息进度。如果消息消费采用集群模式，那么消息进度存储在 Broker 上，如果采用广播模式，那么消息消费进度存储在消费端，
- 4. 如果是顺序消费，创建消费端消费线程服务。ConsumeMessageService 主要负责消息消费，在内部维护一个线程池
- 5. 向 MQClientInstance 注册消费者并启动 MQClientInstance，JVM 中的所有消费者、生产者持有同一个 MQClientInstance，MQClientInstance 只会启动一次。

### 消息拉取

- PullMessageService

  - while(!this.isStopped())是一种通用的设计技巧，Stopped 声明为 volatile，每执行一次业务逻辑，检测一下其运行状态，可以通过其他线程将 Stopped 设置为 true，从而停止该线程。
  - 从 pullRequestQueue 中获取一个 PullRequest 消息拉取任务，如果 pullRequestQueue 为空，则线程将阻塞，直到有拉取任务被放入。
  - 调用 pullMessage 方法进行消息拉取

    - 什么时候创建的 pullRequest

      - 一个是在 RocketMQ 根据 PullRequest 拉取任务执行完一次消息拉取任务后，又将 PullRequest 对象放入 pullRequestQueue
      - 另一个是在 RebalanceImpl 中创建的

    - pullRequest 属性

      - String consumerGroup：消费者组。
      - MessageQueue messageQueue：待拉取消费队列。
      - ProcessQueue processQueue：消息处理队列，从 Broker 中拉取到的消息会先存入 ProccessQueue，然后再提交到消费者消费线程池进行消费。
      - long nextOffset：待拉取的 MessageQueue 偏移量。
      - boolean lockedFirst：是否被锁定。

- ProcessQueue

  - 属性

    - ReadWriteLock lockTreeMap：读写锁，控制多线程并发修改 msgTreeMap、msgTree MapTemp。
    - TreeMap msgTreeMap：消息存储容器，键为消息在 ConsumeQueue 中的偏移量
    - AtomicLong msgCount：ProcessQueue 中总消息数。
    - TreeMap msgTreeMapTemp：消息临时存储容器，键为消息在 ConsumeQueue 中的偏移量。该结构用于处理顺序消息，消息消费线程从 ProcessQueue 的 msgTreeMap 中取出消息前，先将消息临时存储在 msgTreeMapTemp 中。
    - volatile long queueOffsetMax：当前 ProcessQueue 中包含的最大队列偏移量。
    - volatile boolean dropped = false：当前 ProccesQueue 是否被丢弃。
    - volatile long lastPullTimestamp：上一次开始拉取消息的时间戳。
    - volatile long lastConsumeTimestamp：上一次消费消息的时间戳。

  - 方法

    - public boolean isLockExpired()：判断锁是否过期，锁超时时间默认为 30s，通过系统参数 rocketmq.client. rebalance.lockMaxLiveTime 进行设置。
    - public boolean isPullExpired()：判断 PullMessageService 是否空闲，空闲时间默认 120s，通过系统参数 rocketmq.client. pull.pullMaxIdleTime 进行设置。
    - public void cleanExpiredMsg(DefaultMQPushConsumer pushConsumer)：移除消费超时的消息，默认超过 15min 未消费的消息将延迟 3 个延迟级别再消费。
    - public boolean putMessage(final List msgs)：添加消息，PullMessageService 拉取消息后，调用该方法将消息添加到 ProcessQueue。
    - public long getMaxSpan()：获取当前消息的最大间隔。getMaxSpan()并不能说明 ProceQueue 包含的消息个数，但是能说明当前处理队列中第一条消息与最后一条消息的偏移量已经超过的消息个数。
    - public long removeMessage(final List<MessageExt> msgs)：移除消息。
    - public void rollback()：将 msgTreeMapTmp 中的所有消息重新放入 msgTreeMap 并清除 msgTreeMapTmp。
    - public long commit()：将 msgTreeMapTmp 中的消息清除，表示成功处理该批消息。
    - public void makeMessageToCosumeAgain(List msgs)：重新消费该批消息。
    - public List takeMessags(final int batchSize)：从 ProcessQueue 中取出 batchSize 条消息。

- 消息拉取基本流程

  - 1. 拉取客户端消息拉取请求并封装。

    - 1. 从 PullRequest 中获取 ProcessQueue，如果处理队列当前状态未被丢弃，则更新 ProcessQueue 的 lastPullTimestamp 为当前时间戳。如果当前消费者被挂起，则将拉取任务延迟 1s 再放入 PullMessageService 的拉取任务队列中，最后结束本次消息拉取
    - 2. 进行消息拉取流控。从消息消费数量与消费间隔两个维度进行控制

      - 1.  消息处理总数，如果 ProcessQueue 当前处理的消息条数超过了 pullThresholdFor Queue=1000，将触发流控，放弃本次拉取任务，并且该队列的下一次拉取任务将在 50ms 后才加入拉取任务队列。每触发 1000 次流控后输出提示语：the consumer message buffer is full, so do flow control, minOffset={队列最小偏移量}, maxOffset={队列最大偏移量}, size={消息总条数},pullRequest={拉取任务}, flowControlTimes={流控触发次数}。
      - 2.  ProcessQueue 中队列最大偏移量与最小偏离量的间距不能超过 consumeConcurrently MaxSpan，否则触发流控。每触发 1000 次流控后输出提示语：the queue's messages, span too long, so do flow control, minOffset={队列最小偏移量}, maxOffset={队列最大偏移量}, maxSpan={间隔}, pullRequest={拉取任务信息}, flowControlTimes={流控触发次数}。这里主要的考量是担心因为一条消息堵塞，使消息进度无法向前推进，可能会造成大量消息重复消费。

    - 3. 拉取该主题的订阅信息，如果为空则结束本次消息拉取，关于该队列的下一次拉取任务将延迟 3s 执行，
    - 4. 构建消息拉取系统标记

      - FLAG_COMMIT_OFFSET：表示从内存中读取的消费进度大于 0，则设置该标记位。
      - FLAG_SUSPEND：表示消息拉取时支持挂起。
      - FLAG_SUBSCRIPTION：消息过滤机制为表达式，则设置该标记位。
      - FLAG_CLASS_FILTER：消息过滤机制为类过滤模式。

    - 5. 调用 PullAPIWrapper.pullKernelImpl 方法后与服务端交互
    - 6. 根据 brokerName、BrokerId 从 MQClientInstance 中获取 Broker 地址，在整个 RocketMQ Broker 的部署结构中，相同名称的 Broker 构成主从结构，其 BrokerId 会不一样，在每次拉取消息后，会给出一个建议，下次是从主节点还是从节点拉取，
    - 7. 如果消息过滤模式为类过滤，则需要根据主题名称、broker 地址找到注册在 Broker 上的 FilterServer 地址，从 FilterServer 上拉取消息，否则从 Broker 上拉取消息。上述步骤完成后，RocketMQ 通过 MQClientAPIImpl#pullMessageAsync 方法异步向 Broker 拉取消息。

  - 2. 消息服务器查找消息并返回。

    - 1. 根据订阅信息构建消息过滤器
    - 2. 调用 MessageStore.getMessage 查找消息
    - 3. 根据主题名称与队列编号获取消息消费队列
    - 4. 消息偏移量异常情况校对下一次拉取偏移量。
    - 5. 如果待拉取偏移量大于 minOffset 并且小于 maxOffset，从当前 offset 处尝试拉取 32 条消息，
    - 6. 根据 PullResult 填充 responseHeader 的 NextBeginOffset、MinOffset、MaxOffset
    - 7. 根据主从同步延迟，如果从节点数据包含下一次拉取的偏移量，则设置下一次拉取任务的 brokerId。
    - 8. GetMessageResult 与 Response 进行状态编码转换
    - 9. 如果 CommitLog 标记为可用并且当前节点为主节点，则更新消息消费进度

  - 3. 消息拉取客户端处理返回的消息。

    - 1. 根据响应结果解码成 PullResultExt 对象，此时只是从网络中读取消息列表中的 byte[]messageBinary 属性
    - 2. 调用 pullAPIWrapper 的 processPullResult，将消息字节数组解码成消息列表并填充 msgFoundList，对消息进行消息过滤（TAG 模式）
    - 3. 更新 PullRequest 的下一次拉取偏移量，如果 msgFoundList 为空，则立即将 PullReqeuest 放入 PullMessageService 的 pullRequestQueue，以便 PullMessageSerivce 能及时唤醒并再次执行消息拉取
    - 4. 首先将拉取到的消息存入 ProcessQueue，然后将拉取到的消息提交到 Consume MessageService 中供消费者消费
    - 5. 将消息提交给消费者线程之后，PullCallBack 将立即返回，可以说本次消息拉取顺利完成。然后查看 pullInterval 参数，如果 pullInterval>0，则等待 pullInterval 毫秒后将 PullRequest 对象放入 PullMessageService 的 pullRequestQueue 中，该消息队列的下次拉取即将被激活，达到持续消息拉取，实现准实时拉取消息的效果。

  - 4. 消息拉取长轮询机制分析

    - RocketMQ 并没有真正实现推模式，而是消费者主动向消息服务器拉取消息，RocketMQ 推模式是循环向消息服务端发送消息拉取请求，如果消息消费者向 RocketMQ 发送消息拉取时，消息并未到达消费队列，且未启用长轮询机制，则会在服务端等待 shortPollingTimeMills 时间后（挂起），再去判断消息是否已到达消息队列。如果消息未到达，则提示消息拉取客户端 PULL_NOT_FOUND（消息不存在），如果开启长轮询模式，RocketMQ 一方面会每 5s 轮询检查一次消息是否可达，同时一有新消息到达后，立即通知挂起线程再次验证新消息是否是自己感兴趣的，如果是则从 CommitLog 文件提取消息返回给消息拉取客户端，否则挂起超时，超时时间由消息拉取方在消息拉取时封装在请求参数中，推模式默认为 15s，拉模式通过 DefaultMQPullConsumer#setBrokerSuspendMaxTimeMillis 进行设置。RocketMQ 通过在 Broker 端配置 longPollingEnable 为 true 来开启长轮询模式。

      - RocketMQ 轮询机制由两个线程共同完成

        - PullRequestHoldService：每隔 5s 重试一次

          - 1.  首先从 ManyPullRequest 中获取当前该主题队列所有的挂起拉取任务。值得注意的是，该方法使用了 synchronized，说明该数据结构存在并发访问，该属性是 PullRequest HoldService 线程的私有属性。
          - 2.  如果消息队列的最大偏移量大于待拉取偏移量，且消息匹配，则调用 execute Request WhenWakeup 将消息返回给消息拉取客户端，否则等待下一次尝试，
          - 3.  如果挂起超时，则不继续等待，直接返回客户消息未找到
          - 4.这里的核心又回到长轮询的入口代码了，其核心是设置 brokerAllowSuspend 为 false，表示不支持拉取线程挂起，即当根据偏移量无法获取消息时，将不挂起线程并等待新消息，而是直接返回告诉客户端本次消息拉取未找到消息

        - DefaultMessageStore#ReputMessageService：每处理一次重新拉取，线程休眠 1s，继续下一次检查。

### 消息队列负载与重新分布机制

- RebalanceService 线程默认每隔 20s 执行一次 mqClientFactory.doRebalance()方法

  - 1. 从主题订阅信息缓存表中获取主题的队列信息。发送请求从 Broker 中获取该消费组内当前所有的消费者客户端 ID，主题的队列可能分布在多个 Broker 上，那么请求该发往哪个 Broker 呢？RocketeMQ 从主题的路由信息表中随机选择一个 Broker。Broker 为什么会存在消费组内所有消费者的信息呢？我们不妨回忆一下，消费者在启动的时候会向 MQClientInstance 中注册消费者，然后 MQClientInstance 会向所有的 Broker 发送心跳包，心跳包中包含 MQClientInstance 的消费者信息，如代码清单 5-42 所示。如果 mqSet、cidAll 任意一个为空，则忽略本次消息队列负载。
  - 2. 对 cidAll、mqAll 进行排序。这一步很重要，同一个消费组内看到的视图应保持一致，确保同一个消费队列不会被多个消费者分配
  - 3. ConcurrentMap〈MessageQueue, ProcessQueue〉 processQueueTable 是当前消费者负载的消息队列缓存表，如果缓存表中的 MessageQueue 不包含在 mqSet 中，说明经过本次消息队列负载后，该 mq 被分配给其他消费者，需要暂停该消息队列消息的消费。方法是将 ProccessQueue 的状态设置为 droped=true，该 ProcessQueue 中的消息将不会再被消费，调用 removeUnnecessaryMessageQueue 方法判断是否将 MessageQueue、ProccessQueue 从缓存表中移除。removeUnnecessaryMessageQueue 在 RebalanceImple 中定义为抽象方法。removeUnnecessaryMessageQueue 方法主要用于持久化待移除 MessageQueue 的消息消费进度。在推模式下，如果是集群模式并且是顺序消息消费，还需要先解锁队列

- 5 种分配算法

  - AllocateMessageQueueAveragely：平均分配，推荐使用。
  - AllocateMessageQueueAveragelyByCircle：平均轮询分配，推荐使用。

### 消费过程

### 定时消息机制

### 消息过滤机制

### 顺序消息

## 6. ACL

### 什么是 ACL

### 如何使用 ACL

### ACL 实现原理

## 7. 主从同步机制

### 同步原理

### 读写分离

### 元数据同步

## 8. 消息轨迹

### 引入目的和使用方法

### 设计原理

### 实现原理

## 9. 主从切换

### 引入目的

### Raft

### 主从 Leader 选主

### 主从切换之存储实现

### 主从切换之日志追加

### 主从切换之日志复制

### 设计技巧与实现原理

### 实战

## 10. 监控

### 设计理念

### 实现原理

### 监控数据采样机制

### 如何采集监控指标

### 实战应用

## 11. 实战

### 消息批量发送

### 消息发送队列自选择

### 消息过滤

### 事务消息
