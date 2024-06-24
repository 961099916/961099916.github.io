---
title: JVM
order: 7
---

```markmap


# JVM
## 简介

```

JVM 是 Java Virtual Machine（Java 虚拟机）的缩写，JVM 是一种用于计算设备的规范，它是一个虚构出来的计算机，是通过在实际的计算机上仿真模拟各种计算机功能来实现的。Java 虚拟机包括一套字节码指令集、一组寄存器、一个栈、一个垃圾回收堆和一个存储方法域。 JVM 屏蔽了与具体操作系统平台相关的信息，使 Java 程序只需生成在 Java 虚拟机上运行的目标代码（字节码）,就可以在多种平台上不加修改地运行。JVM 在执行字节码时，实际上最终还是把字节码解释成具体平台上的机器指令执行。

Java 中的所有类，必须被装载到 jvm 中才能运行，这个装载工作是由 jvm 中的类装载器完成的，类装载器所做的工作实质是把类文件从硬盘读取到内存中。所以 JVM 的主要内容如下图

![](https://zhangjiahao-blog.oss-cn-beijing.aliyuncs.com/picgo/202304302221305.png#alt=JVM%20%E4%B8%BB%E8%A6%81%E5%86%85%E5%AE%B9)
## JVM 的编译

[class文件结构](https://juejin.cn/post/7008367013223464973)

.java 文件由 javac 进行代码编译，编译为.class 文件，.class 文件记录者整个源码的相关信息。

## 类加载子系统

[类加载子系统详解](https://blog.csdn.net/ym15229994318ym/article/details/106451313)

类加载器子系统负责从文件系统或者网络中加载 Class 文件，class 文件在文件开头有特定的文件标识。ClassLoader 只负责 class 文件的加载，至于它是否可以运行，则由 Execution Engine（执行引擎）决定。

类加载过程如下图

![](https://zhangjiahao-blog.oss-cn-beijing.aliyuncs.com/picgo/202305062011328.png#alt=%E7%B1%BB%E7%9A%84%E5%8A%A0%E8%BD%BD)

### 加载

通过一个类的`全限定名`获取定义此类的`二进制例）

#### 类加载器有哪些

![](https://zhangjiahao-blog.oss-cn-beijing.aliyuncs.com/picgo/202305062016840.jpeg#alt=%E7%B1%BB%E5%8A%A0%E8%BD%BD%E5%99%A8)

#### tomcat 为什么要自定义类加载器

[Tomcat 是如何打破"双亲委派"机制的?](https://developer.aliyun.com/article/1081332)

真正实现 web 应用程序之间的类加载器相互隔离 oader 类加载器。它为什么可以隔离每个 web 应用程序呢？原因就是它打破了"双亲委派"的机制，如果收到类加载的请求，它会先尝试自己去加载，如果找不到在交给父加载器去加载，这么做的目的就是为了优先加载 Web 应用程序自己定义的类来实现 web 应用程序相互隔离独立的。

![](https://zhangjiahao-blog.oss-cn-beijing.aliyuncs.com/picgo/202305061026632.png#alt=tomcat%20%E7%B1%BB%E5%8A%A0%E8%BD%BD)

- **CommonClassLoader(通用类加载器)**：主要 se}/lib 定义的目录和 jar 以及${catalina.home}/lib 定义的目录和 jar，可以被 Tomcat 和所有的 Web 应用程序共同使用。
- **WebAppClassLoader(web 应用的类加载器)**:心类加载器，每个 Web 应用程序都有一个 WebAppClassLoader，类库仅仅可以被此 Web 应用程序使用，对 Tomcat 和其他 Web 程序都不可见。

##### WebAppClassLoader 加载流程

```java
@Override
    public Class<?> findClass(String name) throws ClassNotFoundException {

        if (log.isDebugEnabled())
            log.debug("    findClass(" + name + ")");

        checkStateForClassLoading(name);

        // (1) Permission to define this class when using a SecurityManager
        if (securityManager != null) {
            int i = name.lastIndexOf('.');
            if (i >= 0) {
                try {
                    if (log.isTraceEnabled())
                        log.trace("      securityManager.checkPackageDefinition");
                    securityManager.checkPackageDefinition(name.substring(0,i));
                } catch (Exception se) {
                    if (log.isTraceEnabled())
                        log.trace("      -->Exception-->ClassNotFoundException", se);
                    throw new ClassNotFoundException(name, se);
                }
            }
        }

        // Ask our superclass to locate this class, if possible
        // (throws ClassNotFoundException if it is not found)
        Class<?> clazz = null;
        try {
            if (log.isTraceEnabled())
                log.trace("      findClassInternal(" + name + ")");
            try {
                if (securityManager != null) {
                    PrivilegedAction<Class<?>> dp =
                        new PrivilegedFindClassByName(name);
                    clazz = AccessController.doPrivileged(dp);
                } else {
                     // 1、先在应用本地目录下查找类
                    clazz = findClassInternal(name);
                }
            } catch(AccessControlException ace) {
                log.warn("WebappClassLoader.findClassInternal(" + name
                        + ") security exception: " + ace.getMessage(), ace);
                throw new ClassNotFoundException(name, ace);
            } catch (RuntimeException e) {
                if (log.isTraceEnabled())
                    log.trace("      -->RuntimeException Rethrown", e);
                throw e;
            }
            if ((clazz == null) && hasExternalRepositories) {
                try {
                     // 2、如果在本地目录没有找到，委派父加载器去查找
                    clazz = super.findClass(name);
                } catch(AccessControlException ace) {
                    log.warn("WebappClassLoader.findClassInternal(" + name
                            + ") security exception: " + ace.getMessage(), ace);
                    throw new ClassNotFoundException(name, ace);
                } catch (RuntimeException e) {
                    if (log.isTraceEnabled())
                        log.trace("      -->RuntimeException Rethrown", e);
                    throw e;
                }
            }
            // 3、如果父加载器也没找到，抛出异常
            if (clazz == null) {
                if (log.isDebugEnabled())
                    log.debug("    --> Returning ClassNotFoundException");
                throw new ClassNotFoundException(name);
            }
        } catch (ClassNotFoundException e) {
            if (log.isTraceEnabled())
                log.trace("    --> Passing on ClassNotFoundException");
            throw e;
        }

        // Return the class we have located
        if (log.isTraceEnabled())
            log.debug("      Returning class " + clazz);

        if (log.isTraceEnabled()) {
            ClassLoader cl;
            if (Globals.IS_SECURITY_ENABLED){
                cl = AccessController.doPrivileged(
                    new PrivilegedGetClassLoader(clazz));
            } else {
                cl = clazz.getClassLoader();
            }
            log.debug("      Loaded by " + cl.toString());
        }
        return (clazz);

    }
```

```java
@Override
public Class<?> loadClass(String name, boolean resolve) throws ClassNotFoundException {

    synchronized (getClassLoadingLock(name)) {
        Class<?> clazz = null;
        // 1、从本地缓存中查找是否加载过此类
        clazz = findLoadedClass0(name);
        if (clazz != null) {
            if (log.isDebugEnabled())
                log.debug("  Returning class from cache");
            if (resolve)
                resolveClass(clazz);
            return clazz;
        }

        // 2、从AppClassLoader中查找是否加载过此类
        clazz = findLoadedClass(name);
        if (clazz != null) {
            if (log.isDebugEnabled())
                log.debug("  Returning class from cache");
            if (resolve)
                resolveClass(clazz);
            return clazz;
        }

        String resourceName = binaryNameToPath(name, false);
        // 3、尝试用ExtClassLoader 类加载器加载类,防止应用覆盖JRE的核心类
        ClassLoader javaseLoader = getJavaseClassLoader();
        boolean tryLoadingFromJavaseLoader;
        try {
            URL url;
            if (securityManager != null) {
                PrivilegedAction<URL> dp = new PrivilegedJavaseGetResource(resourceName);
                url = AccessController.doPrivileged(dp);
            } else {
                url = javaseLoader.getResource(resourceName);
            }
            tryLoadingFromJavaseLoader = (url != null);
        } catch (Throwable t) {
            tryLoadingFromJavaseLoader = true;
        }

        boolean delegateLoad = delegate || filter(name, true);

        // 4、判断是否设置了delegate属性,如果设置为true那么就按照双亲委派机制加载类
        if (delegateLoad) {
            if (log.isDebugEnabled())
                log.debug("  Delegating to parent classloader1 " + parent);
            try {
                clazz = Class.forName(name, false, parent);
                if (clazz != null) {
                    if (log.isDebugEnabled())
                        log.debug("  Loading class from parent");
                    if (resolve)
                        resolveClass(clazz);
                    return clazz;
                }
            } catch (ClassNotFoundException e) {
                // Ignore
            }
        }

        // 5、默认是设置delegate是false的,那么就会先用WebAppClassLoader进行加载
        if (log.isDebugEnabled())
            log.debug("  Searching local repositories");
        try {
            clazz = findClass(name);
            if (clazz != null) {
                if (log.isDebugEnabled())
                    log.debug("  Loading class from local repository");
                if (resolve)
                    resolveClass(clazz);
                return clazz;
            }
        } catch (ClassNotFoundException e) {
            // Ignore
        }

        // 6、如果在WebAppClassLoader没找到类，那么就委托给AppClassLoader去加载
        if (!delegateLoad) {
            if (log.isDebugEnabled())
                log.debug("  Delegating to parent classloader at end: " + parent);
            try {
                clazz = Class.forName(name, false, parent);
                if (clazz != null) {
                    if (log.isDebugEnabled())
                        log.debug("  Loading class from parent");
                    if (resolve)
                        resolveClass(clazz);
                    return clazz;
                }
            } catch (ClassNotFoundException e) {
                // Ignore
            }
        }
    }
    throw new ClassNotFoundException(name);
}
```

- 先在本地缓存中查找该类是否已经加载过，如果加载过就返回缓存中的。
- 如果没有加载过，委托给 AppClassLoader 是否加载过，如果加载过就返回。
- 如果 AppClassLoader 也没加载过，委托给 ExtClassLoader 去加载，这么做的目的就是：

   - 防止应用自己的类库覆盖了核心类库，因为 WebAppClassLoader 需要打破双亲委托机制，假如应用里自定义了一个叫 java.lang.String 的类，如果先加载这个类，就会覆盖核心类库的 java.lang.String，所以说它会优先尝试用 ExtClassLoader 去加载，因为 ExtClassLoader 加载不到同样也会委托给 BootstrapClassLoader 去加载，也就避免了覆盖了核心类库的问题。
- 如果 ExtClassLoader 也没有查找到，说明核心类库中没有这个类，那么就在本地应用目录下查找此类并加载。
- 如果本地应用目录下还有没有这个类，那么肯定不是应用自己定义的类，那么就由 AppClassLoader 去加载。

   - 这里是通过 Class.forName()调用 AppClassLoader 类加载器的，因为 Class.forName()的默认加载器就是 AppClassLoader。
- 如果上述都没有找到，那么只能抛出 ClassNotFoundException 了。

### 链接-Linking

[JVM 连接阶段](https://blog.csdn.net/linghu_java/article/details/48489915)

连接就是将已经读入到内存的类的二进制数据合并到虚拟机的运行时环境中去。

#### 验证(Verify)：

1.类文件的结构检查: 确保类文件遵从 Java 类文件的固定格式。

2.语义检查:确保类本身符合 Java 语言的语法规定。注意，语义检查的错误在编译器编译阶段就会通不过，但是如果有程序员通过非编译的手段生成了类文件，其中有可能会含有语义错误，此时的语义检查主要是防止这种没有编译而生成的 class 文件引入的错误

3.字节码验证：确保字节码流可以被 Java 虚拟机安全地执行。字节码验证步骤会检查每个操作码是否合法，即是否有着合法的操作数。

4.二级制兼容性的验证：确保相互引用的类之间的协调一致。

#### 准备(Prepare)：

在准备阶段，Java 虚拟机为类的静态变量分配内存，并设置默认的初始值。

#### 解析(Resolve)

在解析阶段，Java 虚拟机会把类的二级制数据中的符号引用替换为直接引用。

### 初始化-Initialization

加载的类信息存放于一块称为方法区的内存空间。除了类的信息外，方法区中还会存放运行时常最池信息，可能还包括字符串字而量和数字常量(这部分常量信息是 Class 文件中常量池部分的内存映射)

## 运行时数据区

[JVM 运行时数据区](https://blog.csdn.net/qdzjo/article/details/115741193)

| 名称       | 是否线程共享 | 描述                                                                                                                                                                                                                                                                                                     |
| ---------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 本地方法栈 | 否           | 与虚拟机的作用是相似的，只不过虚拟机栈是服务 Java 方法的，而本地方法栈是为虚拟机调用 Native 方法服务的，与虚拟机栈相同的是栈的深度是固定的，当线程申请的大于虚拟机栈的深度就会抛出 StackOverFlowError 异常，当然虚拟机栈也可以动态的扩展，如果扩展到无法申请到足够的内存就会抛出 outofMemoryError 异常。 |
| 虚拟机栈   | 否           | 描述的是 Java 方法执行的内存模型，每个方法在执行的同时都会创建一个**线帧**用于存储局部变量表、操作数栈、动态链接、方法出口等信息，每个方法从调用直至执行完成的过程，都对应这一个**线帧**在虚拟机栈中入栈到出栈的过程。                                                                                   |
| 程序计数器 | 否           | 程序计数器是一块较小的内存空间，它可以看作是当前线程所执行的字节码的行号指示器。                                                                                                                                                                                                                         |
| 方法区     | 是           | 用于存储已被虚拟机加载的类信息、常量、静态变量、即时编译后的代码等数据。                                                                                                                                                                                                                                 |
| 堆         | 是           | 是 Java 虚拟机中内存最大的一块，是被所有线程共享的，在虚拟机启动时候创建，Java 堆唯一的目的就是存放对象实例，几乎所有的对象实例都在这里分配内存，随着 JIT 编译器的发展和逃逸分析技术的逐渐成熟，栈上分配、标量替换优化的技术将会导致一些微妙的变化，所有对象都分配在堆上渐渐变得不那么“绝对”了。         |


### 虚拟机栈

描述的是 Java 方法执行的内存模型，每个方法在执行的同时都会创建一个线帧用于存储局部变量表、操作数栈、动态链接、方法出口等信息，每个方法从调用直至执行完成的过程，都对应这一个线帧在虚拟机栈中入栈到出栈的过程。

![](https://zhangjiahao-blog.oss-cn-beijing.aliyuncs.com/picgo/202305061029457.png#alt=%E8%99%9A%E6%8B%9F%E6%9C%BA%E6%A0%88)

### 本地方法栈

与虚拟机的作用是相似的，只不过虚拟机栈是服务 Java 方法的，而本地方法栈是为虚拟机调用 Native 方法服务的，与虚拟机栈相同的是栈的深度是固定的，当线程申请的大于虚拟机栈的深度就会抛出 StackOverFlowError 异常，当然虚拟机栈也可以动态的扩展，如果扩展到无法申请到足够的内存就会抛出 outofMemoryError 异常。

### 程序计数器

程序计数器是一块较小的内存空间，它可以看作是当前线程所执行的字节码的行号指示器。java 中最小的执行单位是线程，因为虚拟机的是多线程的，每个线程是抢夺 cpu 时间片，程序计数器就是存储这些指令去做什么，比如循环，跳转，异常处理等等需要依赖它。每个线程都有属于自己的程序计数器，而且互不影响，独立存储。

### 方法区

用于存储已被虚拟机加载的类信息、常量、静态变量、即时编译后的代码等数据。

内存区域是很重要的系统资源，是硬盘和 CPU 的中间桥梁，承载着操作系统和应用程序的实时运行。JVM 内存布局规定了 Java 在运行过程中内存申请、分配、管理的策略，保证了 JVM 的高效稳定运行。不同的 JVM 对于内存的划分方式和管理机制存在着部分差异，我们现在以使用最为流行的 HotSpot 虚拟机为例讲解。

### 堆

是 Java 虚拟机中内存最大的一块，是被所有线程共享的，在虚拟机启动时候创建，Java 堆唯一的目的就是存放对象实例，几乎所有的对象实例都在这里分配内存，随着 JIT 编译器的发展和逃逸分析技术的逐渐成熟，栈上分配、标量替换优化的技术将会导致一些微妙的变化，所有对象都分配在堆上渐渐变得不那么“绝对”了。Java8及之后堆内存分为：新生区（新生代）+老年区（老年代），新生区分为Eden（伊甸园）区和Survivor（幸存者）区，堆内存的分配：老年代（2/3）+新生代（1/3）， 新生代= Eden(8/10) + From(1/10) + To(1/10)

## 执行引擎

[JVM 执行引擎的作用及工作过程](https://zhuanlan.zhihu.com/p/197427636)

### 解释器

### JIT

[[Java 性能] 3. 什么是 JIT](https://www.bilibili.com/video/BV15f4y1q7nK/?share_source=copy_web&vd_source=9c9101455735764adc8a4013f7e3738d)

### 垃圾回收器

[垃圾收集器](https://zhuanlan.zhihu.com/p/248709769)

#### 如何判断一个对象是否还存活
- 引用计数：每个对象有一个引用计数属性，新增一个引用时计数加1，引用释放时计数减1，计数为0时可以回收。此方法简单，无法解决对象相互循环引用的问题。
- 可达性分析：从GC Roots开始向下搜索，搜索所走过的路径称为引用链。当一个对象到GC Roots没有任何引用链相连时，则证明此对象是不可用的。不可达对象。
- 在Java语言中，GC Roots包括：
   - 虚拟机栈中引用的对象。
   - 方法区中类静态属性实体引用的对象。
   - 方法区中常量引用的对象。
   - 本地方法栈中JNI引用的对象。

#### 垃圾收集算法

- 标记-清除算法：算法分为“标记”和“清除”两个阶段：首先标记出所有需要回收的对象，在标记完成后统一回收掉所有被标记的对象。之所以说它是最基础的收集算法，是因为后续的收集算法都是基于这种思路并对其缺点进行改进而得到的。

   - 缺点：一个是效率问题，标记和清除过程的效率都不高；另外一个是空间问题，标记清除之后会产生大量不连续的内存碎片，空间碎片太多可能会导致，当程序在以后的运行过程中需要分配较大对象时无法找到足够的连续内存而不得不提前触发另一次垃圾收集动作。
- 复制算法：它将可用内存按容量划分为大小相等的两块，每次只使用其中的一块。当这一块的内存用完了，就将还存活着的对象复制到另外一块上面，然后再把已使用过的内存空间一次清理掉。

   - 缺点：内存缩小为原来的一半，持续复制长生存期的对象则导致效率降低；在对象存活率较高时就要执行较多的复制操作，效率将会变低。更关键的是，如果不想浪费50%的空间，就需要有额外的空间进行分配担保，以应对被使用的内存中所有对象都100%存活的极端情况，所以在老年代一般不能直接选用这种算法。
   - 优点：每次都是对其中的一块进行内存回收，内存分配时也就不用考虑内存碎片等复杂情况，只要移动堆顶指针，按顺序分配内存即可，实现简单，运行高效。
- 标记-压缩算法：标记过程仍然与“标记-清除”算法一样，但后续步骤不是直接对可回收对象进行清理，而是让所有存活的对象都向一端移动，然后直接清理掉端边界以外的内存。
- 分代收集算法： 把Java堆分为新生代和老年代，这样就可以根据各个年代的特点采用最适当的收集算法。在新生代中，每次垃圾收集时都发现有大批对象死去，只有少量存活，那就选用复制算法，只需要付出少量存活对象的复制成本就可以完成收集。而老年代中因为对象存活率高、没有额外空间对它进行分配担保，就必须使用“标记-清理”或“标记-整理”算法来进行回收。

#### 垃圾收集器

- Serial收集器：串行收集器是最古老，最稳定以及效率高的收集器，可能会产生较长的停顿，只使用一个线程去回收。新生代、老年代使用串行回收；新生代复制算法、老年代标记-压缩；垃圾收集的过程中会Stop The World（服务暂停）

- ParNew收集器：ParNew收集器其实就是Serial收集器的多线程版本。新生代并行，老年代串行；新生代复制算法、老年代标记-压缩

- Parallel收集器：Parallel Scavenge收集器类似ParNew收集器，Parallel收集器更关注系统的吞吐量。可以通过参数来打开自适应调节策略，虚拟机会根据当前系统的运行情况收集性能监控信息，动态调整这些参数以提供最合适的停顿时间或最大的吞吐量；也可以通过参数控制GC的时间不大于多少毫秒或者比例；新生代复制算法、老年代标记-压缩

-
Parallel Old 收集器：Parallel Old是Parallel Scavenge收集器的老年代版本，使用多线程和“标记－整理”算法。这个收集器是在JDK 1.6中才开始提供

- CMS收集器：CMS（Concurrent Mark Sweep）收集器是一种以获取最短回收停顿时间为目标的收集器。目前很大一部分的Java应用都集中在互联网站或B/S系统的服务端上，这类应用尤其重视服务的响应速度，希望系统停顿时间最短，以给用户带来较好的体验。

- G1垃圾回收器：G1垃圾回收器将堆内存分割成不同的区域然后并发的对其进行垃圾回收。

|       | 新生代GC策略      | 老年老代GC策略 | 说明                                                                                                                                                                                                                               |
| ----- | ----------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 组合1 | Serial            | Serial Old     | Serial和Serial Old都是单线程进行GC，特点就是GC时暂停所有应用线程。                                                                                                                                                                 |
| 组合2 | Serial            | CMS+Serial Old | CMS（Concurrent Mark Sweep）是并发GC，实现GC线程和应用线程并发工作，不需要暂停所有应用线程。另外，当CMS进行GC失败时，会自动使用Serial Old策略进行GC。                                                                              |
| 组合3 | ParNew            | CMS            | 使用 -XX:+UseParNewGC选项来开启。ParNew是Serial的并行版本，可以指定GC线程数，默认GC线程数为CPU的数量。可以使用-XX:ParallelGCThreads选项指定GC的线程数。如果指定了选项 -XX:+UseConcMarkSweepGC选项，则新生代默认使用ParNew GC策略。 |
| 组合4 | ParNew            | Serial Old     | 使用 -XX:+UseParNewGC选项来开启。新生代使用ParNew GC策略，年老代默认使用Serial Old GC策略。                                                                                                                                        |
| 组合5 | Parallel Scavenge | Serial Old     | Parallel Scavenge策略主要是关注一个可控的吞吐量：应用程序运行时间 / (应用程序运行时间 + GC时间)，可见这会使得CPU的利用率尽可能的高，适用于后台持久运行的应用程序，而不适用于交互较多的应用程序。                                   |
| 组合6 | Parallel Scavenge | Parallel Old   | Parallel Old是Serial Old的并行版本                                                                                                                                                                                                 |
| 组合7 | G1GC              | G1GC           | -XX:+UnlockExperimentalVMOptions -XX:+UseG1GC  -XX:MaxGCPauseMillis=50  -XX:GCPauseIntervalMillis=200  -XX:+G1YoungGenSize=512m  -XX:SurvivorRatio=6                                                                               |


## 优化

### 获取 jvm 数据

```she
jmap -F -dump:format=b,file=dumpFile.phrof pid
```

### jvm 数据分析

[http://www.fastthread.io](http://www.fastthread.io/)

[https://spotify.github.io/threaddump-analyzer](https://spotify.github.io/threaddump-analyzer/)

[http://gceasy.io](http://gceasy.io/)

[http://heaphero.io](http://heaphero.io/)

### 调优

[JVM 优化](https://zhuanlan.zhihu.com/p/488615913)

## 优化工具

[JVM 优化工具](https://zhuanlan.zhihu.com/p/267381560)

- jps 虚拟机进程状况工具 jsp [options] [hostid]
- jstat 虚拟机统计信息监控工具 jstat [ option vmid [interval[s|ms] [count]] ]
- jinfo java 配置信息工具 jinfo [option] pid
- jmap java 内存映像工具 jmap [option] vmid
- jhat 虚拟机堆转储快照分析工具
- jstack java 堆栈跟踪工具 jstack [option] vmid
