function Person(name,age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHello = function () {
  return 'hello'
}

var person = new Person('xxx', 21);

var proto = Object.getPrototypeOf(person);
console.log(proto.sayHello())