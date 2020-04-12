# Caffeine学习
Caffeine是内存缓存。虽然Redis也是内存缓存，但是一般redis的数据访问需要请求远程的redis服务，所以还会有点时间间隔，
Caffeine也可与Redis结合使用，从而实现多级缓存，大大加快缓存的速度。
[教程](https://www.cnblogs.com/liujinhua306/p/9808500.html)
## 依赖
```xml
<!-- 缓存包 -->
       <dependency>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-starter-cache</artifactId>
       </dependency>
       <dependency>
           <groupId>com.github.ben-manes.caffeine</groupId>
           <artifactId>caffeine</artifactId>
           <version>2.6.0</version>
       </dependency>
```
## 配置类
```java
import com.github.benmanes.caffeine.cache.CacheLoader;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.boot.autoconfigure.cache.CacheType;
import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCache;
import org.springframework.cache.support.SimpleCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * @author zhangjiahao
 * @description 缓存配置$
 * @date 2020-04-08 14:31:13
 */

@Configuration
@EnableCaching
public class CacheConfig {
    @Bean
    public CacheManager caffeineCacheManager() {
        SimpleCacheManager cacheManager = new SimpleCacheManager();
        // 可以设置多个CaffeineCache ，可通过value进行选择缓存
        CaffeineCache caffeineCache = new CaffeineCache("shortUrl",
                Caffeine.newBuilder()
                        .maximumSize(20000)
                        .build());
        cacheManager.setCaches(Arrays.asList(caffeineCache));
        return cacheManager;
    }
}
```
## 使用方法
通过注解进行缓存：
- @Cacheable：可用于类或方法上；在目标方法执行前，会根据key先去缓存中查询看是否有数据，有就直接返回缓存中的key对应的value值。不再执行目标方法；无则执行目标方法，并将方法的返回值作为value，并以键值对的形式存入缓存
- @CacheEvict：可用于类或方法上；在执行完目标方法后，并将方法的返回值作为value，并以键值对的形式存入缓存中
- @CachePut：可用于类或方法上；在执行完目标方法后，清除缓存中对应key的数据(如果缓存中有对应key的数据缓存的话)

## 总结
[参考](https://blog.csdn.net/justry_deng/article/details/89283664)
