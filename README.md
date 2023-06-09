# mini-vue2
## Vue 2.x 的源码实现非常复杂，涉及到大量的数据响应式、虚拟 DOM、组件化、指令等概念。以下是 Vue 2.x 源码的大致实现步骤：

入口文件：Vue.js  
在该文件中，主要做了以下事情：  
导入 Vue 构造函数，定义 Vue 的版本号  
导入一些工具函数，如 isObject、def、cached 等  
定义了 Vue.prototype.init 方法，该方法用来初始化 Vue 实例  
Vue.prototype.init  
该方法主要用于初始化 Vue 实例，包括以下步骤：  
合并配置选项（包括用户传入的选项和系统默认选项）  
初始化生命周期钩子函数  
初始化事件中心  
初始化渲染函数（如果存在）  
初始化数据响应式系统  
初始化插件  
调用 beforeCreate 钩子函数  
初始化注入  
初始化状态（包括 props、methods、data、computed、watch 等）  
初始化 provide/inject  
调用 created 钩子函数  
数据响应式系统：Observer、Dep、Watcher  
数据响应式系统是 Vue 的核心，该系统主要包括三个类：  
Observer：用来观测数据对象，当数据发生变化时，会通知依赖该数据的 Watcher 实例  
Dep：依赖收集器，用来收集依赖该数据的 Watcher 实例  
Watcher：观察者，用来监听数据变化并执行回调函数  
虚拟 DOM：VNode、createElement、patch  
虚拟 DOM 是 Vue 的另一个核心，主要包括以下内容：  
VNode：虚拟节点，用来描述 DOM 树上的一个节点  
createElement：用来创建 VNode 的函数，该函数会根据传入的参数创建一个 VNode 实例  
patch：用来比较新旧 VNode 的差异，并将差异应用到真实的 DOM 树上  
模板编译：compileToFunctions  
Vue 2.x 使用模板来描述 UI，该模板需要被编译成渲染函数。Vue 2.x 的模板编译器使用了类似于正则表达式的算法，将模板解析成 AST（抽象语法树），然后再将 AST 转换为渲染函数。  
组件化：Vue.component、Vue.extend  
Vue 2.x 的组件化机制非常强大，它允许我们将 UI 拆分成多个组件，并且每个组件都可以拥有自己的状态和行为。Vue 2.x 的组件化机制主要包括以下内容：  
Vue.component：用来注册全局组件  
Vue.extend：用来创建一个组件构造函数  
指令：v-model、v-show 等

## 整体实现思路
1. new Vue绑定el标签模板  
2. 判断是否有template,如果有，就使用template作为模板  
3. 初始化数据，进行数据的依赖监听，递归监听
4. 初始化模板，先把模板编译成ast语法树，再把语法树转换成render函数，在转换成虚拟dom(vnode)，进行初次渲染
5. 初次渲染收集dep和watcher，dep和watcher是多对多的关系，dep是数据收集，watcher是绑定模板更新，这就是vue的数据响应实现
6. 在数据更新时候，触发数据监听，触发watcher对模板进行更新，此时开始diff算法
7. vue的diff算法是借鉴了mustance的语法，进行dom的最小量更新，采用新旧dom4个指针进行处理如下：
      * 新前旧前
      * 新后旧后
      * 旧前新后
      * 旧后新前
      * 暴力对比
8. key的作用在进行暴力对比的时候优先查看是否有原来的元素，如果有进行位移，如果没有key，则进行重新添加创建dom，key不能为index      
