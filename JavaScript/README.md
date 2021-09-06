# Javascript 学习总结

## 基础知识

### 一、 this 理解

```javascript
function foo() {
  console.log(this.a)
}
var a = 1;
foo() // 这里调用的 this 是指向了 window，所以 a 输出的结果是 undefined

const obj = {
  a: 2,
  foo: foo
}
obj.foo() // 这里是一个对象调用了 foo，输出的结果是 2

const c = new foo()
```

- 对于直接调用 `foo` 来说，不管 `foo` 函数被放在了什么地方，`this` 一定是 `window`；
- 对于 `obj.foo()` 来说，我们只需要记住，谁调用了函数，谁就是 `this`，所以在这个场景下 `foo` 函数中的 `this` 就是 `obj` 对象；
- 对于 `new` 的方式来说，`this` 被永远绑定在了 `c` 上面，不会被任何方式改变 `this`；

**总结**

- 普通函数 `this` 指向 `window`；
- 定时器函数 `this` 指向的是 `window`；
- 立即执行函数 `this` 指向的是 `window`；
- 对象的方法 `this` 指向的是对象；
- 构造函数 `this` 指向构造函数 `new` 出来的实例对象；
- 绑定事件函数 `this` 指向的是函数的调用者；
- 箭头函数中使用 `this`，`this` 关键字将指向箭头函数定义位置中的 `this`；
- 严格模式下的 `this` 指向的是 `undefined` 如果给他赋值则会报错；
- 严格模式下的 `this` new 实例化的构造函数指向创建的对象实例；
- 严格模式下的定时器 `this` 还是指向 `window`；
- 严格模式下的 `this` 事件、对象还是指向调用者；

### 二、事件冒泡

- **概念**：在一个对象上触发某类事件（比如单击onclick事件），默认这个事件会向`父级对象`传播，`从里到外`直至它被处理，或者它到达了对象层次的最顶层；
- **怎么阻止事件冒泡**：事件对象 `stopPropagation()`；
- **事件冒泡作用**：事件冒泡允许多个操作被集中处理，比如把事件处理器添加到一个父级元素上，避免把事件处理器添加到多个子元素上（再多子元素，只需要添加一次事件就好了）；

```html
<form id="form1" runat="server">
  <div id="divOne" onclick="alert('我是最外层！');">
      <div id="divTwo" onclick="alert('我是中间层！')">
          <a id="link" href="http://www.baidu.com" onclick="alert('我是最里层！')">最里层</a>
      </div>
  </div>
</form>
```

```javascript
/* 
return false 并不是终止事件，而是阻止事件宿主的默认行为
所以还会冒泡,a链接本生的跳转行为不执行
*/
document.getElementById("link").onclick = function (event) {
    return false;
}
/* 
event.stopPropagation()阻止了冒泡,a链接本生的跳转行为还存在
*/
// document.getElementById("link").onclick = function (event) {
//     event.stopPropagation();
// }
```

### 二、事件委托

- **概念**：事件委托是利用事件的冒泡原理来实现的，比如我们平时在给ul中的li添加事件的时候，我们都是通过for循环一个个添加，如果li很多个的话，其实就有点占内存了，这个时候可以用 事件代理来优化性能；
- **作用**：
  + 遍历孩子，绑定事件，存在性能问题；
  + li（孩子）如果是动态添加的，那么必须用事件委托；
- **原理**：事件委托是通过事件冒泡实现的；

```html
<div class="btn-layout">
  <button>按钮</button>
  <button>按钮</button>
  <button>按钮</button>
  <button>按钮</button>
  <button>按钮</button>
  <button>按钮</button>
</div>
<script>
  document.getElementsByClassName("btn-layout")[0].onclick = function(e){
    console.log(e);
  }
</script>
```

### 三、事件流

**事件流包含三个阶段**

- 事件捕捉阶段：事件开始由顶层对象触发，然后逐级向下传播，直到目标元素；
- 处于目标阶段：处在绑定事件的元素上；
- 事件冒泡阶段：事件由具体的元素先接收，然后逐级向上传播，直到不具体的元素；

