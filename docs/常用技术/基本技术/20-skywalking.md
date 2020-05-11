# Skywalking

## Docker 部署 Skywalking

- 部署服务端

```shell
sudo docker run --name skywalking -d -p 1234:1234 -p 11800:11800 -p 12800:12800 --restart always apache/skywalking-oap-server:6.1.0
```

- 部署 UI

```shell
sudo docker run --name skywalking-ui -d -p 8080:8080 --link skywalking:skywalking -e SW_OAP_ADDRESS=skywalking:12800 --restart always apache/skywalking-ui:6.1.0
```
