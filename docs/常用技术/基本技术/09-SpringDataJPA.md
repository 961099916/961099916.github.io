# Spring Data JPA

* SpringBoot 整合JPA
* JPA基本增删改查
* JPA多表操作
* JPA加载

## SpringBoot整合Spring Data JPA

* 添加POM依赖
* 添加配置

### 添加依赖

> 添加Spring Data JPA和Mysql的依赖

``` xml
      <dependency>
          <groupId>org.springframework.boot</groupId>
          <artifactId>spring-boot-starter-data-jpa</artifactId>
      </dependency>
      <dependency>
          <groupId>mysql</groupId>
          <artifactId>mysql-connector-java</artifactId>
      </dependency>
```

### 添加配置

* 设置数据源
* 设置JPA数据库类型和打印SQL

``` yaml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    password: admin
    url: jdbc:mysql://localhost:3306/common?characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=false&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=GMT%2B8&nullCatalogMeansCurrent=true&allowPublicKeyRetrieval=true
    username: admin
  jpa:
    show-sql: true
    database: mysql
```

## JPA基本操作

### 集成JpaRepositry
