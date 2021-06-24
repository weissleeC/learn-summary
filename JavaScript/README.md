# Javascript 学习总结

> es6 的新特性

### 一、变量声明

  > 变量声明 `const` 和 `let`，相比之前的 var 变量是没有局部的概念，新变量声明的在局部上做出了优化，不会污染全局。

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
  > 只有一个返回值可以忽略掉 {}，只有一个参数可以忽略掉()

  ````javascript
  window.onload = () => {
    alert('hello, es6');
  }
  
  let func = a => console.log(a);
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

  > Spread/Rest 指的是 `...`，具体是 Spread 还是 Rest 需要看上下文语境。

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

  > 我们经常需要在对象和数组内提取相关的数据，往往我们需要遍历才能完成。而在 es6 添加了简化这种任务的新特性：解构。解构是一种打破数据解构，将其拆分成更小部分的过程。解构必须提供初始值。即等号左右不能为 null,undefiend 或者不提供，解构的变量如果不存在对象中会被赋值为 `undefiend`，我们可以为解构的变量提供一个人默认值，在属性名字后添加等号和默认值即可

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
### 九、Map and Set（映射和集合）

> 