**事件捕获是从上到下，而事件冒泡是从下到上**

### 四、解决移动端 click 事件 300ms

- 禁用缩放，浏览器禁用默认的双击缩放行为并且去掉 300ms 的点击延迟 `<meta name="viewport" content="user-scalable=no">`
- 利用 touch 事件自己封装这个事件解决 300ms 延迟；
- 使用插件 `fastclick` 插件解决 300ms 延迟；
- fastClick 原理，是在检测到 touchend 事件的时候，会通过DOM自定义事件立即出发模拟一个 click 事件，并把浏览器在300ms之后的click事件阻止掉；

### 五、sessionStorage 和 localStorage 区别

- sessionStorage 生命周期为当前窗口或标签页，一旦窗口或标签页被永久关闭了，那么所有通过 sessionStorage 存储的数据也就被清空了；
- LocalStorage 生命周期是永久，这意味着除非用户显示在浏览器提供的 UI 上清除 localStorage 信息，否则这些信息将永远存在；

### 六、深拷贝和浅拷贝的区别

**什么是深浅拷贝?**
假设 B 复制了 A，当修改 A 时，看 B 是否会发生变化，如果 B 也跟着变了，说明这是浅拷贝，如果 B 没变，那就是深拷贝；

**哪里用过深拷贝?**
列表数据做弹框修改的时候；

**浅拷贝方式**

- `Object.assign` 方法；
- 自己封装方法；

**深拷贝的方式**

- 递归去拷贝所有层级属性；
- JSON 对象来实现深拷贝(常用)；
- 通过 jQuery 的 `extend` 方法实现深拷贝；
- lodash 函数库实现深拷贝；

### 七、构造函数原型 prototype

- js（ES5）本身是没有 `class` 类型，主要通过构造函数和原型来模拟类的实现机制；
- 每一个构造函数都有一个 `prototype` 属性，这个 `prototype` 是一个对象，这个对象所有的属性和方法，都被构造函数所拥有。
- 可以把这些不变的方法，直接定义在 `prototype` 对象上，这样所有对象的实例就可以共享这些方法；
- 所以原型的作用是：资源共享；
- 只用构造函数不配合原型会存在浪费内存；

### 八、对象原型 __proto__

- 对象都会有一个`__proto__`属性
- `__proto__` 属性指向构造函数的 `prototype` 原型对象，`__proto__` 对象原型和原型对象 `prototype` 是相同的；
- 我们对象可以使用构造函数 `prototype` 原型对象的属性和方法，就是因为对象有 `__proto__` 原型的存在；
- `__proto__` 是一个非标准属性，因此实际开发中，不可以使用这个属性，它存在的意义在于为对象的查找机制提供一个方法，或者说一条路线；

### 九、prototype 和 __proto__ 的区别

- `prototype` 是函数才有的属性；
- `__proto__` 是每个对象都有的属性；
- 大多数情况下，`__proto__` 可以理解为“构造器的原型”，即 `__proto__` === `constructor.prototype`；

### 十、构造函数原型 prototype 和对象原型 __proto__ 的关系

- 实例对象有一个属性 `__proto__` 指向构造函数的 `prototype` 原型对象；
- 实例对象原型 `__proto__` 和构造函数的 `prototype` 是等价的；

### 十一、构造函数、原型对象、实例对象三者关系

- 构造函数，为了创建对象；
- 构造函数的原型对象，为了存储构造函数共有的方法和属性；
- 构造函数的实例对象，是通过构造函数创建的一个一个实例；
- 每一个构造函数都有一个 `prototype` 属性，指向的是该构造函数的原型对象；
- 每一个实例对象都有一个 `__proto__` 属性，指向的是构造函数的原型对象；
- 实例对象原型 `__proto__` 和构造函数原型 `prototype` 里面都有一个属性 `constructor` 属性，都指向了构造函数；

### 十二、原型链

