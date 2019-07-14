var throttle = function (fn, interval) { 
  var _self = fn,
    timer,
    firstTime = true;
  return function () {
    var _me = this;
    var arg = arguments;

    if (firstTime) {
      fn.apply(_me, arg);
      return firstTime = false;
    }

    if (timer) {
      return false;
    }

    timer = setInterval(function () {
      console.log(timer, _me, _self);
      clearInterval(timer);
      timer = null;
      fn.apply(_me, arg);
    }, interval || 500)
  }
}

window.onresize = throttle(function () {
  console.log('-------')
},1000)