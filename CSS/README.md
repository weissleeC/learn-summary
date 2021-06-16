# CSS 学习总结

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


4. ### css 伪类与伪元素的区别

  _伪类(pseudo-classes)_

  + 其核心就是用来选择 DOM 树之外的信息，不能够被普通选择器选择的文档之外的元素，用来添加一些选择器的特殊效果；
  + 比如 `:hover`、`:active`、`:visited`、`:link`、`first-chid`、`:focus`、`:lang` 等
  + 由于状态的变化非静态的，所以元素达到一个特定状态时，它可能伪类的样式；当状态改变时，它又失去这个样式。
  + 由此可以看出，它的功能和 class 有些类似，但它是基于文档之外的抽象，所以叫 **伪类**

  _伪元素(pseudo-elements)_

  + DOM 树没有定义的虚拟元素
  + 核心就是需要创建通常不存在于文档中的元素
  + 比如 `::before`、`::after` 它选择的元素指定内容，表示选择元素内容之前的内容和之后内容。
  + 伪元素控制的内容和元素是没有差别的，但是它本身只是基于元素的抽象，并不存在于文档中，所以称为伪元素。用于将特殊效果添加到某些选择器上

  _伪类与伪元素的区别_

  1. **表示方法**
  + CSS2 中伪类、伪元素都是以单冒号 `:` 结束
  + CSS2.1 后规定伪类用单冒号表示，伪元素用双冒号 `::` 表示
  + 浏览器同时接受 CSS2 时代存在的伪元素单冒号写法
  + CSS2 之后所有新增的为元素（::selection），应采用双冒号的写法。
  + CSS3中，伪类与伪元素在语法上也有所区别，伪元素修改以 `::` 开头。浏览器对以 `:` 开发的伪元素也继续支持，但建议规范书写为 `::` 开头。
  
  2. **定义不同**
  + 伪类即加的类，可以添加类来达到效果
  + 伪元素即假元素，需要通过添加元素才能达到效果

  3. **总结**
  + 伪类和伪元素都是用来表示文档树以外的元素
  + 伪类和伪元素分别用单冒号 `:` 和双冒号 `::` 表示
  + 伪类和伪元素的区别，关键点在与如果没有伪元素（或伪类）
  + 是否需要添加元素才能达到效果，如果是则是伪元素，反之是伪类。

  4. **相同之处**
  + 伪类和伪元素都不出现在 源文件和 DOM 树中，也就是说 html 源文件中是看不见的。
    
  5. **不同之处**
  + 伪类其实就是在基于普通 DOM 元素而产生的不同状态，它是 DOM 元素的某一特征/状态
  + 伪元素能够创建在 DOM 树中不存在的抽象对象，俄切这些抽象对象是能够访问到的。
