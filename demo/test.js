// # 1
[1,2,3,4,10].map(parseInt);

[1, NaN, NaN, NaN, 4]

// # 2
typeof typeof Symbol(123); // string

// # 3
function minArgs(first, second="b"){
  console.log(first === arguments[0]);
  first = "c";
  second = "d";
  console.log( first === arguments[0]);
  console.log( second === arguments[1]);
}

minArgs('x');  // true false false

// # 4
var add = function(m){
  var temp = function(n){
    return( m + n )
  }
  temp.toString = function(){
    return m.toString(2)
  }
  return temp;
}
// console.info(add(3)(4)(5));  // type error


// #5 防抖

function debounce(fu, wait){
  var timer;

  return function(){
    var context = this;
    var args = arguments;

    clearTimeout(timer);

    timer = setTimeout(function(){
      fu.apply(context, args)
    }, wait);
  };
}