---
title: Spring 初始化流程
order: 3
category:
- it
tags:
- 框架
- spring
- 源码
---
## Spring 初始化流程

spring 的初始化本质为 ApplicationContext 对象的构建，这里通过注解进行构建 AnnotationConfigApplicationContext 。构建的主要大的步骤为：
- 调用无参构造方法
- 注册类
- 刷新

整个过程极为重要的为==刷新==，而且后续也都在讲述 ==刷新==的步骤。


 以下是 ApplicationContext 对象构建的流程图： 

<img src="https://zhangjiahao-prd.oss-cn-beijing.aliyuncs.com/uPic/uriZV2.jpg" alt="uriZV2" style="zoom:50%;" />


### 什么是 ApplicationContext

Spring 是 IOC 的本质其实是自己进行管理 Bean 对象，然后通过抽象出来的流程根据对应的配置进行注入 Bean 对象，但是如何管理 Bean 对象，那就需要一个**容器**进行管理。这个容器就是 **BeanFactory**，但是整个 Spring 系统又存在很多功能，用户就需要使用多个系统对象，所以又提出一个 **ApplicationContext** 上下文对象，能够通过该对象获得更多的功能。

------

### 无参 ApplicationContext



Spring 中含有多个 ApplicationContext ，不同的 ApplicationContext 表示通过不同的方法构建上下文对象，例如：ClassPathXmlApplicationContext 、FileSystemXmlApplicationContext。一般对应的 读取方法（**reader**）不一致。此处初始化了 AnnotationConfigApplicationContext 对应的 AnnotatedBeanDefinitionReader。代码如下：



```java
   public AnnotationConfigApplicationContext() {
        this.reader = new AnnotatedBeanDefinitionReader(this);
        this.scanner = new ClassPathBeanDefinitionScanner(this);
    }
```

------

### 注册对应的 class



通过注册的类来进行扫描相关注解实现组件的注册。如下代码可以看出通过 reader 进行注册类信息：



```java
    @Override
    public void register(Class<?>... componentClasses) {
		// 注册的组件类不能为空
        Assert.notEmpty(componentClasses, "At least one component class must be specified");
		// this.reader = AnnotatedBeanDefinitionReader
        this.reader.register(componentClasses);
    }
```

------

### 注册对象



通过跟踪 reader.register 方法，可以看到主要是调用 **doRegisterBean** 方法进行注册的。



```java
    private <T> void doRegisterBean(Class<T> beanClass, @Nullable String name,
        @Nullable Class<? extends Annotation>[] qualifiers, @Nullable Supplier<T> supplier,
        @Nullable BeanDefinitionCustomizer[] customizers) {
        // 通过类创建 beanDefinition
        AnnotatedGenericBeanDefinition abd = new AnnotatedGenericBeanDefinition(beanClass);
		// conditional 判断是否跳过注册
        if (this.conditionEvaluator.shouldSkip(abd.getMetadata())) {
            return;
        }
        // 设置 beanDefinition 的 生产者
        abd.setInstanceSupplier(supplier);
		// 获取 beanDefinition 的 作用域 Scopt  singleton
        ScopeMetadata scopeMetadata = this.scopeMetadataResolver.resolveScopeMetadata(abd);
        abd.setScope(scopeMetadata.getScopeName());
		// 若传入 beanName 则用传入的，没传入在用默认的 类名首字母小写
        String beanName = (name != null ? name : this.beanNameGenerator.generateBeanName(abd, this.registry));
		// 处理通用注解 Lazy Primary DependsOn Role Description，给 beanDefinition 设置对应的数据
        AnnotationConfigUtils.processCommonDefinitionAnnotations(abd);
        // 处理 @Qualifier 注解
        if (qualifiers != null) {
            for (Class<? extends Annotation> qualifier : qualifiers) {
                if (Primary.class == qualifier) {
                    abd.setPrimary(true);
                } else if (Lazy.class == qualifier) {
                    abd.setLazyInit(true);
                } else {
                    abd.addQualifier(new AutowireCandidateQualifier(qualifier));
                }
            }
        }
        // 处理自定义的 BeanDefinitionCustomizer
        if (customizers != null) {
            for (BeanDefinitionCustomizer customizer : customizers) {
                customizer.customize(abd);
            }
        }
		// 创建 BeanDefinitionHolder
        BeanDefinitionHolder definitionHolder = new BeanDefinitionHolder(abd, beanName);
        definitionHolder = AnnotationConfigUtils.applyScopedProxyMode(scopeMetadata, definitionHolder, this.registry);
        // 注册 beanDefinition
        BeanDefinitionReaderUtils.registerBeanDefinition(definitionHolder, this.registry);
    }
```



