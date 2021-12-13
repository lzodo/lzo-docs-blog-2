---
title: js工具函数
---

### Array相关

#### sort 计算最大元素

```javascript
/*
 * 功能:获取数组中的最大数字
 * 描述:sort 返回值(b - a)大于0 则交换元素
 */
const maxItemOfArray = (arr) => arr.sort((a, b) => b - a)[0];
let maxItem = maxItemOfArray([3, 5, 12, 5]); //12
```



#### reduce 计算平均值

```javascript
/*
 * 功能:求给定数字的平均值
 * 描述:...args 收集所有参数类数组, 收集剩余参数 show(a,b,...args)
 *      args.reduce((a初始值, 或者计算结束后的返回值, b当前元素) => a + b, 传递给函数的初始值)
 */
const averageOf = (...args) => args.reduce((a, b) => a + b, 0) / args.length;
let average = averageOf(5, 2, 4, 7); // 4.5
```

#### every 判断所有元素相等

```javascript
/*
 * 功能:检查数组的所有项是否相等
 * 描述:方法用于检测数组所有元素是否都符合指定条件 ,一个不满足，则返回 false
 */
const areAllEqual = array => array.every(item => item === array[0]);
let check1 = areAllEqual([5 ,3, 5]); // false
```

#### filter 清除空元素

```javascript
/*
 * 功能:从数组中删除false值，包括false，undefined，NaN，empty
 * 描述:arr.filter 返回检测通过(返回值为true)的元素
 */
const rmFalseVal = arr => arr.filter(item => item);
let arr = rmFalseVal([3, 4, false, "", 5, true, undefined, NaN, "", "0", 0]); // [3, 4, 5, true, "0"]
```

#### **new Set()** 数组去重

```javascript
/*
 * 功能:从数组中删除重复的项
 * 描述:Set 结构成员不会添加重复的值
 */
const removeDuplicatedValues = array => [...new Set(array)];
let arr = removeDuplicatedValues([5, 3, 2, 5, 6, 1, 1, 6]); // [5, 3, 2, 6, 1]
```

#### 删除数组指定元素

```javascript
/*
 * 功能:删除数组中指定元素
 */
const removeAaaryObj = (arr, el) =>{
    let array = [];
    arr.map((item,i) => {
        if(item != el){
            array.push(item);
        }
    })
    return array;
}
let arrayre = [1,2,3,4,4,'ab','ab','cad'];
removeAaaryObj(arrayre,'ab')
```



### String

#### 指定字符替换

```javascript
const findAndReplace = (string, old, newchar) => string.split(old).join(newchar);
let result = findAndReplace('I like banana', 'a', 'g'); // I like apple
```

#### 指定字符串两边添加

```javascript
const findAndAdd = (s, o, l, r) => s.replace(new RegExp(o,'g'),(item)=> `${l}${item}${r}`)
let result = findAndAdd('I like banana', 'a', '<','>'); // "I like b<a>n<a>n<a>"
```

#### 反转字符串

-   通过数组**reverse**

```javascript
const reverseString = str => [...str].reverse().join("");
let a = reverseString('Have a nice day!'); // !yad ecin a eva
```

#### 首字母大小

```javascript
/*
 * 功能:将字符串中所有单词的第一个字母大写
 * 描述: \b 匹配单词开头或结尾 ，/\b[a-z0-9]/g 匹配单词-> 取一位 ->所有单词
 */
const capitalizeAllWords = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());
let claw = capitalizeAllWords("i love reading book"); // I Love Reading Book
```

#### 指定规则分割字符串

```javascript
/*
 * 功能:字符串转换为单词数组
 * 描述:split(regexp) 只要匹配的字符都当做切割符号
 */
const toWords = (string, pattern = /[^a-zA-Z-]+/) => string.split(pattern);
let words = toWords('I 5 5 wa5nt to be55 come a great false nan programm5er');
```

#### 清除字符串两边空格

```javascript
const trim = (str) => str.replace(/(^\s*)|(\s*$)/g, "");
```

#### 判断字符串JSON

```javascript
/*
 * 功能:字符串是否是有效的JSON
 */
const isValidJSON = str => {
	if (typeof str == 'string') {
        try {
            // JSON.parse(str) 会通过 123 "123" 数组
            var obj = JSON.parse(str);
            // 数组 '[object Array]'
            if(Object.prototype.toString.call(obj) == '[object Object]'){
                return true;
            }else{
                return false;
            }
        } catch(e) {
            return false;
        }
    }
};
let ivjson1 = isValidJSON('1'); // false
let ivjson2 = isValidJSON('{"title": "javascript", "price": 14}'); // true
let ivjson3 = isValidJSON('{"title": "javascript", "price": 14, subtitle}'); // false
```



### Math相关

#### 指定范围随机数

>   通过最小范围 + 最大减最小所得到的随机数

```javascript
const randomNum = (min, max) => {
   return Math.floor(min + Math.random() * (max - min));
}
console.log(randomNum(5,10))
```

#### 随机颜色

-   **0x1000000**: `#ffffff + 1` (16777216)

-    **<< 0**：去除小数(按位运算内部会调用**Call [ToInt32()](http://bclary.com/2004/11/07/#a-9.5)**,里面有调用一个 `floor(x){return x-(x % 1)}`)
-   **.slice(-6)**: 补0,从后面截取6位数

```javascript
const randomColor = () => {
	return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}
console.log(randomColor())
```

#### RGB转十六进制

-   **padStart(6, "0")**:不足六位的值 用0在前面填充到六位
-   **位置调整**:`(r << 16) + (g << 8) + b`( r 移到 56 位置，g 移动 34 位置，b 12位置不变 )

```javascript
const RGBToHex = (r, g, b) => ((r << 16) + (g << 8) + b).toString(16).padStart(6, "0");
let hex = RGBToHex(0, 255, 255); // ffffff
```



### Date 相关

#### 直接获取时间

```javascript
/*
 * 功能:返回时间
 * 描述:date.toTimeString   11:19:44 GMT+0800 (中国标准时间)
    	console.log(new Date(1597894083000).toLocaleString())      // 2020/8/20 上午11:26:29
   	    console.log(new Date().toLocaleTimeString())
    	console.log(new Date(1597894083000).toLocaleDateString())  // 2020/8/20
 */
const getTimeFromDate = date => date.toTimeString().slice(0, 8);
let time1 = getTimeFromDate(new Date()); // 09:46:08
```



### Number 相关

#### 判断是否数组

>   isFinite、parseFloat、Number

```javascript
/*
 * 功能:验证数字是否有效
 * 描述: parseFloat(n) 第一个字符不能被转换为数字，那么会返回 NaN,否则返回第一个数值
 		isFinite(n) number 是 NaN（非数字），或者是正、负无穷大的数，则返回 false。
 		Number(n) 将对象转数字
 		Number(Infinity) === Infinity //true
 */
const isValidNumber = n => !isNaN(parseFloat(n)) && isFinite(n) && Number(n) === n;
let ivn = isValidNumber(10); // true
let ivn2 = isValidNumber("a"); // false
```

### 环境判断相关

#### 判断是否是手机

```javascript
isMobile() {
    let flag = 		navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return flag;
},
```







