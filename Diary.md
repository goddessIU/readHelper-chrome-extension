# 项目过程记录
因为还想拿这个项目面试，所以记录一下过程中的重难点

1. 拖拽算法
点击的时候，进行Mousedown事件，计算出一些预先需要求出的值。然后再Mousedown事件中去监听mouseup和mousemove，mouseup的时候，取消掉mousemove和mouseup即可
因为要封装，所以取出相关监听的回调函数到utils中。但是，那些距离值无法传入。因为监听的回调只接受event一个参数。所以选用事件处理对象。然后边界情况会卡bug，用一个ref变量搭配watch， 如果到达边界，改变ref值，watch监听，模拟mouseup。
具体见MouseMoveClass和Panel.vue

2. content scripts处理
开始用的是那种executeScripting的方式，发现不适合对于vue这些框架。
于是改用在manifest中配置main文件。main中创建vue实例，从而导入vue文件

3. 针对css污染
iframe
加id
shadow
的选型

4. html语义化
https://www.semrush.com/blog/semantic-html5-guide/
使用了语义化，应用article aside之类

5. 通信功能
实现了popup向panel发送信息的功能



6. 未来计划
提供翻译
提供搜索引擎连接，以及简易搜索
css污染
文档发布
国际化
ts重构

7. 搜索
如何实现api
似乎有的付费，也不像想象中那么简单
使用了百度翻译，以及如何处理appid 和密钥

8. 英语的提升

9. 手改源码

