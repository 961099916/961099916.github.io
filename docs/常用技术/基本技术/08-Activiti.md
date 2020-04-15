# Activiti
SpringBoot整合Activiti7工作流程。
## pom依赖
activiti里包含了mybatis，如果使用了mybatis会出现冲突，所以别忘了去除
```xml
        <dependency>
            <groupId>org.activiti.dependencies</groupId>
            <artifactId>activiti-dependencies</artifactId>
            <version>7.1.0.M4</version>
            <scope>import</scope>
            <type>pom</type>
        </dependency>
        <dependency>
            <groupId>org.activiti</groupId>
            <artifactId>activiti-spring-boot-starter</artifactId>
            <version>7.1.0.M4</version>
            <exclusions>
                <exclusion>
                    <artifactId>mybatis</artifactId>
                    <groupId>org.mybatis</groupId>
                </exclusion>
            </exclusions>
        </dependency>
```
## 去除权限
由于默认集成了Sercurity，所以需要去除配置
```java
@SpringBootApplication(
    exclude = {org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class,
        org.springframework.boot.actuate.autoconfigure.security.servlet.ManagementWebSecurityAutoConfiguration.class})
```
## yaml配置
```yaml
spring:
    activiti:
        check-process-definitions: true #自动检查、部署流程定义文件
        database-schema-update: true #自动更新数据库结构
        #流程定义文件存放目录
        process-definition-location-prefix: classpath:/processes/
        db-history-used: true
        history-level: audit
```
## 测试
```java
@Autowired
  private RuntimeService runtimeService;

  @Autowired
  private TaskService taskService;

  @Autowired
  private RepositoryService repositoryService;

  @GetMapping("/activiti/deploy")
  public String startOneProcess() {
      DeploymentBuilder deploymentBuilder = repositoryService.createDeployment();
      Deployment deploy =
          deploymentBuilder.name("请假流程").tenantId("a").addClasspathResource("processes/leave.bpmn").deploy();
      System.out.println("deploymentBuilder" + deploymentBuilder);
      System.out.println("deploy" + deploy);
      return "success";
  }
```
![测试](http://notebook.zhangjiahao.site/markdown-img-paste-2020041513231810.png)
## 注意
- 如果使用了IDEA的actiBPM，需要对生成文件进行删除`xmlns=""`，否则不能进行启动，会报关于process节点的问题。
