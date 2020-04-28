# Grafana
## 环境部署
```shell
docker run -d \
  -p 3000:3000 \
  --name=grafana \
  -v /opt/grafana-storage:/var/lib/grafana \
  grafana/grafana
```
初始帐号密码都为`admin`
## 启动页面
![Grafana截图](http://notebook.zhangjiahao.site/markdown-img-paste-20200428223158310.png)
