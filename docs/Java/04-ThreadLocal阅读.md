# ThreadLocal
[慕课网教程](https://www.imooc.com/learn/1217)
多线程访问同一个共享变量的时候容易出现并发问题，特别是多个线程对一个变量进行写入的时候，为了保证线程安全，一般使用者在访问共享变量的时候需要进行额外的同步措施才能保证线程安全性。ThreadLocal是除了加锁这种同步方式之外的一种保证一种规避多线程访问出现线程不安全的方法，当我们在创建一个变量后，如果每个线程对其进行访问的时候访问的都是线程自己的变量这样就不会存在线程不安全问题。
例如：统计在线人数，如果同时登陆人数过多，会导致统计不准确。
## 构造方法
```java
public ThreadLocal() {
    }
```
## 主要方法
```java
// 初始化方法
protected T initialValue() {
      return null;
  }
  // 获取线程数据
  public T get() {
      // 获得当前线程
    Thread t = Thread.currentThread();
    // 通过当前线程获得线程Map
    ThreadLocalMap map = getMap(t);
    // 如果为空则说明还未初始化
    if (map != null) {
        ThreadLocalMap.Entry e = map.getEntry(this);
        if (e != null) {
            @SuppressWarnings("unchecked")
            T result = (T)e.value;
            return result;
        }
    }
    return setInitialValue();
}
// 设置初始数据，如果没有数据则设置
private T setInitialValue() {
    T value = initialValue();
    Thread t = Thread.currentThread();
    ThreadLocalMap map = getMap(t);
    if (map != null)
        map.set(this, value);
    else
        createMap(t, value);
    return value;
}
// 设置数据
public void set(T value) {
    Thread t = Thread.currentThread();
    ThreadLocalMap map = getMap(t);
    if (map != null)
        map.set(this, value);
    else
        createMap(t, value);
}
void createMap(Thread t, T firstValue) {
      t.threadLocals = new ThreadLocalMap(this, firstValue);
  }
  // 删除数据
  public void remove() {
    ThreadLocalMap m = getMap(Thread.currentThread());
    if (m != null)
        m.remove(this);
}
//获得线程Map
ThreadLocalMap getMap(Thread t) {
     return t.threadLocals;
 }
```
## 实践
### 问题
当统计用户在线人数时，以下代码：
```java
    // 统计人数的数据
    static Long count = 0L;
    // 假设指定接口的++
   @Test
   public void countTest(){
       // 假设执行了数据库的验证用户信息等等的
       count++;
   }
```
> 若使用以上代码进行统计，在并发的情况下会导致数据的不准确。由于CPU时执行一段实践这个线程，再去执行另一个线程，如果出现该线程只是获得值，还未进行加一时，就去执行其他线程，就会导致基础数据已经改变，导致加一失败，所以需要改进代码。

> 首先想到的是加锁:
```java
    // 统计人数的数据
    static Long count = 0L;
    // 假设指定接口的++
    synchronized void _add(){
        // 假设执行了数据库的验证用户信息等等的
       count++;
   }
   @Test
   public void countTest(){
       _add();
   }
```
虽然以上方法能够解决并发问题，但是因为这个加锁需要排队，使得速度大大降低，浪费资源。所以会想到用ThreadLocal。
```java
public static ThreadLocal<Long> count = new ThreadLocal(){
       @Override
       protected Object initialValue() {
           return 0L;
       }
   };

   // 假设指定接口的++
    void _add(){
       // 假设执行了数据库的验证用户信息等等的
       count.set(count.get()+1);
   }
   @Test
   public void countTest(){
       _add();
   }
```
> 虽然这样也会大大减少排队的问题，但是不同的线程会导致获取的值不一致，所以还应该做线程数据的同步。
```java
static HashSet<Val<Long>> set = new HashSet<>();
   public static ThreadLocal<Val<Long>> count = new ThreadLocal() {
       @Override
       protected Object initialValue() {
           Val<Long> val = new Val<>();
           val.set(0L);
           addSet(val);
           return val;
       }
   };

   synchronized static void addSet(Val val) {
       set.add(val);
   }

   // 假设指定接口的++
   void _add() {
       // 假设执行了数据库的验证用户信息等等的
       Val<Long> val = count.get();
       ;
       val.set(0L);
       val.set(val.get() + 1);
   }

   @Test
   public void countTest() {
       _add();
   }
```
> Val类
```java
public class Val<T> {
    T t;
    void set(T t){
        this.t =t;
    }
    T get(){
        return t;
    }
}
```
这样的话，会把排队变成一个线程的排队，而非所有的线程排队，大大节俭排队的花销。当需要统计的时候。把set的值遍历求和即可。这样解决了并发的问题，也不会大量的实践进行排队。
