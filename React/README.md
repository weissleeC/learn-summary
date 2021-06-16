# React 学习总结

### 一、什么是 React

  > React 是 Facebook 在 2011 年开发的前端 JavaScript 库。它遵循基于组件的方法，有助于构建可重用的 UI 组件。它用于开发复杂和交互式的 Web 和移动 UI。

  **主要功能**

  - 它使用*虚拟 DOM*而不是真正的 DOM。
  - 它可以用服务器端渲染。
  - 它遵循单向数据流或数据绑定。

  **主要优点**

  - 它提高了应用的性能
  - 可以方便地在客户端和服务器端使用
  - JSX 代码的可读性很好
  - React 很容易与 Meteor，Angular 等其他框架集成
  - 使用 React，编写 UI 测试用例变得非常容易

### 二、区分 Real DOM 和 Virtual DOM

  > 当数据的变化实时反映到 UI 上，这时就需要对 DOM 进行操作，但是复杂或频繁的 DOM 操作通常是性能瓶颈产生的原因，为此，React 引入了虚拟 DOM（Virtual DOM）的机制。

  **什么是虚拟 DOM ?**
  > 在 React 中，render 执行的结果得到的并不是真正的 DOM 节点，结果仅仅是轻量级的 JavaScript 对象，我们称之为 virtual DOM。

  * 虚拟 DOM 和真实 DOM 两者的区别
    + Real DOM
      - 更新缓慢
      - 可以直接更新 HTML
      - 如果元素更新，则创建新 DOM
      - DOM 操作代价很高
      - 消耗的内存较多

    + Virtual DOM
      - 更新更快
      - 无法直接更新 HTML
      - 如果元素更新，则更新 JSX
      - DOM 操作非常简单
      - 很少的内存消耗

### 三、什么是 JSX

  > JSX 是 javascript XML 的简写。 是 React 使用的一种文件，它利用 JavaScript 的表现力和类似 HTML 的模板语法。因为 JSX 的特性更接近 JavaScript 而不是 HTML , 所以 React DOM 使用 camelCase 小驼峰命名 来定义属性的名称，而不是使用 HTML 的属性名称。 例如，class 变成了 className，而 tabindex 则对应着 tabIndex，for 对应 htmlFor。

  我们来观察一下声明的这个变量：`const element = <h1>Hello, world!</h1>;`

  这种看起来可能有些奇怪的标签语法既不是字符串也不是 HTML。它被称为 JSX， 一种 JavaScript 的语法扩展。 我们推荐在 React 中使用 JSX 来描述用户界面。JSX 乍看起来可能比较像是模版语言，但事实上它完全是在 JavaScript 内部实现的。
  
  在 JSX 中使用表达式 {} ：`render( Hello, {formatName(user)}! )`

### 四、虚拟 DOM 介绍和工作原理

  **什么是虚拟 DOM ?**
  > 在 React 中，render 执行的结果得到的并不是真正的 DOM 节点，结果仅仅是轻量级的 JavaScript 对象，我们称之为 virtual DOM。

  **虚拟 DOM VS 直接操作原生 DOM ?**
  > 如果没有 Virtual DOM，简单来说就是直接重置 innerHTML。这样操作，在一个大型列表所有数据都变了的情况下，还算是合理，但是，当只有一行数据发生变化时，它也需要重置整个 innerHTML，这时候显然就造成了大量浪费。

  比较 innerHTML 和 Virtual DOM 的重绘过程如下：
  - innerHTML: render html string + 重新创建所有 DOM 元素
  - Virtual DOM: render Virtual DOM + diff + 必要的 DOM 更新

  **工作原理**
  > 它是一个轻量级的 JavaScript 对象，最初只是真实 DOM 的副本。它是一个节点树，它将元素、属性、内容作为一个对象及属性。React 的渲染函数 `render()` 从 React 组件中创建一个节点树，然后它想要数据模型中的变化来更新该树，该变化是由用户或系统完成各种动作引起。

  **工作过程**

  1. 每当底层数据发生改变时，整个 UI 都将在外虚拟 DOM 描述中重新渲染。
  2. 计算之前的 DOM 表示和新的之间差异
  3. 完成计算后，将只用实际更改的内容更新到真实 DOM

### 五、为什么浏览器无法读取 JSX？

  > 浏览器只能处理 JavaScript 对象，而不能读取常规 JavaScript 对象中的 JSX。所以为了使浏览器能够读取 JSX，首先需要用像 Babel 这样的 JSX 转换器将 JSX 文件转换为 JavaScript 对象，然后再将其传给浏览器。

### 六、React 组件

  > 组件是 React 应用 UI 的构建块，这些组件将整个 UI 分成小的独立并可重用的部分。每个组件彼此独立，而不会影响 UI 的其余部分。当需求日积月累，不断变化，页面中必然会有相同的 UI ，如果每个页面单独生产一个，这样维护成本就太大。所以就有了“组件化”的概念，把一些重复的代码封装成一个组件，便于复用维护。

