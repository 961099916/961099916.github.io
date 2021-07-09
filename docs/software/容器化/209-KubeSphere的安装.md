# k8s 集群中安装 kubesphere

[官网中安装 kubesphere 的前提条件如下](https://kubesphere.io/docs/zh-CN/installation/prerequisites/)

- `Kubernetes`版本： `1.15.x ≤ K8s version ≤ 1.17.x`；
- `Helm`版本： `2.10.0 ≤ Helm Version ＜ 3.0.0`（不支持 helm 2.16.0 [#6894](https://github.com/helm/helm/issues/6894)），且已安装了 Tiller，参考  [如何安装与配置 Helm](https://devopscube.com/install-configure-helm-kubernetes/) （预计 3.0 支持 Helm v3）；
- 集群已有默认的存储类型（StorageClass），若还没有准备存储请参考  [安装 OpenEBS 创建 LocalPV 存储类型](https://kubesphere.io/docs/zh-CN/appendix/install-openebs)  用作开发测试环境。
- 集群能够访问外网，若无外网请参考  [在 Kubernetes 离线安装 KubeSphere](https://kubesphere.com.cn/docs/installation/install-on-k8s-airgapped/)。

## 1 安装 helm2.16.3

### 客户端 helm 安装

#### 1.1 下载 helm 客户端

```
wget https://get.helm.sh/helm-v2.16.3-linux-amd64.tar.gz
```

#### 1.2 解压缩并拷贝 helm 二进制文件

```
tar xf helm-v2.16.3-linux-amd64.tar.gz
cp linux-amd64/helm /usr/local/bin
```

### 服务端 tiller 安装

#### 1.3 集群每个节点安装 socat

> 否则会报错 Error: cannot connect to Tiller

```
yum install -y socat
```

#### 1.4 初始化 helm，部署 tiller

Tiller 是以 Deployment 方式部署在 Kubernetes 集群中的，只需执行`helm init`命令便可简单的完成安装，但是 Helm 默认会去 storage.googleapis.com 拉取镜像。。。。。。这里需要使用阿里云的仓库完成安装

```
#添加阿里云的仓库
helm init --client-only --stable-repo-url https://aliacs-app-catalog.oss-cn-hangzhou.aliyuncs.com/charts/

helm repo add incubator https://aliacs-app-catalog.oss-cn-hangzhou.aliyuncs.com/charts-incubator/

helm repo update

#创建服务端 使用-i指定阿里云仓库
helm init --service-account tiller --upgrade -i registry.cn-hangzhou.aliyuncs.com/google_containers/tiller:v2.16.3  --stable-repo-url https://kubernetes.oss-cn-hangzhou.aliyuncs.com/charts

#创建TLS认证服务端，参考地址：#https://github.com/gjmzj/kubeasz/blob/master/docs/guide/helm.md

helm init --service-account tiller --upgrade -i registry.cn-hangzhou.aliyuncs.com/google_containers/tiller:v2.16.3 --tiller-tls-cert /etc/kubernetes/ssl/tiller001.pem --tiller-tls-key /etc/kubernetes/ssl/tiller001-key.pem --tls-ca-cert /etc/kubernetes/ssl/ca.pem --tiller-namespace kube-system --stable-repo-url https://kubernetes.oss-cn-hangzhou.aliyuncs.com/charts
```

#### 1.5 给 tiller 授权

> 因为 Helm 的服务端 Tiller 是一个部署在 Kubernetes 中 kube-system namespace 下的 deployment，它会去连接 kube-api 在 Kubernetes 里创建和删除应用。而从 Kubernetes1.6 版本开始，API Server 启用了 RBAC 授权。目前的 Tiller 部署时默认没有定义授权的 ServiceAccount，这会导致访问 API Server 时被拒绝。所以我们需要明确为 Tiller 部署添加授权。

创建 Kubernetes 的服务帐号和绑定角色

```
#创建serviceaccount
kubectl create serviceaccount --namespace kube-system tiller

#创建角色绑定
kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
```

为 tiller 设置帐号

```
#使用kubectl patch更新API对象
kubectl patch deploy --namespace kube-system tiller-deploy -p '{"spec":{"template":{"spec":{"serviceAccount":"tiller"}}}}'

#验证是否授权成功
kubectl get deploy --namespace kube-system   tiller-deploy  --output yaml|grep  serviceAccount

      serviceAccount: tiller
      serviceAccountName: tiller
```

#### 1.6 验证 tiller 是否安装成功

```
kubectl -n kube-system get pods|grep tiller
tiller-deploy-6d8dfbb696-4cbcz             1/1     Running   0          88s

输入命令	helm version	显示结果以下既为成功
Client: &version.Version{SemVer:"v2.16.3", GitCommit:"1ee0254c86d4ed6887327dabed7aa7da29d7eb0d", GitTreeState:"clean"}
Server: &version.Version{SemVer:"v2.16.3", GitCommit:"1ee0254c86d4ed6887327dabed7aa7da29d7eb0d", GitTreeState:"clean"}
```

#### 1.7 卸载 helm 服务端 tiller

```
$ helm reset
或
$ helm reset -f		强制删除
```

## 2 安装 nfs 存储

- 官方提供的[openebs 存储](https://kubesphere.io/docs/zh-CN/appendix/install-openebs/)貌似不太好使，反正我是安装完后 pod 的状态一直是 pending
- nfs 存储比较简单，适合实验环境
- 也可以使用别的持久化存储

[安装 nfs 参考文章](https://blog.csdn.net/weixin_37546425/article/details/104290906)

> nfs 这里选择在 master 安装，上边的参考文章中说 nfs server 安装在 master 节点会有问题，但是我这里没有

### 2.1 安装配置 nfs

client 端，这里为两个 node 节点

```
yum -y install nfs-utils
```

server 端，master 节点

```
1.安装包
yum -y install nfs-utils rpcbind

2.编辑配置文件
配置文件中的*是允许所有网段，根据自己实际情况写明网段
cat >/etc/exports <<EOF
/data *(insecure,rw,async,no_root_squash)
EOF

3.创建目录并修改权限
这里为了方便实验授予了挂载目录权限为777，请根据实际情况修改目录权限和所有者
mkdir /data && chmod 777 /data

4.启动服务
systemctl enable nfs-server rpcbind && systemctl start nfs-server rpcbind
```

配置 storageclass，注意修改 nfs 服务端 IP 和共享目录

```
cat >storageclass.yaml <<EOF
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: nfs-provisioner
---
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
   name: nfs-provisioner-runner
   namespace: default
rules:
   -  apiGroups: [""]
      resources: ["persistentvolumes"]
      verbs: ["get", "list", "watch", "create", "delete"]
   -  apiGroups: [""]
      resources: ["persistentvolumeclaims"]
      verbs: ["get", "list", "watch", "update"]
   -  apiGroups: ["storage.k8s.io"]
      resources: ["storageclasses"]
      verbs: ["get", "list", "watch"]
   -  apiGroups: [""]
      resources: ["events"]
      verbs: ["watch", "create", "update", "patch"]
   -  apiGroups: [""]
      resources: ["services", "endpoints"]
      verbs: ["get","create","list", "watch","update"]
   -  apiGroups: ["extensions"]
      resources: ["podsecuritypolicies"]
      resourceNames: ["nfs-provisioner"]
      verbs: ["use"]
---
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: run-nfs-provisioner
subjects:
  - kind: ServiceAccount
    name: nfs-provisioner
    namespace: default
roleRef:
  kind: ClusterRole
  name: nfs-provisioner-runner
  apiGroup: rbac.authorization.k8s.io
---
kind: Deployment
apiVersion: apps/v1
metadata:
  name: nfs-client-provisioner
spec:
  selector:
    matchLabels:
      app: nfs-client-provisioner
  replicas: 1
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: nfs-client-provisioner
    spec:
      serviceAccount: nfs-provisioner
      containers:
        - name: nfs-client-provisioner
          image: quay.io/external_storage/nfs-client-provisioner:latest
          imagePullPolicy: IfNotPresent
          volumeMounts:
            - name: nfs-client
              mountPath: /persistentvolumes
          env:
            - name: PROVISIONER_NAME
              value: fuseim.pri/ifs
            - name: NFS_SERVER
              value: 此处修改为nfs服务器ip
            - name: NFS_PATH
              value: /data   #这里为nfs共享目录
      volumes:
        - name: nfs-client
          nfs:
            server: 此处修改为nfs服务器ip
            path: /data   #这里为nfs共享目录
---
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: nfs-storage
provisioner: fuseim.pri/ifs
reclaimPolicy: Retain
EOF
```

创建 storageclass

```
kubectl apply -f storageclass.yaml
```

设置默认 strorageclass

```
kubectl patch storageclass nfs-storage -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
```

检查 nfs-client pod 状态

```
#这里是在default命名空间下创建的
kubectl get pods

NAME                                      READY   STATUS    RESTARTS   AGE
nfs-client-provisioner-7b9746695c-nrz4n   1/1     Running   0          2m38s
```

检查默认存储

```
#这里是在default命名空间下创建的
kubectl get sc

NAME                    PROVISIONER      AGE
nfs-storage (default)   fuseim.pri/ifs   7m22s
```

## 3 部署 kubesphere

[官方文档](https://kubesphere.io/docs/zh-CN/installation/install-on-k8s/)

### 3.1 最小化安装 KubeSphere

```
kubectl apply -f https://raw.githubusercontent.com/kubesphere/ks-installer/master/kubesphere-minimal.yaml
```

### 3.2 查看安装日志

```
#使用如下命令查看安装日志
kubectl logs -n kubesphere-system $(kubectl get pod -n kubesphere-system -l app=ks-install -o jsonpath='{.items[0].metadata.name}') -f

当日志最后提示如下即表明安装完成，但是还是要等待一些pod完全运行起来才可以
Start installing monitoring

task monitoring status is successful
total: 1     completed:1

#####################################################
###              Welcome to KubeSphere!           ###
#####################################################

Console: http://192.168.9.10:30880
Account: admin
Password: P@88w0rd

NOTES：
  1. After logging into the console, please check the
     monitoring status of service components in
     the "Cluster Status". If the service is not
     ready, please wait patiently. You can start
     to use when all components are ready.
  2. Please modify the default password after login.

#####################################################
```

安装日志中会有一个报错如下，但是没有影响

```
TASK [ks-core/ks-core : KubeSphere | Delete Ingress-controller configmap] 
fatal: [localhost]: FAILED! => {"changed": true, "cmd": "/usr/local/bin/kubectl delete cm -n kubesphere-system ks-router-config\n", "delta": "0:00:00.562513", "end": "2020-04-28 07:18:28.772284", "msg": "non-zero return code", "rc": 1, "start": "2020-04-28 07:18:28.209771", "stderr": "Error from server (NotFound): configmaps \"ks-router-config\" not found", "stderr_lines": ["Error from server (NotFound): configmaps \"ks-router-config\" not found"], "stdout": "", "stdout_lines": []}
...ignoring
```

检查所有 pod 状态，都为 running 才可以

```
kubectl get pods -A

NAMESPACE                      NAME                                        READY   STATUS    RESTARTS   AGE
default                        nfs-client-provisioner-7b9746695c-nrz4n     1/1     Running   0          18m
kube-system                    calico-kube-controllers-bc44d789c-ksgnt     1/1     Running   0          39h
kube-system                    calico-node-2t4gr                           1/1     Running   0          39h
kube-system                    calico-node-5bzjl                           1/1     Running   0          39h
kube-system                    calico-node-fjdll                           1/1     Running   0          39h
kube-system                    coredns-58cc8c89f4-8jrlt                    1/1     Running   0          39h
kube-system                    coredns-58cc8c89f4-nt5z5                    1/1     Running   0          39h
kube-system                    etcd-k8s-master1                            1/1     Running   0          39h
kube-system                    kube-apiserver-k8s-master1                  1/1     Running   0          39h
kube-system                    kube-controller-manager-k8s-master1         1/1     Running   0          39h
kube-system                    kube-proxy-b7vj4                            1/1     Running   0          39h
kube-system                    kube-proxy-bghx7                            1/1     Running   0          39h
kube-system                    kube-proxy-ntrxx                            1/1     Running   0          39h
kube-system                    kube-scheduler-k8s-master1                  1/1     Running   0          39h
kube-system                    kuboard-756d46c4d4-dwzwt                    1/1     Running   0          39h
kube-system                    metrics-server-78cff478b7-lwcfl             1/1     Running   0          39h
kube-system                    tiller-deploy-6d8dfbb696-ldpjd              1/1     Running   0          40m
kubernetes-dashboard           dashboard-metrics-scraper-b68468655-t2wgd   1/1     Running   0          39h
kubernetes-dashboard           kubernetes-dashboard-64999dbccd-zwnn5       1/1     Running   1          39h
kubesphere-controls-system     default-http-backend-5d464dd566-5hlzs       1/1     Running   0          6m9s
kubesphere-controls-system     kubectl-admin-6c664db975-kp6r5              1/1     Running   0          3m10s
kubesphere-monitoring-system   kube-state-metrics-566cdbcb48-cc4fv         4/4     Running   0          5m32s
kubesphere-monitoring-system   node-exporter-5lvpx                         2/2     Running   0          5m32s
kubesphere-monitoring-system   node-exporter-hlfbh                         2/2     Running   0          5m32s
kubesphere-monitoring-system   node-exporter-qxkm6                         2/2     Running   0          5m32s
kubesphere-monitoring-system   prometheus-k8s-0                            3/3     Running   1          4m32s
kubesphere-monitoring-system   prometheus-k8s-system-0                     3/3     Running   1          4m32s
kubesphere-monitoring-system   prometheus-operator-6b97679cfd-6dztx        1/1     Running   0          5m32s
kubesphere-system              ks-account-596657f8c6-kzx9w                 1/1     Running   0          5m56s
kubesphere-system              ks-apigateway-78bcdc8ffc-2rvbg              1/1     Running   0          5m58s
kubesphere-system              ks-apiserver-5b548d7c5c-dxqt7               1/1     Running   0          5m57s
kubesphere-system              ks-console-78bcf96dbf-kdh7q                 1/1     Running   0          5m53s
kubesphere-system              ks-controller-manager-696986f8d9-fklzv      1/1     Running   0          5m55s
kubesphere-system              ks-installer-75b8d89dff-zm6fl               1/1     Running   0          7m49s
kubesphere-system              openldap-0                                  1/1     Running   0          6m21s
kubesphere-system              redis-6fd6c6d6f9-dqh2s                      1/1     Running   0          6m25s
```

访问 kubesphere:30880 用户名：admin 默认密码：P@88w0rd

![https://kubesphere.com.cn/forum/assets/files/2020-04-28/1588058902-372472-ishot2020-04-28152813.png](https://kubesphere.com.cn/forum/assets/files/2020-04-28/1588058902-372472-ishot2020-04-28152813.png)

登陆后的首界面

![https://kubesphere.com.cn/forum/assets/files/2020-04-28/1588058969-394455-ishot2020-04-28152911.png](https://kubesphere.com.cn/forum/assets/files/2020-04-28/1588058969-394455-ishot2020-04-28152911.png)

## 注意

- 特别注意版本，如果版本不对，安装不成功，此相关版本已尝试可行
