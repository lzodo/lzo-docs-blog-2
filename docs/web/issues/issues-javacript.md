---
title: javascript
---

## 早期 js 存在的一些问题

> -   var 定义变量没有作用域
> -   不能像常规语言一样使用 class，js 原型链方式是基于很早以前的`Self`语言的
> -   没有模块化
> -   无类型检测
> -   typeof null 为什么是 object

## JS 概念性问题

### 跨域方案总结

### 事件循环 EventLoop

正常情况下一个应用程序会有一个进程，包含着非常多线程，但是浏览器时多进程的

浏览器的事件循环

-   浏览器`渲染进程`、网络进程、GPU 进程....
-   重点`渲染进程`包含`js引擎进程`、`HTTP请求进程`、`定时器触发进程`、`事件触发进程`、`GUI进程`等
-   浏览器与`NodeJS`异步任务执行原理，背后是通过`事件驱动`完成的
-   事件驱动包括`事件触发`、`任务选择`、`任务执行`
-   由特定的事件触发特定的任务（如用户 click 事件，自动的定时器事件）
-   事件循环就是在事件驱动模式中，管理和执行事件的流程
-   在事件驱动中，当有事件触发后吧，被触发的事件会按顺序，暂时存在一个队列中，等待 js 同步任务执行完成，再从队列中取出`要处理的事件处理` - 事件循环来控制什么时候取事件，或优先取的事件
    浏览器与 js
    > 浏览器多线程，只会给 js 一个线程,所有 js 是单线程
    > js 单线程，所以只能通过浏览器的多线程来执行`异步任务`
    > js 执行代码的`主线程`只有一个,`浏览器提供的JS引擎线程`
    > 此外还有`定时器线程`、`HTTP请求线程`、`Promise线程`等,来执行其他任务
    > 当开定时器或调用接口时，这些任务将分配给他们对应的线程来做，完成了再回到住线程
    > 执行步骤
-   运行首先执行主线程(将同步代码按顺序排在`执行栈`中)，当遇到 Promise 或定时器时会(保存挂起，时间到了或 ajax 的 success 等的时候)丢到任务列队(Event Quque)里,继续执行主线程的内容
-   主线程完了才会走任务列队(已完成的)的微任务(await，Promise 等)，再走宏任务(Ajax、定时器,事件绑定等),加入执行栈继续执行,宏任务完了就运行结束了
    -   微任务(micro task):`微任务队列`先，包含:Promise、new MutaionObserver()、`queueMicrotask(()=>{}) 自定义微任务`
        -   微任务不会有浏览器进线帮忙处理，类似将`.then`的代放到`主线程尾部(或叫微任务队列)`，当前循环执行，能执行的微任务`都执行完`，才会执行宏任务
        -   `new Promise(()=>{})`这里的回调会和住线程一起执行，resolve 或 reject 的时候才有微任务的 then
        -   `await` 后面的函数就相当于`new Promise`的回调，会直接执行，async 函数里 await 下面的相当于.then 的微任务
    -   宏任务(macro task):`宏任务队列`后，包含:定时器相关、Ajax、I/O ,事件监听...操作
        -   宏任务有浏览器线程帮忙异步处理，下次循环，如有结果再通过回调执行，宏任务执行完一个，都会先查看是否有微任务执行，没有才执行下一个
    -   其他：requestAnimationFrame
        -   事件周期最后是页面渲染，二页面渲染之前调用 requestAnimationFrame 回调，当前周期执行的，如果说宏任务是下次 tick 执行的话，那么就不属于宏任务
        -   但是 window.requestAnimationFrame 即使在`Promise`前面调用，也是渲染页面前最后执行，微任务顺序不定
        -   window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，时间是下次重绘之前。
-   主线程执行完后去找一个个的微宏任务，找到一个拿到主线程继续执行执行完再`不断循环`去找。。。，就叫做 Event Loop 事件循环
-   每次循环就是一个事件周期(tick)
-   每个周期结束之后浏览器才会对页面进行渲染，所以有时操作 DOM 不一定会立马刷新视图
-   视图重汇之前会执行`requestAnimationFrame`回调
-   主线程(执行栈)每次执行方法，会生成一个独有的执行环境(上下文 context)，执行结束，销毁独有环境，并从栈弹出此方法，继续下面代码
-   宏任务误差延迟问题:如果将定时器设置 100ms 后执行，首先会挂掉任务列队，100ms 时间到了,如果主线程还在执行中，定时器只能等待，同步代码越长，误差将会越大

Node 的事件循环

-   浏览器的事件循环时由 html5 定义的规范来实现的，node 的事件是有`libuv`实现的

