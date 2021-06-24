# K3s、K8s、K9s

## 介绍

为了解决运行环境的不同而导致程序出现各种问题，于是出现了 Docker，通过封装基本的部署环境为基础镜像，让打包好的项目联合基础镜像进而制作出项目的镜像，这样项目就可以在任何能运行镜像的地方运行。但随着微服务和项目架构的发展，单机已经不能够满足项目部署的需求，于是出现了容器编排工具，其中 K8s（Kubernetes）是其中之一，但是所有的编排工具都不免占用大量的资源去进行编排容器，这样使得很多的资源未能用在项目上，于是 Rancher([https://www.rancher.cn/](https://www.rancher.cn/))对 k8s 进行了简化，出现了 k3s([https://www.rancher.cn/k3s/](https://www.rancher.cn/k3s/))，能够实现绝大多数的 k8s 功能，但是由于简化使用了其他的驱动和组件进行替代。如果你要进行大型的集群部署，那么我建议你选择使用 K8s；如果你处于边缘计算等小型部署的场景或仅仅需要部署一些非核心集群进行开发/测试，那么选择 k3s 则是性价比更高的选择。至于所说的 K9s，个人认为只是 k8s 一些命令的封装，让其能够在命令行进行图形化展示，从而节省资源。感觉 K9s 和 k3s 更配。

## K8s 安装

k8s 的安装请看其他文章

## K3s 安装

k3s 使用资源非常少，不到 40MB 的二进制档案，只需要 512MB 的 RAM 来运行服务器，每个节点运行需要 75MB 的 RAM，个人学习 k8s 推荐安装使用。

### 1. 下载脚本

```bash
curl -sLS https://get.k3sup.dev | sh
## 可查看命令的帮助
k3sup --help
```

### 2. 安装 server

```bash
## 设置变量
export IP=192.168.0.1
## 安装k3s server，如果高可用安装需要添加参数--cluster
k3sup install --ip $IP --user ubuntu
## 高可用时，添加其他的server
export USER=root
export SERVER_IP=192.168.0.100
export NEXT_SERVER_IP=192.168.0.101
k3sup join \
    --ip $NEXT_SERVER_IP \
    --user $USER \
    --server-user $USER \
    --server-ip $SERVER_IP \
    --server
```

### 3.安装 agent

```bash
export AGENT_IP=192.168.0.101
export SERVER_IP=192.168.0.100
export USER=root
k3sup join --ip $AGENT_IP --server-ip $SERVER_IP --user $USER
```

### 4.注意

在添加失败的时候，再次添加可能出现跳过更新，可使用以下相关命令进行清除或者杀死服务。

```bash
## 杀死所有启动的服务
k3s-kilall.sh
## 卸载k3s-server
k3s-uninstall.sh
## 卸载k3s-agent
k3s-agent-uninstall.sh
```

## k9s安装

### 1.下载

到 github([https://github.com/derailed/k9s/releases](https://github.com/derailed/k9s/releases))找到相应的 realease 进行下载并给予运行的权限。

### 2. 配置文件

k9s 的运行是和 kubectl 的运行基本一致，需要集群的配置文件，可下载集群中的配置文件放到当前用户的.kube 的目录下，文件名称且为 config

### 3.相关的操作

相关的操作请看 github([https://github.com/derailed/k9s](https://github.com/derailed/k9s))的相关文档
