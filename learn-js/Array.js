/**
 * # 1
 * 创建数组
 * Array 和 new Array() 是相同的，new 关键字的方法会在内存中开辟一些空间，用来记录与存储该变量，也就是这是一个实例化过程。
 * Array()是一个对象，[]是一个数据原型。使用new Array()系统每次都会新生成一个对象，浏览器每生成一个对象都会耗费资源去构造他的属性和方法。
 */

 let a = Array();
 let b = new Array();
 let c = [];
 
 console.log("#1 创建数组：",a,b,c);

/**
 * # 2
 * 对象操作
 */

 let fruits = ["Apple", "Orange", "Plum"];
 
 console.log("#2 读取对象：", fruits[0], fruits[1], fruits[2]);

 console.log("#2 替换对象：", fruits[0] = 'Pear');

 fruits[3] = 'Lemon';

 console.log("#2 对象新增：", fruits);

 console.log("#2 对象长度：", fruits.length);

/**
 * # 3
 * 混合值
 */
 
let multiple = [
  'name',
  { password: '123456' }, 
  true, 
  function(){ 
    console.log('我是数组里面的函数');
  }
]
console.log("#3 混合数组：", multiple[0], multiple[1].password, multiple[2], multiple[3]() );

/**
 * # 4 
 * 队列
 */

let car = ['BMW','Ferrari','Lamborghini'];

console.log("#4 car：", car)

console.log("#4 pop() 取出并移除最后一个值：", car.pop());
console.log("#4 使用 pop() 之后的数组", car );

console.log("#4 shift() 取出并移除第一个值：", car.shift());
console.log("#4 使用 shift() 之后的数组", car );

car.push('Jaguar');
console.log("#4 push() 在数组末端添加元素：", car);

car.unshift('car1','car2');
console.log("#4 unshift() 在数组首端添加元素", car );