---
title: Java基础
order: 2
---

```markmap

# Java基础

## 面向对象

## 泛型机制

## 注解机制

## 异常机制

## 反射机制

## SPI 机制

```


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

#### 泛型数组

### 深入理解泛型
Java泛型这个特性是从JDK 1.5才开始加入的，因此为了兼容之前的版本，Java泛型的实现采取了“伪泛型”的策略，即Java在语法上支持泛型，但是在编译阶段会进行所谓的“类型擦除”（Type Erasure），将所有的泛型表示（尖括号中的内容）都替换为具体的类型（其对应的原生态类型），就像完全没有泛型一样。

#### 泛型的擦除原则
- 消除类型参数声明，即删除<>及其包围的部分。
- 根据类型参数的上下界推断并替换所有的类型参数为原生态类型：如果类型参数是无限制通配符或没有上下界限定则替换为Object，如果存在上下界限定则根据子类替换原则取类型参数的最左边限定类型（即父类）。
- 为了保证类型安全，必要时插入强制类型转换代码。
- 自动产生“桥接方法”以保证擦除类型后的代码仍然具有泛型的“多态性”。

#### 如何进行擦除

1. 擦除类定义中的类型参数 - 无限制类型擦除
2. 擦除类定义中的类型参数 - 有限制类型擦除
3. 擦除方法定义中的类型参数

#### 如何证明类型的擦除

#### 如何理解类型擦除后保留的原始类型

#### 如何理解泛型的编译期检查


#### 如何理解泛型的多态--泛型的桥接方法


#### 如何理解基本类型不能作为泛型类型

#### 泛型数组：能不能采用具体的泛型类型进行初始化

#### 泛型数组：如何正确的初始化泛型数组实例

#### 如何理解泛型类中的静态方法和静态变量

#### 如何理解异常中使用泛型

#### 如何获取泛型的参数类型

## 注解机制


### 注解基础
注解是JDK1.5版本开始引入的一个特性，用于对代码进行说明，可以对包、类、接口、字段、方法参数、局部变量等进行注解。
它主要的作用有以下四方面：
- 生成文档，通过代码里标识的元数据生成javadoc文档。
- 编译检查，通过代码里标识的元数据让编译器在编译期间进行检查验证。
- 编译时动态处理，编译时通过代码里标识的元数据动态处理，例如动态生成代码。
- 运行时动态处理，运行时通过代码里标识的元数据动态处理，例如使用反射注入实例。

注解的常见分类：
- Java自带的标准注解，包括@Override、@Deprecated和@SuppressWarnings，分别用于标明重写某个方法、标明某个类或方法过时、标明要忽略的警告，用这些注解标明后编译器就会进行检查。
- 元注解，元注解是用于定义注解的注解，包括@Retention、@Target、@Inherited、@Documented，@Retention用于标明注解被保留的阶段，@Target用于标明注解使用的范围，@Inherited用于标明注解可继承，@Documented用于标明是否生成javadoc文档。
- 自定义注解，可以根据自己的需求定义注解，并可用元注解对自定义注解进行注解。

#### Java自带的标准注解
Java 1.5开始自带的标准注解，包括@Override、@Deprecated和@SuppressWarnings：
- @Override：表示当前的方法定义将覆盖父类中的方法
- @Deprecated：表示代码被弃用，如果使用了被@Deprecated注解的代码则编译器将发出警告
- @SuppressWarnings：表示关闭编译器警告信息


#### 元注解
在JDK 1.5中提供了4个标准的元注解：@Target，@Retention，@Documented，@Inherited, 在JDK 1.8中提供了两个元注解 @Repeatable和@Native

#### 自定义注解

### 深入理解注解

#### Java8提供了哪些新的注解

#### 注解支持继承吗？

#### 注解实现的原理

### 注解的使用场景

#### 配置化到注解化 - 框架的演进

#### 继承实现到注解实现 - Junit3到Junit4

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

### SPI 机制的使用

### SPI 机制的实现原理

[^lishitihuan]: 里式替换原则
