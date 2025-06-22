---
title: 避免中文乱码的字符串截取mb_substr
date: 2014-07-04T06:07:00.000Z
tags:
  - PHP
description: "mb_substr\r\n\r\n(PHP 4 >= 4.0.6, PHP 5)\r\nmb_substr — 获取字符串的部分"
---
说明

string mb_substr ( string $str , int $start [, int $length = NULL [, string $encoding = mb_internal_encoding() ]] )
根据字符数执行一个多字节安全的 substr() 操作。 位置是从 str 的开始位置进行计数。 第一个字符的位置是 0。第二个字符的位置是 1，以此类推。

参数

str
从该 string 中提取子字符串。

start
str 中要使用的第一个字符的位置。

length
str 中要使用的最大字符数。 If omitted or NULL is passed, extract all characters to the end of the string.

encoding
encoding 参数为字符编码。如果省略，则使用内部字符编码。

返回值

mb_substr() 函数根据 start 和 length 参数返回 str 中指定的部分。
