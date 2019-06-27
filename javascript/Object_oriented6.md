## 理解对象
> 对象的创建分为对象字面量和Object实例两种方式创建。
```
var obj = new Object();
var obj = {};
```

## 对象的属性类型
#### 数据属性
- [[configurable]] 表示是否可以通过delete删除属性
- [[Enumerable]] 表示是否可以通过for-in 循环返回属性
- [[Writable]] 表示是否可以修改属性值
- [[Value]] 包含属性的数据值， 默认undefined
  - [[get | set]] 包含读取属性和写入属性的调用函数, 默认undefined
修改属性的默认特性， 通过`Object.defineProperty(target, property, describe)`方法
```
var person = {};
Object.defineProperty(person,'name', {
  value:'Nicholas',
  // 这里只能包含数据属性
})
```
并且Object.defineProperty(),方法只能调用一次.

## 定义多个属性
```
Object.defineProperties(person,{
  year:{
    value:1,
    writable:false
  },
  editioin:{
    value:2,
    writable:false
  }
})
```
