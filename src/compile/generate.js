//拼接字符串

//处理attrs和style
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
function genProps(attrs) {
  let str = '';
  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i];
    if (attr.name === 'style') {
      let obj = {};
      attr.value.split(';').forEach((item) => {
        let [key, val] = item.split(':');
        obj[key] = val;
      });
      attr.value = obj;
    }
    str += `${attr.name}:${JSON.stringify(attr.value)},`;
  }
  return `{${str.slice(0, -1)}}`; //去除最后一个，
}
function getChildren(el) {
  let children = el.children;
  if (children) {
    return children.map((child) => gen(child)).join(',');
  }
}
function gen(node) {
  //文本(type:3) 元素(type:1)
  if (node.type === 1) {
    //元素
    return generate(node);
  } else {
    //纯文本，两种方式(xxx,{{xxx}})
    let text = node.text;
    if (!defaultTagRE.test(text)) {
      //不是插值
      return `_v(${JSON.stringify(text)})`;
    }
    //解析插值表达式
    let tokens = [];
    //debugger
   let lastIndex = defaultTagRE.lastIndex = 0;
    let match;
    while ((match = defaultTagRE.exec(text))) {
      let index = match.index;
      if (index > lastIndex) {
        tokens.push(JSON.stringify(text.slice(lastIndex, index)));
      }
      tokens.push(`_s(${match[1].trim()})`);
      lastIndex = index + match[0].length;
      if (lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)));
      }
    }
      return `_v(${tokens.join('+')})`;
  }

}
export function generate(el) {
  let children = getChildren(el);
  let code = `_c('${el.tag}',${el.attrs.length ? `${genProps(el.attrs)}` : `null`},${children ? `${children}` : 'null'})`;
  return code
}
