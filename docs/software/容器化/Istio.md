# Istio

随着微服务的发展，越来越多复杂问题都找打了第三方组件的解决方案，但是对于以往的单体架构的微服务化可能需要进行大量的重构，而且服务间的网络调用变得十分复杂，就需要一个完善的服务治理工具。而又因为 K8s 和微服务的完美结合，使其解决了微服务的编排部署的问题，但是服务治理还是过于繁琐，而且 k8s 对于服务治理方面不够完善，所以提出了服务网格的概念，通过代理微服务的网络，从而实现网络的追踪和监控。

## 基本案例

基本案例是基于 Istio 的官方提供的案例，可通过 git 下载[https://github.com/istio/istio](https://github.com/istio/istio)

### 部署 K8s 服务

执行`samples\bookinfo\platform\kube\bookinfo.yaml`，截取部分配置说明:

```yaml
## 创建Service，选取app为details的pod
apiVersion: v1
kind: Service
metadata:
  name: details # 服务名称
  labels:
    app: details
    service: details
spec:
  ports: # 端口号
    - port: 9080
      name: http
  selector:
    app: details
---
## 创建帐号
apiVersion: v1
kind: ServiceAccount
metadata:
  name: bookinfo-details
  labels:
    account: details
---
## 创建Deployment进行管理Pod
apiVersion: apps/v1
kind: Deployment
metadata:
  name: details-v1
  labels:
    app: details
    ## 自定义标签的版本号
    version: v1
spec:
  ## 副本个数
  replicas: 1
  selector:
    matchLabels:
      app: details
      version: v1
  template:
    metadata:
      labels:
        app: details
        version: v1
    spec:
      serviceAccountName: bookinfo-details
      containers:
        - name: details
          ## 镜像名
          image: docker.io/istio/examples-bookinfo-details-v1:1.16.1
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 9080
---

```

综上可看出，该配置文件只是单纯的使用 K8s 部署服务，生成对应的 Pod、Deploment、Service，这里并未使用 Istio，但是此处应该选择对应的命名空间自动注入 Istio，否则无法进行 Istio 的流量管理等的操作。

### 虚拟服务

下面需要执行虚拟服务的配置文件(`samples\bookinfo\networking\virtual-service-all-v1.yaml`),截取部分如下：

```yaml
## 创建Istio的虚拟服务
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: productpage
spec:
  ## 这里对应的服务的名称，这里如果不明白可百度k8s的网络相关
  hosts:
    - productpage
  http:
    ## 转发规则 转发到对应的规则（下面会讲到规则），当然此处可以设置转发权重，也就是基本的流量管理，也可设置符合的路径转发等的功能，后面会说到
    - route:
        - destination:
            host: productpage
            subset: v1
---

```

综上，此处使用了 Istio 的虚拟服务的概念，其实相当于 K8s 的 service，只是此处的虚拟服务提供能更加强大的功能，能够转发符合一定条件的请求。

### 规则

下面需要执行虚拟服务的配置文件(`samples\bookinfo\networking\destination-rule-all.yaml`),截取部分如下：

```yaml
---
## 定义Istio的规则
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: reviews
spec:
  host: reviews
  ## 设置规则，subsets和虚拟服务相对应，通过hosts选择对应的k8s的服务，通过label进一步细选。
  subsets:
    - name: v1
      labels:
        version: v1
    - name: v2
      labels:
        version: v2
    - name: v3
      labels:
        version: v3
```

### 网关

下面需要执行虚拟服务的配置文件(`samples\bookinfo\networking\bookinfo-gateway.yaml`),截取部分如下：

```yaml
## 定义Istio的Gateway
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: bookinfo-gateway
spec:
  selector:
    istio: ingressgateway # use istio default controller
  servers:
    - port:
        number: 80
        name: http
        protocol: HTTP
        ## 这里通过hosts绑定
      hosts:
        - "*"
---
## 这里的Istio的虚拟服务通过路径进行转发
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: bookinfo
spec:
  hosts:
    - "*"
  gateways:
    - bookinfo-gateway
  http:
    - match:
        - uri:
            exact: /productpage
        - uri:
            prefix: /static
        - uri:
            exact: /login
        - uri:
            exact: /logout
        - uri:
            prefix: /api/v1/products
      route:
        - destination:
            host: productpage
            port:
```

## 基本流程

![](http://notebook.zhangjiahao.site/20200622152457.png)

## 流量管理

```yaml
kind: VirtualService
metadata:
  name: reviews
  ...
spec:
  hosts:
  - reviews
  ## 不仅仅可以转发http还可转发TCP等的
  http:
  ## 设置延迟，所有的请求都会被延迟7s
  - fault:
      delay:
        fixedDelay: 7s
        percentage:
          value: 100
  - match:
  ## 通过headers中的参数进行转发， 符合条件的转发给v2其他的转发给v1
    - headers:
        end-user:
          exact: jason
    route:
    - destination:
        host: reviews
        subset: v2
    # 设置镜像流量到v3，并在 headers 中的 Host/Authority 属性值上追加 -shadow，可以使用 mirror_percent 属性来设置镜像流量的百分比
    mirror:
      host: reviews
      subset: v3
    mirror_percent: 100
  - route:
    - destination:
        host: reviews
        subset: v1
        ## 设置转发权重
      weight: 50
    ## 设置超时时间
    timeout: 0.5s
  - route:
    - destination:
        host: reviews
        subset: v1
      weight: 50
    timeout: 0.5s
```

```yaml
## 熔断
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: httpbin
  ...
spec:
  host: httpbin
  ## 设置熔断
  trafficPolicy:
    connectionPool:
      http:
      ## 设置最大请求数
        http1MaxPendingRequests: 1
        maxRequestsPerConnection: 1
      tcp:
      ## 设置最大并发连接数
        maxConnections: 1
    outlierDetection:
      baseEjectionTime: 180.000s
      consecutiveErrors: 1
      interval: 1.000s
      maxEjectionPercent: 100
```

```yaml
## Gateway的相关内容
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: httpbin-gateway
spec:
  selector:
    istio: ingressgateway # use istio default ingress gateway
  servers:
    - port:
        number: 443
        name: https
        protocol: HTTPS
        ## 通过证书实现https，该 secret 必须在 istio-system 命名空间下，且名为 istio-ingressgateway-certs，以与此任务中使用的 Istio 默认 ingress 网关的配置保持一致，证书和私钥必须位于 /etc/istio/ingressgateway-certs，否则网关将无法加载它们
      ## 安全
      tls:
        ## 可设置不同的模式
        mode: MUTUAL
        serverCertificate: /etc/istio/ingressgateway-certs/tls.crt
        privateKey: /etc/istio/ingressgateway-certs/tls.key
        caCertificates: /etc/istio/ingressgateway-ca-certs/example.com.crt
      hosts:
        - "httpbin.example.com"
```

## 可观察性

## 策略
