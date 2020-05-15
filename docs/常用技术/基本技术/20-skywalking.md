# Skywalking

## Docker 部署 Skywalking

- 部署服务端

```shell
sudo docker run --name skywalking -d -p 1234:1234 -p 11800:11800 -p 12800:12800 apache/skywalking-oap-server:6.1.0
```

- 部署 UI

```shell
sudo docker run --name skywalking-ui -d -p 8080:8080 --link skywalking:skywalking -e SW_OAP_ADDRESS=skywalking:12800  apache/skywalking-ui:6.1.0
```

- 启动页面 帐号密码：admin
  ![20200511092238.png](http://notebook.zhangjiahao.site/20200511092238.png)
