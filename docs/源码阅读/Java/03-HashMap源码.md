# HashMap
HashMap是线程不安全的，若需要考虑线程安全则需要用HashTable
## 属性
```java
 //  默认大小 1<<4 为16
 static final int DEFAULT_INITIAL_CAPACITY = 1 << 4;
 // 最大 2的30次方
 static final int MAXIMUM_CAPACITY = 1 << 30;
 // 默认负载因子 0.75
 static final float DEFAULT_LOAD_FACTOR = 0.75f;
 // 存储数据的对象组
 transient Node<K,V>[] table;
```
## 构造方法

### HashMap(int initialCapacity, float loadFactor)
- 加载因子是表示Hsah表中元素的填满的程度.若:加载因子越大,填满的元素越多,好处是,空间利用率高了,但:冲突的机会加大了.反之,加载因子越小,填满的元素越少,好处是:冲突的机会减小了,但:空间浪费多了.
冲突的机会越大,则查找的成本越高.反之,查找的成本越小.因而,查找时间就越小.
因此,必须在 "冲突的机会"与"空间利用率"之间寻找一种平衡与折衷. 这种平衡与折衷本质上是数据结构中有名的"时-空"矛盾的平衡与折衷.
```java
// 传入初始化大小 和 负载因子
public HashMap(int initialCapacity, float loadFactor) {
     if (initialCapacity < 0)
         throw new IllegalArgumentException("Illegal initial capacity: " +
                                            initialCapacity);
     if (initialCapacity > MAXIMUM_CAPACITY)
         initialCapacity = MAXIMUM_CAPACITY;
     if (loadFactor <= 0 || Float.isNaN(loadFactor))
         throw new IllegalArgumentException("Illegal load factor: " +
                                            loadFactor);
     this.loadFactor = loadFactor;
     this.threshold = tableSizeFor(initialCapacity);
 }
```

## 常用方法
### tableSizeFor(int cap) 扩容
```java
/**
  * 扩容，tableSizeFor的功能（不考虑大于最大容量的情况）是返回大于输入参数且最近的2的整数次幂的数
  * 详细讲解请查看  https://www.cnblogs.com/loading4/p/6239441.html
  */
 static final int tableSizeFor(int cap) {
     int n = cap - 1;
     n |= n >>> 1;
     n |= n >>> 2;
     n |= n >>> 4;
     n |= n >>> 8;
     n |= n >>> 16;
     return (n < 0) ? 1 : (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
 }
```
##
