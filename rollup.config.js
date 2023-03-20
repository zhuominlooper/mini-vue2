import babel from 'rollup-plugin-babel'
import serve  from 'rollup-plugin-serve'

export default{
  input:'./src/index.js' ,//打包入口文件
  output:{
    file:'dist/vue.js',
    format:'umd', //在window上挂载Vue,
    name:'Vue', //全局名称，挂载window
    sourcemap:true,
  },
  plugins:[
    babel({
      exclude:'node_modules/**'
    }),
    serve({
      open:true,
      port:4000,//启动端口
      contentBase:'',//当前目类
      openPage:'/index.html' //启动的页面
    })
  ]
}