根据以上代码可以看出本质为 获取类的注解和对应的类型信息进行构建出一个 definitionHolder。然后进行注册，而 definitionHolder 含有 [**BeanDefinition**](https://www.yuque.com/jiuxialb/gt28i2/4ff80dc8a8533fe301de836bb7d5ef39###BeanDefinition的默认实现类) 的属性，这里主要是记录了类的相关信息。

------

### `prepareRefresh()`



该方法主要是进行刷新前的**属性设置**，**清除上一次刷新缓存的数据和初始化一些配置**。设置流程如下图：
![[✅Spring-prepareRefresh|500x500]]
代码如下：



```java
protected void prepareRefresh() {
		// 设置启动时间
		this.startupDate = System.currentTimeMillis();
		// 更新状态
		this.closed.set(false);
		this.active.set(true);
		// 检测是否开启 debug
		if (logger.isDebugEnabled()) {
			if (logger.isTraceEnabled()) {
				logger.trace("Refreshing " + this);
			} else {
				logger.debug("Refreshing " + getDisplayName());
			}
		}

		// initialize any placeholder property sources in the context environment.
		initPropertySources();

		// Validate that all properties marked as required are resolvable:
		// see ConfigurablePropertyResolver#setRequiredProperties
		getEnvironment().validateRequiredProperties();

		// Store pre-refresh ApplicationListeners...
		if (this.earlyApplicationListeners == null) {
			this.earlyApplicationListeners = new LinkedHashSet<>(this.applicationListeners);
		} else {
			// Reset local application listeners to pre-refresh state.
			this.applicationListeners.clear();
			this.applicationListeners.addAll(this.earlyApplicationListeners);
		}

		// Allow for the collection of early ApplicationEvents,
		// to be published once the multicaster is available...
		this.earlyApplicationEvents = new LinkedHashSet<>();
	}
```

------

### `obtainFreshBeanFactory()`



该方法的主要是两个操作：



1. 设置 BeanFactory 的 id，标志是一个新的 BeanFactory

1. 获取当前的 BeanFactory



```java
	protected ConfigurableListableBeanFactory obtainFreshBeanFactory() {
		refreshBeanFactory();
		return getBeanFactory();
	}
```



### `prepareBeanFactory(beanFactory)`



本人认为此处是进行初始化 BeanFactory，添加了一些**默认的配置**，相关代码如下：



```java
protected void prepareBeanFactory(ConfigurableListableBeanFactory beanFactory) {
		// 告诉内部bean工厂使用上下文的类装入器等。
		beanFactory.setBeanClassLoader(getClassLoader());
		// 设置表达式类#{}
		beanFactory.setBeanExpressionResolver(new StandardBeanExpressionResolver(beanFactory.getBeanClassLoader()));
		// 设置属性编辑器
		beanFactory.addPropertyEditorRegistrar(new ResourceEditorRegistrar(this, getEnvironment()));

		// 使用上下文回调来配置bean工厂
		beanFactory.addBeanPostProcessor(new ApplicationContextAwareProcessor(this));
		beanFactory.ignoreDependencyInterface(EnvironmentAware.class);
		beanFactory.ignoreDependencyInterface(EmbeddedValueResolverAware.class);
		beanFactory.ignoreDependencyInterface(ResourceLoaderAware.class);
		beanFactory.ignoreDependencyInterface(ApplicationEventPublisherAware.class);
		beanFactory.ignoreDependencyInterface(MessageSourceAware.class);
		beanFactory.ignoreDependencyInterface(ApplicationContextAware.class);

		//在普通工厂中，BeanFactory接口未注册为可解析类型。MessageSource作为bean注册(并找到用于自动装配)
		beanFactory.registerResolvableDependency(BeanFactory.class, beanFactory);
		beanFactory.registerResolvableDependency(ResourceLoader.class, this);
		beanFactory.registerResolvableDependency(ApplicationEventPublisher.class, this);
		beanFactory.registerResolvableDependency(ApplicationContext.class, this);

		// Register early post-processor for detecting inner beans as ApplicationListeners.
		beanFactory.addBeanPostProcessor(new ApplicationListenerDetector(this));

		// Detect a LoadTimeWeaver and prepare for weaving, if found.
		if (beanFactory.containsBean(LOAD_TIME_WEAVER_BEAN_NAME)) {
			beanFactory.addBeanPostProcessor(new LoadTimeWeaverAwareProcessor(beanFactory));
			// Set a temporary ClassLoader for type matching.
			beanFactory.setTempClassLoader(new ContextTypeMatchClassLoader(beanFactory.getBeanClassLoader()));
		}

		// Register default environment beans.
		if (!beanFactory.containsLocalBean(ENVIRONMENT_BEAN_NAME)) {
			beanFactory.registerSingleton(ENVIRONMENT_BEAN_NAME, getEnvironment());
		}
		if (!beanFactory.containsLocalBean(SYSTEM_PROPERTIES_BEAN_NAME)) {
			beanFactory.registerSingleton(SYSTEM_PROPERTIES_BEAN_NAME, getEnvironment().getSystemProperties());
		}
		if (!beanFactory.containsLocalBean(SYSTEM_ENVIRONMENT_BEAN_NAME)) {
			beanFactory.registerSingleton(SYSTEM_ENVIRONMENT_BEAN_NAME, getEnvironment().getSystemEnvironment());
		}
	}
```



### `postProcessBeanFactory(beanFactory)`



此处默认是没有实现的，但是 web 相关的 ApplicationContext 是进行了实现，添加了配置，此时是 BeanFactory 初始化完成，之后会执行此操作，此时可以进行 BeanFactory 的某些功能的自定义，例如**结合 Tomcat 加载 Servlet**。下面代码是 AbstractRefreshableWebApplicationContext ：



```java
   protected void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) {
        beanFactory.addBeanPostProcessor(new ServletContextAwareProcessor(this.servletContext, this.servletConfig));
        beanFactory.ignoreDependencyInterface(ServletContextAware.class);
        beanFactory.ignoreDependencyInterface(ServletConfigAware.class);

        WebApplicationContextUtils.registerWebApplicationScopes(beanFactory, this.servletContext);
        WebApplicationContextUtils.registerEnvironmentBeans(beanFactory, this.servletContext, this.servletConfig);
    }
```



### `invokeBeanFactoryPostProcessors(beanFactory)`



根据方法名可以看出此处是执行 BeanFactory 的 PostProcessor，对于实现 **BeanFactoryPostProcessor** 接口的类也就是在这时候进行执行的，此时可以对 BeanFactory 进行一系列的处理。例如：**AOP 的织入**、[**@Configuration** ]() **注解的处理** 等。
该方法主要有两步：



1. 执行 BeanFactoryPostProcessor

1. 判断是否需要 AOP



#### 执行 BeanFactoryPostProcessor



跟进代码可以看出执行 BeanFactoryPostProcessor 的主要方法是 **invokeBeanFactoryPostProcessors**，流程图如下：



![[✅spring-invokeBeanFactoryPostProcessors|500x500]]



这里主要的功能是执行 BeanFactoryPostProcessor。这里会优先执行配置系统自带的 BeanFactoryPostProcessor 进行初始化部分功能，例如[@Configuration ]() 的配置类中的 [@Bean ]() 也会在此时进行加载到 BeanDefinition。 



默认的 BeanFactoryPostProcessor 有 **internalConfigurationAnnotationProcessor**、**internalEventListenerFactory**、**internalEventListenerProcessor**、**internalAutowiredAnnotationProcessor**
具体的代码如下：



```java
public static void invokeBeanFactoryPostProcessors(ConfigurableListableBeanFactory beanFactory,
        List<BeanFactoryPostProcessor> beanFactoryPostProcessors) {

        // Invoke BeanDefinitionRegistryPostProcessors first, if any.
        Set<String> processedBeans = new HashSet<>();
        // 判断是否是 BeanDefinitionRegistry
        if (beanFactory instanceof BeanDefinitionRegistry) {
            BeanDefinitionRegistry registry = (BeanDefinitionRegistry)beanFactory;
            List<BeanFactoryPostProcessor> regularPostProcessors = new ArrayList<>();
            List<BeanDefinitionRegistryPostProcessor> registryProcessors = new ArrayList<>();

            for (BeanFactoryPostProcessor postProcessor : beanFactoryPostProcessors) {
                if (postProcessor instanceof BeanDefinitionRegistryPostProcessor) {
                    BeanDefinitionRegistryPostProcessor registryProcessor =
                        (BeanDefinitionRegistryPostProcessor)postProcessor;
                    registryProcessor.postProcessBeanDefinitionRegistry(registry);
                    registryProcessors.add(registryProcessor);
                } else {
                    regularPostProcessors.add(postProcessor);
                }
            }

            // Do not initialize FactoryBeans here: We need to leave all regular beans
            // uninitialized to let the bean factory post-processors apply to them!
            // Separate between BeanDefinitionRegistryPostProcessors that implement
            // PriorityOrdered, Ordered, and the rest.
            List<BeanDefinitionRegistryPostProcessor> currentRegistryProcessors = new ArrayList<>();

            // First, invoke the BeanDefinitionRegistryPostProcessors that implement PriorityOrdered.
            String[] postProcessorNames =
                beanFactory.getBeanNamesForType(BeanDefinitionRegistryPostProcessor.class, true, false);
            for (String ppName : postProcessorNames) {
                if (beanFactory.isTypeMatch(ppName, PriorityOrdered.class)) {
                    currentRegistryProcessors
                        .add(beanFactory.getBean(ppName, BeanDefinitionRegistryPostProcessor.class));
                    processedBeans.add(ppName);
                }
            }
            sortPostProcessors(currentRegistryProcessors, beanFactory);
            registryProcessors.addAll(currentRegistryProcessors);
            invokeBeanDefinitionRegistryPostProcessors(currentRegistryProcessors, registry);
            currentRegistryProcessors.clear();

            // Next, invoke the BeanDefinitionRegistryPostProcessors that implement Ordered.
            postProcessorNames =
                beanFactory.getBeanNamesForType(BeanDefinitionRegistryPostProcessor.class, true, false);
            for (String ppName : postProcessorNames) {
                if (!processedBeans.contains(ppName) && beanFactory.isTypeMatch(ppName, Ordered.class)) {
                    currentRegistryProcessors
                        .add(beanFactory.getBean(ppName, BeanDefinitionRegistryPostProcessor.class));
                    processedBeans.add(ppName);
                }
            }
            sortPostProcessors(currentRegistryProcessors, beanFactory);
            registryProcessors.addAll(currentRegistryProcessors);
            invokeBeanDefinitionRegistryPostProcessors(currentRegistryProcessors, registry);
            currentRegistryProcessors.clear();

            // Finally, invoke all other BeanDefinitionRegistryPostProcessors until no further ones appear.
            boolean reiterate = true;
            while (reiterate) {
                reiterate = false;
                postProcessorNames =
                    beanFactory.getBeanNamesForType(BeanDefinitionRegistryPostProcessor.class, true, false);
                for (String ppName : postProcessorNames) {
                    if (!processedBeans.contains(ppName)) {
                        currentRegistryProcessors
                            .add(beanFactory.getBean(ppName, BeanDefinitionRegistryPostProcessor.class));
                        processedBeans.add(ppName);
                        reiterate = true;
                    }
                }
                sortPostProcessors(currentRegistryProcessors, beanFactory);
                registryProcessors.addAll(currentRegistryProcessors);
                invokeBeanDefinitionRegistryPostProcessors(currentRegistryProcessors, registry);
                currentRegistryProcessors.clear();
            }

            // Now, invoke the postProcessBeanFactory callback of all processors handled so far.
            invokeBeanFactoryPostProcessors(registryProcessors, beanFactory);
            invokeBeanFactoryPostProcessors(regularPostProcessors, beanFactory);
        }

        else {
            // Invoke factory processors registered with the context instance.
            invokeBeanFactoryPostProcessors(beanFactoryPostProcessors, beanFactory);
        }

        // Do not initialize FactoryBeans here: We need to leave all regular beans
        // uninitialized to let the bean factory post-processors apply to them!
        String[] postProcessorNames = beanFactory.getBeanNamesForType(BeanFactoryPostProcessor.class, true, false);

        // Separate between BeanFactoryPostProcessors that implement PriorityOrdered,
        // Ordered, and the rest.
        List<BeanFactoryPostProcessor> priorityOrderedPostProcessors = new ArrayList<>();
        List<String> orderedPostProcessorNames = new ArrayList<>();
        List<String> nonOrderedPostProcessorNames = new ArrayList<>();
        for (String ppName : postProcessorNames) {
            if (processedBeans.contains(ppName)) {
                // skip - already processed in first phase above
            } else if (beanFactory.isTypeMatch(ppName, PriorityOrdered.class)) {
                priorityOrderedPostProcessors.add(beanFactory.getBean(ppName, BeanFactoryPostProcessor.class));
            } else if (beanFactory.isTypeMatch(ppName, Ordered.class)) {
                orderedPostProcessorNames.add(ppName);
            } else {
                nonOrderedPostProcessorNames.add(ppName);
            }
        }

        // First, invoke the BeanFactoryPostProcessors that implement PriorityOrdered.
        sortPostProcessors(priorityOrderedPostProcessors, beanFactory);
        invokeBeanFactoryPostProcessors(priorityOrderedPostProcessors, beanFactory);

        // Next, invoke the BeanFactoryPostProcessors that implement Ordered.
        List<BeanFactoryPostProcessor> orderedPostProcessors = new ArrayList<>(orderedPostProcessorNames.size());
        for (String postProcessorName : orderedPostProcessorNames) {
            orderedPostProcessors.add(beanFactory.getBean(postProcessorName, BeanFactoryPostProcessor.class));
        }
        sortPostProcessors(orderedPostProcessors, beanFactory);
        invokeBeanFactoryPostProcessors(orderedPostProcessors, beanFactory);

        // Finally, invoke all other BeanFactoryPostProcessors.
        List<BeanFactoryPostProcessor> nonOrderedPostProcessors = new ArrayList<>(nonOrderedPostProcessorNames.size());
        for (String postProcessorName : nonOrderedPostProcessorNames) {
            nonOrderedPostProcessors.add(beanFactory.getBean(postProcessorName, BeanFactoryPostProcessor.class));
        }
        invokeBeanFactoryPostProcessors(nonOrderedPostProcessors, beanFactory);

        // Clear cached merged bean definitions since the post-processors might have
        // modified the original metadata, e.g. replacing placeholders in values...
        beanFactory.clearMetadataCache();
    }
```



#### 是否需要 AOP



通过加入 BeanPostProcessor 实现 AOP 的，代码如下：



```java
	if (beanFactory.getTempClassLoader() == null && beanFactory.containsBean(LOAD_TIME_WEAVER_BEAN_NAME)) {
			beanFactory.addBeanPostProcessor(new LoadTimeWeaverAwareProcessor(beanFactory));
			beanFactory.setTempClassLoader(new ContextTypeMatchClassLoader(beanFactory.getBeanClassLoader()));
		}
```

------

### `registerBeanPostProcessors(beanFactory)`



这里代码 BeanFactory 存储的 BeanPostProcessor 是使用的 List，所在这里根据相关注解进行排序添加，后续执行时只需要遍历执行即可。代码具体流程如下：
![[✅spring-registerBeanPostProcessors|500x500]]
相关代码如下：



```java
 public static void registerBeanPostProcessors(ConfigurableListableBeanFactory beanFactory,
        AbstractApplicationContext applicationContext) {

        String[] postProcessorNames = beanFactory.getBeanNamesForType(BeanPostProcessor.class, true, false);

        // Register BeanPostProcessorChecker that logs an info message when
        // a bean is created during BeanPostProcessor instantiation, i.e. when
        // a bean is not eligible for getting processed by all BeanPostProcessors.
        int beanProcessorTargetCount = beanFactory.getBeanPostProcessorCount() + 1 + postProcessorNames.length;
        beanFactory.addBeanPostProcessor(new BeanPostProcessorChecker(beanFactory, beanProcessorTargetCount));

        // Separate between BeanPostProcessors that implement PriorityOrdered,
        // Ordered, and the rest.
        List<BeanPostProcessor> priorityOrderedPostProcessors = new ArrayList<>();
        List<BeanPostProcessor> internalPostProcessors = new ArrayList<>();
        List<String> orderedPostProcessorNames = new ArrayList<>();
        List<String> nonOrderedPostProcessorNames = new ArrayList<>();
        for (String ppName : postProcessorNames) {
            if (beanFactory.isTypeMatch(ppName, PriorityOrdered.class)) {
                BeanPostProcessor pp = beanFactory.getBean(ppName, BeanPostProcessor.class);
                priorityOrderedPostProcessors.add(pp);
                if (pp instanceof MergedBeanDefinitionPostProcessor) {
                    internalPostProcessors.add(pp);
                }
            } else if (beanFactory.isTypeMatch(ppName, Ordered.class)) {
                orderedPostProcessorNames.add(ppName);
            } else {
                nonOrderedPostProcessorNames.add(ppName);
            }
        }

        // First, register the BeanPostProcessors that implement PriorityOrdered.
        sortPostProcessors(priorityOrderedPostProcessors, beanFactory);
        registerBeanPostProcessors(beanFactory, priorityOrderedPostProcessors);

        // Next, register the BeanPostProcessors that implement Ordered.
        List<BeanPostProcessor> orderedPostProcessors = new ArrayList<>(orderedPostProcessorNames.size());
        for (String ppName : orderedPostProcessorNames) {
            BeanPostProcessor pp = beanFactory.getBean(ppName, BeanPostProcessor.class);
            orderedPostProcessors.add(pp);
            if (pp instanceof MergedBeanDefinitionPostProcessor) {
                internalPostProcessors.add(pp);
            }
        }
        sortPostProcessors(orderedPostProcessors, beanFactory);
        registerBeanPostProcessors(beanFactory, orderedPostProcessors);

        // Now, register all regular BeanPostProcessors.
        List<BeanPostProcessor> nonOrderedPostProcessors = new ArrayList<>(nonOrderedPostProcessorNames.size());
        for (String ppName : nonOrderedPostProcessorNames) {
            BeanPostProcessor pp = beanFactory.getBean(ppName, BeanPostProcessor.class);
            nonOrderedPostProcessors.add(pp);
            if (pp instanceof MergedBeanDefinitionPostProcessor) {
                internalPostProcessors.add(pp);
            }
        }
        registerBeanPostProcessors(beanFactory, nonOrderedPostProcessors);

        // Finally, re-register all internal BeanPostProcessors.
        sortPostProcessors(internalPostProcessors, beanFactory);
        registerBeanPostProcessors(beanFactory, internalPostProcessors);

        // Re-register post-processor for detecting inner beans as ApplicationListeners,
        // moving it to the end of the processor chain (for picking up proxies etc).
        beanFactory.addBeanPostProcessor(new ApplicationListenerDetector(applicationContext));
    }
```

------

#### `initMessageSource()`



初始化消息源的流程图如下：
![[✅spring-initMessageSource|500x500]]
相关代码如下：



```java
	protected void initMessageSource() {
		ConfigurableListableBeanFactory beanFactory = getBeanFactory();
		if (beanFactory.containsLocalBean(MESSAGE_SOURCE_BEAN_NAME)) {
			this.messageSource = beanFactory.getBean(MESSAGE_SOURCE_BEAN_NAME, MessageSource.class);
			// Make MessageSource aware of parent MessageSource.
			if (this.parent != null && this.messageSource instanceof HierarchicalMessageSource) {
				HierarchicalMessageSource hms = (HierarchicalMessageSource) this.messageSource;
				if (hms.getParentMessageSource() == null) {
					// Only set parent context as parent MessageSource if no parent MessageSource
					// registered already.
					hms.setParentMessageSource(getInternalParentMessageSource());
				}
			}
			if (logger.isTraceEnabled()) {
				logger.trace("Using MessageSource [" + this.messageSource + "]");
			}
		} else {
			// 使用空MessageSource来接受getMessage调用。
			DelegatingMessageSource dms = new DelegatingMessageSource();
			dms.setParentMessageSource(getInternalParentMessageSource());
			this.messageSource = dms;
			beanFactory.registerSingleton(MESSAGE_SOURCE_BEAN_NAME, this.messageSource);
			if (logger.isTraceEnabled()) {
				logger.trace("No '" + MESSAGE_SOURCE_BEAN_NAME + "' bean, using [" + this.messageSource + "]");
			}
		}
	}
```

------

### `initApplicationEventMulticaster()`



初始化应用事件的广播流程如下：
![[✅spring-initApplicationEventMulticaster|500x500]]
相关代码如下：



```java
	protected void initApplicationEventMulticaster() {
		ConfigurableListableBeanFactory beanFactory = getBeanFactory();
		if (beanFactory.containsLocalBean(APPLICATION_EVENT_MULTICASTER_BEAN_NAME)) {
			this.applicationEventMulticaster =
					beanFactory.getBean(APPLICATION_EVENT_MULTICASTER_BEAN_NAME, ApplicationEventMulticaster.class);
			if (logger.isTraceEnabled()) {
				logger.trace("Using ApplicationEventMulticaster [" + this.applicationEventMulticaster + "]");
			}
		} else {
			this.applicationEventMulticaster = new SimpleApplicationEventMulticaster(beanFactory);
			beanFactory.registerSingleton(APPLICATION_EVENT_MULTICASTER_BEAN_NAME, this.applicationEventMulticaster);
			if (logger.isTraceEnabled()) {
				logger.trace("No '" + APPLICATION_EVENT_MULTICASTER_BEAN_NAME + "' bean, using " + "["
						+ this.applicationEventMulticaster.getClass().getSimpleName() + "]");
			}
		}
	}
```

------

### `onRefresh()`



该方法并为进行相关处理，而是留给了外部处理，例如 springboot 会初始化 web 容器。

------

### `registerListeners()`



该方法主要是注册相关的监听器，本质也是通过观察者模式实现。相关代码如下：



```java
	protected void registerListeners() {
		// Register statically specified listeners first.
		for (ApplicationListener<?> listener : getApplicationListeners()) {
			getApplicationEventMulticaster().addApplicationListener(listener);
		}

		// Do not initialize FactoryBeans here: We need to leave all regular beans
		// uninitialized to let post-processors apply to them!
		String[] listenerBeanNames = getBeanNamesForType(ApplicationListener.class, true, false);
		for (String listenerBeanName : listenerBeanNames) {
			getApplicationEventMulticaster().addApplicationListenerBean(listenerBeanName);
		}

		// Publish early application events now that we finally have a multicaster...
		Set<ApplicationEvent> earlyEventsToProcess = this.earlyApplicationEvents;
		this.earlyApplicationEvents = null;
		if (!CollectionUtils.isEmpty(earlyEventsToProcess)) {
			for (ApplicationEvent earlyEvent : earlyEventsToProcess) {
				getApplicationEventMulticaster().multicastEvent(earlyEvent);
			}
		}
	}
```

------

### 附录



#### BeanDefinition的默认实现类



```java
public abstract class AbstractBeanDefinition extends BeanMetadataAttributeAccessor
implements BeanDefinition, Cloneable {

  //默认作用域名称的常量：等效于单例
  public static final String SCOPE_DEFAULT = "";
  
  //自动装配的一些常量
  // autowireMode  = 0，默认值，未激活Autowiring。
  // bean 标签的 autowire 属性值为 no
  // 1、在xml中需要手动指定依赖注入对象 配置 property标签或者 constructor-arg标签
  // 2、使用 @Autowired 注解，autowireMode 的值也是 0
  public static final int AUTOWIRE_NO = AutowireCapableBeanFactory.AUTOWIRE_NO;
  
  //autowireMode  = 1，根据set方法的的名称作为Bean名称进行依赖查找
  //(去掉set，并尝试将首字母变为小写)，并将对象设置到该set方法的参数上
  // bean 标签的 autowire 属性值配置为 byName
  public static final int AUTOWIRE_BY_NAME = AutowireCapableBeanFactory.AUTOWIRE_BY_NAME;
  
  //autowireMode  = 2，根据set方法参数的类型作为Bean类型进行依赖查找
  //并将对象设置到该set方法的参数上
  // bean 标签的 autowire 属性值配置为 byType
  public static final int AUTOWIRE_BY_TYPE = AutowireCapableBeanFactory.AUTOWIRE_BY_TYPE;
  
  //autowireMode  = 3，构造器注入
  // bean 标签的 autowire 属性值配置为 constructor
  public static final int AUTOWIRE_CONSTRUCTOR = AutowireCapableBeanFactory.AUTOWIRE_CONSTRUCTOR;
  
  //表明通过Bean的class的内部来自动装配 Spring3.0被弃用。
  // bean 标签的 autowire 属性值配置为 autodetect
  @Deprecated
  public static final int AUTOWIRE_AUTODETECT = AutowireCapableBeanFactory.AUTOWIRE_AUTODETECT;
  
  //检查依赖是否合法，在本类中，默认不进行依赖检查
  //不进行检查
  public static final int DEPENDENCY_CHECK_NONE = 0;
  
  //对对象引用进行依赖性检查
  public static final int DEPENDENCY_CHECK_OBJECTS = 1;
  
  //对“简单”属性进行依赖性检查
  public static final int DEPENDENCY_CHECK_SIMPLE = 2;
  
  //对所有属性进行依赖检查
  public static final int DEPENDENCY_CHECK_ALL = 3;
  
  //若Bean未指定销毁方法，容器应该尝试推断Bean的销毁方法的名字，
  //目前，推断的销毁方法的名字一般为close或是shutdown
  public static final String INFER_METHOD = "(inferred)";
  
  //Bean的class对象或是类的全限定名
  @Nullable
  private volatile Object beanClass;
  
  //默认的scope是单例,对应bean属性scope
  //@Scope
  @Nullable
  private String scope = SCOPE_DEFAULT;
  
  //是否是抽象，对应bean属性abstract
  private boolean abstractFlag = false;
  
  //是否懒加载，对应bean属性lazy-init,默认不是懒加载
  //@Lazy
  @Nullable
  private Boolean lazyInit;
  
  //自动注入模式，对应bean属性autowire,默认不进行自动装配
  private int autowireMode = AUTOWIRE_NO;
  
  //是否进行依赖检查,默认不进行依赖检查
  private int dependencyCheck = DEPENDENCY_CHECK_NONE;
  
  //用来表示一个bean的实例化是否依靠另一个bean的实例化，先加载dependsOn的bean，
  //对应bean属性depend-on
  //@DependsOn
  @Nullable
  private String[] dependsOn;
  
  /**
   * autowire-candidate属性设置为false，这样容器在查找自动装配对象时，
   * 将不考虑该bean，即它不会被考虑作为其他bean自动装配的候选者，
   * 但是该bean本身还是可以使用自动装配来注入其他bean的
   */
  private boolean autowireCandidate = true;
  
  /**
   * 自动装配时出现多个bean候选者时，将作为首选者，对应bean属性primary，默认不是首选的
   * @Primary
   */
  private boolean primary = false;
  
  /**
   * 用于记录Qualifier，对应子元素qualifier <bean><qualifier></qualifier></bean>
   * 如果容器中有多个相同类型的 bean,这时我们就可以使用qualifier属性来设置加载指定Bean名称的bean
   * @Qualifier
   */
  private final Map < String, AutowireCandidateQualifier > qualifiers = new LinkedHashMap <>();
  
  //java8的函数式接口，创建bean实例的方式之一
  @Nullable
  private Supplier <? > instanceSupplier;
  
  //是否允许访问非public方法和属性, 默认是true
  private boolean nonPublicAccessAllowed = true;
  
  /**
   * 是否以一种宽松的模式解析构造函数，默认为true，
   * 如果为false，则在以下情况
   * interface ITest{}
   * class ITestImpl implements ITest{};
   * class Main {
   *     Main(ITest i) {}
   *     Main(ITestImpl i) {}
   * }
   * 抛出异常，因为Spring无法准确定位哪个构造函数程序设置
   */
  private boolean lenientConstructorResolution = true;
  
  //工厂类名,对应bean属性factory-bean
  @Nullable
  private String factoryBeanName;
  
  //工厂方法名,对应bean属性factory-method
  @Nullable
  private String factoryMethodName;
  
  //记录构造函数注入属性，对应bean属性constructor-arg
  @Nullable
  private ConstructorArgumentValues constructorArgumentValues;
  
  //Bean属性的名称以及对应的值，这里不会存放构造函数相关的参数值，只会存放通过setter注入的值
  @Nullable
  private MutablePropertyValues propertyValues;
  
  //方法重写的持有者，记录lookup-method、replaced-method元素  @Lookup
  private MethodOverrides methodOverrides = new MethodOverrides();
  
  //初始化方法，对应bean属性init-method
  @Nullable
  private String initMethodName;
  
  //销毁方法，对应bean属性destroy-method
  @Nullable
  private String destroyMethodName;
  
  //是否执行init-method,默认为true
  private boolean enforceInitMethod = true;
  
  //是否执行destroy-method,默认为true
  private boolean enforceDestroyMethod = true;
  
  //是否是用户定义的而不是应用程序本身定义的，创建AOP时候为true
  private boolean synthetic = false;
  
  //Bean的角色，为用户自定义Bean
  private int role = BeanDefinition.ROLE_APPLICATION;
  
  //Bean的描述信息
  @Nullable
  private String description;
  
  //这个bean定义的资源
  @Nullable
  private Resource resource;
  //...
}
```