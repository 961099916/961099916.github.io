---
title: MySQL
order: 2
---
## 安装与配置

### Windows 安装

### Ubuntu 安装

### Centos 安装

### 安装包安装

### Docker 安装

```shell
docker pull mysql:5.7
docker run --restart=unless-stopped -d -p 3306:3306 --name common-mysql -e MYSQL_ROOT_PASSWORD=root mysql:5.7 --lower_case_table_names=1
```
## 基础语法


## 函数

## 字符串函数

![](https://imgconvert.csdnimg.cn/aHR0cDovL25vdGVib29rLnpoYW5namlhaGFvLnNpdGUvbWFya2Rvd24taW1nLXBhc3RlLTIwMjAwNDI3MjA0OTI0MTI5LnBuZw?x-oss-process=image/format,png#alt=%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%87%BD%E6%95%B0)

> cancat : 当拼接的字段有 null 的时候，结果都为 null


> left(str,x) : 返回从 0 开始的 x 个字符，当 x 为 null，返回 null


## 数值函数

![](https://imgconvert.csdnimg.cn/aHR0cDovL25vdGVib29rLnpoYW5namlhaGFvLnNpdGUvbWFya2Rvd24taW1nLXBhc3RlLTIwMjAwNDI3MjE0MzA3ODAwLnBuZw?x-oss-process=image/format,png#alt=%E6%95%B0%E5%80%BC%E5%87%BD%E6%95%B0)

## 时间和日期函数

![](https://imgconvert.csdnimg.cn/aHR0cDovL25vdGVib29rLnpoYW5namlhaGFvLnNpdGUvbWFya2Rvd24taW1nLXBhc3RlLTIwMjAwNDI3MjE0NDA4NDQucG5n?x-oss-process=image/format,png#alt=%E6%97%B6%E9%97%B4%E5%92%8C%E6%97%A5%E6%9C%9F%E5%87%BD%E6%95%B0)

> CURDATE() : 返回当前日期，只包含年月日 2020-04-27


> CURTIME() : 返回当前日期，只包含时分秒 12：12：12


> NOW() : 返回当前时间，年-月-日 时：分：秒


> ![](https://imgconvert.csdnimg.cn/aHR0cDovL25vdGVib29rLnpoYW5namlhaGFvLnNpdGUvbWFya2Rvd24taW1nLXBhc3RlLTIwMjAwNDI3MjE1MzE3NTM4LnBuZw?x-oss-process=image/format,png#alt=DATE_FORMART) > ![](https://imgconvert.csdnimg.cn/aHR0cDovL25vdGVib29rLnpoYW5namlhaGFvLnNpdGUvbWFya2Rvd24taW1nLXBhc3RlLTIwMjAwNDI3MjE1NDAxMjQ3LnBuZw?x-oss-process=image/format,png#alt=DATE_FORMART)


> ![](https://imgconvert.csdnimg.cn/aHR0cDovL25vdGVib29rLnpoYW5namlhaGFvLnNpdGUvbWFya2Rvd24taW1nLXBhc3RlLTIwMjAwNDI3MjE1NDM3MTY0LnBuZw?x-oss-process=image/format,png#alt=)


## 流程函数

![](https://imgconvert.csdnimg.cn/aHR0cDovL25vdGVib29rLnpoYW5namlhaGFvLnNpdGUvbWFya2Rvd24taW1nLXBhc3RlLTIwMjAwNDI3MjE1NTI3NTM1LnBuZw?x-oss-process=image/format,png#alt=%E6%B5%81%E7%A8%8B%E5%87%BD%E6%95%B0)

## 其他函数

![](https://imgconvert.csdnimg.cn/aHR0cDovL25vdGVib29rLnpoYW5namlhaGFvLnNpdGUvbWFya2Rvd24taW1nLXBhc3RlLTIwMjAwNDI3MjE1NjMyMjk2LnBuZw?x-oss-process=image/format,png#alt=%E5%85%B6%E4%BB%96%E5%87%BD%E6%95%B0)

## MySQL 50 题

### 学生表

```sql
create table Student(SId varchar(10),Sname varchar(10),Sage datetime,Ssex varchar(10));
insert into Student values('01' , '赵雷' , '1990-01-01' , '男');
insert into Student values('02' , '钱电' , '1990-12-21' , '男');
insert into Student values('03' , '孙风' , '1990-12-20' , '男');
insert into Student values('04' , '李云' , '1990-12-06' , '男');
insert into Student values('05' , '周梅' , '1991-12-01' , '女');
insert into Student values('06' , '吴兰' , '1992-01-01' , '女');
insert into Student values('07' , '郑竹' , '1989-01-01' , '女');
insert into Student values('09' , '张三' , '2017-12-20' , '女');
insert into Student values('10' , '李四' , '2017-12-25' , '女');
insert into Student values('11' , '李四' , '2012-06-06' , '女');
insert into Student values('12' , '赵六' , '2013-06-13' , '女');
insert into Student values('13' , '孙七' , '2014-06-01' , '女');
```

### 科目表

```sql
create table Course(CId varchar(10),Cname nvarchar(10),TId varchar(10));
insert into Course values('01' , '语文' , '02');
insert into Course values('02' , '数学' , '01');
insert into Course values('03' , '英语' , '03');
```

### 教师表

```sql
create table Teacher(TId varchar(10),Tname varchar(10));
insert into Teacher values('01' , '张三');
insert into Teacher values('02' , '李四');
insert into Teacher values('03' , '王五');
```

### 成绩表

```sql
create table SC(SId varchar(10),CId varchar(10),score decimal(18,1));
insert into SC values('01' , '01' , 80);
insert into SC values('01' , '02' , 90);
insert into SC values('01' , '03' , 99);
insert into SC values('02' , '01' , 70);
insert into SC values('02' , '02' , 60);
insert into SC values('02' , '03' , 80);
insert into SC values('03' , '01' , 80);
insert into SC values('03' , '02' , 80);
insert into SC values('03' , '03' , 80);
insert into SC values('04' , '01' , 50);
insert into SC values('04' , '02' , 30);
insert into SC values('04' , '03' , 20);
insert into SC values('05' , '01' , 76);
insert into SC values('05' , '02' , 87);
insert into SC values('06' , '01' , 31);
insert into SC values('06' , '03' , 34);
insert into SC values('07' , '02' , 89);
insert into SC values('07' , '03' , 98);
```

### 题目

1. 查询" 01 "课程比" 02 "课程成绩高的学生的信息及课程分数

```sql
SELECT
	s.SId,
	s.Sname,
	temp1.class1,
	temp1.class2
FROM

### 构建出子查询的数据
	(
SELECT
	SId1,
	class1,
	class2
FROM
	( SELECT SId SId1, score class1 FROM SC WHERE CId = '01' ) t1,
	( SELECT SId SId2, score class2 FROM SC WHERE CId = '02' ) t2
WHERE
	t1.SId1 = t2.SId2
	AND t1.class1 > t2.class2
	) temp1
	LEFT JOIN Student s ON s.SId = temp1.SId1
```

1.1 查询同时存在" 01 "课程和" 02 "课程的情况

```sql
SELECT
	s.SId,
	s.Sname,
	temp1.class1,
	temp1.class2
FROM
	(
SELECT
	SId1,
	class1,
	class2
FROM
	( SELECT SId SId1, score class1 FROM SC WHERE CId = '01' ) t1,
	( SELECT SId SId2, score class2 FROM SC WHERE CId = '02' ) t2
WHERE
	t1.SId1 = t2.SId2
	) temp1
	LEFT JOIN Student s ON s.SId = temp1.SId1
```

1.2 查询存在" 01 "课程但可能不存在" 02 "课程的情况(不存在时显示为 null )

```sql
SELECT
	s.SId,
	s.Sname,
	temp1.class1,
	temp1.class2
FROM
	(
SELECT
	SId1,
	class1,
	class2
FROM
	( SELECT SId SId1, score class1 FROM SC WHERE CId = '01' ) t1 left join
	( SELECT SId SId2, score class2 FROM SC WHERE CId = '02' ) t2
on
	t1.SId1 = t2.SId2
	) temp1
	LEFT JOIN Student s ON s.SId = temp1.SId1
```

1.3 查询不存在" 01 "课程但存在" 02 "课程的情况

```sql
SELECT
	s.SId,
	s.Sname,
	temp1.class1,
	temp1.class2
FROM
	(
SELECT
	SId2,
	class1,
	class2
FROM
	( SELECT SId SId1, score class1 FROM SC WHERE CId = '01' ) t1
	RIGHT JOIN ( SELECT SId SId2, score class2 FROM SC WHERE CId = '02' ) t2 ON t1.SId1 = t2.SId2
	) temp1
	LEFT JOIN Student s ON s.SId = temp1.SId2
WHERE
	temp1.class1 IS NULL
```

2. 查询平均成绩大于等于 60 分的同学的学生编号和学生姓名和平均成绩

```sql
SELECT
	s.SId,
	s.Sname,
	t1.avg
FROM
	( SELECT SId sid, SUM( score ) / count( 1 ) avg FROM SC GROUP BY SId ) t1
	LEFT JOIN Student s ON t1.sid = s.SId
WHERE
	t1.avg >= 60;
```

3. 查询在 SC 表存在成绩的学生信息

```sql
SELECT
	*
FROM
	Student
WHERE
	SId IN ( SELECT SId FROM SC GROUP BY SId );
```

4. 查询所有同学的学生编号、学生姓名、选课总数、所有课程的总成绩(没成绩的显示为 null )

```sql
SELECT
	s.SId,
	s.Sname,
	t1.sum,
	t1.num
FROM
	( SELECT SId sid, SUM( score ) sum, count( 1 ) num FROM SC GROUP BY SId ) t1
	RIGHT JOIN Student s ON t1.sid = s.SId;
```

4.1 查有成绩的学生信息

```sql
SELECT
	*
FROM
	Student
WHERE
	SId IN ( SELECT SId FROM SC GROUP BY SId );
```

5. 查询「李」姓老师的数量

```sql
SELECT
	count( 1 )
FROM
	teacher
WHERE
	Tname LIKE '李%';
```

6. 查询学过「张三」老师授课的同学的信息

```sql
SELECT
	*
FROM
	student
WHERE
	SId IN (
SELECT DISTINCT
	SId
FROM
	sc
WHERE
	CId IN ( SELECT DISTINCT CId FROM Course WHERE TId IN ( SELECT DISTINCT TId FROM teacher WHERE Tname = '张三' ) )
	);
```

7. 查询没有学全所有课程的同学的信息

```sql
SELECT
	*
FROM
	(
SELECT
	t.*,
	count( CId ) num
FROM
	student t
	LEFT JOIN sc sc ON t.SId = sc.SId
GROUP BY
	t.SId
	) temp,
	( SELECT count( CId ) count FROM course ) co
WHERE
	temp.num < co.count
```

8. 查询至少有一门课与学号为" 01 "的同学所学相同的同学的信息

```sql
SELECT
	*
FROM
	Student
WHERE
	SId IN ( SELECT DISTINCT SID FROM sc WHERE CId IN ( SELECT CId FROM sc WHERE SId = '01' ) )
```

9. 查询和" 01 "号的同学学习的课程 完全相同的其他同学的信息

```sql
SELECT
	*
FROM
	Student
WHERE
	SId IN (
SELECT
	SId
FROM
	(
SELECT
	*,
	count( 1 ) num
FROM
	(
SELECT
	*
FROM
	sc
WHERE
	SId NOT IN ( SELECT SId FROM sc WHERE CId NOT IN ( SELECT CId FROM sc WHERE SId = '01' ) )
	) t1
GROUP BY
	SId
	) tt1
WHERE
	num = ( SELECT count( 1 ) FROM sc WHERE SId = '01' )
	AND SId != '01'
	)
```

10. 查询没学过"张三"老师讲授的任一门课程的学生姓名

```sql
SELECT
	*
FROM
	student
WHERE
	SId NOT IN (
SELECT
	SId
FROM
	sc
WHERE
	CId IN ( SELECT CId FROM course WHERE TId IN ( SELECT TId FROM teacher WHERE Tname = "张三" ) )
	)
```

11. 查询两门及其以上不及格课程的同学的学号，姓名及其平均成绩

```sql
SELECT
	st.* ,avg
FROM
	(
SELECT
	SId,
	sum( score ) / count( 1 ) avg
FROM
	sc
WHERE
	SId IN (
SELECT
	SId
FROM
	( SELECT *, count( 1 ) num FROM sc WHERE score < 60 GROUP BY SId ) t1
WHERE
	num >= 2
	)
GROUP BY
	SId
	) tt1
	LEFT JOIN student st ON tt1.SId = st.SId
```

12. 检索" 01 "课程分数小于 60，按分数降序排列的学生信息

```sql
SELECT
	*
FROM
	student
WHERE
	SId IN ( SELECT SId FROM sc WHERE score < 60 AND CId = '01' ORDER BY score DESC )
```

13. 按平均成绩从高到低显示所有学生的所有课程的成绩以及平均成绩

```sql
SELECT
	t1.*,
	avg
FROM
	sc t1
	LEFT JOIN ( SELECT SId, sum( score ) / count( 1 ) avg FROM sc GROUP BY SId ) t2 ON t1.sId = t1.SId
ORDER BY
	avg DESC
```

14.查询各科成绩最高分、最低分和平均分：

以如下形式显示：课程 ID，课程 name，最高分，最低分，平均分，及格率，中等率，优良率，优秀率

及格为>=60，中等为：70-80，优良为：80-90，优秀为：>=90 要求输出课程号和选修人数，查询结果按人数降序排列，若人数相同，按课程号升序排列

```sql
select
sc.CId ,
max(sc.score)as 最高分,
min(sc.score)as 最低分,
AVG(sc.score)as 平均分,
count(*)as 选修人数,
sum(case when sc.score>=60 then 1 else 0 end )/count(*)as 及格率,
sum(case when sc.score>=70 and sc.score<80 then 1 else 0 end )/count(*)as 中等率,
sum(case when sc.score>=80 and sc.score<90 then 1 else 0 end )/count(*)as 优良率,
sum(case when sc.score>=90 then 1 else 0 end )/count(*)as 优秀率
from sc
GROUP BY sc.CId
ORDER BY count(*)DESC, sc.CId ASC
```

15. 按各科成绩进行排序，并显示排名， Score 重复时保留名次空缺

```sql
SELECT
	( @sn := @sn + 1 ) sn,
	CId,
	SId,
	score
FROM
	sc,
	( SELECT @sn := 0 ) b
ORDER BY
	CId,
	score DESC
```

15.1 按各科成绩进行排序，并显示排名， Score 重复时合并名次

```sql
SELECT
    sc.SId, sc.CId, sc.score, tp.ranks
FROM
    test.sc
    LEFT JOIN
        (SELECT
            SId,
            CId,
            (SELECT
                COUNT(DISTINCT sc2.score) + 1
                FROM
                    test.sc sc2
                WHERE
                    sc1.CId = sc2.CId
                AND sc2.score > sc1.score) ranks
         FROM test.sc sc1) tp
    ON sc.SId = tp.SId AND sc.CId = tp.CId
ORDER BY sc.CId , ranks
```

16. 询学生的总成绩，并进行排名，总分重复时保留名次空缺

```sql
select t1.*,@currank:= @currank+1 as rank
from (select sc.SId, sum(score)
from sc
GROUP BY sc.SId
ORDER BY sum(score) desc) as t1,(select @currank:=0) as t
```

16.1 查询学生的总成绩，并进行排名，总分重复时不保留名次空缺

```sql
SET @crank = 0;
SELECT
	q.sid,
	total,
	@crank := @crank + 1 AS rank
FROM
	( SELECT sc.sid, sum( sc.score ) AS total FROM sc GROUP BY sc.sid ORDER BY total DESC ) q;
```

17. 统计各科成绩各分数段人数：课程编号，课程名称，[100-85]，[85-70]，[70-60]，[60-0] 及所占百分比

```sql
SELECT
    c.CId 课程编号,
    c.Cname 课程名称,
    COUNT(CASE
            WHEN sc.score >= 85 THEN 1
            ELSE NULL
         END) AS '[100,85]人数',
    ROUND(COUNT(CASE
                    WHEN sc.score >= 85 THEN 1
                    ELSE NULL
                END) * 1.0 / COUNT(sc.score),
            2) AS '[100,85]占比',
    COUNT(CASE
            WHEN sc.score >= 70 AND sc.score < 85 THEN 1
            ELSE NULL
         END) AS '(85,70]人数',
    ROUND(COUNT(CASE
                    WHEN sc.score >= 70 AND sc.score < 85 THEN 1
                    ELSE NULL
                END) * 1.0 / COUNT(sc.score),
         2) AS '(85,70]占比',
    COUNT(CASE
            WHEN sc.score >= 60 AND sc.score < 70 THEN 1
            ELSE NULL
         END) AS '(70,60]人数',
    ROUND(COUNT(CASE
                    WHEN sc.score >= 60 AND sc.score < 70 THEN 1
                    ELSE NULL
                 END) * 1.0 / COUNT(sc.score),
         2) AS '(70,60]占比',
    COUNT(CASE
            WHEN sc.score < 60 THEN 1
            ELSE NULL
          END) AS '(60,0]人数',
    ROUND(COUNT(CASE
                    WHEN sc.score < 60 THEN 1
                    ELSE NULL
                END) * 1.0 / COUNT(sc.score),
         2) AS '(60,0]占比'
FROM
    Course c
    LEFT JOIN sc
    ON c.CId = sc.CId
GROUP BY c.CId
```

18. 查询各科成绩前三名的记录

```sql
select *
from sc
where  (select count(*) from sc as a where sc.CId =a.CId and  sc.score <a.score )<3
ORDER BY CId asc,sc.score desc
```

19. 查询每门课程被选修的学生数

```sql
SELECT
	*
FROM
	( SELECT CId, count( 1 ) count FROM SC GROUP BY CId ) t1
	RIGHT JOIN Course c ON t1.CId = c.CId
```

20. 查询出只选修两门课程的学生学号和姓名

```sql
SELECT
	SId,
	Sname
FROM
	Student
WHERE
	SId IN ( SELECT SId FROM ( SELECT SId, count( 1 ) count FROM SC GROUP BY SId ) t1 WHERE t1.count = 2 )
```

21. 查询男生、女生人数

```sql
SELECT
	Ssex,
	count( 1 )
FROM
	Student
GROUP BY
	Ssex
```

22. 查询名字中含有「风」字的学生信息

```sql
SELECT
	*
FROM
	Student
WHERE
	Sname LIKE '%风%'
```

23. 查询同名同性学生名单，并统计同名人数

```sql
SELECT
	s1.Sname,
	count( 1 )
FROM
	Student s1,
	Student s2
WHERE
	s1.Sname = s2.Sname
	AND s1.Ssex = s2.Ssex
	AND s1.SId != s2.SId
GROUP BY
	s1.Sname
```

24. 查询 1990 年出生的学生名单

```sql
SELECT
	*
FROM
	student
WHERE
	DATE_FORMAT( Sage, '%Y' ) = '1990'
```

25. 查询每门课程的平均成绩，结果按平均成绩降序排列，平均成绩相同时，按课程编号升序排列

```sql
SELECT
	c.CId CId,
	Cname,
	avg( score )
FROM
	course c
	LEFT JOIN sc sc ON c.CId = sc.CId
GROUP BY
	Cname
ORDER BY
	CId
```

26. 查询平均成绩大于等于 85 的所有学生的学号、姓名和平均成绩

```sql
SELECT
	*
FROM
	(
SELECT
	SId,
	avg
FROM
	( SELECT SId, AVG( score ) avg FROM SC GROUP BY SId ) t1
WHERE
	t1.avg >= 80
	) tt1
	LEFT JOIN student s ON tt1.SId = s.SId
```

27. 查询课程名称为「数学」，且分数低于 60 的学生姓名和分数

```sql
SELECT
	*
FROM
	( SELECT SId, Score FROM sc WHERE score < 60 AND CId IN ( SELECT CId FROM course WHERE Cname = '数学' ) ) t1
	LEFT JOIN student s ON t1.SId = s.SId
```

28. 查询所有学生的课程及分数情况（存在学生没成绩，没选课的情况）

```sql
SELECT
    s.SId, s.Sname, sc.CId, sc.score
FROM
    student s
LEFT JOIN
    sc sc
ON
    sc.SId = s.SId;
```

29. 查询任何一门课程成绩在 70 分以上的姓名、课程名称和分数

```sql
SELECT
	*
FROM
	( SELECT * FROM sc WHERE score > 70 ) t1
	LEFT JOIN student s ON t1.SId = s.SId
	LEFT JOIN course c ON t1.CId = c.CId
```

30. 查询不及格的课程

```sql
SELECT
	*
FROM
	sc sc
	LEFT JOIN course c ON sc.CId = c.CId
WHERE
	score < 60
GROUP BY
	sc.CId
```

31. 查询课程编号为 01 且课程成绩在 80 分以上的学生的学号和姓名

```sql
SELECT
	*
FROM
	student
WHERE
	SId IN ( SELECT SId FROM sc WHERE CId = 01 AND score > 80 )
```

32. 求每门课程的学生人数

```sql
SELECT
	*,
	count( 1 )
FROM
	course c
	LEFT JOIN sc sc ON c.CId = sc.CId
GROUP BY
	sc.CId;
```

33. 成绩不重复，查询选修「张三」老师所授课程的学生中，成绩最高的学生信息及其成绩

```sql
SELECT
	*
FROM
	(
SELECT
	SId,
	score
FROM
	SC
WHERE
	CId IN ( SELECT CId FROM Course WHERE TId IN ( SELECT TId FROM Teacher WHERE Tname = "张三" ) )
ORDER BY
	score DESC
	LIMIT 1
	) t1
	LEFT JOIN Student s ON t1.Sid = s.SId
```

34. 成绩有重复的情况下，查询选修「张三」老师所授课程的学生中，成绩最高的学生信息及其成绩

```sql
SELECT
	*
FROM
	(
SELECT
	SId,
	score
FROM
	SC
WHERE
	score = (
SELECT
	score
FROM
	SC
WHERE
	CId IN ( SELECT CId FROM Course WHERE TId IN ( SELECT TId FROM Teacher WHERE Tname = "张三" ) )
ORDER BY
	score DESC
	LIMIT 1
	)
	) t1
	LEFT JOIN Student s ON t1.Sid = s.SId
```

35. 查询不同课程成绩相同的学生的学生编号、课程编号、学生成绩

```sql
SELECT
    sc1.SId, sc1.CId, sc1.score
FROM
    sc sc1
JOIN
    sc sc2
ON  sc1.SId = sc2.SId
    AND sc1.score = sc2.score
    AND sc1.CId != sc2.CId
GROUP BY sc1.CId , sc1.SId;
```

36. 查询每门功成绩最好的前两名

```sql
SELECT
    a.CId, a.SId, a.score
FROM
    sc a
LEFT JOIN
    sc b
ON
    a.CId = b.CId
    AND a.score < b.score
GROUP BY a.CId , a.SId
HAVING COUNT(a.CId) < 2
ORDER BY CId , score DESC
```

37. 统计每门课程的学生选修人数（超过 5 人的课程才统计）。

```sql
SELECT
	*
FROM
	( SELECT CId, count( 1 ) count FROM SC GROUP BY CId ) t1
WHERE
	t1.count > 5
```

38. 检索至少选修两门课程的学生学号

```sql
SELECT
	SId
FROM
	( SELECT SId, count( 1 ) count FROM SC GROUP BY SId ) t1
WHERE
	t1.count >2
```

39. 查询选修了全部课程的学生信息

```sql
SELECT
	*
FROM
	student
WHERE
	SId IN (
SELECT
	SId
FROM
	( SELECT SId, count( 1 ) count FROM SC GROUP BY SId ) t1
WHERE
	count = ( SELECT count( 1 ) FROM course )
	)
```

40. 查询各学生的年龄，只按年份来算

```sql
SELECT
	*,
	DATE_FORMAT( now( ), '%Y' ) - DATE_FORMAT( Sage, '%Y' )
FROM
	student
```

41. 按照出生日期来算，当前月日 < 出生年月的月日则，年龄减一

```sql
SELECT
	*,
	DATE_FORMAT( now( ), '%Y' ) - DATE_FORMAT( Sage, '%Y' ) - ( DATE_FORMAT( now( ), '%m%d' ) < DATE_FORMAT( Sage, '%m%d' ) )
FROM
	student
```

42. 查询本周过生日的学生

```sql
SELECT
    *
FROM
    student
WHERE
    WEEKOFYEAR(Sage) = WEEKOFYEAR(CURDATE());
```

43. 查询下周过生日的学生

```sql
SELECT
    *
FROM
    student
WHERE
    WEEKOFYEAR(Sage) - WEEKOFYEAR(CURDATE()) = 1;
```

44. 查询本月过生日的学生

```sql
SELECT
    *
FROM
    student
WHERE
    MONTH(Sage) = MONTH(CURDATE());
```

45. 查询下月过生日的学生

```sql
SELECT
    *
FROM
    student
WHERE
    MONTH(Sage) = MONTH(CURDATE())+1;
```
## 存储引擎

- MYSQL5.0 存储引擎有 MyISAM、InnoDB、BDB、MEMORY、MERGE、EXAMPLE、NDB Cluster、ARCHIVE、CSV、BLACKHOLE、FEDERATED 等，其中 InnoDB 和 BDB 是提供事务安全表，其他的引擎都是非事务安全表。
- show engines \G 可查看当前数据库支持的引擎
- alter tables tableName engine = innodb 修改存储引擎为 InnoDB

### 储存引擎的对比

![](https://imgconvert.csdnimg.cn/aHR0cDovL25vdGVib29rLnpoYW5namlhaGFvLnNpdGUvbWFya2Rvd24taW1nLXBhc3RlLTIwMjAwNDI4MDkyMTE5MzU4LnBuZw?x-oss-process=image/format,png#alt=%E5%AD%98%E5%82%A8%E5%BC%95%E6%93%8E%E5%AF%B9%E6%AF%94)

### MyISAM 存储引擎

- 
MYSQL 默认引擎，不支持事务和外键，但是访问速度快

- 
  会在相应的文件夹下生成三个文件，文件名和表明相同，扩展名分别是

   - .frm(存储定义表)
   - .MYD(MYData 存储数据)
   - .MYI(MYIndex 存储索引)
- 
  数据和索引文件可放置再不同的目录，平均分配 IO，获得更快的速度。

   - 需要在创建表的时候指定 data dirctory 和 index directory, 路径为绝对路径，并且具有访问权限
- 
  存储格式

   - 静态（固定长度）表
   - 动态表
   - 压缩表
> 静态表：默认存储格式，这样每个记录都是固定长度的，这种存储方式的优点是存储非常迅速，容易缓存，出现故障容易恢复；缺点是占用的空间通常比动态表多。静态表的数据在存储的时候会按照列的宽度定义补足空格，但是在应用访问的时候并不会得到这些空格，这些空格在返回给应用之前已经去掉。

> 动态表： 动态表中包含变长字段，记录不是固定长度的，这样存储的优点是占用的空间相对较少，但是频繁地更新删除记录会产生碎片，需要定期执行 OPTIMIZE TABLE 语句或 myisamchk -r 命令来改善性能，并且出现故障的时候恢复相对比较困难

> 压缩表由 myisampack 工具创建，占据非常小的磁盘空间。因为每个记录是被单独压缩的


### InnoDB 存储引擎

1. 自动增长列

- 可通过 `alter table tableName auto_increment = n` 设置自动增长的间隔
- 可使用 `last_insert_id()` 查询当前线程的最后插入记录的值
- 自动增长列必须是索引，如果是组合索引，必须是组合索引的第一个，但是对于 MyISAM 表，自动增长列可以是组合索引的其他列，这样插入记录后，自动增长列是按照组合索引的前面几列进行排序后递增的

2. 外键约束

- 支持外键的存储引擎只有 InnoDB，外键对应的父表必须有对应的索引，子表创建外键的时候会自动创建索引
- 在创建索引的时候， 可以指定在删除、 更新父表时， 对子表进行的相应操作， 包 RESTRICT、CASCADE、SET NULL 和 NO ACTION。其中 RESTRICT 和 NO ACTION 相同，是指限制在子表有关联记录的情况下父表不能更新； CASCADE 表示父表在更新或者删除时，更新或者删除子表对应记录；SET NULL 则表示父表在更新或者删除的时候，子表的对应字段被 SET NULL。选择后两种方式的时候要谨慎，可能会因为错误的操作导致数据的丢失

3. 存储方式

InnoDB 存储表和索引有以下两种方式：

- 使用共享表空间存储，这种方式创建的表的表结构保存在.frm 文件中，数据和索引保存在 innodb_data_home_dir 和 innodb_data_file_path 定义的表空间中，可以是多个文件
- 使用多表空间存储，这种方式创建的表的表结构仍然保存在.frm 文件中，但是每个表的数据和索引单独保存在.ibd 中。如果是个分区表，则每个分区对应单独的.ibd 文件，文件名是“表名+分区名” ，可以在创建分区的时候指定每个分区的数据文件的位置，以此来将表的 IO 均匀分布在多个磁盘上
- 要使用多表空间的存储方式，需要设置参数 innodb_file_per_table，并重新启动服务后才可以生效，多表空间的参数生效后，只对新建的表生效。
- 多表空间的数据文件没有大小限制，不需要设置初始大小，也不需要设置文件的最大限制、扩展大小等参数
- 对于使用多表空间特性的表，可以比较方便地进行单表备份和恢复操作，但是直接复制.ibd 文件是不行的，因为没有共享表空间的数据字典信息，直接复制的.ibd 文件和.frm 文件恢复时是不能被正确识别的，但可以通过以下命令：

   - ALTER TABLE tbl_name DISCARD TABLESPACE;
   - ALTER TABLE tbl_name IMPORT TABLESPACE;

### MEMORY 存储引擎

- 存储再内存中,虽然速度很快,但是一旦服务器重启,表数据就会丢失.
- 默认支持 HASH 索引
- 只有一个磁盘文件,格式为.frm
- 启动 MYSQL 服务时,使用--init-file 选项,把 INSERT INTO ... SELECT 或 LOAD DATA INFILE 这样的语句放入这个文件中，就可以在服务启动时从持久稳固的数据源装载表
- 表的大小受 max_heap_table_size 系统变量的约束，这个系统变量的初始值是 16MB.此外，在定义 MEMORY 表的时候，可以通过 MAX_ROWS 子句指定表的最大行数

### MERGE 存储引擎

- MERGE 存储引擎是一组 MyISAM 表的组合，这些 MyISAM 表必须结构完全相同，MERGE 表本身并没有数据，对 MERGE 类型的表可以进行查询、更新、删除的操作，这些操作实际上是对内部的实际的 MyISAM 表进行的。
- MERGE 类型表的插入操作，是通过

INSERT_METHOD 子句定义插入的表，可以有 3 个不同的值，使用 FIRST 或 LAST 值使得插入操作被相应地作用在第一或最后一个表上，不定义这个子句或者定义为 NO，表示不能对这个 MERGE 表执行插入操作。
- MERGE 表在磁盘上保留两个文件，文件名以表的名字开始，一个.frm 文件存储表定义，另一个.MRG 文件包含组合表的信息，包括 MERGE 表由哪些表组成、插入新的数据时的依据。可以通过修改.MRG 文件来修改 MERGE 表，但是修改后要通过 FLUSH TABLES 刷新

### 存储引擎的选择
| 存储引擎 | 情况优选 |
| --- | --- |
| MyISAM | 默认的 MySQL 插件式存储引擎。如果应用是以读操作和插入操作为主，只有很少的更新和删操作，并且对事务的完整性、并发性要求不是很高，那么选择这个存储引擎是非常适合的。MyISAM 是在 Web、数据仓储和其他应用环境下最常使用的存储引擎之一 |
| InnoDB | 用于事务处理应用程序，支持外键。如果应用对事务的完整性有比较高的要求，在并发条件下要求数据的一致性，数据操作除了插入和查询以外，还包括很多的更新、删除操作，那么 InnoDB 存储引擎应该是比较合适的选择。InnoDB 存储引擎除了有效地降低由于删除和更新导致的锁定，还可以确保事务的完整提交（Commit）和回滚（Rollback），对于类似计费系统或者财务系统等对数据准确性要求比较高的系统 |
| MEMORY | 将所有数据保存在 RAM 中，在需要快速定位记录和其他类似数据的环境下，可提供极快的访问。MEMORY 的缺陷是对表的大小有限制，太大的表无法 CACHE 在内存中，其次是要确保表的数据可以恢复，数据库异常终止后表中的数据是可以恢复的。MEMORY 表通常用于更新不太频繁的小表，用以快速得到访问结果 |
| MERGE | 用于将一系列等同的 MyISAM 表以逻辑方式组合在一起，并作为一个对象引用它们。MERGE 表的优点在于可以突破对单个 MyISAM 表大小的限制，并且通过将不同的表分布在多个磁盘上，可以有效地改善 MERGE 表的访问效率。这对于诸如数据仓储等 VLDB 环境十分适合 |

## 触发器

触发器：在执行一些操作时会触发执行的。

### 触发器创建

```sql
CREATE TRIGGER trigger_name trigger_time trigger_event
ON tbl_name FOR EACH ROW trigger_stmt
```

- trigger_time : 触发时间，可以是 BEFORE 或者 AFTER
- trigger_event ： 触发事件，可以是 INSERT、UPDATE 或者 DELETE

例：

```sql
CREATE TRIGGER upd_film_bef
 BEFORE update ON film FOR EACH ROW BEGIN
 INSERT INTO tri_demo (note) VALUES ('before update');
 END;
 $$
```

### 删除触发器

```sql
DROP TRIGGER [schema_name.]trigger_name
```

### 查看触发器

```sql
show triggers \G
```

### 使用规则

触发器执行的语句有以下两个限制：

- 触发程序不能调用将数据返回客户端的存储程序，也不能使用采用 CALL 语句的动态 SQL 语句，但是允许存储程序通过参数将数据返回触发程序。也就是存储过程或者函数通过 OUT 或者 INOUT 类型的参数将数据返回触发器是可以的，但是不能调用直接返回数据的过程。
- 不能在触发器中使用以显式或隐式方式开始或结束事务的语句，如 START TRANSACTION、COMMIT 或 ROLLBACK
## 存储过程和函数

- 存储过程和函数是事先经过编译并存储在数据库中的一段 SQL 语句的集合，调用存储过程和函数可以简化应用开发人员的很多工作，减少数据在数据库和应用服务器之间的传输，对于提高数据处理的效率是有好处的
- 存储过程和函数的区别在于函数必须有返回值，而存储过程没有，存储过程的参数可以使用 IN、OUT、INOUT 类型，而函数的参数只能是 IN 类型的。如果有函数从其他类型的数据库迁移到 MySQL，那么就可能因此需要将函数改造成存储过程

### 函数

```sql
CREATE DEFINER=`root`@`localhost` FUNCTION `function_update_sc`(`id` int) RETURNS int(11)
BEGIN
    #Routine body goes here...
        update  teacher set Tname = '100' where TId = id;
    RETURN 0;
END
```

### 存储过程

```sql
CREATE DEFINER=`root`@`localhost` FUNCTION `function_update_sc`(`id` int) RETURNS int(11)
BEGIN
    #Routine body goes here...
        update  teacher set Tname = '100' where TId = id;
    RETURN 0;
END
```
## 索引

- MySQL 列类型都可以被索引，对相关列使用索引是提高 SELECT 操作性能的最佳途径
- 根据存储引擎可以定义每个表的最大索引数和最大索引长度，每种存储引擎（如 MyISAM、InnoDB、BDB、MEMORY 等）对每个表至少支持 16 个索引，总索引长度至少为 256 字节
- MyISAM 和 InnoDB 存储引擎的表默认创建的都是 BTREE 索引
- MySQL 目前还不支持函数索引，但是支持前缀索引，即对索引字段的前 N 个字符创建索引
- 前缀索引的长度跟存储引擎相关，对于 MyISAM 存储引擎的表，索引的前缀长度可以达到 1000 字节长，而对于 InnoDB 存储引擎的表，索引的前缀长度最长是 767 字节
- 请注意前缀的限制应以字节为单位进行测量，而 CREATE TABLE 语句中的前缀长度解释为字符数。在为使用多字节字符集的列指定前缀长度时一定要加以考虑
- MySQL 中还支持全文本（FULLTEXT）索引，该索引可以用于全文搜索。但是当前最新版本中（5.0）只有 MyISAM 存储引擎支持 FULLTEXT 索引，并且只限于 CHAR、VARCHAR 和 TEXT 列。索引总是对整个列进行的，不支持局部（前缀）索引

### 创建索引

索引类型

- 普通索引：最基本的索引，没有任何限制，用于加速查询
- 唯一索引：索引列的值必须唯一，但允许有空值，如果是组合索引，列组合必须是唯一的
- 主键索引：是一种特殊的索引，一个表只能有一个主键，不允许有空值，一般在创建表的时候创建
- 组合索引：指多个字段上创建的索引，只有在查询条件中使用了创建索引时的第一个字段，索引才会被使用。使用组合索引时遵循最左前缀集合。
- 全文索引：主要用来查找文本中的关键字，而不是直接与索引中的值相比较。fulltext 索引配合 match against 操作使用，而不是一般的 where 语句加 like，它可以在 create table，alter table ，create index 使用，不过目前只有 char、varchar，text 列上可以创建全文索引。

创建表的时候可以同时创建

```sql
CREATE [UNIQUE|FULLTEXT|SPATIAL] INDEX index_name
[USING index_type]
ON tbl_name (index_col_name,...)
index_col_name:
col_name [(length)] [ASC | DESC]
```

增加索引

```sql
create [UNIQUE|FULLTEXT|SPATIAL] index cityname on city (city(10));
```

### 索引测试

### 设计索引的原则

创建索引的时候请尽量考虑符合这些原则，便于提升索引的使用效率，更高效地使用索引

- 搜索的索引列，不一定是所要选择的列。换句话说，最适合索引的列是出现在 WHERE 子句中的列，或连接子句中指定的列，而不是出现在 SELECT 关键字后的选择列表中的列
- 使用惟一索引。考虑某列中值的分布。索引的列的基数越大，索引的效果越好。例如，存放出生日期的列具有不同值，很容易区分各行。而用来记录性别的列，只含有“ M”和“F”，则对此列进行索引没有多大用处，因为不管搜索哪个值，都会得出大约一半的行
- 使用短索引。如果对字符串列进行索引，应该指定一个前缀长度，只要有可能就应该这样做。
- 利用最左前缀。在创建一个 n 列的索引时，实际是创建了 MySQL 可利用的 n 个索引。多列索引可起几个索引的作用，因为可利用索引中最左边的列集来匹配行。这样的列集称为最左前缀
- 不要过度索引。每个额外的索引都要占用额外的磁盘空间，并降低写操作的性能
- 对于 InnoDB 存储引擎的表，记录默认会按照一定的顺序保存，如果有明确定义的主键，则按照主键顺序保存。如果没有主键，但是有唯一索引，那么就是按照唯一索引的顺序保存。如果既没有主键又没有唯一索引，那么表中会自动生成一个内部列，按照这个列的顺序保存。按照主键或者内部列进行的访问是最快的，所以 InnoDB 表尽量自己指定主键，当表中同时有几个列都是唯一的，都可以作为主键的时候，要选择最常作为访问条件的列作为主键，提高查询的效率。另外，还需要注意，InnoDB 表的普通索引都会保存主键的键值，所以主键要尽可能选择较短的数据类型

### BTREE 索引与 HASH 索引

HASH 索引有一些重要的特征需要在使用的时候特别注意

- 只用于使用=或<=>操作符的等式比较
- 优化器不能使用 HASH 索引来加速 ORDER BY 操作
- MySQL 不能确定在两个值之间大约有多少行。如果将一个 MyISAM 表改为 HASH 索引的 MEMORY 表，会影响一些查询的执行效率
- 只能使用整个关键字来搜索一行

BTREE 索引

当使用>、<、>=、<=、BETWEEN、!=或者<>，或者 LIKE 'pattern'（其中'pattern'不以通配符开始）操作符时，都可以使用相关列上的索引
## 锁

### 类型
| 类型 | 优点 | 缺点 | 适用场景 |
| :--- | :--- | :--- | :--- |
| 表级锁 | 开销小，加锁快，不会出现死锁 | 锁定粒度大，发生锁冲突的概率高，并发度最低 | 适用于以查询为主，只有少量按索引条件更新数据的应用 |
| 行级锁 | 锁定粒度小，发生锁冲突的概率最低，并发度也高 | 开销大，加锁慢，会出现死锁 | 适合有大量按索引条件并发更新少量不同数据，同时又有并发查询的应用 |
| 页面锁 | 开销和加锁时间介于表级锁和行级锁之间 | 会出现死锁，锁定粒度位于表级锁和行级锁之间，并发度一般 |  |


### MyISAM 表锁

- 通过`show status like 'table%'`进行查看表级锁争用情况，`Table_locak_waited`的值越高，争用越严重
- 表级锁的两种模式：表共享读锁和表独占写锁。
- 当前线程获得读锁，其他线程仍然可以读，但是不可以写。若当前线程获得写锁，其他用户不能读锁和写锁，只有持有写锁的线程可以更新操作。
- MyISAM 只能访问显示加锁的表，不能范围未加锁的表
- MyISAM 可以设置存储引擎并发插入将 concurrent_insert 设置成 2（不管表中有没有删除行），都可以在后面添加数据，只不过需要定时的去执行 OPTIMIZE TABLE 语句来整理空间碎片。
- MyISAM 的锁调度：如果一个队列，先获得读锁，但是后一个队列需要写锁，也会先进行写锁，把读锁放到后面，因为 MySQL 认为写操作一般比读操作重要，所以需要设置一些参数进行修改锁的调度 - 通过指定启动参数 low-priority-updates，使 MyISAM 引擎默认给予读请求以优先的权利 - 通过执行命令 SET LOW_PRIORITY_UPDATES=1，使该连接发出的更新请求优先级降低 - 通过指定 INSERT、UPDATE、DELETE 语句的 LOW_PRIORITY 属性，降低该语句的优先级 - 给系统参数 max_write_lock_count 设置一个合适的值，当一个表的读锁达到这个值后，MySQL 就暂时将写请求的优先级降低，给读进程一定获得锁的机会

### InnoDB 锁

- InnoDB 锁和 MyISAM 有以下的不同点： - 支持事务 - 采用的行级锁
- 事务的四个属性（ACID）： - 原子性（A）：事务是一个原子操作，要么全成功，要么全失败 - 一致性（C）：在事务开始和完成时，数据都必须保持一致状态。 - 隔离性（I） ：保证事务不受外部并发操作影响的“独立”环境执行 - 持久性（D）：完成事务后，数据修改是永久性的。
- 并发事务处理带来的问题： - 更新丢失：当两个事务同时修改一行，由于其他事物不知道别的事务是否在修改，导致最后的更新覆盖了其他事物所做的更新。可通过写锁进行解决，在更新的时候让别的事务无法更新 - 脏读：一个事务正在修改数据，在提交前另一个事务读取了数据，导致数据不是最终的数据。 - 不可重复读：一个事务在读书某数据一段时候后，再次读取数据，却发现读出的数据已经发生改变。 - 幻读：一个事务按相同的查询条件重新读取以前检索过的数据，却发现其他事物插入了满足其查询条件的新数据。
- 事务隔离级别： - 更新丢失问题：需要在应用端添加锁，来防止更新丢失 - 脏读、不可重复读、幻读：都是数据库读一致性问题，采用数据库的事务隔离机制实现 - 在读数据之前加锁 - 通过一定机制生成一致性数据快照，从而实现读一致性 - ![](https://img-blog.csdnimg.cn/img_convert/ed8db85b70c443324b4647fbed9adedd.png#alt=)
- 行锁模式及加锁方法 - 共享锁：允许一个事务去读一行，阻止其他事务获取相同数据集的排他锁 - 排他锁：允许获得排他锁的事务更新数据，阻止其他事务获取相同数据集的共享读锁和排他写锁 - 为了允许表锁和行锁的共存，实现多粒度锁机制，InnoDB 还有两种内部使用的意向锁，都为表锁 - 意向共享锁：事务打算给数据行加航共享锁，事务在给一个数据加共享锁前必须先获得该表的意向共享锁 - 意向排他锁：事务打算给数据加行排他锁，必须先获取该表的意向排他锁
## 优化

### 优化 SQL 的一般步骤

当遇到需要优化的 SQL 时，按照步骤进行优化从而能更快的找到问题的所在。

1.通过命令了解各种 SQL 的执行频率

- 客户端连接之后，通过 show [session|global]status 可查看命令的执行次数，默认 session
- session:当前连接
- global: 自数据库启动

> `show status 'Com_%';` > ![](https://imgconvert.csdnimg.cn/aHR0cDovL25vdGVib29rLnpoYW5namlhaGFvLnNpdGUvMjAyMDA1MDgxNjQwMjMucG5n?x-oss-process=image/format,png#alt=20200508164023.png)

Com_xxx 表示每个 xxx 语句执行的次数

> - Com_select : 执行 select 操作的次数，一次查询只累加 1
> - Com_insert : 执行 insert 操作的次数，对于批量插入的 insert 操作，只累加一次
> - Com_update : 执行 update 的操作次数
> - Com_delete : 执行 delete 操作的次数
> - innodb_rows_read : select 查询返回的行数
> - innodb_rows_inserted : 执行 insert 操作的行数


2.定位执行效率较低的 SQL 语句

- 
通过慢查询日志定位查询慢的 sql 语句，使用--log-slow-queries[=file_name]选项启动时，mysqld 写一个包含所有执行时间超过 long_query_time 妙的 SQL 语句的日志文件

- 
通过`show processlist`命令查看当前 MySQL 在进行的线程，包括线程的状态，是否锁表等，可以实时查看 SQL 的执行情况

3.通过 EXPLAIN 分析低效 SQL 的执行计划


可以通过 EXPLAIN 或者 DESC 命令获取 MySQL 如何执行 SELECT 语句的信息，包括在 SELECT 语句执行过程中表如何连接和连接的顺序。

- 
比如想计算 2006 年所有公司的销售额，需要关联 sales 表和 company 表，并且对 moneys 字段做求和（sum）操作

- 
`explain select sum(moneys) from sales a,company b where a.company_id = b.id and a.year= 2006\G;`

- 
![](https://imgconvert.csdnimg.cn/aHR0cDovL25vdGVib29rLnpoYW5namlhaGFvLnNpdGUvMjAyMDA1MDgyMjU5NTcucG5n?x-oss-process=image/format,png#alt=20200508225957.png)

- 
select_type：表示 SELECT 的类型，常见的取值有 SIMPLE（简单表，即不使用表连接或者子查询）、PRIMARY（主查询，即外层的查询）、UNION（UNION 中的第二个或者后面的查询语句）、SUBQUERY（子查询中的第一个 SELECT）等。

- 
table：输出结果集的表。

- 
type：表示表的连接类型，性能由好到差的连接类型为 system（表中仅有一行，即常量表）、const（单表中最多有一个匹配行，例如 primary key 或者 unique index）、eq_ref（对于前面的每一行，在此表中只查询一条记录，简单来说，就是多表连接中使用 primary key 或者 unique index）、 ref （与 eq_ref 类似， 区别在于不是使用 primarykey 或者 unique index，而是使用普通的索引）、ref_or_null（与 ref 类似，区别在于条件中包含对 NULL 的查询） 、index_merge(索引合并优化)、unique_subquery（in 的后面是一个查询主键字段的子查询）、 index_subquery （与 unique_subquery 类似，区别在于 in 的后面是查询非唯一索引字段的子查询）、 range （单表中的范围查询）、index（对于前面的每一行，都通过查询索引来得到数据）、all（对于前面的每一行,都通过全表扫描来得到数据）

- 
possible_keys：表示查询时，可能使用的索引

- 
key：表示实际使用的索引

- 
key_len：索引字段的长度

- 
rows：扫描行的数量

- 
Extra：执行情况的说明和描述

4.确定问题并采取相应的优化措施


以上基本就可以确认问题出现的原因。此时用户可以根据情况采取相应的措施，进行优化提高执行的效率

### 索引问题

索引是数据库优化中最常用也是最重要的手段之一， 通过索引通常可以帮助用户解决大多数的 SQL 性能问题

1.索引的存储分类

2.如何使用

3.索引使用情况

### 简单的优化方法

1.定期分析表和检查表

2.定期优化表

### 常用 SQL 的优化

1.大批量插入数据

2.优化 INSERT 语句

3.优化 GROUP BY 语句

4.优化 ORDER BY 语句

5.优化嵌套查询

6.如何优化 OR
