# Docker 安装

[[toc]]

## 在线安装

```bash
# 删除已存在的Docker
yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine
rm -rf /etc/systemd/system/docker.service.d
rm -rf /var/lib/docker
rm -rf /var/run/docker

sudo yum install -y yum-utils device-mapper-persistent-data lvm2
# Use Aliyun Docker
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
yum list docker-ce --showduplicates
# 安装Docker，可选定版本号
sudo yum install docker-ce-18.09.9-3.el7 -y
```

## 离线安装
