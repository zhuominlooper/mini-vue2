import { patch } from './patch';
import { watcher } from '../observe/watcher';
export function mounetComponent(vm, el) {
  callHook(vm, 'beforeMounted');
  let updataComponent = () => {
    vm._update(vm._render()); //vm._render将render函数变成vnode  ,_update将vnode变成真实node
  };
  new watcher(
    vm,
    updataComponent,
    () => {
      callHook(vm, 'updated'); //数据更新完成
    },
    true
  ); //处理渲染
  callHook(vm, 'mounted');
}

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    //vnode变成真实dom
    let vm = this;
    //两个参数，原来的dom，vnode
    //需要区分是首次patch还是更新
    let prevVnode = vm._vnode; //如果首次，值为null
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
export function callHook(vm, hook) {
  const handlers = vm.$options[hook];
  if (handlers) {
    for (let i = 0; i < handlers.length; i++) {
      handlers[i].call(this);
    }
  }
}
