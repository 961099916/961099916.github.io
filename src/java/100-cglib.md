---
title: JDK 动态代理和 CGLIB 代理
order: 101
---

## 什么是代理

代理模式（Proxy Pattern）给某一个对象提供一个代理，并由代理对象控制原对象的引用。代理对象在客户端和目标对象之间起到中介作用。即使用时通过中介使用，具体到对象原对象的操作则是需要代理对象处理的。

## JDK 动态代理

自Java 1.3以后，Java提供了动态代理技术，允许开发者在运行期创建接口的代理实例，后来这项技术被用到了Spring的很多地方。JDK动态代理主要涉及java.lang.reflect包下边的两个类：Proxy和InvocationHandler。其中，InvocationHandler是一个接口，可以通过实现该接口定义横切逻辑（如：我们在方法执行前后打印的日志，本文只是为了演示，实际的应用一般不会只是简单的打印日志的），并通过反射机制调用目标类的代码，动态地将横切逻辑和业务逻辑编织在一起。

### 实例

- 代理的接口

```java
public interface Parent {

    void sayHell(String s);
}
```

- 代理的对象类

```java
public class Children implements Parent{
    @Override
    public void sayHell(String s) {
        System.out.println("children" + s);
    }
}
```

- 创建代理类

```java
public class ProxyHandler implements InvocationHandler {
    private Object o;

    public ProxyHandler(Object o) {
        this.o = o;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("开始事务");
        method.invoke(o, args);
        System.out.println("结束事务");
        return null;
    }
}
```

- 测试类

```java
public class ProxyTest {
    public static void main(String[] args) {
        ProxyHandler handler = new ProxyHandler(new Children());
        Parent parent = (Parent) Proxy.newProxyInstance(
                Children.class.getClassLoader(),
                new Class[]{Parent.class}, handler);
        parent.sayHell("hello");

    }
}
```

- 结果

```
开始事务
childrenhello
结束事务
```

### JDK动态代理步骤

- 拿到被代理对象的引用，并且通过反射获取到它的所有的接口。
- 通过JDK Proxy类重新生成一个新的类，同时新的类要实现被代理类所实现的所有的接口。
- 动态生成 Java 代码，把新加的业务逻辑方法由一定的逻辑代码去调用。
- 编译新生成的 Java 代码.class。
- 将新生成的Class文件重新加载到 JVM 中运行。

所以说JDK动态代理的核心是通过重写被代理对象所实现的接口中的方法来重新生成代理类来实现的，那么假如被代理对象没有实现接口呢？那么这时候就需要CGLIB动态代理了。

## CGLIB 代理

CGLIB(Code Generation Library)是一个基于ASM的字节码生成库，它允许我们在运行时对字节码进行修改和动态生成。CGLIB通过继承方式实现代理，在子类中采用方法拦截的技术拦截所有父类方法的调用并顺势织入横切逻辑。

### 实例

- 代理的类

```java
public class Hello {

    public  void sayHell(String s) {
        System.out.println("Hello " + s);
    }
}
```

- 创建代理类

```java
public class HelloProxy implements MethodInterceptor{
    private Enhancer enhancer = new Enhancer();
    public <T> T getProxy(Class<T> clazz){
        //设置需要创建子类的类
        enhancer.setSuperclass(clazz);
        enhancer.setCallback(this);
        //通过字节码技术动态创建子类实例
        return (T) enhancer.create();
    }

    @Override
    public Object intercept(Object obj, Method method, Object[] args, MethodProxy proxy) throws Throwable {
        System.out.println("开始事务");
        proxy.invokeSuper(obj,args);
        System.out.println("结束事务");
        return null;
    }
}
```

- 测试类

```java
public class HelloProxyTest {

    public static void main(String[] args) {
        HelloProxy helloProxy = new HelloProxy();
        Hello hello = (Hello) helloProxy.getProxy(Hello.class);
        hello.sayHell("hello");
    }
}
```

- 结果

```
开始事务
Hello hello
结束事务
```

## 对比

### 实现原理

- JDK动态代理具体实现原理：

   - 核心是通过重写被代理对象所实现的接口中的方法来重新生成代理类来实现的
- CGLib动态代理：

   - 利用ASM开源包，对代理对象类的class文件加载进来，通过修改其字节码生成子类来处理。

### 面向

- JDK动态代理是面向接口的。
- CGLib动态代理是通过字节码底层继承要代理类来实现，因此如果被代理类被final关键字所修饰，会失败。

### 使用注意：

- 如果要被代理的对象是个实现类，那么Spring会使用JDK动态代理来完成操作（Spirng默认采用JDK动态代理实现机制）；
- 如果要被代理的对象不是个实现类那么，Spring会强制使用CGLib来实现动态代理。

### 各自局限：

- JDK的动态代理机制只能代理实现了接口的类，而不能实现接口的类就不能实现JDK的动态代理。
- cglib是针对类来实现代理的，他的原理是对指定的目标类生成一个子类，并覆盖其中方法实现增强，但因为采用的是继承，所以不能对final修饰的类进行代理。

### 性能对比

关于两者之间的性能的话，网上有人对于不通版本的jdk进行测试，经过多次试验，测试结果大致是这样的，在1.6和1.7的时候，JDK动态代理的速度要比CGLib动态代理的速度要慢，但是并没有教科书上的10倍差距，在JDK1.8的时候，JDK动态代理的速度已经比CGLib动态代理的速度快很多了，但是JDK动态代理和CGLIB动态代理的适用场景还是不一样的哈！
