# HashTable

[HashTable 和 HashMap 的区别详解](https://www.cnblogs.com/williamjie/p/9099141.html)
HashMap 和 HashTable 相同
都存储 key、value
不同
HashMap 可以 key 或者 vaule 为 null，HashTable 不可以
hashMap 线程不安全，所以速度快，HashTable 线程安装，速度慢

HashMap 和 ConcurrentHashMap
HashMap 线程不安全
ConcurrentHashMap 线程安全，本质为 HashTable 组成的
