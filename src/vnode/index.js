export function renderMixin(Vue) {
  Vue.prototype._c = function () {
    //标签
    //创建标签
    return createElement(...arguments);
  };
  Vue.prototype._v = function (text) {
    //文本
    return createText(text);
  };
  Vue.prototype._s = function (val) {
    //变量
    return val === null ? '' : typeof val === 'object' ? JSON.stringify(val) : val;
  };

  Vue.prototype._render = function () {
    //将render函数变成vnode
    let vm = this;
    let render = vm.$options.render;
    let vnode = render.call(this);
     return vnode

  };
}

function createElement( tag, data = {},...children ) {
  return vnode(tag, data, data?.key, children);
}
//创建虚拟dom
function vnode(tag, data, key, children, text) {
  return {
    tag,
    data,
    key,
    children,
    text,
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
