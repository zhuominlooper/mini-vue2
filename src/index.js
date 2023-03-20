/**
 * mini-vue2源码编写
 */
import { initGlobApi } from './globalApi/index';
import { initMixin } from './init';
import { lifecycleMixin } from './vnode/lifecycle';
import { renderMixin } from './vnode/index';
import { stateMixin } from './initState';
import { compilToFunctions } from './compile/index';
import { createEl, patch } from './vnode/patch';
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

// let vm1 = new Vue({ data: { name: 'looper' } });
// let render1 = compilToFunctions(`<ul><li>1</li><li>2</li><li>3</li></ul>`);
// let vnode1 = render1.call(vm1);
// document.body.appendChild(createEl(vnode1));

// //数据更新
// let vm2 = new Vue({ data: { name: 'zhuo' } });
// let render2 = compilToFunctions(`<ul><li>41</li><li>53</li><li>14</li><`);
// let vnode2 = render2.call(vm2);
// patch(vnode1, vnode2);


export default Vue;
