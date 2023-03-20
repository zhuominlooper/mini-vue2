export function patch(oldVnode, vnode) {
  //1表示元素节点初始化的时候oldVnode是真实dom，会使用vode转成真实dom去替换oldVnode(<div id="app"></div>)
  if (oldVnode.nodeType === 1) {
    let el = createEl(vnode);
    //替换dom，获取父节点，在插入新元素，删除老元素
    let parentEL = oldVnode.parentNode; //获取父节点
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
        return (oldVnode.el.textContent = vnode.text);
      }
    }
    // 2.1标签一样，替换属性
    vnode.el = oldVnode.el;
    let el = vnode.el;
    updateProps(vnode, oldVnode.data || {});

    //3 diff比对子元素,三种情况
    let oldChildren = oldVnode.children || [];
    let newChildren = vnode.children || [];
    //新老都有
    if (oldChildren.length && newChildren.length) {
      updateChildren(oldChildren, newChildren, el);
    } else if (oldChildren.length) {
      //老得有，新的没有
      el.innerHTML = '';
    } else if (newChildren.length) {
      //老的没有，新的有,直接插入新的
      for (let i = 0; i < newChildren.length; i++) {
        let child = newChildren[i];
        //添加新的dom
        el.appendChild(createEl(child));
      }
    }
  }
}

//添加属性
function updateProps(vnode, oldProps = {}) {
  let newProps = vnode.data || {};
  let el = vnode.el; //获取当前真实节点

  //老的属性有，新的没有，移除
  for (let key in oldProps) {
    if (!newProps[key]) {
      el.removeAttribute(key);
    }
  }
  //样式改变
  let newStyle = newProps.style || {};
  let oldStyle = oldProps.style || {};
  for (let key in oldStyle) {
    if (!newStyle[key]) {
      el.style = '';
    }
  }

  for (let key in newProps) {
    if (key === 'style') {
      //梳理样式
      for (let styleName in newProps.style) {
        el.style[styleName] = newProps.style[styleName];
      }
    } else if (key === 'class') {
      el.className = newProps.class;
    } else {
      el.setAttribute(key, newProps[key]);
    }
  }
}

//创建dom,同时dom也会挂载在vnode.el上
export function createEl(vnode) {
  //vnode是对象，{tag:text,data...}
  let { tag, children, key, data, text } = vnode;
  if (typeof tag === 'string') {
    //tag存在，是元素
    vnode.el = document.createElement(tag); //创建元素
    updateProps(vnode); //添加属性
    if (children.length) {
      children.forEach((child) => {
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
  let oldStartIndex = 0; //老的开头索引
  let oldStartVnode = oldChildren[oldStartIndex]; //老的第一个元素
  let oldEndIndex = oldChildren.length - 1; //老的结束索引
  let oldEndVnode = oldChildren[oldEndIndex]; //老的结尾元素

  let newStartIndex = 0; //新的开头索引
  let newStartVnode = newChildren[newStartIndex]; //新的第一个元素
  let newEndIndex = newChildren.length - 1; //新的结束索引
  let newEndVnode = newChildren[newEndIndex]; //新的结尾元素
  //判断是否是同一个元素
  function isSomeVnode(old, newContent) {
    return old.tag === newContent.tag && old.key === newContent.key;
  }
  function makeIndexByKey(children) {
    let map = {
      
    };
    children.forEach((item,index)=>{
      if(item.key){
        map[item.key]=index
      }
    })
    return map
  }
  let map=makeIndexByKey(oldChildren) //暴力对比的映射表
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    //头部比较,头部元素是不是同一个元素
    if (isSomeVnode(oldStartVnode, newStartVnode)) {
      //新前旧前
      //递归
      patch(oldStartVnode, newStartVnode);
      //移动指针
      oldStartVnode = oldChildren[++oldStartIndex];
      newStartVnode = newChildren[++newStartIndex];
    } else if ((oldEndVnode, newEndVnode)) {
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
      let moveIndex=map[newStartVnode.key]
      if(!moveIndex){//没找到
        parent.insertBefore(createEl(newStartVnode),oldStartVnode.el) //直接添加
      }else{//找到了
        let moveVnode=oldChildren[moveIndex]//获取到移动的元素
        oldChildren[moveIndex]=null//防止数组塌陷
        parent.insertBefore(moveVnode.el, oldStartVnode.el);//移动
        patch(moveVnode,newEndVnode)
      } 
      //做完操作新的元素指针位移
      newStartVnode=newChildren[newEndIndex++]

    }


  }

  //添加多余的儿子
  if (newStartIndex <= newEndIndex) {
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      parent.appendChild(createEl(newChildren[i]));
    }
  }
  //将多余的元素去掉
    if (oldStartIndex <= oldEndIndex) {
      for (let i = oldStartIndex; i <= oldEndIndex; i++) {
        let child=oldChildren[i]
        if(!child){
         parent.appendChild(child.el);
        }
       
      }
    }
}
