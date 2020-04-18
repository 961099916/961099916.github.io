# ArrayList
常用的有序集合，采用的是线性结构，和ArrayList形成对比的是LinkedList，线性表的优点在于遍历查询，链表优点在于修改。
## 属性
```java
private static final long serialVersionUID = 8683452581122892189L;

/**
 * m默认大小
 */
private static final int DEFAULT_CAPACITY = 10;

/**
 * 空时的数据
 */
private static final Object[] EMPTY_ELEMENTDATA = {};

/**
 *  默认为空是对应的数据
 */
private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};

/**
 * 数据
 */
transient Object[] elementData; // non-private to simplify nested class access

/**
 * 长度
 *
 * @serial
 */
private int size;

```
## 构造器
### ArrayList(int initialCapacity)  指定容量的构造方法（默认是10）
```java
/**
 * 可初始化默认容量大小，若小于零则抛异常，指定0为默认容量 10
 *
 * @param  initialCapacity  the initial capacity of the list
 * @throws IllegalArgumentException if the specified initial capacity
 *         is negative
 */
public ArrayList(int initialCapacity) {
    if (initialCapacity > 0) {
        this.elementData = new Object[initialCapacity];
    } else if (initialCapacity == 0) {
        this.elementData = EMPTY_ELEMENTDATA;
    } else {
        throw new IllegalArgumentException("Illegal Capacity: "+
                                           initialCapacity);
    }
}
```
### 无参构造
```java
/**
   * 数据设置为默认为容量时的数据
   */
  public ArrayList() {
      this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
  }
```
### ArrayList(Collection<? extends E> c)
```java
/**
     * 以集合创建集合，把数据放入的elementData，然后判断长度进行设置size，并进行复制数据
     *
     * @param c the collection whose elements are to be placed into this list
     * @throws NullPointerException if the specified collection is null
     */
    public ArrayList(Collection<? extends E> c) {
        elementData = c.toArray();
        if ((size = elementData.length) != 0) {
            // c.toArray might (incorrectly) not return Object[] (see 6260652)
            if (elementData.getClass() != Object[].class)
                elementData = Arrays.copyOf(elementData, size, Object[].class);
        } else {
            // replace with empty array.
            this.elementData = EMPTY_ELEMENTDATA;
        }
    }
```
## 常用方法
### grow(int minCapacity) 扩容
```java
/**
 * 集合的扩容
 *
 * @param minCapacity the desired minimum capacity
 */
private void grow(int minCapacity) {
    // 原容量
    int oldCapacity = elementData.length;
    // 原容量+原容量>>1 = 1.5 原容量
    int newCapacity = oldCapacity + (oldCapacity >> 1);
    if (newCapacity - minCapacity < 0)
        newCapacity = minCapacity;
    // 判断新容量是否超出最大容量
    if (newCapacity - MAX_ARRAY_SIZE > 0)
        newCapacity = hugeCapacity(minCapacity);
    // minCapacity is usually close to size, so this is a win:
    elementData = Arrays.copyOf(elementData, newCapacity);
}
```
### indexOf(Object o) 查找元素位置的
```java
/**
 *  遍历查询，判断是否相等，则需要对象重写equals，返回的时第一次出现的位置
 */
public int indexOf(Object o) {
    if (o == null) {
        for (int i = 0; i < size; i++)
            if (elementData[i]==null)
                return i;
    } else {
        for (int i = 0; i < size; i++)
            if (o.equals(elementData[i]))
                return i;
    }
    return -1;
}
```
```java
/**
 * 遍历查询，判断是否相等，则需要对象重写equals，返回的时最后一次出现的位置
 */
public int lastIndexOf(Object o) {
    if (o == null) {
        for (int i = size-1; i >= 0; i--)
            if (elementData[i]==null)
                return i;
    } else {
        for (int i = size-1; i >= 0; i--)
            if (o.equals(elementData[i]))
                return i;
    }
    return -1;
}
```
### add(int index, E element) 添加
```java
/**
 * @param index index at which the specified element is to be inserted
 * @param element element to be inserted
 * @throws IndexOutOfBoundsException {@inheritDoc}
 */
public void add(int index, E element) {
    // 检测是否越界
    rangeCheckForAdd(index);
    // 扩容
    ensureCapacityInternal(size + 1);  // Increments modCount!!
    // 复制
    System.arraycopy(elementData, index, elementData, index + 1,
                     size - index);
    // 设置值
    elementData[index] = element;
    // 长度加一
    size++;
}
```
## 常见问题
