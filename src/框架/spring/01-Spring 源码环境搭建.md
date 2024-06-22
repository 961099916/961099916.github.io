---
title: 源码环境搭建
order: 1
category:
- it
tags:
- 框架
- spring
- 源码
---
# Spring 源码环境搭建
## 下载代码
```shell
git clone https://github.com/spring-projects/spring-framework.git
```
## 修改配置
1. 注释掉`settings.gradle`中的`include "spring-aspects"`

## 添加测试包

1. 创建一个新的包`spring-example`,修改`build.gradle`文件为一下内容

```shell
plugins {  
	id 'java'  
}  
  
group 'org.springframework'  
version '5.2.17.BUILD-SNAPSHOT'  
  
repositories {  
	mavenCentral()  
}  
  
dependencies {  
compile(project(":spring-beans"))  
compile(project(":spring-core"))  
compile(project(":spring-context"))  
compile(project(":spring-webmvc"))  
compile(project(":spring-jdbc"))  
compile(project(":spring-orm"))  
compile(project(":spring-tx"))  
compile(project(":spring-web"))  
compile(project(":spring-context-indexer"))  
compile(project(":spring-context-support"))  
compile(project(":spring-expression"))  
compile(project(":spring-instrument"))  
compile(project(":spring-jcl"))  
compile(project(":spring-jms"))  
compile(project(":spring-messaging"))  
compile(project(":spring-oxm"))  
compile(project(":spring-test"))  
compile(project(":spring-webflux"))  
compile(project(":spring-websocket"))  
// compile(project(":spring-aspects"))  
compile("org.aspectj:aspectjweaver:1.9.7")  
compile(project(":spring-aop"))  
	testCompile group: 'junit', name: 'junit', version: '4.12'  
}  
  
test {  
	useJUnitPlatform()  
}
```
2. 添加配置文件类，用户加载相关的配置

```java
package config;  
  
import bean.CustomBeanDefinitionRegistryPostProcessor;  
import bean.Person;  
import bean.TestBeanFactoryPostProcessor;  
import org.springframework.beans.factory.support.BeanDefinitionRegistryPostProcessor;  
import org.springframework.context.annotation.*;  
  
import bean.User;  
  
@Configuration  
@EnableAspectJAutoProxy  
public class UserConfig {  
  @Bean  
  public User user() {  
    return new User("zhang", "ada");  
  }  

  @Bean  
  public Person person(){  
    return new Person(user());  
  }  

  @Bean  
  public TestBeanFactoryPostProcessor testBeanFactoryPostProcessor(){  
    return new TestBeanFactoryPostProcessor();  
  }  

  @Bean  
  public BeanDefinitionRegistryPostProcessor customBeanDefinitionRegistryPostProcessor(){  
    return new CustomBeanDefinitionRegistryPostProcessor();  
  }  

  @Bean  
  public AspectTest aspectTest(){  
    return new AspectTest();  
  }  
  
}
```
3. 创建测试类

```java
package test;  
  
import bean.User;  
import config.UserConfig;  
import org.springframework.beans.factory.config.BeanDefinition;  
import org.springframework.context.ApplicationContext;  
import org.springframework.context.annotation.AnnotationConfigApplicationContext;  
  
public class UserTest {  
	public static void main(String[] args) {  
    // 获取容器  
    AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(UserConfig.class);  
    BeanDefinition user1 = ac.getBeanDefinition("person");  
    // 获取 beanUser user = (User) ac.getBean("user");  
    System.out.println(user.toString());  
  }  
}
```
## 本人代码库

```
https://gitee.com/jiuxialb/spring-framework.git
```



