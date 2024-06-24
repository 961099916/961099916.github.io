---
title: Java 基础面试题
order: 1
---

## 1. Java 语言有哪些特点

1. 简单易学、有丰富的类库
2. 面向对象（Java 最重要的特性，让程序耦合度更低，内聚性更高）
3. 与平台无关性（JVM 是 Java 跨平台的根本）
4. 可靠安全
5. 支持多线程

## 2. 面向对象和面向过程的区别

- 面向过程：是分析解决问题的步骤，然后用按说把这些步骤一步一步的实现，然后在使用的时候一一调用则可。性能较高，所以单片机、嵌入式开发等一般采用面向过程开发
- 面向对象：是吧构成问题的事务分解成对象，而建立对象的目的也不完全是为了完成一个个步骤，而是为了描述某个事物在解决整个问题的过程中所发生的行为。面向对象有封装、继承、多态的特性，所以易维护、易复用、易扩展。可以设计出低耦合的系统。但是性能上来说，比面向过程要低。

## 3. 八种基本数据类型的大小、以及他们的封装类

- byte 1 字节 默认值 0 封装类 Byte
- short 2 字节 默认值 0 封装类型 Short
- char 2 字节 默认值 null（\u000） 封装类型 Character
- int 4 字节 默认值 0 封装类型 Integer
- float 4 字节 默认值 0.0f 封装类型 Float
- long 8 字节 默认值 0L 封装类型 Long
- double 8 字节 默认值 0.0d 封装类型 Double
- boolean 默认值 false 封装类型 Boolean
    - JVM 虚拟机中没有提供 boolean 值专用的字节码指令，编译后是用 int 数据类型代替的，而 boolean 数组则会被编译成 byte
      数组。所以 boolean 单独使用时是 4 个字节，数组中是 1 个字节。
- 注意： 除了八种基础类型外都是封装类型

## 4. instanceof

- 双目运算符，obj instanceof Class，判断 obj 是否是 Class （或其子类）的对象，若是返回 true
- 注意： 编译器会检查 obj 是否能够转换为右面的 class 类型，若是不能确定则看运行时，obj 不可使基础类型

## 5. 自动装箱和拆箱

- 装箱：就是自动把基础类型自动转换为封装类型
- 拆箱：就是自动把封装类型转化为基础类型
- 注意： Integer 内部存在存在有缓存，缓存的数据大小为[-128,127]

## 6. 重载和重写

- 重写： 子类把父类中的方法进行重写，要求方法名、参数列表、返回类型都相同，访问修饰权限不小于父类
- 重载：方法名称一致，参数列表不一致，返回类型无要求

## 7. == 和 equals

- == 比较的地址，用于比较是否是同一个对象
- equals 比较的是地址中的数据是否相等

## 8. hashCode 作用

- hashCode：返回的是对象根据内存地址算出的一个值，提升直接通过 equals 进行判断数据是否一致的效率
- 在集合中会使用到对象的 hashCode，以此来提升性能

## 9. String、StringBuffer、StringBuilder 区别

- String：内部是 final 修饰的字符数组，当 String 进行拼接时相当于新建字符数组进行替换，效率较低
- StringBuffer、StringBuilder： 内部都是可变数组，进行频繁的字符串操作性能较高
- StringBuffer： 对方法添加了同步锁或者调用的方法添加了同步锁，所以线程安全的
- StringBuilder：线程不安全

## 10. ArrayList 和 LinkedList 的区别

- ArrayList： 内部基于数组进行存储的，所以通过索引查询的效率是 O(1)，删除数据是开销较大，需要进行数组的处理。
- LinkedList： 内部是基于链表进行存储的，所以查询的效率较低，但是删除的效率较高。

## 11. HashMap 和 HashTable 的区别

- HashMap
    - 继承自 AbstractMap 类，实现了 Map、Cloneable、Serializable 接口
    - kv 都支持 null，但实际 key 为 null 只会存在一个
    - 线程不安全
- HashTable
    - 继承自 Dictionary 类，实现了 Map、Cloneable、Serializable 接口
    - kv 都不能为 null
    - 线程安全

## 12. Collection 包和 Collections 包的区别

- Collection：是集合的上级接口包
- Collections： 是集合的工具包

## 13. Java 的四种引用

