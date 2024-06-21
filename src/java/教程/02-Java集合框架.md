---
title: Java集合框架
order: 3
---

```markmap

# Java集合框架
## 简介
## Collection
### ArrayList
### LinkedList
### Stack & Queue
## Map
### HashSet & HashMap
### LinkedHasSet & Map
### TreeSet & TreeMap
### WeakHashMap

```

Java 集合框架是每一个入门开发者必会的内容，而且在较长的时间内容，不管是使用还是面试频度否非常的高，所以本人认为完全的、深入的学习是十分有必要的。本人结合源码和网络上的相关文章进行了总结。
## Collection

Collection 是 `List` 和 `Set`的父类，它抽象了单列数据集合的基本方法。它包含了以下的方法：

1. int size():获取单列数据集合中存储数据的数量
2. isEmpty():当前单列数据集合是否为空
3. contains(Object o): 当前单列数据合计是否存在该数据对象，当前对象需要实现 `equals` 和 `hashCode` 方法，防止不同的对象校验的 hashCode 一致
4. toArray(): 单列数据集合转数组
5. toArray(T[]) :单列数据结合转数组，数组类型为参数类型
6. add(E e): 单列数据集合添加数据
7. remove(E e): 删除单列数据集合中的该数据
8. containsAll(Collection<?> c): 校验当前数据集合是否在该单列数据中，若都存在则返回 true
9. addAll(Collection<?> c): 向当前单列数据集合中添加该数据结合
10. removeAll(Collection<?> c): 当前单列数据集合中移出指定的数据集合
11. removeIf(Predicate<? super E> filter): 移出通过 filter 筛选的数据集合
12. retainAll(Collection<?> c): 从该集合中删除未包含在指定集合中的所有元素
13. clear(): 从此集合中移除所有元素(可选操作)。该方法返回后，集合将为空。
14. equals(Object o):
15. hashCode():
16. spliterator():
17. stream():
18. parallelStream():

### 实现类比较
| 实现类名称 |    实现原理    |                    优点                    |              缺点              |
| :--------: | :------------: | :----------------------------------------: | :----------------------------: |
| ArrayList  |      数组      |                 索引查询快                 |           变更效率低           |
| LinkedList |      链表      |                 变更效率高                 |           索引查询慢           |
|   Vector   | ArrayList 一致 |             加锁，防止并发问题             | 由于加锁问题，导致操作效率较低 |
|   Stack    | 继承了 Vector  | 相比于 Vector 功能更加强大，封装了部分方法 |         和 Vector 一致         |


### ArrayList

`ArrayList` 是 `Collection` 实现子类，它实现了 `Collection` 的所有功能且添加了部分自己独有的一些功能，让其使用更加方便和简单。内部的实现原理是通过数组进行缓存元素数据，通过 size 属性缓存数据的长度。

#### 构造方法

`ArrayList` 有三个构造方法，无参、初始容量、初始元素。

- 无参：会给属性 `this.elementData`赋值为`DEFAULTCAPACITY_EMPTY_ELEMENTDATA` 。
- 初始容量：若设置容量大于 0，会给属性 `this.elementData`赋值为`new Object[initialCapacity]`；若设置容量等于 0 ，会给属性 `this.elementData`赋值为`EMPTY_ELEMENTDATA`；若设置容量小于 0，则抛出异常。
- 初始元素：若初始元素数量等于 0， 则会给属性 `this.elementData`赋值为`EMPTY_ELEMENTDATA`；若初始元素数量大于 0，则会把元素赋值给`this.elementData`。

#### 判断

判断集合中是否存在该元素是通过遍历集合的属性`elementData`的数据，通过`equals`判断数据是否相等，所以需要该数据对象实现对应的方法。

#### 新增

添加元素时先让`modCount` 加一（后续移出时会使用）。如果当前插入的位置等于元素数量即当前集合数据已满，则需要进行扩容，扩容代码如下:

```java
    private int newCapacity(int minCapacity) {
        // overflow-conscious code
        int oldCapacity = elementData.length;
        int newCapacity = oldCapacity + (oldCapacity >> 1);
        if (newCapacity - minCapacity <= 0) {
            if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA)
                return Math.max(DEFAULT_CAPACITY, minCapacity);
            if (minCapacity < 0) // overflow
                throw new OutOfMemoryError();
            return minCapacity;
        }
        return (newCapacity - MAX_ARRAY_SIZE <= 0)
            ? newCapacity
            : hugeCapacity(minCapacity);
    }

    private static int hugeCapacity(int minCapacity) {
        if (minCapacity < 0) // overflow
            throw new OutOfMemoryError();
        return (minCapacity > MAX_ARRAY_SIZE)
            ? Integer.MAX_VALUE
            : MAX_ARRAY_SIZE;
    }
```

- minCapacity: 是当前容量+1
- newCapacity: 是 oldCapacity + （0.5*oldCapacity）
> 第一次扩容时，若是无参的构造方法，则会进行默认为容量是 10；含有参数的构造方法，第一次则按照 1.5 倍扩容（初始化容量为 0 时，则第一次扩容容量会变更为 1）

> 后续扩容，则需要判断扩容 1.5 倍之后是否超出 `int` 的最大值，若是会超过则取 Integer.MAX_VALUE




#### 删除

> 单个删除时:查询元素在集合的下标索引，然后通过`System.arraycopy`进行数组的 copy 和创建以此实现数据的删除

> 批量删除时: 会缓存`modCount` 在删除的过程中会校验缓存的`modCount`是否和当前的一致，若是不一致则会抛出`ConcurrentModificationException`异常，提示在并发修改


