let depId = 0;
export class Dep{
  constructor(){
     this.id = depId++;
    this.subs=[]
  }
  depend(){
    //watcher和dep双向记忆
    Dep.target.addDep(this)
  }
  addSub(watcher){
       this.subs.push(watcher);
  }
  //更新
  notify(){
    this.subs.forEach(watcher=>{
      watcher.update()
    })
  }
}

//添加watcher
Dep.target=null
export function pushTarget(watcher){
  Dep.target=watcher
}


export function popTarget(){
  Dep.target = null;
}