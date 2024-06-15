import{_ as o}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as a,o as t,c as n,a as i,b as l,d as p,e as s}from"./app-CMVEEaeV.js";const r={},g=s('<p>一个输入操作通常包括两个阶段:</p><ol><li>等待数据准备好</li><li>从内核向进程复制数据</li></ol><p>对于一个套接字上的输入操作，第一步通常涉及等待数据从网络中到达。当所等待分组到达时，它被复制到内核中的某个缓冲区。第二步就是把数据从内核缓冲区复制到应用进程缓冲区。</p><p>Unix 有以下五种 IO 模型：</p><ul><li>阻塞式 I/O (BIO)</li><li>非阻塞式 I/O (NIO)</li><li>I/O复用 (select和 poll)</li><li>信号驱动式 I/O (SIGIO)</li><li>异步 I/O (AIO)</li></ul><h2 id="阻塞式-i-o-bio" tabindex="-1"><a class="header-anchor" href="#阻塞式-i-o-bio"><span>阻塞式 I/O (BIO)</span></a></h2><p>进程在获取数据时，若内核无准备好数据，则会阻塞进程，等待内核把数据准备好返回给线程，线程才会进行下一步的响应。IO 数据未准备好时会阻塞进程所以叫做阻塞式 IO。</p><figure><img src="https://zhangjiahao-blog.oss-cn-beijing.aliyuncs.com/picgo/202305150957412.png#id=qqDbE&amp;originHeight=316&amp;originWidth=611&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>上图流程如下：</p><ol><li>应用进程进行系统调用(recvfrom)向内核索要数据</li><li>内核若数据报未准备好则进行阻塞至数据报准备完毕</li><li>数据报准备完毕则复制到用户空间</li><li>返回给应用线程</li></ol><h2 id="非阻塞式-i-o-nio" tabindex="-1"><a class="header-anchor" href="#非阻塞式-i-o-nio"><span>非阻塞式 I/O (NIO)</span></a></h2><p>应用进程执行系统调用之后，内核返回一个错误码。应用进程可以继续执行，但是需要不断的执行系统调用来获知 I/O 是否完成，这种方式称为轮询(polling)。</p><figure><img src="https://zhangjiahao-blog.oss-cn-beijing.aliyuncs.com/picgo/202305151029704.png#id=xhQMe&amp;originHeight=408&amp;originWidth=707&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>上图流程如下：</p><ol><li>应用进程进行系统调用(recvfrom)向内核索要数据</li><li>内核若数据报未准备好则直接返回错误标志<code>EWOULDBLOCK</code></li><li>应用程序可一直系统调用(recvfrom)向内核索要数据，知道系统准备好数据</li><li>此时应用进程则进行获取数据</li></ol><h2 id="i-o复用-select和-poll" tabindex="-1"><a class="header-anchor" href="#i-o复用-select和-poll"><span>I/O复用 (select和 poll)</span></a></h2><p>并发情况下服务器很可能一瞬间会收到几十上百万的请求，这种情况下应用就需要创建几十上百万的线程去读取数据，同时又因为应用线程是不知道什么时候会有数据读取，为了保证消息能及时读取到，那么这些线程自己必须不断的向内核发送recvfrom 请求来读取数据；</p><p>那么问题来了，这么多的线程不断调用recvfrom 请求数据，先不说服务器能不能扛得住这么多线程，就算扛得住那么很明显这种方式是不是太浪费资源了，线程是我们操作系统的宝贵资源，大量的线程用来去读取数据了，那么就意味着能做其它事情的线程就会少。</p><p>所以，有人就提出了一个思路，能不能提供一种方式，可以由一个线程监控多个网络请求（<code>我们后面将称为fd文件描述符，linux系统把所有网络请求以一个fd来标识）</code>，这样就可以只需要一个或几个线程就可以完成数据状态询问的操作，当有数据准备就绪之后再分配对应的线程去读取数据，这么做就可以节省出大量的线程资源出来，这个就是IO复用模型的思路。</p><figure><img src="https://zhangjiahao-blog.oss-cn-beijing.aliyuncs.com/picgo/202305151046526.png#id=EQy8n&amp;originHeight=523&amp;originWidth=815&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>上图流程如下：</p><ol><li>应用进程进行系统调用(select)向内核索要数据</li><li>内核若数据报未准备则进行阻塞，直到准备完成返回可读</li><li>应用程序得到可读后，知道系统准备好数据进行系统调用(recvfrom)向内核索要数据</li><li>此时应用进程则进行获取数据</li></ol><h2 id="信号驱动式-i-o-sigio" tabindex="-1"><a class="header-anchor" href="#信号驱动式-i-o-sigio"><span>信号驱动式 I/O (SIGIO)</span></a></h2><p>复用IO模型解决了一个线程可以监控多个fd的问题，但是select是采用轮询的方式来监控多个fd的，通过不断的轮询fd的可读状态来知道是否就可读的数据，而无脑的轮询就显得有点暴力，因为大部分情况下的轮询都是无效的，所以有人就想，能不能不要我总是去问你是否数据准备就绪，能不能我发出请求后等你数据准备好了就通知我，所以就衍生了信号驱动IO模型。</p><figure><img src="https://zhangjiahao-blog.oss-cn-beijing.aliyuncs.com/picgo/202305151049015.png#id=qTtlP&amp;originHeight=406&amp;originWidth=728&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>上图流程如下：</p><ol><li>应用进程使用 sigaction 系统调用，内核立即返回</li><li>内核进行数据准备，若准备完成则向应用进程发送 SIGIO 信号</li><li>应用进程收到之后在信号处理程序中调用 recvfrom 将数据从内核复制到应用进程中。</li><li>此时应用进程则进行获取数据</li></ol><h2 id="异步-i-o-aio" tabindex="-1"><a class="header-anchor" href="#异步-i-o-aio"><span>异步 I/O (AIO)</span></a></h2><p>应用只需要向内核发送一个read 请求,告诉内核它要读取数据后即刻返回；内核收到请求后会建立一个信号联系，当数据准备就绪，<code>内核会主动把数据从内核复制到用户空间</code>，等所有操作都完成之后，内核会发起一个通知告诉应用，我们称这种一劳永逸的模式为<code>异步IO模型</code>。</p><figure><img src="https://zhangjiahao-blog.oss-cn-beijing.aliyuncs.com/picgo/202305151108025.png#id=YMAus&amp;originHeight=407&amp;originWidth=718&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>上图流程如下：</p><ol><li>进行 aio_read 系统调用会立即返回，应用进程继续执行，不会被阻塞。</li><li>内核进行数据准备，若准备完成则向应用进程发送 SIGIO 信号</li><li>此时应用进程则进行获取数据</li></ol><h2 id="比较" tabindex="-1"><a class="header-anchor" href="#比较"><span>比较</span></a></h2><figure><img src="https://zhangjiahao-blog.oss-cn-beijing.aliyuncs.com/picgo/202305151130177.png#id=heLee&amp;originHeight=427&amp;originWidth=761&amp;originalType=binary&amp;ratio=1&amp;rotation=0&amp;showTitle=false&amp;status=done&amp;style=none&amp;title=" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>',35),c={href:"https://blog.csdn.net/JMW1407/article/details/107899340",target:"_blank",rel:"noopener noreferrer"},h=i("li",null,[i("a",{href:"3a2bbe3fc36fb8302e70a66d337e8fb2"},"IO 模型 - Unix IO 模型")],-1);function d(m,I){const e=a("ExternalLinkIcon");return t(),n("div",null,[g,i("ol",null,[i("li",null,[i("a",c,[l("浅谈5种IO模型——阻塞式IO、非阻塞式IO、信号驱动IO、多路复用IO及异步IO"),p(e)])]),h])])}const f=o(r,[["render",d],["__file","02-Unix IO模型.html.vue"]]),u=JSON.parse('{"path":"/%E9%80%9A%E7%94%A8/02-Unix%20IO%E6%A8%A1%E5%9E%8B.html","title":"Unix IO模型","lang":"zh-CN","frontmatter":{"title":"Unix IO模型","order":3,"description":"一个输入操作通常包括两个阶段: 等待数据准备好 从内核向进程复制数据 对于一个套接字上的输入操作，第一步通常涉及等待数据从网络中到达。当所等待分组到达时，它被复制到内核中的某个缓冲区。第二步就是把数据从内核缓冲区复制到应用进程缓冲区。 Unix 有以下五种 IO 模型： 阻塞式 I/O (BIO) 非阻塞式 I/O (NIO) I/O复用 (selec...","head":[["meta",{"property":"og:url","content":"https://961099916.github.io/%E9%80%9A%E7%94%A8/02-Unix%20IO%E6%A8%A1%E5%9E%8B.html"}],["meta",{"property":"og:site_name","content":"九夏的博客"}],["meta",{"property":"og:title","content":"Unix IO模型"}],["meta",{"property":"og:description","content":"一个输入操作通常包括两个阶段: 等待数据准备好 从内核向进程复制数据 对于一个套接字上的输入操作，第一步通常涉及等待数据从网络中到达。当所等待分组到达时，它被复制到内核中的某个缓冲区。第二步就是把数据从内核缓冲区复制到应用进程缓冲区。 Unix 有以下五种 IO 模型： 阻塞式 I/O (BIO) 非阻塞式 I/O (NIO) I/O复用 (selec..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://zhangjiahao-blog.oss-cn-beijing.aliyuncs.com/picgo/202305150957412.png#id=qqDbE&originHeight=316&originWidth=611&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title="}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-06-15T11:49:06.000Z"}],["meta",{"property":"article:author","content":"九夏"}],["meta",{"property":"article:modified_time","content":"2024-06-15T11:49:06.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Unix IO模型\\",\\"image\\":[\\"https://zhangjiahao-blog.oss-cn-beijing.aliyuncs.com/picgo/202305150957412.png#id=qqDbE&originHeight=316&originWidth=611&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=\\",\\"https://zhangjiahao-blog.oss-cn-beijing.aliyuncs.com/picgo/202305151029704.png#id=xhQMe&originHeight=408&originWidth=707&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=\\",\\"https://zhangjiahao-blog.oss-cn-beijing.aliyuncs.com/picgo/202305151046526.png#id=EQy8n&originHeight=523&originWidth=815&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=\\",\\"https://zhangjiahao-blog.oss-cn-beijing.aliyuncs.com/picgo/202305151049015.png#id=qTtlP&originHeight=406&originWidth=728&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=\\",\\"https://zhangjiahao-blog.oss-cn-beijing.aliyuncs.com/picgo/202305151108025.png#id=YMAus&originHeight=407&originWidth=718&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=\\",\\"https://zhangjiahao-blog.oss-cn-beijing.aliyuncs.com/picgo/202305151130177.png#id=heLee&originHeight=427&originWidth=761&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=\\"],\\"dateModified\\":\\"2024-06-15T11:49:06.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"九夏\\",\\"url\\":\\"https://blog.jiuxialb.top/\\"}]}"]]},"headers":[{"level":2,"title":"阻塞式 I/O (BIO)","slug":"阻塞式-i-o-bio","link":"#阻塞式-i-o-bio","children":[]},{"level":2,"title":"非阻塞式 I/O (NIO)","slug":"非阻塞式-i-o-nio","link":"#非阻塞式-i-o-nio","children":[]},{"level":2,"title":"I/O复用 (select和 poll)","slug":"i-o复用-select和-poll","link":"#i-o复用-select和-poll","children":[]},{"level":2,"title":"信号驱动式 I/O (SIGIO)","slug":"信号驱动式-i-o-sigio","link":"#信号驱动式-i-o-sigio","children":[]},{"level":2,"title":"异步 I/O (AIO)","slug":"异步-i-o-aio","link":"#异步-i-o-aio","children":[]},{"level":2,"title":"比较","slug":"比较","link":"#比较","children":[]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"createdTime":1718452146000,"updatedTime":1718452146000,"contributors":[{"name":"zhangjiahao","email":"961099916@qq.com","commits":1}]},"readingTime":{"minutes":5.2,"words":1560},"filePathRelative":"通用/02-Unix IO模型.md","localizedDate":"2024年6月15日","excerpt":"<p>一个输入操作通常包括两个阶段:</p>\\n<ol>\\n<li>等待数据准备好</li>\\n<li>从内核向进程复制数据</li>\\n</ol>\\n<p>对于一个套接字上的输入操作，第一步通常涉及等待数据从网络中到达。当所等待分组到达时，它被复制到内核中的某个缓冲区。第二步就是把数据从内核缓冲区复制到应用进程缓冲区。</p>\\n<p>Unix 有以下五种 IO 模型：</p>\\n<ul>\\n<li>阻塞式 I/O (BIO)</li>\\n<li>非阻塞式 I/O (NIO)</li>\\n<li>I/O复用 (select和 poll)</li>\\n<li>信号驱动式 I/O (SIGIO)</li>\\n<li>异步 I/O (AIO)</li>\\n</ul>","autoDesc":true}');export{f as comp,u as data};
