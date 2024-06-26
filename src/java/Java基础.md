---
title: Java基础
order: 2
---

## 面向对象

### 封装

利用抽象数据类型将数据和基于数据的操作封装在一起，使其构成一个不可分割的独立实体。数据被保护在抽象数据类型的内部，尽可能地隐藏内部的细节，只保留一些对外接口使之与外部发生联系。用户无需知道对象内部的细节，但可以通过对象对外提供的接口来访问该对象。
优点：

* ==减少耦合== : 可以独立地开发、测试、优化、使用、理解和修改
* ==减轻维护的负担== : 可以更容易被程序员理解，并且在调试的时候可以不影响其他模块
* ==有效地调节性能== : 可以通过剖析确定哪些模块影响了系统的性能
* ==提高软件的可重用性==
* ==降低了构建大型系统的风险== : 即使整个系统不可用，但是这些独立的模块却有可能是可用的

### 继承

继承实现了 IS-A 关系，例如 Cat 和 Animal 就是一种 IS-A 关系，因此 Cat 可以继承自 Animal，从而获得 Animal 非 private 的属性和方法。
==继承应该遵循里氏替换原则== [^lishitihuan]。，子类对象必须能够替换掉所有父类对象。
Cat 可以当做 Animal 来使用，也就是说可以使用 Animal 引用 Cat 对象。父类引用指向子类对象称为 向上转型 。

### 多态

多态分为编译时多态和运行时多态:

* ==编译时多态==主要指方法的重载
* ==运行时多态==指程序中定义的对象引用所指向的具体类型在运行期间才确定

运行时多态有三个条件:

1. 继承
2. 覆盖(重写)
3. 向上转型

### 重写和重载

#### 重写

重写（Override）是指子类定义了一个与其父类中具有相同名称、参数列表和返回类型的方法，并且子类方法的实现覆盖了父类方法的实现。 即外壳不变，核心重写！
重写规则：

* 参数列表与被重写方法的参数列表必须完全相同。
* 返回类型与被重写方法的返回类型可以不相同，但是必须是父类返回值的派生类（java5 及更早版本返回类型要一样，java7 及更高版本可以不同）。
* 访问权限不能比父类中被重写的方法的访问权限更低。例如：如果父类的一个方法被声明为 public，那么在子类中重写该方法就不能声明为 protected。
* 父类的成员方法只能被它的子类重写。
* 声明为 final 的方法不能被重写。
* 声明为 static 的方法不能被重写，但是能够被再次声明。
* 子类和父类在同一个包中，那么子类可以重写父类所有方法，除了声明为 private 和 final 的方法。
* 子类和父类不在同一个包中，那么子类只能够重写父类的声明为 public 和 protected 的非 final 方法。
* 重写的方法能够抛出任何非强制异常，无论被重写的方法是否抛出异常。但是，重写的方法不能抛出新的强制性异常，或者比被重写方法声明的更广泛的强制性异常，反之则可以。
* 构造方法不能被重写。
* 如果不能继承一个类，则不能重写该类的方法。

#### 重载

重载(overloading) 是在一个类里面，方法名字相同，而参数不同。返回类型可以相同也可以不同。
每个重载的方法（或者构造函数）都必须有一个独一无二的参数类型列表。
最常用的地方就是构造器的重载。
重载规则：

* 被重载的方法必须改变参数列表(参数个数或类型不一样)；
* 被重载的方法可以改变返回类型；
* 被重载的方法可以改变访问修饰符；
* 被重载的方法可以声明新的或更广的检查异常；
* 方法能够在同一个类中或者在一个子类中被重载。
* 无法以返回值类型作为重载函数的区分标准。

## 泛型机制

::: tip 什么是泛型
泛型的本质是为了参数化类型（在不创建新的类型的情况下，通过泛型指定的不同类型来控制形参具体限制的类型）。也就是说在泛型使用过程中，操作的数据类型被指定为一个参数，这种参数类型可以用在类、接口和方法中，分别被称为泛型类、泛型接口、泛型方法。
:::

### 为什么引入泛型

泛型的引入主要是为了提高代码的==复用性==和可读性，通过泛型可以将类型参数化，使得代码更加灵活、更加易于理解和维护。

