---
title: Redis
order: 3
---

# Redis基础

## 安装

- 采用 `Docker` 安装`Redis` 进行测试和学习，执行以下命令进行安装：`docker run -d -p 6379:6379 --name redis redis` 。

## 基础

- 数据类型
- String

   - SET key value : 设置 key 的值
   - GET key : 获取 key 的值
   - GETRANGE key start end : 获取 keyvalue 的 star 到 end 之间字符串
   - GETSET key value : 先获取 key 旧的 value，然后设置 key 的 value
   - GETBIT key offset : 获取 key 的 value 指定的位 bit
   - MGET key [key2 …] : 获取所有 key 的 value
   - SETBIT key offset value : 给 key 对应 value 的 offset 位的值为 value
   - SETEX key seconds value : 将 value 关联到 key ，并设置 seconds 秒过期
   - SETNX key value : 只有在 key 不存在时设置 key 的值
   - SETRANGE key offset value : 用 value 覆写 key 对应的值，从 offset 位开始
   - STRLEN key : 获取 key 对应 value 的长度
   - MSET key value [key1 value1] : 同时设置多个 key-value
   - MSETNX key value [key1 value1] : 同时设置多个 key-value，当且仅当 key 都不存在的时候
   - PSETEX key milliseconds value : 将 value 关联到 key，并设置 milliseconds 毫秒后过期
   - INCR key : 将 key 的 value（数值）加一
   - INCRBY key increment : 将 key 的 value 加上 increment
   - INCRBYFLOAT key increment : 将 key 的 value 加上 浮点 increment
   - DECR key : 将 key 对应的数值 value 减一
   - DECRBY key decrement : 将 key 对应的数值 value 减去 decrement
   - APPEND key value : 如果 key 已经存在并且是一个字符串， APPEND 命令将指定的 value 追加到该 key 原来值（value）的末尾
- Hash

   - HDEL key field [field2 ] : 删除一个或者多个哈希表字段
   - HEXISTS key field : 检查存储在哈希表的字段是否存在
   - HGET key field : 获取哈希表字段的值
   - HGETALL key : 获取哈希表的所有字段和值
   - HINCRBY key field increment : 为哈希表字段加 increment
   - HINCRBYFLOAT key field increment : 为哈希表字段加浮点 increment
   - HKEYS key : 获取哈希表所有的字段
   - HLEN key : 获取哈希表的字段数量
   - HMGET key field [field2 ] : 获取哈希表指定的字段值
   - HMSET key field value [field1 value1] : 同时设置多个字段值给哈希表
   - HSET key field value : 设置字段属性值给哈希表
   - HSETNX key field value : 当哈希表中不存在字段 field 时，给 field 设置 value
   - HVALS key : 获取哈希表所有的值
   - HSCAN key cursor [MATCH pattern][count count] : 迭代哈希表中的键值对。
- List

   - BLOPOP key [key1 ] timeout : 移出并获取列表的最后一个元素，如果没有则等待到可以弹出的元素或者等到超时时间
   - BRPOP key [key1 ] timeout : 移出并获取列表的最后一个元素，如果没有则等待到可以弹出的元素或者等到超时时间
   - BRPOPLPUSH source destination timeout : 从列表中弹出第一个值，将弹出的元素插入到另外一个列表中并返回它，如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。
   - LINDEX key index : 通过索引的方式获取列表中的元素
   - LINSERT key BEFORE|AGTER pivot value : 向列表的元素之前|之后插入一个元素
   - LLEN key : 获取列表长度
   - LPOP key ： 移出并获取列表的第一个元素
   - LPUSH key vale1 [value2 ] : 将一个或者多个值插入列表头部，先插入第一个，然后再插入第二个
- Set

   - SADD key member1 [member2] : 向集合添加一个或者多个成员
   - SCARD key : 获取集合中成员的个数
   - SDIFF key [key2] : 返回第一个集合和其他集合的差异
   - SDIFFSTORE destination key1 [key2] : 返回给定集合之家你的差集并存储 destination
   - SINTER key1 [key2]  :  返回给定集合的交集
   - SINTERSTORE destination key1 [key2] : 返回给定所有集合的交集并存储在 destination 中
   - SISMEMBER key member : 判断 member 元素是否是集合 key 的成员
   - SMEMBERS key : 返回集合中的所有成员
   - SMOVE source destination member : 将 member 元素从 source 集合移动到 destination 集合
   - SPOP key : 移除并返回集合中的一个随机元素
   - SRANDMEMBER key [count] : 返回集合中一个或多个随机数
   - SREM key member1 [member2] : 移除集合中一个或多个成员
   - SUNION key1 [key2] : 返回所有给定集合的并集
   - SUNIONSTORE destination key1 [key2] : 所有给定集合的并集存储在 destination 集合中
   - SSCAN key cursor [MATCH pattern] [COUNT count] : 迭代集合中的元素
