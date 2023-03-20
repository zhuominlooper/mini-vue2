import {parseHTML} from './parseAst'
import {generate} from './generate'
//将html转成ast语法树
// {
//   attrs:[],//属性
//   children:[], //子元素
//   parent:null,
//   tag:''//标签
//   type: 元素类型
// }
export function compilToFunctions(el) {
  let ast = parseHTML(el);
  //将ast语法树变成render函数，现将语法树变成字符串，在变成render函数
   let code=generate(ast) //code是字符串
   //将render字符串变成函数
   let render=new Function(`with(this){return ${code}}`)
   return render//返回render函数
}

