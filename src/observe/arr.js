//重新数组的方法

// 1.获取原来的数组方法
let oldArrayProtoMethods = Array.prototype;
// 2.继承
export const ArrayMethods = Object.create(oldArrayProtoMethods); //create是继承当前值的原型，create(null)，去掉原型

// 3.劫持
let methods = ["push", "pop", "unshift", "shift", "splice"];

methods.forEach((item) => {
  ArrayMethods[item] = function (...args) {
    let reault = oldArrayProtoMethods[item].apply(this, args); //返回数据 this是当前劫持的数组实例
    let inserted;
    switch (item) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.splice(2);
         break;
    }
    let ob=this.__ob__
    if (inserted){
      ob.observerArray(inserted);//对添加的对象进行劫持
    } 
     ob.dep.notify()
    return reault;
  };
});

//重写数组的方法
// 通过函数劫持做了处理
//采用切片思想