#### 扩展方法

### LinkedList

`LinkedList` 也是实现`Collection` 的子类，它内部的数据接口是采用链表的方式进行存储，数据长度也是通过属性进行获取的。

#### 构造方法

该类的构造方法并未进行特殊的处理，无参的构造方法什么都为进行初始化，通过集合进行初始化的，则直接调用的`addAll`。

#### 判断

这里判断对象是否存在也是进行数据遍历，进行比较数据对象是否存在。

#### 新增

刚创建时，属性`first` 和 `last` 都是空的，第一次添加是会给 `first` 和 `last` 赋值，后续创建则直接在先缓存 `last` 然后 `last`等于新元素，缓存的`last`关联新元素，从而先新元素的添加。

#### 删除

删除则是查询到对应的节点后，直接让前一个节点关联后一节点，从而实现该节点的删除。

#### 扩展方法

### Vector

`Vector` 类似于 `ArrayList` 都是基于数组的存储结构，只不过加入了自己特性的一些东西，例如扩容规则、线程安全。

#### 构造方法

构造方法可以传入初始容量和扩容自增的数量。默认的初始容量是 10，自增的属性值设置为 0。

#### 判断

基本和`ArrayList` 一致，只不过在判断时加锁进而防止并发问题。

#### 新增

新增操作和`ArrayList`一致，只不过在操作的时候添加了锁，进行防止并发操作

#### 删除

#### 扩展方法

### Stack

### HashSet

### TreeSet

### CopyOnWriteArrayList

### CopyOnWriteArraySet

### ConcurrentSkipListSet

## Map

Map 抽象了键值对数据集合的通用方法，它包含以下方法：

1. int size()：查看元素数目
2. isEmpty()：元素个数是否是0
3. containsKey(Object key)：是否存在这个 key
4. containsValue(Object value)： 是否存在个 value
5. get(Object key)： 通过 key 获取对象的 value
6. put(K key, V value)： 添加 key-value 元素
7. remove(Object key)： 移出 key 对应的 value
8. putAll(Map<? extends K, ? extends V> m)：添加集合中的所有元素
9. clear()： 清空元素
10. keySet()： 获取元素的 key 的不重复集合
11. values()：获得元素中的所有 value
12. entrySet()：获取所有的 key-value 对象
13. getOrDefault(Object key, V defaultValue)：获取 key 对应的 value，若不存在在返回 defaultValue
14. putIfAbsent(K key, V value): 若是不存在 key 对应的 value 则进行添加
15. remove(Object key, Object value)：删除 key 对应的值且等于 value 的
16. replace(K key, V oldValue, V newValue)： 若存在 key 的值为 oldValue 的元素，则重新赋值 key 的值为 newValue
17. replace(K key, V value)：若存在 key 就添加 key 对应的值为 value
18. computeIfAbsent(K key,Function<? super K, ? extends V> mappingFunction)：若不存在 key 对应的值，则通过 mappingFunction 获取，且添加到集合中
19. computeIfPresent(K key,BiFunction<? super K, ? super V, ? extends V> remappingFunction)：若是存在key 对应的 value 则传入 key，value 到 mappingFUnction 获取新的 newValue，若 newValue 为空则会清除 key，若不为空，则修改集合中key 对应的值，且返回newValue

### HashMap

HashMap 通过设置一些属性，进行控制某些行为，例如：初始容量、扩容时下次数量、多少元素转化为树，以下是 HashMap 的属性：

- DEFAULT_INITIAL_CAPACITY = 1 << 4; 初始容量为 16
- MAXIMUM_CAPACITY = 1 << 30; int 的最大值为 2 的 31-1，但是只能移动1 所以最大值为 2 的 30 次方
- DEFAULT_LOAD_FACTOR = 0.75f; 默认的负载因子 0.75
- TREEIFY_THRESHOLD = 8; 链表树化的最小元素数量，即链表元素个数大于 8 时，链表进行树化
- UNTREEIFY_THRESHOLD = 6; 树退化成链表的最大元素数量，当树的元素数量小于 6 的时候，树退化为链表
- MIN_TREEIFY_CAPACITY = 64; 集合树化的最小元素个数，当集合元素数目大于 64 的时候才可能树化,优先级大于 TREEIFY_THRESHOLD ，可以存在链表长度大于 8 ，只有当容量大于 64 才会树化
- Node<K,V>[] table; 集合元素数据
- Set<Map.Entry<K,V>> entrySet; 缓存的数据
- int size; 元素数目
- int modCount; 防止迭代器遍历的时候修改
- int threshold; 下一次扩容的容量
- float loadFactor; 负载因子

#### HashMap的扩缩容

当进行新增时，会先去取 key 的哈希值，`(key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16)`，进行 put 时，会先进行判断 table 是否存在数据，如果没有则调用 `resize()` 进行初始化或扩容，若 该元素在 table 中不存在哈希冲突则放置到对应的下标上，若存在哈希冲突则需要判断 table 该下标的数据是否是树，若是树则进行添加子节点，若不是树，则链接在链表后，判断若当前链表的数量大于默认树化的数目，则执行 `treeifyBin(tab, hash)`,进行树化处理

- 为什么要这么计算哈希值

### TreeMap

### WeakHashMap

### Hashtable

### ConcurrentHashMap

### ConcurrentSkipListMap

## Queue

### ArrayBlockingQueue

### LinkedBlockingQueue

### LinkedBlockingDeque

### ConcurrentLinkedQueue

### ConcurrentLinkedDeque
