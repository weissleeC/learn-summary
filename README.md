# 学习总结

### HTML 篇

1. 说一下 `<label>` 标签的用法
	`label` 标签主要是方便鼠标点击使用，扩大可点击的范围，增强用户操作体验

***

### CSS 篇

1. #### css 水平、垂直居中的写法，至少写出 4 中
	
	*水平居中*
	- 行内元素：`text-align: center`
	-	块级元素： `margin: 0 auto`	
	- `position: absolute + left: 50% + transform: translateX(-50%)`
	- `display: flex + justify-content: center`

	*垂直居中*
	- 设置 `line-height` 等于 `height`
	- `position: absolute + top: 50% + transform: trans;ateY(-50%)`
	- `display: flex + align-items: center`
	- `display: table + display: tabel-cell + vartical-align: middle`

2. #### 说一下盒子模型
	盒模型的组成，由里向外 content,padding,border,margin
	在 IE 盒子模型中，width 表示 content+padding+border 这三个部分
	在标准的盒子模型中， width 指 content 的部分宽度

	`box-sizing`的使用
	- `box-sizing: content-box` 是 W3C 盒子模型
	- `box-sizing: border-box` 是 IE 盒子模型


3. #### 说一下 css 的权重级别
	!important > 内联样式 > ID 选择器 > 类选择器 ｜ 属性选择器 ｜ 伪类选择器 >  元素选择器

***

### Javascript 篇

1. #### 列举一下 es6 的新特性
	- 变量声明 `const` 和 `let`，相比之前的 var 变量是没有局部的概念，新变量声明的在局部上做出了优化，不会污染全局。
		+ 有几点需要注意：
			- `const` 和 `let` 声明只在最靠近的一个块中（花括号内）有效
			- 当使用常量 `const` 声明时，请使用大写变量，如：	`CAPITAL_CASING`
			-  `const` 在声明时必须被赋值

