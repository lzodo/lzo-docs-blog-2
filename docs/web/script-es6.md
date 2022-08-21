---
title: ECMAScript
---

[![	](../../static/img/web-es6-1.webp)](https://juejin.cn/post/6844903959283367950#heading-12)

## 变量、复制

### let/const

- let 相对 var
  - 没有变量提升，不能先使用后定义、
  - 不能重复定义
  - 存在块级作用域
- 优先使用 const，`必须有初始化值`，除非值一定需要改变
  - const 只是指向的对象不能修改，可以改`对象属性`
  - 相当于只能修改内容，不能修改内存地址
- let/const 有 if 和 for 的块级作用域

- 作用域:变量在什么范围内是可用的
  - 块级作用域:{}、if(){}、for(){}...
    - 暂时性死区 TDZ(如果块中定义了 let 或 const，区块中对它们声明的变量形成封闭作用域，即使外面有声明同样的变量，快内申明之前用都报错)
    - 即使有块级作用域，外面 let 过的变量，{}内部也不能重复定义,外面 var 的，就可以
    - 同一个块内，无论 let 还是 var 都不能定义相同的变量
  - es5 以前 var `if和for`都没有块级作用域，很多东西都需要`借助function`的作用域来解决问题
  - var for 循环的异常
    - 就是因为 var 没有块级作用域， 变量 i 一直被改变，不会保存在作用域中,事件操作用的时候 i 就是最后一次的值了
    - `闭包`(function(i){})(i)可以解决问题是因为`函数是有作用域的`,传入的时候就形参赋值了

## 运算符

### ??

> 非空运算符，只判断变量是否为`null/undefined`, `||`可以判断变量是否为 null/undefined/false/0/""等

```javascript
//?? 如果前面变量为null或undefined则返回??后面的值
null??1	 //1
0??1	 //0
// 非空判断
if((value??'') !== ''){
  //...
}

//??=
a ??= b -> a = (a??b)

//?. 可选链操作符
// const host = config && config.db && config.db.host;
// 查找config下的db下的host属性，如果那一层没有，直接返回undefined
const host = config?.db?.host;
console.log(host)

obj?.prop // 对象属性是否存在
obj?.[expr] // 同上
func?.(...args) // 函数或对象方法是否存在

//?: 三元运算符
```

###

## 函数

函数新增
1、形参可以有默认值，
2、形参支持解构
3、剩余参数

```javascript
let user = {
  name: "123",
  age: 100,
};

function fn({ name, age }, a, b = 10, ...c) {
  console.log(name, age); // 123 100
  console.log(a); // 1
  console.log(b); // 2
  console.log(c); // [3,4]
}

fn(user, 1, 2, 3, 4);
```

### 箭头函数

- `const fun = a => 123`
- `const fun = () => 123`
- 一个参数可胜利(),只有返回值可以省略{}
- `this`:箭头函数 this 是最近作用域的 this，向外层作用域一层层查找

## 数组/json

- 数组
  - 数组遍历
    - for 循环
    - for in:`for(let i in arr)` ，i 为索引
    - for of:`for(let item of arr)`，item 为每一项
  - 扩展运算符 [...arrList] 展开数组 ，得到一个新的数组（console.log({...obj})）
  - `filter`
    - filter 的回调必须返回一个`bool`值，`true`自动将这一项`返回`，否则`过滤`掉这一项
    - 用`新数组`接收
  - `map`
    - 每一项进行个性化操作后返回，生成`新数组`,改变`item`会音响原数组
  - `reduce`:对数组所以项进行汇总
    - preVal 为`前一次return`的值，`第一次`默认为`参数二传入`的值，这里是 0
    ```javascript
    let arr = [1, 2, 3, 4];
    let total = arr.reduce((preVal, item) => {
      return preVal + item;
    }, 0);
    ```
  - `数组扁平化`并去重
    - **...new Set([1,2,3,4,[4,5,6,7],7,8,9].flat(Infinity))**

## 字符串

模板字符串 `xxx${number}xxx`
字符串方法

```javascript
let str = "123abc456";
console.log(str.includes("abc")); // true
console.log(str.startsWith("123")); // true
console.log(str.endsWith("456")); // true
```

## 面向对象

### 对象

-   对象增强写法
    -   name:name -> name
    -   run:function(){} -> run(){}
    -   表达式 key
    ```javascript
    let name = 'lzo'
    let obj = {
        name,
        fun() { },
        [name]: name
    }
    console.log(obj) // {name: 'lzo', lzo: 'lzo', fun: ƒ}
    ```
-   对象方法
```javascript
let user = {
    name: "123",
    age: 100
}
let objAssign = Object.assign({},user)  // 合并 {} 和 user，实现浅拷贝

let objCreate =  Object.create(user)// 创建一个对象，并将对象 proto 指向参数对象
                 Object.create(null)// 创建一个没有原型的对象

```

## Promise

## generator

## 模块
vue-vue2.md

## class
语法糖

## Map and Set

### Set

> 类似于数组的数据结构，成员值都是唯一且没有重复的值

## 常用功能

结构赋值

```javascript
// 数组
let arr = [1, 2, 3, 4];
let [a, b, c = 100, d, e = 150] = arr;
console.log(c); // 10
console.log(e); // 150
c = 10;
console.log(c); // 10
console.log(arr); // 还是 [1,2,3,4]

// 对象
let user = {
  name: "123",
  age: 100,
};
let { name, age: age2 } = user;
console.log(age2); // 100
console.log(name); // 123
name = 456;
console.log(name); // 456
console.log(user); // 不变
```
