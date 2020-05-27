预加载的瀑布流代码

第三次修改：
初始化的过程中不添加滚动事件，而是在index.js中添加window.onscroll=function(){ ....  oo.scrollLoad(数据)}事件，这样可以保证获取数据的不同