```java
private static int add(int a, int b) {
    System.out.println(a + "+" + b + "=" + (a + b));
    return a + b;
}

private static float add(float a, float b) {
    System.out.println(a + "+" + b + "=" + (a + b));
    return a + b;
}

private static double add(double a, double b) {
    System.out.println(a + "+" + b + "=" + (a + b));
    return a + b;
}
```

如果没有泛型，要实现不同类型的加法，每种类型都需要重载一个add方法；通过泛型，我们可以复用为一个方法：

```java
private static <T extends Number> double add(T a, T b) {
    System.out.println(a + "+" + b + "=" + (a.doubleValue() + b.doubleValue()));
    return a.doubleValue() + b.doubleValue();
}
```

### 泛型的基本使用

#### 泛型类

* 单元泛型

```java
class Point<T>{         // 此处可以随便写标识符号，T是type的简称
    private T var ;     // var的类型由T指定，即：由外部指定
    public T getVar(){  // 返回值的类型由外部决定
        return var ;
    }
    public void setVar(T var){  // 设置的类型也由外部决定
        this.var = var ;
    }
}
public class GenericsDemo06{
    public static void main(String args[]){
        Point<String> p = new Point<String>() ;     // 里面的var类型为String类型
        p.setVar("it") ;                            // 设置字符串
        System.out.println(p.getVar().length()) ;   // 取得字符串的长度
    }
}

```

* 多参数泛型

```java
class Notepad<K,V>{       // 此处指定了两个泛型类型
    private K key ;     // 此变量的类型由外部决定
    private V value ;   // 此变量的类型由外部决定
    public K getKey(){
        return this.key ;
    }
    public V getValue(){
        return this.value ;
    }
    public void setKey(K key){
        this.key = key ;
    }
    public void setValue(V value){
        this.value = value ;
    }
}
public class GenericsDemo09{
    public static void main(String args[]){
        Notepad<String,Integer> t = null ;        // 定义两个泛型类型的对象
        t = new Notepad<String,Integer>() ;       // 里面的key为String，value为Integer
        t.setKey("汤姆") ;        // 设置第一个内容
        t.setValue(20) ;            // 设置第二个内容
        System.out.print("姓名；" + t.getKey()) ;      // 取得信息
        System.out.print("，年龄；" + t.getValue()) ;       // 取得信息

    }
}
```

#### 泛型接口

```java
interface Info<T>{        // 在接口上定义泛型
    public T getVar() ; // 定义抽象方法，抽象方法的返回值就是泛型类型
}
class InfoImpl<T> implements Info<T>{   // 定义泛型接口的子类
    private T var ;             // 定义属性
    public InfoImpl(T var){     // 通过构造方法设置属性内容
        this.setVar(var) ;
    }
    public void setVar(T var){
        this.var = var ;
    }
    public T getVar(){
        return this.var ;
    }
}
public class GenericsDemo24{
    public static void main(String arsg[]){
        Info<String> i = null;        // 声明接口对象
        i = new InfoImpl<String>("汤姆") ;  // 通过子类实例化对象
        System.out.println("内容：" + i.getVar()) ;
    }
}
```

#### 泛型方法

* 泛型方法定义

