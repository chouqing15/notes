## this、call、apply
#### this
> `this`指向, `this`是根据(函数调用方)执行环境动态绑定,并非函数声明的环境
#### this指向:
- 作为普通函数调用
- 作为构造函数调用
- 通过call、和apply调用
- 作为对象的方法调用(Function.prototype[call|apply])  

#### call、apply
> 用法相同,只是传参不同,`apply`接受一个数组,`call`接受固定数量参数  

`call(target,params) | apply(target,params)` 第一次参数表示函数内部this对象的指向,不需要改变传入null(null可以代替某个具体的对象)

#### bind
<img src="./images/1561792013989.jpg" />
> `bind`用来包装一个函数,改变其`this`指向,返回一个新函数, 并且会记住你传入的参数,直到函数执行

## 闭包和高阶函数
#### 闭包
> 闭包的形成主要取决于变量`作用域`和变量的`生存周期`  

> 变量的作用域是之下从上查找。  

> 生存周期取决于变量是全局变量还是局部变量, 全局变量的生存周期是永久性的,局部变量这是执行环境结束则(js垃圾回收机制会自动销毁变量)  

闭包的应用:
```
var mult = (function () {
  var cache = {};
  return function () {
    var args = Array.prototype.join.call(arguments, ',');
    if (cache[args]) {
      return cache[args];
    }
    var a = 1;
    for (var i in arguments) {
      a = a * arguments[i]
    }
    return cache[args] = a;
    // 这里可以看到赋值的过程中,也会返回值,就好比,[].push(1);会返回一个数组的length一样。
  }
})();

console.log(mult(1,2,3));
console.log(mult(1, 2, 3));
--------------------------------------------------------
var Type = {};

for (var i = 0, type; type = ['Array', 'String', 'Number'][i++];){
  (function (type) {
    return Type['is' + type] = function (obj) {
      return Object.prototype.toString.call(obj) === '[object ' + type + ']';
    }
  })(type)
}

console.log(Type.isArray([]));
console.log(Type.isString('str'));
------------------------------------------------
var report = (function () {
  var imgs = [];
  return function (src) {
    var img = new Image();
    imgs.push(img);
    img.src = src;
  }
})();
report('http://xxx.com/xxx.jpg');
// img对象经常用于数据上报, 如果不使用闭包, 数据会丢失, 因为局部变量会在函数执行完毕就销毁,此时可能请求还没有来的及发送.变量就已经销毁掉了.
// 这里是因为有一个异步请求的存在
```
#### 闭包和面向对象设计
>面向对象的闭包
```
var extent = {
  value:0,
  call:function (){
    this.value++;
    return this.value;
  }
}
```
#### 用闭包实现命令模式
```
var Tv = {
  open: function () {
    console.log('open')
  },
  close: function () {
    console.log('close');
  }
}

var createCommand = function (receiver) {
  var execute = function () {
    receiver.open();
  }
  var undo = function () {
    receiver.close();
  }
  return {
    execute,
    undo
  }
}

var setCommand = function (command) {
  document.getElementById('execute').onclick = function () {
    command.execute();
  }
  document.getElementById('undo').onclick = function () {
    command.undo();
  }
}

setCommand(createCommand(Tv));

```
#### 闭包与内存管理
> 闭包不会造成内存泄露,给变量放在闭包内和放在全局作用域,对内存的影响是一致的。  

> 存在内存泄露的情况是dom中的循环引用才会造成内存泄露。
循环引用示例:
```
function handle() {
  var element = document.getElementById('test');
  element.onclick = function () {
    alert(element.id);
  }
}
// element的onclick引用了函数funciton，function通过闭包引用了element，照成循环引用
```
#### 高阶函数
> 满足下列条件之一及高阶函数:
- 函数可以作为参数传递
- 函数可以作为返回值输出   

