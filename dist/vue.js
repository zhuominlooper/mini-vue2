(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  var HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestory', 'destroyed'];

  //策略模式
  var starts = {};
  starts.data = function (parentVal, childVal) {
    return childVal;
  };
  // starts.computed = function () {};
  // starts.watch = function () {};
  // starts.methods = function () {};

  HOOKS.forEach(function (hooks) {
    starts[hooks] = mergeHook;
  });
  function mergeHook(parentVal, childVal) {
    if (childVal) {
      if (parentVal) {
        return parentVal.concat(childVal);
      } else {
        return [childVal];
      }
    } else {
      return parentVal;
    }
  }
  function mergeOptions(parent, child) {
    var options = {};
    //有父亲，没有儿子
    for (var key in parent) {
      mergeField(key);
    }
    //有儿子没父亲
    for (var _key in child) {
      mergeField(_key);
    }
    function mergeField(key) {
      if (starts[key]) {
        options[key] = starts[key](parent[key], child[key]);
      } else {
        options[key] = child[key];
      }
    }
    return options;
  }

  function initGlobApi(Vue) {
    //mixin是对象
    Vue.options = {};
    Vue.Mixin = function (mixin) {
      //对象合并
      this.options = mergeOptions(this.options, mixin); //this是Vue
      console.log('this.optionsthis.options', this.options);
    };
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  //重新数组的方法

  // 1.获取原来的数组方法
  var oldArrayProtoMethods = Array.prototype;
  // 2.继承
  var ArrayMethods = Object.create(oldArrayProtoMethods); //create是继承当前值的原型，create(null)，去掉原型

  // 3.劫持
  var methods = ["push", "pop", "unshift", "shift", "splice"];
  methods.forEach(function (item) {
    ArrayMethods[item] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var reault = oldArrayProtoMethods[item].apply(this, args); //返回数据 this是当前劫持的数组实例
      var inserted;
      switch (item) {
        case "push":
        case "unshift":
          inserted = args;
          break;
        case "splice":
          inserted = args.splice(2);
          break;
      }
      var ob = this.__ob__;
      if (inserted) {
        ob.observerArray(inserted); //对添加的对象进行劫持
      }

      ob.dep.notify();
      return reault;
    };
  });

  //重写数组的方法
  // 通过函数劫持做了处理
  //采用切片思想

  var depId = 0;
  var Dep = /*#__PURE__*/function () {
    function Dep() {
      _classCallCheck(this, Dep);
      this.id = depId++;
      this.subs = [];
    }
    _createClass(Dep, [{
      key: "depend",
      value: function depend() {
        //watcher和dep双向记忆
        Dep.target.addDep(this);
      }
    }, {
      key: "addSub",
      value: function addSub(watcher) {
        this.subs.push(watcher);
      }
      //更新
    }, {
      key: "notify",
      value: function notify() {
        this.subs.forEach(function (watcher) {
          watcher.update();
        });
      }
    }]);
    return Dep;
  }();

  //添加watcher
  Dep.target = null;
  function pushTarget(watcher) {
    Dep.target = watcher;
  }
  function popTarget() {
    Dep.target = null;
  }

  function observer(data) {
    //不是对象或者是空，不进行劫持
    if (_typeof(data) !== 'object' || data === null) {
      return data;
    }
    return new Observer(data);
  }
  var Observer = /*#__PURE__*/function () {
    function Observer(value) {
      _classCallCheck(this, Observer);
      Object.defineProperty(value, '__ob__', {
        enumerable: false,
        configurable: false,
        //控制该属性不能改变
        value: this //拿到new Observer 实例，调用observerArray
      });

      this.dep = new Dep(); //所有对象都添加dep
      //观测数据是数组还是对象
      if (Array.isArray(value)) {
        value.__proto__ = ArrayMethods; //操作之后必定返回数组
        //如果是数组对象
        this.observerArray(value);
      } else {
        this.walk(value); //进行对象数据遍历
      }
    }
    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        var keys = Object.keys(data); //拿到所有的key
        for (var i = 0, length = keys.length; i < length; i++) {
          //对每个属性进行劫持
          var key = keys[i];
          var value = data[key];
          defineRecative(data, key, value);
        }
      }
      //劫持数组对象
    }, {
      key: "observerArray",
      value: function observerArray(value) {
        if (value) {
          for (var i = 0; i < value.length; i++) {
            observer(value[i]);
          }
        }
      }
    }]);
    return Observer;
  }(); //对对象中的属性进行劫持
  function defineRecative(data, key, value) {
    //深度代理，递归代理
    var childDep = observer(value);
    var dep = new Dep();
    Object.defineProperty(data, key, {
      get: function get() {
        if (Dep.target) {
          dep.depend(); //收集watcher
          if (childDep.dep) {
            childDep.dep.depend(); //对象收集
          }
        }

        return value;
      },
      set: function set(newValue) {
        if (newValue === value) {
          //数据相同不改变
          return;
        }
        observer(newValue); //新值是对象就进行劫持
        value = newValue;
        dep.notify(); //进行watcher更新
      }
    });
  }

  //对象进行劫持
  //Object.defineProperty只能一次对属性进行劫持，所有vue3使用proxy，懒劫持
  //递归遍历进行劫持，对新设置的值也进行劫持(只会对新的对象进行劫持)
  //递归劫持进行深度遍历

  var callback = [];
  var pengding = false;
  function flush() {
    callback.forEach(function (cb) {
      return cb();
    });
    pengding = false;
  }
  var timerFunc;
  if (Promise) {
    //判断浏览器是否支持promsie
    timerFunc = function timerFunc() {
      Promise.resolve().then(flush);
    };
  } else if (MutationObserver) {
    //h5的api,MutationObserver：异步方法，监控完毕dom变化之后再来异步更新
    var observe = new MutationObserver();
    var textNode = document.createTextNode(1); //创建文本
    observe.observe(textNode, {
      characterData: true
    }); //观测文本的内容
    timerFunc = function timerFunc() {
      textNode.textContent = 2;
    };
  } else if (setImmediate) {
    timerFunc = function timerFunc() {
      setImmediate(flush);
    };
  }
  function nextTick(cb) {
    //cb来自两部分，一个是用户的自定义cb，一个是dom批量更新的cb(更新多次，只调用一次)
    // console.log('cb', cb);
    callback.push(cb); //[cb1,cb2]
    if (!pengding) {
      pengding = true;
      timerFunc();
    }
  }

  //通过watcher类实现更新
  var watcherId = 0;
  var watcher = /*#__PURE__*/function () {
    function watcher(vm, updateComponent, cb, options) {
      _classCallCheck(this, watcher);
      this.vm = vm;
      this.exprOrfn = updateComponent;
      this.cb = cb;
      this.user = !!options.user;
      this.options = options;
      this.deps = [];
      this.depsId = new Set();
      this.id = watcherId++; //表示每个组件watcher不一样
      if (typeof updateComponent === 'function') {
        this.getter = updateComponent; //更新视图
      } else {
        //watch 字符串,有可能是xxx.xx.xx
        this.getter = function () {
          var path = this.exprOrfn.split('.');
          var obj = vm;
          for (var i = 0; i < path.length; i++) {
            obj = obj[path[i]];
          }
          return obj;
        };
      }
      //初次渲染
      this.value = this.get(); //保存watch第一次值
    }
    _createClass(watcher, [{
      key: "run",
      value: function run() {
        var value = this.get();
        var oldVal = this.value;
        this.value = value;
        //用户的watch
        if (this.user) {
          this.cb.call(this.vm, value, oldVal);
        }
      }
    }, {
      key: "get",
      value: function get() {
        pushTarget(this); //添加watcher给dep
        var value = this.getter(); //渲染页面
        popTarget(); //渲染完成，取消dep中的watcher
        return value;
      }
      //数据改变的时候更新
    }, {
      key: "update",
      value: function update() {
        //数据更新之后，不要每次调用get方法。
        queueWatcher(this);
      }
    }, {
      key: "addDep",
      value: function addDep(dep) {
        //去重
        var id = dep.id;
        if (!this.depsId.has(id)) {
          this.deps.push(dep);
          this.depsId.add(id);
          dep.addSub(this);
        }
      }
    }]);
    return watcher;
  }();
  var queue = []; //将需要批量更新的watcher存放到队列中
  var has = {};
  var pending = false;
  function flusWacter() {
    queue.forEach(function (item) {
      item.run();
    });
    queue = [];
    has = {};
    pending = false;
  }
  function queueWatcher(watcher) {
    //实现列队
    var id = watcher.id;
    //防抖,触发多次，只触发一次
    if (!has[id]) {
      //因为id都是同一个，所以只进去一次
      queue.push(watcher);
      has[id] = true;
      if (!pending) {
        nextTick(flusWacter); //nextTick：相当于定时器,异步处理
      }

      pending = true;
    }
  }

  //收集依赖：使用dep去手机依赖
  //dep:dep和data的属性--对应
  //watcher:watcher和dep多对多

  //nextTick

  function initState(vm) {
    var ops = vm.$options;
    // if (ops.props) {
    //   initProps();
    // }
    if (ops.data) {
      initData(vm);
    }
    if (ops.watch) {
      initWatch(vm);
    }

    // if (ops.computed) {
    //   initComputed();
    // }
    // if (ops.methods) {
    //   initMethods();
    // }
  }

  //处理watch
  function initWatch(vm) {
    var watch = vm.$options.watch;
    var _loop = function _loop(key) {
      var handler = watch[key];
      if (Array.isArray(handler)) {
        //数组
        handler.forEach(function (item) {
          createWatcher(vm, key, item);
        });
      } else {
        //对象，字符串，函数
        createWatcher(vm, key, handler);
      }
    };
    for (var key in watch) {
      _loop(key);
    }
  }
  //对data进行初始化
  function initData(vm) {
    var data = vm.$options.data; //可能是对象或者函数
    data = vm._data = typeof data === 'function' ? data.call(vm) : data; //这里this指向vue实例,所以需要call改变this指向, _data代理全部数据
    // 将data上的所有属性代理到实例上,以便直接this.xxx进行访问，并且是响应式的
    for (var key in data) {
      proxy(vm, '_data', key);
    }
    //对数据进行劫持
    observer(data);
  }
  function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[source][key];
      },
      set: function set(newValue) {
        vm[source][key] = newValue;
      }
    });
  }
  function stateMixin(vm) {
    vm.prototype.$nextTick = function (cb) {
      //cb回调函数
      return nextTick(cb);
    };
    //之前的watch步骤是做格式化统一数据结构
    vm.prototype.$watch = function (Vue, exprOrfn, handler) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      //实现watch，就是调用new Wacher实现渲染绑定
      new watcher(Vue, exprOrfn, handler, _objectSpread2(_objectSpread2({}, options), {}, {
        user: true
      }));
      if (options.immediate) {
        //立即执行
        handler.call(vm);
      }
    };
  }

  //watch四种使用方式：函数，对象，数组，字符串
  //最后是调用$watch

  function createWatcher(vm, exprOrfn, handler, options) {
    //处理handler
    if (_typeof(handler) === 'object') {
      options = handler;
      handler = handler.handler;
    }
    if (typeof handler === 'string') {
      handler = vm[handler];
    }
    return vm.$watch(vm, exprOrfn, handler, options);
  }

  function patch(oldVnode, vnode) {
    //1表示元素节点初始化的时候oldVnode是真实dom，会使用vode转成真实dom去替换oldVnode(<div id="app"></div>)
    if (oldVnode.nodeType === 1) {
      var el = createEl(vnode);
      //替换dom，获取父节点，在插入新元素，删除老元素
      var parentEL = oldVnode.parentNode; //获取父节点
      parentEL.insertBefore(el, oldVnode.nextsibling);
      parentEL.removeChild(oldVnode);
      return el;
    } else {
      // 1.标签不一样，直接替换
      if (oldVnode.tag !== vnode.tag) {
        oldVnode.el.parentNode.replaceChild(createEl(vnode), oldVnode.el);
      }

      // 2.标签一样 text 属性不一样
      if (!oldVnode.tag) {
        if (oldVnode.text !== vnode.text) {
          return oldVnode.el.textContent = vnode.text;
        }
      }
      // 2.1标签一样，替换属性
      vnode.el = oldVnode.el;
      var _el = vnode.el;
      updateProps(vnode, oldVnode.data || {});

      //3 diff比对子元素,三种情况
      var oldChildren = oldVnode.children || [];
      var newChildren = vnode.children || [];
      //新老都有
      if (oldChildren.length && newChildren.length) {
        updateChildren(oldChildren, newChildren, _el);
      } else if (oldChildren.length) {
        //老得有，新的没有
        _el.innerHTML = '';
      } else if (newChildren.length) {
        //老的没有，新的有,直接插入新的
        for (var i = 0; i < newChildren.length; i++) {
          var child = newChildren[i];
          //添加新的dom
          _el.appendChild(createEl(child));
        }
      }
    }
  }

  //添加属性
  function updateProps(vnode) {
    var oldProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var newProps = vnode.data || {};
    var el = vnode.el; //获取当前真实节点

    //老的属性有，新的没有，移除
    for (var key in oldProps) {
      if (!newProps[key]) {
        el.removeAttribute(key);
      }
    }
    //样式改变
    var newStyle = newProps.style || {};
    var oldStyle = oldProps.style || {};
    for (var _key in oldStyle) {
      if (!newStyle[_key]) {
        el.style = '';
      }
    }
    for (var _key2 in newProps) {
      if (_key2 === 'style') {
        //梳理样式
        for (var styleName in newProps.style) {
          el.style[styleName] = newProps.style[styleName];
        }
      } else if (_key2 === 'class') {
        el.className = newProps["class"];
      } else {
        el.setAttribute(_key2, newProps[_key2]);
      }
    }
  }

  //创建dom,同时dom也会挂载在vnode.el上
  function createEl(vnode) {
    //vnode是对象，{tag:text,data...}
    var tag = vnode.tag,
      children = vnode.children;
      vnode.key;
      vnode.data;
      var text = vnode.text;
    if (typeof tag === 'string') {
      //tag存在，是元素
      vnode.el = document.createElement(tag); //创建元素
      updateProps(vnode); //添加属性
      if (children.length) {
        children.forEach(function (child) {
          if (child) {
            vnode.el.appendChild(createEl(child));
          }
        });
      }
    } else {
      //文本的情况
      vnode.el = document.createTextNode(text);
    }
    return vnode.el;
  }

  //新老都有，双指针进行比较
  function updateChildren(oldChildren, newChildren, parent) {
    //创建双指针
    var oldStartIndex = 0; //老的开头索引
    var oldStartVnode = oldChildren[oldStartIndex]; //老的第一个元素
    var oldEndIndex = oldChildren.length - 1; //老的结束索引
    var oldEndVnode = oldChildren[oldEndIndex]; //老的结尾元素

    var newStartIndex = 0; //新的开头索引
    var newStartVnode = newChildren[newStartIndex]; //新的第一个元素
    var newEndIndex = newChildren.length - 1; //新的结束索引
    var newEndVnode = newChildren[newEndIndex]; //新的结尾元素
    //判断是否是同一个元素
    function isSomeVnode(old, newContent) {
      return old.tag === newContent.tag && old.key === newContent.key;
    }
    function makeIndexByKey(children) {
      var map = {};
      children.forEach(function (item, index) {
        if (item.key) {
          map[item.key] = index;
        }
      });
      return map;
    }
    var map = makeIndexByKey(oldChildren); //暴力对比的映射表
    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
      //头部比较,头部元素是不是同一个元素
      if (isSomeVnode(oldStartVnode, newStartVnode)) {
        //新前旧前
        //递归
        patch(oldStartVnode, newStartVnode);
        //移动指针
        oldStartVnode = oldChildren[++oldStartIndex];
        newStartVnode = newChildren[++newStartIndex];
      } else if (newEndVnode) {
        //从尾巴开始比较，新后旧后
        patch(oldEndVnode, newEndVnode);
        oldEndVnode = oldChildren[--oldEndIndex];
        newEndVnode = newChildren[--newEndIndex];
      } else if (isSomeVnode(oldStartVnode, newEndVnode)) {
        //旧前新后
        patch(oldStartVnode, newEndVnode);
        oldStartVnode = oldChildren[++oldStartIndex];
        newEndVnode = newChildren[--newEndIndex];
      } else if (isSomeVnode(oldEndVnode, newStartVnode)) {
        //旧后新前
        patch(oldEndVnode, newStartVnode);
        oldEndVnode = oldChildren[--oldEndIndex];
        newStartVnode = newChildren[++newStartIndex];
      } else {
        //暴力比对，新节点和纠结点没关系
        //从老的元素中寻找是否有有新的元素
        var moveIndex = map[newStartVnode.key];
        if (!moveIndex) {
          //没找到
          parent.insertBefore(createEl(newStartVnode), oldStartVnode.el); //直接添加
        } else {
          //找到了
          var moveVnode = oldChildren[moveIndex]; //获取到移动的元素
          oldChildren[moveIndex] = null; //防止数组塌陷
          parent.insertBefore(moveVnode.el, oldStartVnode.el); //移动
          patch(moveVnode, newEndVnode);
        }
        //做完操作新的元素指针位移
        newStartVnode = newChildren[newEndIndex++];
      }
    }

    //添加多余的儿子
    if (newStartIndex <= newEndIndex) {
      for (var i = newStartIndex; i <= newEndIndex; i++) {
        parent.appendChild(createEl(newChildren[i]));
      }
    }
    //将多余的元素去掉
    if (oldStartIndex <= oldEndIndex) {
      for (var _i = oldStartIndex; _i <= oldEndIndex; _i++) {
        var child = oldChildren[_i];
        if (!child) {
          parent.appendChild(child.el);
        }
      }
    }
  }

  function mounetComponent(vm, el) {
    callHook(vm, 'beforeMounted');
    var updataComponent = function updataComponent() {
      vm._update(vm._render()); //vm._render将render函数变成vnode  ,_update将vnode变成真实node
    };

    new watcher(vm, updataComponent, function () {
      callHook(vm, 'updated'); //数据更新完成
    }, true); //处理渲染
    callHook(vm, 'mounted');
  }
  function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
      //vnode变成真实dom
      var vm = this;
      //两个参数，原来的dom，vnode
      //需要区分是首次patch还是更新
      var prevVnode = vm._vnode; //如果首次，值为null
      debugger;
      if (!prevVnode) {
        vm.$el = patch(vm.$el, vnode);
        vm._vnode = vnode;
      } else {
        patch(vm._vnode, vnode);
      }
    };
  }

  //生命周期调用
  function callHook(vm, hook) {
    var handlers = vm.$options[hook];
    if (handlers) {
      for (var i = 0; i < handlers.length; i++) {
        handlers[i].call(this);
      }
    }
  }

  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; //属性匹配 xxx='xxx'
  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; //标签的名称(span,div...)
  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")"); //<span:xxx></span:xxx>
  var startTagOpen = new RegExp("^<".concat(qnameCapture)); //开头标签<span
  var startTagClose = /^\s*(\/?)>/;
  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>")); //结束标签

  function parseHTML(html) {
    var root; //根元素
    var createParent; //当前元素父亲
    var stack = []; //栈
    function createASTElement(tag, attrs) {
      return {
        tag: tag,
        attrs: attrs,
        children: [],
        type: 1,
        parent: null
      };
    }
    //解析html,解析一部分，删除一部分
    function start(startTag, attrs) {
      //开始标签
      var element = createASTElement(startTag, attrs);
      if (!root) {
        root = element;
      }
      createParent = element;
      stack.push(element);
    }
    function charts(text) {
      //文本
      text = text.replace(/s/g, '');
      if (text) {
        createParent.children.push({
          type: 3,
          text: text
        });
      }
    }
    function end(endTag) {
      //结束标签
      var element = stack.pop();
      createParent = stack[stack.length - 1];
      if (createParent) {
        element.parent = createParent.tag;
        createParent.children.push(element);
      }
    }

    //html为空结束
    while (html) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        //说明是个标签
        //开始标签
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs);
          continue;
        }
        //结束标签
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          advance(endTagMatch[0].length);
          end(endTagMatch[1]);
          continue;
        }
      }
      //文本
      var text = void 0;
      if (textEnd > 0) {
        text = html.substring(0, textEnd);
      }
      if (text) {
        advance(text.length);
        charts(text);
      }
    }

    //解析开始标签
    function parseStartTag() {
      var start = html.match(startTagOpen); //0: "<div"1: "div"
      if (!start) {
        //不是开始标签，返回
        return;
      }
      var match = {
        tagName: start[1],
        attrs: []
      };
      //删除已经匹配的节点
      advance(start[0].length);
      //属性处理，多个属性
      var attr;
      var end;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5]
        });
        advance(attr[0].length);
      }
      if (end) {
        advance(end[0].length);
        return match;
      }
    }
    function advance(n) {
      html = html.substring(n);
    }
    return root;
  }

  //拼接字符串

  //处理attrs和style
  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
  function genProps(attrs) {
    var str = '';
    var _loop = function _loop() {
      var attr = attrs[i];
      if (attr.name === 'style') {
        var obj = {};
        attr.value.split(';').forEach(function (item) {
          var _item$split = item.split(':'),
            _item$split2 = _slicedToArray(_item$split, 2),
            key = _item$split2[0],
            val = _item$split2[1];
          obj[key] = val;
        });
        attr.value = obj;
      }
      str += "".concat(attr.name, ":").concat(JSON.stringify(attr.value), ",");
    };
    for (var i = 0; i < attrs.length; i++) {
      _loop();
    }
    return "{".concat(str.slice(0, -1), "}"); //去除最后一个，
  }

  function getChildren(el) {
    var children = el.children;
    if (children) {
      return children.map(function (child) {
        return gen(child);
      }).join(',');
    }
  }
  function gen(node) {
    //文本(type:3) 元素(type:1)
    if (node.type === 1) {
      //元素
      return generate(node);
    } else {
      //纯文本，两种方式(xxx,{{xxx}})
      var text = node.text;
      if (!defaultTagRE.test(text)) {
        //不是插值
        return "_v(".concat(JSON.stringify(text), ")");
      }
      //解析插值表达式
      var tokens = [];
      //debugger
      var lastIndex = defaultTagRE.lastIndex = 0;
      var match;
      while (match = defaultTagRE.exec(text)) {
        var index = match.index;
        if (index > lastIndex) {
          tokens.push(JSON.stringify(text.slice(lastIndex, index)));
        }
        tokens.push("_s(".concat(match[1].trim(), ")"));
        lastIndex = index + match[0].length;
        if (lastIndex < text.length) {
          tokens.push(JSON.stringify(text.slice(lastIndex)));
        }
      }
      return "_v(".concat(tokens.join('+'), ")");
    }
  }
  function generate(el) {
    var children = getChildren(el);
    var code = "_c('".concat(el.tag, "',").concat(el.attrs.length ? "".concat(genProps(el.attrs)) : "null", ",").concat(children ? "".concat(children) : 'null', ")");
    return code;
  }

  //将html转成ast语法树
  // {
  //   attrs:[],//属性
  //   children:[], //子元素
  //   parent:null,
  //   tag:''//标签
  //   type: 元素类型
  // }
  function compilToFunctions(el) {
    var ast = parseHTML(el);
    //将ast语法树变成render函数，现将语法树变成字符串，在变成render函数
    var code = generate(ast); //code是字符串
    //将render字符串变成函数
    var render = new Function("with(this){return ".concat(code, "}"));
    return render; //返回render函数
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this; //this.是vue实例
      vm.$options = options;
      vm.$options = mergeOptions(Vue.options, options); // 合并，会把当前的options和mainx的合并，组成新的options
      callHook(vm, 'beforeCreate');
      //初始化状态
      initState(vm);
      callHook(vm, 'created');
      //渲染模板
      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };
    Vue.prototype.$mount = function (el) {
      var vm = this;
      el = document.querySelector(el);
      vm.$el = el; //挂载元素
      var options = vm.$options;
      //el tempalte render
      if (!options.render) {
        var template = options.template;
        if (!template && el) {
          //获取html
          el = el.outerHTML;
          var render = compilToFunctions(el); //将html变成ast语法树,最后将ast语法树转变成render函数
          options.render = render; //render函数挂载
        }
      }

      mounetComponent(vm);
    };
  }

  function renderMixin(Vue) {
    Vue.prototype._c = function () {
      //标签
      //创建标签
      return createElement.apply(void 0, arguments);
    };
    Vue.prototype._v = function (text) {
      //文本
      return createText(text);
    };
    Vue.prototype._s = function (val) {
      //变量
      return val === null ? '' : _typeof(val) === 'object' ? JSON.stringify(val) : val;
    };
    Vue.prototype._render = function () {
      //将render函数变成vnode
      var vm = this;
      var render = vm.$options.render;
      var vnode = render.call(this);
      return vnode;
    };
  }
  function createElement(tag) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }
    return vnode(tag, data, data === null || data === void 0 ? void 0 : data.key, children);
  }
  //创建虚拟dom
  function vnode(tag, data, key, children, text) {
    return {
      tag: tag,
      data: data,
      key: key,
      children: children,
      text: text
    };
  }
  //创建文本
  function createText(text) {
    return vnode(undefined, undefined, undefined, undefined, text);
  }

  //render函数样式
  //renderh函数里的值也是嵌套的
  // (function anonymous() {
  //   with (this) {
  //     return _c('div', { style: { color: 'red', 'font-size': '12px' }, id: 'app' }, _v('hello ' + _s(name + '333') + ' 111 '), _c('p', null, _v('222')));
  //   }
  // });

  /**
   * mini-vue2源码编写
   */
  function Vue(options) {
    //初始化
    this._init(options);
  }
  initMixin(Vue);
  lifecycleMixin(Vue); //添加生命周期
  renderMixin(Vue); //添加_render
  stateMixin(Vue); //给实例添加$nextTick
  //全局方法
  initGlobApi(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
