---
title: mybatis
order: 2
---

## 初步了解



### 总体架构设计



Mybatis 整体框架如下：

<img src="https://zhangjiahao-prd.oss-cn-beijing.aliyuncs.com/uPic/kJIdrO.jpg" alt="kJIdrO" style="zoom:50%;" />

### 接口层



MyBatis 和数据库的交互有两种方式：



- 使用传统的 MyBatis 提供的 API；

- 使用 Mapper 接口；



#### 使用传统的 MyBatis 提供的 API



这是传统的传递 Statement Id 和查询参数给 SqlSession 对象，使用 SqlSession 对象完成和数据库的交互；MyBatis 提供了非常方便和简单的 API，供用户实现对数据库的增删改查数据操作，以及对数据库连接信息和 MyBatis 自身配置信息的维护操作。

<img src="https://zhangjiahao-prd.oss-cn-beijing.aliyuncs.com/uPic/jFy4Pk.jpg" alt="jFy4Pk" style="zoom:50%;" />



#### 使用 Mapper 接口



MyBatis 将配置文件中的每一个`<mapper>` 节点抽象为一个 Mapper 接口，而这个接口中声明的方法和跟`<mapper>` 节点中的`<select|update|delete|insert>` 节点项对应，即`<select|update|delete|insert>` 节点的 id 值为 Mapper 接口中的方法名称，parameterType 值表示 Mapper 对应方法的入参类型，而 resultMap 值则对应了 Mapper 接口表示的返回值类型或者返回结果集的元素类型。



<img src="https://zhangjiahao-prd.oss-cn-beijing.aliyuncs.com/uPic/gqJKeP.jpg" alt="gqJKeP" style="zoom:50%;" />



根据 MyBatis 的配置规范配置好后，通过 SqlSession.getMapper(XXXMapper.class)方法，MyBatis 会根据相应的接口声明的方法信息，通过动态代理机制生成一个 Mapper 实例，我们使用 Mapper 接口的某一个方法时，MyBatis 会根据这个方法的方法名和参数类型，确定 Statement Id，底层还是通过 SqlSession.select("statementId",parameterObject);或者 SqlSession.update("statementId",parameterObject); 等等来实现对数据库的操作， MyBatis 引用 Mapper 接口这种调用方式，纯粹是为了满足面向接口编程的需要。（其实还有一个原因是在于，面向接口的编程，使得用户在接口上可以使用注解来配置 SQL 语句，这样就可以脱离 XML 配置文件，实现“0 配置”）。



### 数据处理层

数据处理层可以说是 MyBatis 的核心，从大的方面上讲，它要完成两个功能：

- 通过传入参数构建动态 SQL 语句；

- SQL 语句的执行以及封装查询结果集成`List<E>`

#### 通过传入参数构建动态 SQL 语句；

动态语句生成可以说是 MyBatis 框架非常优雅的一个设计，MyBatis 通过传入的参数值，使用 Ognl 来动态地构造 SQL 语句，使得 MyBatis 有很强的灵活性和扩展性。

参数映射指的是对于 java 数据类型和 jdbc 数据类型之间的转换：这里有包括两个过程：查询阶段，我们要将 java 类型的数据，转换成 jdbc 类型的数据，通过 preparedStatement.setXXX() 来设值；另一个就是对 resultset 查询结果集的 jdbcType 数据转换成 java 数据类型。

#### SQL 语句的执行以及封装查询结果集成`List<E>`

动态 SQL 语句生成之后，MyBatis 将执行 SQL 语句，并将可能返回的结果集转换成`List<E>` 列表。MyBatis 在对结果集的处理中，支持结果集关系一对多和多对一的转换，并且有两种支持方式，一种为嵌套查询语句的查询，还有一种是嵌套结果集的查询。

### 框架支撑层

- 事务管理机制

事务管理机制对于 ORM 框架而言是不可缺少的一部分，事务管理机制的质量也是考量一个 ORM 框架是否优秀的一个标准。

- 连接池管理机制

由于创建一个数据库连接所占用的资源比较大， 对于数据吞吐量大和访问量非常大的应用而言，连接池的设计就显得非常重要。

- 缓存机制

为了提高数据利用率和减小服务器和数据库的压力，MyBatis 会对于一些查询提供会话级别的数据缓存，会将对某一次查询，放置到 SqlSession 中，在允许的时间间隔内，对于完全相同的查询，MyBatis 会直接将缓存结果返回给用户，而不用再到数据库中查找。

