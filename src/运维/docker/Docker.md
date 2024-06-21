---
title: Docker
order: 2
---

容器化在现在使用非常普遍，对于个人环境搭建和使用是非常方便的，而且对于生产上的部署也日益完善，相信在使用过程中所遇到的问题，能都够在网上获得相应的答案。本人虽然也学习并使用了很长的时间，但是却从未进行完整的整理，没有进行对自己Docker 的相关知识的总结和梳理，本篇文章是本人结合网上文章和个人理解进行总结得到的。
## Docker环境搭建

```shell
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
sudo yum update -y
sudo yum install docker-ce docker-ce-cli containerd.io
sudo systemctl start docker
sudo systenctl enable docker
```

## Docker命令使用

#### 启动容器

#### 停止容器

#### 删除容器

#### 查看容器

#### 构建镜像

#### 离线下载镜像

#### 删除镜像

#### 镜像打标签

#### 镜像优化

## Docker 原理

容器化本质还是使用了 `Linux`的一些功能进行实现的，通过`namespace` 实现内核资源的隔离，通过`cgroup`来实现物力资源的隔离，实现容器化的资源限制和统计，通过`UnionFS`来实现文件资源你的隔离。

以下的整个解析将结合一个`nginx` 容器进行描述，启动命令如下：

```shell
docker run -d -p 80:80 --name nginx nginx
# docker ps 查看该容器的一些数据
# CONTAINER ID   IMAGE     COMMAND                  CREATED       STATUS       PORTS                               NAMES
# c0f373db9d49   nginx     "/docker-entrypoint.…"   4 hours ago   Up 4 hours   0.0.0.0:80->80/tcp, :::80->80/tcp   nginx
ps aux | grep c0f373db9d49 # 查看容器在主机上的 pid  49798
#root       49798  0.0  0.1 720556 15496 ?        Sl   11:49   0:00 ......
#root       53611  0.0  0.0  12136  1144 pts/2    S+   15:48   0:00 ......
```

### cgroups 控制组

#### cgroup 介绍

[sparkdev: cgroups](42848229fcb6046c7ae55c13545a69db)

`cgroup`是对不同进程组进行资源控制和统计的技术，可以为每个`group` 的 CPU、内存、磁盘 IO、网络流量进行限制和统计，主要的应用在资源隔离和管理、资源监控和限制。Linux 中可以通过`/sys/fs/cgroup/` 进行查看`cgroup`的配置。`/sys/fs/cgroup/`不同的文件代表不同的配置，解释如下:

| 文件名称 | 解释 |
| --- | --- |
| blkio | 对块设备的 IO 进行限制。 |
| cpu | 限制 CPU 时间片的分配，与 cpuacct 挂载在同一目录。 |
| cpuacct | 生成 cgroup 中的任务占用 CPU 资源的报告，与 cpu 挂载在同一目录。 |
| cpuset | 给 cgroup 中的任务分配独立的 CPU(多处理器系统) 和内存节点。 |
| devices | 允许或禁止 cgroup 中的任务访问设备。 |
| freezer | 暂停/恢复 cgroup 中的任务。 |
| hugetlb | 限制使用的内存页数量。 |
| memory | 对 cgroup 中的任务的可用内存进行限制，并自动生成资源占用报告。 |
| net_cls | 使用等级识别符（classid）标记网络数据包，这让 Linux 流量控制器（tc 指令）可以识别来自特定 cgroup 任务的数据包，并进行网络限制。 |
| net_prio | 允许基于 cgroup 设置网络流量(netowork traffic)的优先级。 |
| perf_event | 允许使用 perf 工具来监控 cgroup。 |
| pids | 限制任务的数量。 |


#### docker 如何使用的 cgroup

通过查看`/sys/fs/cgroup/` 发现存在`docker/c0f373db9d49879e669f79989c81a6b5ec904e660732b4f0e4bebbb311850475` 的目录，在容器停止是该目录不存在，当容器启动时自动创建对应的数据，以此可以认为当容器启动时是通过初始化 cgroup 的部分文件实现来使用 cgroup 进行资源隔离的。以下通过部分文件验证其内容就是容器对应的状态的数据：

```shell
docker stats
#CONTAINER ID   NAME      CPU %     MEM USAGE / LIMIT     MEM %     NET I/O     BLOCK I/O   PIDS
#c0f373db9d49   nginx     0.00%     3.988MiB / 7.586GiB   0.05%     836B / 0B   0B / 0B     5
# 可以看到当前的内存使用是 3.988M
cat /sys/fs/cgroup/memory/docker/c0f373db9d49879e669f79989c81a6b5ec904e660732b4f0e4bebbb311850475/memory.usage_in_bytes
cat /sys/fs/cgroup/memory/docker/c0f373db9d49879e669f79989c81a6b5ec904e660732b4f0e4bebbb311850475/memory.stat
# (第一个值 - 第二个值)/1024/1024 = 4182016/1024/1024 = 3.98828125 约为 3.988M
```

通过以上内容可以看出在启动容器的时候，会创建部分文件来使用 cgroup ，从而达到资源控制和统计的作用。

### namespace 命名空间

namespace 是 Linux 内核用来隔离内核资源的方式。通过 namespace 可以让一些进程只能看到与自己相关的一部分资源，而另外一些进程也只能看到与它们自己相关的资源，这两拨进程根本就感觉不到对方的存在。具体的实现方式是把一个或多个进程的相关资源指定在同一个 namespace 中。

namespaces 是对全局系统资源的一种封装隔离，使得处于不同 namespace 的进程拥有独立的全局系统资源，改变一个 namespace 中的系统资源只会影响当前 namespace 里的进程，对其他 namespace 中的进程没有影响

### unionFS 联合文件系统

## Docker 存储

## Docker 持久化

## Docker 网络
