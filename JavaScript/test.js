{
  // # 1
  [1, 2, 3, 4, 10].map(parseInt);

  [1, NaN, NaN, NaN, 4];

  // # 2
  typeof typeof Symbol(123); // string

  // # 3
  function minArgs(first, second = "b") {
    console.log(first === arguments[0]);
    first = "c";
    second = "d";
    console.log(first === arguments[0]);
    console.log(second === arguments[1]);
  }

  minArgs("x"); // true false false

  // # 4
  var add = function (m) {
    var temp = function (n) {
      return m + n;
    };
    temp.toString = function () {
      return m.toString(2);
    };
    return temp;
  };
  // console.info(add(3)(4)(5));  // type error

  // #5 防抖
  function debounce(fu, wait) {
    var timer;

    return function () {
      var context = this;
      var args = arguments;

      clearTimeout(timer);

      timer = setTimeout(function () {
        fu.apply(context, args);
      }, wait);
    };
  }

  // #6 原生创建节点
  {
    let root = document.getElementById("root");
    let fragment = document.createDocumentFragment();
    let browsers = [
      "Firefox",
      "Chrome",
      "Opera",
      "Safari",
      "Internet Explorer",
    ];

    browsers.forEach(function (browser) {
      let p = document.createElement("p");
      p.textContent = browser;
      fragment.appendChild(p);
    });
    root.appendChild(fragment);
  }

  // #7 this 指向问题
  let name = "lee";
  let func = {
    name: "tom",
    sayHi: function () {
      console.log(this.name);
    },
  };

  func.sayHi();
}