- 当访问一个对象的某个属性时，会先在这个对象本身属性上查找；
- 如果没有找到，则会去它的 `__proto__` 隐式原型上查找，即它的构造函数的 `prototype`；
- 如果还没有找到就会再在构造函数 `prototype` 的 `__proto__` 隐式原型中查找；
- 直到构造函数原型对象 `prototype` 的 `__proto__` 隐式原型指向为 `null` 就停止；
- 这样一层一层向上查找就会形成一个链式结构，我们称为原型链；

### 十三、setTimeout 和 setInterval 的区别

- 使用 `setTimeout()` 开启的定时器，时间间隔一到代码只会执行 1 次；
- 使用 `setInterval()` 开启的定时器，时间一到代码就会执行；
- 使用 `clearTimeout()` 和 `clearInterval()` 可以清除定时器；

### 十四、js 对象的创建的几种方式

- `object` 构造函数，虽然直观，但是创建多个对象的时候，代码冗余；
- 字面量创建，优点：简单直接；缺点：无法批量构建同类对象；
- 使用工厂模式，会解决实例化对象产生大量重复的问题，但是无法判断类型；
- 构造函数模式 + 原型模式，解决了存在内存浪费；

### 十五、call、apply、bind方法的作用

- `call` 和 `apply` 都是为了改变函数体内部 `this` 的指向；
- `call()` 和 `apply()` 的区别就在于两者之间的参数；
- `bind()` 方法和前两者不同在于 `bind()` 方法会返回执行上下文被改变的函数而不会立即执行，而前两者是直接执行该函数。他的参数和 `call()` 相同；

### 十六、数组的 forEach、map、every、some、filter 区别

- `forEach()` 对数组中的每一项运行给定的函数，此方法无返回值；
- `map()` 对数组中的每一项执行给定的函数，返回函数执行结果组成的新数组，不影响原数组；
- `filter()` 对数组中的每一项执行给定函数，返回函数执行结果为 `true` 构成的新数组，不影响原数组；
- `every()` 对数组每一项执行给定函数，如果函数执行结果都为 `true`，则返回 `true`，否则返回 `false`；
- `some()` 对数组每一项执行给定函数，如果有一项执行函数结果为 `true`，则返回`true`；

### 十七、什么是高阶函数？有哪些高阶函数？

- 高阶函数是对其他函数进行操作的函数，它接收`函数作为参数`或将`函数作为返回值`输出；
- `every`、`some`、`forEach`、`map`、`filter` 都是高阶函数；

### 十八、闭包

- **概念**：闭包（closure）指有权访问另一个函数作用域中变量的函数；
- **举例**：js 函数 A 里面有一个函数 B，函数 B 访问了函数 A 里面定义的局部变量，此时就产生了闭包，变量所在的函数就是闭包函数。这里的 A 就是闭包函数；
- **作用**：延伸了变量的作用范围，比如可以让全局作用域去访问函数内部定义的局部变量，变量的销毁时机还受内部函数影响；

<hr/>

## ES6 的新特性

### 一、变量声明

  > 变量声明 `const` 和 `let`，相比之前的 var 变量是没有局部的概念，新变量声明的在局部上(块作用域)做出了优化，不会污染全局。

  **有几点需要注意：**

- `const` 和 `let` 声明只在一个块中（花括号内）有效
- 当使用常量 `const` 声明时，请使用大写变量，如： `CAPITAL_CASING`
- `const` 在声明时必须被赋值，并且不能重新对已有变量赋值

```javascript
if(true){
  let fruit = 'apple';
}
console.log(fruit)  // fruit is not defined
```

### 二、模板字符串

在 es6 之前，我们需要通过 "\" 和 "+" 来构建模版。
在 es6 之后，基本的字符串格式化，将表达嵌入字符串中进行拼接，用 `${}` 来界定 - es6 反引号 ` (``) ` 直接搞定。

