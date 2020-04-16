# Activiti
SpringBoot整合Activiti7工作流程。
## SpringBoot整合Activiti7
### pom依赖
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
### 去除权限
由于默认集成了Sercurity，所以需要去除配置
```java
@SpringBootApplication(
    exclude = {org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class,
        org.springframework.boot.actuate.autoconfigure.security.servlet.ManagementWebSecurityAutoConfiguration.class})
```
### yaml配置
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
### 测试
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
### 注意
- 如果使用了IDEA的actiBPM，需要对生成文件进行删除`xmlns=""`，否则不能进行启动，会报关于process节点的问题。
- 需要修改表数据
## 25张表
## TaskService
## RuntimeService
## RepositoryService
## 涨薪Demo
### 创建bpmn文件
通过IDEA插件进行制作涨薪流程图：
![涨薪流程图](http://notebook.zhangjiahao.site/markdown-img-paste-2020041617040936.png)
### 部署流程图
```java
/**
    * 流程部署的
    *
    * @return
    */
   @GetMapping("/deploy")
   public Object deploy() {
       // 通过流程key判断是否存在
       List<Deployment> raise = deployFind("raise");
       Deployment deployment = null;
       // 若没有该流程则添加流程
       if (raise == null || raise.isEmpty()) {
           log.info("未添加过该流程，进行添加");
           // 获得bpmn资源，同样若需要图片则加载图片资源
           InputStream resourceAsStream = this.getClass().getClassLoader().getResourceAsStream("processes/raise.bpmn");
           deployment = repositoryService.createDeployment()
               // 添加资源流
               .addInputStream("raise.bpmn", resourceAsStream)
               // 设置流程名称
               .name("涨薪")
               // 设置流程key
               .key("raise")
               // 部署
               .deploy();
       } else {
           log.info("已经添加过该流程");
           deployment = raise.get(0);
       }
       log.info("部署流程ID：\t" + deployment.getId());
       log.info("部署流程名称：\t" + deployment.getName());
       log.info("部署流程的key:\t" + deployment.getKey());
       log.info("部署流程的版本version:\t" + deployment.getVersion());
       return "SUCCESS";
   }
```
> 为了方便这里也编写了查询流程图
```java
/**
   * 通过key查询部署的流程 key为空是查询所有的
   *
   * @param deploymentKey
   * @return
   */
  @GetMapping("/deploy/find")
  public List<Deployment> deployFind(String deploymentKey) {
      List<Deployment> list = new ArrayList<>();
      if (StringUtils.isBlank(deploymentKey)) {
          list = repositoryService.createDeploymentQuery().list();
      } else {
          list = repositoryService.createDeploymentQuery().deploymentKey(deploymentKey).list();
      }
      for (Deployment deployment : list) {
          log.info("部署流程ID：\t" + deployment.getId());
          log.info("部署流程名称：\t" + deployment.getName());
          log.info("部署流程的key:\t" + deployment.getKey());
          log.info("部署流程的版本vversion:\t" + deployment.getVersion());
      }
      return list;
  }
```
### 查看定义流程
以后可能通过定义获取流程图文件或者图片
```java

    /**
     * 查看定义流程
     *
     * @param processDefinitionKey
     */
    @GetMapping("/define/find")
    public void defineFindOne(String processDefinitionKey) {
        List<ProcessDefinition> list = new ArrayList<>();
        if (StringUtils.isNotBlank(processDefinitionKey)) {
            list = repositoryService.createProcessDefinitionQuery().processDefinitionKey(processDefinitionKey).list();
        } else {
            list = repositoryService.createProcessDefinitionQuery().list();
        }
        for (ProcessDefinition processDefinition : list) {
            log.info("定义流程ID：\t" + processDefinition.getId());
            log.info("定义流程名称：\t" + processDefinition.getName());
            log.info("定义流程的key:\t" + processDefinition.getKey());
            log.info("定义流程的版本vversion:\t" + processDefinition.getVersion());
        }
    }
```
### 开启流程
> 这里设置了条件，所以需要给判断你的条件赋值，和为task人员赋值
```java
/**
    * 根据流程定义key，业务id进行开启流程 数据暂用测试数据
    *
    * @param processDefinitionKey
    * @param bussineKey
    */
   @GetMapping("/instance/start")
   public void instanceStart(String processDefinitionKey, String bussineKey) {
       // 准备数据
       Map<String, Object> map = new HashMap<>();
       // 设置num 做排他网关
       map.put("num", 800);
       map.put("user", "zhang");
       map.put("user1", "jia");
       map.put("user2", "hao");
       map.put("user3", "raise");
       ProcessInstance processInstance =
           runtimeService.startProcessInstanceByKey(processDefinitionKey, bussineKey, map);
       log.info("流程实例ID:" + processInstance.getId());
       log.info("流程实例名称：" + processInstance.getName());
       log.info("当前活动ID：" + processInstance.getActivityId());
   }
```
### 查询人员的审批任务
```java
/**
 * 通过processDefinitionKey和user进行查询该user的任务
 *
 * @param processDefinitionKey
 * @param user
 */
@GetMapping("/instance/task/user")
public void instanceTaskUser(String processDefinitionKey, String user) {
    List<Task> list = taskService.createTaskQuery().processDefinitionKey(processDefinitionKey)
        .includeProcessVariables().taskAssignee(user).list();
    for (Task task : list) {
        log.info("task的ID：" + task.getId());
        log.info("流程实例ID:" + task.getProcessInstanceId());
        log.info("任务负责人:" + task.getAssignee());
        log.info("任务名称:" + task.getName());
    }
}
```
### 完成待办任务
```java
/**
 * 通过taskId和user完成任务 1 先查询
 *
 * 2 再完成
 *
 * @param taskId
 * @param user
 */
@GetMapping("/instance/task/user/complete")
public void instanceTaskUserComplete(String taskId, String user) {
    Task task = taskService.createTaskQuery().taskId(taskId).taskAssignee(user).singleResult();
    Map<String, Object> map = new HashMap<>();
    map.put("num", 800);
    if (task != null) {
        taskService.complete(task.getId(), map);
        log.info("任务完成");
    } else {
        log.info("没有任务");
    }
}
```
## 总结
[附带bpmn文件](https://zjh-lattice.oss-cn-beijing.aliyuncs.com/raise.bpmn?OSSAccessKeyId=LTAIaB0DXqLXjK0Z&Expires=1587028275&Signature=DrzgoSpdt4XHsq5iU52IH4QGYzQ%3D)
