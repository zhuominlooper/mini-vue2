let callback = [];
let pengding = false;
function flush() {
  callback.forEach((cb) => cb());
  pengding = false;
}
let timerFunc;
if (Promise) {
  //判断浏览器是否支持promsie
  timerFunc = () => {
     Promise.resolve().then(flush);
  };
} else if (MutationObserver) {
  //h5的api,MutationObserver：异步方法，监控完毕dom变化之后再来异步更新
  let observe = new MutationObserver();
  let textNode = document.createTextNode(1); //创建文本
  observe.observe(textNode, { characterData: true }); //观测文本的内容
  timerFunc = () => {
    textNode.textContent = 2;
  };
} else if (setImmediate) {
  timerFunc = () => {
    setImmediate(flush);
  };
}
export function nextTick(cb) {
  //cb来自两部分，一个是用户的自定义cb，一个是dom批量更新的cb(更新多次，只调用一次)
  // console.log('cb', cb);
  callback.push(cb); //[cb1,cb2]
  if (!pengding) {
    pengding = true;
     timerFunc();
  }
}
