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

可以通过检测进入某个状态的条件是否满足，从而决定是继续执行还是等待别的线程把前置条件准备充足。

- wait()：进入等待状态。
- notify()：随机叫醒一个正在等待的线程
- notifyAll()：叫醒所有正在等待的线程

### Java 多线程

#### Thread 类

```java
public
class Thread implements Runnable {

}
```

- 构造方法如下图：

  ![构造方法](https://tva1.sinaimg.cn/large/008i3skNly1gsc6ya3onfj30ka0aaahd.jpg)

  - g：线程组，指定这个线程是在哪个线程组下；
  - target：指定要执行的任务；
  - name：线程的名字，多个线程的名字是可以重复的；
  - acc：用于初始化私有变量 inheritedAccessControlContext。
  - inheritThreadLocals：可继承的 ThreadLocal

- Thread 类的几个常用的方法：

  - currentThread()：静态方法，返回对当前正在执行的线程对象的引用；
  - start()：开始执行线程的方法，java 虚拟机会调用线程内的 run()方法；
  - yield()：yield 在英语里有放弃的意思，同样，这里的 yield()指的是当前线程愿意让出对当前处理器的占用。这里需要注意的是，就算当前线程调用了 yield()方法，程序在调度的时候，也还有可能继续运行这个线程的
  - sleep()：静态方法，使当前线程睡眠一段时间；
  - join()：使当前线程等待另一个线程执行完毕之后再继续执行，内部调用的是 Object 类的 wait 方法实现的；

- Thread 类：Thread 是 Runnable 的实现类，可以通过继承 Thread 类实现线程

#### Runnable 接口

```java
@FunctionalInterface
public interface Runnable {
    public abstract void run();
}
```

- 通过实现`Runnable`接口的 run 方法，可以实现线程。

#### Thread 类与 Runnable 接口的比较

- 实现一个自定义的线程类，可以有继承 Thread 类或者实现 Runnable 接口这两种方式，两者之间的优缺点：
  - 由于 Java“单继承，多实现”的特性，Runnable 接口使用起来比 Thread 更灵活。
  - Runnable 接口出现更符合面向对象，将线程单独进行对象的封装。
  - Runnable 接口出现，降低了线程对象和线程任务的耦合性。
  - 如果使用线程时不需要使用 Thread 类的诸多方法，显然使用 Runnable 接口更为轻量。

#### Guava 异步

- ListenableFuture 实现线程回调功能

### 案例

#### AB 线程顺序执行各自任务

```java
/**
 * <p>
 * 测试 AB 线程优先执行完某一个线程再执行另一个线程
 * </p>
 *
 * @author zhangjiahao
 * @date 2021/7/10 21:59
 */
public class ThreadTestOne {

    private static final Object lock = new Object();

    static class ThreadTestOneA implements Runnable {
        @Override
        public void run() {
            synchronized (lock) {
                for (int i = 0; i < 5; i++) {
                    System.out.println("ThreadTestOneA:\t" + i);
                }
            }
        }
    }
    static class ThreadTestOneB implements Runnable {
        @Override
        public void run() {
            synchronized (lock) {
                for (int i = 0; i < 5; i++) {
                    System.out.println("ThreadTestOneB:\t" + i);
                }
            }
        }
    }

    public static void main(String[] args) {
        new Thread(new ThreadTestOneA()).start();
        new Thread(new ThreadTestOneB()).start();
    }
}
```

运行结果如下图:

![ThreadTestOne](https://tva1.sinaimg.cn/large/008i3skNly1gsc7effunkj30bu0bqmxs.jpg)

#### AB 交替执行各自任务

```java
/**
 * @author zhangjiahao
 * @date
 */
public class ThreadTestTwo {

    private static final Object LOCK = new Object();

    static class ThreadTestTwoA implements Runnable {

        @Override
        public void run() {
            synchronized (LOCK) {
                for (int i = 0; i < 5; i++) {
                    try {
                        System.out.println("ThreadTestTwoA:\t" + i);
                        LOCK.notifyAll();
                        LOCK.wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                LOCK.notifyAll();
            }
        }
    }

    static class ThreadTestTwoB implements Runnable {
        @Override
        public void run() {
            synchronized (LOCK) {
                for (int i = 0; i < 5; i++) {
                    try {
                        System.out.println("ThreadTestTwoB:\t" + i);
                        LOCK.notifyAll();
                        LOCK.wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }

    public static void main(String[] args) {
        new Thread(new ThreadTestTwoA()).start();
        new Thread(new ThreadTestTwoB()).start();
    }
}
```

注意：一定要先去叫醒别人再去等待，否则先进入等待就无法叫醒别人。

执行结果如下图：

![ThreadTestTwo](https://tva1.sinaimg.cn/large/008i3skNly1gsc7i8zchqj30cc0biq3o.jpg)

#### AB 交替执行同一个任务

```java
/**
 * <p>
 * </p>
 *
 * @author zhangjiahao
 * @date 2021/7/7 14:43
 */
public class ThreadTestThree {

    private static AtomicInteger signal = new AtomicInteger(0);

    static class ThreadTestThreeA implements Runnable {
        @Override
        public void run() {
            while (signal.get() < 5) {
                if (signal.get() % 2 == 0) {
                    System.out.println("ThreadTestThreeA:\t" + signal);
                    signal.incrementAndGet();
                }
            }
        }
    }

    static class ThreadTestThreeB implements Runnable {
        @Override
        public void run() {
            while (signal.get() < 5) {
                if (signal.get() % 2 == 1) {
                    System.out.println("ThreadTestThreeB:\t" + signal);
                    signal.incrementAndGet();
                }
            }
        }
    }

    public static void main(String[] args) {
        new Thread(new ThreadTestThreeA()).start();
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        new Thread(new ThreadTestThreeB()).start();
    }
}
```

注意：信号量的增加要做原子性，不能让其可以多个线程同时去操作。

执行结果如下图：

![ThreadTestThree](https://tva1.sinaimg.cn/large/008i3skNly1gsc7n484fqj30bc05qq2z.jpg)

## 线程进阶

### Java 线程池

线程的创建和销毁像数据库连接的创建和销毁一样，需要消耗系统资源，所以像数据库连接池一样采用线程池可以降低系统资源的消耗，主要的有点有以下几点：

- 创建/销毁线程需要消耗系统资源，线程池可以复用已创建的线程。
- 控制并发的数量。并发数量过多，可能会导致资源消耗过多，从而造成服务器崩溃。（主要原因）
- 可以对线程做统一管理。

#### ThreadPoolExecutor

```java
// 五个参数的构造函数
public ThreadPoolExecutor(int corePoolSize,
                          int maximumPoolSize,
                          long keepAliveTime,
                          TimeUnit unit,
                          BlockingQueue<Runnable> workQueue)

// 六个参数的构造函数-1
public ThreadPoolExecutor(int corePoolSize,
                          int maximumPoolSize,
                          long keepAliveTime,
                          TimeUnit unit,
                          BlockingQueue<Runnable> workQueue,
                          ThreadFactory threadFactory)

// 六个参数的构造函数-2
public ThreadPoolExecutor(int corePoolSize,
                          int maximumPoolSize,
                          long keepAliveTime,
                          TimeUnit unit,
                          BlockingQueue<Runnable> workQueue,
                          RejectedExecutionHandler handler)

// 七个参数的构造函数
public ThreadPoolExecutor(int corePoolSize,
                          int maximumPoolSize,
                          long keepAliveTime,
                          TimeUnit unit,
                          BlockingQueue<Runnable> workQueue,
                          ThreadFactory threadFactory,
                          RejectedExecutionHandler handler)
```

int corePoolSize：该线程池中核心线程数最大值

- 核心线程：线程池中有两类线程，核心线程和非核心线程。核心线程默认情况下会一直存在于线程池中，即使这个核心线程什么都不干（铁饭碗），而非核心线程如果长时间的闲置，就会被销毁（临时工）。

- int maximumPoolSize：该线程池中线程总数最大值 。
  > 该值等于核心线程数量 + 非核心线程数量。
- long keepAliveTime：非核心线程闲置超时时长。
  > 非核心线程如果处于闲置状态超过该值，就会被销毁。如果设置 allowCoreThreadTimeOut(true)，则会也作用于核心线程。
- TimeUnit unit：keepAliveTime 的单位。
  > NANOSECONDS ： 1 微毫秒 = 1 微秒 / 1000 MICROSECONDS ： 1 微秒 = 1 毫秒 / 1000 MILLISECONDS ： 1 毫秒 = 1 秒 /1000 SECONDS ： 秒 MINUTES ： 分 HOURS ： 小时 DAYS ： 天
- BlockingQueue workQueue：阻塞队列，维护着等待执行的 Runnable 任务对象。常用的几个阻塞队列：
  - LinkedBlockingQueue: 链式阻塞队列，底层数据结构是链表，默认大小是 Integer.MAX_VALUE，也可以指定大小。
  - ArrayBlockingQueue:数组阻塞队列，底层数据结构是数组，需要指定队列的大小。
  - SynchronousQueue:同步队列，内部容量为 0，每个 put 操作必须等待一个 take 操作，反之亦然。
  - DelayQueue:延迟队列，该队列中的元素只有当其指定的延迟时间到了，才能够从队列中获取到该元素 。
- ThreadFactory threadFactory:创建线程的工厂 ，用于批量创建线程，统一在创建线程时设置一些参数，如是否守护线程、线程的优先级等。如果不指定，会新建一个默认的线程工厂。

```java
## 自定义线程工程
static class DefaultThreadFactory implements ThreadFactory {
    // 省略属性
    // 构造函数
    DefaultThreadFactory() {
        SecurityManager s = System.getSecurityManager();
        group = (s != null) ? s.getThreadGroup() :
        Thread.currentThread().getThreadGroup();
        namePrefix = "pool-" +
            poolNumber.getAndIncrement() +
            "-thread-";
    }

    // 省略
}
```

- RejectedExecutionHandler handler:拒绝处理策略，线程数量大于最大线程数就会采用拒绝处理策略，四种拒绝处理的策略为 :
  - ThreadPoolExecutor.AbortPolicy：默认拒绝处理策略，丢弃任务并抛 RejectedExecutionException 异常。
  - ThreadPoolExecutor.DiscardPolicy：丢弃新来的任务，但是不抛出异常。
    -ThreadPoolExecutor.DiscardOldestPolicy：丢弃队列头部（最旧的）的任务，然后重新尝试执行程序（如果再次失败，重复此过程）。
  - ThreadPoolExecutor.CallerRunsPolicy：由调用线程处理该任务。

```java

/**
 * <p>
 * 线程池测试
 * </p>
 *
 * @author zhangjiahao
 * @date 2021/7/10 22:35
 */
public class ThreadPoolTest {
    private static ArrayBlockingQueue<Runnable> arrayBlockingQueue = new ArrayBlockingQueue<Runnable>(5);
    private static ThreadPoolExecutor threadPoolExecutor = new ThreadPoolExecutor(1, 5, 0, TimeUnit.NANOSECONDS,
        arrayBlockingQueue, new MyThreadFactory(), new MyRejectedExecutionHandler());

    static class MyThreadFactory implements ThreadFactory {
        private static AtomicInteger atomicInteger = new AtomicInteger(0);

        @Override
        public Thread newThread(Runnable runnable) {
            return new Thread(runnable, "MyThreadFactory-" + atomicInteger.incrementAndGet());
        }
    }

    static class MyRejectedExecutionHandler implements RejectedExecutionHandler {
        @Override
        public void rejectedExecution(Runnable runnable, ThreadPoolExecutor executor) {
            if (runnable instanceof ThreadPoolTestThread) {
                System.out.println(
                    " this poll is full , this thread message is " + ((ThreadPoolTestThread)runnable).getMessage());
            }
        }
    }

    @Data
    static class ThreadPoolTestThread implements Runnable {
        private String message;

        @Override
        public void run() {
            try {
                Thread.sleep(1000);
                System.out.println("ThreadPoolTestThread task is completed, this is message \t" + message
                    + " thread name is " + Thread.currentThread().getName());
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        public ThreadPoolTestThread(String message) {
            this.message = message;
        }
    }

    public static void main(String[] args) {
        for (int i = 0; i < 20; i++) {
            threadPoolExecutor.execute(new ThreadPoolTestThread("index-" + i));
        }
    }
}
```

执行结果如下图：

![ThreadPoolTest](https://tva1.sinaimg.cn/large/008i3skNly1gsc93o0zxjj31400n4n4b.jpg)

#### newCachedThreadPool

```java
public static ExecutorService newCachedThreadPool() {
    return new ThreadPoolExecutor(0, Integer.MAX_VALUE,
                                  60L, TimeUnit.SECONDS,
                                  new SynchronousQueue<Runnable>());
}
```

#### newFixedThreadPool

```java
public static ExecutorService newFixedThreadPool(int nThreads) {
        return new ThreadPoolExecutor(nThreads, nThreads,
                                      0L, TimeUnit.MILLISECONDS,
                                      new LinkedBlockingQueue<Runnable>());
}
```

#### newSingleThreadExecutor

```java
public static ExecutorService newSingleThreadExecutor() {
    return new FinalizableDelegatedExecutorService
        (new ThreadPoolExecutor(1, 1,
                                0L, TimeUnit.MILLISECONDS,
                                new LinkedBlockingQueue<Runnable>()));
}
```

#### newScheduledThreadPool

```java
public static ScheduledExecutorService newScheduledThreadPool(int corePoolSize) {
    return new ScheduledThreadPoolExecutor(corePoolSize);
}

//ScheduledThreadPoolExecutor():
public ScheduledThreadPoolExecutor(int corePoolSize) {
    super(corePoolSize, Integer.MAX_VALUE,
          DEFAULT_KEEPALIVE_MILLIS, MILLISECONDS,
          new DelayedWorkQueue());
}
```

### 并发集合

#### 并发 Map

#### 并发 Queue

#### 并发 Set

### 通信工具类

### Fork/Join 框架

### Stream 并行计算原理
