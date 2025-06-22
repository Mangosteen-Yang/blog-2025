---
title: Python 学习笔记
date: 2013-06-05T12:07:00.000Z
tags:
  - Python
description: "### The difference between `del` and `.remove()`is:\r\t\r\n  1. `del` deletes a key and its value based on the _key_ you tell it to delete.\r\t\r\n  2. `.remove()` removes a key and its value based on the _value_ you tell it to delete."
---
List和Dictionary
先举两个Dictionary的例子

```
prices={"banana":4, "apple":2, "orange":1.5, "pear":3}
```

```
lloyd={"name":"Lloyd", "homework":[], "quizzes":[], "tests":[]}
```

引用"banana"价格时为prices\["banana"]

再举一个List的例子

```
animals=["monkey", "dog", "cat"]
```

List和Dictionary都可用for遍历

### Removing elements from lists

`n.pop(index)` will remove the item at `index` from the list and return it to you:

```
n = [1, 3, 5]
n.pop(1)
# Returns 3 (the item at index 1)
print n
# prints [1, 5]
```

n.remove(item) will remove the actual item if it finds it:

```
n.remove(1)
# Removes 1 from the list,
# NOT the item at index 1
print n
# prints [3, 5]
```

del(n\[1] is like .pop in that it will remove the item at the given index, but it won't return it:

```
del(n[1])
# Doesn't return anything
print n
# prints [1, 5]
```

### Arbitrary number of arguments

```
def add_function(*args)
```

is the convention for allowing an arbitrary number of arguments. `*args` is an argument **tuple** that can be called the same way you would a list! For example:

```
def myFun(*args):
    print args[0]
```

The above example would print out the first argument that was given.

To sum those args, you can just use Python's built-in `sum` function: `sum(args)` (no `*` needed when calling `sum`!)

### Using an arbitrary number of lists in a function

```
m = [1, 2, 3]
n = [4, 5, 6]
# Add your code here!
def join_lists(*args):
f=""
for s in args:
f+=s
print f

print join_lists(m, n)
```

> Traceback (most recent call last):
> File "1.py", line 15, in
> print join_lists(m, n)
> File "1.py", line 8, in join_lists
> f+=s
> TypeError: cannot concatenate 'str' and 'list' objects

原因是list只能和list连接
将f=""改成f=\[]就可以了!
疑惑:为什么list+list不可以用sum()

#### 函数中使用for循环遍历数组时函数最后使用return返回并用print显示可能只显示第一个元素

```
board = []

for x in range(0, 5):
    board.append(["O"] * 5)

def print_board(b):
    for row in b:
        return " ".join(row)
print print_board(board)
```

结果为0 0 0 0 0

此时将函数中
    return " ".join(row)
改为
    print " ".join(row)

即可正常显示所需结果:
0 0 0 0 0
0 0 0 0 0
0 0 0 0 0
0 0 0 0 0
0 0 0 0 0

### for语句中else的意义

In this case, the **_else_** statement is executed after the **_for_**, but only if the **_for_** ends normally—that is, not with a **_break_**.This code will **_break_** when it hits _'tomato'_, so the **_else_ **block won't be executed.

```
fruits = ['banana', 'apple', 'orange', 'tomato', 'pear', 'grape']

print 'You have...'
for f in fruits:
    if f == 'tomato':
        print 'A tomato is not a fruit!' # (It actually is.)
        break
    print 'A', f
else:
    print 'A fine selection of fruits!'
```

此处**_else_**的意义在于在所有遍历结束后可以只打印一句话，且这句话可以在**_for_**结构内

### factorial

我想到的方法

```
    def factorial(x):
        if x==0:
            f=0
        else:
            f=1
        while x>1:
            f=x*f
            x-=1
        else:
            print f
    factorial(3)
```

网上找到的好方法
```
    def factorial(x):
        if x == 1:
            return x
        else:
            return x * factorial(x-1)
```

### for遍历输出到一行

```
def reverse(text):
    rev=""
    for i in text:
        rev=i+rev
    return rev
```