2. #### 模板字符串
	在 es6 之前，我们需要通过 "\" 和 "+" 来构建模版。例：

	```javascript
	$("body").html("This demonstrates the output of HTML \ content to the page, including student's\ " + name + ", " + seatNumber + ", " + sex + " and so on.");
	```
	
	对 es6 来说：
	- 基本的字符串格式化，将表达嵌入字符串中进行拼接，用 `${}` 来界定
	- es6 反引号 (``) 直接搞定。例：

	```javascript
	$("body").html(`This demonstrates the output of HTML content to the page, including student's ${name}, ${seatNumber}, ${sex} and so on.`);
	console.log( `${name}-lastname` )
	```

3. #### 箭头函数
	箭头函数和普通函数没有本质上的区别，更多是写法上。
	- 如果只有一个参数，() 可以省略
	- 如果只有一个 return， {} 可以省略

	```javascript
	window.onload = () => {
		alert('hello, es6');
	}

	let func = a => console.log(a);
	```

4. #### 函数的参数默认值
	在 es6 之前，我们往往需要在函数体里面定义参数的默认值，而在 es6 上的写法更简单些，直接圆括号里赋值。

	```javascript
	// es6 before
	function printText(text) {
		text = text || 'default';
		console.log(text);
	}

	// es6 after
	function printText(text = 'default') {
		console.log(text);
	}
	```

5. #### Spread/Rest 操作符号
	> Spread/Rest 指的是 `...`，具体是 Spread 还是 Rest 需要看上下文语境。
	
	```javascript
	// 当被用于迭代器中时，它是一个 Spread 操作符号
	function foo(x,y,z) {
		console.log(x,y,z);
	}

	let arr = [1,2,3];

	foo(...arr);

	// 用于函数传参时，是一个 Rest 操作符
	function foo(...args) {
		console.log(args);
	}
	foo(1,2,3,4,5)
	```

6. #### 对象和数组解构
	> 我们经常需要在对象和数组内提取相关的数据，往往我们需要遍历才能完成。而在es6添加了简化这种任务的新特性：解构。解构是一种打破数据解构，将其拆分成更小部分的过程。解构必须提供初始值。即等号左右不能为 null,undefiend 或者不提供，解构的变量如果不存在对象中会被赋值为 `undefiend`，我们可以为解构的变量提供一个人默认值，在属性名字后添加等号和默认值即可
	
	```javascript
	let student = {
		name: 'lee',
		age: 26,
		sex: '男',
	}
	let { name, age, sex, height = '178'} = student;
	console.log(name);
	```


### React 篇

1. #### 什么是 React
	> React 是 Facebook 在 2011 年开发的前端 JavaScript 库。它遵循基于组件的方法，有助于构建可重用的UI组件。它用于开发复杂和交互式的 Web 和移动 UI。

	**主要功能**
	- 它使用*虚拟DOM*而不是真正的DOM。
	- 它可以用服务器端渲染。
	- 它遵循单向数据流或数据绑定。

	**主要优点**
	- 它提高了应用的性能
  - 可以方便地在客户端和服务器端使用
	- 由于 JSX，代码的可读性很好
	-	React 很容易与 Meteor，Angular 等其他框架集成
  - 使用React，编写UI测试用例变得非常容易


2. #### 区分 Real DOM 和 Virtual DOM
	> 当数据的变化实时反映到 UI 上，这时就需要对 DOM 进行操作，但是复杂或频繁的 DOM 操作通常是性能瓶颈产生的原因，为此，React 引入了虚拟 DOM（Virtual DOM）的机制。

	- 什么是虚拟 DOM ?
		+ 在 React 中，render 执行的结果得到的并不是真正的 DOM 节点，结果仅仅是轻量级的 JavaScript 对象，我们称之为 virtual DOM。


  - 两者的区别
    + Real DOM
      - 更新缓慢
      - 可以直接更新 HTML
      - 如果元素更新，则创建新 DOM
      - DOM 操作代价很高
      - 消耗的内存较多	

    + Real DOM
      - 更新更快
      - 无法直接更新 HTML
      - 如果元素更新，则更新 JSX
      - DOM 操作非常简单 
      - 很少的内存消耗	


3. #### 什么是 JSX
	> JSX 是 javascript XML 的简写。 是 React 使用的一种文件，它利用 JavaScript 的表现力和类似 HTML 的模板语法。因为 JSX 的特性更接近 JavaScript 而不是 HTML , 所以 React DOM 使用 camelCase 小驼峰命名 来定义属性的名称，而不是使用 HTML 的属性名称。 例如，class 变成了 className，而 tabindex 则对应着 tabIndex，for 对应 htmlFor。


4. #### 虚拟 DOM 的工作原理
	> 它是一个轻量级的 JavaScript 对象，最初只是在真是 DOM 的副本。它是一个节点树，它将元素、属性、内容作为一个对象及属性。React 的渲染函数 `render()` 从 React 组件中穿件一个节点树，然后它想要数据模型中的变化来更新该树，该变化是有用户或系统完成各种动作引起。

	**工作过程**
	1. 每当底层数据发生改变时，整个 UI 都将在外虚拟 DOM 描述中重新渲染。
	2. 计算之前的 DOM 表示和新的之间差异
	3. 完成计算后，将只用实际更改的内容更新到真是 DOM


5. #### 为什么浏览器无法读取JSX？
	> 浏览器只能处理 JavaScript 对象，而不能读取常规 JavaScript 对象中的 JSX。所以为了使浏览器能够读取 JSX，首先，需要用像 Babel 这样的 JSX 转换器将 JSX 文件转换为 JavaScript 对象，然后再将其传给浏览器。


6. #### React 组件
	> 组件是 React 应用 UI 的构建块。这些组件将整个 UI 分成小的独立并可重用的部分。每个组件彼此独立，而不会影响 UI 的其余部分。


7. #### 解释 React 中 render() 的目的
	> 每个React组件强制要求必须有一个 `render()`。它返回一个 React 元素，是原生 DOM 组件的表示。如果需要渲染多个 HTML 元素，则必须将它们组合在一个封闭标记内，例如 `<form>`、`<group>`、`<div>` 等。此函数必须保持纯净，即必须每次调用时都返回相同的结果。

8. #### 如何更新组件的状态？
	> 可以用 `this.setState()` 更新组件的状态。


9. #### React 组件生命周期的阶段是什么?
	> 三阶段：**初始渲染阶段**、**更新阶段**、**卸载阶段**

	- 初始阶段的流程是：`constructor()` -> `componentWillMount()` -> `render()` -> `componentDidMount()`
	- 更新阶段的流程是：`shouldComponentUpdate()` -> `componentWillUpdate()` -> `render()` -> `componentDidUpdate()`
	 + 如果父亲组件更新则是： `componentWillReceiveProps()` -> `shouldComponentUpdate()` -> `componentWillUpdate()` -> `render()` -> `componentDidUpdate()`


10. #### 你对受控组件和非受控组件了解多少

	**受控组件**
	- 没有维持自己的状态
	- 数据由父组件控制
	- 通过 props 获取当前值，然后通过回调通知更改

	**非受控组件**
	- 保持着自己的状态
	- 数据由 DOM 控制
	- Resf 用于当前值


11. #### 什么是高阶组件
	> 高阶组件是重用组件逻辑的高级方法，是一种源于 React 的组件模式。多用于以下几种：
	
	- 代码重用，逻辑和引导抽象
	- 渲染劫持
	- 状态抽象和控制
	- Props 控制


12. #### React 中 key 的重要性是什么？
	> key 用于识别唯一的 Virtual DOM 元素及其驱动 UI 的相应数据。它们通过回收 DOM 中当前所有的元素来帮助 React 优化渲染。这些 key 必须是唯一的数字或字符串，React 只是重新排序元素而不是重新渲染它们。这可以提高应用程序的性能。