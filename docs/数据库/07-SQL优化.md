# SQL 优化

## 优化 SQL 的一般步骤

当遇到需要优化的 SQL 时，按照步骤进行优化从而能更快的找到问题的所在。

### 1.通过命令了解各种 SQL 的执行频率

- 客户端连接之后，通过 show [session|global]status 可查看命令的执行次数，默认 session
- session:当前连接
- global: 自数据库启动

> `show status 'Com_%';` > ![20200508164023.png](http://notebook.zhangjiahao.site/20200508164023.png)
> Com_xxx 表示每个 xxx 语句执行的次数
>
> - Com_select : 执行 select 操作的次数，一次查询只累加 1
> - Com_insert : 执行 insert 操作的次数，对于批量插入的 insert 操作，只累加一次
> - Com_update : 执行 update 的操作次数
> - Com_delete : 执行 delete 操作的次数
> - innodb_rows_read : select 查询返回的行数
> - innodb_rows_inserted : 执行 insert 操作的行数

### 2.定位执行效率较低的 SQL 语句

- 通过慢查询日志定位查询慢的 sql 语句，使用--log-slow-queries[=file_name]选项启动时，mysqld 写一个包含所有执行时间超过 long_query_time 妙的 SQL 语句的日志文件
- 通过`show processlist`命令查看当前 MySQL 在进行的线程，包括线程的状态，是否锁表等，可以实时查看 SQL 的执行情况

### 3.通过 EXPLAIN 分析低效 SQL 的执行计划

### 4.确定问题并采取相应的优化措施

## 索引问题

### 1.索引的存储分类

### 2.如何使用

### 3.索引使用情况

## 简单的优化方法

### 1.定期分析表和检查表

### 2.定期优化表

## 常用 SQL 的优化

### 1.大批量插入数据

### 2.优化 INSERT 语句

### 3.优化 GROUP BY 语句

### 4.优化 ORDER BY 语句

### 5.优化嵌套查询

### 6.如何优化 OR