![泛型方法定义](https://zhangjiahao-prd.oss-cn-beijing.aliyuncs.com/uPic/rc3hWT.png)

* 方法调用

![泛型方法调用](https://zhangjiahao-prd.oss-cn-beijing.aliyuncs.com/uPic/5e5qp8.png)

#### 泛型的上下限

上限：

```java
class Info<T extends Number>{    // 此处泛型只能是数字类型
    private T var ;        // 定义泛型变量
    public void setVar(T var){
        this.var = var ;
    }
    public T getVar(){
        return this.var ;
    }
    public String toString(){    // 直接打印
        return this.var.toString() ;
    }
}
public class demo1{
    public static void main(String args[]){
        Info<Integer> i1 = new Info<Integer>() ;        // 声明Integer的泛型对象
    }
}

```

下限:

```java
class Info<T>{
    private T var ;        // 定义泛型变量
    public void setVar(T var){
        this.var = var ;
    }
    public T getVar(){
        return this.var ;
    }
    public String toString(){    // 直接打印
        return this.var.toString() ;
    }
}
public class GenericsDemo21{
    public static void main(String args[]){
        Info<String> i1 = new Info<String>() ;        // 声明String的泛型对象
        Info<Object> i2 = new Info<Object>() ;        // 声明Object的泛型对象
        i1.setVar("hello") ;
        i2.setVar(new Object()) ;
        fun(i1) ;
        fun(i2) ;
    }
    public static void fun(Info<? super String> temp){    // 只能接收String或Object类型的泛型，String类的父类只有Object类
        System.out.print(temp + ", ") ;
    }
}
```

```java
<?> 无限制通配符
<? extends E> extends 关键字声明了类型的上界，表示参数化的类型可能是所指定的类型，或者是此类型的子类
<? super E> super 关键字声明了类型的下界，表示参数化的类型可能是指定的类型，或者是此类型的父类

// 使用原则《Effictive Java》
// 为了获得最大限度的灵活性，要在表示 生产者或者消费者 的输入参数上使用通配符，使用的规则就是：生产者有上限、消费者有下限
1. 如果参数化类型表示一个 T 的生产者，使用 < ? extends T>;
2. 如果它表示一个 T 的消费者，就使用 < ? super T>；
3. 如果既是生产又是消费，那使用通配符就没什么意义了，因为你需要的是精确的参数类型。
```

#### 泛型数组

```java
List<String>[] list11 = new ArrayList<String>[10]; //编译错误，非法创建
List<String>[] list12 = new ArrayList<?>[10]; //编译错误，需要强转类型
List<String>[] list13 = (List<String>[]) new ArrayList<?>[10]; //OK，但是会有警告
List<?>[] list14 = new ArrayList<String>[10]; //编译错误，非法创建
List<?>[] list15 = new ArrayList<?>[10]; //OK
List<String>[] list6 = new ArrayList[10]; //OK，但是会有警告
```

### 深入理解泛型

::: tip 什么是泛型擦除
Java泛型这个特性是从JDK 1.5才开始加入的，因此为了兼容之前的版本，Java泛型的实现采取了“伪泛型”的策略，即Java在语法上支持泛型，但是在编译阶段会进行所谓的“类型擦除”（Type Erasure），将所有的泛型表示（尖括号中的内容）都替换为具体的类型（其对应的原生态类型），就像完全没有泛型一样。
:::

#### 泛型的擦除原则

* 消除类型参数声明，即删除<>及其包围的部分。
* 根据类型参数的上下界推断并替换所有的类型参数为原生态类型：如果类型参数是无限制通配符或没有上下界限定则替换为Object，如果存在上下界限定则根据子类替换原则取类型参数的最左边限定类型（即父类）。
* 为了保证类型安全，必要时插入强制类型转换代码。
* 自动产生“桥接方法”以保证擦除类型后的代码仍然具有泛型的“多态性”。

#### 如何进行擦除

* 擦除类定义中的类型参数 - 无限制类型擦除

![无限制类型擦除](https://zhangjiahao-prd.oss-cn-beijing.aliyuncs.com/uPic/i5JSKe.png)

* 擦除类定义中的类型参数 - 有限制类型擦除

![有限制类型擦除](https://zhangjiahao-prd.oss-cn-beijing.aliyuncs.com/uPic/FODbxB.png)

* 擦除方法定义中的类型参数

![擦除方法定义中的类型参数](https://zhangjiahao-prd.oss-cn-beijing.aliyuncs.com/uPic/fwUrXk.png)

#### 如何理解泛型的多态--泛型的桥接方法

#### 如何理解基本类型不能作为泛型类型

因为当类型擦除后，原始类型变为Object，但是Object类型不能存储int值，只能引用Integer的值。

#### 如何理解泛型类型不能实例化？

因为在 Java 编译期没法确定泛型参数化类型，也就找不到对应的类字节码文件，所以自然就不行了，此外由于T 被擦除为 Object，如果可以 new T() 则就变成了 new Object()，失去了本意。    
如果我们确实需要实例化一个泛型，应该如何做呢？可以通过反射实现：

```java
static <T> T newTclass (Class < T > clazz) throws InstantiationException, IllegalAccessException {
    T obj = clazz.newInstance();
    return obj;
}
```

#### 如何获取泛型的参数类型

可以通过反射进行获取参数的实际类型，编译阶段无法判定类型。

## 注解机制

### 注解基础

注解是JDK1.5版本开始引入的一个特性，用于对代码进行说明，可以对包、类、接口、字段、方法参数、局部变量等进行注解。
它主要的作用有以下四方面：

* ==生成文档==，通过代码里标识的元数据生成javadoc文档。
* ==编译检查==，通过代码里标识的元数据让编译器在编译期间进行检查验证。
* ==编译时动态处理==，编译时通过代码里标识的元数据动态处理，例如动态生成代码。
* ==运行时动态处理==，运行时通过代码里标识的元数据动态处理，例如使用反射注入实例。

注解的常见分类：

* Java自带的标准注解，包括@Override、@Deprecated和@SuppressWarnings，分别用于标明重写某个方法、标明某个类或方法过时、标明要忽略的警告，用这些注解标明后编译器就会进行检查。
* 元注解，元注解是用于定义注解的注解，包括@Retention、@Target、@Inherited、@Documented，@Retention用于标明注解被保留的阶段，@Target用于标明注解使用的范围，@Inherited用于标明注解可继承，@Documented用于标明是否生成javadoc文档。
* 自定义注解，可以根据自己的需求定义注解，并可用元注解对自定义注解进行注解。

#### Java自带的标准注解

Java 1.5开始自带的标准注解，包括@Override、@Deprecated和@SuppressWarnings：

* @Override：表示当前的方法定义将覆盖父类中的方法
* @Deprecated：表示代码被弃用，如果使用了被@Deprecated注解的代码则编译器将发出警告
* @SuppressWarnings：表示关闭编译器警告信息

#### 元注解

在JDK 1.5中提供了4个标准的元注解：

* @Target：描述注解的使用范围（即：被修饰的注解可以用在什么地方）。
* @Retention：描述注解保留的时间范围（即：被描述的注解在它所修饰的类中可以被保留到何时）。
* @Documented：描述在使用 javadoc 工具为类生成帮助文档时是否要保留其注解信息。
* @Inherited：描述注解是否可以被子类继承。

在JDK 1.8中提供了两个元注解：

* @@Repeatable：加上@Repeatable, 指向存储注解Authorities，在使用时候，直接可以重复使用Authority注解。
* @Native：使用 @Native 注解修饰成员变量，则表示这个变量可以被本地代码引用，常常被代码生成工具使用。

#### 自定义注解

### 深入理解注解

#### Java8提供了哪些新的注解

#### 注解支持继承吗？

#### 注解实现的原理

* [java注解的本质以及注解的底层实现原理](https://blog.csdn.net/qq_20009015/article/details/106038023)
* [annotation-processing](https://www.race604.com/annotation-processing/)

#### 自定义注解和AOP - 通过切面实现解耦

## 异常机制

### 异常的层次结构

### 异常基础

### 异常实践

### 深入理解异常

## 反射机制

### 反射基础

### 反射使用

### 反射机制执行的流程

## SPI 机制

### SPI 机制介绍

::: tip 什么是SPI
SPI（Service Provider Interface），是JDK内置的一种 服务提供发现机制，可以用来启用框架扩展和替换组件，主要是被框架的开发人员使用，比如java.sql. Driver接口，其他不同厂商可以针对同一接口做出不同的实现，MySQL和PostgreSQL都有不同的实现提供给用户，而Java的SPI机制可以为某个接口寻找服务实现。Java中SPI机制主要思想是将装配的控制权移到程序之外，在模块化设计中这个机制尤其重要，其核心思想就是==解耦==。
:::
SPI整体机制图如下：

![SPI整体机制图](https://zhangjiahao-prd.oss-cn-beijing.aliyuncs.com/uPic/romWbY.png)

当服务的提供者提供了一种接口的实现之后，需要在classpath下的META-INF/services/目录里创建一个以服务接口命名的文件，这个文件里的内容就是这个接口的具体的实现类。当其他的程序需要这个服务的时候，就可以通过查找这个jar包（一般都是以jar包做依赖）的META-INF/services/中的配置文件，配置文件中有接口的具体实现类名，可以根据这个类名进行加载实例化，就可以使用该服务了。JDK中查找服务的实现的工具类是：java.util. ServiceLoader。

### SPI 机制的使用

### SPI 机制的实现原理

[^lishitihuan]: 子类型（subtype）必须能够替换掉他们的基类型（base type）。
