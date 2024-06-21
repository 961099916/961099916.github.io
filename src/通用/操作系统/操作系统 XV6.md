---
title: 操作系统XV6
order: 4
---
## 1. 介绍和举例

### 1.1 课程内容简介

- 课程内容简介 
   - 理解操作系统的设计和实现
   - 2.获得实际动手经验
- 操作系统的目标 
   - 抽象硬件
   - 多个应用程序之间共用硬件资源
   - 隔离性，不同的活动之间不能相互影响
   - 共享性，不同活动之间要能数据共享
   - 权限管理
   - 可以通过硬件提高应用程序的高性能
   - 支持大量的不同的应用程序

### 1.2 操作系统结构

- 最下层 
   - CPU、内存、磁盘、网卡等
- 最上层 
   - vi、cc、cli、shell
- 中间层 
   - fs（文件系统）、AccessControl（权限控制）等

### 1.3 挑战和快乐

- 一些矛盾的要求 
   - 高效又要易用
   - 强大的服务又要简单的接口
   - 既要给应用程序尽可能多的灵活性，又要在某种程度上限制其灵活性
   - 大量的特性和大量的服务，需要大量的思考
   - 需要满足广泛的使用场景

### 1.4 课程资源

### 1.5+ 函数

- int read(int fd, char *buf, int n) 
   - 将n 个字节读入buf；返回读取的字节数；如果文件结束，返回0
- int write(int fd, char *buf, int n) 
   - 从buf 写n 个字节到文件描述符fd; 返回n
- int exit(int status) 
   - 终止当前进程，并将状态报告给wait()函数。无返回
- int open(char *file, int flags) 
   - 打开一个文件；flags表示read/write；返回一个fd（文件描述符）
- shell
- int fork() 
   - 创建一个进程，返回子进程的PID
- int exec(char _file, char _argv[]) 
   - 加载一个文件并使用参数执行它; 只有在出错时才返回
- int wait(int *status) 
   - 等待一个子进程退出; 将退出状态存入*status; 返回子进程PID。
- int kill(int pid) 
   - 终止对应PID的进程，返回0，或返回-1表示错误
- int getpid() 
   - 返回当前进程的PID
- int sleep(int n) 
   - 暂停n个时钟节拍
- char *sbrk(int n) 
   - 按n 字节增长进程的内存。返回新内存的开始
- int close(int fd) 
   - 释放打开的文件fd
- int dup(int fd) 
   - 返回一个新的文件描述符，指向与fd 相同的文件
- int pipe(int p[]) 
   - 创建一个管道，把read/write文件描述符放在p[0]和p[1]中
- int chdir(char *dir) 
   - 改变当前的工作目录
- int mkdir(char *dir) 
   - 创建一个新目录
- int mknod(char *file, int, int) 
   - 创建一个设备文件
- int fstat(int fd, struct stat *st) 
   - 将打开文件fd的信息放入*st
- int stat(char _file, struct stat _st) 
   - 将指定名称的文件信息放入*st
- int link(char _file1, char _file2) 
   - 为文件file1创建另一个名称(file2)
- int unlink(char *file) 
   - 删除一个文件
- 注意 
   - xv6系统调用（除非另外声明，这些系统调用返回0表示无误，返回-1表示出错）
- I/O redirect

## 2. 操作系统架构和系统调用
