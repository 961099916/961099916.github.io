# Config

当服务的变多，导致配置文件的繁多，配置文件的管理也会格外的费力，而且如果需要修改服务的配置就需要重新启动，才能使配置生效，但通过配置中心可以解决这些问题，能够时时刷新或者通过访问接口刷新，当和消息总线结合时，就可实现更新配置文件时更新配置。

## 1. POM 文件中的内容：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.lattice</groupId>
    <artifactId>config-one</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>

    <name>config-one</name>
    <description>Demo project for Spring Boot</description>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.0.0.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <java.version>1.8</java.version>
        <spring-cloud.version>Greenwich.M1</spring-cloud.version>
    </properties>

    <dependencies>

        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
            <version>2.0.0.RELEASE</version>
        </dependency>

        <dependency>
            <groupId>de.codecentric</groupId>
            <artifactId>spring-boot-admin-starter-client</artifactId>
            <version>2.0.0</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-config-server</artifactId>
            <version>2.0.0.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <finalName>config-one</finalName>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>

```

## 2. application.properties 文件中的内容：

```properties
server.port=8110
spring.application.name=lattice-config
spring.cloud.config.label=master
spring.cloud.config.server.git.uri=https://gitee.com/limitzjh/springcloud.git
spring.cloud.config.server.git.search-paths=/
spring.cloud.config.server.git.username=
spring.cloud.config.server.git.password=
eureka.client.register-with-eureka=true
eureka.client.fetch-registry=true
eureka.instance.lease-renewal-interval-in-seconds=4
eureka.instance.lease-expiration-duration-in-seconds=6
eureka.client.service-url.defaultZone=http://127.0.0.1:8100/eureka/,http://127.0.0.1:8200/eureka/,http://127.0.0.1:8300/eureka/
spring.boot.admin.client.url=http://127.0.0.1:8100/sba,http://127.0.0.1:8200/sba,http://127.0.0.1:8300/sba
management.endpoints.web.exposure.include=*
```

## 3. application.java 文件中的内容：

```java
package com.lattice.configone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableConfigServer
@RefreshScope
@EnableEurekaClient
public class ConfigOneApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConfigOneApplication.class, args);
	}
}

```

## 启动页面

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190308173454755.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM0ODMzNTk5,size_16,color_FFFFFF,t_70)
