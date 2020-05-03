# Jenkins 自动化部署

Jenkis 自动化部署大致分为一下步骤：

> 1. 安装 Jenkins
> 2. 登录
> 3. 设置环境
> 4. 创建流水线
> 5. 编写简单的脚本

本人只是搭建完整的部署，进行了简单的测试，并未进行长时间的使用。本人此时准备使用 Docker 进行部署 Jenkins。准备逐渐演进为完全容器化部署。[安装设置](https://www.cnblogs.com/xiao987334176/p/11433636.html)

## 1.安装 Jenkins

```shell
wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
sudo apt-get install jenkins
```

此时 jenkins 的工作目录在`/var/lib/jenkins`

## 2.登录

访问`8080`端口即可出现登录界面，有时会出现正在加载中（个人配置问题）,然后可在`/var/lib/jenkins/secrets/initialAdminPassowrd`中查看到密码。

## 3. 设置环境

- 可选择安装推荐插件，安装 maven 的`Maven Integration`插件
- 在全局设置中设置 jdk、maven、git、docker 环境

## 4.创建流水线

- 可以选择使用的版本管理工具，设置凭证
- 在 post steps 中添加执行的脚本，该脚本执行的时间时 mavn install 之后，根目录为项目的根目录下

## 5.编写脚本

可在 Post Steps 中编写即可，可实现 Docker 镜像的创建，运行以及 push

## 总结

若部署权限不足，则可[修改 jenkins 的权限](https://blog.51cto.com/haoyonghui/2165941)
