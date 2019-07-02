/**
 * 
 * 
 * onclick -> this.setState({visible:true}) -> update -> function (visible){
    if(visible == true){
      this.history.push('http://xxx.com/lib/123');
    }

    // params [dataSource,property:string[]] -> id

    dataSource -> property -> dataSource[property]
    ['name','age','xxx'].every(item =>{
      return dataSource[item];
    })

    return (
      <div />
    )
  }
 */


Function.prototype.uncurrying = function (){
  var _this = this;
  return function (){
    var obj = Array.prototype.shift.call(arguments);
    return _this.apply(obj,arguments);
  }
}

var push = Array.prototype.push.uncurrying();

var arr = {
  a: 1,
  b: 2,
}

console.log(push(arr,4),arr)
console.log(push(arr,5),arr)