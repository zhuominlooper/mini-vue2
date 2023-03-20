const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; //属性匹配 xxx='xxx'
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; //标签的名称(span,div...)
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; //<span:xxx></span:xxx>
const startTagOpen = new RegExp(`^<${qnameCapture}`); //开头标签<span
const startTagClose = /^\s*(\/?)>/;
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); //结束标签



export function  parseHTML(html) {
  let root; //根元素
  let createParent; //当前元素父亲
  let stack = []; //栈
  function createASTElement(tag, attrs) {
    return {
      tag,
      attrs,
      children: [],
      type: 1,
      parent: null,
    };
  }
  //解析html,解析一部分，删除一部分
  function start(startTag, attrs) {
    //开始标签
    let element = createASTElement(startTag, attrs);
    if (!root) {
      root = element;
    }
    createParent = element;
    stack.push(element);
  }
  function charts(text) {
    //文本
    text = text.replace(/s/g, '');
    if (text) {
      createParent.children.push({
        type: 3,
        text,
      });
    }
  }
  function end(endTag) {
    //结束标签
    let element = stack.pop();
    createParent = stack[stack.length - 1];
    if (createParent) {
      element.parent = createParent.tag;
      createParent.children.push(element);
    }
  }

  //html为空结束
  while (html) {
    let textEnd = html.indexOf('<');
    if (textEnd === 0) {
      //说明是个标签
      //开始标签
      const startTagMatch = parseStartTag();
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs);
        continue;
      }
      //结束标签
      let endTagMatch = html.match(endTag);
      if (endTagMatch) {
        advance(endTagMatch[0].length);
        end(endTagMatch[1]);
        continue;
      }
    }
    //文本
    let text;
    if (textEnd > 0) {
      text = html.substring(0, textEnd);
    }
    if (text) {
      advance(text.length);
      charts(text);
    }
  }

  //解析开始标签
  function parseStartTag() {
    const start = html.match(startTagOpen); //0: "<div"1: "div"
    if (!start) {
      //不是开始标签，返回
      return;
    }
    let match = {
      tagName: start[1],
      attrs: [],
    };
    //删除已经匹配的节点
    advance(start[0].length);
    //属性处理，多个属性
    let attr;
    let end;
    while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
      match.attrs.push({ name: attr[1], value: attr[3] || attr[4] || attr[5] });
      advance(attr[0].length);
    }
    if (end) {
      advance(end[0].length);
      return match;
    }
  }
  function advance(n) {
    html = html.substring(n);
  }
  return root;
}
