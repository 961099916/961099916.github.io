# Kubernetes 创建 StorageClass

## 安装 NFS

```bash
# 安装NFS
yum -y install nfs-utils
# 启动并设置为开机启动
systemctl start nfs && systemctl enable nfs
## 所有的节点都要安装NFS客户端
yum install nfs-common
```

## 配置 NFS

```bash
# 设置共享目录
mkdir -pv /data/volumes/{v1,v2,v3}
# 设置可以访问配置
vi /etc/exports
/data/volume/v1  192.168.1.0/24(rw,no_root_squash)
/data/volume/v2  192.168.1.0/24(rw,no_root_squash)
/data/volume/v3  192.168.1.0/24(rw,no_root_squash)
# 重启
systemctl start nfs
```

## 下载并修改部署文件

```bash
# 下载部署文件
for file in class.yaml deployment.yaml rbac.yaml test-claim.yaml ; do wget https://raw.githubusercontent.com/kubernetes-incubator/external-storage/master/nfs-client/deploy/$file ; done
# 修改NFS的IP和目录
vim deployment.yaml
```

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: nfs-client-provisioner
---
kind: Deployment
apiVersion: extensions/v1beta1
metadata:
  name: nfs-client-provisioner
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: nfs-client-provisioner
    spec:
      serviceAccountName: nfs-client-provisioner
      containers:
        - name: nfs-client-provisioner
          image: quay.io/external_storage/nfs-client-provisioner:v2.0.0 ##默认是latest版本
          volumeMounts:
            - name: nfs-client-root
              mountPath: /persistentvolumes
          env:
            - name: PROVISIONER_NAME
              value: fuseim.pri/ifs ##这里的供应者名称必须和class.yaml中的provisioner的名称一致，否则部署不成功
            - name: NFS_SERVER
              value: k8s-nfs ##这里写NFS服务器的IP地址或者能解析到的主机名
            - name: NFS_PATH
              value: /data/volume/v1 ##这里写NFS服务器中的共享挂载目录（强调：这里的路径必须是目录中最后一层的文件夹，否则部署的应用将无权限创建目录导致Pending）
      volumes:
        - name: nfs-client-root

          nfs:
            server: k8s-nfs               　##NFS服务器的IP或可解析到的主机名
            path: /data/volume/v1　　##NFS服务器中的共享挂载目录（强调：这里的路径必须是目录中最后一层的文件夹，否则部署的应用将无权限创建目录导致Pending）
```

## 部署测试
