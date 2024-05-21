import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as i,c as a,e}from"./app-C0uiZG7z.js";const p={},u=e('<h1 id="《从零开始学架构-照着做-你也能成为架构师》" tabindex="-1"><a class="header-anchor" href="#《从零开始学架构-照着做-你也能成为架构师》"><span>《从零开始学架构：照着做，你也能成为架构师》</span></a></h1><h2 id="_1-架构基础" tabindex="-1"><a class="header-anchor" href="#_1-架构基础"><span>1. 架构基础</span></a></h2><h3 id="架构是什么" tabindex="-1"><a class="header-anchor" href="#架构是什么"><span>架构是什么</span></a></h3><ul><li><p>系统与子系统</p><ul><li><p>系统泛指由一群有关联的个体组成，根据某种规则运作，能完成个别元件不能单独完成的工作的群体。它的意<br> 思是“总体”“整体”或“联盟”。</p><ul><li>关联</li><li>规则</li><li>能力</li></ul></li></ul></li><li><p>模块和组件</p><ul><li>划分模块是为了职责分离</li><li>划分组件是为了单元复用</li></ul></li><li><p>框架和架构</p><ul><li>框架多是一种规范</li><li>架构多是一种结构，系统结构</li></ul></li></ul><h3 id="架构设计的目的" tabindex="-1"><a class="header-anchor" href="#架构设计的目的"><span>架构设计的目的</span></a></h3><ul><li>解决复杂度带来的问题</li></ul><h3 id="复杂度来源" tabindex="-1"><a class="header-anchor" href="#复杂度来源"><span>复杂度来源</span></a></h3><ul><li><p>高性能</p><ul><li><p>单机复杂度</p><ul><li>进程和线程</li><li>操作系统</li></ul></li><li><p>集群复杂度</p><ul><li>任务分配</li><li>任务分解</li></ul></li></ul></li><li><p>高可用 指“系统无中断地执行其功能”的能力，代表系统的可用性程度，是进行系统设计<br> 时的准则之一。</p><ul><li><p>计算高可用</p></li><li><p>存储高可用</p></li><li><p>高可用状态决策</p><ul><li>独裁式</li><li>协商式</li><li>民主式</li></ul></li></ul></li><li><p>高扩展</p><ul><li><p>预测变化</p></li><li><p>应对变化</p><ul><li>稳定和变化分层，防止相互影响过深</li></ul></li></ul></li><li><p>低成本</p></li><li><p>安全</p><ul><li>功能安全</li><li>架构安全</li></ul></li><li><p>规模</p></li></ul><h2 id="_2-架构设计原则" tabindex="-1"><a class="header-anchor" href="#_2-架构设计原则"><span>2. 架构设计原则</span></a></h2><h3 id="合适原则-合适优于业界领先" tabindex="-1"><a class="header-anchor" href="#合适原则-合适优于业界领先"><span>合适原则：合适优于业界领先</span></a></h3><ul><li><ol><li>考虑人员多少</li></ol></li><li><ol start="2"><li>考虑时间成本，罗马不是一天建成的</li></ol></li><li><ol start="3"><li>结合业务设计</li></ol></li></ul><h3 id="简单原则-简单优于复杂" tabindex="-1"><a class="header-anchor" href="#简单原则-简单优于复杂"><span>简单原则：简单优于复杂</span></a></h3><ul><li>结构越复杂可用率越低</li><li>逻辑越复杂，开发越慢，排查越慢</li></ul><h3 id="演化原则-演化优于一步到位" tabindex="-1"><a class="header-anchor" href="#演化原则-演化优于一步到位"><span>演化原则：演化优于一步到位</span></a></h3><ul><li>架构需要随业务的变化而变化</li><li>不断迭代，去其糟粕留其精华</li></ul><h2 id="_3-架构设计流程" tabindex="-1"><a class="header-anchor" href="#_3-架构设计流程"><span>3. 架构设计流程</span></a></h2><h3 id="识别复杂度" tabindex="-1"><a class="header-anchor" href="#识别复杂度"><span>识别复杂度</span></a></h3><ul><li>列出复杂度问题，根据业务、技术、团队等排出优先级</li></ul><h3 id="设计备选方案" tabindex="-1"><a class="header-anchor" href="#设计备选方案"><span>设计备选方案</span></a></h3><ul><li><p>误区</p><ul><li><p>设计出最优秀的方案</p></li><li><p>只做一个方案</p><ul><li>应做 3~5 个方案，且有明显的差异</li></ul></li><li><p>过于详细</p></li></ul></li></ul><h3 id="评估和选择备选方案" tabindex="-1"><a class="header-anchor" href="#评估和选择备选方案"><span>评估和选择备选方案</span></a></h3><ul><li><p>360 度环评</p><ul><li><p>质量属性</p><ul><li>性能</li><li>可用性</li><li>成本</li><li>项目投入</li><li>复杂度</li><li>安全性</li><li>可扩展性等</li></ul></li><li><p>若是无法抉择则可添加权重</p></li></ul></li></ul><h3 id="详细方案" tabindex="-1"><a class="header-anchor" href="#详细方案"><span>详细方案</span></a></h3><ul><li><p>细化技术细节</p><ul><li>选型</li><li>参数设置</li></ul></li></ul><h2 id="_4-存储高性能" tabindex="-1"><a class="header-anchor" href="#_4-存储高性能"><span>4. 存储高性能</span></a></h2><h3 id="关系数据库" tabindex="-1"><a class="header-anchor" href="#关系数据库"><span>关系数据库</span></a></h3><ul><li><p>读写分离</p><ul><li><p>主从模式</p></li><li><p>存在的问题</p><ul><li><ol><li>从节点同步主节点数据可能存在延迟，导致读不到。</li></ol><ul><li>先读从节点，无数据再读主节点，关键数据可直接读取主节点</li></ul></li></ul></li></ul></li><li><p>分库分表</p><ul><li><p>使用场景</p><ul><li><p>数据量达到千万以上</p><ul><li>即使有索引索引也会很慢</li><li>文件很大，备份和恢复时间过长</li><li>文件过大，丢失数据量大的风险高</li></ul></li></ul></li><li><p>业务分表</p><ul><li>join 问题</li><li>事务问题</li><li>成本问题</li></ul></li><li><p>分表</p><ul><li><p>垂直分表</p><ul><li>例如：婚恋网站人物列表只需要有 name,age等属性即可，无需过的属性导致查询速度过慢</li></ul></li><li><p>水平分表：会引入更多的复杂度</p><ul><li><p>路由</p><ul><li>范围路由</li><li>hash 路由</li><li>配置路由</li></ul></li><li><p>join</p><ul><li>只能多次 join 解决</li></ul></li><li><p>count</p><ul><li>多次 count</li><li>记录数表，新增表进行处理</li></ul></li><li><p>order by</p><ul><li>多次 order by 进行聚合</li></ul></li></ul></li></ul></li></ul></li><li><p>实现方法</p><ul><li><p>程序代码封装</p><ul><li><p>特点</p><ul><li>实现简单，可根据业务进行定制</li><li>开发工作量大</li><li>故障问题不好处理</li></ul></li><li><p>开源方案</p><ul><li>淘宝的 TDDL</li></ul></li></ul></li><li><p>中间件封装</p><ul><li><p>特点</p><ul><li>支持多种编程语言</li><li>支持完整的数据库协议和 SQL 规范，内容丰富导致 bug 可能会较多</li><li>所有的数据库操作都变成对中间件的操作，会影响性能</li><li>主从切换无感知，有中间件解决</li></ul></li><li><p>方案</p><ul><li>MySQL Proxy</li><li>MySQL Router</li><li>Atlas</li><li>ShardingSphere</li></ul></li></ul></li><li><p>实现复杂度</p><ul><li>因为分表的 order by 等需要聚合还要识别 SQL 的关键字，所以实现比较困难</li></ul></li></ul></li></ul><h3 id="nosql" tabindex="-1"><a class="header-anchor" href="#nosql"><span>NoSQL</span></a></h3><ul><li><p>关系数据库的缺点</p><ul><li><p>1.行记录无法存储数据结构</p></li><li><p>2.关系数据库的 schema 扩展不方便</p></li><li><p>3.关系数据库大数据情况下 I/O较高</p></li><li><p>4.关系数据库的文档搜索能力较弱</p><ul><li>全文搜索的条件可以随意排列组合，如果通过索引满足则会添加大量的索引</li><li>模糊匹配的方式无法满足，只能用 like，like 是全表扫描速度较慢</li></ul></li></ul></li><li><p>分类</p><ul><li>K-V 存储： Redis</li><li>文档数据库： MongoDB</li><li>列式数据库：Hbase</li><li>全文搜索引擎：Elasticsearch</li></ul></li><li><p>K-V存储</p><ul><li><p>redis 目前问题</p><ul><li>1.不支持完整的 ACID</li></ul></li></ul></li><li><p>文档数据库</p><ul><li><p>优势</p><ul><li>新增字段简单</li><li>历史数据不会出错</li><li>可以很容易存储复杂的数据结构</li></ul></li></ul></li><li><p>列式数据库</p><ul><li><p>优势</p><ul><li>业务同时读取多列效率较高，因为这些列式存储在一起的，一次磁盘读写就能把一行数据的所有列都读取到内存中</li><li>可以一次写多个列</li></ul></li></ul></li><li><p>全文搜索引擎</p><ul><li>原理是倒排序，即内容和文件建立关联关系</li></ul></li></ul><h3 id="缓存" tabindex="-1"><a class="header-anchor" href="#缓存"><span>缓存</span></a></h3><ul><li><p>使用场景</p><ul><li>需要复杂的运算之后得到结果，存储系统也无能为力</li><li>读多写少，存储系统有心无力</li></ul></li><li><p>缓存穿透：缓存中没有数据导致去查询数据库</p><ul><li>存储数据不存在，可通过设置默认值解决</li><li>缓存数据生成耗费大量时间，</li></ul></li><li><p>缓存雪崩：缓存失效后导致系统性能的下降</p><ul><li>更新锁，只能一个线程去更新</li><li>后台更新，缓存本身设置为永久有效，定时任务或消息通知去更新缓存数据</li></ul></li><li><p>缓存热点：热点数据进行缓存</p></li></ul><h2 id="_5-计算高性能" tabindex="-1"><a class="header-anchor" href="#_5-计算高性能"><span>5. 计算高性能</span></a></h2><h3 id="单服务器高性能" tabindex="-1"><a class="header-anchor" href="#单服务器高性能"><span>单服务器高性能</span></a></h3><ul><li><p>关键之一是网络编程模型</p><ul><li><p>服务器如何管理连接</p></li><li><p>服务器如何处理请求</p></li><li><p>解决方向</p><ul><li>I/O 模型</li><li>进程模型</li></ul></li></ul></li><li><p>PPC（Process per Connection ）</p><ul><li><p>流程</p><ul><li>1.父进程接受连接</li><li>2.父进程 fork 子进程</li><li>3.子进程处理请求的读写</li><li>4.子进程关闭连接</li></ul></li><li><p>弊端</p><ul><li>fork 代价过高</li><li>父子进程通信复杂</li><li>进程数量增大后多操作系统压力过大</li></ul></li></ul></li><li><p>prefork</p><ul><li>进行连接时才 fork 会让用户感觉卡段，所以出现了预fork优化流程，但是也会出现“惊群”问题，即只会有一个子进程去连接，但是会唤起所有的子进程去尝试，浪费线程上下文切换</li><li>也存在父子线程通信复杂问题；进程数量增大后导致操作系统压力过大</li></ul></li><li><p>TPC(Thread per Connection)</p><ul><li><p>流程</p><ul><li>1.父进程接受连接</li><li>2.父进程创建子线程</li><li>3.子线程处理请求的读写</li><li>4.子线程关闭连接</li></ul></li><li><p>虽然解决了线程通信复杂和fork 代价过高问题，但是也引入的新的问题</p><ul><li>高并发情况下依然存在性能问题</li><li>虽无需进程间通信了，但线程间的互斥和共享又引入了新的复杂度，可能一不小心出现死锁问题</li><li>可能出现某个线程异常导致整个进程的结束</li><li>还是存在 CPU 线程调度和切换代价问题</li></ul></li></ul></li><li><p>PreThread</p><ul><li><p>流程</p><ul><li>1.主线程accept，然后将连接交给某个线程处理</li><li><ol start="2"><li>子线程都尝试去accept，最终只有一个子线程accept成功</li></ol></li></ul></li></ul></li><li><p>Reactor</p><ul><li><p>要解决的问题</p><ul><li><p>为了解决PPC多次创建进程问题，可以通过进行池化，实现资源的节约，但是引入后出现了新的问题</p><ul><li><p>进程如何高效的处理多个连接</p><ul><li>一个连接一个进程时可以通过阻塞进行读取，但是一个进程连接多个连接时就不能阻塞到某个进程上，解决这个问题的方法就是将read改为非阻塞的，进行不断的轮询多个连接，但是解决方式并不优雅，轮询也是小号CPU的，如果一个进程的连接数过多，轮询的效率也不高，为了解决这个问题想到了只有连接上有数据的时候进程采取处理，这就是I/O多路复用技术的来源</li></ul></li></ul></li><li><p>两个关键实现点</p><ul><li>当多条连接共用一个阻塞对象后，进程只需要在一个阻塞对象上等待，而无需再轮询所有的连接</li><li>当某条连接有新的数据可以处理时，操作系统会通知进程，进程从阻塞状态返回，开始进行业务处理</li></ul></li></ul></li><li><p>模式的核心</p><ul><li><p>reactor</p><ul><li>负责监听和分配时间</li></ul></li><li><p>处理资源线程池</p><ul><li>负责处理时间</li></ul></li></ul></li><li><p>实现方案</p><ul><li><p>单Reactor 单进程/单线程</p><ul><li><p>1.Reactor对象通过select监控连接事件，收到事件通知后通过dispatch进行分发</p></li><li><p>2.如果是连接建立的事件，则由Acceptor处理，Acceptor通过accept接受连接，并创建一个Handler来处理连接后续的各种事件</p></li><li><p>3.如果不是连接建立事件，则Reactor会调用连接对象的Handler（第2步中创建的hadnler）进行响应</p></li><li><p>4.Handler会完成read--&gt;业务处理--&gt;send的完整业务流程</p></li><li><p>优点：简单，没有进程间通信，没有进程竞争，全部都在同一个进程中完成</p></li><li><p>缺点</p><ul><li>只有一个进程，无法发挥多核CPU的性能</li><li>只能部署多个系统来利用多核CPU，这样会带来运维复杂度</li><li>handler在处理某个连接的业务时，整个进程无法处理其他连接的事件，很容易导致性能瓶颈</li></ul></li><li><p>适用场景</p><ul><li>业务处理速度非常快的，例如： Redis</li></ul></li></ul></li><li><p>单Reactor 多线程</p><ul><li>1.主线程中，Reactor对象通过select监听连接事件，收到事件后通过dispatch进行分发</li></ul></li><li><p>多Reactor 多进程/线程</p></li></ul></li></ul></li><li><p>Proactor</p></li></ul><h3 id="集群高性能" tabindex="-1"><a class="header-anchor" href="#集群高性能"><span>集群高性能</span></a></h3><ul><li><p>负载均衡器的分类</p><ul><li><p>DNS负载均衡：不同地区的用户访问同一个域名返回不同的ip</p><ul><li><p>优点</p><ul><li>简单、成本低</li><li>就近访问，提升访问速度</li></ul></li><li><p>缺点</p><ul><li>更新不及时</li><li>扩展性差</li><li>分配策略比较简单</li></ul></li></ul></li><li><p>硬件负载均衡：F5和A10</p><ul><li><p>优点</p><ul><li>功能强大</li><li>性能强大</li><li>稳定性高</li><li>支持安全防护</li></ul></li><li><p>缺点</p><ul><li>价格昂贵</li><li>扩展能力差</li></ul></li></ul></li><li><p>软件负载均衡</p><ul><li><p>分类</p><ul><li>nginx：7层负载均衡</li><li>LVS：是linux内核的4层负载均衡</li></ul></li><li><p>优点</p><ul><li>简单</li><li>便宜</li><li>灵活</li></ul></li><li><p>缺点</p><ul><li>性能一般</li><li>功能没有硬件负载均衡那么强大</li><li>一般不具备防火墙和防DDOS攻击等安全功能</li></ul></li></ul></li></ul></li><li><p>负载均衡器架构</p><ul><li><ol><li>DNS负载均衡实现地理级别的负载均衡</li></ol></li><li><ol start="2"><li>F5实现集群级别的负载均衡</li></ol></li><li><ol start="3"><li>软件负载均衡实现机器级别的负载均衡</li></ol></li></ul></li><li><p>负载均衡器算法</p><ul><li>任务平分类：可以决定平均分配到各个服务器上，也可以是按照比例或者权重</li><li>负载均衡类：根据服务器的负载来进行分配，这里的负载不一定是CPU负载，而是系统当前压力，可以是CPU负载来衡量，也可以是连接数、I/O使用率、网卡吞吐量等来衡量系统的压力</li><li>性能最优类：根据服务器的响应时间来进行任务分配，优先分配给响应最快的服务器</li><li>Hash类：根据某些信息进行Hash运算，分配到指定服务器上。常见的有源地址Hash、目标地址Hash、session id hash、用户id Hash等</li></ul></li></ul><h2 id="_6-cap" tabindex="-1"><a class="header-anchor" href="#_6-cap"><span>6. CAP</span></a></h2><h3 id="cap-理论" tabindex="-1"><a class="header-anchor" href="#cap-理论"><span>CAP 理论</span></a></h3><ul><li><p>一致性 Consistency</p><ul><li>对某个指定客户端来说，读操作保证能够返回最新的写操作结果</li></ul></li><li><p>可用性 Availability</p><ul><li>非故障的节点在合理的时间内返回合理的响应（不是错误和超时的响应）</li></ul></li><li><p>分区容错性Partition Tolerance</p><ul><li>当出现网络分区后，系统能够继续“履行职责”</li></ul></li></ul><h3 id="cap-应用" tabindex="-1"><a class="header-anchor" href="#cap-应用"><span>CAP 应用</span></a></h3><ul><li><p>分布式环境下 P 是必须得，否则当出现网络分区时，C 和 A 就会冲突</p></li><li><p>CP</p><ul><li>当 N1 节点数据在同步到 N2 节点时，复制通道出现问题，导致未复制到N2，为了保证 C，此时系统访问 N2 的时候会提示不可用（违反了 A）</li></ul></li><li><p>AP</p><ul><li>当 N1 节点数据在同步到 N2 节点时，复制通道出现问题，导致未复制到N2，为了保证 A，此时系统访问 N2 可以正常使用，但是会导致数据不一致（违反了 C）</li></ul></li></ul><h3 id="cap-细节" tabindex="-1"><a class="header-anchor" href="#cap-细节"><span>CAP 细节</span></a></h3><ul><li><p>CAP 关注的粒度是数据而不是系统；在整个系统中可以某些数据是 CP，某些数据是 AP</p></li><li><p>CAP 是忽略网络延迟的</p></li><li><p>正常情况下不存在CP 和 AP 的选择，可以同时满足 CA</p><ul><li><p>CA</p><ul><li>可通过数据库的同步，虽然有延迟，但是某些实时性不是很高的较适合</li><li>可通过 MQ 实现最终数据一致性</li></ul></li></ul></li><li><p>放弃并不等于什么都不做，需要为分区恢复后做准备</p></li></ul><h3 id="acid、base" tabindex="-1"><a class="header-anchor" href="#acid、base"><span>ACID、BASE</span></a></h3><ul><li><p>ACID：数据库完整性理论</p><ul><li><p>原子性（Atomicity）</p><ul><li>一个事务中要么全部完成，要么全部失败，不会结束在中间状态</li></ul></li><li><p>一致性（Consistency）</p><ul><li>在事务开始前和结束后，数据库的完整性没有被破坏</li></ul></li><li><p>隔离性（Islation）</p><ul><li><p>数据库支持多个并发事务同时对数据读取和修改的能力，隔离性可以防止多个事务并<br> 发执行时由于交叉执行而导致数据的不一致。</p></li><li><p>隔离级别</p><ul><li>读未提交（read uncommitted）</li><li>读提交(read committed)</li><li>可重复度（read repeatable）</li><li>串行化（Serializable）</li></ul></li></ul></li><li><p>持久性（Durability）</p><ul><li>事务处理结束后，对数据的处理是永久的，即使系统故障也不会丢失</li></ul></li></ul></li><li><p>BASE：即使无法做到强一致性，也要做到最终一致性</p><ul><li><p>基本可用（base available）</p><ul><li>分布式系统出现故障时，允许系统损失部分可用性，但是保证核心系统的可用性</li></ul></li><li><p>软状态（Soft state）</p><ul><li>允许系统出现中间状态，而该中间状态不影响系统整体的可用性</li></ul></li><li><p>最终一致性（Eventual Consistency）</p><ul><li>系统经过一段时间后所有的副本数据达到一致性</li></ul></li></ul></li></ul><h3 id="cap-和-base" tabindex="-1"><a class="header-anchor" href="#cap-和-base"><span>CAP 和 BASE</span></a></h3><ul><li><p>CP</p><ul><li>CAP 理论是忽略网络延迟的，但是现实中肯定会存在延迟，这和 BASE 的最终一致性不谋而合</li></ul></li><li><p>AP</p><ul><li>牺牲一致性是指系统出现分区时，当分区问题结束时也要完成数据的一致性。 BASE 理论其实是 AP的延伸</li></ul></li></ul><h2 id="_7-fmea" tabindex="-1"><a class="header-anchor" href="#_7-fmea"><span>7. FMEA</span></a></h2><h3 id="fmea-介绍" tabindex="-1"><a class="header-anchor" href="#fmea-介绍"><span>FMEA 介绍</span></a></h3><ul><li>FMEA (Failure mode and effects analysis ，故障模式与影响分析）又称为失效模式与后果分<br> 析、失效模式与效应分析、故障模式与后果分析等</li></ul><h3 id="fmea-方法" tabindex="-1"><a class="header-anchor" href="#fmea-方法"><span>FMEA 方法</span></a></h3><ul><li><p>具体方法</p><ul><li><ol><li>给出系统的初始架构图</li></ol></li><li>2.假设系统中某个部件出现故障</li><li>3.分析此故障对系统的影响</li><li>4.根据结果分析架构是否需要优化</li></ul></li><li><p>分析表格包含的属性</p><ul><li>功能点：是从用户角度思考，而非技术角度</li><li>故障模式：要用可量化的指标，例如：数据库响应 3s</li><li>故障影响：出现故障时该功能点会受到什么影响，无影响，部分不可用，全部可用等，尽量给出可量化指标</li><li>严重程度：尽量给出可量化指标</li><li>故障原因：主要原因，可以作为问题预演</li><li>故障概率：可从多个方面思考。如硬件、开源系统、自研系统</li><li>风险程度</li><li>已有措施：如检测告警、容错、自恢复</li><li>规避措施</li><li>解决措施</li><li>后续规划</li></ul></li></ul><h3 id="fmea-实战" tabindex="-1"><a class="header-anchor" href="#fmea-实战"><span>FMEA 实战</span></a></h3><ul><li></li></ul><h2 id="_8-存储高可用" tabindex="-1"><a class="header-anchor" href="#_8-存储高可用"><span>8. 存储高可用</span></a></h2><h3 id="问题-主要是副本冗余实现高可用" tabindex="-1"><a class="header-anchor" href="#问题-主要是副本冗余实现高可用"><span>问题：主要是副本冗余实现高可用</span></a></h3><ul><li>数据如何复制</li><li>各个节点的职责是什么</li><li>如何应对复制延迟</li><li>如何应对复制中断</li></ul><h3 id="主备复制" tabindex="-1"><a class="header-anchor" href="#主备复制"><span>主备复制</span></a></h3><ul><li><p>详细设计</p><ul><li>1.主机存储数据，通过复制渠道复制给备机</li><li>2.正常情况下，所有的请求直接发给主机，备机只做数据的备份不提供任何的读写</li><li>3.主机出现故障的情况下，所有的请求不会发送到备机，整个系统处于中断状态，不可读写数据，但数据并没有全部丢失，备机还存在数据备份</li><li>4.主机恢复后，读写继续访问主机，主机数据继续复制给备机</li><li>5.如果主机不可修复，可通过人工备机升为主机，但是为了保持主备，需要新增机器</li><li>6.主机不可恢复情况下，可能存在数据只到主机还未复制到备机的情况，此种数据就需要人工修复，业务也需要考虑改情况</li><li>7.复制可能存在延迟，但是备机不提服务，所以不会影响系统，但是若存在大量数据未同步，突然主机不可修复，会损失大量数据，所以不可掉以轻心，需要添加监控，若存在延迟过大需要人工介入</li></ul></li><li><p>优点</p><ul><li>客户端无感知，只需要回复后进行重新连接</li><li>只需要数据同步，不需要进行机器的状态判断和倒换</li></ul></li><li><p>缺点</p><ul><li>备机只提供备份，不提供读写，造成成本浪费</li><li>故障后需要人工干预，无法自动恢复</li></ul></li></ul><h3 id="主从复制" tabindex="-1"><a class="header-anchor" href="#主从复制"><span>主从复制</span></a></h3><ul><li><p>详细设计</p><ul><li>1.主机存储数据，通过复制渠道复制给备机</li><li>2.写操作发给主机，读操作则根据业务进行发给主机还是从机</li><li>3.主机故障的情况下，客户端不可写入数据，读操作可以发给从机是不影响读数据。适用于读操作较多的场景如新闻网站</li><li>4.如果主机恢复后，写操作还继续访问主机，主机数据绩溪复制到从机</li><li>5.如果主机不可修复，可通过人工从机升为主机，为了保持主从需要添加新主机</li><li>6.主机不可恢复情况下，可能存在数据只到主机还未复制到备机的情况，此种数据就需要人工修复，业务也需要考虑改情况</li><li>7.主从之间可能存在同步延迟，导致读取主从数据不一致问题，若是需要强一致性，则需要直接读取主机</li></ul></li><li><p>优点</p><ul><li>主机出现故障时读操作不会受到影响</li><li>从机提供读，发挥了硬件的性能</li></ul></li><li><p>缺点</p><ul><li>客户端需要感知主从，不同的命令发送到不同的机器</li></ul></li></ul><h3 id="主备倒换和主从倒换" tabindex="-1"><a class="header-anchor" href="#主备倒换和主从倒换"><span>主备倒换和主从倒换</span></a></h3><ul><li><p>主从/主备的共性问题</p><ul><li>主机故障不能写操作</li><li>如果主机无法恢复则需要人工参与</li></ul></li><li><p>考虑的关键点</p><ul><li><p>状态判断</p><ul><li>状态传递渠道：相互连接还是三方仲裁</li><li>状态检测的内容：机器能够正常提供服务</li></ul></li><li><p>倒换决策</p><ul><li>倒换时机：什么时候倒换，是主机停机 3s 还是其他参数</li><li>倒换策略：主机恢复后还是主机还是恢复后变为从/备机</li><li>自动程度：全自动还是半自动（人工确认）</li></ul></li><li><p>数据冲突</p><ul><li>同步中主机出现故障导致主机和从/备机数据不一致问题怎么处理</li></ul></li></ul></li><li><p>常见架构</p><ul><li><p>互联式：主备/主从相互连接</p><ul><li>问题：需要主、备、客户端左右做修改；连接通道出现问题就会出现多主或多从问题，若是多种连接通道就会浪费资源</li></ul></li><li><p>中介式：引入中介方，MongDB 就是这种模式</p><ul><li><p>优点</p><ul><li>实现简单，只需要中介读取主从节点，然后根据状态进行确定各方是否主备情况</li></ul></li><li><p>缺点</p><ul><li>为了保证中介方高可用就会引入新的问题</li></ul></li><li><p>开源中介 ZooKeeper</p></li></ul></li><li><p>模拟式：从节点模拟客户端访问主节点</p><ul><li><p>优点</p><ul><li>实现更简单省去连接通道和状态管理</li></ul></li><li><p>缺点</p><ul><li>基于有限状态做决定，可能出现偏差</li></ul></li></ul></li></ul></li></ul><h3 id="主主复制" tabindex="-1"><a class="header-anchor" href="#主主复制"><span>主主复制</span></a></h3><ul><li><p>详细设计</p><ul><li>1.两台主机都存储数据，通过复制通道将数据复制到另外一台主机</li><li>2.正常情况下，客户端可以将读写操作发送给任意一台主机</li><li>3.一台主机故障情况下，客户端只需要把读写操作发送给另一个主机</li><li>4.如果故障主机恢复，客户端继续访问两台主机，两台主机之间互相复制对方数据</li><li>5.如果故障主机不能恢复则需要人工添加一台新的主机</li><li>6.存在某个主机写入数据后还未同步至另一台主机，该主机崩溃导致的书记丢失，需要考虑此风险</li><li>7.存在同步延迟，可能写入了A，在B上读取不到刚刚写入的数据</li></ul></li><li><p>优点</p><ul><li>两台都是主机，不存在倒换概念</li><li>客户端无需分辨不同角色的主机，随便将读写操作发送给哪台主机都行</li></ul></li><li><p>缺点</p><ul><li>部分数据不能双向复制，例如库存，A-1 和B-2双向复制会导致数据错误</li></ul></li></ul><h3 id="数据集群" tabindex="-1"><a class="header-anchor" href="#数据集群"><span>数据集群</span></a></h3><ul><li><p>集中集群：每个节点的数据都是完整的一份</p><ul><li><p>需要考虑的</p><ul><li>主机如何将数据复制给备机</li><li>备机如何检测主机状态</li><li>主机故障后，如何决定新的主机</li></ul></li></ul></li><li><p>分散集群：每台服务器都会负责存储一部分数据，为了提升硬件利用率，每台服务器又会备份一部分数据</p><ul><li><p>需要考虑的</p><ul><li>均衡性</li><li>容错性</li><li>可伸缩性</li></ul></li></ul></li><li><p>分布式事务算法</p><ul><li><p>2PC：两阶段提交，分别是commit请求阶段和commit提交阶段</p><ul><li><p>成立的假设</p><ul><li>1.分布式系统中，存在一个节点作为协调者，其他节点作为参与者，且节点之间可以进行网络通信</li><li><ol start="2"><li>所有节点都采用预写式日志，且日志被写入后即保持在可靠的存储设备上，即使节点损坏，也不会导致日志数据的消失</li></ol></li><li>3.所有节点不会永久性损坏，即使损坏仍然可以恢复</li></ul></li><li><p>基本说明</p><ul><li><p>1.协调者想所有的参会者发送QUERY TO COMMIT 消息，询问是否可以执行提交事务，并开始等待各参与者的响应</p></li><li><p>2.参与者执行询问发起为止的所有事务操作，并将Undo信息和Redo信息写入日志，返回Yes消息给协调者；如果参与者执行失败，则返回No消息给协调者</p><ul><li><p>成功</p><ul><li>1.协调者向所有的参与者发出COMMIT的请求</li><li>2.参与者完成COMMIT操作，并释放在整个事务期间占用的资源</li><li>3.参与者向协调者发送ACK消息</li><li>4.协调者接收到所有参与者反馈的ACK消息后，完成事务</li></ul></li><li><p>失败</p><ul><li>1.协调者向参与者发出ROLLBACK的请求</li><li>2.参与者利用之前写入的Undo信息执行回滚，并释放在整个事务期间占用的资源</li><li>3.参与者想向协调者发送ACK信息</li><li>4.协调者接收到所有参与者反馈的ACK消息后，完成事务</li></ul></li></ul></li></ul></li><li><p>优点</p><ul><li>简单</li></ul></li><li><p>缺点</p><ul><li>同步阻塞，性能存在明显问题，难以支持高并发的应用场景</li><li>状态不一致，如果第二段提交的时候参与者未接收到消息就会出现超时回滚的情况，出现状态不一致</li><li>单点故障，协调者出现问题参与者就会一直阻塞下去，整个集群就无法提供服务</li></ul></li></ul></li><li><p>3PC：三阶段提交，分别是提交判断阶段（协调者询问参与者是否可以提交事务），准备提交阶段（协调者向参与者发送准备提交的信息），提交执行阶段（协调者向参与者发送提交信息），只要到了第三阶段，如果参与者未接收到提交数据，也会变成提交</p></li></ul></li><li><p>分布式一致性算法</p><ul><li>Paxos算法</li><li>Raft算法</li><li>ZAB算法</li></ul></li></ul><h3 id="数据分区" tabindex="-1"><a class="header-anchor" href="#数据分区"><span>数据分区</span></a></h3><ul><li><p>数据量，数据量越大分区规则越复杂</p></li><li><p>分区规则</p></li><li><p>复制规则</p><ul><li><p>集中式：数据统一复制到总的备份中心</p></li><li><p>互备式，节点之间相互备份</p><ul><li><p>优缺点</p><ul><li>设计比较复杂</li><li>扩展麻烦</li><li>成本低，可以直接利用已有的设备</li></ul></li></ul></li><li><p>独立式：每个节点有自己的备份节点</p><ul><li>设计简单，各分区互不影响</li><li>扩展容器，新增分区只需要搭建自己的备份中心即可</li><li>成本高</li></ul></li></ul></li></ul><h2 id="_9-计算高可用" tabindex="-1"><a class="header-anchor" href="#_9-计算高可用"><span>9. 计算高可用</span></a></h2><h3 id="设计关键点" tabindex="-1"><a class="header-anchor" href="#设计关键点"><span>设计关键点</span></a></h3><ul><li>哪些服务器可以执行任务</li><li>任务如何重新执行</li></ul><h3 id="主备" tabindex="-1"><a class="header-anchor" href="#主备"><span>主备</span></a></h3><ul><li><p>详细设计</p><ul><li><ol><li>主机执行所有的计算任务</li></ol></li><li>2.当主机故障时，任务分配其不会自动将任务发送给备机，此时系统不可用状态</li><li>3.如果主机能够恢复，任务分配器继续将任务发送给主机</li><li>4.如果主机不能恢复，则人工将备机升级为主机，需要添加新主机做备机</li></ul></li><li><p>细分</p><ul><li><p>冷备</p><ul><li>备机启动状态，但是未启动业务系统，当备机升级为主机时，启动业务系统</li></ul></li><li><p>温备</p><ul><li>业务系统已经启动，但是不对外服务，当备机升级为主机时，让它正式提供服务</li></ul></li></ul></li></ul><h3 id="主从" tabindex="-1"><a class="header-anchor" href="#主从"><span>主从</span></a></h3><ul><li><p>详细设计</p><ul><li><ol><li>一般情况下，主机执行部分任务，备机执行部分任务</li></ol></li><li><ol start="2"><li>当主机出现故障时，任务分配器不会自动的将原来发给主机的任务发给从机，而是继续发送给主机，不管这些任务执行是否成功</li></ol></li><li>3.如果主机能够恢复，任务分配器继续将任务发送给主机</li><li>4.如果主机不能恢复，则人工把原来的从机升为主机，然后添加新的主机为从机</li></ul></li><li><p>优点</p><ul><li>主从架构的从机也执行任务，发挥了硬件的性能</li></ul></li><li><p>缺点</p><ul><li>主从架构需要对任务进行分类，任务分配器会更复杂一些</li></ul></li></ul><h3 id="根据节点角色分类" tabindex="-1"><a class="header-anchor" href="#根据节点角色分类"><span>根据节点角色分类</span></a></h3><ul><li><p>解决的问题</p><ul><li>主从或主备，人工效率低，容器出错，不能及时处理故障</li></ul></li><li><p>对称集群(负载均衡集群)：所有节点的角色一致</p><ul><li><p>详细设计</p><ul><li>1.正常情况下，任务采取某种策略（轮询、权重、资源）等方法，将任务分配到集群中的不同服务器</li><li>2.当某台服务器出现故障，任务不再将任务分配给该机器，转而分配给其他的服务器</li><li>3.当故障的服务器恢复后，任务将再次分配给该机器</li></ul></li></ul></li><li><p>非对称集群：分角色master-slave</p><ul><li><p>详细设计</p><ul><li><ol><li>集群会通过某种方式区分服务器的不同角色，例如 Paxos 算法选举或者简单的 id 最小的为 master</li></ol></li><li>2.任务分配器将不同的任务分配给不同的角色</li></ul></li><li><p>复杂度的体现</p><ul><li>1.任务分配的策略更加复杂</li><li>2.角色分配更加复杂</li></ul></li></ul></li></ul><h2 id="_10-业务高可用" tabindex="-1"><a class="header-anchor" href="#_10-业务高可用"><span>10. 业务高可用</span></a></h2><h3 id="异地多活" tabindex="-1"><a class="header-anchor" href="#异地多活"><span>异地多活</span></a></h3><ul><li><p>两个标准</p><ul><li><ol><li>正常情况下用户访问不管哪一地点的业务系统，都能够得到正确的业务服务</li></ol></li><li>2.某地异常的情况下， 用户访问到另一地点的业务系统，也能够得到正确的业务服务</li></ul></li><li><p>两个代价</p><ul><li>1.系统的复杂度会发生质的变化</li><li>2.成本会上升</li></ul></li><li><p>架构</p><ul><li><p>同城异区：相比设计和实现的降低了复杂度和成本，但是同城天灾时出现都不可用的概率增大</p></li><li><p>跨城异地：相比同城天灾影响的概率降低，但是由于存在网络延迟等问题，相关成本大大增加</p></li><li><p>跨国异地：成本最大</p><ul><li><p>使用场景</p><ul><li>为不同的地区提供服务</li><li>只读类做多活</li></ul></li></ul></li></ul></li><li><p>技巧</p><ul><li><p>同城异区：网络延迟较低可以不用考虑设计</p></li><li><p>跨城异地：主要网络延迟导致的数据不一致问题，架构是需要考虑</p></li><li><p>跨国异地：为不同的地区提供服务和只读所以对系统的设计并不多</p></li><li><p>技巧一：保证核心业务的异地多活</p></li><li><p>技巧二：核心数据最终一致性</p><ul><li>减少异地多活的距离，搭建高速网络</li><li>尽量减少数据同步，只同步核心数据</li><li>保证数据最终一致性，不保证实时一致性</li></ul></li><li><p>技巧三：采用多种数据同步手段</p><ul><li>消息队列方式</li><li>二次读取</li><li>存储系统同步方式</li><li>回源读取方式：优先访问上次请求的主机</li><li>重新生成数据方式</li></ul></li><li><p>技巧四：只保证绝大部分用户的异地多活</p></li></ul></li><li><p>设计步骤</p><ul><li><p>1.业务分级</p><ul><li>访问量大的业务</li><li>核心业务</li><li>产生大量收入的业务</li></ul></li><li><p>2.数据分类</p><ul><li>数据量</li><li>唯一性</li><li>实时性</li><li>可丢失性</li><li>可恢复性</li></ul></li><li><p>3.数据同步</p><ul><li>存储系统同步方式</li><li>消息队列方式</li><li>重新生成数据方式</li></ul></li><li><p>4.异常处理</p><ul><li><p>目的</p><ul><li>避免少量数据导致整体业务不可用</li><li>问题恢复后，对异常数据进行修复</li><li>对用户安抚，进行补偿</li></ul></li><li><p>措施</p><ul><li><p>多通道同步</p><ul><li>一般采用两个通道，再多成本较高</li><li>通道尽量隔离，如使用同一个网络，若出现网络问题则都不可用</li><li>需要数据覆盖，无论走哪一通道最后结果一致</li></ul></li><li><p>同步和访问结合</p><ul><li>接口访问和数据同步不要走同一个网络</li><li>数据有路由规则，可以通过数据确定需要访问哪个去补偿</li><li>优先本地数据，其次远程调用，可以节省大量的调用</li></ul></li><li><p>日志记录</p><ul><li>服务器上保存日志</li><li>本地独立系统保存日志</li><li>日志异地保存</li></ul></li><li><p>用户补偿</p></li></ul></li></ul></li></ul></li></ul><h3 id="接口级的故障应对方案" tabindex="-1"><a class="header-anchor" href="#接口级的故障应对方案"><span>接口级的故障应对方案</span></a></h3><ul><li><p>降级：减少功能</p><ul><li><p>系统后门降级：通过参数设置变量控制降级</p><ul><li>存在安全问题</li><li>主机多的情况需要操作多次，效率低</li></ul></li><li><p>独立降级系统：解决系统后门降级的问题，把所有的降级抽取为一个服务进行管理</p></li></ul></li><li><p>熔断：外部依赖的系统存在故障时，要熔断防止影响该系统</p></li><li><p>限流：防止用户访问过于频繁，通过限流降低短时间内访问次数</p><ul><li>基于请求限流</li><li>基于资源限流</li></ul></li><li><p>排队：如双十一秒杀，通过 MQ 排队购买</p></li></ul><h2 id="_11-可扩展模式" tabindex="-1"><a class="header-anchor" href="#_11-可扩展模式"><span>11. 可扩展模式</span></a></h2><h3 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span>概述</span></a></h3><ul><li>避免添加或修改功能时改动内容过多</li></ul><h3 id="基本思想" tabindex="-1"><a class="header-anchor" href="#基本思想"><span>基本思想</span></a></h3><ul><li><p>拆</p></li><li><p>思路</p><ul><li><p>面向流程拆分</p><ul><li>例如:TCP/IP的流程就是应用层&gt;传输层&gt;网络层&gt;物理&gt;数据链路层</li></ul></li><li><p>面向服务拆分</p><ul><li>提供 http 服务、ftp 服务</li></ul></li><li><p>面向功能拆分</p><ul><li>例如：http 的 get，ftp 的文件上下载</li></ul></li></ul></li></ul><h3 id="方式" tabindex="-1"><a class="header-anchor" href="#方式"><span>方式</span></a></h3><ul><li><p>面向流程</p><ul><li><p>一般只需要更改一层，很少会存在修改多层</p><ul><li>分层架构</li></ul></li></ul></li><li><p>面向服务</p><ul><li><p>只需要修改对应的服务，无需修改所有的服务</p><ul><li>SOA架构、微服务架构</li></ul></li></ul></li><li><p>面向功能</p><ul><li><p>只需要修改对应的功能，不需要修改所有的功能</p><ul><li>微内核架构</li></ul></li></ul></li></ul><h2 id="_12-分层架构" tabindex="-1"><a class="header-anchor" href="#_12-分层架构"><span>12. 分层架构</span></a></h2><h3 id="类型" tabindex="-1"><a class="header-anchor" href="#类型"><span>类型</span></a></h3><ul><li>B/S和 C/S 架构</li><li>MVC 和 MVP 架构</li><li>逻辑分层架构</li></ul><h3 id="详解" tabindex="-1"><a class="header-anchor" href="#详解"><span>详解</span></a></h3><ul><li>隔离关注点</li><li>只能分层依赖，不可跨层，否则容易出现混乱</li></ul><h2 id="_13-soa-架构" tabindex="-1"><a class="header-anchor" href="#_13-soa-架构"><span>13. SOA 架构</span></a></h2><h3 id="历史" tabindex="-1"><a class="header-anchor" href="#历史"><span>历史</span></a></h3><ul><li>企业各部门有独立的系统</li><li>复杂度逐渐升高，需要多个 IT 系统合作完成流程</li><li>各系统的技术团队不一样，无法统一重构</li></ul><h3 id="详解-1" tabindex="-1"><a class="header-anchor" href="#详解-1"><span>详解</span></a></h3><ul><li><p>三个概念</p><ul><li>服务</li><li>ESB</li><li>松耦合</li></ul></li></ul><h2 id="_14-微服务" tabindex="-1"><a class="header-anchor" href="#_14-微服务"><span>14. 微服务</span></a></h2><h3 id="微服务和soa的关系" tabindex="-1"><a class="header-anchor" href="#微服务和soa的关系"><span>微服务和SOA的关系</span></a></h3><ul><li>是两个不同的架构设计理念，只是“服务”上有交集</li><li>微服务粒度更细</li><li>服务通信更轻量</li><li>SOA 多是兼容系统，微服务则是快速交付</li><li>SOA 适用于庞大的笨重的项目，微服务更适用轻量的互联网项目</li></ul><h3 id="微服务的陷阱" tabindex="-1"><a class="header-anchor" href="#微服务的陷阱"><span>微服务的陷阱</span></a></h3><ul><li>服务划分过细，服务关系过于复杂</li><li>服务数量过多，团队效率下降</li><li>调用链太长，性能下降</li><li>调用链太长，问题难以定位</li><li>没有自动化支持，无法快速交付</li><li>没有微服务治理，服务数量多后管理混乱</li></ul><h3 id="最佳实践" tabindex="-1"><a class="header-anchor" href="#最佳实践"><span>最佳实践</span></a></h3><ul><li><p>服务粒度</p><ul><li>开发阶段，三个人管理一个服务</li><li>稳定阶段，可以一个人管理多个</li></ul></li><li><p>拆分方法</p><ul><li><p>基于业务拆分</p></li><li><p>基于可扩展拆分：成熟和改动的不大的分为稳定服务，经常变动和迭代的分为变动服务</p></li><li><p>基于可靠性拆分：</p><ul><li>避免非核心业务影响核心业务</li><li>核心服务高可用更方便</li><li>降低高可用成本</li></ul></li><li><p>基于性能拆分</p><ul><li>性能要求高的单独拆分方便提高性能</li></ul></li></ul></li><li><p>基础设施</p><ul><li><p>服务发现</p><ul><li>自理式</li><li>代理式</li></ul></li><li><p>配置中心</p></li><li><p>接口框架</p></li><li><p>API 网关</p></li><li><p>服务路由</p></li><li><p>服务容错</p><ul><li>请求重试</li><li>流控</li><li>服务隔离</li></ul></li><li><p>服务监控</p></li><li><p>服务跟踪</p></li><li><p>服务安全</p></li><li><p>自动化测试</p></li><li><p>自动化部署</p></li></ul></li></ul><h2 id="_15-微内核架构-插件化架构" tabindex="-1"><a class="header-anchor" href="#_15-微内核架构-插件化架构"><span>15. 微内核架构（插件化架构）</span></a></h2><h3 id="设计的关键点" tabindex="-1"><a class="header-anchor" href="#设计的关键点"><span>设计的关键点</span></a></h3><ul><li>插件管理</li><li>插件连接</li><li>插件通信</li></ul><h3 id="osgi架构" tabindex="-1"><a class="header-anchor" href="#osgi架构"><span>OSGI架构</span></a></h3><h3 id="规则引擎架构" tabindex="-1"><a class="header-anchor" href="#规则引擎架构"><span>规则引擎架构</span></a></h3><ul><li><p>优点</p><ul><li>可扩展：业务逻辑和业务系统分离</li><li>易理解：规则语言接近自然语言</li><li>高效性：提供 UI 可以高效操作</li></ul></li><li><p>基本架构</p><ul><li><ol><li>开发人员将业务功能提炼为多个规则，配置到规则引擎中</li></ol></li><li><ol start="2"><li>业务人员根据业务需要，排列组合规则组成流程，保存到业务系统中</li></ol></li><li><ol start="3"><li>规则引擎实现执行业务流程，实现业务功能</li></ol></li></ul></li><li><p>如何设计的</p><ul><li><p>插件管理</p><ul><li>配置的规则就是插件，引擎就是内核，引擎可以执行规则，规则存储在规则库中</li></ul></li><li><p>插件连接</p><ul><li>规则引擎的语言</li></ul></li><li><p>插件通信</p><ul><li>通过数据流或事件流</li></ul></li></ul></li><li><p>技术</p><ul><li>Drools</li></ul></li></ul><h2 id="_16-消息队列设计实战" tabindex="-1"><a class="header-anchor" href="#_16-消息队列设计实战"><span>16. 消息队列设计实战</span></a></h2><h2 id="_17-互联网架构演进" tabindex="-1"><a class="header-anchor" href="#_17-互联网架构演进"><span>17. 互联网架构演进</span></a></h2><h3 id="产品类-技术创新推进业务发展-例如手机技术" tabindex="-1"><a class="header-anchor" href="#产品类-技术创新推进业务发展-例如手机技术"><span>产品类：技术创新推进业务发展，例如手机技术</span></a></h3><h3 id="服务类-业务发展推送技术的发展" tabindex="-1"><a class="header-anchor" href="#服务类-业务发展推送技术的发展"><span>服务类：业务发展推送技术的发展</span></a></h3><h2 id="_18-互联网架构模版" tabindex="-1"><a class="header-anchor" href="#_18-互联网架构模版"><span>18. 互联网架构模版</span></a></h2><h3 id="总体结构" tabindex="-1"><a class="header-anchor" href="#总体结构"><span>总体结构</span></a></h3><ul><li></li></ul><h3 id="存储层技术" tabindex="-1"><a class="header-anchor" href="#存储层技术"><span>存储层技术</span></a></h3><ul><li>SQL</li><li>NoSQL</li><li>小文件</li><li>大文件</li></ul><h3 id="开发层技术" tabindex="-1"><a class="header-anchor" href="#开发层技术"><span>开发层技术</span></a></h3><ul><li>开发框架</li><li>web服务器</li><li>容器</li></ul><h3 id="服务层技术" tabindex="-1"><a class="header-anchor" href="#服务层技术"><span>服务层技术</span></a></h3><ul><li>配置中心</li><li>服务中心</li><li>消息队列</li></ul><h3 id="网络层技术" tabindex="-1"><a class="header-anchor" href="#网络层技术"><span>网络层技术</span></a></h3><ul><li>负载均衡</li><li>CDN</li><li>多机房</li><li>多中心</li></ul><h3 id="用户层技术" tabindex="-1"><a class="header-anchor" href="#用户层技术"><span>用户层技术</span></a></h3><ul><li>用户管理</li><li>消息推送</li><li>存储云与图片云</li></ul><h3 id="业务层技术" tabindex="-1"><a class="header-anchor" href="#业务层技术"><span>业务层技术</span></a></h3><h3 id="平台技术" tabindex="-1"><a class="header-anchor" href="#平台技术"><span>平台技术</span></a></h3><ul><li>运维平台</li><li>测试平台</li><li>数据平台</li><li>管理平台</li></ul><h2 id="_19-架构重构" tabindex="-1"><a class="header-anchor" href="#_19-架构重构"><span>19. 架构重构</span></a></h2><h3 id="原因" tabindex="-1"><a class="header-anchor" href="#原因"><span>原因</span></a></h3><ul><li>业务已经上线，不能停下来</li><li>关联方众多，牵一发动全身</li><li>旧架构的约束</li></ul><h3 id="目标" tabindex="-1"><a class="header-anchor" href="#目标"><span>目标</span></a></h3><ul><li>后台系统重构-解决不合理的耦合</li><li>游戏接入系统重构-解决全局单点的可用性问题</li><li>解决大系统带来的开发效率问题</li></ul><h3 id="阶段" tabindex="-1"><a class="header-anchor" href="#阶段"><span>阶段</span></a></h3><ul><li><p>1.救火</p><ul><li>机器扩容</li><li>业务降级</li><li>立体化监控</li></ul></li><li><p>2.组件化</p><ul><li>缓存组件化</li><li>队列组件化</li><li>接入服务中心化</li></ul></li><li><p>3.解耦</p><ul><li>核心和非核心业务分离</li><li>业务中台</li><li>公共功能组件化</li></ul></li></ul><h3 id="流程" tabindex="-1"><a class="header-anchor" href="#流程"><span>流程</span></a></h3><ul><li>1.划分优先级</li><li>2.问题分类</li><li>3.先易后难</li></ul><h2 id="_20-开源系统" tabindex="-1"><a class="header-anchor" href="#_20-开源系统"><span>20. 开源系统</span></a></h2>',143),n=[u];function h(s,r){return i(),a("div",null,n)}const c=l(p,[["render",h],["__file","《从零开始学架构：照着做，你也能成为架构师》.html.vue"]]),o=JSON.parse('{"path":"/%E8%AF%BB%E4%B9%A6/%E3%80%8A%E4%BB%8E%E9%9B%B6%E5%BC%80%E5%A7%8B%E5%AD%A6%E6%9E%B6%E6%9E%84%EF%BC%9A%E7%85%A7%E7%9D%80%E5%81%9A%EF%BC%8C%E4%BD%A0%E4%B9%9F%E8%83%BD%E6%88%90%E4%B8%BA%E6%9E%B6%E6%9E%84%E5%B8%88%E3%80%8B.html","title":"《从零开始学架构：照着做，你也能成为架构师》","lang":"zh-CN","frontmatter":{"title":"《从零开始学架构：照着做，你也能成为架构师》","date":"2024-02-18T00:00:00.000Z","tags":["计算机"],"feed":false,"seo":false,"head":[]},"headers":[{"level":2,"title":"1. 架构基础","slug":"_1-架构基础","link":"#_1-架构基础","children":[{"level":3,"title":"架构是什么","slug":"架构是什么","link":"#架构是什么","children":[]},{"level":3,"title":"架构设计的目的","slug":"架构设计的目的","link":"#架构设计的目的","children":[]},{"level":3,"title":"复杂度来源","slug":"复杂度来源","link":"#复杂度来源","children":[]}]},{"level":2,"title":"2. 架构设计原则","slug":"_2-架构设计原则","link":"#_2-架构设计原则","children":[{"level":3,"title":"合适原则：合适优于业界领先","slug":"合适原则-合适优于业界领先","link":"#合适原则-合适优于业界领先","children":[]},{"level":3,"title":"简单原则：简单优于复杂","slug":"简单原则-简单优于复杂","link":"#简单原则-简单优于复杂","children":[]},{"level":3,"title":"演化原则：演化优于一步到位","slug":"演化原则-演化优于一步到位","link":"#演化原则-演化优于一步到位","children":[]}]},{"level":2,"title":"3. 架构设计流程","slug":"_3-架构设计流程","link":"#_3-架构设计流程","children":[{"level":3,"title":"识别复杂度","slug":"识别复杂度","link":"#识别复杂度","children":[]},{"level":3,"title":"设计备选方案","slug":"设计备选方案","link":"#设计备选方案","children":[]},{"level":3,"title":"评估和选择备选方案","slug":"评估和选择备选方案","link":"#评估和选择备选方案","children":[]},{"level":3,"title":"详细方案","slug":"详细方案","link":"#详细方案","children":[]}]},{"level":2,"title":"4. 存储高性能","slug":"_4-存储高性能","link":"#_4-存储高性能","children":[{"level":3,"title":"关系数据库","slug":"关系数据库","link":"#关系数据库","children":[]},{"level":3,"title":"NoSQL","slug":"nosql","link":"#nosql","children":[]},{"level":3,"title":"缓存","slug":"缓存","link":"#缓存","children":[]}]},{"level":2,"title":"5. 计算高性能","slug":"_5-计算高性能","link":"#_5-计算高性能","children":[{"level":3,"title":"单服务器高性能","slug":"单服务器高性能","link":"#单服务器高性能","children":[]},{"level":3,"title":"集群高性能","slug":"集群高性能","link":"#集群高性能","children":[]}]},{"level":2,"title":"6. CAP","slug":"_6-cap","link":"#_6-cap","children":[{"level":3,"title":"CAP 理论","slug":"cap-理论","link":"#cap-理论","children":[]},{"level":3,"title":"CAP 应用","slug":"cap-应用","link":"#cap-应用","children":[]},{"level":3,"title":"CAP 细节","slug":"cap-细节","link":"#cap-细节","children":[]},{"level":3,"title":"ACID、BASE","slug":"acid、base","link":"#acid、base","children":[]},{"level":3,"title":"CAP 和 BASE","slug":"cap-和-base","link":"#cap-和-base","children":[]}]},{"level":2,"title":"7. FMEA","slug":"_7-fmea","link":"#_7-fmea","children":[{"level":3,"title":"FMEA 介绍","slug":"fmea-介绍","link":"#fmea-介绍","children":[]},{"level":3,"title":"FMEA 方法","slug":"fmea-方法","link":"#fmea-方法","children":[]},{"level":3,"title":"FMEA 实战","slug":"fmea-实战","link":"#fmea-实战","children":[]}]},{"level":2,"title":"8. 存储高可用","slug":"_8-存储高可用","link":"#_8-存储高可用","children":[{"level":3,"title":"问题：主要是副本冗余实现高可用","slug":"问题-主要是副本冗余实现高可用","link":"#问题-主要是副本冗余实现高可用","children":[]},{"level":3,"title":"主备复制","slug":"主备复制","link":"#主备复制","children":[]},{"level":3,"title":"主从复制","slug":"主从复制","link":"#主从复制","children":[]},{"level":3,"title":"主备倒换和主从倒换","slug":"主备倒换和主从倒换","link":"#主备倒换和主从倒换","children":[]},{"level":3,"title":"主主复制","slug":"主主复制","link":"#主主复制","children":[]},{"level":3,"title":"数据集群","slug":"数据集群","link":"#数据集群","children":[]},{"level":3,"title":"数据分区","slug":"数据分区","link":"#数据分区","children":[]}]},{"level":2,"title":"9. 计算高可用","slug":"_9-计算高可用","link":"#_9-计算高可用","children":[{"level":3,"title":"设计关键点","slug":"设计关键点","link":"#设计关键点","children":[]},{"level":3,"title":"主备","slug":"主备","link":"#主备","children":[]},{"level":3,"title":"主从","slug":"主从","link":"#主从","children":[]},{"level":3,"title":"根据节点角色分类","slug":"根据节点角色分类","link":"#根据节点角色分类","children":[]}]},{"level":2,"title":"10. 业务高可用","slug":"_10-业务高可用","link":"#_10-业务高可用","children":[{"level":3,"title":"异地多活","slug":"异地多活","link":"#异地多活","children":[]},{"level":3,"title":"接口级的故障应对方案","slug":"接口级的故障应对方案","link":"#接口级的故障应对方案","children":[]}]},{"level":2,"title":"11. 可扩展模式","slug":"_11-可扩展模式","link":"#_11-可扩展模式","children":[{"level":3,"title":"概述","slug":"概述","link":"#概述","children":[]},{"level":3,"title":"基本思想","slug":"基本思想","link":"#基本思想","children":[]},{"level":3,"title":"方式","slug":"方式","link":"#方式","children":[]}]},{"level":2,"title":"12. 分层架构","slug":"_12-分层架构","link":"#_12-分层架构","children":[{"level":3,"title":"类型","slug":"类型","link":"#类型","children":[]},{"level":3,"title":"详解","slug":"详解","link":"#详解","children":[]}]},{"level":2,"title":"13. SOA 架构","slug":"_13-soa-架构","link":"#_13-soa-架构","children":[{"level":3,"title":"历史","slug":"历史","link":"#历史","children":[]},{"level":3,"title":"详解","slug":"详解-1","link":"#详解-1","children":[]}]},{"level":2,"title":"14. 微服务","slug":"_14-微服务","link":"#_14-微服务","children":[{"level":3,"title":"微服务和SOA的关系","slug":"微服务和soa的关系","link":"#微服务和soa的关系","children":[]},{"level":3,"title":"微服务的陷阱","slug":"微服务的陷阱","link":"#微服务的陷阱","children":[]},{"level":3,"title":"最佳实践","slug":"最佳实践","link":"#最佳实践","children":[]}]},{"level":2,"title":"15. 微内核架构（插件化架构）","slug":"_15-微内核架构-插件化架构","link":"#_15-微内核架构-插件化架构","children":[{"level":3,"title":"设计的关键点","slug":"设计的关键点","link":"#设计的关键点","children":[]},{"level":3,"title":"OSGI架构","slug":"osgi架构","link":"#osgi架构","children":[]},{"level":3,"title":"规则引擎架构","slug":"规则引擎架构","link":"#规则引擎架构","children":[]}]},{"level":2,"title":"16. 消息队列设计实战","slug":"_16-消息队列设计实战","link":"#_16-消息队列设计实战","children":[]},{"level":2,"title":"17. 互联网架构演进","slug":"_17-互联网架构演进","link":"#_17-互联网架构演进","children":[{"level":3,"title":"产品类：技术创新推进业务发展，例如手机技术","slug":"产品类-技术创新推进业务发展-例如手机技术","link":"#产品类-技术创新推进业务发展-例如手机技术","children":[]},{"level":3,"title":"服务类：业务发展推送技术的发展","slug":"服务类-业务发展推送技术的发展","link":"#服务类-业务发展推送技术的发展","children":[]}]},{"level":2,"title":"18. 互联网架构模版","slug":"_18-互联网架构模版","link":"#_18-互联网架构模版","children":[{"level":3,"title":"总体结构","slug":"总体结构","link":"#总体结构","children":[]},{"level":3,"title":"存储层技术","slug":"存储层技术","link":"#存储层技术","children":[]},{"level":3,"title":"开发层技术","slug":"开发层技术","link":"#开发层技术","children":[]},{"level":3,"title":"服务层技术","slug":"服务层技术","link":"#服务层技术","children":[]},{"level":3,"title":"网络层技术","slug":"网络层技术","link":"#网络层技术","children":[]},{"level":3,"title":"用户层技术","slug":"用户层技术","link":"#用户层技术","children":[]},{"level":3,"title":"业务层技术","slug":"业务层技术","link":"#业务层技术","children":[]},{"level":3,"title":"平台技术","slug":"平台技术","link":"#平台技术","children":[]}]},{"level":2,"title":"19. 架构重构","slug":"_19-架构重构","link":"#_19-架构重构","children":[{"level":3,"title":"原因","slug":"原因","link":"#原因","children":[]},{"level":3,"title":"目标","slug":"目标","link":"#目标","children":[]},{"level":3,"title":"阶段","slug":"阶段","link":"#阶段","children":[]},{"level":3,"title":"流程","slug":"流程","link":"#流程","children":[]}]},{"level":2,"title":"20. 开源系统","slug":"_20-开源系统","link":"#_20-开源系统","children":[]}],"git":{"createdTime":1713090377000,"updatedTime":1713165929000,"contributors":[{"name":"张家豪","email":"961099916@qq.com","commits":1}]},"readingTime":{"minutes":30.15,"words":9045},"filePathRelative":"读书/《从零开始学架构：照着做，你也能成为架构师》.md","localizedDate":"2024年2月18日"}');export{c as comp,o as data};
