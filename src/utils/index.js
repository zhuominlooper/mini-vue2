export const HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestory', 'destroyed'];

//策略模式
let starts={}
starts.data=function(parentVal,childVal){
  return childVal
}
// starts.computed = function () {};
// starts.watch = function () {};
// starts.methods = function () {};

HOOKS.forEach(hooks=>{
  starts[hooks] = mergeHook;
})

function mergeHook(parentVal,childVal){
  if(childVal){
    if(parentVal){
      return parentVal.concat(childVal)
    }else{
      return [childVal]
    }
  }else{
    return parentVal
  }
}
export function mergeOptions(parent, child) {
  const options = {};
  //有父亲，没有儿子
  for (let key in parent) {
    mergeField(key);
  }
  //有儿子没父亲
  for (let key in child) {
    mergeField(key);
  }
  function mergeField(key) {
    if (starts[key]) {
      options[key] = starts[key](parent[key], child[key]);
    } else {
      options[key] = child[key];
    }
  }

  return options;
}
