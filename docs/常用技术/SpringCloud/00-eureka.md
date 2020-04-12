# Eureka
个人观点：eureka和Zookeeper相类似，但是zk保证cp，而eureka保证ap，[（CAP相关资料）](https://blog.csdn.net/paincupid/article/details/80610441)，当主服务发生故障时，zk需要一段时间的投票选取出来才能进行服务的提供，但是eureka则当发生故障的时候会直接调用子节点。百度百科的[eureka](https://baike.baidu.com/item/Eureka/22402835?fr=aladdin)和[Zookeeper](https://baike.baidu.com/item/zookeeper/4836397?fr=aladdin)的介绍。

# 搭建Eureka注册中心

 1. 需要添加的依赖包



```xml
 <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
 </dependency>
```
2. 需要添加到application.xml中的配置，[Spring Cloud Eureka 常用配置及说明（转载）](https://www.cnblogs.com/li3807/p/7282492.html)。

```xml
server.port=8100
eureka.instance.hostname=140.143.15.242
spring.application.name=lattice-eureka
# 是否注册到eureka
eureka.client.register-with-eureka=true
# 是否从eureka获取注册信息
eureka.client.fetch-registry=true
#实例以ip地址展示
eureka.instance.prefer-ip-address=true
## 注册eureka  互相注册实现集群
eureka.client.service-url.defaultZone=http://140.143.15.242:8200/eureka/,http://140.143.15.242:8300/eureka/
# 设置关闭自我保护机制
eureka.server.enable-self-preservation=false
# 10秒检测一次
eureka.server.eviction-interval-timer-in-ms=10000
```

3. 需要再启动类上添加@EnableEurekaServer注解，然后启动即可。注册中心的集群，只需要按以上步骤重新创建一个工程即可，修改application.xml的配置文件中的eureka.client.service-url.defaultZone。

# Eureka客户端

 1. 需要添加的依赖包：

```xml
<dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
            <version>2.0.0.RELEASE</version>
</dependency>
```
 2. 需要在application.xml中添加的配置，相关的配置说明可以参照上面的Spring Cloud Eureka 常用配置及说明。


```xml
eureka.client.service-url.defaultZone=http://140.143.15.242:8100/eureka/,http://140.143.15.242:8200/eureka/,http://140.143.15.242:8300/eureka/
eureka.client.register-with-eureka=true
eureka.client.fetch-registry=true
eureka.instance.lease-renewal-interval-in-seconds=4
eureka.instance.lease-expiration-duration-in-seconds=6
```

 3. 需要再启动类中添加的注解@EnableEurekaClient，直接启动即可，当注册中心和客户端启动该之后可以通过[http://localhost:8100/](http://localhost:8100/)进行查看。


# 运行图

![eureka运行图](https://img-blog.csdnimg.cn/20181209182847221.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM0ODMzNTk5,size_16,color_FFFFFF,t_70)
 如有错误之处，敬请之处，如果无法运行尽请留言，谢谢观看。