- SQL 语句的配置方式

传统的 MyBatis 配置 SQL 语句方式就是使用 XML 文件进行配置的，但是这种方式不能很好地支持面向接口编程的理念，为了支持面向接口的编程，MyBatis 引入了 Mapper 接口的概念，面向接口的引入，对使用注解来配置 SQL 语句成为可能，用户只需要在接口上添加必要的注解即可，不用再去配置 XML 文件了，但是，目前的 MyBatis 只是对注解配置 SQL 语句提供了有限的支持，某些高级功能还是要依赖 XML 配置文件配置 SQL 语句。

### 引导层

引导层是配置和启动 MyBatis 配置信息的方式。MyBatis 提供两种方式来引导 MyBatis ：基于 XML 配置文件的方式和基于 Java API 的方式。

#### 主要构件及其相互关系

<img src="https://zhangjiahao-prd.oss-cn-beijing.aliyuncs.com/uPic/1MVyxT.jpg" alt="1MVyxT" style="zoom:50%;" />



主要的核心部件解释如下：

- `SqlSession` 作为 MyBatis 工作的主要顶层 API，表示和数据库交互的会话，完成必要数据库增删改查功能

- `Executor` MyBatis 执行器，是 MyBatis 调度的核心，负责 SQL 语句的生成和查询缓存的维护

- `StatementHandler` 封装了 JDBC Statement 操作，负责对 JDBC statement 的操作，如设置参数、将 Statement 结果集转换成 List 集合。

- `ParameterHandler` 负责对用户传递的参数转换成 JDBC Statement 所需要的参数，

- `ResultSetHandler` 负责将 JDBC 返回的 ResultSet 结果集对象转换成 List 类型的集合；

- `TypeHandler` 负责 java 数据类型和 jdbc 数据类型之间的映射和转换

- `MappedStatement` MappedStatement 维护了一条`<select|update|delete|insert>`节点的封装，

- `SqlSource` 负责根据用户传递的 parameterObject，动态地生成 SQL 语句，将信息封装到 BoundSql 对象中，并返回

- `BoundSql` 表示动态生成的 SQL 语句以及相应的参数信息

- `Configuration` MyBatis 所有的配置信息都维持在 Configuration 对象之中。

## 流程简解



### `/src/main/resources/mybatis-config.xml`



```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<!-- 根标签 -->
<configuration>
    <properties>
        <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
        <property name="url"
                  value="jdbc:mysql://localhost:3306/test?useUnicode=true&amp;characterEncoding=UTF8&amp;useSSL=false&amp;autoReconnect=true"/>
        <property name="username" value="root"/>
        <property name="password" value="123456"/>
    </properties>

    <!-- 环境，可以配置多个，default：指定采用哪个环境 -->
    <environments default="test">
        <environment id="test">
            <!-- 事务管理器，JDBC类型的事务管理器 -->
            <transactionManager type="JDBC"/>
            <!-- 数据源，池类型的数据源 -->
            <dataSource type="POOLED">
                <property name="driver" value="${driver}"/> <!-- 配置了properties，所以可以直接引用 -->
                <property name="url" value="${url}"/>
                <property name="username" value="${username}"/>
                <property name="password" value="${password}"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <mapper resource="TeacherMapper.xml"/>
    </mappers>
</configuration>
```



### `/src/main/resources/TeacherMapper.xml`



```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!-- mapper:根标签，namespace：命名空间，随便写，一般保证命名空间唯一 -->
<mapper namespace="TeacherMapper">
    <!-- statement，内容：sql语句。id：唯一标识，随便写，在同一个命名空间下保持唯一
       resultType：sql语句查询结果集的封装类型,tb_user即为数据库中的表
     -->
    <select id="selectTest" resultType="org.apache.ibatis.test.Teacher">
        select *
        from teacher
        where id = #{id}
    </select>
</mapper>
```



### `/src/main/resources/log4j.properties`



```properties
log4j.rootLogger=DEBUG, stdout
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%5p [%t] - %m%n
```



### `/src/main/java/org/apache/ibatis/test/Teacher.java`



