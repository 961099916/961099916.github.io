---
title: Unix IO模型
order: 3
---

一个输入操作通常包括两个阶段:

1. 等待数据准备好
2. 从内核向进程复制数据

对于一个套接字上的输入操作，第一步通常涉及等待数据从网络中到达。当所等待分组到达时，它被复制到内核中的某个缓冲区。第二步就是把数据从内核缓冲区复制到应用进程缓冲区。

Unix 有以下五种 IO 模型：

- 阻塞式 I/O (BIO)
- 非阻塞式 I/O (NIO)
- I/O复用 (select和 poll)
- 信号驱动式 I/O (SIGIO)
- 异步 I/O (AIO)

## 阻塞式 I/O (BIO)

进程在获取数据时，若内核无准备好数据，则会阻塞进程，等待内核把数据准备好返回给线程，线程才会进行下一步的响应。IO 数据未准备好时会阻塞进程所以叫做阻塞式 IO。

![](https://zhangjiahao-blog.oss-cn-beijing.aliyuncs.com/picgo/202305150957412.png#id=qqDbE&originHeight=316&originWidth=611&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

上图流程如下：

1. 应用进程进行系统调用(recvfrom)向内核索要数据
2. 内核若数据报未准备好则进行阻塞至数据报准备完毕
3. 数据报准备完毕则复制到用户空间
4. 返回给应用线程

## 非阻塞式 I/O (NIO)

应用进程执行系统调用之后，内核返回一个错误码。应用进程可以继续执行，但是需要不断的执行系统调用来获知 I/O 是否完成，这种方式称为轮询(polling)。

![](https://zhangjiahao-blog.oss-cn-beijing.aliyuncs.com/picgo/202305151029704.png#id=xhQMe&originHeight=408&originWidth=707&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

上图流程如下：

1. 应用进程进行系统调用(recvfrom)向内核索要数据
2. 内核若数据报未准备好则直接返回错误标志`EWOULDBLOCK`
3. 应用程序可一直系统调用(recvfrom)向内核索要数据，知道系统准备好数据
4. 此时应用进程则进行获取数据

## I/O复用 (select和 poll)

并发情况下服务器很可能一瞬间会收到几十上百万的请求，这种情况下应用就需要创建几十上百万的线程去读取数据，同时又因为应用线程是不知道什么时候会有数据读取，为了保证消息能及时读取到，那么这些线程自己必须不断的向内核发送recvfrom 请求来读取数据；

那么问题来了，这么多的线程不断调用recvfrom 请求数据，先不说服务器能不能扛得住这么多线程，就算扛得住那么很明显这种方式是不是太浪费资源了，线程是我们操作系统的宝贵资源，大量的线程用来去读取数据了，那么就意味着能做其它事情的线程就会少。

所以，有人就提出了一个思路，能不能提供一种方式，可以由一个线程监控多个网络请求（`我们后面将称为fd文件描述符，linux系统把所有网络请求以一个fd来标识）`，这样就可以只需要一个或几个线程就可以完成数据状态询问的操作，当有数据准备就绪之后再分配对应的线程去读取数据，这么做就可以节省出大量的线程资源出来，这个就是IO复用模型的思路。

![](https://zhangjiahao-blog.oss-cn-beijing.aliyuncs.com/picgo/202305151046526.png#id=EQy8n&originHeight=523&originWidth=815&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

上图流程如下：

1. 应用进程进行系统调用(select)向内核索要数据
2. 内核若数据报未准备则进行阻塞，直到准备完成返回可读
3. 应用程序得到可读后，知道系统准备好数据进行系统调用(recvfrom)向内核索要数据
4. 此时应用进程则进行获取数据

## 信号驱动式 I/O (SIGIO)

复用IO模型解决了一个线程可以监控多个fd的问题，但是select是采用轮询的方式来监控多个fd的，通过不断的轮询fd的可读状态来知道是否就可读的数据，而无脑的轮询就显得有点暴力，因为大部分情况下的轮询都是无效的，所以有人就想，能不能不要我总是去问你是否数据准备就绪，能不能我发出请求后等你数据准备好了就通知我，所以就衍生了信号驱动IO模型。

![](https://zhangjiahao-blog.oss-cn-beijing.aliyuncs.com/picgo/202305151049015.png#id=qTtlP&originHeight=406&originWidth=728&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

上图流程如下：

1. 应用进程使用 sigaction 系统调用，内核立即返回
2. 内核进行数据准备，若准备完成则向应用进程发送 SIGIO 信号
3. 应用进程收到之后在信号处理程序中调用 recvfrom 将数据从内核复制到应用进程中。
4. 此时应用进程则进行获取数据

## 异步 I/O (AIO)

应用只需要向内核发送一个read 请求,告诉内核它要读取数据后即刻返回；内核收到请求后会建立一个信号联系，当数据准备就绪，`内核会主动把数据从内核复制到用户空间`，等所有操作都完成之后，内核会发起一个通知告诉应用，我们称这种一劳永逸的模式为`异步IO模型`。

![](https://zhangjiahao-blog.oss-cn-beijing.aliyuncs.com/picgo/202305151108025.png#id=YMAus&originHeight=407&originWidth=718&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

上图流程如下：

1. 进行 aio_read 系统调用会立即返回，应用进程继续执行，不会被阻塞。
2. 内核进行数据准备，若准备完成则向应用进程发送 SIGIO 信号
3. 此时应用进程则进行获取数据

## 比较

![](https://zhangjiahao-blog.oss-cn-beijing.aliyuncs.com/picgo/202305151130177.png#id=heLee&originHeight=427&originWidth=761&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

## 参考

1. [浅谈5种IO模型——阻塞式IO、非阻塞式IO、信号驱动IO、多路复用IO及异步IO](https://blog.csdn.net/JMW1407/article/details/107899340)
2. [IO 模型 - Unix IO 模型](3a2bbe3fc36fb8302e70a66d337e8fb2)
