## Docker 安装 UI 界面

### 安装 Docker 的图形化界面 Shipyard

1.下载安装脚本
点击[Shipyard 安装脚本](https://zjh-lattice.oss-cn-beijing.aliyuncs.com/docker/deploy)下载脚本

2.修改自定义端口
修改脚本文件，设置访问端口
![设置Shipyard的端口](http://notebook.zhangjiahao.site/markdown-img-paste-20200323214557991.png)

3.执行脚本，自行部署
![脚本部署](http://notebook.zhangjiahao.site/markdown-img-paste-20200323214712166.png)

4.浏览器登录查看
![账号密码，以及端口](http://notebook.zhangjiahao.site/markdown-img-paste-20200323214756557.png)

## Docker 运行 mysql

`docker run -d -p 3306:3306 --name=common-mysql -e MYSQL_ROOT_PASSWORD=root mysql:5.7`

- 3306：3306 端口映射
- --name=common-mysql 容器名称
- -e MYSQL_ROOT_PASSWORD=root 环境变量---指定 mysql 的密码是 root
- mysql:5.7 镜像名

## Docker 安装 gitlab

参考[docker 下 gitlab 安装配置使用(完整版)
](https://www.jianshu.com/p/080a962c35b6)

### 运行 gitlab

`docker run -d -p 443:443 -p 80:80 -p 222:22 --name gitlab --restart always -v /home/gitlab/config:/etc/gitlab -v /home/gitlab/logs:/var/log/gitlab -v /home/gitlab/data:/var/opt/gitlab gitlab/gitlab-ce`

### 修改配置

```shell
# gitlab.rb文件内容默认全是注释
$ vim /home/gitlab/config/gitlab.rb
# 配置http协议所使用的访问地址,不加端口号默认为80
external_url 'http://192.168.199.231'
# 配置ssh协议所使用的访问地址和端口
gitlab_rails['gitlab_ssh_host'] = '192.168.199.231'
gitlab_rails['gitlab_shell_ssh_port'] = 222 # 此端口是run时22端口映射的222端口
:wq #保存配置文件并退出
```

重启即可

## Docker 安装 Jenkins

[docker 安装 jenkins](https://www.cnblogs.com/stulzq/p/8627360.html)

## Docker 安装 harbor

参考[安装 Harbor](https://www.centos.bz/2018/10/kubernetes-%e6%8c%81%e7%bb%ad%e9%9b%86%e6%88%90-springcloud/#%E4%B8%89%E3%80%81%E6%90%AD%E5%BB%BA%20Docker%20%E7%A7%81%E6%9C%89%E4%BB%93%E5%BA%93%EF%BC%9AHarbor%EF%BC%88192.168.1.101%EF%BC%89)

### 1. 安装 Docker-compose

```shell
# 1.安装Docker-compose
sudo curl -L https://github.com/docker/compose/releases/download/1.18.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

#赋予Docker-compose执行权限
sudo chmod +x /usr/local/bin/docker-compose

#验证Docker-compose
docker-compose --version
```

### 2. 安装 Harbor

```shell
# 1. 下载安装文件（可以在指定目录下载）
wget https://storage.googleapis.com/harbor-releases/harbor-online-installer-v1.5.2.tgz

# 2. 解压下载的文件
tar xvf harbor-online-installer-v1.5.2.tgz
```

### 3. 配置 Harbor

```shell
1. 修改Harbor的配置文件
cd harbor
vim harbor.cfg

内容如下：

# hostname设置访问地址，可以使用ip、域名，不可以设置为127.0.0.1或localhost
hostname = hub.k8s.com

# 访问协议，默认是http，也可以设置https，如果设置https，则nginx ssl需要设置on
ui_url_protocol = http

# mysql数据库root用户默认密码root123，实际使用时修改下
db_password = root@1234

max_job_workers = 3
customize_crt = on
ssl_cert = /data/cert/server.crt
ssl_cert_key = /data/cert/server.key
secretkey_path = /data
admiral_url = NA

# 邮件设置，发送重置密码邮件时使用
email_identity =
email_server = smtp.mydomain.com
email_server_port = 25
email_username = sample_admin@mydomain.com
email_password = abc
email_from = admin <sample_admin@mydomain.com>
email_ssl = false

# 启动Harbor后，管理员UI登录的密码，默认是Harbor12345
harbor_admin_password = root@1234

# 认证方式，这里支持多种认证方式，如LADP、本次存储、数据库认证。默认是db_auth，mysql数据库认证
auth_mode = db_auth

# LDAP认证时配置项
#ldap_url = ldaps://ldap.mydomain.com
#ldap_searchdn = uid=searchuser,ou=people,dc=mydomain,dc=com
#ldap_search_pwd = password
#ldap_basedn = ou=people,dc=mydomain,dc=com
#ldap_filter = (objectClass=person)
#ldap_uid = uid
#ldap_scope = 3
#ldap_timeout = 5

# 是否开启自注册
self_registration = on

# Token有效时间，默认30分钟
token_expiration = 30

# 用户创建项目权限控制，默认是everyone（所有人），也可以设置为adminonly（只能管理员）
project_creation_restriction = everyone

verify_remote_cert = on
```

### 4.启动 Harbor

```shell
# 1.在当前安装目录下
./install.sh
```

### 注意

执行 install.sh 报以下错误

```shell
root@ubuntu:~/harbor# ./prepare
Generated and saved secret to file: /data/secretkey
Generated configuration file: ./common/config/nginx/nginx.conf
Generated configuration file: ./common/config/adminserver/env
Generated configuration file: ./common/config/ui/env
Generated configuration file: ./common/config/registry/config.yml
Generated configuration file: ./common/config/db/env
Generated configuration file: ./common/config/jobservice/env
Generated configuration file: ./common/config/jobservice/config.yml
Generated configuration file: ./common/config/log/logrotate.conf
Generated configuration file: ./common/config/jobservice/config.yml
Generated configuration file: ./common/config/ui/app.conf
Fail to generate key file: ./common/config/ui/private_key.pem, cert file: ./common/config/registry/root.crt
```

需要修改 prepare 文件，将第 498 行：

```shell
empty_subj = "/C=/ST=/L=/O=/CN=/"
```

修改如下：

```shell
empty_subj = "/C=US/ST=California/L=Palo Alto/O=VMware, Inc./OU=Harbor/CN=notarysigner"
```

## Docker 安装 Kafka

## Docker 部署单机 Nacos

已经打包发布到了 DockerHub，需要直接拉去运行即可。
需要有 nacos 的数据库和帐号密码都为 root 的用才可使用

```shell
sudo docker run -d -p 8848:8848 --add-host=september-nacos:172.17.0.1 --name=common-nacos zhangjiahao0401/september-nacos
```

- -p 8848:8848 主机端口号：容器端口号
- --add-host=september-nacos:172.17.0.1 添加 hosts 记录，ip 为 172.17.0.1,域名为 september
  - 域名必须是 september，内部设置了请求的数据库的域名
  - ip，可查询主机的 docker0 的 ip
- --name=common-nacos 设置容器名
- zhangjiahao0401/september-nacos:是 dockerHub 的镜像，国内可替换为`registry.cn-hangzhou.aliyuncs.com/cloud-base/nacos`

## OmniDB

```shell
 docker run -it --rm -p 127.0.0.1:8080:8080 -p 127.0.0.1:25482:25482 taivokasper/omnidb
```

```shell
docker run -it --rm -v config-omnidb:/etc/omnidb -p 127.0.0.1:8080:8080 -p 127.0.0.1:25482:25482 taivokasper/omnidb
```

[参考博客](https://blog.csdn.net/Aria_Miazzy/article/details/85161820)

## Prometheus

### 环境搭建

[基于 docker 搭建 Prometheus+Grafana](https://www.cnblogs.com/xiao987334176/p/9930517.html)

```shell
### 编写配置文件
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
    ### 自己的IP ，docker0的ip
      - targets: ['192.168.91.132:9100']
        labels:
          instance: localhost
```

### 运行镜像

```shell
docker run  -d \
  -p 9090:9090 \
  -v /opt/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml  \
  prom/prometheus
```

### 运行截图

![运行截图](http://notebook.zhangjiahao.site/markdown-img-paste-2020042822281782.png)

## Grafana

### 环境部署

```shell
docker run -d \
  -p 3000:3000 \
  --name=grafana \
  -v /opt/grafana-storage:/var/lib/grafana \
  grafana/grafana
```

初始帐号密码都为`admin`

### 启动页面

![Grafana截图](http://notebook.zhangjiahao.site/markdown-img-paste-20200428223158310.png)
