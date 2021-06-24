# Kubernetes基本使用

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200609225452486.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM0ODMzNTk5,size_16,color_FFFFFF,t_70#pic_center)

## 单机开发环境准备

相信绝大多数的系统还是 window 系统，所以搭建学习环境还是很简单的，主要的过程为：

- 1：安装 Docker
- 2：开启阿里云加速
- 3：开启 Kubernetes
- 4：安装 DashBoard
- 5：安装 Ingress-nginx

### 1：安装 Docker

安装 Docker 很简单，可以直接去官网进行下载[`Docker for window`](https://www.docker.com/get-started)版本。然后点击安装即可。

### 2：开启阿里云加速

[登录阿里云官网，并选择容器镜像服务](https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors),然后选择镜像加速器，就可看到个人的加速地址.
![然后选择镜像加速器，就可看到个人的加速地址](https://imgconvert.csdnimg.cn/aHR0cDovL25vdGVib29rLnpoYW5namlhaGFvLnNpdGUvMjAyMDA2MDgxNjQzMjAucG5n?x-oss-process=image/format,png)
打开 window 中 Docker 的 settings，找到`Docker Engine`，然后修改`registry-mirrors`的值。
![mirrors](https://imgconvert.csdnimg.cn/aHR0cDovL25vdGVib29rLnpoYW5namlhaGFvLnNpdGUvMjAyMDA2MDgxNjQ1NDAucG5n?x-oss-process=image/format,png)

### 3：开启 Kubernetes

在 Docker 的 settings 中打开 kubernetes，如果自己内存和 CPU 资源足够的情况下可以适当多分配些资源。剩下的等待自动下载相关镜像和运行相关容器。（可能需要翻墙）
![开启Kubernetes](https://imgconvert.csdnimg.cn/aHR0cDovL25vdGVib29rLnpoYW5namlhaGFvLnNpdGUvMjAyMDA2MDgxNjQ4MjkucG5n?x-oss-process=image/format,png)
![运行相关容器](https://imgconvert.csdnimg.cn/aHR0cDovL25vdGVib29rLnpoYW5namlhaGFvLnNpdGUvMjAyMDA2MDgxNjUxMDgucG5n?x-oss-process=image/format,png)
可通过执行`kubectl get nodes`进行查看是否部署完毕。

### 4：安装 DashBoard

此时虽然已经安装完毕 kubernetes，但是还能不能够看到相关的数据，所以可以安装 dashboard 进行简单的观测，当然也有很多工具实现了该功能。  
安装 DashBoard 很简单，只需要通过[`github`](https://github.com/kubernetes/dashboard)找到部署文件，然后 kubctl 执行一下部署文件即可。

- 创建 dashboard

```shell

kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.1/aio/deploy/recommended.yaml
```

- 创建帐号

```shell
vim ServiceAccount.yaml
```

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
```

- 创建角色

```shell
vim ClusterRoleBinding.yaml
```

```yaml
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

- 获取 token

```powershell
kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | sls admin-user | ForEach-Object { $_ -Split '\s+' } | Select -First 1)
```

```shell
kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | grep admin-user | awk '{print $1}')
```

- 代理启动

```shell
kubectl proxy
```

- 通过登录[http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/](http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/)页面，使用上述获得 token

### 5：安装 Ingress-nginx

kubernetes 提倡通过 ingress 暴露服务。主要的请求流程为：用户--->ingress-nginx--->ingress--->service--->Deployment--->pod。所以需要安装 ingress-nginx

- ingress-nginx 的部署和 dashboard 相似，需要先获取[配置文件](https://github.com/kubernetes/ingress-nginx/blob/nginx-0.26.0/deploy/static/mandatory.yaml)，然后执行命令即可。

```shell
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/nginx-0.26.0/deploy/static/mandatory.yaml
```

- ingress-nginx 需要暴露对应的端口，从而让其他服务通过域名加上 ingress-nginx 暴露的端口进行访问，如果不进行修改 github 提供的配置文件，则端口号随机暴露，若想暴露指定端口号，则可修改文件。

```shell
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/nginx-0.26.0/deploy/static/provider/baremetal/service-nodeport.yaml
```

修改的文件：

```yaml
apiVersion: v1
kind: Service
metadata:
  name: ingress-nginx
  namespace: ingress-nginx
  labels:
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
spec:
  type: NodePort
  ports:
    - name: http
      port: 80
      targetPort: 80
      protocol: TCP
      nodePort: 32080 # 修改地方
    - name: https
      port: 443
      targetPort: 443
      protocol: TCP
      nodePort: 32443 # 修改地方
  selector:
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
```

- 通过访问本地 ip+暴露端口号就可检测是否部署成功，若成功则会显示`404 Not Found`
  至此基本的学习环境已经配置完成。

## 基本概念

### Pod

Pod 是 K8s 的最小操作单元，但是仍然比 Docker 的容器范围要大，Pod 里可以有多个容器。若使用 Istio(Service Mesh)的相关技术，就可以通过它注入，同一个 Pod 的容器可通过`localhost`进行通信，可以看作在同一个基础系统中部署两个服务。

### Replication Controller

Replication Controller 用来管理和控制 Pod，可以实现 Pod 的副本数，自动伸缩。可能进行管理升级策略。

### Service

Pod 随着自动伸缩，滚动部署，重启迁移等的原因可能使得 Pod 的 IP、数量的改变，这时就需要一个不变的服务进行访问，Service 就解决此问题，而且 Service 会实现负载均衡。

### Label

Kubernetes 的任何 API 对象都可打标签，每个 Label 的 key 对应一个 value，一些对象可通过 Label 的选择器进行对符合条件的对象进行管理。

### Node

Kubernetes 是主从分布式集群架构，Node 节点用于运行 Pod 等的对象，但是 Master 节点有时也可以运行。

## 整体请求流程

![](<http://notebook.zhangjiahao.site/1592727541(1).jpg>)

## Pod

Pod 与 Docker 容器相似，在 Kubernetes 中 Pod 是基础，一切的操作基本都是服务 Pod 的，Pod 可以像 Docker 的容器一样运行镜像，又和容器不太一样，Pod 可以运行多个镜像。例如：一个主镜像，一个辅助镜像，辅助镜像进行一些操作，可以是 Silder。有些镜像的运行需要保存一些数据，这就需要持久卷，通过设置 PVC 可以自动绑定 PV 从而实现数据的保存和共享。

```yaml
apiVersion: apps/v1        # 1.9.0 之前的版本使用 apps/v1beta2，可通过命令 kubectl api-versions 查看
kind: Deployment           #指定创建资源的角色/类型
metadata:                  #资源的元数据/属性
  name: nginx-deployment       #资源的名字，在同一个namespace中必须唯一
  namespace:  xxxx             #命名空间
  labels:
    app: demo                  #标签
spec:
  replicas: 3         #副本数量3
  strategy:
    rollingUpdate:   ##由于replicas为3,则整个升级,pod个数在2-4个之间
      maxSurge: 1      #滚动升级时会先启动1个pod
      maxUnavailable: 1 #滚动升级时允许的最大Unavailable的pod个数
  selector:             #定义标签选择器,部署需要管理的pod（带有该标签的的会被管理）需在pod 模板中定义
    matchLabels:
      app: web-server
  template:      #这里Pod的定义
    metadata:
      labels:    #Pod的label
        app: web-server
    spec:        # 模板的规范
      containers:
      - name: nginx      #容器的名字
        image: nginx:1.12.1  #容器的镜像地址
        command: [ "/bin/sh","-c","cat /etc/config/path/to/special-key" ]    #启动命令
        args:                                                                #启动参数
            - '-storage.local.retention=$(STORAGE_RETENTION)'
            - '-storage.local.memory-chunks=$(STORAGE_MEMORY_CHUNKS)'
            - '-config.file=/etc/prometheus/prometheus.yml'
            - '-alertmanager.url=http://alertmanager:9093/alertmanager'
            - '-web.external-url=$(EXTERNAL_URL)'
    #如果command和args均没有写，那么用Docker默认的配置。
    #如果command写了，但args没有写，那么Docker默认的配置会被忽略而且仅仅执行.yaml文件的command（不带任何参数的）。
    #如果command没写，但args写了，那么Docker默认配置的ENTRYPOINT的命令行会被执行，但是调用的参数是.yaml中的args。
    #如果如果command和args都写了，那么Docker默认的配置被忽略，使用.yaml的配置。
        imagePullPolicy: IfNotPresent
        # IfNotPresent ：默认值,本地有则使用本地镜像,不拉取，如果不存在则拉取
        # Always：  总是拉取
        # Never：  只使用本地镜像，从不拉取
          livenessProbe:
#表示container是否处于live状态。如果LivenessProbe失败，LivenessProbe将会通知kubelet对应的container不健康了。随后kubelet将kill掉container，并根据RestarPolicy进行进一步的操作。默认情况下LivenessProbe在第一次检测之前初始化值为Success，如果container没有提供LivenessProbe，则也认为是Success；
            httpGet:
              path: /health #如果没有心跳检测接口就为/
              port: 8080
              scheme: HTTP
            initialDelaySeconds: 60 ##启动后延时多久开始运行检测
            timeoutSeconds: 5
            successThreshold: 1
            failureThreshold: 5
            readinessProbe:
          readinessProbe:
            httpGet:
              path: /health #如果没有心跳检测接口就为/
              port: 8080
              scheme: HTTP
            initialDelaySeconds: 30 ##启动后延时多久开始运行检测
            timeoutSeconds: 5
            successThreshold: 1
            failureThreshold: 5
          resources:              ##CPU内存限制
            requests:
              cpu: 2
              memory: 2048Mi
            limits:
              cpu: 2
              memory: 2048Mi
          env:                    ##通过环境变量的方式，直接传递pod=自定义Linux OS环境变量
            - name: LOCAL_KEY     #本地Key
              value: value
            - name: CONFIG_MAP_KEY  #局策略可使用configMap的配置Key，
              valueFrom:
                configMapKeyRef:
                  name: special-config   #configmap中找到name为special-config
                  key: special.type      #找到name为special-config里data下的key
          ports:
            - name: http
              containerPort: 8080 #对service暴露端口
          volumeMounts:     #挂载volumes中定义的磁盘
          - name: log-cache
            mount: /tmp/log
          - name: sdb       #普通用法，该卷跟随容器销毁，挂载一个目录
            mountPath: /data/media
          - name: nfs-client-root    #直接挂载硬盘方法，如挂载下面的nfs目录到/mnt/nfs
            mountPath: /mnt/nfs
          - name: example-volume-config  #高级用法第1种，将ConfigMap的log-script,backup-script分别挂载到/etc/config目录下的一个相对路径path/to/...下，如果存在同名文件，直接覆盖。
            mountPath: /etc/config
          - name: rbd-pvc                #高级用法第2中，挂载PVC(PresistentVolumeClaim)

#使用volume将ConfigMap作为文件或目录直接挂载，其中每一个key-value键值对都会生成一个文件，key为文件名，value为内容，
  volumes:  # 定义磁盘给上面volumeMounts挂载
  - name: log-cache
    emptyDir: {}
  - name: sdb  #挂载宿主机上面的目录
    hostPath:
      path: /any/path/it/will/be/replaced
  - name: example-volume-config  # 供ConfigMap文件内容到指定路径使用
    configMap:
      name: example-volume-config  #ConfigMap中名称
      items:
      - key: log-script           #ConfigMap中的Key
        path: path/to/log-script  #指定目录下的一个相对路径path/to/log-script
      - key: backup-script        #ConfigMap中的Key
        path: path/to/backup-script  #指定目录下的一个相对路径path/to/backup-script
  - name: nfs-client-root         #供挂载NFS存储类型
    nfs:
      server: 10.42.0.55          #NFS服务器地址
      path: /opt/public           #showmount -e 看一下路径
  - name: rbd-pvc                 #挂载PVC磁盘
    persistentVolumeClaim:
      claimName: rbd-pvc1         #挂载已经申请的pvc磁盘
```

## Replication Controller

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels: # 这里是定义Deployment的标签
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx # 选择关联Deployment标签
  template:
    metadata:
      labels: # 给Pod定义一个标签，方便其他服务关联这个Pod
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:1.7.9
          ports:
            - containerPort: 80
```

## Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector: # Service 的selector 指定标签 app:nginx 来进行对Pod进行关联 ；(这里的app:nginx就是上面Deployment配置里labels定义的标签 )
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: NodePort
```

## Volume

绝大多数运行的程序可能不需要文件的保存，但是启动的是 MySQl 等有状态的服务时，就需要数据的保存，而 kubernetes 数据的保存可以使用多种类型，例如：HostPath，NFS 等的。

## Ingress

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  labels:
    app: nginx
    dept: omgt
  name: nginx-ingress

spec:
  rules:
    - host: nginx-ingress.default.172.17.234.61.xip.io
      http:
        paths:
          - backend:
              serviceName: nginx-service
              servicePort: 80
            path: /
status:
  loadBalancer:
    ingress:
      - ip: 172.17.234.61
```

## Kubernetes API

## Kubernetes 网络

## Kubernetes 安全

## Kubernetes 资源管理

## Kubernetes 管理和监控

## Kubernetes 生态

## 暂记

### 关于 Ingress 的会话粘滞

有时老式单体项目未做认证信息的共享，就需要会话粘滞（用于在哪个 pod 登录的，以后就访问哪个 pod，除非 pod 不存在了，伪集群）
需要在 ingress 的 metadata.Annotation 添加两个配置：

- nginx.ingress.kubernetes.io/affinity: cookie
- nginx.ingress.kubernetes.io/affinity-mode: persistent

### 外部访问内部服务

### 结合 Istio