1. 强引用
    - String s = new String("1);
2. 软引用
    - SoftReference wrf = new SoftReference(new String("1")); new String 是软引用
3. 弱引用
    - WeakReference wrf = new WeakReference(str): WeakReference 的 key 是弱引用
4. 虚引用
    - PhantomReference prf = new PhantomReference(new String("1"),new ReferenceQueue<>())

## 14.泛型常用特点

- 不必因为类型不一致而创建不同类

## 15. Java 创建对象的方式

1. new 创建对象
2. 反射 newInstance
3. clone 克隆
4. 通过序列化

## 16. 有没有可能两个对象不等，但是 hashCode 相等？

- 可能得，会存在哈希冲突
- 解决方法
    - 拉链法：例如 hashMap，若 hashCode 一致，则通过链表进行链接，获取的时候先通过 hashCode 查找，若存在多个则通过 equals 比较
    - 开放定址法：一旦发生冲突，就去寻找下一个散列，只要散列足够大，空的散列地��总能找到，并记录存入
    - 再哈希： 又叫双哈希，当第一个 哈希函数结果冲突就在用第二个、第三个，直到无冲突

## 17. 深拷贝和浅拷贝

- 浅拷贝：只复制当前对象，当前对象的属性还是引用之前对象的值
- 深拷贝：不仅仅复制当前对象，当前对象的属性也进行复制

## 18. final 有哪些用法

1. 修饰的类不可被继承
2. 被修饰的方法不可被重写
3. 被修饰的变量不可被变更，但若是封装对象这可以改变引用地址内的内容
4. 被修饰的方法 JVM 会尝试将其内联，以提高效率
5. 被修饰的常量，在编译阶段会存入常量池中

- 遵守两个重排序规则
    1. 在构造函数内对一个 final 域的写入，与随后把这个被构造对象的引用赋值给一个变量，这两个操作之间不能重排序
    2. 初次读一个包含 final 域的对象的引用，与随后初次读这个 final 域，这两个操作之间不能重排序。
    3. 对于 final 域，编译器会在写入时插入一个 StoreStore 屏障，当读取 final 域时会插入 LoadLoad 屏障，这些屏障可以防止编译器和处理器在处理
       final 域时进行过度的指令重排序。
- happens-before 规则
    - 单一线程原则：在一个线程内，在程序前面的操作先行发生于后面的操作。
    - 管程锁定规则：一个 unlock 操作先行发生于后面对同一个锁的 lock 操作。
    - volatile 变量规则：对一个 volatile 变量的写操作先行发生于后面对这个变量的读操作。
    - 线程启动规则：Thread 对象的 start() 方法调用先行发生于此线程的每一个动作。
    - 线程加入规则：Thread 对象的结束先行发生于 join() 方法返回
    - 线程中断规则：对线程 interrupt() 方法的调用先行发生于被中断线程的代码检测到中断事件的发生，可以通过 interrupted()
      方法检测到是否有中断发生。
    - 对象终结规则：一个对象的初始化完成(构造函数执行结束)先行发生于它的 finalize() 方法的开始。
    - 传递性：如果操作 A 先行发生于操作 B，操作 B 先行发生于操作 C，那么操作 A 先行发生于操作 C

## 19.static 的用法

1. 静态常量
2. 静态方法
3. 静态代码快
4. import staic 静态导包

## 20. 3*0.1 == 0.3 返回值是什么？

- false，因为浮点数不能完全的精确的表示出来

## 21. a=a+b 和 a+=b 有什么区别

- += 会隐式自动转换
- byte a = 127;byte b = 127;b= a+b; 会报错，类型转换为 intb+=a;不会报错

## 22. try catch finally,try 里面有 return，finally 还会执行吗？

- 会，在 return 前会执行 finally，如果 finally 有 return 则会直接 return

## 23. Exception 和 Error 包结构

- 可以抛出的异常有三种
    - RuntimeException：运行时异常
    - CheckException: 检查时异常
    - Error：错误

## 24. OOM 你遇到过哪些情况，SOF 你遇到过那些情况

- OOM

- SOF

## 25. 简述线程、程序、进程的基本概念。以及他们之间的关系

- 线程：线程和进程类似，但是线程是一个比进程更小的执行单位，一个进程在其执行的过程中可以产生多个小城。与进程不同的是同类的多个线程共享同一块内存空间和一组系统资源，所以系统在产生一个线程或是在各个线程之间切换工作时，负担要比进程小得多，也正因为如此，线程也被称为轻量进程。
- 程序：含有指令和数据的文件，被存在磁盘或其他的数据存储设备中，也就是说程序是静态的代码
- 进程：程序的一次执行过程，是系统运行程序的基本单位，因此进程是动态的。系统运行一个程序及时一个进程从创建、运行至消亡的过程，简单来说，一个进程就是一个执行的程序，它在计算机中一个指令接着一个指令的执行着没同事，每一个程序还占用某些系统资源如
CPU 时间、内存空间、文件、输入输出设备的使用权等等。

## 26. 某些字段不行序列化怎么办？

- 使用 transient 关键字，阻止实例化中那些用此关键字修饰的变量序列化，相反 transient 修饰的变量值在被反序列化是也不会被持久化和回复。transient
  只能修饰变量，不能修饰类和方法

## 27. java 中的 IO 流

- 按照流向
    - 输入
    - 输出
- 按照操作单元
    - 字节流
    - 字符流
- 按照角色
    - 节点流
    - 处理流

## 28. IO 和 NIO 的区别

- 有相同的作用和目的，但是实现方式不同
- NIO 效率要比 IO 高很多
- JAVA API 中提供了两套的 NIO，一套是针对标准的输入输出，另一套就是网络编程 NIO

## 29. java 反射的作用与原理

- 定义
    - 反射机制是在运行时，对于任意一个类，都能够知道这个类的所有属性和方法；对于任意个对象，都能够调用它的任意一个方法，只要给定类的名称，就可以通过反射机制获得类的所有信息
- 哪里用到
    - 框架中经常使用
    - JDBC 的 Class.forName("com.mysql.jdbc.Driver.class");
- 反射的实现方式
    - 获取 class 对象的四种方式
        - Class.forName("")
        - 类名.class
        - 对象.getClass()
        - 基础类型的包装类，可以调用包装类的 Type 属性来获得改包装的 Class 对象
- 反射能够获取的信息
    - class：表示正在运行对象的类
    - Field： 提供有关类和接口的属性信息，以及对他的动态访问权限
    - Constructor： 构造方法
    - Method： 方法
- 优点
    - 能够运行时动态获取类的实例，提高灵活性
    - 与动态编译结合
- 缺点
    - 使用反射性能较低，需要解析字节码，将内存的对象进行解析。
        - 通过 setAccessible(true) 关闭 JDK 的安全检查来提升反射速度
        - 多次创建一个类的实例时，有缓存会更多
        - ReflectASM 工具类，通过字节码生成的方式加快反射速度

- 相对不安全，破换了封装性

## 30. List、Set、Map 什么区别

- List：是单元素集合且有序可重复
- Set：是单元素集合且无序不可重复
- Map：键值对存储，key 不能重复，value 可以重复

## 31. Object 有哪些方法

- clone：克隆方法，实现对象的浅复制，只有实现了 Cloneable 接口才可以调用该方法，否则抛出 CloneNotSupportedException
  异常，深度拷贝也需要实现 Cloneable，同时其成员变量为引用类型也要实现 Cloneable，然后重写 clone 方法
- finalize： 和垃圾收集器有关系，判断一个对象是都可以被回收的最后一步就是判断是否重写了此方法
- equals
- hashCode
- wait
- notify
- notifyAll

## 32. ArrayList 和 LinkedList

## 33. 存在数组了为什么还要 ArrayList

- 数组不可以自动扩容

## 34. 什么是 fail-fast

- 集合的一种错误机制，集合在操作的时候 modCount 会自增，在进行迭代其遍历时会缓存当前的
  modCount，然后每次迭代都会进行比较，要是不一致则说明存在别的线程在操作，从而抛出 ConcurrentModificationException 异常

## 35. HashTable 和 HashMap

## 36. HashMap 中的 key 可以使用任何类作为 key 吗？

- 若类重写了 equals，它也应该重写 hashCode 方法
- 类的所有实例需要遵守 equals 和 hashCode 相关的规则
- 如果一个类没有使用 equals，你也不应该在 hashCode 中使用它

## 37. HashMap 的长度为什么是 2 的 n 次方

## 38. HashMap 和 ConcurrentHashMap 的异同？

## 39. 红黑树

## 40. 怎么处理异常