- Sorted Set

   - ZADD key score1 member1 [score2 member2] : 向有序集合添加一个或多个成员，或者更新已存在成员的分数
   - ZCARD key : 获取有序集合的成员数
   - ZCOUNT key min max : 计算在有序集合中指定区间分数的成员数
   - ZINCRBY key increment member : 有序集合中对指定成员的分数加上增量 increment
   - ZINTERSTORE destination numkeys key [key ...] : 计算给定的一个或多个有序集的交集并将结果集存储在新的有序集合 destination 中
   - ZLEXCOUNT key min max : 在有序集合中计算指定字典区间内成员数量
   - ZRANGE key start stop [WITHSCORES] : 通过索引区间返回有序集合指定区间内的成员
   - ZRANGEBYLEX key min max [LIMIT offset count] : 通过字典区间返回有序集合的成员
   - ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT] : 通过分数返回有序集合指定区间内的成员
   - ZRANK key member : 返回有序集合中指定成员的索引
   - ZREM key member [member ...] : 移除有序集合中的一个或多个成员
   - ZREMRANGEBYLEX key min max : 移除有序集合中给定的字典区间的所有成员
   - ZREMRANGEBYRANK key start stop : 移除有序集合中给定的排名区间的所有成员
   - ZREMRANGEBYSCORE key min max : 移除有序集合中给定的分数区间的所有成员
   - ZREVRANGE key start stop [WITHSCORES] : 返回有序集中指定区间内的成员，通过索引，分数从高到低
   - ZREVRANGEBYSCORE key max min [WITHSCORES] : 返回有序集中指定分数区间内的成员，分数从高到低排序
   - ZREVRANK key member : 返回有序集合中指定成员的排名，有序集成员按分数值递减(从大到小)排序
   - ZSCORE key member : 返回有序集中，成员的分数值
   - ZUNIONSTORE destination numkeys key [key ...] : 计算给定的一个或多个有序集的并集，并存储在新的 key 中
   - ZSCAN key cursor [MATCH pattern] [COUNT count] : 迭代有序集合中的元素（包括元素成员和元素分值）
- 事务
- 其他

   - 订阅与发布

      - 消息不会进行持久化，如果出现网络问题或者主机宕机等问题，就会出现数据丢失的情况。
   - Stream

      - 可以进行消息的持久化和消息的主备模式。
   - GEO

      - 主要用于存储地理位置坐标相关的信息
   - 脚本

      - 可以执行一些 Lua 脚本，例如：分布式锁

## 高级

- 备份和恢复

   - 数据备份用两种方式做持久化：AOF和RDB

      - RDB

         - 

            1. RDB是一个非常紧凑的文件，它保存了某个时间点得数据集，非常适用于数据集的备份，比如你可以在每个小时报保存一下过去24小时内的数据，同时每天保存过去30天的数据，这样即使出了问题你也可以根据需求恢复到不同版本的数据集。
         - 

            2. RDB是一个紧凑的单一文件，很方便传送到另一个远端数据中心或者亚马逊的S3（可能加密），非常适用于灾难恢复。
         - 

            3. RDB在保存RDB文件时父进程唯一需要做的就是fork出一个子进程，接下来的工作全部由子进程来做，父进程不需要再做其他IO操作，所以RDB持久化方式可以最大化redis的性能。
         - 

            4. 与AOF相比，在恢复大的数据集的时候，RDB方式会更快一些。
         - 

            5. 耗时、耗性能。RDB 需要经常fork子进程来保存数据集到硬盘上，当数据集比较大的时候，fork的过程是非常耗时的，可能会导致Redis在一些毫秒级内不能响应客户端的请求。如果数据集巨大并且CPU性能不是很好的情况下，这种情况会持续1秒，AOF也需要fork，但是你可以调节重写日志文件的频率来提高数据集的耐久度。
         - 

            6. 不可控、丢失数据。如果你希望在redis意外停止工作（例如电源中断）的情况下丢失的数据最少的话，那么RDB不适合你。虽然你可以配置不同的save时间点(例如每隔5分钟并且对数据集有100个写的操作)，是Redis要完整的保存整个数据集是一个比较繁重的工作，你通常会每隔5分钟或者更久做一次完整的保存，万一在Redis意外宕机，你可能会丢失几分钟的数据。
      - AOF

         - 

            1. 使用AOF 会让你的Redis更加耐久: 你可以使用不同的fsync策略：无fsync，每秒fsync，每次写的时候fsync。使用默认的每秒fsync策略，Redis的性能依然很好(fsync是由后台线程进行处理的，主线程会尽力处理客户端请求)，一旦出现故障，你最多丢失1秒的数据。
         - 

            2. AOF文件是一个只进行追加的日志文件，所以不需要写入seek，即使由于某些原因(磁盘空间已满，写的过程中宕机等等)未执行完整的写入命令，你也也可使用redis-check-aof工具修复这些问题。
         - 

            3. Redis 可以在 AOF 文件体积变得过大时，自动地在后台对 AOF 进行重写： 重写后的新 AOF 文件包含了恢复当前数据集所需的最小命令集合。 整个重写操作是绝对安全的，因为 Redis 在创建新 AOF 文件的过程中，会继续将命令追加到现有的 AOF 文件里面，即使重写过程中发生停机，现有的 AOF 文件也不会丢失。 而一旦新 AOF 文件创建完毕，Redis 就会从旧 AOF 文件切换到新 AOF 文件，并开始对新 AOF 文件进行追加操作。
         - 

            4. AOF 文件有序地保存了对数据库执行的所有写入操作， 这些写入操作以 Redis 协议的格式保存， 因此 AOF 文件的内容非常容易被人读懂， 对文件进行分析（parse）也很轻松。 导出（export） AOF 文件也非常简单： 举个例子， 如果你不小心执行了 FLUSHALL 命令， 但只要 AOF 文件未被重写， 那么只要停止服务器， 移除 AOF 文件末尾的 FLUSHALL 命令， 并重启 Redis ， 就可以将数据集恢复到 FLUSHALL 执行之前的状态。
         - 

            5. 对于相同的数据集来说，AOF 文件的体积通常要大于 RDB 文件的体积。
         - 

            6. 根据所使用的 fsync 策略，AOF 的速度可能会慢于 RDB 。 在一般情况下， 每秒 fsync 的性能依然非常高， 而关闭 fsync 可以让 AOF 的速度和 RDB 一样快， 即使在高负荷之下也是如此。 不过在处理巨大的写入载入时，RDB 可以提供更有保证的最大延迟时间（latency）。
