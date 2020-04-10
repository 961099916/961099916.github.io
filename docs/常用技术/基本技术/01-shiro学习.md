# Shiro
Shiro是常用的权限管理工具，也可以实现分布式权限管理,从网上收集了主要的流程.
![Shiro权限流程](http://notebook.zhangjiahao.site/markdown-img-paste-20200401141825639.png)
## Realm
Shiro实现权限管理,需要先自定义Realm,才可实现动态的权限管理,实现Realm需要继承`AuthorizingRealm`,重写`doGetAuthorizationInfo`和`doGetAuthenticationInfo`进而实现用户登录验证和权限管理.
- `doGetAuthenticationInfo`实现登录管理,可通过参数获取登录的信息,然后进行查询数据库从而检验用户信息
- `doGetAuthorizationInfo`实现权限管理,可通过参数获取登录的用户信息,然后可通过信息去查询权限表,从而实现权限的管理
```java
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;
import site.zjh.records.constant.SystemConstant;
import site.zjh.records.entity.SysPermission;
import site.zjh.records.entity.SysRole;
import site.zjh.records.entity.SysUser;
import site.zjh.records.entity.SysUserInfo;
import site.zjh.records.service.SysRolePermissionService;
import site.zjh.records.service.SysUserInfoService;
import site.zjh.records.service.SysUserRoleService;
import site.zjh.records.service.SysUserService;
import site.zjh.records.shiro.token.JwtToken;
import site.zjh.records.utils.JwtUtil;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author zhangjiahao
 */
public class CustomRealm extends AuthorizingRealm {

    @Autowired
    private SysUserService sysUserService;
    @Autowired
    private SysUserInfoService SysUserInfoService;

    @Autowired
    private SysUserRoleService sysUserRoleService;

    @Autowired
    private SysRolePermissionService sysRolePermissionService;


    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        SysUser user = (SysUser) principalCollection.getPrimaryPrincipal();
        SysUserInfo userInfo = SysUserInfoService.getByUserId(user.getId());
        return getAuthorizationInfo(userInfo, sysUserRoleService, sysRolePermissionService);
    }

    static AuthorizationInfo getAuthorizationInfo(SysUserInfo userInfo, SysUserRoleService sysUserRoleService, SysRolePermissionService sysRolePermissionService) {
        SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo();
        List<SysRole> sysRoles = sysUserRoleService.getRoles(userInfo.getId());
        if (!sysRoles.isEmpty()) {
            simpleAuthorizationInfo.addRoles(sysRoles.stream().map(SysRole::getName).collect(Collectors.toList()));
            List<SysPermission> permissions =
                    sysRolePermissionService.getPermission(sysRoles.stream().map(SysRole::getId).collect(Collectors.toList()));
            if (!permissions.isEmpty()) {
                simpleAuthorizationInfo.addStringPermissions(permissions.stream().map(SysPermission::getPermission).collect(Collectors.toList()));
            }
        }
        return simpleAuthorizationInfo;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        if (authenticationToken.getPrincipal() == null) {
            throw new AuthenticationException("缺失参数");
        }
        String token = authenticationToken.getPrincipal().toString();
        String username = JwtUtil.getUsername(token);
        SysUser one =
                sysUserService.getByUsername(username);
        if (one == null) {
            throw new AuthenticationException("没有该账号");
        }
        if (SystemConstant.USER_STATE_LOCK.equals(one.getState())) {
            throw new AuthenticationException("账号被锁定");
        }


        return new SimpleAuthenticationInfo(one,
                one.getId(), getName());

    }

    @Override
    public String getName() {
        return "CustomRealm";
    }
}
```
## 加密
Shiro可以通过配置进行自定义加密器,从而实现自定义加密算法,也可实现不同登录方式不同的加密方式,例如:账号密码登录是可以用用户的账号加密,但是只有一个手机号的时候,可以用默认加密器,从而实现管理简单化,通过继承`SimpleCredentialsMatcher`类实现自定义加密.
```java
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.credential.SimpleCredentialsMatcher;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.springframework.beans.factory.annotation.Autowired;
import site.zjh.records.constant.SystemConstant;
import site.zjh.records.entity.SysUser;
import site.zjh.records.entity.SysUserInfo;
import site.zjh.records.service.SysUserInfoService;
import site.zjh.records.shiro.token.JwtToken;
import site.zjh.records.utils.JwtUtil;
import site.zjh.records.utils.RedisUtils;

/**
 * @author zhangjiahao
 */
public class MyMatcher extends SimpleCredentialsMatcher {
    @Autowired
    private RedisUtils redisUtils;
    @Autowired
    private SysUserInfoService sysUserInfoService;
    @Override
    public boolean doCredentialsMatch(AuthenticationToken token, AuthenticationInfo info) {
        // 这里整合了JWT,如果没有登录的信息可以放进这里
        JwtToken jwtToken = (JwtToken) token;
        if(JwtUtil.getValue(jwtToken.getToken(),"type").equals(SystemConstant.LOGIN_WECHAT)){
            return true;
        }
        SysUser one = (SysUser)info.getPrincipals().getPrimaryPrincipal();
        String password = encrypt(JwtUtil.getPassword(jwtToken.getToken()),one.getSalt());
        if(this.equals(password, one.getPassword())){
            SysUserInfo user = sysUserInfoService.getByUserId(one.getId());
            redisUtils.set(SystemConstant.TOKEN_PREFIX+jwtToken.getToken(),user);
            return true;
        }
        return false;
    }

    /**
     * 将传进来的密码进行加密的方法
     *
     * @param password
     * @param salt
     * @return
     */
    private String encrypt(String password, String salt) {
        //加密方式
        String hashAlgorithmName = "MD5";
        int hashIterations = 1024;
        Object result = new SimpleHash(hashAlgorithmName, password, salt, hashIterations);
        return result.toString();
    }

}
```
## SpringBoot整合
### 依赖
```xml
        <dependency>
            <groupId>org.apache.shiro</groupId>
            <artifactId>shiro-spring</artifactId>
            <version>1.4.0</version>
        </dependency>
```
### 配置
可以通过配置类进行配置多个Realm认证,多个权限管理,配置过滤,配置加密器,缓存方式等等的
```java
import org.apache.shiro.authc.credential.CredentialsMatcher;
import org.apache.shiro.authc.pam.AtLeastOneSuccessfulStrategy;
import org.apache.shiro.authc.pam.ModularRealmAuthenticator;
import org.apache.shiro.authz.ModularRealmAuthorizer;
import org.apache.shiro.cache.CacheManager;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.mgt.SessionStorageEvaluator;
import org.apache.shiro.realm.Realm;
import org.apache.shiro.spring.LifecycleBeanPostProcessor;
import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.CookieRememberMeManager;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.apache.shiro.web.mgt.DefaultWebSessionStorageEvaluator;
import org.apache.shiro.web.servlet.SimpleCookie;
import org.springframework.aop.framework.autoproxy.DefaultAdvisorAutoProxyCreator;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import site.zjh.records.filter.JwtFilter;
import site.zjh.records.shiro.authenticator.UserModularRealmAuthenticator;
import site.zjh.records.shiro.filter.MyRememberFilter;
import site.zjh.records.shiro.matcher.MyMatcher;
import site.zjh.records.shiro.realm.CustomRealm;
import site.zjh.records.shiro.realm.MobileRealm;
import site.zjh.records.shiro.realm.WechatRealm;

import javax.annotation.Resource;
import javax.servlet.Filter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author zhangjiahao
 */
@Configuration
public class ShiroConfig {

    @Resource
    private CacheManager cacheManager;

    /**
     * 将自己的验证方式加入容器
     *
     * @return
     */
    @Bean
    public CustomRealm customRealm() {
        CustomRealm customRealm = new CustomRealm();
        customRealm.setCredentialsMatcher(credentialsMatcher());
        return customRealm;
    }

    @Bean
    public MobileRealm mobileRealm() {
        MobileRealm mobileRealm = new MobileRealm();
        return mobileRealm;
    }
    @Bean
    public WechatRealm wechatRealm(){
        WechatRealm wechatRealm = new WechatRealm();
        wechatRealm.setCredentialsMatcher(credentialsMatcher());
        return wechatRealm;
    }


    /**
     * 权限管理，配置主要是Realm的管理认证
     *
     * @return
     */
    @Bean
    public SecurityManager securityManager() {
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();

        securityManager.setCacheManager(cacheManager);
        securityManager.setRememberMeManager(rememberMeManager());
        securityManager.setAuthenticator(modularRealmAuthenticator());
        securityManager.setAuthorizer(modularRealmAuthorizer());
        return securityManager;
    }

    /**
     * 系统自带的Realm管理，主要针对多realm 认证
     */
    @Bean
    public ModularRealmAuthenticator modularRealmAuthenticator() {
        //自己重写的ModularRealmAuthenticator
        UserModularRealmAuthenticator userModularRealmAuthenticator = new UserModularRealmAuthenticator();
        userModularRealmAuthenticator.setAuthenticationStrategy(new AtLeastOneSuccessfulStrategy());
        List<Realm> realms = new ArrayList<Realm>();
        realms.add(customRealm());
        realms.add(mobileRealm());
        realms.add(wechatRealm());
        userModularRealmAuthenticator.setRealms(realms);
        return userModularRealmAuthenticator;
    }

    @Bean
    public ModularRealmAuthorizer modularRealmAuthorizer() {
        ModularRealmAuthorizer modularRealmAuthorizer = new ModularRealmAuthorizer();
        List<Realm> realms = new ArrayList<Realm>();
        realms.add(customRealm());
        realms.add(mobileRealm());
        realms.add(wechatRealm());
        modularRealmAuthorizer.setRealms(realms);
        return modularRealmAuthorizer;
    }

    /**
     * Filter工厂，设置对应的过滤条件和跳转条件
     *
     * @param securityManager
     * @return
     */
    @Bean
    public ShiroFilterFactoryBean shiroFilterFactoryBean(SecurityManager securityManager) {
        ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
        shiroFilterFactoryBean.setSecurityManager(securityManager);
        // 添加自己的过滤器并且取名为jwt
        Map<String, Filter> filterMap = new HashMap<>();
        filterMap.put("jwt", new JwtFilter());
        shiroFilterFactoryBean.setFilters(filterMap);
        Map<String, String> map = new HashMap<>();
        //登出
        map.put("/logout", "logout");
        //对所有用户认证
//        map.put("/**", "authc");
        map.put("/sysUser/**", "jwt");
        map.put("/login", "anon");
        map.put("/druid/**", "anon");
        map.put("/webjars/**","anon");
        map.put("/swagger-ui.html","anon");
        map.put("/swagger**/**","anon");
        map.put("/v2/**","anon");
        map.put("/test/**","anon");
        map.put("/accessLog/**","anon");
        map.put("/system/**","anon");
        map.put("/baidu/**","anon");
        map.put("/goods/**","anon");
        map.put("/goodsCate/**","anon");
        map.put("/sysUser/create","anon");
//        map.put("/**","anon");
        //登录
        shiroFilterFactoryBean.setLoginUrl("/login");
        //首页
        shiroFilterFactoryBean.setSuccessUrl("/index");
        //错误页面，认证不通过跳转
        shiroFilterFactoryBean.setUnauthorizedUrl("/error");
        shiroFilterFactoryBean.setFilterChainDefinitionMap(map);
        return shiroFilterFactoryBean;
    }


    /**
     * 自定义加密器
     * @return
     */
    @Bean("credentialsMatcher")
    public CredentialsMatcher credentialsMatcher() {
        return new MyMatcher();
    }


    public SimpleCookie rememberMeCookie() {
//        这个参数是cookie的名称，对应前端的checkbox的name=rememberMe
        SimpleCookie simpleCookie = new SimpleCookie("rememberMe");
//        cookie生效时间为10秒
        simpleCookie.setMaxAge(10);
        return simpleCookie;
    }

    @Bean
    public CookieRememberMeManager rememberMeManager() {
        CookieRememberMeManager cookieRememberMeManager = new CookieRememberMeManager();
        cookieRememberMeManager.setCookie(rememberMeCookie());
        return cookieRememberMeManager;
    }

    @Bean
    public MyRememberFilter MyRememberFilter() {
        return new MyRememberFilter();
    }

    @Bean
    public LifecycleBeanPostProcessor lifecycleBeanPostProcessor() {
        return new LifecycleBeanPostProcessor();
    }

    @Bean
    public DefaultAdvisorAutoProxyCreator defaultAdvisorAutoProxyCreator() {
        DefaultAdvisorAutoProxyCreator defaultAdvisorAutoProxyCreator = new DefaultAdvisorAutoProxyCreator();
        defaultAdvisorAutoProxyCreator.setProxyTargetClass(true);
        return defaultAdvisorAutoProxyCreator;
    }

    /**
     * 禁用session, 不保存用户登录状态。保证每次请求都重新认证。
     * 需要注意的是，如果用户代码里调用Subject.getSession()还是可以用session，如果要完全禁用，要配合下面的noSessionCreation的Filter来实现
     */
    @Bean
    protected SessionStorageEvaluator sessionStorageEvaluator() {
        DefaultWebSessionStorageEvaluator sessionStorageEvaluator = new DefaultWebSessionStorageEvaluator();
        sessionStorageEvaluator.setSessionStorageEnabled(false);
        return sessionStorageEvaluator;
    }

    @Bean
    public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor(@Qualifier("securityManager") SecurityManager securityManager) {
        AuthorizationAttributeSourceAdvisor sourceAdvisor = new AuthorizationAttributeSourceAdvisor();
        sourceAdvisor.setSecurityManager(securityManager);
        return sourceAdvisor;
    }

}
```
通过自定义的`modularRealmAuthenticator`实现多Reaml的选择
```java
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.pam.ModularRealmAuthenticator;
import org.apache.shiro.realm.Realm;
import site.zjh.records.shiro.token.JwtToken;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * @author zhangjiahao
 */
public class UserModularRealmAuthenticator extends ModularRealmAuthenticator {



    @Override
    protected AuthenticationInfo doAuthenticate(AuthenticationToken authenticationToken) throws AuthenticationException {
        // 获得所有的Realm
        Collection<Realm> realms = getRealms();
        String loginType = "CustomRealm";
        if(authenticationToken instanceof JwtToken){
            JwtToken userToken = (JwtToken) authenticationToken;
             loginType = userToken.getLoginType();
        }
        List<Realm> typeRealm = new ArrayList<Realm>();
        String finalLoginType = loginType;
        realms.forEach(realm -> {
            if (realm.getName().contains(finalLoginType)) {
                typeRealm.add(realm);
            }
        });
        if (typeRealm.size() == 1L) {
            return doSingleRealmAuthentication(typeRealm.get(0), authenticationToken);
        } else {
            return doMultiRealmAuthentication(typeRealm, authenticationToken);
        }
    }
}

```
### Realm
实现了多个Reaml,并且根据登录方式选择对应的认证方式,在此使用了多Realm
#### CustomRealm
```java
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;
import site.zjh.records.constant.SystemConstant;
import site.zjh.records.entity.SysPermission;
import site.zjh.records.entity.SysRole;
import site.zjh.records.entity.SysUser;
import site.zjh.records.entity.SysUserInfo;
import site.zjh.records.service.SysRolePermissionService;
import site.zjh.records.service.SysUserInfoService;
import site.zjh.records.service.SysUserRoleService;
import site.zjh.records.service.SysUserService;
import site.zjh.records.shiro.token.JwtToken;
import site.zjh.records.utils.JwtUtil;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author zhangjiahao
 */
public class CustomRealm extends AuthorizingRealm {

    @Autowired
    private SysUserService sysUserService;
    @Autowired
    private SysUserInfoService SysUserInfoService;

    @Autowired
    private SysUserRoleService sysUserRoleService;

    @Autowired
    private SysRolePermissionService sysRolePermissionService;


    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        SysUser user = (SysUser) principalCollection.getPrimaryPrincipal();
        SysUserInfo userInfo = SysUserInfoService.getByUserId(user.getId());
        return getAuthorizationInfo(userInfo, sysUserRoleService, sysRolePermissionService);
    }

    static AuthorizationInfo getAuthorizationInfo(SysUserInfo userInfo, SysUserRoleService sysUserRoleService, SysRolePermissionService sysRolePermissionService) {
        SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo();
        List<SysRole> sysRoles = sysUserRoleService.getRoles(userInfo.getId());
        if (!sysRoles.isEmpty()) {
            simpleAuthorizationInfo.addRoles(sysRoles.stream().map(SysRole::getName).collect(Collectors.toList()));
            List<SysPermission> permissions =
                    sysRolePermissionService.getPermission(sysRoles.stream().map(SysRole::getId).collect(Collectors.toList()));
            if (!permissions.isEmpty()) {
                simpleAuthorizationInfo.addStringPermissions(permissions.stream().map(SysPermission::getPermission).collect(Collectors.toList()));
            }
        }
        return simpleAuthorizationInfo;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        if (authenticationToken.getPrincipal() == null) {
            throw new AuthenticationException("缺失参数");
        }
        String token = authenticationToken.getPrincipal().toString();
        String username = JwtUtil.getUsername(token);
        SysUser one =
                sysUserService.getByUsername(username);
        if (one == null) {
            throw new AuthenticationException("没有该账号");
        }
        if (SystemConstant.USER_STATE_LOCK.equals(one.getState())) {
            throw new AuthenticationException("账号被锁定");
        }


        return new SimpleAuthenticationInfo(one,
                one.getId(), getName());

    }

    /**
     * 必须重写此方法，不然Shiro会报错
     * 支持token类型
     * @param token
     * @return
     */
    @Override
    public boolean supports(AuthenticationToken token) {
        return token instanceof JwtToken;
    }


    @Override
    public String getName() {
        return "CustomRealm";
    }
}
```
#### MobileRealm
```java
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;
import site.zjh.records.constant.SystemConstant;
import site.zjh.records.entity.SysUser;
import site.zjh.records.service.SysUserService;

/**
 * @author zhangjiahao
 */
public class MobileRealm extends AuthorizingRealm {

    @Autowired
    private SysUserService sysUserService;
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        SysUser user = (SysUser) principalCollection.getPrimaryPrincipal();
        SimpleAuthorizationInfo simpleAuthorizationInfo=new SimpleAuthorizationInfo();
        simpleAuthorizationInfo.addRole("admin");
        simpleAuthorizationInfo.addStringPermission("update");
        return simpleAuthorizationInfo;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        if (authenticationToken.getPrincipal() == null) {
            return null;
        }
        String email = authenticationToken.getPrincipal().toString();
        SysUser one = sysUserService.getOne(new QueryWrapper<SysUser>().lambda().eq(SysUser::getEmail, email));
        if (one == null) {
            throw new UnknownAccountException("没有该账号");
        }
        if (SystemConstant.USER_STATE_LOCK.equals(one.getState())) {
            throw new LockedAccountException("账号被锁定");
        }
        AuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(one,
                one.getPassword(), getName());
        return authenticationInfo;
    }

    @Override
    public String getName() {
        return "MobileRealm";
    }
}
```

## 自定义加密器
也采用的自定义的加密器,代码如下
```java
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.credential.SimpleCredentialsMatcher;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.springframework.beans.factory.annotation.Autowired;
import site.zjh.records.constant.SystemConstant;
import site.zjh.records.entity.SysUser;
import site.zjh.records.entity.SysUserInfo;
import site.zjh.records.service.SysUserInfoService;
import site.zjh.records.shiro.token.JwtToken;
import site.zjh.records.utils.JwtUtil;
import site.zjh.records.utils.RedisUtils;

/**
 * @author zhangjiahao
 */
public class MyMatcher extends SimpleCredentialsMatcher {
    @Autowired
    private RedisUtils redisUtils;
    @Autowired
    private SysUserInfoService sysUserInfoService;
    @Override
    public boolean doCredentialsMatch(AuthenticationToken token, AuthenticationInfo info) {
        JwtToken jwtToken = (JwtToken) token;
        if(JwtUtil.getValue(jwtToken.getToken(),"type").equals(SystemConstant.LOGIN_WECHAT)){
            return true;
        }
        SysUser one = (SysUser)info.getPrincipals().getPrimaryPrincipal();
        String password = encrypt(JwtUtil.getPassword(jwtToken.getToken()),one.getSalt());
        if(this.equals(password, one.getPassword())){
            SysUserInfo user = sysUserInfoService.getByUserId(one.getId());
            redisUtils.set(SystemConstant.TOKEN_PREFIX+jwtToken.getToken(),user);
            return true;
        }
        return false;
    }

    /**
     * 将传进来的密码进行加密的方法
     *
     * @param password
     * @param salt
     * @return
     */
    private String encrypt(String password, String salt) {
        //加密方式
        String hashAlgorithmName = "MD5";
        int hashIterations = 1024;
        Object result = new SimpleHash(hashAlgorithmName, password, salt, hashIterations);
        return result.toString();
    }

    public static void main(String[] args) {
        MyMatcher myMatcher = new MyMatcher();
        String admin = myMatcher.encrypt("admin", "410439");
        System.out.println(admin);
    }

}
```

## 整合JWT
整合JWT只不过是返回的是JWT token,然后保存到数据库中,也要可使的分布式也可使用该权限管理.
### 通过Login生成Token
```java

    @ApiOperation(value = "账号密码登录", notes = "通过账号密码进行登录")
    @ApiImplicitParams({
            @ApiImplicitParam(paramType = "query", name = "username", value = "用户账号", required = true, dataType = "String"),
            @ApiImplicitParam(paramType = "query", name = "password", value = "用户密码", required = true, dataType = "String"),
            @ApiImplicitParam(paramType = "query", name = "rememberMe", value = "是否记住", required = true, dataType =
                    "boolean")
    })
    @PostMapping("/login")
    public ApiResponse login(@RequestParam("username") String username, @RequestParam("password") String password,
                             boolean rememberMe) {
        if (!(LoginCheck.checkUsername(username) && LoginCheck.checkPassword(password))) {
            return ApiResponse.fail("账号密码格式不正确");
        }
        String token = JwtUtil.sign(username, password, SystemConstant.LOGIN_CUSTOM);
        try {
            //添加用户认证信息
            Subject subject = SecurityUtils.getSubject();

            JwtToken jwtToken = new JwtToken(token, SystemConstant.LOGIN_CUSTOM);
            subject.login(jwtToken);
        } catch (AuthenticationException e) {
            log.info("shir exception is {}", e.getMessage());
        }
        return ApiResponse.success(token);
    }

```
### JwtFilter
在请求的时候应每次都应检验一下啊token是否包含和过期.
```java
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.web.filter.authc.BasicHttpAuthenticationFilter;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMethod;
import site.zjh.records.model.ApiResponse;
import site.zjh.records.shiro.token.JwtToken;
import site.zjh.records.utils.JwtUtil;

import javax.servlet.Filter;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

/**
 * @author zhangjiahao
 */

@Slf4j
@Component//这个注入与否影响不大
public class JwtFilter extends BasicHttpAuthenticationFilter implements Filter {

    /**
     * 执行登录
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @Override
    protected boolean executeLogin(ServletRequest request, ServletResponse response) throws Exception {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        String token = httpServletRequest.getHeader("Token");
        Date created = JwtUtil.getCreated(token);
        if(System.currentTimeMillis() <created.getTime()){
            ApiResponse responseData = ApiResponse.fail( "会话过期");
            //SerializerFeature.WriteMapNullValue为了null属性也输出json的键值对
            Object o = JSONObject.toJSONString(responseData, SerializerFeature.WriteMapNullValue);
            response.setCharacterEncoding("utf-8");
            response.getWriter().print(o);
            return false;
        }
        // 提交给realm进行登入，如果错误他会抛出异常并被捕获
        try {
            if(token==null){
                throw new AuthenticationException("没有登录");
            }
            String type = JwtUtil.getValue(token, "type");
            JwtToken jwtToken = new JwtToken(token,type);
            getSubject(request, response).login(jwtToken);
            // 如果没有抛出异常则代表登入成功，返回true
            return true;
        } catch (AuthenticationException e) {
            ApiResponse responseData = ApiResponse.fail( "没有访问权限，原因是:" + e.getMessage());
            //SerializerFeature.WriteMapNullValue为了null属性也输出json的键值对
            Object o = JSONObject.toJSONString(responseData, SerializerFeature.WriteMapNullValue);
            response.setCharacterEncoding("utf-8");
            response.getWriter().print(o);
            return false;
        }
    }

    /**
     * 执行登录认证
     *
     * @param request
     * @param response
     * @param mappedValue
     * @return
     */
    @Override
    protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) {
        try {
            return executeLogin(request, response);
            // return true;有一篇博客这里直接返回true是不正确的,在这里我特别指出一下
        } catch (Exception e) {
            log.error("JwtFilter过滤验证失败!");
            return false;
        }
    }


    /**
     * 对跨域提供支持
     * @param request
     * @param response
     * @return
     * @throws Exception
     */
    @Override
    protected boolean preHandle(ServletRequest request, ServletResponse response) throws Exception {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;
        httpServletResponse.setHeader("Access-control-Allow-Origin", httpServletRequest.getHeader("Origin"));
        httpServletResponse.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
        httpServletResponse.setHeader("Access-Control-Allow-Headers", httpServletRequest.getHeader("Access-Control-Request-Headers"));
        // 跨域时会首先发送一个option请求，这里我们给option请求直接返回正常状态
        if (httpServletRequest.getMethod().equals(RequestMethod.OPTIONS.name())) {
            httpServletResponse.setStatus(HttpStatus.OK.value());
            return false;
        }
        return super.preHandle(request, response);
    }
}
```
## 总结
在实现以上功能时,整个shiro的流程为以下步骤:
1. 访问接口时检测是否时Shiro过滤的接口,不是则进行访问,是则进行判断是否包含token.
2. 不包含token或token过期则进行跳转登录页面.
3. token不过期且符合检测,则会执行认证方法,首先会经过自定义的`ModularRealmAuthenticator`即`UserModularRealmAuthenticator`去进行选择执行的Realm,然后会进入Realm进行认证.注意Realm要支持该token,重写supports方法.
4. 进入Realm进行token检测,检测是否存在,不存在则是违规登录. 若存在,则查询数据库进行检测账户状态(可跳过直接信任token).
5. 然后会进入密码器`SimpleCredentialsMatcher`即`MyMatcher`
加密核对,如果正确则返回true,否则返回false.
6. 检测正确时,会进行授权,执行Realm的授权方法.注意`PrincipalCollection`就是认证保存的信息.

如果未登录,执行登陆时会从第3步开始执行.