```javascript
// es 6 前
$("body").html(
  "This demonstrates the output of HTML  content to the page, including student's " + name + ", " + seatNumber + ", " + sex + " and so on."
);
console.log(name + '-lastname');

// es 6 后
$("body").html(
  `This demonstrates the output of HTML content to the page, including student's ${name}, ${seatNumber}, ${sex} and so on.`
);
console.log(`${name}-lastname`);
```

### 三、箭头函数
  > 只有一个返回值可以忽略掉 {}，只有一个参数可以不写()

  ````javascript
  window.onload = () => {
    alert('hello, es6');
  }
  
  let func = a => console.log(a);

  // 数组排序
  let arr = [12, 8, 37, 26, 9];
  arr.sort((n1, n2) => n1 - n2)
  ````

  > 箭头函数没有 this，如果访问 this，则会从外部获取。这里 `forEach` 中使用了箭头函数，所以其中的 `this.title` 其实和外部方法 `showList` 的完全一样。那就是：`group.title`。

  例：
  ```javascript
  let group = {
    title: 'Our Group',
    students: ['John', 'Pete', 'Alice'],

    showList() {
      this.students.forEach (
        student => console.log(`${this.title}: ${student}`)
      );
    }
  };

  group.showList();
  ```

  > 如果我们使用正常的函数，则会出现错误，报错是因为 `forEach` 运行它里面的这个函数，但是这个函数的 `this` 为默认值 `this=undefined`，因此就出现了尝试访问 `undefined.title` 的情况。但箭头函数就没事，因为它们没有 `this`

  例：
  ```javascript
  let group = {
    title: 'Our Group',
    students: ['John', 'Pete', 'Alice'],

    showList() {
      this.students.forEach (function(student) {
        // Error: Cannot read property 'title' of undefined
        console.log(`${this.title}: ${student}`)
      });
    }
  };

  group.showList();
  ```

  > 箭头函数中的 `this` 指向当前函数就是当前的 `this`

  例：
  ```javascript
  class Json{
    constructor() {
      console.log(this);

      this.a = 12;

      this.fn = () => console.log(this.a)
    }
  }
  let json = new Json();
  json.fn();
  ```

  **总结**
  箭头函数：
  + 没有 `this`
  + 没有 `arguments`
  + 不能使用 `new` 进行调用
  + 它们也没有 `super`
  
### 四、函数的参数默认值

  ```javascript
  // es6 before
  function printText(text) {
    text = text || "default";
    console.log(text);
  }

  // es6 after
  function printText(text = "default") {
    console.log(text);
  }
  ```

### 五、Spread/Rest 操作符号

  > Spread/Rest(剩余参数) 指的是 `...`，具体是 Spread 还是 Rest 需要看上下文语境。

  ```javascript
  // 数组展开/收集
  let arr = [1, 2, 3];
  console.log(...arr); // 1, 2, 3
  
  let arr1 = [12, 5, 8];
  let arr2 = [1, 9, 10];
  let arr3 = [...arr1, ...arr2]
  console.log(arr3) // 12, 5, 8, 1, 9, 10

  // 用于函数传参时，是一个 Rest 操作符
  function breakfast(dessert, drink, ...foods) {
    console.log(dessert, drink, ...foods);
  }
  breakfast('🍰', '🍺', '🍎', '🍵', '🍐')  // 🍰 🍺 🍎 🍵 🍐

  // json 展开
  let json = {a: 1, b: 2, c: 3};
  let json2 = {
    ...json,
    d: 999
  }
  console.log(json2) // a: 1, b: 2, c: 3, d: 999
  ```
  
### 六、对象和数组解构

  > 我们经常需要在对象和数组内提取相关的数据，往往我们需要遍历才能完成；
  而在 es6 添加了简化这种任务的新特性：解构。解构是一种打破数据解构，将其拆分成更小部分的过程；
  解构必须提供初始值。即等号左右不能为 null,undefiend 或者不提供，解构的变量如果不存在对象中会被赋值为 `undefiend`，我们可以为解构的变量提供一个人默认值，在属性名字后添加等号和默认值即可；

  ```javascript
  // 解构对象
  let student = {
    name: "lee",
    age: 26,
    sex: "男",
  };
  let { name, age, sex, height = "178" } = student;
  console.log(name); // lee

  // 解构数组
  function breakfast() {
    return ['🍰', '🍵', '🍎']
  }
  let [dessert, drink, fruit] = breakfast();
  console.log(dessert, drink, fruit); // 🍰 🍵 🍎

  // 解构参数
  function breakfast(dessert, drink, {location, restaurant} = {} ){
    console.log(dessert, drink, location, restaurant);
  }
  breakfast('🍰', '🍺', {location: '济南', restaurant: '董小姐'});  // 🍰 🍺 济南 董小姐
  ```

  **总结**

  - ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）；
  - 解构赋值能够让我们方便的去取对象中的属性跟方法；
  - 数组解构用中括号包裹，多个变量用逗号隔开，对象解构用花括号包裹，多个变量用逗号隔开；
  - 数组的元素是按次序排列的，变量的取值由它的位置决定；
  - 对象的属性没有次序，变量的取值由它的名称决定；
  - 数组结构的时候，如果变量跟数值个数不匹配的时候，变量的值为 `undefined`；
  - 对象解构，支持取别名，支持默认值；
  - 解构赋值允许指定默认值；

### 七、字符判断

  ```javascript
  let dessert = '🍰',
      drink = '🍵';

  let breakfast = `今天的早餐是${dessert}和${drink}!`;

  breakfast.startsWith('今天');  // true 判断是否以 ‘今天’ 开头
  breakfast.endsWith('!')  // true 判断是否以 ‘!’ 结尾
  breakfast.includes('🍎') // false 判断是否引用了 ‘🍎’
  ```

### 八、复制对象

  ```javascript
  let breakfast = {}
  Object.assign(
    breakfast,             // 设置对象
    { drink: '🍵' }        // 复制源
  )
  console.log(breakfast); // { drink: '🍵' }
  ```

### 九、Symbol

> ES6 引入了一种新的原始数据类型 Symbol ，表示独一无二的值，最大的用法是用来定义对象的唯一属性名。Symbol 函数栈不能用 new 命令，因为 Symbol 是原始数据类型，不是对象。

  **Symbol**

  “Symbol” 值表示唯一的标识符。

  可以使用 `Symbol()` 来创建这种类型的值：

  ```javascript
  // id 是 symbol 的一个实例化对象
  let id = Symbol();
  ```

  创建时，我们可以给 Symbol 一个描述（也称为 Symbol 名），这在代码调试时非常有用：

  ```javascript
  // id 是 symbol 的一个实例化对象
  let id = Symbol("id");
  ```

  Symbol 保证是唯一的。即使我们创建了许多具有相同描述的 Symbol，它们的值也是不同。描述只是一个标签，不影响任何东西。

  例如，这里有两个描述相同的 Symbol —— 它们不相等：

  ```javascript
  let id1 = Symbol("id");
  let id2 = Symbol("id");

  alert(id1 == id2); // false
  ```

### 十、原生对象拓展

  - **Map 映射**

  > 映射传入多少内容就返回多少内容

  ```javascript
  let grades = [68, 53, 12, 98, 65];
  let result = grades.map(item => item >= 60 ? "及格" : "不及格")
  console.log(result); // ["及格", "不及格", "不及格", "及格", "及格"]
  ```

  - **reduce**

  > 传入多少内容只返回一个，它共有三个参数：
  `total` 参数一是计算初始值；
  `currentValue` 参数二是被计算值，当前元素；
  `currentIndex` 参数三是当前索引值；

  ```javascript
  let grades = [68, 53, 12, 98, 65];
  let result = grades.reduce((tmp, item, index) => {
    console.log(`第${index}次是：${tmp}：${item}`);
    // 第1次是：68：53
    // 第2次是：121：12
    // 第3次是：133：98
    // 第4次是：231：65

    return tmp + item;
  });
  console.log(result); // grades 总和 296
  ```

  - **filter 过滤**

  ```javascript
  // 筛选出偶数
  let grades = [68, 53, 12, 98, 65];
  let result = grades.filter(item => item % 2 == 1);
  console.log(result); // 68,12,98
  ```

### 十一、Json

  - `JSON.stringify()` 把 json 对象转换成字符串
  - `JSON.parse()` 把 json 字符串转换成对象

### 十二、Babel

  > Babel 是解决低版本浏览器无法兼容 ES6 写法而生成的一个库，它有两种处理方式

  1. 引用在线资源，通过浏览器端处理会影响性能，有一定的延迟时间，**不建议使用**
  2. 通过 `node` 环境离线编译
    - 安装依赖 `npm i @babel/cli @babel/core @babel/preset-env -D`, 
    - 在项目下的 `package.json` 下添加 `"build": "babel src -d build"` 命令编译需要的文件
    - 在项目下跟目下添加配置文件 `.babelrc` 文件，添加预设内容转义

    ```javascript
    // .babelrc 配置文件内容
    {
      "presets": ["@babel/preset-env"]
    }
    ```

### 十三、异步操作

  - **Promise**
  
  + 用来做什么？
    1. 主要用于异步计算；
    2. 可以将异步操作队列化，按照期望的顺序执行，返回符合预期的结果；
    3. 可以在对象之间传递和操作 Promise，帮助我们处理队列；
    4. Promise 出现的目的是解决异步编程中回调地狱的问题；
    5. 有了 Promise 对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数；
    6. Promise 对象提供统一的接口，使得控制异步操作更加容易；
  
  + 怎么用？
    1. Promise 对象是一个构造函数，可以使用 new 来调用 Promise 的构造器来进行实例化来生成 Promise 实例；
    2. Promise 构造函数包含一个参数和一个带有 resolve（解析）和 reject（拒绝）两个参数的回调。在回调中执行一些操作（例如异步），如果一切都正常，则调用 resolve，否则调用 reject；
    3. 可以调用 promise.then() 方法，then 方法可以接受两个回调函数作为参数，成功就会执行then方法的第一个回调函数，失败就会执行then方法的第二个回调函数；

  + Promise 的原理？
    1. 所谓 Promise，简单说就是一个容器，里面异步操作的结果；
    2. Promise 对象的状态不受外界影响，只受异步操作的结果影响；
    3. Promise 对象有三种状态：pending（进行中）、fulfilled（已成功）和 rejected（已失败）；
    4. Promise 一旦状态改变，就不会再变；
    5. Promise 对象的状态改变，只有两种可能；
      - 从 `pending`（进行中）变为 `fulfilled`（已成功）
      - 从 `pending`（进行中）变为 `rejected`（已失败）
  
  + Promise 特点？
    1. Promise 创建就会执行他里面的代码；
    2. 把创建 Promise 实例的代码做了一个封装，好处就是只有在调用这个方法的时候才会去执行 Promise 里面的代码，而且要创建多个 Promise 实例的时候比较简洁；

  + Promise 的其他方法？
    1. `catch()` 抓取错误的；
    2. all()，Promise.all() 静态方法，Promse.all 在处理多个异步处理时非常有用，比如说一个页面上需要等两个或多个 ajax 的数据回来以后才正常显示，在此之前只显示 loading图标；
    3. race()，Promise.race() 静态方法，Promse.race 就是赛跑的意思，意思就是说 Promise.race([p1, p2, p3]) 里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态；

  ```javascript
  let result = new Promise((resolove, reject) => {
    // 异步处理
    // 处理结束后、调用resolve 或 reject
    $.ajax({
      url: "./asset/data1.txt",
      dataType: "json",
      success(arr) {
        return resolove(arr);
      },
      error(res) {
        reject(res);
      },
    });
  });

  result.then(
    (arr) => {
      console.log(arr);
    },
    (res) => {
      console.log(res);
    }
  );
  ```

  ```javascript
  Promise.all([
    $.ajax({ url: "./asset/data1.txt", dataType: "json" }),
    $.ajax({ url: "./asset/data2.txt", dataType: "json" }),
    $.ajax({ url: "./asset/data3.txt", dataType: "json" }),
  ]).then( 
    (arr) => {
      let [data1, data2, data3] = arr;
      console.log(data1, data2, data3);
    },
    (res) => console.log(res);
  );
  ```

  - **async/await**

  > `async` 是一个语法，用于函数前面，声明函数体里面有异步操作；普通函数是在函数体里面执行到结束；

  - 普通函数定义前加 `async` 关键字，普通函数变成异步函数；
  - 在异步函数内部，使用 `return` 关键字进行结果返回，`return` 关键字代替了 `resolve` 方法；
  - 异步函数的返回值默认是 `promise` 对象；
  - 调用异步函数，再链式调用 `then` 方法获取异步函数执行结果；
  - 在异步函数内部，使用 `throw` 关键字抛出程序异常；
  - 调用异步函数，再链式调用 `catch` 方法获取异步函数执行的错误信息；
  - `async` 函数可能包含 0 个或者多个 `await` 表达式；
  - `await` 关键字只能放到 `async` 函数里面；
  - `await` 后面可以放任何表达式，不过我们更多的是放一个返回 `promise` 对象的表达式；
  - `await` 关键字可以暂停异步函数向下执行，直到 `promise` 返回结果；

  ```javascript
  async function show() {
    let a = 1;
    let b = 2;

    try {
      let result = await $.ajax({
        url: "./asset/data2.txt",
        dataType: "json",
      });
      console.log(a + b + result[2]);
    } catch (e) {
      console.log("读取失败");
    }
  }

  show();
  ```

  **总结**

  - 什么类似的？
    + 两者都是异步编程的一种解决方案
    + `async` `await`与 `Promise` 一样，是非阻塞的

  - 什么联系？
    + `async` `await`是基于 `Promise` 实现的，可以说是改良版的 `Promise`


### 十四、面向对象

> 面向对象指的是一种编程的方法，其中包含了一些，数据、特性、代码与方法等特性，主要特征就是封装。

- `class` 类声明
- `constructor` 构造函数定义属性
- `extends` 继承指定类，同时也继承里面的方法
- `super` 声明继承父类的属性内容

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  showName() {
    console.log(this.name);
  }

  showAge() {
    console.log(this.age);
  }
}

const a = new Person("lee", "27");
a.showName();
a.showAge();

// 创建一个 class 继承 Person
class Works extends Person {
  constructor(name, age, job) {
    super(name, age);

    this.job = job;
  }

  showJob() {
    console.log(this.job);
  }
}

const b = new Works("tom", "25", "前端开发");
b.showJob();
```

