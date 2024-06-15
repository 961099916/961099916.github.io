---
title: Kuberentes 高可用集群安装
order: 102
---

## Sealos安装集群

### 下载Sealos

```bash
# 推荐下载最新版，会修复一些BUG,下载并安装sealos, sealos是个golang的二进制工具，直接下载拷贝到bin目录即可, release页面也可下载
wget -c https://sealyun.oss-cn-beijing.aliyuncs.com/latest/sealos && \
    chmod +x sealos && mv sealos /usr/bin
```

### 下载Kube安装包

```bash
# 下载离线资源包 1.18.0
wget -c https://sealyun.oss-cn-beijing.aliyuncs.com/7b6af025d4884fdd5cd51a674994359c-1.18.0/kube1.18.0.tar.gz
# 下载离线资源包 1.16.0
wget https://sealyun.oss-cn-beijing.aliyuncs.com/37374d999dbadb788ef0461844a70151-1.16.0/kube1.16.0.tar.gz
# 下载离线资源包 1.15.0
wget -C https://sealyun.oss-cn-beijing.aliyuncs.com/free/kube1.15.0.tar.gz
# 下载离线资源包 1.14.1
wget -C https://github.com/sealstore/cloud-kernel/releases/download/offline/kube1.14.1.tar.gz
```

执行初始化命令

```bash
sealos init --user root --passwd root \
	--master 192.168.0.2  --master 192.168.0.3  --master 192.168.0.4  \
	--node 192.168.0.5 \
	--pkg-url /root/kube1.18.0.tar.gz \
	--version v1.18.0
```

