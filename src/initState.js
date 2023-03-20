import { observer } from './observe/index';
import { nextTick } from './utils/nextTick';
import { watcher as Watcher } from './observe/watcher';

export function initState(vm) {
  let ops = vm.$options;
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
  let watch = vm.$options.watch;
  for (let key in watch) {
    let handler = watch[key];
    if (Array.isArray(handler)) {
      //数组
      handler.forEach((item) => {
        createWatcher(vm, key, item);
      });
    } else {
      //对象，字符串，函数
      createWatcher(vm, key, handler);
    }
  }
}
//对data进行初始化
function initData(vm) {
  let data = vm.$options.data; //可能是对象或者函数
  data = vm._data = typeof data === 'function' ? data.call(vm) : data; //这里this指向vue实例,所以需要call改变this指向, _data代理全部数据
  // 将data上的所有属性代理到实例上,以便直接this.xxx进行访问，并且是响应式的
  for (let key in data) {
    proxy(vm, '_data', key);
  }
  //对数据进行劫持
  observer(data);
}

function proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key];
    },
    set(newValue) {
      vm[source][key] = newValue;
    },
  });
}

export function stateMixin(vm) {
  vm.prototype.$nextTick = function (cb) {
    //cb回调函数
    return nextTick(cb);
  };
  //之前的watch步骤是做格式化统一数据结构
  vm.prototype.$watch = function (Vue,exprOrfn, handler, options={}) {
    //实现watch，就是调用new Wacher实现渲染绑定
     let watcher = new Watcher(Vue, exprOrfn, handler, {...options,user:true});
     if(options.immediate){//立即执行
      handler.call(vm)
     }
  };
}

//watch四种使用方式：函数，对象，数组，字符串
//最后是调用$watch

function createWatcher(vm, exprOrfn, handler, options) {
  //处理handler
  if (typeof handler === 'object') {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }

  return vm.$watch(vm,exprOrfn, handler, options);
}
