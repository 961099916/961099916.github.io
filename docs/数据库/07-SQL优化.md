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

可以通过 EXPLAIN 或者 DESC 命令获取 MySQL 如何执行 SELECT 语句的信息，包括在 SELECT 语句执行过程中表如何连接和连接的顺序。

- 比如想计算 2006 年所有公司的销售额，需要关联 sales 表和 company 表，并且对 moneys 字段做求和（sum）操作
- `explain select sum(moneys) from sales a,company b where a.company_id = b.id and a.year= 2006\G;`
- ![20200508225957.png](http://notebook.zhangjiahao.site/20200508225957.png)
- select_type：表示 SELECT 的类型，常见的取值有 SIMPLE（简单表，即不使用表连接或者子查询）、PRIMARY（主查询，即外层的查询）、UNION（UNION 中的第二个或者后面的查询语句）、SUBQUERY（子查询中的第一个 SELECT）等。
- table：输出结果集的表。
- type：表示表的连接类型，性能由好到差的连接类型为 system（表中仅有一行，即常量表）、const（单表中最多有一个匹配行，例如 primary key 或者 unique index）、eq_ref（对于前面的每一行，在此表中只查询一条记录，简单来说，就是多表连接中使用 primary key 或者 unique index）、 ref （与 eq_ref 类似， 区别在于不是使用 primarykey 或者 unique index，而是使用普通的索引）、ref_or_null（与 ref 类似，区别在于条件中包含对 NULL 的查询） 、index_merge(索引合并优化)、unique_subquery（in 的后面是一个查询主键字段的子查询）、 index_subquery （与 unique_subquery 类似，区别在于 in 的后面是查询非唯一索引字段的子查询）、 range （单表中的范围查询）、index（对于前面的每一行，都通过查询索引来得到数据）、all（对于前面的每一行,都通过全表扫描来得到数据）
- possible_keys：表示查询时，可能使用的索引
- key：表示实际使用的索引
- key_len：索引字段的长度
- rows：扫描行的数量
- Extra：执行情况的说明和描述

### 4.确定问题并采取相应的优化措施

以上基本就可以确认问题出现的原因。此时用户可以根据情况采取相应的措施，进行优化提高执行的效率

## 索引问题

索引是数据库优化中最常用也是最重要的手段之一， 通过索引通常可以帮助用户解决大多数的 SQL 性能问题

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