[Sealos参数](https://www.notion.so/0e85e47360fd41d9a211377e43bc272c)

### 添加Master

```bash
sealos join --master 192.168.0.6 --master 192.168.0.7
sealos join --master 192.168.0.6-192.168.0.9  # 或者多个连续IP
```

### 删除Master

```bash
sealos clean --master 192.168.0.6 --master 192.168.0.7
sealos clean --master 192.168.0.6-192.168.0.9  # 或者多个连续IP
```

### 添加Node

```bash
sealos join --node 192.168.0.6 --node 192.168.0.7
sealos join --node 192.168.0.6-192.168.0.9  # 或者多个连续IP
```

### 删除Node

```bash
sealos clean --node 192.168.0.6 --node 192.168.0.7
sealos clean --node 192.168.0.6-192.168.0.9  # 或者多个连续IP
```

### 清理集群

```bash
sealos clean --all
```

### 安装应用

[ Sealos安装应用](https://www.notion.so/e0ef6db783924c108cb90da10cc1393d)

### 参考

[快速开始 | sealos | kubernetes安装](https://sealyun.com/docs/)

### 注意

- 若安装过程中出错，则可执行清楚集群命令或者删除集群的所有主机命令进行重置，同时重启一下Master节点，虚拟IP才可清除。
- 注意Docker的版本和Kubernetes版本对应，否则可能出现节点添加不上问题（出现过命名空间无法删除问题，重装版本对应的Docker消失）
- 如果可以，采用root权限安装，否则可能出现权限不足现象

## Rancher安装集群

### 1.创建集群

- 添加集群

![](https://imgconvert.csdnimg.cn/aHR0cDovL25vdGVib29rLnpoYW5namlhaGFvLnNpdGUvMjAyMDA1MjcxMDA4MDcucG5n?x-oss-process=image/format,png#pic_center#alt=%E5%9C%A8%E8%BF%99%E9%87%8C%E6%8F%92%E5%85%A5%E5%9B%BE%E7%89%87%E6%8F%8F%E8%BF%B0)
- 选择自定义，然后填写创建的配置，点击下一步

![](https://imgconvert.csdnimg.cn/aHR0cDovL25vdGVib29rLnpoYW5namlhaGFvLnNpdGUvMjAyMDA1MjcxMDEwMDgucG5n?x-oss-process=image/format,png#pic_center#alt=%E5%9C%A8%E8%BF%99%E9%87%8C%E6%8F%92%E5%85%A5%E5%9B%BE%E7%89%87%E6%8F%8F%E8%BF%B0)
- 添加节点

![](https://imgconvert.csdnimg.cn/aHR0cDovL25vdGVib29rLnpoYW5namlhaGFvLnNpdGUvMjAyMDA1MjcxMDExMjAucG5n?x-oss-process=image/format,png#pic_center#alt=%E5%9C%A8%E8%BF%99%E9%87%8C%E6%8F%92%E5%85%A5%E5%9B%BE%E7%89%87%E6%8F%8F%E8%BF%B0)

### 2.安装 master

安装 master 节点，需要选择 Control

然后复制执行命令在相应的主机执行命令即可

### 3.安装 node

只需要选择 work

然后复制执行命令在相应的主机执行命令即可

### 4.笔记本合盖

需要设置合盖不影响，否则盒盖休眠就会影响该节点

### 5.主机名

若主机名重复，则可能导致无法做安装节点

若 k8s.master k8s.node 他主机名显示的都为 k8s 导致无法添加

## 脚本安装

### 服务器规划

[服务器规划](https://www.notion.so/ec37373bbe8f45928e65a53616cf6857)

### 修改hostname（所有节点）

1. vi /etc/hosts

```jsx
172.22.181.192 k8s-master01
172.22.181.194 k8s-master02
172.22.181.196 k8s-master03
172.22.181.190 k8s-node01
172.22.181.189 k8s-node02
```

1. `export APISERVER_NAME=apiserver.lb`
2. `export APISERVER_IP=172.22.181.197`
3. `export POD_SUBNET=10.100.0.1/16`
4. `echo "${APISERVER_IP} ${APISERVER_NAME}" >> /etc/hosts`

### 安装前检查（所有节点）

1. 任意节点 centos 版本为 7.6 或 7.7
2. 任意节点 CPU 内核数量大于等于 2，且内存大于等于 4G
3. 任意节点 hostname 不是 localhost，且不包含下划线、小数点、大写字母
4. 任意节点都有固定的内网 IP 地址
5. 任意节点上 Kubelet使用的 IP 地址 可互通（无需 NAT 映射即可相互访问），且没有防火墙、安全组隔离
6. 任意节点不会直接使用 docker run 或 docker-compose 运行容器

### 安装负载均衡（apiserver.lb）

1. `yum install haproxy`
2. `vi /etc/haproxy/haproxy.cfg`
3. `修改配置文件，修改结果见附件haproxy.cfg`
4. `systemctl restart haproxy && systemctl enable haproxy`

### 安装 docker / kubelet（所有master、node节点）

1. 上传install_kubelet.sh文件到用户目录（文件见附件）
2. ./install_kubelet.sh

### 初始化第一个master节点（K8s-master01）

1. export POD_SUBNET=10.100.0.1/16
2. 上传init_master.sh文件到用户目录（文件见附件）
3. ./install_ master.sh
4. 执行结果



[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-krosRmSJ-1598678647504)([https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4749b708-6f7b-4294-af6b-42fcf85f6317/image1.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4749b708-6f7b-4294-af6b-42fcf85f6317/image1.png))]

1. 执行红框部分。
2. 复制绿框部分与黄框部分。
3. 查看pod运行状态

> watch kubectl get pod -n kube-system -o wide


1. 查看节点初始化结果

> kubectl get nodes


1. 请等到所有容器组（9个）全部处于 Running 状态，才进行下一步

### 初始化第二、三个master节点（K8s-master02、K8s-master03）

1. 执行绿框复制内容。
2. 检查初始化结果

> kubectl get nodes


### 初始化 worker节点（K8s-node01、K8s-node02）

1. 执行黄框复制内容。
2. 检查初始化结果

> kubectl get nodes


### 移除worker节点

1. kubeadm reset
2. kubectl delete node k8s-nodexx（节点名称）

### 安装Kubernetes Dashboard（K8s-master01）

1. 执行以下命令安装

> kubectl apply -f [https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0-beta5/aio/deploy/recommended.yaml](https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0-beta5/aio/deploy/recommended.yaml)


1. 上传auth.yaml到用户目录（文件见附件）
2. 执行以下命令创建ServiceAccount 和 ClusterRoleBinding

> kubectl apply -f ./auth.yaml


1. 生成证书

   1. grep 'client-certificate-data' /etc/kubernetes/admin.conf | head -n 1 | awk '{print $2}' | base64 -d >> kubecfg.crt
   2. grep 'client-key-data' /etc/kubernetes/admin.conf | head -n 1 | awk '{print $2}' | base64 -d >> kubecfg.key
   3. openssl pkcs12 -export -clcerts -inkey kubecfg.key -in kubecfg.crt -out kubecfg.p12 -name "kubernetes-client"
2. 将kubecfg.p12证书下载到本地
3. 获取token

> kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | grep admin-user | awk '{print $1}')


1. 将证书导入chrome浏览器
2. 访问https://172.22.181.192:6443/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/#/login
3. 输入token登录。

### 问题排查

1. Calico镜像无法拉取，可手工拉取

> docker pull calico/kube-controllers:v3.9.2


1. 节点无法正常启动，可查看日志信息进行排查

> journalctl -f -u kubelet


### 附件

auth.yaml

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard

---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard
```

haproxy.cfg

```bash
global
 
    log         127.0.0.1 local2
 
    chroot      /var/lib/haproxy
    pidfile     /var/run/haproxy.pid
    maxconn     4000
    user        haproxy
    group       haproxy
    daemon
 
    # turn on stats unix socket
    stats socket /var/lib/haproxy/stats
 
defaults
    mode                    tcp           # 修改默认为四层代理
    log                     global
    option                  httplog
    option                  dontlognull
    option http-server-close
    option forwardfor       except 127.0.0.0/8
    option                  redispatch
    retries                 3
    timeout http-request    10s
    timeout queue           1m
    timeout connect         10s
    timeout client          1m
    timeout server          1m
    timeout http-keep-alive 10s
    timeout check           10s
    maxconn                 3000
 
frontend  main 172.22.181.197:6443
    acl url_static       path_beg       -i /static /images /javascript /stylesheets
    acl url_static       path_end       -i .jpg .gif .png .css .js
 
    default_backend             k8s-master
 
backend k8s-master
    mode        tcp             # 修改为tcp
    balance     roundrobin
    server  k8s-master01  172.22.181.192:6443 check     # 三个master主机
    server  k8s-master02  172.22.181.194:6443 check
    server  k8s-master03  172.22.181.196:6443 check
```

init_master.sh

```bash
#!/bin/bash

# 只在 master 节点执行

# 脚本出错时终止执行
set -e

if [ ${#POD_SUBNET} -eq 0 ] || [ ${#APISERVER_NAME} -eq 0 ]; then
  echo -e "\033[31;1m请确保您已经设置了环境变量 POD_SUBNET 和 APISERVER_NAME \033[0m"
  echo 当前POD_SUBNET=$POD_SUBNET
  echo 当前APISERVER_NAME=$APISERVER_NAME
  exit 1
fi

# 查看完整配置选项 https://godoc.org/k8s.io/kubernetes/cmd/kubeadm/app/apis/kubeadm/v1beta2
rm -f ./kubeadm-config.yaml
cat <<EOF > ./kubeadm-config.yaml
apiVersion: kubeadm.k8s.io/v1beta2
kind: ClusterConfiguration
kubernetesVersion: v1.16.2
imageRepository: registry.cn-hangzhou.aliyuncs.com/google_containers
controlPlaneEndpoint: "${APISERVER_NAME}:6443"
networking:
  serviceSubnet: "10.96.0.0/16"
  podSubnet: "${POD_SUBNET}"
  dnsDomain: "cluster.local"
EOF

# kubeadm init
# 根据您服务器网速的情况，您需要等候 3 - 10 分钟
kubeadm init --config=kubeadm-config.yaml --upload-certs

# 配置 kubectl
rm -rf /root/.kube/
mkdir /root/.kube/
cp -i /etc/kubernetes/admin.conf /root/.kube/config

# 安装 calico 网络插件
# 参考文档 https://docs.projectcalico.org/v3.9/getting-started/kubernetes/
rm -f calico-3.9.2.yaml
wget https://kuboard.cn/install-script/calico/calico-3.9.2.yaml
sed -i "s#192\.168\.0\.0/16#${POD_SUBNET}#" calico-3.9.2.yaml
kubectl apply -f calico-3.9.2.yaml
```

install_kubelet.sh

```bash
#!/bin/bash

# 在 master 节点和 worker 节点都要执行

# 安装 docker
# 参考文档如下
# https://docs.docker.com/install/linux/docker-ce/centos/ 
# https://docs.docker.com/install/linux/linux-postinstall/

# 卸载旧版本
yum remove -y docker \
docker-client \
docker-client-latest \
docker-common \
docker-latest \
docker-latest-logrotate \
docker-logrotate \
docker-selinux \
docker-engine-selinux \
docker-engine

# 设置 yum repository
yum install -y yum-utils \
device-mapper-persistent-data \
lvm2
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

# 安装并启动 docker
yum install -y docker-ce-18.09.7 docker-ce-cli-18.09.7 containerd.io
systemctl enable docker
systemctl start docker

# 安装 nfs-utils
# 必须先安装 nfs-utils 才能挂载 nfs 网络存储
yum install -y nfs-utils
yum install -y wget

# 关闭 防火墙
systemctl stop firewalld
systemctl disable firewalld

# 关闭 SeLinux
setenforce 0
sed -i "s/SELINUX=enforcing/SELINUX=disabled/g" /etc/selinux/config

# 关闭 swap
swapoff -a
yes | cp /etc/fstab /etc/fstab_bak
cat /etc/fstab_bak |grep -v swap > /etc/fstab

# 修改 /etc/sysctl.conf
# 如果有配置，则修改
sed -i "s#^net.ipv4.ip_forward.*#net.ipv4.ip_forward=1#g"  /etc/sysctl.conf
sed -i "s#^net.bridge.bridge-nf-call-ip6tables.*#net.bridge.bridge-nf-call-ip6tables=1#g"  /etc/sysctl.conf
sed -i "s#^net.bridge.bridge-nf-call-iptables.*#net.bridge.bridge-nf-call-iptables=1#g"  /etc/sysctl.conf
# 可能没有，追加
echo "net.ipv4.ip_forward = 1" >> /etc/sysctl.conf
echo "net.bridge.bridge-nf-call-ip6tables = 1" >> /etc/sysctl.conf
echo "net.bridge.bridge-nf-call-iptables = 1" >> /etc/sysctl.conf
# 执行命令以应用
sysctl -p

# 配置K8S的yum源
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
       http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF

# 卸载旧版本
yum remove -y kubelet kubeadm kubectl

# 安装kubelet、kubeadm、kubectl
yum install -y kubelet-1.16.2 kubeadm-1.16.2 kubectl-1.16.2

# 修改docker Cgroup Driver为systemd
# # 将/usr/lib/systemd/system/docker.service文件中的这一行 ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
# # 修改为 ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock --exec-opt native.cgroupdriver=systemd
# 如果不修改，在添加 worker 节点时可能会碰到如下错误
# [WARNING IsDockerSystemdCheck]: detected "cgroupfs" as the Docker cgroup driver. The recommended driver is "systemd". 
# Please follow the guide at https://kubernetes.io/docs/setup/cri/
sed -i "s#^ExecStart=/usr/bin/dockerd.*#ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock --exec-opt native.cgroupdriver=systemd#g" /usr/lib/systemd/system/docker.service

# 设置 docker 镜像，提高 docker 镜像下载速度和稳定性
# 如果您访问 https://hub.docker.io 速度非常稳定，亦可以跳过这个步骤
curl -sSL https://get.daocloud.io/daotools/set_mirror.sh | sh -s http://f1361db2.m.daocloud.io

# 重启 docker，并启动 kubelet
systemctl daemon-reload
systemctl restart docker
systemctl enable kubelet && systemctl start kubelet

docker version
```
