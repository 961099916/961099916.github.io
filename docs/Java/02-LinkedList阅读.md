# LinkedList
是通过实现链表从而进行存储的，其有私有内部类Node，通过泛型，从而实现储存各种类型对象。
```java
private static class Node<E> {
    // 该节点的数据
     E item;
     // 链表下一级
     Node<E> next;
     // 上一级
     Node<E> prev;
     // 构建方法
     Node(Node<E> prev, E element, Node<E> next) {
         this.item = element;
         this.next = next;
         this.prev = prev;
     }
 }
```
## 构造器
### 无参数构造方法
```java
public LinkedList() {
   }
```
### 带参数的构造方法
构造方法通过调用该方法进行创建的
```java
public boolean addAll(int index, Collection<? extends E> c) {
    // 检测索引
     checkPositionIndex(index);

     Object[] a = c.toArray();
     int numNew = a.length;
     if (numNew == 0)
         return false;
     Node<E> pred, succ;
     // 再当前数据后添加
     if (index == size) {
         succ = null;
         pred = last;
     } else {
         succ = node(index);
         pred = succ.prev;
     }
     // 循环添加
     for (Object o : a) {
         @SuppressWarnings("unchecked") E e = (E) o;
         Node<E> newNode = new Node<>(pred, e, null);
         if (pred == null)
             first = newNode;
         else
             pred.next = newNode;
         pred = newNode;
     }
     // 绑定做成一条链
     if (succ == null) {
         last = pred;
     } else {
         pred.next = succ;
         succ.prev = pred;
     }

     size += numNew;
     modCount++;
     return true;
 }
```
## 常用方法
###  linkFirst(E e)
添加的基本方法
```java
/**
 * Links e as first element.
 */
private void linkFirst(E e) {
    final Node<E> f = first;
    final Node<E> newNode = new Node<>(null, e, f);
    first = newNode;
    // 通过判断是否有上一级 为空
    if (f == null)
        last = newNode;
    else
        f.prev = newNode;
    size++;
    modCount++;
}
```
### node(int index) 查找
```java
/**
 * Returns the (non-null) Node at the specified element index.
 */
Node<E> node(int index) {
    // assert isElementIndex(index);

    if (index < (size >> 1)) {
        Node<E> x = first;
        for (int i = 0; i < index; i++)
            x = x.next;
        return x;
    } else {
        Node<E> x = last;
        for (int i = size - 1; i > index; i--)
            x = x.prev;
        return x;
    }
}
```
## 常见问题