[学习](https://www.bilibili.com/video/BV1gb4y1U7Un?spm_id_from=333.999.0.0)

### call、apply、bind

-   共同点
    -   都能改变函数内部 this 指向
-   使用

```javascript
function fu(a, b) {
    console.log(this);
}
let obj = {
    c: 10,
};

//fu函数调用call,通过原型链机制，找到fu.prototype上的call函数进行调用
//fu.call(newThis,a,b);
// 非严格模式
fu.call(); //不传，指向window(默认指向)
fu.call(null); //传null,指向window
fu.call(undefined); //传undefined ，指向window
fu.call(1, 2); //传1，指向 Number(1)
fu.call(obj, 1, 2); //传obj,指向obj

//严格模式
// fu.call() //不传，指向undefined
// fu.call(null) //传null,指向null
// fu.call(undefined) //传undefined ，指向undefined
// fu.call(1,2) //传1，指向 1
// fu.call(obj,1,2) //传obj,指向obj

//apply,只是参数列表通过数组传递
fu.apply(obj, [1, 2]);

//bind 用法也与call类似，区别是是否立即执行
fu.bind(obj, 1, 2)();
```

-   实现 call

    > 三点：修改 this、执行函数、返回行数返回值

```javascript
Function.prototype.call = function (thisArg, args) {
    // this指向调用call的对象
    if (typeof this !== "function") {
        // 调用call的若不是函数则报错
        throw new TypeError("Error");
    }
    thisArg = thisArg || window;
    thisArg.fn = this; // 将调用call函数的对象添加到thisArg的属性中
    const result = thisArg.fn(...[...arguments].slice(1)); // 执行该属性
    delete thisArg.fn; // 删除该属性,执行的fn内部this中依然存在该函数，这个删除是函数执行后才做的
    return result;
    问题: 如何去除调用函数fn时内部this对象会出现fn自己的问题;
};
```

### new 内部做了什么？

### 作用域

> 全局作用域、函数作用域、块级作用域、词法作用
> js 用的`词法作用域`:这就意味着函数的执行依赖于函数`定义的时候`所产生（而不是函数调用的时候产生的）的`变量作用域`。

### 闭包

> 闭包就是外层函数中 return 出新函数,使新函数通过外层函数在外面可以使用，新函数中可以使用外层函数中定义的变量

```javascript
function fun(n, o) {
    console.log(n, o);
    return {
        fun2: function (m) {
            return fun(m, n);
        },
    };
}

var a = fun(0); // ?0
a.fun2(1); // ?
a.fun2(2); // ?
a.fun2(3).fun2(4); // ?

var b = fun(0).fun2(1).fun2(2).fun2(3); // ?
var c = fun(0).fun2(1); // ?
c.fun2(2); // ?
c.fun2(3);
```

### Memoization

> 算法技巧叫做`记忆华搜索`，目的:`为了减少重复计算`,如递归或其他重复计算多的场景适合使用

```javascript
// 获取函数运行时间
function getTime(fn, ...args) {
    const now = Date.now();
    const result = fn.apply(null, args);
    console.log(`用时：${Date.now() - now}毫秒，结果：${result}`);
}

// 斐波那契数列
function fibonacci(n) {
    if (n === 0) return 0;
    else if (n === 1) return 1;
    else return fibonacci(n - 1) + fibonacci(n - 2);
}
getTime(fibonacci, 40);

// memoization化斐波那契数列
const fibonacciWithCache = (function () {
    // 设置缓存队列
    const cacheList = [0, 1, 1, 2];
    return function _fibonacciWithCache(n) {
        // 如果缓存队列中没有该运算结果，则计算出结果并加入缓存队列中
        if (!cacheList[n])
            cacheList[n] =
                _fibonacciWithCache(n - 1) + _fibonacciWithCache(n - 2);
        return cacheList[n];
    };
})();

getTime(fibonacciWithCache, 40);
```

-   两者对比
    用时：2830 毫秒，结果：102334155
    用时：0 毫秒，结果：102334155

### 柯里化、偏函数、Compose、Pipe

> 收集函数多次调用的参数了列表

-   作用
    -   参数复用
        -   就是利用闭包的原理，让我们前面传输过来的参数不要被释放掉
    -   提前确认
    -   延迟运行

```javascript
/**
 * 固定参数类型，函数柯里化
 * 关键利用闭包的特性保存每次调用参数个数
 * @param {*} func
 * @param  {...any} args
 * @returns
 */
const curry = (func, ...args) => {
    // 获取函数的参数个数,不调用
    const fnLen = func.length;

    //利用闭包与递归收集所有小括号参数个数,如果func参数列表用到的少，后面的小括号都是白写
    return function (...innerArgs) {
        // 每个小括号调用的参数...innerArgs加上前面调用过储存的参数，拿来与func的参数比较
        innerArgs = args.concat(innerArgs);
        // 参数未搜集足的话，继续递归搜集
        if (innerArgs.length < fnLen) {
            return curry.call(this, func, ...innerArgs); //...innerArgs至少从第二个小阔号调用开始
        } else {
            // 否则拿着搜集的参数调用func,这时开始调用func回调
            func.call(this, innerArgs);
        }
    };
};
// 测试
const add = curry((num1, num2, num3) => {
    console.log(num1);
    // console.log(num1, num2, num3, num1 + num2 + num3);
});

add(1)(2)(3); // 1 2 3 6
add(1, 2)(3); // 1 2 3 6
add(1, 2, 3); // 1 2 3 6
add(1)(2, 3); // 1 2 3 6

//============================================
function curry2() {
    // 第一次执行时，定义一个数组专门用来存储所有的参数
    var _args = Array.prototype.slice.call(arguments);

    //arguments类数组Array.prototype.slice.call(arguments)将有length的对象转数组
    console.log(arguments.length);

    // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
    var _adder = function () {
        _args.push(...arguments);
        return _adder; //第二次调用执行_adder，返回_adder给第三次执行用
    };

    // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
    _adder.toString = function (func) {
        return func(_args);
    };

    //外部回调操作
    _adder.toString1 = function (callback) {
        callback(_args);
    };

    //将内部函数返回出去
    return _adder; //第一次调用curry2执行得到_adder函数
}

//获取操作列表自定义函数操作
function func(_args) {
    console.log(
        _args.reduce(function (a, b) {
            return a + b;
        })
    );
}
curry2(1, 2, 3)(4)(9).toString(func);

curry2(
    1,
    2,
    3
)(4)(9).toString1((list) => {
    console.log(list);
});
```

### 函数式编程的纯函数与副作用

### JS 的内存管理

> 本质上讲, 内存泄露就是不再被需要的内存, 由于某种原因, 无法被释放.
> JS 中, 没隐藏了内存管理功能,有专门的内存管理接口, 所有的内存管理都是"自动"的. JS 在创建变量时, 自动分配内存, 并在不使用的时候, 自动释放. 这种"自动"的内存回收, 造成了很多 JS 开发者并不关心内存回收
> 全局变量引用的空间需要程序结束才能是否，局部变量指向的空间，需要改作用域执行完后自动释放

> 对象是否不再需要(没有任何变量指向的对象)

```javascript
let arr = [1, 2, 3, 4];
arr = null; //手动赋值null， [1,2,3,4]这时没有被引用, 会被自动回收
```

### JS 耗性能操作与时间复杂度

### 事件对象鼠标位置

> 事件对象 clientX、screenX、pageX、offsetX、layerX、movementX 的差别

### 所有浏览器 userAgent 都是 Mozilla?

> 最初浏览器 NCSA Mosaic，简称 Mosaic,
> 后面出现另外一款浏览器 Mozilla( Mosaic + Killer)，--> Mozilla 更名为 Netscape，也就是网景
> `网站管理员探测 user agent，对 Mozilla 浏览器发送含有框架的页面，对非 Mozilla 浏览器发送没有框架的页面。`
> 后面软开发了自己的浏览器，Internet Explorer --> (开始只有 Mozilla 支持框架（frame），为了快速收到含有框架的页面了)微软宣布 IE 是兼容 Mozilla，并且模仿 Netscape 称 IE 为“Mozilla/1.22“
> 后面微软与网景的浏览器大众，网景失败退出
> Netscape 居然以 Mozilla(后面更名 Firefox)的名义重生了，并且开发了 `Gecko渲染引擎`（Mozilla/5.0(Windows; U; Windows NT 5.0; en-US; rv:1.1) Gecko/20020826）
> Mozilla 后来变成了 Firefox，并自称“Mozilla/5.0 (Windows; U; Windows NT 5.1; sv-SE; rv:1.7.5) Gecko/20041108 Firefox/1.0”
> 很多浏览器使用了它的代码，每一个都将自己装作 Mozilla，而它们全都使用 Gecko。
> `Gecko 很出色,因此 user agent 探测规则变了，使用 Gecko 的浏览器被发送了更好的代码`
> linux Konqueror 浏览器`KHTML渲染引擎` 伪装 Gecko `like Gecko`(Mozilla/5.0 (compatible; Konqueror/3.2; FreeBSD) (KHTML, like Gecko))
> Opera
> 后来苹果开发了 Safari 浏览器，并使用 KHTML 作为渲染引擎
> 但苹果加入了许多新的特性，于是苹果从 KHTML 另辟分支称之为 `WebKit`
> 但它又不想抛弃那些为 KHTML 编写的页面，于是 Safari 自称为“Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/85.7 (KHTML, like Gecko) Safari/85.5”
> 再后来，谷歌开发了 Chrome 浏览器，Chrome 使用 Webkit 作为渲染引擎(后面渲染引擎改用 Blink(基于 Webkit 开发)，V8 是 js 引擎不是渲染引擎)
> 和 Safari 之前一样，它想要那些为 Safari 编写的页面，于是它伪装成了 Safari
> 于是 Chrome 使用 WebKit，并将自己伪装成 Safari，WebKit 伪装成 KHTML，KHTML 伪装成 Gecko，最后所有的浏览器都伪装成了 Mozilla
> `因为网站开发者可能会因为你是某浏览器（这里是 Mozilla），所以输出一些特殊功能的程序代码（这里指好的特殊功能），所以当其它浏览器也支持这种好功能时，就试图去模仿 Mozilla 浏览器让网站输出跟 Mozilla 一样的内容，而不是输出被阉割功能的程序代码。大家都为了让网站输出最好的内容，都试图假装自己是 Mozilla，一个已经不存在的浏览器……`

-   渲染引擎之间关系(内核也叫做排版引擎、渲染引擎、浏览器引擎等)
    -   Gecko(Firefox)
    -   KHTML(linux Konqueror)
    -   KHTML --> Webkit(Safari)
    -   KHTML --> Webkit --> Blink(chrome)
    -   Presto(欧鹏) -> 欧鹏 Presto 后期被 Blink 代替
    -   Trident(IE)
    -   EdgeHTML(Edge 浏览器) --> 后期被 Blink 代替

### 禁止通过控制台查看代码

```javascript
//https://www.mk2048.com/blog/blog_hjjahikh2hjaa.html
var forbidDebug = function () {
    try {
        (function () {
            var callbacks = [],
                timeLimit = 50,
                open = false;
            setInterval(loop, 1);
            return {
                addListener: function (fn) {
                    callbacks.push(fn);
                },
                cancleListenr: function (fn) {
                    callbacks = callbacks.filter(function (v) {
                        return v !== fn;
                    });
                },
            };

            function loop() {
                // alert('=======================================')
                var startTime = new Date();
                debugger;
                if (new Date() - startTime > timeLimit) {
                    if (!open) {
                        callbacks.forEach(function (fn) {
                            fn.call(null);
                        });
                    }
                    open = true;
                    window.stop();
                    alert("扒的话，劳烦您尊重一下劳动成果！");
                    document.body.innerHTML = "";
                } else {
                    open = false;
                }
            }
        })().addListener(function () {
            window.location.reload();
        });
    } catch (e) {}
    try {
        document.onkeydown = function () {
            var e = window.event || arguments[0];
            if (e.keyCode == 123) {
                alert("扒的话，劳烦您尊重一下劳动成果2！");
                return false;
            } else if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
                alert("扒的话，劳烦您尊重一下劳动成果2！");
                return false;
            } else if (e.ctrlKey && e.keyCode == 85) {
                alert("扒的话，劳烦您尊重一下劳动成果4！");
                return false;
            } else if (e.ctrlKey && e.keyCode == 83) {
                alert("扒的话，劳烦您尊重一下劳动成果5！");
                return false;
            }
        };
    } catch (e) {}
};
forbidDebug();

//==========================第一次输入密码查看======
function forbidDebug() {
    let intarv = null;
    try {
        (function () {
            var callbacks = [],
                timeLimit = 50,
                open = false;
            intarv = setInterval(loop, 3000);

            return {
                addListener: function (fn) {
                    callbacks.push(fn);
                },
                cancleListenr: function (fn) {
                    callbacks = callbacks.filter(function (v) {
                        return v !== fn;
                    });
                },
            };

            function loop() {
                var startTime = new Date();
                console.log(1);
                debugger;
                if (new Date() - startTime > timeLimit) {
                    if (window.prompt("请输入密码") == 1) {
                        //右键进入
                        clearInterval(intarv);
                        open = false;
                        localStorage.setItem("console", "xxxx");
                    } else {
                        if (!open) {
                            callbacks.forEach(function (fn) {
                                fn.call(null);
                            });
                        }
                        open = true;
                        window.stop();
                        alert("请您尊重一下劳动成果！");
                        document.body.innerHTML = "";
                    }
                } else {
                    open = false;
                }
            }
        })().addListener(function () {
            window.location.reload();
        });
    } catch (e) {}
    try {
        document.onkeydown = function () {
            var e = window.event || arguments[0];
            if (
                e.keyCode == 123 ||
                (e.ctrlKey && e.shiftKey && e.keyCode == 73) ||
                (e.ctrlKey && e.keyCode == 85) ||
                (e.ctrlKey && e.keyCode == 83)
            ) {
                if (window.prompt("请输入密码") == 1) {
                    clearInterval(intarv);
                    open = false;
                    localStorage.setItem("console", "xxxx");
                } else {
                    alert("请您尊重一下劳动成果！");
                    return false;
                }
            }
            // else if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
            //     alert("禁止打开控制台");
            //     return false;
            // }
            // else if (e.ctrlKey && e.keyCode == 85) {
            //     alert("禁止查看源码页面");
            //     return false;
            // }
            // else if (e.ctrlKey && e.keyCode == 83) {
            //     alert("禁止下载页面");
            //     return false;
            // }
        };
    } catch (e) {}
}
if (localStorage.getItem("console") != "xxxx") {
    forbidDebug();
}
```

### Date 详解

> **lzo-web-project\JavaScript\ECMAScript\Date\index.js**

```javascript
//===========================基本操作======================================
/**
 * ISO 8601 国际标准化组织的国际标准ISO 8601是日期和时间的表示方法（1998、2000、2004等版本）
 * GMT（格林尼治标准时间）是一些欧洲和非洲国家正式使用的时间，
 * UTC（是国际标准）这两个时间一般情况是相等的
 *
 * Thu Nov 04 2021 08:00:00 GMT+0800 (中国标准时间) 指 中国标准时间是格林尼治标准时间 + 8小时(偏移量)
 * UTC或GMT 时间00:00:00的时候，我们的时间是08:00:00
 * IOS上执行new Date('1990-01-04')会得到invilaid date。处理方法是对1990-01-04转换成1990/01/04的格式
 * Thu Nov 04 2021 10:10:10 GMT+0800 (中国标准时间) 等同于UTC时间 2021-11-04T02:10:10.000Z (T指UTC时间)
 */

//new Date 里的参数默认中国标准时间
let NewDate = new Date("2021-11-04");
console.log("===============日期基础===================");
//浏览器运行结果
console.log(new Date("2021-11-04")); //Thu Nov 04 2021 08:00:00 GMT+0800 (中国标准时间)
console.log(new Date()); //Thu Nov 04 2021 16:05:58 GMT+0800 (中国标准时间)
console.log(new Date(1636013291302)); //Thu Nov 04 2021 16:08:11 GMT+0800 (中国标准时间)
console.log(new Date("Thu Nov 04 2021 16:08:11 GMT+0800")); //Thu Nov 04 2021 16:08:11 GMT+0800 (中国标准时间)
console.log(new Date("2021-11-04T10:10:10")); //Thu Nov 04 2021 10:10:10 GMT+0800 (中国标准时间)
//node运行 (ISO 8601)
console.log(new Date("2021-11-04T10:10:10")); //2021-11-04T02:10:10.000Z

//获取当前时间(从格林威治1970.1.1 00:00:00 [国内 1970.1.1 08:00:00] 开始的毫秒数)
console.log(new Date().getTime());
//获取当前毫秒数(0-999)
console.log(new Date().getMilliseconds());
//获取一分钟后的毫秒数目
console.log(new Date(new Date() + 60000).getTime());
//获取星期
console.log(new Date().getDay());

//方法返回指定日期在月中的第几天（从 1 到 31）。
console.log(new Date().getDate(), "getDate");
console.log(new Date("2021-11-05 07:59:59").getUTCDate(), "getUTCDate"); //中国标准上午八点之前，获取到的是前一天

//getUTCHours 与 getHours
console.log(new Date("2021-11-05 08:00:00").getHours(), "getHours"); //8
console.log(new Date("2021-11-05 08:00:00").getUTCHours(), "getUTCDate"); //0

console.log("===============end===================");

//====================通过Date方法获取日期时间格式===========================

/*
 * 功能:返回时间
 * 描述:date.toTimeString         // 11:19:44 GMT+0800 (中国标准时间,24小时制)
 *	console.log(new Date(1597894083000).toLocaleString())      // 2020/8/20 上午11:26:29
 *	console.log(new Date().toLocaleTimeString()) //下午3:23:14
 *	console.log(new Date(1597894083000).toLocaleDateString())  // 2020/8/20
 */

//获取24制小时
const getTimeFromDate = (date) => date.toTimeString().slice(0, 8);
let time1 = getTimeFromDate(new Date()); // 09:46:08

console.log("========转换输出格式=============");
console.log(new Date().toLocaleString()); //2021/11/5 上午11:50:41
console.log(new Date().toLocaleTimeString()); //上午11:50:41
console.log(new Date().toLocaleDateString()); //2021/11/5

console.log(new Date().toISOString()); //转ISO标准，日期格式 2021-11-05T03:47:35.756Z
console.log(new Date().toUTCString()); //Fri, 05 Nov 2021 03:45:22 GMT (推荐)
console.log(new Date().toGMTString()); //Fri, 05 Nov 2021 03:45:22 GMT (不推荐)

console.log(new Date().toString()); //中国标准时间(默认)
console.log(new Date().toTimeString()); //中国标准时间后半部分
console.log(new Date().toDateString()); //中国标准时间日期部分
console.log("========end=============");
```

### Number

> 1.IEEE754 标准中的 “双精度浮点数” 来表示一个数字，不区分整数和浮点数。 2.有效数值默认总是 1，不保存在 64 位之中，也就是说，有效数字总是 1.xxxx 的形式，其中 xxxx 的部分保存在 64 位浮点数之中，最长可能位 52 位

#### Number.MAX_VALUE

> js number 表示的最大值 `Number.MAX_VALUE == (2**53 - 1)*(2**971)`,52 是浮点数部分 1 是整数默认部分
> IEEE754 标准的双精度 64 = `sign bit（符号1）` + `exponent（指数11）`+ `mantissa（尾数52）`

-   Number.MAX_VALUE 运算过程
    -   11 位指数为(2^0~2^10 => 2^11-1 => 2047)
    -   IEEE 标准需要 1023 偏移量(除了最高位其他全为 1 的时)
    -   默认整数位 1+52 位浮点数
        -   `1.1111111111111111111111111111111111111111111111111111 * 2^(2046 - 1023)`，[0 到 2046 次]
        -   `1.1111111111111111111111111111111111111111111111111111 * 2^1023`
        -   `11111111111111111111111111111111111111111111111111111 * 2^(1023-52)`
        -   `(2**53 - 1)*2^971`

#### Number.MAX_SAFE_INTEGER

> 最大安全整数，就是大于这个数的整数不一定可以精确表示 `Number.MAX_SAFE_INTEGER == 2**53-1`
> Number.MAX_SAFE_INTEGER+1 == Number.MAX_SAFE_INTEGER+2 //true

#### 0.1+0.2!=0.3

> 运算时将目标转成二进制进行运算，这两个转二进制都是无限循环
> 而存储结构中的尾数部分最多只能表示 53 位。为了能表示 0.1，只能模仿十进制进行四舍五入了，但二进制只有 0 和 1 ， 于是变为 0 舍 1 入 。
> 通过进制的加法运算后的二进制重新转十进制，有些情况就产生了偏差

### 进制

```javascript
/**
  * 十进制:100
  *   转二进制
  *     除二取余数，从下往上，就是二进制的从左到右
  *     (100).toString(2)
  *   转十进制
  *     (0x64).toString(10);
  *     Number(0x64)
  * 二进制（0b）:01100100

  * 八进制(0o|0 ):01 100 100 => 144 
  *  占三位 最大值1+2+4 = 7

  * 十六进制(0x):0110 0100 => 64
  *  占四位 最大值1+2+4+8 =15 
  *  颜色值六个十六进制占三个字节24位 => #ffffff => rgb(0b11111111,0b11111111,0b11111111) 所以范围是0-255,所以三个字节的颜色拥有256*256*256种颜色
  *
  *  十六位能放多大的十进制数字?
  *     (2**0)+(2**1)+(2**2)+(2**3)+(2**4)+(2**5)+(2**6)+(2**7)+(2**8)+(2**9)+(2**10)+(2**11)+(2**12)+(2**13)+(2**14)+(2**15)
  *     1 2 4 8....   = 65535
  *     或 最大四位十六进制转十进制 (0xffff).toString(10) =  = 65535
  *     4个字节32位最大能存多少  (0xFFFFFFFF).toString(10) = 4294967295 
  *     1kb = 1024字节 = 8192位 = 可以储存 1111 1111 1111 1111 ... 的这种二进制8192个
  *
  *  一个字符如何转为二进制?
  *     可以说每个字符都有对应的二进制编号
  *     基础字符在ascii表有对应的编号，比如 字符A，表中对应二进制 01000001 ,转 二进制就是65了
  *  
  *   二进制为什么可以显示位画面?
  *     屏幕画面是由一个个非常微小的像素的组成，每个像素点是有rgb三基色组成，红、绿、蓝的范围都是0-255，8位的二进制
  */
```

#### 原码、反码、补码

-   十进制转二进制原码，最高位是`符号位`,0 为正，1 为负
-   原码转反码
    -   `正数(最高位为0的) 原码就是反码`
    -   `负数(最高位为1的) 符号位不变，其余取反`
        -   如果`定义为有符号数值的类型`为四个字节，那么最高位就是第 32 位
-   反码转成补码 - `正数(最高位为0的) 原码还是补码` - `负数(最高位为1的) 补码就是在反码的基础上+1`
<!-- 二进制间运算先要转成补码，得到结果再转回原码 -->

#### 小数的二进制

> 公式: \*2 如果<1 就为 0，基数=基数；大于 1,就为 1,基数=基数-1，直至小数点后为 0

-   `0.6`
    -   0.6\*2 => 1.2 1
    -   0.2\*2 => 0.4 0
    -   0.4\*2 => 0.8 0
    -   0.8\*2 => 1.6 1
    -   0.6\*2 => 1.2 1 0.100110011001....无限循环

#### 位运算符

-   `+`
    -   在计算机中，`负数`以原码的`补码形式`表达(负数绝对值原码最高位变 1=>除最高位取反=>+1)
    -   `3 + 8`
        -   `0000 0011` + `0000 1000` = `0000 1011` => `11`;
    -   `3 + (-8)`
        -   正数补码 + 负数补码 = 负数补码 => 转原码 = 转十进制
        -   `0000 0011` + `(1000 1000 => 1111 0111 => 1111 1000)` = `1111 1011` =(负转原 减 1 取反)=> `1000 0101` = -5
    -   `3 + (-1)`
        -   `0000 0011` + `(1000 0001 => 1111 1110 => 1111 1111)` = `0000 0010` =(正转原)=> `0000 0010` = 2
-   `3 << 8` : 按位左移动 ==> 3\*(2^8)
    -   将 3 转为二进制，再整体向左移动八位(右边添加 8 个 0)
    -   程序中运算结果会将移动好的二进制再转十进制显示，`(3 << 8).toString(2)` 可以还原
    -   (3 << 8) == 0011 0000 0000
-   `3 >> 8` : 按位右移动,,则高位补 0,若为负数,则高位补 1（>>> 无符号右移，不论正负最高位都补 0）
    -   将 3 转为二进制，再整体从右边删除八位
    -   (3 >> 1) == 0001
-   `|`: 按位或
    -   相同位相加 不为 0 则为 1
-   `&`：按位与
    -   相同位都为 1 则为 1
-   `^`：按位异或
    -   相同为零不同为一
-   `~5`:按位取反

    -   规则 `转数值原码` => `转反码` => `转补码` => `补码全部取反`(**~关键作用步骤**) ==> `转反码` => `转原码`(最终值得原码)
        -   `~5`:0000 0101(原、反、补) => 1111 1010(补码取反) => 1111 1001(减 1 变反码) => 1000 0110(变原码) => -6
    -   位数的运算

        -   8 位 最大值是 255 => 1+2+4+8+16+32+64+128 => 2^0 ~ 2^7 => 2^8 - 1 的结果
        -   32 位 最大值是 2^0 ~ 2^31 值之和 => 2^32 -1
        -   2^32 - 1 的 4294967295 是 32 位能表示的最大值
        -   2^31 的 2147483648 的大小是 32 位中最小的（1 31 个 0）

    -   操作数被转换为 32 位二进制表示（0 和 1）。超过 32 位的数字将丢弃
        -   范围内 任何数字 x 的运算结果都是`-(x + 1)`
            -   上述 2^31 的 2147483648 涉及到 32 位了（大于等于它的数值在~中都不存在符号了）,不能用公式
            -   大于等于 2147483648 的数值 x,~x => 4294967295 - x;
            -   总结
                -   达到最高 32 位的正数 与 ~最终结果之和要等于 4294967295
                -   未达到最高 32 的正数 与 ~最终结果之和要等于 -1
                -   大于等于 -2147483648 的负数 与 ~最终结果之和要等于-1
                -   小于 -2147483648 的负数 与 ~最终结果之和要等于 -4294967297

### js 代码整洁之道

[暂时参考](https://zhuanlan.zhihu.com/p/159458364)
[暂时参考](https://www.cnblogs.com/wenxinsj/p/14646550.html)
[暂时参考](https://www.jianshu.com/p/fb4409d8ace2)

```javascript
/*
1.文件、文件夹名，横杠分词
	序号，下划线
2.组件，大驼峰
3.类名，横杠分词，多层级双横杠
4.函数名、普通变量名，小驼峰
5.关键字、变量、标点符号（除 括号 和 引号）后加空格
*/
```

### 断点调试

> 在某一行打下断点,当浏览器执行到这一行时，程序暂停，可以观察限制，代码状态，变量值等，在通过下一步下一步查看代码走向以及值的变化

## JS 功能性问题

### js 判断服务器图片是否存在

```javascript
var ImgObj = new Image(); //判断图片是否存在
ImgObj.src = "xxxx.png";
ImgObj.onload = function () {
    console.log("图片存在");
};
ImgObj.onerror = function () {
    console.log("图片不存在");
};
```

### js 插入样式

```javascript
var style = "<style>#print .linetow{text-align:center}</style>";
var ele = document.createElement("div");
ele.innerHTML = style;
document.getElementsByTagName("head")[0].appendChild(ele.firstElementChild);
```

### 类数组转数组

```javascript
function getArray() {
    console.log(arguments);
    //1. 原理是数组的slice()方法可以从已有数组中返回一个新数组，它可以接受两个参数arr.slice(start,end),如果不传参将返回原数组的一个副本，但该方法不会修改原数组，而是返回截取的新数组
    console.log(Array.prototype.slice.call(arguments));
    //2. splice(start,count,item) 改变原数组
    console.log(Array.prototype.splice.call(arguments, 0));
    //3. Array.from(arguments)
    console.log(Array.from(arguments));
    //4. Array.apply(null, arguments)
    console.log(Array.apply(null, arguments));
    //5. [].concat.apply([], arguments)
    console.log([].concat.apply([], arguments));
    //6. 循环遍历类数组对象，push到新创建的数组对象里
}

getArray(1, 2, 3);
```
### 根据对象某属性去重
> 通过reduce,判断list列表每一项的a属性,是否含有与next中a相等的，如果有不添加next，否则添加next
```javascript
let objList = [
    { a: 3, b: 2 },
    { a: 1, b: 2 },
    { a: 2, b: 2 },
    { a: 3, b: 2 },
];
console.log(objList.reduce((list,next)=>list.some((item)=>item["a"]==next["a"])?list:[...list,next],[]));
```
### 数组扁平化

```javascript
// 数组扁平化
let arr = [1, 2, [3, 4], 5, [8, [9, 10]]];
// 1. arr.flat默认两层 -> Infinity不限制层数
console.log(arr.flat(Infinity));
// 2. toString
console.log(
    arr
        .toString()
        .split(",")
        .map((item) => Number(item))
);
// 3. reduce
const flatten = (array) =>
    array.reduce((acc, cur) => {
        // console.log(acc, cur);
        return Array.isArray(cur) ? [...acc, ...flatten(cur)] : [...acc, cur];
    }, []);
console.log(flatten(arr));
// 4. xxxx
```

### Blob

> Blob(二进制大对象)对象是一个用来包装二进制文件的容器，File 继承于 Blob
>
> **IE9-浏览器不支持**

#### Blob 创建

```javascript
var myBlob = new Blob([1, 2, 3], { type: "text/plain" });
console.log(myBlob);
console.log(myBlob.size);
console.log(myBlob.type);
// blob.slice 大文件切割返回小 blob

// 通过input FileList获取文件Blob
```

#### Blob 下载

```javascript
<script type="text/javascript">
    //创建XMLHttpRequest对象
    var xhr = new XMLHttpRequest();
    //配置请求方式、请求地址以及是否同步
    xhr.open('POST', '/sfwanshengjie/mp4/shipin1.mp4', true);
    //设置请求结果类型为blob
    xhr.responseType = 'blob';
    //请求成功回调函数
    xhr.onload = function(e) {
        if (this.status == 200) {
            //获取blob对象
            var blob = this.response;
            console.log(blob);
            //获取blob对象地址，并把值赋给容器
            document.getElementById("video").src = URL.createObjectURL(blob);
        }
    };
    xhr.send();
</script>
```

#### Blob 转地址

```javascript
// 把blob转化成当前页面的一个data:image/jpeg;base64内存地址
let fr = new FileReader();
fr.readAsDataURL(file | blob);
fr.onloadend = function (e) {
    let base64 = e.target.result;
    console.log(base64);
};

// 把blob转化成当前页面的一个blob:xxxx内存地址
let src = window.URL.createObjectURL(file | blob); // 这个方法也可以传一个file
console.log(src);
img.src = src;
```

-   URL.createObjectURL(file|blob) 可以获取当前文件的一个内存 URL
    -   得到 blob:http://127.0.0.1:5500/xxxxxxxx 格式地址，不是 base64 的
    -   比 base64 地址小节约空间
    -   立即执行的同步生成，FileReader 需要在 onload 下异步获取 base64
    -   URL.revokeObjectURL 释放该地址
    -   data://URL 会对内容进行编码。blob://URL 只是对浏览器存储在内存中或者磁盘上的 Blob 的一个简单引用

### JS 获取 base64 的方式

> base64 是二进制数据的一个编码格式

-   JS 通过 FileReader 获取 base64

```javascript
let fileReader = new FileReader();
fileReader.readAsDataURL(file | Blob); // base64形式 读取图片
fileReader.onload = (e) => {
    //图片读取完成
    console.log(e.target.result);
};
```

-   JS 通过 canvas 获取 base64

```javascript
// 这个image就是输入
// 除了new，也可以直接取页面上的标签
var image = new Image();

image.onload = function () {
   var w = image.width;
   var h = image.height;
   var canvas = document.createElement('canvas');
   var ctx = canvas.getContext("2d");
   canvas.width = w;
   canvas.height = h;
   ctx.drawImage(image, 0, 0, w, h);
   // 可以在这里添加水印或者合并图片什么的
   ...
   // 把画布的内容转成base64，这个就是输出
   var base64 = canvas.toDataURL('image/jpeg'，0.1);//参数2压缩比例
   console.log(base64)
}
// 这个src可以是本地路径，服务器图片地址，也可以是上面fileReader的base64
image.src = "xxx.jpg";
```

### 图片上传

[xxxx](https://www.cnblogs.com/pengdt/p/12037986.html)

-   多选:multiple
-   指定类型:accept="image/\*"
-   类数组 input.flies 返回一个 FileList 选择的图片数据
-   capture 调用摄像头

```html
<input id="uploadFile" type="file" accept="image/*" />
<button id="submit" onclick="uploadFile()">上传文件</button>
```

#### FileReader

> FileReader 是用来读取内存中的文件的 API，支持 File 和 Blob 两种格式。

-   FileReader.readyState
    -   0：EMPTY/还没有加载任何数据
    -   1：LOADING/数据正在被加载
    -   2：DONE/已完成全部的读取请求
-   FileReader.result
-   FileReader.error

```javascript
// readAsArrayBuffer(file) :按字节读取文件内容，结果用ArrayBuffer对象表示
// readAsBinaryString(file) :按字节读取文件内容，结果为文件的二进制串
// readAsDataURL(file) :读取文件内容，结果用data:url的字符串形式表示
// readAsText(file,encoding) :按字符读取文件内容，结果用字符串形式表示
// abort() :终止文件读取操作
// 事件
// onloadstart 当读取操作开始时调用
// onprogress 在读取数据过程中周期性调用
// onabort 当读取操作被中止时调用
// onerror 当读取操作发生错误时调用
// onload 当读取操作成功完成时调用
// onloadend 当读取操作完成时调用，无论成功，失败或取消

let fileReader = new FileReader();
fileReader.readAsDataURL(file); // base64形式 读取图片
fileReader.onload = (e) => {
    //图片读取完成
    console.log(e.target.result);
};
//或
let fileReader = new FileReader();
fileReader.readAsDataURL(file);
fileReader.addEventListener("load", function () {
    // 读取完成
    let res = fileReader.result;
    // res是base64格式的图片
});
```

#### FormData

> 用一些键值对来模拟一系列表单控件：即把 form 中所有表单元素的 name 与 value 组装成 一个 queryString

```javascript
let formData = new FormData();
//各种方式给formData添加文件数据
formData.set(fieldName, file);

/*
    name:属性名
    value:属性值，在我们这里则指 file 数据
    filename:当第二个参数为 file 或 blob 时，告诉服务器的文件名。Blob 对象的默认文件名是“blob”。File 对象的默认文件名 是文件的文件名。
*/
formData.append(name, value, filename);
```

#### 上传

```javascript
let config = {
    headers: {
        "Content-Type": "multipart/form-data",
    },
};
axios
    .post("url/load", formDate, config)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
```

#### 大文件上传

    -	file继承Blob利用Blob的slice方法将文件切片
    -	确定每片大小
    -	获取总大小 (file.size)
    -	片段数量 (Math.ceil(总大小/每片大小))
    -	定义一个偏移量决定每次调接口传哪一段，每次调用便宜量++

#### Canvas 图片上传

    -	通过 canvas.toDataURL('image/jpeg') 上传base64上传

### 字符串编码

```javascript
/*
ASCII 
ASCII  使用一个字节表示一个字符(8bit)，不使用最高位
二进制  0000 0000    十进制   0         
        0111 1111            127

最多只能表示128个字符
数字与编码存在着对应关系chr 和 ord 可查看对应关系

-----------------------------------------------
latin1(ISO-8859-1)
向下兼容ASCII ,启用最高位
二进制曾 1000 0000    十进制  128
        1111 1111            255

最多能表示255个字符

-------------------------------------------------
Unicode(国际码) 表示更多字符,大多数国家的文字都有一个对应编码
(1) Unicode 与 latin1无关,前128兼容ASCLL
(2) 通过连个字节来表示更多的自己付 最多可达16位
(3) 为了让计算机知道后面的两个字节代表的是一个字符,还是两个字符,所以所有字符都有两个字节代替,不够就补0(比较浪费空间)
(4)如果将一个字符的16位当做两个8位处理就会造成乱码(如:x.encode('utf8')  得到的结果 decode('gbk‘)情况)

(5) 基于浪费空间问题于是产生很多Unicode 的编码方式如:  UTF-8 、 UTF-16、GBK、BIG5 或 UTF-32等了


Unicode 的编码方式不同编码方式以不同规则表示
GBK: 国标扩，规定汉子占两个字节,用于简体中文
BIG5:繁体中午
UTF-8:统一编码 汉字占三个字节
-------------------------------------------------
*/
```

### 滚动条动态底部

```javascript
//变化的时候
this.$nextTick(() => {
    this.$refs.overflow容器.scrollTop = this.$refs.overflow容器.scrollHeight;
});
```

### 指定时间触发定时器

> 通过一个定时器找到指定时与分，关闭定时器，执行内容，定义第二个 24 小时执行一次的定时器

```javascript
// 固定时间执行定时器
// 利用定时器监听到某个时间点时触发另外一个定时器

const ListenerTime = 1000 * 60 * 2; //监控的执行间隔时间   每小时
var StartTime = 1000 * 60 * 60 * 24; //正式启动后的执行间隔时间   每天 24小时

var RunInterval,
    runTime,
    hh = 11,
    mm = 34;

/**
 *	启动的入口
 */
function run() {
    console.log("正在启动监听....");
    //直接符合条件不开定时器
    if (runCode()) {
        return false;
    }

    runTime = setInterval(function () {
        runCode();
    }, ListenerTime);
}

/**
 * run定时器中要做的事情
 */

function runCode() {
    console.log(
        "监听中....第" +
            getTime("hh") +
            "小时" +
            ",当前是第 " +
            getTime("mm") +
            " 分," +
            getTime("ss") +
            " 秒"
    );
    if (getTime("hh") == hh) {
        //当系统时间是中午12点启动，如果是特定的其他时间可按需改动
        if (getTime("mm") == mm || getTime("mm") == mm + 1) {
            runTime && clearInterval(runTime); //清除监控的定时器
            console.log(
                "找到执行时间,当前过 1000 * 60 * 60 * 24 毫秒再次执行,已关闭监听"
            );
            StartInterval(); //启动要执行的方法
            return true;
        }
    }
}

/**
 *  到监控时间后所要启动的定时器
 */
function StartInterval() {
    main();
    RunInterval = setInterval(function () {
        main();
    }, StartTime);
}

/**
 *  主要执行的函数内容
 */
function main() {
    console.log(new Date() + "正式执行");
}

/**
 *	关闭主要执行的定时器
 * 	需要额外调用来关闭主程序
 */
function closeInterval() {
    clearInterval(RunInterval);
    console.log("已关闭执行程序");
}

/** 获取系统时间的方法  **/

/**
 *
 * @param {Object} time  想要获取时分秒的判断参数
 * YY 年;MM 月;DD 日;hh 时;mm 分;ss 秒;
 *
 * return   返回类型为Number型,若参数正确，返回-1
 */
function getTime(time) {
    var datetime = new Date();
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1;
    var day = datetime.getDate();
    var Hours = datetime.getHours();
    var Minutes = datetime.getMinutes();
    var Seconds = datetime.getSeconds();

    switch (time) {
        case "YY":
            return year;
            break;
        case "MM":
            return month;
            break;
        case "DD":
            return day;
            break;
        case "hh":
            return Hours;
            break;
        case "mm":
            return Minutes;
            break;
        case "ss":
            return Seconds;
            break;
        default:
            return -1;
    }
}

//模拟启动
run();
```

### requestAnimationFrame

> 请求动画的 API `requestAnimationFrame` 由系统来决定回调函数的执行时机。
> 根据屏幕刷新率执行下一次
> 它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次

```javascript
var progress = 0;
//回调函数
function render() {
    progress += 1; //修改图像的位置
    console.log(progress);
    if (progress < 100) {
        //在动画没有结束前，递归渲染
        window.requestAnimationFrame(render);
    }
}
//第一帧渲染
window.requestAnimationFrame(render);
```

-   大数据操作
> 如何操作优化注意的用掉的数据删除，避免下次又要查，和找到目标后直接跳出

```javascript
setTimeout(() => {
    // 插入十万条数据
    const total = 1000000;
    // 一次插入的数据
    const once = 20;
    // 插入数据需要的次数
    const loopCount = Math.ceil(total / once);
    let countOfRender = 0;
    const ul = document.querySelector("ul");
    // 添加数据的方法
    function add() {
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < once; i++) {
            const li = document.createElement("li");
            li.innerText = Math.floor(Math.random() * total);
            fragment.appendChild(li);
        }
        ul.appendChild(fragment);
        countOfRender += 1;
        loop();
    }
    function loop() {
        if (countOfRender < loopCount) {
            window.requestAnimationFrame(add);
        }
    }
    loop();
}, 0);
```

#### 特点

-   CPU 节能：页面隐藏(不可见)时停止

### iframe 详细

```html
<iframe id="iframe"></iframe>
```

```javascript
let iframe = document.getElementById("iframe");
```

```javascript
/*
1.iframe引入一些网站需要关闭 高级 > 隐私设置和安全性 > 内容设置 > Cookie > 阻止第三方Cookie
2.引入不同源页面，无法正常操作子页面
    跨域概念:协议与域名相同，就不算跨域
    跨域顶多只能实现页面跳转window.location.href.
    通过postMessage父子页面消息传递
        父页面（子）
            iframe.contentWindow.postMessage('要发送的数据'或{msg: 'data to parent'},'*');
            参数
                data：postMessage传递进来的值
                origin：发送消息的文档所在的域
                source：发送消息文档的window对象的代理
        子页面接收（父）
            window.addEventListener("message",(data)=>{console.log(data)}, false);
3.同源情况下父页面操作子页面，或获取子页面消息数据
    子页面Win:iframe.contentWindow || window.frames['framesName']
    子页面Docs:iframe.contentDocument.getElementById("xxxxx")
4.同源情况下子页面操作父页面，或获取父页面消息数据
    子页面
        操作父页面:window.parent.ifrmLoaded('window.parent.ifrmLoaded');
        多层iframe最顶层:window.top
    父页面接收
        function ifrmLoaded(data){
            console.log('接收子页面操作'+ data)
        }
5.iframe的事件操作
    iframe.onload=()=>{}; //子页面加载完成后执行

6.iframe标签常用属性
    iframe常用属性:
        1.frameborder:是否显示边框，1(yes),0(no)
        2.height:框架作为一个普通元素的高度，建议在使用css设置。
        3.width:框架作为一个普通元素的宽度，建议使用css设置。
        4.name:框架的名称，window.frames[name]时专用的属性。
        5.scrolling:框架的是否滚动。yes,no,auto。
        6.src：内框架的地址，可以使页面地址，也可以是图片的地址。
        7.sandbox: 对iframe进行一些列限制，IE10+支持
        8.allowfullscreen：是否允许全屏
        9.allowtransparency：是否允许设置透明
7.安全措施
    防止自己网页被iframe
        1. 手动跳转
            if(window != window.top){
                window.top.location.href = correctURL;
            }
        或
            if (top.location.host != window.location.host) {
            　　top.location.href = window.location.href;
            }
        2.  响应头 X-Frame-Options
            X-Frame-Options是一个相应头，主要是描述服务器的网页资源的iframe权限。
                DENY：当前页面不能被嵌套iframe里，即便是在相同域名的页面中嵌套也不允许,也不允许网页中有嵌套iframe
                SAMEORIGIN：iframe页面的地址只能为同源域名下的页面
                ALLOW-FROM：可以在指定的origin url的iframe中加载
        3. 响应头 Content Security
            比较强大。。。。。
            Content-Security-Policy: default-src 'self'
            。。。各种配置
    iframe别人网站
        1.sandbox
            是h5的一个新属性，就是用来给指定iframe设置一个沙盒模型，限制iframe的更多权限.
            allow-forms	允许进行提交表单
            allow-scripts	运行执行脚本
            allow-same-origin	允许同域请求,比如ajax,storage
            allow-top-navigation	允许iframe能够主导window.top进行页面跳转
            allow-popups	允许iframe中弹出新窗口,比如,window.open,target="_blank"
            allow-pointer-lock	在iframe中可以锁定鼠标，主要和鼠标锁定有关
            <iframe sandbox="allow-forms allow-same-origin" src="..."></iframe>
*/
```

### 页面滚动到顶部

```javascript
/*
 * 功能:快速向上滚动至顶部
 * 描述: scrollTo(x,y) 通过横纵坐标位置
 */
const scrollToTop = () => {
    const t = document.documentElement.scrollTop || document.body.scrollTop; //获取滚动高度
    if (t > 0) {
        window.requestAnimationFrame(scrollToTop); //浏览器自动判断动画完成之后执行回调
        window.scrollTo(0, t - t / 8);
    }
};
scrollToTop();
```

### 数字转大写

```javascript
let digitUppercase = (n) => {
    var fraction = ["角", "分"];
    var digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
    var unit = [
        //unit[2]均分unit[1], 如:佰元、佰万、佰亿
        ["元", "万", "亿"],
        ["", "拾", "佰", "仟"],
    ];

    //算前:判断是否为负数
    var head = n < 0 ? "欠" : "";
    n = Math.abs(n);

    //算小数点后
    var s = "";
    for (var i = 0; i < fraction.length; i++) {
        //角位置 n*10 => 移一位小数 => floor去小数 => 取除10余数 => 拼接上角
        //分位置 m*10*10 => 移两位小数=> floor去小数 => 取除10余数 => 拼接上角分
        s += (
            digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]
        ).replace(/零./, "");
    }
    //是否有角与分
    s = s || "整";

    //算整数部分
    n = Math.floor(n);
    //遍历 ["元", "万", "亿"]
    for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = "";
        //遍历 ["", "拾", "佰", "仟"]
        for (var j = 0; j < unit[1].length && n > 0; j++) {
            //  digit[4]        ""
            //  digit[3]        拾
            //  digit[5]        佰
            //  digit[6]        仟
            //  结束循环添加单位，p保存到s中，进入下一循环
            //  digit[8]        仟
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][i] + s;
    }
    return (
        head +
        s
            .replace(/(零.)*零元/, "元")
            .replace(/(零.)+/g, "零")
            .replace(/^整$/, "零元整")
    );
};

console.log(digitUppercase(86534.63));
```

## 请求与响应

### 响应参数

-   **X-Frame-Options**：iframe 权限参数
-   **Content-Security-Policy**:服务器通过发送一个 CSP 头部，来告诉浏览器什么是`被授权执行的`与`什么是需要被禁止的`

### 请求参数