```java
package org.apache.ibatis.test;


public class Teacher {
    private Long id;
    private String name;

    public Long getId() {
        return id;
    }
 
    public void setId(Long id) {
        this.id = id;
    }
 
    public String getName() {
        return name;
    }
 
    public void setName(String name) {
        this.name = name;
    }
 
    @Override
    public String toString() {
        return "Teacher{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
```



### `/src/main/java/org/apache/ibatis/test/Test.java`



```java
package org.apache.ibatis.test;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;

public class Test {
    public static void main(String[] args) throws IOException {
        // 指定全局配置文件
        String resource = "mybatis-config.xml";
        // 读取配置文件
        InputStream inputStream = Resources.getResourceAsStream(resource);
        // 构建sqlSessionFactory
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        // 获取sqlSession
        SqlSession sqlSession = sqlSessionFactory.openSession();
        // 操作CRUD，第一个参数：指定statement，规则：命名空间+“.”+statementId
        // 第二个参数：指定传入sql的参数：这里是用户id
        Teacher test = sqlSession.selectOne("TeacherMapper.selectTest", 1);
        System.out.println(test.getName());
    }
}
```



### 流程

1. 通过 `mybatis-config.xml` 进行初始化创建出 `SqlSessionFactory`。其内部是通过创建`XMLConfigBuilder`对象，然后自己进行解析 `XML`文件，把文件内容解析封装为`Configuration`对象，最后由`SqlSessionFactory`进行封装为`SqlSessionFactory`对象来完成`SqlSessionFactory`的创建。

## 包详解
### `transaction`包

