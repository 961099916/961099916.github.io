# SpringBoot整合Elasticsearh
Elasticsearh是一个全文搜索工具，可以用于站内搜索和商品搜索。
## Docker搭建Elasticsearch
- 执行`docker pull docker.elastic.co/elasticsearch/elasticsearch:6.3.2` 下载es的镜像
- 执行`docker run -d --name es -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:6.3.2`，运行es进行并进行端口映射，打开9200则可以看到es的基本信息，也可通过kibana进行界面化的操作。

## SpringBoot整合Elasticsearch
SpringBoot整合Es非常的简单，但是项目如果已经整合了Redis则需要在Application.java的min方法中添加` System.setProperty("es.set.netty.runtime.available.processors", "false");`否则启动将会报错
### 依赖
首先需要在POM中添加依赖
```xml
    <!--elasticsearch-->
     <dependency>
         <groupId>org.springframework.boot</groupId>
         <artifactId>spring-boot-starter-data-elasticsearch</artifactId>
     </dependency>
```
### 配置
在application.yml中添加配置
```yml
spring:
    data:
        elasticsearch:
        cluster-name: docker-cluster
        cluster-nodes: localhost:9300
```
## SpringBoot基本增删改查
### 通过`ElasticsearchRepository`实现增删改查
#### 1. 编写`Repository`类
```java
import io.renren.modules.generator.model.BlogModel;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

/**
 * @author zhangjiahao
 * @description Blog测试ES$
 * @date 2020-03-24 15:38:40
 */
@Repository
public interface BlogRepository extends ElasticsearchRepository<BlogModel, String> {
}

```
#### 2. 测试基本的增删改查
```java
    @GetMapping("/es/add")
    public R addEsBlog(){
        BlogModel blogModel = new BlogModel();
        blogModel.setId(UUID.randomUUID().toString());
        blogModel.setTime(new Date());
        blogModel.setTitle("Es 测试"+new Random().nextInt(100));
        // 添加
        blogRepository.save(blogModel);
        return R.ok();
    }

    @GetMapping("/es/get")
    public R getEsBlog(){
        // 通过Repository进行查询
        Iterable<BlogModel> all = blogRepository.findAll();
        List<BlogModel> list = new ArrayList<>();
        for (BlogModel blogModel : all) {
                list.add(blogModel);
        }
        return R.ok().put("data",list);
    }

    @GetMapping("/es/id")
    public R getEsBlogById(String id){
        // 条件查询
        MatchQueryBuilder query = QueryBuilders.matchQuery("id", id);
        Iterable<BlogModel> search = blogRepository.search(query);
        List<BlogModel> list = new ArrayList<>();
        for (BlogModel blogModel : search) {
            list.add(blogModel);
        }
        return R.ok().put("data",list);
    }
    @DeleteMapping("/es/delete/{id}")
    public R deleteById(@PathVariable("id")String id){
        // 通过ID删除
      blogRepository.deleteById(id);
      return R.ok("删除成功");
    }
```

## Docker安装Kibana

## Elasticsearch基本开发