### 七、理解 React 中 render() 的目的

  > 每个 React class 组件强制要求必须有一个 `render()`。它返回一个 React 元素，是原生 DOM 组件的表示。如果需要渲染多个 HTML 元素，则必须将它们组合在一个封闭标记内，例如 `<form>`、`<group>`、`<div>` 等。此函数必须保持纯净，即必须每次调用时都返回相同的结果。

  - 当组件的 state 或者 props 发生改变的时候，render 函数就会重新执行
  - 当父组件的 render 函数被运行时，它的子组件的 render 也将重新运行

### 八、如何更新组件的状态？

  > 可以用 `this.setState()` 更新组件的状态。

### 九、React 组件生命周期的阶段是什么?

  > 三阶段：**初始渲染阶段**、**更新阶段**、**卸载阶段**

  - 初始阶段的流程是：`constructor()` -> `componentWillMount()` -> `render()` -> `componentDidMount()`
  - 更新阶段的流程是：`shouldComponentUpdate()` -> `componentWillUpdate()` -> `render()` -> `componentDidUpdate()`

  * 如果父亲组件更新则是： `componentWillReceiveProps()` -> `shouldComponentUpdate()` -> `componentWillUpdate()` -> `render()` -> `componentDidUpdate()`

### 十、受控组件和非受控组件理解

  **受控组件**

  - 没有维持自己的状态
  - 数据由父组件控制
  - 通过 props 获取当前值，然后通过回调通知更改

  **非受控组件**

  - 保持着自己的状态
  - 数据由 DOM 控制
  - Resf 用于当前值

### 十一、什么是高阶组件

  > 高阶组件是重用组件逻辑的高级方法，是一种源于 React 的组件模式。多用于以下几种：

  - 代码重用，逻辑和引导抽象
  - 渲染劫持
  - 状态抽象和控制
  - Props 控制

### 十二、React 中 key 的重要性是什么？
  > key 用于识别唯一的 Virtual DOM 元素及其驱动 UI 的相应数据。它们通过回收 DOM 中当前所有的元素来帮助 React 优化渲染。这些 key 必须是唯一的数字或字符串，React 只是重新排序元素而不是重新渲染它们。这可以提高应用程序的性能。

### 十三、组件的引用&通信

  > 在组件通信之间，尽量保证在自身组件上去修改状态和数据，这样可以避免组件之间的依赖。解决方式是：自身提供一个方法。 组件之间简单的引用可以通过 ref 使用，但更复杂的通信则必须依赖如 redux 这种大型的框架辅助。

  - 父组件通过属性的方式向子组件传值
  - 子组件通过 `this.props.xxx` 接受父组件的属性内容
  - 传递方法需要在父组件 `bind(this)`

  **父组件调用子组件**
  > 使用 ref 的方式调用

  ```javascript
  class Parent extends React.Component{
    constructor(...args) {
      super(...args);
    };

    fn() {
      this.refs.child.add(this.refs.input.value);
    };

    render() {
      return (
        <div>
          <h2>父组件</h2>
          <input type="text" ref="input" />
          <button onClick={this.fn.bind(this)}>add</button>
          <hr />
          <Child ref="child" /> 
        </div> 
      );
    };
  };

  class Child extends React.Component{
    constructor(...args) {
      super(...args);

      this.state = {
        a: 0
      }
    };

    add(n) {
      this.setState({
        a: this.state.a + parseInt(n)
      })
    }

    render() {
      return (
        <h2>子组件：{this.state.a}</h2>
      )
    }
  }
  ```

  **子组件调用父组件**
  > 通过 props 的方式接受父组件的 this 处理

  ```javascript
  class Parent extends React.Component{
    constructor(...args) {
      super(...args);

      this.state = {
        a: 0
      }
    };

    add(n) {
      this.setState({
        a: this.state.a + parseInt(n)
      })
    }

    render() {
      return (
        <div>
          <h2>父组件：{this.state.a}</h2>
          <hr />
          <Child parent={this} /> 
        </div> 
      );
    };
    };

    class Child extends React.Component{
    constructor(...args) {
      super(...args);
    };

    fn() {
      let parent = this.props.parent;
      parent.add(this.refs.input.value);
    }

    render() {
      return (
        <div>
          <h2>子组件</h2>
          <input type="text" ref="input" />
          <button onClick={this.fn.bind(this)}>add</button>
        </div>
      )
    }
    };
  ```

### 十四、 Hook
  > Hook 是可以在不编写 class 的情况下使用 state 以及其他的 React 特性。相比 class 方式更简洁一些，它是一套工具函数的集合，增加 function 的功能

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