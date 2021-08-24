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

  // #8 块作用域问题
  let aBtn = document.getElementsByTagName("input");
  // for 这里如果用了 var， i 值一直是最大值，改用 let 就正常循环
  for (let i = 0; i < aBtn.length; i++) {
    aBtn[i].onclick = function () {
      console.log(i);
    };
  }

  // #9 箭头函数数组排序
  {
    let arr = [12, 8, 37, 26, 9];
    arr.sort((n1, n2) => n1 - n2);
    console.log(`#9 数组排序${arr}`);
  }

  // #10 构造函数使用箭头函数
  {
    class Json {
      constructor() {
        console.log(this);

        this.a = 12;

        this.fn = () => console.log(this.a);
      }
    }

    let json = new Json();
    json.fn();
  }

  // #11 Map 映射
  {
    let grades = [68, 53, 12, 98, 65];
    let result = grades.map((item) => (item >= 60 ? "及格" : "不及格"));
    console.log(result); // ["及格", "不及格", "不及格", "及格", "及格"]
  }

  // #12 reduce
  {
    let grades = [68, 53, 12, 98, 65];
    let result = grades.reduce((tmp, item, index) => {
      console.log(`第${index}次是：${tmp}：${item}`);
      // 求和
      // return tmp + item;

      // 求平均数
      if (index === grades.length - 1) {
        return (tmp + item) / grades.length;
      } else {
        return tmp + item;
      }
    });
    console.log(result);
  }

  // #13 filter
  {
    // 筛选出偶数
    let grades = [68, 53, 12, 98, 65];
    let result = grades.filter((item) => item % 2 == 1);
    console.log(`#13 ${result}`); // 68,12,98
  }
}
