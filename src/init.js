import { initState } from './initState';
import { callHook, mounetComponent } from './vnode/lifecycle';
import { compilToFunctions } from './compile/index';
import { mergeOptions } from './utils/index';
export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    let vm = this; //this.是vue实例
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
    let vm = this;
    el = document.querySelector(el);
    vm.$el = el; //挂载元素
    let options = vm.$options;
    //el tempalte render
    if (!options.render) {
      let template = options.template;
      if (!template && el) {
        //获取html
        el = el.outerHTML;
        let render = compilToFunctions(el); //将html变成ast语法树,最后将ast语法树转变成render函数
        options.render = render; //render函数挂载
      }
    }
    mounetComponent(vm, el);
  };
}
