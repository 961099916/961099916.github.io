# Java 并发

## 线程基础

### 进程线程概念

- 进程是一个独立的运行环境，而线程是在进程中执行的一个任务。他们两个本质的区别是是否单独占有内存地址空间及其它系统资源（比如 I/O）：
- 进程单独占有一定的内存地址空间，所以进程间存在内存隔离，数据是分开的，数据共享复杂但是同步简单，各个进程之间互不干扰；而线程共享所属进程占有的内存地址空间和资源，数据共享简单，但是同步复杂。
- 进程单独占有一定的内存地址空间，一个进程出现问题不会影响其他进程，不影响主程序的稳定性，可靠性高；一个线程崩溃可能影响整个程序的稳定性，可靠性较低。
- 进程单独占有一定的内存地址空间，进程的创建和销毁不仅需要保存寄存器和栈信息，还需要资源的分配回收以及页调度，开销较大；线程只需要保存寄存器和栈信息，开销较小。
- 另外一个重要区别是，进程是操作系统进行资源分配的基本单位，而线程是操作系统进行调度的基本单位，即 CPU 分配时间的单位 。

### 线程状态和转化方法

![线程状态转化图](https://tva1.sinaimg.cn/large/008i3skNly1gsc0izeluhj30r20fojsv.jpg)

- NEW: 线程此时尚未启动，还未调用 Thread.start()
- RUNNABLE：当前线程正在运行中
- BLOCKED：处于 BLOCKED 状态的线程正等待锁的释放以进入同步区
- WAITING：等待状态。处于等待状态的线程变成 RUNNABLE 状态需要其他线程唤醒。
- TIMED_WAITING：超时等待状态。线程等待一个具体的时间，时间到后会被自动唤醒。
- TERMINATED：终止状态。此时线程已执行完毕。

### 锁和同步

#### 锁

synchronized 关键字来给一段代码或一个方法上锁。它同一时刻只能由一个线程执行。如果 synchronized 关键字在方法上，那临界区就是整个方法内部。而如果是使用 synchronized 代码块，那临界区就指的是代码块内部的区域。

#### 同步

- wait()
- notify()
- notifyAll()

### Java 多线程

#### Runnable 接口

#### Thread 类

#### Guava 异步

- ListenableFuture 实现线程回调功能

### 案例

#### AB 线程顺序执行各自任务

#### AB 交替执行各自任务

#### AB 交替执行同一个任务

## 线程进阶

### Java 线程池

#### ThreadPoolExecutor

#### newCachedThreadPool

#### newFixedThreadPool

#### newSingleThreadExecutor

#### newScheduledThreadPool

### 并发集合

#### 并发 Map

#### 并发 Queue

#### 并发 Set

### 通信工具类

### Fork/Join 框架

### Stream 并行计算原理
