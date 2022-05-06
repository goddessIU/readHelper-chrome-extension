# 项目过程记录
因为还想拿这个项目面试，所以记录一下过程中的重难点

1. 拖拽算法
点击的时候，进行Mousedown事件，计算出一些预先需要求出的值。然后再Mousedown事件中去监听mouseup和mousemove，mouseup的时候，取消掉mousemove和mouseup即可
因为要封装，所以取出相关监听的回调函数到utils中。但是，那些距离值无法传入。因为监听的回调只接受event一个参数。所以选用事件处理对象。然后边界情况会卡bug，用一个ref变量搭配watch， 如果到达边界，改变ref值，watch监听，模拟mouseup。
具体见MouseMoveClass和Panel.vue

2. content scripts处理
开始用的是那种executeScripting的方式，发现不适合对于vue这些框架。
于是改用在manifest中配置main文件。main中创建vue实例，从而导入vue文件

3. 使用iframe避免css被影响，以及跨域处理