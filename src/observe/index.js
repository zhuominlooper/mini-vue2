import { ArrayMethods } from './arr';
import { Dep } from './dep';
export function observer(data) {
  //不是对象或者是空，不进行劫持
  if (typeof data !== 'object' || data === null) {
    return data;
  }
  return new Observer(data);
}

class Observer {
  constructor(value) {
    Object.defineProperty(value, '__ob__', {
      enumerable: false,
      configurable: false, //控制该属性不能改变
      value: this, //拿到new Observer 实例，调用observerArray
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

  walk(data) {
    let keys = Object.keys(data); //拿到所有的key
    for (let i = 0, length = keys.length; i < length; i++) {
      //对每个属性进行劫持
      let key = keys[i];
      let value = data[key];
      defineRecative(data, key, value);
    }
  }
  //劫持数组对象
  observerArray(value) {
    if (value) {
      for (let i = 0; i < value.length; i++) {
        observer(value[i]);
      }
    }
  }
}

//对对象中的属性进行劫持
function defineRecative(data, key, value) {
  //深度代理，递归代理
  let childDep = observer(value);
  let dep = new Dep();
  Object.defineProperty(data, key, {
    get() {
      if (Dep.target) {
        dep.depend(); //收集watcher
        if (childDep.dep) {
          childDep.dep.depend(); //对象收集
        }
      }
      return value;
    },
    set(newValue) {
      if (newValue === value) {
        //数据相同不改变
        return;
      }
      observer(newValue); //新值是对象就进行劫持
      value = newValue;
      dep.notify(); //进行watcher更新
    },
  });
}

//对象进行劫持
//Object.defineProperty只能一次对属性进行劫持，所有vue3使用proxy，懒劫持
//递归遍历进行劫持，对新设置的值也进行劫持(只会对新的对象进行劫持)
//递归劫持进行深度遍历