![](https://zhangjiahao-blog.oss-cn-beijing.aliyuncs.com/picgo/202305241127435.png#id=bO1sb&originHeight=396&originWidth=346&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

#### 背景知识

- 工厂模式

#### 讲解

这里并没有特别需要说的东西，只是基础的事务管理。但是这里很好的实现了`transaction`和`datasource`包的隔离，`transaction`通过`datasource`抽象出来的接口实现了业务隔离，事务管理器可以通过配置文件选择对应的数据源进行管理。
### `jdbc`包

#### 背景知识

- 模版模式
- 易用性

#### 讲解

##### 模版模式

某些类通用的一些处理方法一致，但是处理对象可能存在不同，此时可以使用模版方法，抽取父类编写通用处理方法，子类只需实现获取对象的方法即可。

```java
public class SQL extends AbstractSQL<SQL> {

    @Override
    public SQL getSelf() {
        return this;
    }

}
public abstract class AbstractSQL<T> {

    private static final String AND = ") \nAND (";
    private static final String OR = ") \nOR (";

    private final SQLStatement sql = new SQLStatement();

    public abstract T getSelf();

    public T UPDATE(String table) {
        sql().statementType = SQLStatement.StatementType.UPDATE;
        sql().tables.add(table);
        return getSelf();
    }

    public T SET(String sets) {
        sql().sets.add(sets);
        return getSelf();
    }
		......
}
```

以上代码可知：

1. 若用户需要自定`SQL` 如  `ExplainSQL`，从而进行性能调优，此时只需要继承 `AbstractSQL`即可，而无需编写原方法。

##### 易用性

为了用户使用方便和构建 `SQL`的直观性，`AbstractSQL`命名采用了全大写的模式，以此让用户更加易用。

![](https://zhangjiahao-blog.oss-cn-beijing.aliyuncs.com/picgo/202305221521914.png#id=Lbhr7&originHeight=973&originWidth=384&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

##### `SqlRunner`类

```java
    public int insert(String sql, Object... args) throws SQLException {
        PreparedStatement ps;
        if (useGeneratedKeySupport) {
            ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
        } else {
            ps = connection.prepareStatement(sql);
        }

        try {
            setParameters(ps, args);
            ps.executeUpdate();
            if (useGeneratedKeySupport) {
                List<Map<String, Object>> keys = getResults(ps.getGeneratedKeys());
                if (keys.size() == 1) {
                    Map<String, Object> key = keys.get(0);
                    Iterator<Object> i = key.values().iterator();
                    if (i.hasNext()) {
                        Object genkey = i.next();
                        if (genkey != null) {
                            try {
                                return Integer.parseInt(genkey.toString());
                            } catch (NumberFormatException e) {
                                //ignore, no numeric key support
                            }
                        }
                    }
                }
            }
            return NO_GENERATED_KEY;
        } finally {
            try {
                ps.close();
            } catch (SQLException e) {
                //ignore
            }
        }
    }

    public int update(String sql, Object... args) throws SQLException {
        PreparedStatement ps = connection.prepareStatement(sql);
        try {
            setParameters(ps, args);
            return ps.executeUpdate();
        } finally {
            try {
                ps.close();
            } catch (SQLException e) {
                //ignore
            }
        }
    }
```

此类在`Mybatis`中没有任何的使用，此类应该只是为了提供给用户，让用户可以自定义执行相关 `SQL`，分析其方法本质为原始`JDBC`相关操作流程。

##### `ScriptRunner`类

```java
   private void executeFullScript(Reader reader) {
        StringBuilder script = new StringBuilder();
        try {
            BufferedReader lineReader = new BufferedReader(reader);
            String line;
            while ((line = lineReader.readLine()) != null) {
                script.append(line);
                script.append(LINE_SEPARATOR);
            }
            String command = script.toString();
            println(command);
            executeStatement(command);
            commitConnection();
        } catch (Exception e) {
            String message = "Error executing: " + script + ".  Cause: " + e;
            printlnError(message);
            throw new RuntimeSqlException(message, e);
        }
    }

    private void executeLineByLine(Reader reader) {
        StringBuilder command = new StringBuilder();
        try {
            BufferedReader lineReader = new BufferedReader(reader);
            String line;
            while ((line = lineReader.readLine()) != null) {
                handleLine(command, line);
            }
            commitConnection();
            checkForMissingLineTerminator(command);
        } catch (Exception e) {
            String message = "Error executing: " + command + ".  Cause: " + e;
            printlnError(message);
            throw new RuntimeSqlException(message, e);
        }
    }
    private void handleLine(StringBuilder command, String line) throws SQLException {
        String trimmedLine = line.trim();
        if (lineIsComment(trimmedLine)) {
            Matcher matcher = DELIMITER_PATTERN.matcher(trimmedLine);
            if (matcher.find()) {
                delimiter = matcher.group(5);
            }
            println(trimmedLine);
        } else if (commandReadyToExecute(trimmedLine)) {
            command.append(line.substring(0, line.lastIndexOf(delimiter)));
            command.append(LINE_SEPARATOR);
            println(command);
            executeStatement(command.toString());
            command.setLength(0);
        } else if (trimmedLine.length() > 0) {
            command.append(line);
            command.append(LINE_SEPARATOR);
        }
    }
```

此类的核心方法如上，可看出其本质和`SqlRunner`类一致。
### `datasource`包

![](https://zhangjiahao-blog.oss-cn-beijing.aliyuncs.com/picgo/202305241107709.png#id=XQR5r&originHeight=486&originWidth=404&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

根据包结构可看出，`Mybatis`抽象出`DataSourceFactory`进行生成对应的`DataSource`。可以知道`DataSourceFactory`的设计是采用了工厂模式。

#### 背景知识

- 数据库连接池
- JNDI
- 设计模式：工厂模式、模版模式、代理模式

#### 讲解

##### 数据库连接池

数据库在建立连接的时候需要走 TCP 的三次握手，如果在三次握手之后却只进行了一次查询这就会浪费较多的资源，所以想到了池化思想，对数据库连接进行池化，减少数据库连接的创建和销毁的资源浪费。
数据库连接池的本质就是建立一个集合进行存储创建的连接，当有需要查询的时候从缓存的连接中返回一个，等使用完毕不再进行销毁而是再次放回到缓存中，此时就需要对连接部分方法的重写，但是 `Mybatis`是通过代理进行处理。代码如下：

```java
       @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        String methodName = method.getName();
        // 当调用的方法是close 的时候不去进行真正的关闭，而是将连接放回连接池中
        if (CLOSE.hashCode() == methodName.hashCode() && CLOSE.equals(methodName)) {
            dataSource.pushConnection(this);
            return null;
        } else {
            try {
                if (!Object.class.equals(method.getDeclaringClass())) {
                    // issue #579 toString() should never fail
                    // throw an SQLException instead of a Runtime
                    checkConnection();
                }
                return method.invoke(realConnection, args);
            } catch (Throwable t) {
                throw ExceptionUtil.unwrapThrowable(t);
            }
        }
    }
```

##### JNDI

TODO 待了解

##### 设计模式

-  即使工厂模式，也是模版模式 
-  代理模式 
```java
    public PooledConnection(Connection connection, PooledDataSource dataSource) {
    this.hashCode = connection.hashCode();
    this.realConnection = connection;
    this.dataSource = dataSource;
    this.createdTimestamp = System.currentTimeMillis();
    this.lastUsedTimestamp = System.currentTimeMillis();
    this.valid = true;
    // 创建 connection 的代理对象，进行代理所有的请求
    this.proxyConnection = (Connection) Proxy.newProxyInstance(Connection.class.getClassLoader(), IFACES, this);
}
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
    String methodName = method.getName();
    // 拦截调用close方法，不去进行真正的关闭，而是将连接放回连接池中
    if (CLOSE.hashCode() == methodName.hashCode() && CLOSE.equals(methodName)) {
        dataSource.pushConnection(this);
        return null;
    } else {
        try {
            if (!Object.class.equals(method.getDeclaringClass())) {
                // issue #579 toString() should never fail
                // throw an SQLException instead of a Runtime
                checkConnection();
            }
            return method.invoke(realConnection, args);
        } catch (Throwable t) {
            throw ExceptionUtil.unwrapThrowable(t);
        }
    }
}
```

### `exception`包

下图是`Mybatis`中异常的关系图：

![](https://zhangjiahao-blog.oss-cn-beijing.aliyuncs.com/picgo/202305221420554.png#id=GNQQU&originHeight=1228&originWidth=6562&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

#### 背景知识

- 工厂模式
- 异常的封装

#### 讲解

#### 工厂模式

```java
public class ExceptionFactory {

    private ExceptionFactory() {
        // Prevent Instantiation
    }

    public static RuntimeException wrapException(String message, Exception e) {
        return new PersistenceException(ErrorContext.instance().message(message).cause(e).toString(), e);
    }

}
```

- 私有构造函数：导致该工厂无法创建出对应的对象
- 静态`wrapException`方法，用于通过异常信息和异常类型进行封装异常为`Mybatis`中的异常类型。全局通过`ExceptionFactory.wrapException()`进行生产出对应的异常对象

#### 异常类型

-  IbatisException：`Mybatis`中最高的异常，但是直接继承该类的子类只有`PersistenceException`，而且该类也添加了`@Deprecated`说明以后可能去除。 
-  PersistenceException： 译为持久化异常。`Mybatis`对应是持久化框架，后期可能该异常类型为`Mybatis`所有异常的父类。 
-  TooManyResultsException：译为多条返回结果异常。用处为`selectOne`却返回多条记录时所抛出的异常。 
-  TypeException: 译为类型异常。当 `Mybatis` 中需要类型转化时，若转换失败则会抛出该异常。 
-  CacheException: 译为缓存异常。当`Mybatis`读取缓存中数据出现问题时则会抛出该异常。 
-  ParsingException: 译为解析异常。当前代码未看到使用。 
-  ScriptingException: 译为脚本异常。 
-  ResultMapException: 译为结果映射异常。在结果转换为对应类型的对象时，若转换失败则会抛出异常。 
-  DataSourceException: 译为数据源异常。在初始化数据源时若出现错误则会抛出该异常。 
-  TransactionException: 译为事务异常。在给`connection`开启事务时若失败则会抛出该异常。 
-  BuilderException: 译为建造异常。在建造对象失败时会抛出该异常。 
-  SqlSessionException: 译为`SqlSession`的异常。基本只会在`SqlSessionManager`中使用，主要是`SqlSession`使用过程中的异常。 
-  ReflectionException: 译为反射异常。基本只会在反射使用时会抛出该异常。 
-  ExecutorException: 译为执行器异常。会在线程操作数据库的时候抛出该异常。 
-  BatchExecutorException：译为批量执行器异常。会在线程批量操作数据库的时候抛出该异常。 
-  BindingException: 译为绑定异常。主要是 `mapper`映射的时候会抛出该异常。 
-  LogException: 译为日志异常。目前只在`LogFactory`构建日志相关的时候才会抛出该异常。 
-  PluginException: 译为插件异常。目前只在`Plugin`中使用，在获取插件信息时候会抛出该异常。 

`Mybatis`类型主要是根据业务相关包放在一起，所以命名绝大多数都能够直观的看到原因所在。
### `annotations`和 `lang`包

#### 背景知识

#### 讲解
