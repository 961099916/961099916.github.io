# Sentinel

## Docker 部署 Sentinel

```shell
sudo docker run -d -p 8845:8858 --name common-sentinel bladex/sentinel-dashboard
```

![20200508084135.png](http://notebook.zhangjiahao.site/20200508084135.png)

## 配置

### 依赖

```pom
        <!--sentinel-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
        </dependency>
        <!--sentinel end-->
```

### yaml 配置

```yaml
spring:
  cloud:
    sentinel:
      transport:
        dashboard: localhost:8080
        ## 是否关闭延迟
      #eager: true
```
