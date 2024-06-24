import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as i,o,c,d as n,e as s,a,b as l}from"./app-_82SZeJ6.js";const r={},p=l(`<h2 id="sealos安装集群" tabindex="-1"><a class="header-anchor" href="#sealos安装集群"><span>Sealos安装集群</span></a></h2><h3 id="下载sealos" tabindex="-1"><a class="header-anchor" href="#下载sealos"><span>下载Sealos</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 推荐下载最新版，会修复一些BUG,下载并安装sealos, sealos是个golang的二进制工具，直接下载拷贝到bin目录即可, release页面也可下载</span>
<span class="token function">wget</span> <span class="token parameter variable">-c</span> https://sealyun.oss-cn-beijing.aliyuncs.com/latest/sealos <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\\</span>
    <span class="token function">chmod</span> +x sealos <span class="token operator">&amp;&amp;</span> <span class="token function">mv</span> sealos /usr/bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="下载kube安装包" tabindex="-1"><a class="header-anchor" href="#下载kube安装包"><span>下载Kube安装包</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token comment"># 下载离线资源包 1.18.0</span>
<span class="token function">wget</span> <span class="token parameter variable">-c</span> https://sealyun.oss-cn-beijing.aliyuncs.com/7b6af025d4884fdd5cd51a674994359c-1.18.0/kube1.18.0.tar.gz
<span class="token comment"># 下载离线资源包 1.16.0</span>
<span class="token function">wget</span> https://sealyun.oss-cn-beijing.aliyuncs.com/37374d999dbadb788ef0461844a70151-1.16.0/kube1.16.0.tar.gz
<span class="token comment"># 下载离线资源包 1.15.0</span>
<span class="token function">wget</span> <span class="token parameter variable">-C</span> https://sealyun.oss-cn-beijing.aliyuncs.com/free/kube1.15.0.tar.gz
<span class="token comment"># 下载离线资源包 1.14.1</span>
<span class="token function">wget</span> <span class="token parameter variable">-C</span> https://github.com/sealstore/cloud-kernel/releases/download/offline/kube1.14.1.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行初始化命令</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>sealos init <span class="token parameter variable">--user</span> root <span class="token parameter variable">--passwd</span> root <span class="token punctuation">\\</span>
	<span class="token parameter variable">--master</span> <span class="token number">192.168</span>.0.2  <span class="token parameter variable">--master</span> <span class="token number">192.168</span>.0.3  <span class="token parameter variable">--master</span> <span class="token number">192.168</span>.0.4  <span class="token punctuation">\\</span>
	<span class="token parameter variable">--node</span> <span class="token number">192.168</span>.0.5 <span class="token punctuation">\\</span>
	--pkg-url /root/kube1.18.0.tar.gz <span class="token punctuation">\\</span>
	<span class="token parameter variable">--version</span> v1.18.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),d={href:"https://www.notion.so/0e85e47360fd41d9a211377e43bc272c",target:"_blank",rel:"noopener noreferrer"},u=l(`<h3 id="添加master" tabindex="-1"><a class="header-anchor" href="#添加master"><span>添加Master</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>sealos <span class="token function">join</span> <span class="token parameter variable">--master</span> <span class="token number">192.168</span>.0.6 <span class="token parameter variable">--master</span> <span class="token number">192.168</span>.0.7
sealos <span class="token function">join</span> <span class="token parameter variable">--master</span> <span class="token number">192.168</span>.0.6-192.168.0.9  <span class="token comment"># 或者多个连续IP</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除master" tabindex="-1"><a class="header-anchor" href="#删除master"><span>删除Master</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>sealos clean <span class="token parameter variable">--master</span> <span class="token number">192.168</span>.0.6 <span class="token parameter variable">--master</span> <span class="token number">192.168</span>.0.7
sealos clean <span class="token parameter variable">--master</span> <span class="token number">192.168</span>.0.6-192.168.0.9  <span class="token comment"># 或者多个连续IP</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="添加node" tabindex="-1"><a class="header-anchor" href="#添加node"><span>添加Node</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>sealos <span class="token function">join</span> <span class="token parameter variable">--node</span> <span class="token number">192.168</span>.0.6 <span class="token parameter variable">--node</span> <span class="token number">192.168</span>.0.7
sealos <span class="token function">join</span> <span class="token parameter variable">--node</span> <span class="token number">192.168</span>.0.6-192.168.0.9  <span class="token comment"># 或者多个连续IP</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除node" tabindex="-1"><a class="header-anchor" href="#删除node"><span>删除Node</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>sealos clean <span class="token parameter variable">--node</span> <span class="token number">192.168</span>.0.6 <span class="token parameter variable">--node</span> <span class="token number">192.168</span>.0.7
sealos clean <span class="token parameter variable">--node</span> <span class="token number">192.168</span>.0.6-192.168.0.9  <span class="token comment"># 或者多个连续IP</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="清理集群" tabindex="-1"><a class="header-anchor" href="#清理集群"><span>清理集群</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>sealos clean <span class="token parameter variable">--all</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="安装应用" tabindex="-1"><a class="header-anchor" href="#安装应用"><span>安装应用</span></a></h3>`,11),m={href:"https://www.notion.so/e0ef6db783924c108cb90da10cc1393d",target:"_blank",rel:"noopener noreferrer"},v=n("h3",{id:"参考",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#参考"},[n("span",null,"参考")])],-1),b={href:"https://sealyun.com/docs/",target:"_blank",rel:"noopener noreferrer"},k=l('<h3 id="注意" tabindex="-1"><a class="header-anchor" href="#注意"><span>注意</span></a></h3><ul><li>若安装过程中出错，则可执行清楚集群命令或者删除集群的所有主机命令进行重置，同时重启一下Master节点，虚拟IP才可清除。</li><li>注意Docker的版本和Kubernetes版本对应，否则可能出现节点添加不上问题（出现过命名空间无法删除问题，重装版本对应的Docker消失）</li><li>如果可以，采用root权限安装，否则可能出现权限不足现象</li></ul><h2 id="rancher安装集群" tabindex="-1"><a class="header-anchor" href="#rancher安装集群"><span>Rancher安装集群</span></a></h2><h3 id="_1-创建集群" tabindex="-1"><a class="header-anchor" href="#_1-创建集群"><span>1.创建集群</span></a></h3><ul><li>添加集群</li></ul><figure><img src="https://imgconvert.csdnimg.cn/aHR0cDovL25vdGVib29rLnpoYW5namlhaGFvLnNpdGUvMjAyMDA1MjcxMDA4MDcucG5n?x-oss-process=image/format,png#pic_center#alt=在这里插入图片描述" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>选择自定义，然后填写创建的配置，点击下一步</li></ul><figure><img src="https://imgconvert.csdnimg.cn/aHR0cDovL25vdGVib29rLnpoYW5namlhaGFvLnNpdGUvMjAyMDA1MjcxMDEwMDgucG5n?x-oss-process=image/format,png#pic_center#alt=在这里插入图片描述" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>添加节点</li></ul><figure><img src="https://imgconvert.csdnimg.cn/aHR0cDovL25vdGVib29rLnpoYW5namlhaGFvLnNpdGUvMjAyMDA1MjcxMDExMjAucG5n?x-oss-process=image/format,png#pic_center#alt=在这里插入图片描述" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_2-安装-master" tabindex="-1"><a class="header-anchor" href="#_2-安装-master"><span>2.安装 master</span></a></h3><p>安装 master 节点，需要选择 Control</p><p>然后复制执行命令在相应的主机执行命令即可</p><h3 id="_3-安装-node" tabindex="-1"><a class="header-anchor" href="#_3-安装-node"><span>3.安装 node</span></a></h3><p>只需要选择 work</p><p>然后复制执行命令在相应的主机执行命令即可</p><h3 id="_4-笔记本合盖" tabindex="-1"><a class="header-anchor" href="#_4-笔记本合盖"><span>4.笔记本合盖</span></a></h3><p>需要设置合盖不影响，否则盒盖休眠就会影响该节点</p><h3 id="_5-主机名" tabindex="-1"><a class="header-anchor" href="#_5-主机名"><span>5.主机名</span></a></h3><p>若主机名重复，则可能导致无法做安装节点</p><p>若 k8s.master k8s.node 他主机名显示的都为 k8s 导致无法添加</p><h2 id="脚本安装" tabindex="-1"><a class="header-anchor" href="#脚本安装"><span>脚本安装</span></a></h2><h3 id="服务器规划" tabindex="-1"><a class="header-anchor" href="#服务器规划"><span>服务器规划</span></a></h3>',23),h={href:"https://www.notion.so/ec37373bbe8f45928e65a53616cf6857",target:"_blank",rel:"noopener noreferrer"},g=l(`<h3 id="修改hostname-所有节点" tabindex="-1"><a class="header-anchor" href="#修改hostname-所有节点"><span>修改hostname（所有节点）</span></a></h3><ol><li>vi /etc/hosts</li></ol><div class="language-jsx line-numbers-mode" data-ext="jsx" data-title="jsx"><pre class="language-jsx"><code><span class="token number">172.22</span><span class="token number">.181</span><span class="token number">.192</span> k8s<span class="token operator">-</span>master01
<span class="token number">172.22</span><span class="token number">.181</span><span class="token number">.194</span> k8s<span class="token operator">-</span>master02
<span class="token number">172.22</span><span class="token number">.181</span><span class="token number">.196</span> k8s<span class="token operator">-</span>master03
<span class="token number">172.22</span><span class="token number">.181</span><span class="token number">.190</span> k8s<span class="token operator">-</span>node01
<span class="token number">172.22</span><span class="token number">.181</span><span class="token number">.189</span> k8s<span class="token operator">-</span>node02
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li><code>export APISERVER_NAME=apiserver.lb</code></li><li><code>export APISERVER_IP=172.22.181.197</code></li><li><code>export POD_SUBNET=10.100.0.1/16</code></li><li><code>echo &quot;\${APISERVER_IP} \${APISERVER_NAME}&quot; &gt;&gt; /etc/hosts</code></li></ol><h3 id="安装前检查-所有节点" tabindex="-1"><a class="header-anchor" href="#安装前检查-所有节点"><span>安装前检查（所有节点）</span></a></h3><ol><li>任意节点 centos 版本为 7.6 或 7.7</li><li>任意节点 CPU 内核数量大于等于 2，且内存大于等于 4G</li><li>任意节点 hostname 不是 localhost，且不包含下划线、小数点、大写字母</li><li>任意节点都有固定的内网 IP 地址</li><li>任意节点上 Kubelet使用的 IP 地址 可互通（无需 NAT 映射即可相互访问），且没有防火墙、安全组隔离</li><li>任意节点不会直接使用 docker run 或 docker-compose 运行容器</li></ol>`,6),f={id:"安装负载均衡-apiserver-lb",tabindex:"-1"},y={class:"header-anchor",href:"#安装负载均衡-apiserver-lb"},_={href:"http://apiserver.lb",target:"_blank",rel:"noopener noreferrer"},x=l('<ol><li><code>yum install haproxy</code></li><li><code>vi /etc/haproxy/haproxy.cfg</code></li><li><code>修改配置文件，修改结果见附件haproxy.cfg</code></li><li><code>systemctl restart haproxy &amp;&amp; systemctl enable haproxy</code></li></ol><h3 id="安装-docker-kubelet-所有master、node节点" tabindex="-1"><a class="header-anchor" href="#安装-docker-kubelet-所有master、node节点"><span>安装 docker / kubelet（所有master、node节点）</span></a></h3><ol><li>上传install_kubelet.sh文件到用户目录（文件见附件）</li><li>./install_kubelet.sh</li></ol><h3 id="初始化第一个master节点-k8s-master01" tabindex="-1"><a class="header-anchor" href="#初始化第一个master节点-k8s-master01"><span>初始化第一个master节点（K8s-master01）</span></a></h3>',4),E=n("li",null,"export POD_SUBNET=10.100.0.1/16",-1),w=n("li",null,"上传init_master.sh文件到用户目录（文件见附件）",-1),A={href:"http://master.sh",target:"_blank",rel:"noopener noreferrer"},q=n("li",null,"执行结果",-1),M={href:"https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4749b708-6f7b-4294-af6b-42fcf85f6317/image1.png",target:"_blank",rel:"noopener noreferrer"},S=l('<ol><li>执行红框部分。</li><li>复制绿框部分与黄框部分。</li><li>查看pod运行状态</li></ol><blockquote><p>watch kubectl get pod -n kube-system -o wide</p></blockquote><ol><li>查看节点初始化结果</li></ol><blockquote><p>kubectl get nodes</p></blockquote><ol><li>请等到所有容器组（9个）全部处于 Running 状态，才进行下一步</li></ol><h3 id="初始化第二、三个master节点-k8s-master02、k8s-master03" tabindex="-1"><a class="header-anchor" href="#初始化第二、三个master节点-k8s-master02、k8s-master03"><span>初始化第二、三个master节点（K8s-master02、K8s-master03）</span></a></h3><ol><li>执行绿框复制内容。</li><li>检查初始化结果</li></ol><blockquote><p>kubectl get nodes</p></blockquote><h3 id="初始化-worker节点-k8s-node01、k8s-node02" tabindex="-1"><a class="header-anchor" href="#初始化-worker节点-k8s-node01、k8s-node02"><span>初始化 worker节点（K8s-node01、K8s-node02）</span></a></h3><ol><li>执行黄框复制内容。</li><li>检查初始化结果</li></ol><blockquote><p>kubectl get nodes</p></blockquote><h3 id="移除worker节点" tabindex="-1"><a class="header-anchor" href="#移除worker节点"><span>移除worker节点</span></a></h3><ol><li>kubeadm reset</li><li>kubectl delete node k8s-nodexx（节点名称）</li></ol><h3 id="安装kubernetes-dashboard-k8s-master01" tabindex="-1"><a class="header-anchor" href="#安装kubernetes-dashboard-k8s-master01"><span>安装Kubernetes Dashboard（K8s-master01）</span></a></h3><ol><li>执行以下命令安装</li></ol>',15),B={href:"https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0-beta5/aio/deploy/recommended.yaml",target:"_blank",rel:"noopener noreferrer"},D=l("<ol><li>上传auth.yaml到用户目录（文件见附件）</li><li>执行以下命令创建ServiceAccount 和 ClusterRoleBinding</li></ol><blockquote><p>kubectl apply -f ./auth.yaml</p></blockquote><ol><li><p>生成证书</p><ol><li>grep &#39;client-certificate-data&#39; /etc/kubernetes/admin.conf | head -n 1 | awk &#39;{print $2}&#39; | base64 -d &gt;&gt; kubecfg.crt</li><li>grep &#39;client-key-data&#39; /etc/kubernetes/admin.conf | head -n 1 | awk &#39;{print $2}&#39; | base64 -d &gt;&gt; kubecfg.key</li><li>openssl pkcs12 -export -clcerts -inkey kubecfg.key -in kubecfg.crt -out kubecfg.p12 -name &quot;kubernetes-client&quot;</li></ol></li><li><p>将kubecfg.p12证书下载到本地</p></li><li><p>获取token</p></li></ol><blockquote><p>kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | grep admin-user | awk &#39;{print $1}&#39;)</p></blockquote>",4),N=n("li",null,"将证书导入chrome浏览器",-1),j={href:"https://172.22.181.192:6443/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/#/login",target:"_blank",rel:"noopener noreferrer"},F=n("li",null,"输入token登录。",-1),R=l(`<h3 id="问题排查" tabindex="-1"><a class="header-anchor" href="#问题排查"><span>问题排查</span></a></h3><ol><li>Calico镜像无法拉取，可手工拉取</li></ol><blockquote><p>docker pull calico/kube-controllers:v3.9.2</p></blockquote><ol><li>节点无法正常启动，可查看日志信息进行排查</li></ol><blockquote><p>journalctl -f -u kubelet</p></blockquote><h3 id="附件" tabindex="-1"><a class="header-anchor" href="#附件"><span>附件</span></a></h3><p>auth.yaml</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> admin<span class="token punctuation">-</span>user
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> admin<span class="token punctuation">-</span>user
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
  <span class="token key atrule">name</span><span class="token punctuation">:</span> cluster<span class="token punctuation">-</span>admin
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
  <span class="token key atrule">name</span><span class="token punctuation">:</span> admin<span class="token punctuation">-</span>user
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>dashboard
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>haproxy.cfg</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>global
 
    log         <span class="token number">127.0</span>.0.1 local2
 
    <span class="token function">chroot</span>      /var/lib/haproxy
    pidfile     /var/run/haproxy.pid
    maxconn     <span class="token number">4000</span>
    user        haproxy
    group       haproxy
    daemon
 
    <span class="token comment"># turn on stats unix socket</span>
    stats socket /var/lib/haproxy/stats
 
defaults
    mode                    tcp           <span class="token comment"># 修改默认为四层代理</span>
    log                     global
    option                  httplog
    option                  dontlognull
    option http-server-close
    option forwardfor       except <span class="token number">127.0</span>.0.0/8
    option                  redispatch
    retries                 <span class="token number">3</span>
    <span class="token function">timeout</span> http-request    10s
    <span class="token function">timeout</span> queue           1m
    <span class="token function">timeout</span> connect         10s
    <span class="token function">timeout</span> client          1m
    <span class="token function">timeout</span> server          1m
    <span class="token function">timeout</span> http-keep-alive 10s
    <span class="token function">timeout</span> check           10s
    maxconn                 <span class="token number">3000</span>
 
frontend  main <span class="token number">172.22</span>.181.197:6443
    acl url_static       path_beg       <span class="token parameter variable">-i</span> /static /images /javascript /stylesheets
    acl url_static       path_end       <span class="token parameter variable">-i</span> .jpg .gif .png .css .js
 
    default_backend             k8s-master
 
backend k8s-master
    mode        tcp             <span class="token comment"># 修改为tcp</span>
    balance     roundrobin
    server  k8s-master01  <span class="token number">172.22</span>.181.192:6443 check     <span class="token comment"># 三个master主机</span>
    server  k8s-master02  <span class="token number">172.22</span>.181.194:6443 check
    server  k8s-master03  <span class="token number">172.22</span>.181.196:6443 check
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>init_master.sh</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token comment"># 只在 master 节点执行</span>

<span class="token comment"># 脚本出错时终止执行</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">\${<span class="token operator">#</span>POD_SUBNET}</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token variable">\${<span class="token operator">#</span>APISERVER_NAME}</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;<span class="token entity" title="\\033">\\033</span>[31;1m请确保您已经设置了环境变量 POD_SUBNET 和 APISERVER_NAME <span class="token entity" title="\\033">\\033</span>[0m&quot;</span>
  <span class="token builtin class-name">echo</span> 当前POD_SUBNET<span class="token operator">=</span><span class="token variable">$POD_SUBNET</span>
  <span class="token builtin class-name">echo</span> 当前APISERVER_NAME<span class="token operator">=</span><span class="token variable">$APISERVER_NAME</span>
  <span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token keyword">fi</span>

<span class="token comment"># 查看完整配置选项 https://godoc.org/k8s.io/kubernetes/cmd/kubeadm/app/apis/kubeadm/v1beta2</span>
<span class="token function">rm</span> <span class="token parameter variable">-f</span> ./kubeadm-config.yaml
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;</span> ./kubeadm-config.yaml</span>
apiVersion: kubeadm.k8s.io/v1beta2
kind: ClusterConfiguration
kubernetesVersion: v1.16.2
imageRepository: registry.cn-hangzhou.aliyuncs.com/google_containers
controlPlaneEndpoint: &quot;<span class="token variable">\${APISERVER_NAME}</span>:6443&quot;
networking:
  serviceSubnet: &quot;10.96.0.0/16&quot;
  podSubnet: &quot;<span class="token variable">\${POD_SUBNET}</span>&quot;
  dnsDomain: &quot;cluster.local&quot;
EOF</span>

<span class="token comment"># kubeadm init</span>
<span class="token comment"># 根据您服务器网速的情况，您需要等候 3 - 10 分钟</span>
kubeadm init <span class="token parameter variable">--config</span><span class="token operator">=</span>kubeadm-config.yaml --upload-certs

<span class="token comment"># 配置 kubectl</span>
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /root/.kube/
<span class="token function">mkdir</span> /root/.kube/
<span class="token function">cp</span> <span class="token parameter variable">-i</span> /etc/kubernetes/admin.conf /root/.kube/config

<span class="token comment"># 安装 calico 网络插件</span>
<span class="token comment"># 参考文档 https://docs.projectcalico.org/v3.9/getting-started/kubernetes/</span>
<span class="token function">rm</span> <span class="token parameter variable">-f</span> calico-3.9.2.yaml
<span class="token function">wget</span> https://kuboard.cn/install-script/calico/calico-3.9.2.yaml
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s#192\\.168\\.0\\.0/16#<span class="token variable">\${POD_SUBNET}</span>#&quot;</span> calico-3.9.2.yaml
kubectl apply <span class="token parameter variable">-f</span> calico-3.9.2.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>install_kubelet.sh</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token comment"># 在 master 节点和 worker 节点都要执行</span>

<span class="token comment"># 安装 docker</span>
<span class="token comment"># 参考文档如下</span>
<span class="token comment"># https://docs.docker.com/install/linux/docker-ce/centos/ </span>
<span class="token comment"># https://docs.docker.com/install/linux/linux-postinstall/</span>

<span class="token comment"># 卸载旧版本</span>
yum remove <span class="token parameter variable">-y</span> <span class="token function">docker</span> <span class="token punctuation">\\</span>
docker-client <span class="token punctuation">\\</span>
docker-client-latest <span class="token punctuation">\\</span>
docker-common <span class="token punctuation">\\</span>
docker-latest <span class="token punctuation">\\</span>
docker-latest-logrotate <span class="token punctuation">\\</span>
docker-logrotate <span class="token punctuation">\\</span>
docker-selinux <span class="token punctuation">\\</span>
docker-engine-selinux <span class="token punctuation">\\</span>
docker-engine

<span class="token comment"># 设置 yum repository</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils <span class="token punctuation">\\</span>
device-mapper-persistent-data <span class="token punctuation">\\</span>
lvm2
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

<span class="token comment"># 安装并启动 docker</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> docker-ce-18.09.7 docker-ce-cli-18.09.7 containerd.io
systemctl <span class="token builtin class-name">enable</span> <span class="token function">docker</span>
systemctl start <span class="token function">docker</span>

<span class="token comment"># 安装 nfs-utils</span>
<span class="token comment"># 必须先安装 nfs-utils 才能挂载 nfs 网络存储</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> nfs-utils
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token function">wget</span>

<span class="token comment"># 关闭 防火墙</span>
systemctl stop firewalld
systemctl disable firewalld

<span class="token comment"># 关闭 SeLinux</span>
setenforce <span class="token number">0</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s/SELINUX=enforcing/SELINUX=disabled/g&quot;</span> /etc/selinux/config

<span class="token comment"># 关闭 swap</span>
swapoff <span class="token parameter variable">-a</span>
<span class="token function">yes</span> <span class="token operator">|</span> <span class="token function">cp</span> /etc/fstab /etc/fstab_bak
<span class="token function">cat</span> /etc/fstab_bak <span class="token operator">|</span><span class="token function">grep</span> <span class="token parameter variable">-v</span> swap <span class="token operator">&gt;</span> /etc/fstab

<span class="token comment"># 修改 /etc/sysctl.conf</span>
<span class="token comment"># 如果有配置，则修改</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s#^net.ipv4.ip_forward.*#net.ipv4.ip_forward=1#g&quot;</span>  /etc/sysctl.conf
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s#^net.bridge.bridge-nf-call-ip6tables.*#net.bridge.bridge-nf-call-ip6tables=1#g&quot;</span>  /etc/sysctl.conf
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s#^net.bridge.bridge-nf-call-iptables.*#net.bridge.bridge-nf-call-iptables=1#g&quot;</span>  /etc/sysctl.conf
<span class="token comment"># 可能没有，追加</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;net.ipv4.ip_forward = 1&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/sysctl.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;net.bridge.bridge-nf-call-ip6tables = 1&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/sysctl.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;net.bridge.bridge-nf-call-iptables = 1&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/sysctl.conf
<span class="token comment"># 执行命令以应用</span>
<span class="token function">sysctl</span> <span class="token parameter variable">-p</span>

<span class="token comment"># 配置K8S的yum源</span>
<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">&gt;</span> /etc/yum.repos.d/kubernetes.repo</span>
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
       http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF</span>

<span class="token comment"># 卸载旧版本</span>
yum remove <span class="token parameter variable">-y</span> kubelet kubeadm kubectl

<span class="token comment"># 安装kubelet、kubeadm、kubectl</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> kubelet-1.16.2 kubeadm-1.16.2 kubectl-1.16.2

<span class="token comment"># 修改docker Cgroup Driver为systemd</span>
<span class="token comment"># # 将/usr/lib/systemd/system/docker.service文件中的这一行 ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock</span>
<span class="token comment"># # 修改为 ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock --exec-opt native.cgroupdriver=systemd</span>
<span class="token comment"># 如果不修改，在添加 worker 节点时可能会碰到如下错误</span>
<span class="token comment"># [WARNING IsDockerSystemdCheck]: detected &quot;cgroupfs&quot; as the Docker cgroup driver. The recommended driver is &quot;systemd&quot;. </span>
<span class="token comment"># Please follow the guide at https://kubernetes.io/docs/setup/cri/</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">&quot;s#^ExecStart=/usr/bin/dockerd.*#ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock --exec-opt native.cgroupdriver=systemd#g&quot;</span> /usr/lib/systemd/system/docker.service

<span class="token comment"># 设置 docker 镜像，提高 docker 镜像下载速度和稳定性</span>
<span class="token comment"># 如果您访问 https://hub.docker.io 速度非常稳定，亦可以跳过这个步骤</span>
<span class="token function">curl</span> <span class="token parameter variable">-sSL</span> https://get.daocloud.io/daotools/set_mirror.sh <span class="token operator">|</span> <span class="token function">sh</span> <span class="token parameter variable">-s</span> http://f1361db2.m.daocloud.io

<span class="token comment"># 重启 docker，并启动 kubelet</span>
systemctl daemon-reload
systemctl restart <span class="token function">docker</span>
systemctl <span class="token builtin class-name">enable</span> kubelet <span class="token operator">&amp;&amp;</span> systemctl start kubelet

<span class="token function">docker</span> version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14);function G(K,P){const e=i("ExternalLinkIcon");return o(),c("div",null,[p,n("p",null,[n("a",d,[s("Sealos参数"),a(e)])]),u,n("p",null,[n("a",m,[s(" Sealos安装应用"),a(e)])]),v,n("p",null,[n("a",b,[s("快速开始 | sealos | kubernetes安装"),a(e)])]),k,n("p",null,[n("a",h,[s("服务器规划"),a(e)])]),g,n("h3",f,[n("a",y,[n("span",null,[s("安装负载均衡（"),n("a",_,[s("apiserver.lb"),a(e)]),s("）")])])]),x,n("ol",null,[E,w,n("li",null,[s("./install_ "),n("a",A,[s("master.sh"),a(e)])]),q]),n("p",null,[s("[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-krosRmSJ-1598678647504)("),n("a",M,[s("https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4749b708-6f7b-4294-af6b-42fcf85f6317/image1.png"),a(e)]),s(")]")]),S,n("blockquote",null,[n("p",null,[s("kubectl apply -f "),n("a",B,[s("https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0-beta5/aio/deploy/recommended.yaml"),a(e)])])]),D,n("ol",null,[N,n("li",null,[s("访问"),n("a",j,[s("https://172.22.181.192:6443/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/#/login"),a(e)])]),F]),R])}const V=t(r,[["render",G],["__file","Kubernetes高可用集群安装.html.vue"]]),C=JSON.parse('{"path":"/%E8%BF%90%E7%BB%B4/kubernetes/Kubernetes%E9%AB%98%E5%8F%AF%E7%94%A8%E9%9B%86%E7%BE%A4%E5%AE%89%E8%A3%85.html","title":"Kuberentes 高可用集群安装","lang":"zh-CN","frontmatter":{"title":"Kuberentes 高可用集群安装","order":102,"description":"Sealos安装集群 下载Sealos 下载Kube安装包 执行初始化命令 Sealos参数 添加Master 删除Master 添加Node 删除Node 清理集群 安装应用 Sealos安装应用 参考 快速开始 | sealos | kubernetes安装 注意 若安装过程中出错，则可执行清楚集群命令或者删除集群的所有主机命令进行重置，同时重启一...","head":[["meta",{"property":"og:url","content":"https://961099916.github.io/%E8%BF%90%E7%BB%B4/kubernetes/Kubernetes%E9%AB%98%E5%8F%AF%E7%94%A8%E9%9B%86%E7%BE%A4%E5%AE%89%E8%A3%85.html"}],["meta",{"property":"og:site_name","content":"九夏的博客"}],["meta",{"property":"og:title","content":"Kuberentes 高可用集群安装"}],["meta",{"property":"og:description","content":"Sealos安装集群 下载Sealos 下载Kube安装包 执行初始化命令 Sealos参数 添加Master 删除Master 添加Node 删除Node 清理集群 安装应用 Sealos安装应用 参考 快速开始 | sealos | kubernetes安装 注意 若安装过程中出错，则可执行清楚集群命令或者删除集群的所有主机命令进行重置，同时重启一..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://imgconvert.csdnimg.cn/aHR0cDovL25vdGVib29rLnpoYW5namlhaGFvLnNpdGUvMjAyMDA1MjcxMDA4MDcucG5n?x-oss-process=image/format,png#pic_center#alt=%E5%9C%A8%E8%BF%99%E9%87%8C%E6%8F%92%E5%85%A5%E5%9B%BE%E7%89%87%E6%8F%8F%E8%BF%B0"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-21T16:16:31.000Z"}],["meta",{"property":"article:author","content":"九夏"}],["meta",{"property":"article:modified_time","content":"2024-06-21T16:16:31.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Kuberentes 高可用集群安装\\",\\"image\\":[\\"https://imgconvert.csdnimg.cn/aHR0cDovL25vdGVib29rLnpoYW5namlhaGFvLnNpdGUvMjAyMDA1MjcxMDA4MDcucG5n?x-oss-process=image/format,png#pic_center#alt=%E5%9C%A8%E8%BF%99%E9%87%8C%E6%8F%92%E5%85%A5%E5%9B%BE%E7%89%87%E6%8F%8F%E8%BF%B0\\",\\"https://imgconvert.csdnimg.cn/aHR0cDovL25vdGVib29rLnpoYW5namlhaGFvLnNpdGUvMjAyMDA1MjcxMDEwMDgucG5n?x-oss-process=image/format,png#pic_center#alt=%E5%9C%A8%E8%BF%99%E9%87%8C%E6%8F%92%E5%85%A5%E5%9B%BE%E7%89%87%E6%8F%8F%E8%BF%B0\\",\\"https://imgconvert.csdnimg.cn/aHR0cDovL25vdGVib29rLnpoYW5namlhaGFvLnNpdGUvMjAyMDA1MjcxMDExMjAucG5n?x-oss-process=image/format,png#pic_center#alt=%E5%9C%A8%E8%BF%99%E9%87%8C%E6%8F%92%E5%85%A5%E5%9B%BE%E7%89%87%E6%8F%8F%E8%BF%B0\\"],\\"dateModified\\":\\"2024-06-21T16:16:31.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"九夏\\",\\"url\\":\\"https://blog.jiuxialb.top/\\"}]}"]]},"headers":[{"level":2,"title":"Sealos安装集群","slug":"sealos安装集群","link":"#sealos安装集群","children":[{"level":3,"title":"下载Sealos","slug":"下载sealos","link":"#下载sealos","children":[]},{"level":3,"title":"下载Kube安装包","slug":"下载kube安装包","link":"#下载kube安装包","children":[]},{"level":3,"title":"添加Master","slug":"添加master","link":"#添加master","children":[]},{"level":3,"title":"删除Master","slug":"删除master","link":"#删除master","children":[]},{"level":3,"title":"添加Node","slug":"添加node","link":"#添加node","children":[]},{"level":3,"title":"删除Node","slug":"删除node","link":"#删除node","children":[]},{"level":3,"title":"清理集群","slug":"清理集群","link":"#清理集群","children":[]},{"level":3,"title":"安装应用","slug":"安装应用","link":"#安装应用","children":[]},{"level":3,"title":"参考","slug":"参考","link":"#参考","children":[]},{"level":3,"title":"注意","slug":"注意","link":"#注意","children":[]}]},{"level":2,"title":"Rancher安装集群","slug":"rancher安装集群","link":"#rancher安装集群","children":[{"level":3,"title":"1.创建集群","slug":"_1-创建集群","link":"#_1-创建集群","children":[]},{"level":3,"title":"2.安装 master","slug":"_2-安装-master","link":"#_2-安装-master","children":[]},{"level":3,"title":"3.安装 node","slug":"_3-安装-node","link":"#_3-安装-node","children":[]},{"level":3,"title":"4.笔记本合盖","slug":"_4-笔记本合盖","link":"#_4-笔记本合盖","children":[]},{"level":3,"title":"5.主机名","slug":"_5-主机名","link":"#_5-主机名","children":[]}]},{"level":2,"title":"脚本安装","slug":"脚本安装","link":"#脚本安装","children":[{"level":3,"title":"服务器规划","slug":"服务器规划","link":"#服务器规划","children":[]},{"level":3,"title":"修改hostname（所有节点）","slug":"修改hostname-所有节点","link":"#修改hostname-所有节点","children":[]},{"level":3,"title":"安装前检查（所有节点）","slug":"安装前检查-所有节点","link":"#安装前检查-所有节点","children":[]},{"level":3,"title":"安装负载均衡（apiserver.lb）","slug":"安装负载均衡-apiserver-lb","link":"#安装负载均衡-apiserver-lb","children":[]},{"level":3,"title":"安装 docker / kubelet（所有master、node节点）","slug":"安装-docker-kubelet-所有master、node节点","link":"#安装-docker-kubelet-所有master、node节点","children":[]},{"level":3,"title":"初始化第一个master节点（K8s-master01）","slug":"初始化第一个master节点-k8s-master01","link":"#初始化第一个master节点-k8s-master01","children":[]},{"level":3,"title":"初始化第二、三个master节点（K8s-master02、K8s-master03）","slug":"初始化第二、三个master节点-k8s-master02、k8s-master03","link":"#初始化第二、三个master节点-k8s-master02、k8s-master03","children":[]},{"level":3,"title":"初始化 worker节点（K8s-node01、K8s-node02）","slug":"初始化-worker节点-k8s-node01、k8s-node02","link":"#初始化-worker节点-k8s-node01、k8s-node02","children":[]},{"level":3,"title":"移除worker节点","slug":"移除worker节点","link":"#移除worker节点","children":[]},{"level":3,"title":"安装Kubernetes Dashboard（K8s-master01）","slug":"安装kubernetes-dashboard-k8s-master01","link":"#安装kubernetes-dashboard-k8s-master01","children":[]},{"level":3,"title":"问题排查","slug":"问题排查","link":"#问题排查","children":[]},{"level":3,"title":"附件","slug":"附件","link":"#附件","children":[]}]}],"git":{"createdTime":1718452146000,"updatedTime":1718986591000,"contributors":[{"name":"zhangjiahao","email":"961099916@qq.com","commits":1}]},"readingTime":{"minutes":7.51,"words":2254},"filePathRelative":"运维/kubernetes/Kubernetes高可用集群安装.md","localizedDate":"2024年6月15日","excerpt":"<h2>Sealos安装集群</h2>\\n<h3>下载Sealos</h3>\\n<div class=\\"language-bash\\" data-ext=\\"sh\\" data-title=\\"sh\\"><pre class=\\"language-bash\\"><code><span class=\\"token comment\\"># 推荐下载最新版，会修复一些BUG,下载并安装sealos, sealos是个golang的二进制工具，直接下载拷贝到bin目录即可, release页面也可下载</span>\\n<span class=\\"token function\\">wget</span> <span class=\\"token parameter variable\\">-c</span> https://sealyun.oss-cn-beijing.aliyuncs.com/latest/sealos <span class=\\"token operator\\">&amp;&amp;</span> <span class=\\"token punctuation\\">\\\\</span>\\n    <span class=\\"token function\\">chmod</span> +x sealos <span class=\\"token operator\\">&amp;&amp;</span> <span class=\\"token function\\">mv</span> sealos /usr/bin\\n</code></pre></div>","autoDesc":true}');export{V as comp,C as data};
