---
title: Laravel安装指南
date: 2016-07-29T12:27:54.808Z
tags:
  - PHP
description: 旧文，如果你在2019年看到，请使用docker
---
Laravel是我安装过最复杂的PHP框架，但是按着步骤来，细节都注意到位，也没那么困难。
使用Laravel必备的除了PHP等基础环境还有Composer. Composer可以简单理解为一个包管理工具。
安装 https://getcomposer.org/download/
文档 https://getcomposer.org/doc/


假设未来我们把网站代码放在~/Code 首先 `cd ~/Code`到代码目录下执行

```
composer create-project laravel/laravel blog
```
创建一个文件夹名为`blog`的Laravel项目
开启PHP自带服务器

```
php -S localhost:8999 -t public
```
然后访问localhost:8999就可以看到Laravel的首页了

如果此法失败，请参阅第二个方法：使用Homestead虚拟机
Homestead是Laravel官方出的一个虚拟开发环境，在这个环境里面，你不用担心服务器的配置和文件夹得权限配置等，因为在Homestead当中，这些都是已经为你准备好的。
首先我们需要安装这两个东西：
VirtualBox ： https://www.virtualbox.org/wiki/Downloads
Vagrant ： https://www.vagrantup.com/downloads.html
安装完这两个之后，我们就可以安装我们的Homestead了：

```
vagrant box add laravel/homestead
```
接下来需要进行简单的配置，配置文件在`~/.homestead/Homestead.yaml`
找到如下几行:

```
folders:
    - map: ~/Code
      to: /home/vagrant/Code
sites:
    - map: blog.dev
      to: /home/vagrant/Code/blog/public
```
folders是配置vagrant的映射文件夹，这里也就是我们的~/Code映射到Homestead虚拟机中的/home/vagrant/Code文件夹，简单的理解是如果我们在~/Code这个文件夹内做的任何修改，vagrant都会马上同步到/home/vagrant/Code中，(后面我们可以ssh登录到Honestead中去看看这个文件夹)；然后sites就是我们的站点配置，这里我们将blog.dev这个域名映射到/home/vagrant/Code/blog/public目录，这个是因为我们在上面的folders映射了/home/vagrant/Code这个文件夹，我们就可以想象到这个文件夹下面就有一个blog/目录，而这个就是我们的项目目录。

接下来修改本机的hosts文件：

```
sudo vim /etc/hosts
```
在这个文件后面加上下面这一行：

```
192.168.10.10  blog.dev
```

到这里，Homestead的配置已经完成了，这个时候，你只需要命令行执行一下：

```
vagrant up
```
销毁虚拟机的指令是`vagrant destroy --force`
等待虚拟机启动起来，然后访问http://blog.dev/，你就可以看到熟悉的页面了
