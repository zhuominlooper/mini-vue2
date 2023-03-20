import { pushTarget, popTarget } from './dep';
import { nextTick } from '../utils/nextTick';
//通过watcher类实现更新
let watcherId = 0;
export class watcher {
  constructor(vm, updateComponent, cb, options) {
    this.vm = vm;
    this.exprOrfn = updateComponent;
    this.cb = cb;
    this.user=!!options.user
    this.options = options;
    this.deps = [];
    this.depsId = new Set();
    this.id = watcherId++; //表示每个组件watcher不一样
    if (typeof updateComponent === 'function') {
      this.getter = updateComponent; //更新视图
    } else {
      //watch 字符串,有可能是xxx.xx.xx
      this.getter = function () {
        let path = this.exprOrfn.split('.');
        let obj = vm;
        for (let i = 0; i < path.length; i++) {
          obj = obj[path[i]];
        }
        return obj;
      };
    }
    //初次渲染
   this.value = this.get(); //保存watch第一次值
  }
  run() {
    let value=this.get()
    let oldVal=this.value
    this.value=value
    //用户的watch
    if(this.user){
        this.cb.call(this.vm,value,oldVal)
    }
  }
  get() {
    pushTarget(this); //添加watcher给dep
    const value= this.getter(); //渲染页面
    popTarget(); //渲染完成，取消dep中的watcher
    return value
  }
  //数据改变的时候更新
  update() {
    //数据更新之后，不要每次调用get方法。
    queueWatcher(this);
  }
  addDep(dep) {
    //去重
    let id = dep.id;
    if (!this.depsId.has(id)) {
      this.deps.push(dep);
      this.depsId.add(id);
      dep.addSub(this);
    }
  }
}
let queue = []; //将需要批量更新的watcher存放到队列中
let has = {};
let pending = false;
function flusWacter() {
  queue.forEach((item) => {
    item.run();
  });
  queue = [];
  has = {};
  pending = false;
}
function queueWatcher(watcher) {
  //实现列队
  let id = watcher.id;
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