- 集群

   - 主备

      - 优点

         - 解决数据备份问题
         - 做到读写分离，提高服务器性能
      - 缺点

         - 每个客户端连接redis实例的时候都是指定了ip和端口号的，如果所连接的redis实例因为故障下线了，而主从模式也没有提供一定的手段通知客户端另外可连接的客户端地址，因而需要手动更改客户端配置重新连接
         - 主从模式下，如果主节点由于故障下线了，那么从节点因为没有主节点而同步中断，因而需要人工进行故障转移工作
         - 无法实现动态扩容
      - 搭建

         - 主节点：由于从节点需要向主节点同步数据，所以主节点一定要进行持久化
         - 从节点：配置需要添加同步的主节点数据 slaveof 主节点IP 主节点端口
   - 哨兵

      - 优点

         - Master 状态监测
         - 如果Master 异常，则会进行Master-slave 转换，将其中一个Slave作为Master，将之前的Master作为Slave
         - Master-Slave切换后，master_redis.conf、slave_redis.conf和sentinel.conf的内容都会发生改变，即master_redis.conf中会多一行slaveof的配置，sentinel.conf的监控目标会随之调换
      - 缺点

         - 如果是从节点下线了，sentinel是不会对其进行故障转移的，连接从节点的客户端也无法获取到新的可用从节点
         - 无法实现动态扩容
   - Cluster 集

      - 优点：

         - 有效的解决了redis在分布式方面的需求
         - 遇到单机内存，并发和流量瓶颈等问题时，可采用Cluster方案达到负载均衡的目的
         - 可实现动态扩容
         - P2P模式，无中心化
         - 通过Gossip协议同步节点信息
         - 自动故障转移、Slot迁移中数据可用
      - 缺点

         - 架构比较新，最佳实践较少
         - 为了性能提升，客户端需要缓存路由表信息
         - 节点发现、reshard操作不够自动化

## 实践

- 缓存穿透、缓存击穿、缓存雪崩

   - 缓存穿透：指不经过缓存，直接去数据库获取数据，例如通过 ID 查询时，ID的值为-1，此时次次去数据库获取数据。解决方案，判定好条件，或者也进行数据缓存，直接返回。可以采用布隆过滤器解决此问题
   - 缓存击穿：缓存击穿是指缓存中没有但数据库中有的数据（一般是缓存时间到期），这时由于并发用户特别多，同时读缓存没读到数据，又同时去数据库去取数据，引起数据库压力瞬间增大，造成过大压力。可以通过分布式锁解决此问题
   - 缓存雪崩：缓存雪崩是指缓存中数据大批量到过期时间，而查询数据量巨大，引起数据库压力过大甚至down机。和缓存击穿不同的是， 缓存击穿指并发查同一条数据，缓存雪崩是不同数据都过期了，很多数据都查不到从而查数据库。
- SpringBoot AOP 实现统一缓存处理
- SpringBoot 缓存和数据库的数据一致性

   - 延时双删

      - 

         1. 删除缓存
      - 

         2. 更新数据库
      - 

         3. 删除缓存
   - 异步更新

      - 

         1. 更新数据库
      - 

         2. 通过框架监听Mysql的binlog，实现异步删除缓存。
