# 学习总结

## 一、HTML 篇

1. ### `<label>` 标签的用法
  `label` 标签主要是方便鼠标点击使用，扩大可点击的范围，增强用户操作体验


## 二、CSS 篇

1. ### css 水平、垂直居中的写法

  _水平居中_

  - 行内元素：`text-align: center`
  - 块级元素： `margin: 0 auto`
  - `position: absolute + left: 50% + transform: translateX(-50%)`
  - `display: flex + justify-content: center`

  _垂直居中_

  - 设置 `line-height` 等于 `height`
  - `position: absolute + top: 50% + transform: translateY(-50%)`
  - `display: flex + align-items: center`
  - `display: table + display: tabel-cell + vartical-align: middle`

2. ### 盒子模型

  盒模型的组成，由里向外 content,padding,border,margin
  在 IE 盒子模型中，width 表示 content+padding+border 这三个部分
  在标准的盒子模型中， width 指 content 的部分宽度

  `box-sizing`的使用

  - `box-sizing: content-box` 是 W3C 盒子模型
  - `box-sizing: border-box` 是 IE 盒子模型

3. ### css 的权重级别
  !important > 内联样式 > ID 选择器 > 类选择器 ｜ 属性选择器 ｜ 伪类选择器 > 元素选择器


## Javascript 篇

> es6 的新特性

1. ### 变量声明

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

2. ### 模板字符串

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

3. ### 箭头函数
  > 只有一个返回值可以忽略掉 {}，只有一个参数可以忽略掉()

  ````javascript
  window.onload = () => {
    alert('hello, es6');
  }
  
  let func = a => console.log(a);
  ````

4. ### 函数的参数默认值

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

5. ### Spread/Rest 操作符号

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

6. ### 对象和数组解构

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

7. ### 字符判断

  ```javascript
  let dessert = '🍰',
      drink = '🍵';

  let breakfast = `今天的早餐是${dessert}和${drink}!`;

  breakfast.startsWith('今天');  // true 判断是否以 ‘今天’ 开头
  breakfast.endsWith('!')  // true 判断是否以 ‘!’ 结尾
  breakfast.includes('🍎') // false 判断是否引用了 ‘🍎’
  ```

8. ### 复制对象

  ```javascript
  let breakfast = {}
  Object.assign(
    breakfast,             // 设置对象
    { drink: '🍵' }        // 复制源
  )
  console.log(breakfast);
  ```

## 三、React 篇

1. ### 什么是 React

  > React 是 Facebook 在 2011 年开发的前端 JavaScript 库。它遵循基于组件的方法，有助于构建可重用的 UI 组件。它用于开发复杂和交互式的 Web 和移动 UI。

  **主要功能**

  - 它使用*虚拟 DOM*而不是真正的 DOM。
  - 它可以用服务器端渲染。
  - 它遵循单向数据流或数据绑定。

  **主要优点**

  - 它提高了应用的性能

- 可以方便地在客户端和服务器端使用
  - 由于 JSX，代码的可读性很好
  - React 很容易与 Meteor，Angular 等其他框架集成
- 使用 React，编写 UI 测试用例变得非常容易

2. ### 区分 Real DOM 和 Virtual DOM

  > 当数据的变化实时反映到 UI 上，这时就需要对 DOM 进行操作，但是复杂或频繁的 DOM 操作通常是性能瓶颈产生的原因，为此，React 引入了虚拟 DOM（Virtual DOM）的机制。

  - 什么是虚拟 DOM ?

    - 在 React 中，render 执行的结果得到的并不是真正的 DOM 节点，结果仅仅是轻量级的 JavaScript 对象，我们称之为 virtual DOM。

    * 两者的区别

       - Real DOM
        - 更新缓慢
        - 可以直接更新 HTML
        - 如果元素更新，则创建新 DOM
        - DOM 操作代价很高
        - 消耗的内存较多

      - Virtual DOM
        - 更新更快
        - 无法直接更新 HTML
        - 如果元素更新，则更新 JSX
        - DOM 操作非常简单
        - 很少的内存消耗

3. ### 什么是 JSX

  > JSX 是 javascript XML 的简写。 是 React 使用的一种文件，它利用 JavaScript 的表现力和类似 HTML 的模板语法。因为 JSX 的特性更接近 JavaScript 而不是 HTML , 所以 React DOM 使用 camelCase 小驼峰命名 来定义属性的名称，而不是使用 HTML 的属性名称。 例如，class 变成了 className，而 tabindex 则对应着 tabIndex，for 对应 htmlFor。

4. ### 虚拟 DOM 的工作原理

  > 它是一个轻量级的 JavaScript 对象，最初只是在真是 DOM 的副本。它是一个节点树，它将元素、属性、内容作为一个对象及属性。React 的渲染函数 `render()` 从 React 组件中穿件一个节点树，然后它想要数据模型中的变化来更新该树，该变化是有用户或系统完成各种动作引起。

  **工作过程**

  1. 每当底层数据发生改变时，整个 UI 都将在外虚拟 DOM 描述中重新渲染。
  2. 计算之前的 DOM 表示和新的之间差异
  3. 完成计算后，将只用实际更改的内容更新到真是 DOM

