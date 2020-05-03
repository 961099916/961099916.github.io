# Spring Data JPA

- SpringBoot 整合 JPA
- JPA 基本增删改查
- JPA 多表操作
- JPA 加载

## SpringBoot 整合 Spring Data JPA

- 添加 POM 依赖
- 添加配置

### 添加依赖

> 添加 Spring Data JPA 和 Mysql 的依赖

```xml
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

- 设置数据源
- 设置 JPA 数据库类型和打印 SQL

```yaml
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

## JPA 基本操作

### 集成 JpaRepositry
