# Prometheus

## 环境搭建

[基于 docker 搭建 Prometheus+Grafana](https://www.cnblogs.com/xiao987334176/p/9930517.html)

```shell
## 编写配置文件
vim prometheus.yml

global:
  scrape_interval:     60s
  evaluation_interval: 60s

scrape_configs:
  - job_name: prometheus
    static_configs:
      - targets: ['localhost:9090']
        labels:
          instance: prometheus

  - job_name: linux
    static_configs:
    ## 自己的IP ，docker0的ip
      - targets: ['192.168.91.132:9100']
        labels:
          instance: localhost
```

## 运行镜像

```shell
docker run  -d \
  -p 9090:9090 \
  -v /opt/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml  \
  prom/prometheus
```

## 运行截图

![运行截图](http://notebook.zhangjiahao.site/markdown-img-paste-2020042822281782.png)
