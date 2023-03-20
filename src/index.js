/**
 * mini-vue2源码编写
 */
import { initGlobApi } from './globalApi/index';
import { initMixin } from './init';
import { lifecycleMixin } from './vnode/lifecycle';
import { renderMixin } from './vnode/index';
import { stateMixin } from './initState';
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



export default Vue;
