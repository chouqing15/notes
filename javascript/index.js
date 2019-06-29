var fun = function (a,b,c) {
  console.log(a,b,c)
}

var fun1 = fun.bind(fun, 1);
 fun1 = fun1.bind(fun, 2);
 fun1 = fun1.bind(fun, 3);
console.log(fun1());