5. ### 为什么浏览器无法读取 JSX？

  > 浏览器只能处理 JavaScript 对象，而不能读取常规 JavaScript 对象中的 JSX。所以为了使浏览器能够读取 JSX，首先，需要用像 Babel 这样的 JSX 转换器将 JSX 文件转换为 JavaScript 对象，然后再将其传给浏览器。

6. ### React 组件

  > 组件是 React 应用 UI 的构建块。这些组件将整个 UI 分成小的独立并可重用的部分。每个组件彼此独立，而不会影响 UI 的其余部分。

7. ### 理解 React 中 render() 的目的

  > 每个 React class 组件强制要求必须有一个 `render()`。它返回一个 React 元素，是原生 DOM 组件的表示。如果需要渲染多个 HTML 元素，则必须将它们组合在一个封闭标记内，例如 `<form>`、`<group>`、`<div>` 等。此函数必须保持纯净，即必须每次调用时都返回相同的结果。

8. ### 如何更新组件的状态？

  > 可以用 `this.setState()` 更新组件的状态。

9. ### React 组件生命周期的阶段是什么?

  > 三阶段：**初始渲染阶段**、**更新阶段**、**卸载阶段**

  - 初始阶段的流程是：`constructor()` -> `componentWillMount()` -> `render()` -> `componentDidMount()`
  - 更新阶段的流程是：`shouldComponentUpdate()` -> `componentWillUpdate()` -> `render()` -> `componentDidUpdate()`

  * 如果父亲组件更新则是： `componentWillReceiveProps()` -> `shouldComponentUpdate()` -> `componentWillUpdate()` -> `render()` -> `componentDidUpdate()`

10. ### 受控组件和非受控组件理解

  **受控组件**

  - 没有维持自己的状态
  - 数据由父组件控制
  - 通过 props 获取当前值，然后通过回调通知更改

  **非受控组件**

  - 保持着自己的状态
  - 数据由 DOM 控制
  - Resf 用于当前值

11. ### 什么是高阶组件

  > 高阶组件是重用组件逻辑的高级方法，是一种源于 React 的组件模式。多用于以下几种：

  - 代码重用，逻辑和引导抽象
  - 渲染劫持
  - 状态抽象和控制
  - Props 控制

12. ### React 中 key 的重要性是什么？
  > key 用于识别唯一的 Virtual DOM 元素及其驱动 UI 的相应数据。它们通过回收 DOM 中当前所有的元素来帮助 React 优化渲染。这些 key 必须是唯一的数字或字符串，React 只是重新排序元素而不是重新渲染它们。这可以提高应用程序的性能。

13. ### Hook
  > Hook 是可以在不编写 class 的情况下使用 state 以及其他的 React 特性。
  > 相比 class 方式更简洁一些。

  **useState**
  > 在 useState 里可以设置对象、数组、函数的形式

  ```javascript
  const [fruit,setFruit] = useState('🍎');  // 定义了一个接收值和初始值，并初始化一个为 🍎 的值

  return(
    <Fragment>
      <p>{fruit}</p>
      <button 
        htmltype="button" 
        onClick={()=>{ setFruit('🍐') }}
      >换雪梨</button>
    </Fragment>
  )
  ```

  ```javascript
  const [oBj, setObj] = useState({name: 'Tom', sex: '男'});

  return(
    <Fragment>
      <p>{oBj.name}</p>
      <button
        htmltype="button"
        onClick={() =>{ 
          setObj({...oBj, name: 'Lee'});
        }}
      >换名字</button>
    </Fragment>
  )
  ```

  ```javascript
  const [func, setFunc] = useState(() => {
    return 'useState 也可以返回一个函数';
  });

  return(
    <Fragment>
      <p>{func}</p>
      <button
        htmltype="button"
        onClick={()=>{
          setFunc(() => {
            return '改变内容';
          })
        }}
      >函数形式</button>
    </Fragment>
  )
  ```

  **useEffect**
  1. `useEffect` 相当于类组件里面的生命周期函数，`componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount`
  2. `useEffect` 可以在函数中执行副作用操作：DOM 操作、数据请求、组件更新
  3. `useEffect` 是在组件内部执行的，这样可以获取 `props` 和 `state`，它采用了必包的形式
  4. `useEffect` 是在组件更新完之后执行的，这样起到了无阻塞更新的作用，保证页面没加载到数据之前能正常渲染
  5. `useEffect` 可以在一个组件里面存在多个

  ```javascript
  const [count, setCount] = useState(0);

  // 初始执行 useEffect 相当于类组件的 componentDidMount
  useEffect(() => {
    // 当组件更新时候，相当于类组件的 componentDidUpdate
    console.log(count);

    // return 组件卸载(离开)之后执行的内容，相当于类组件的 componentWillUnmount
    return () => {
      console.log('componentWillUnmount');
    }
  }, []); // 如果第二个参数为 [] 空数据则为不监听所有的 state 变化。如果加上指定变量则为监听当前变量。

  return(
    <Fragment>
      <p>{count}</p>
      <button onClick={() => {setCount(count+1)}}>累计</button>
    </Fragment>
  ); 
  ```
