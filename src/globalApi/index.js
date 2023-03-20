import { mergeOptions } from '../utils/index';
export function initGlobApi(Vue){
  //mixin是对象
  Vue.options={}
  Vue.Mixin = function (mixin) {
    //对象合并
  this.options = mergeOptions(this.options, mixin); //this是Vue
   console.log('this.optionsthis.options', this.options);
  };
}