# Nacos
- nacos是阿里开源的经过大量测试的开源框架，支持注册中心和配置中心，中文化，而且还能够进行节点管理，动态设置权重
## 整合注册到Nacos
- 添加依赖
- 添加配置文件
- 添加配置注解
### 添加依赖
```xml
<!--注册中心客户端-->
       <dependency>
           <groupId>org.springframework.cloud</groupId>
           <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
           <version>0.9.0.RELEASE</version>
           <exclusions>
               <exclusion>
                   <groupId>org.springframework.boot</groupId>
                   <artifactId>spring-boot-actuator</artifactId>
               </exclusion>
           </exclusions>
       </dependency>
```
- 去除`spring-boot-actuator`依赖，否则会报以来冲突错误，导致无法启动
- 注意版本号，版本不对应会导致无法启动
- 注意nacos依赖版本，使用其他的依赖可能导致配置过于麻烦
### 添加配置文件
注册中心和配置中心应该在程序刚启动时就去注册和拉取配置，所以应配置在`bootstrap.yml`中
```yaml
server:
  port: 8080
spring:
  application:
    name: renren_fast
  cloud:
    nacos:
      discovery:
          ## 服务区地址+端口
        server-addr: ${NACOS-HOST:pig-register}:${NACOS-PORT:8848}
      config:
        server-addr: ${spring.cloud.nacos.discovery.server-addr}
        file-extension: yml
        shared-configs:
          - application-${spring.profiles.active}.${spring.cloud.nacos.config.file-extension}
  profiles:
    active: dev
```
### 配置注解
需要在启动类上开启注册，否则启动失败，添加的注解`@EnableDiscoveryClient`

## 整合拉取Nacos的配置
- 添加依赖
- 添加配置中心
- 数据的使用
### 添加依赖
```xml
        <dependency>
           <groupId>org.springframework.cloud</groupId>
           <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
           <version>0.9.0.RELEASE</version>
       </dependency>
```
### 配置文件同注册文件
### 数据的使用
> 值的使用可通过`@Value()`
> 刷新某个类可添加`@RefreshScope`

## 总结
- 需了解一下@NacosValue的使用
