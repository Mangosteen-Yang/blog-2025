---
title: js修改css属性
date: 2014-01-24T05:04:00.000Z
tags:
  - Javascript
description: 旧文，仅作归档
---
JavaScript可以通过DOM来设置和修改节点的CSS样式。

语法：
nodeObject.style.cssProperty=newStyle
其中，nodeObject 为节点对象，cssProperty 为CSS属性，newStyle 为CSS属性的值。

注意：对于由 “ - ” 分隔的CSS属性，要去掉 “ - ” ，并将 “ - ” 后的第一个字母大写。

例如：

    
    document.getElementById("demo").style.height = "50px" ;
    document.getElementById("demo").style.border = " 1px solid #ddd ";
    document.getElementById("demo").style.backgroundColor = " #ccc ";
    document.getElementById("demo").style.textAlign = " center ";


举例，设置 id="demo"的节点的样式：

    
    <style>
    #demo{
        height:50px;
        width:250px;
        margin-top:10px;
        text-align:center;
        line-height:50px;
        background-color:#ccc;
        }
    </style>
    <div id="demo">
        点击这里改变CSS样式
    </div>
    <script type="text/javascript">
        document.getElementById("demo").onclick=function(){
            this.style.height = " 70px ";
            this.style.lineHeight = " 70px ";
            this.style.backgroundColor = " #000 ";
            this.style.color=" #fff ";
        }
    </script>


在有jquery的时候可以采用这种方式：
[http://www.w3school.com.cn/jquery/css_css.asp](http://www.w3school.com.cn/jquery/css_css.asp)

    
    $(selector).css(name,value)