### 十五、模块化

> 在没模块化概念前，使用的是 src 的方式引入 js，这种方式极其不便了，会产生代码重复，命名冲突。
> 模块化的演变：没有模块化-> CMD -> AMD -> 语言提供支持
> 模块化可以使你的代码低耦合，功能模块直接不相互影响

1. 可维护性：根据定义，每个模块都是独立的。良好设计的模块会尽量与外部的代码撇清关系，以便于独立对其进行改进和维护。维护一个独立的模块比起一团凌乱的代码来说要轻松很多。
2. 命名空间：在JavaScript中，最高级别的函数外定义的变量都是全局变量（这意味着所有人都可以访问到它们）。也正因如此，当一些无关的代码碰巧使用到同名变量的时候，我们就会遇到“命名空间污染”的问题。
3. 可复用性：现实来讲，在日常工作中我们经常会复制自己之前写过的代码到新项目中。

```javascript
// mod1.js
// 默认输出了两个变量
export let a = '🍎';
export let b = '🍌';

// index.js
// 引入 mod1.js 
// * 号为导出所有并以 mo1 命名
import * as mod1 from './mod1';
// 使用
console.log(mod1.a) // 🍎
```

**export 的用法**

```javascript
// 导出多个
let a = '🍎' , b = '🍌', c = '🍒';

export { a, b, c}

// 导出函数
export function show() {...}

// 导出类
export class Person {...}

// 默认导出
export default let a = '🍎';
import mod from 'mod';
console.log(mod) // 🍎

// 如果有相同的名字，可以取别名
import {a, b as name2} from 'mod';

// 引入文件
import 'style.css'

// 异步引入
let mod = import('./mod');
```