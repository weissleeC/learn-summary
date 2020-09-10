### ES 6 学习

#### let const
  + 不能重复声明
  + 有块局作用域，var 是没有的
  + let 变量可修改
  + const 常量不可需修改


#### 箭头函数
> 箭头函数和普通函数没有本质的区别，更多是写法上。

```javascript
  window.onload = function() {
    alert('hello, world');
  };

  window.onload = () => {
    alert('hello, es6');
  }
```

 + 如果只有一个参数，() 可以省略
 + 如果只有一个 return, {} 可以省略
