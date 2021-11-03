---
title: grid网格布局
---
http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html
## 开启grid
### 基本概念
>   **Flex**布局是`轴线布局`，只能设置项目轴线方向的`一维布局`
>   **Grid**将容器划分为`行`和`列`，产生单元格，的`二维布局`
>   使用`display:grid;`的元素成为`容器`，`容器内部`直接子元素称为`项目`(项目的display:inline-block|table-cell、float等生成BFC属性失效)

### 容器属性(假设3x3 9个项目)
> 在容器元素上使用的属性
#### 容器
```javascript
display:grid|inline-gird;
```
#### 设置行
-   `grid-template-rows:100px 100px 100px;`:设置为每行放3个项目，且每个宽度为100px
    -   `100px`: 一一设置行每个项目宽度像素大小
    -   `25%`: 一一设置行每个项目宽度百分比
    -   `rf`: fraction 分配比例1rf(flex:1)、2rf(flex:2)
    -   `auto`:剩余空间宽度自动分分配
    -   `minmax(100px,200px)`:设置项目宽度最小100px,最大200px
    -   `repeat(3,33.33%)`: repeat行数(重复次数，重复大小)
    -   `repeat(2,100px 200px)`: repeat行数(重复次数，重复模式),相当于 100 200 100 200
    -   `auto-fill`:自动填充次数，repeat(auto-fill,100px)
    -   `[c1 cc1多名称] 1rf [c2] 1rf [c3] 2rf [c4]`: 网格线名称,三个格子四条网格线
-   `row-gap:10px`:横向项目间距，原grid-row-gap    
-   `gap:10px 20px`:同时设置行、列间距,原grid-gap
-   `grid-auto-rows`:值同上（设置的是超出区域的宽度和行高，自定义区域才会产生这种）
#### 设置列
-   `grid-template-colunms:100px 100px 100px;`:设置列高度
    -   值同上
-   `colunm-gap`:纵向项目间接,原grid-colunm-gap
-   `grid-auto-colunms`:值同上
    
#### 区域
-   `grid-template-areas`:定义区域
```css
/*将每个格子都设置成不同区域*/
grid-template-areas:'a b c'
                    'd e f'
                    'g h i'; 

/*将容器分 a b c 三个区域,最后一个用不到，用.代替
只要定义了区域，网格线自动命名，区域名-start，区域名-end*/
grid-template-areas:'a a a'
                    'b b b'
                    'c c .'; 
```
#### 排序
-   `grid-auto-flow`:默认先行后列
    -   row:默认
    -   column:先列后行，从上到下排
    -   row dense
    -   column dense
#### 对齐方式(`justify -> 使...对齐`)
-   `item`-> 单元格
-   `justify-items`:设置单元格内容的水平位置
	-   start | end | center |stretch(默认的自动拉伸)
-   `align-items`:设置单元格内容的垂直位置
-   `place-items:align-items justify-items`:简写，先垂直后水平(为测试方向是否根据grid-auto-flow变化?)

    -   `content` -> 内容
    -   `justify-content`:内容区域在容器中水平对齐方式
        -   start | end | center |stretch(默认的自动拉伸) | space-between(均分，两边靠边) | space-around(均分，不靠边) | space-evenly
    -   `align-content`:垂直位置
    -   `place-content`:justify-content align-content
    [stop](https://www.bilibili.com/video/BV1mf4y147bk?p=6&spm_id_from=pageDriver)

#### 简写(了解)
-   grid-template:
	-   grid-template-(rows|column|areas) 的简写
-   grid:
	-   grid-template-(rows|column|areas) grid-auto-(rows|column|flow) 六个的简写

### 项目属性
> 在项目元素上使用的属性

-   `grid-column-start`:左边框所在的垂直网格先
    -   值是一个`number`，设置这个项目从`第几条`开始`第几条`结束，start 1，end 3的话，就占两份了 
    -   网格名称(区域名称-start....)
    -   使用span关键字:跨域 number
        -   grid-column-start:span 3;改项目直接占用三个网格大小
-   `grid-column-end`:右边框所在的垂直网格先
-   `grid-row-start`:上边框所在的垂直网格先
-   `grid-row-end`:下边框所在的垂直网格先

简写
-   grid-column:grid-column-start/grid-column-end;
-   grid-row:grid-row-start/grid-row-end;
-   grid-area:grid-row-start/grid-column-start/grid-row-end/grid-column-end | 区域名;指定项目放在哪个区域

项目自身的对齐方式
-   justify-self:单个项目水平方向的对齐方式
    -   start | end | center |stretch(默认的自动拉伸)
-   align-self: 垂直方向
-   place-self:align-self justify-self;简写
