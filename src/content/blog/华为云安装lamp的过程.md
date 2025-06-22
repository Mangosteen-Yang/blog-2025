---
title: 华为云安装LAMP的过程
date: 2014-01-11T04:52:00.000Z
tags:
  - Cloud
description: 旧文，仅做归档
---
1.绑定公网IP
2.设置安全组如下
TCP端口	源IP	组
SSH(22)	0.0.0.0/0	-
ICMP端口	源IP	组
PING(-1--1)	0.0.0.0/0	-
3.此时问题出现，可以访问外网，但是系统自身的yum源404错误，更改yum需要wget命令，可是系统不带wget命令，安装此命令又需要用到yum.
所以下载wget安装包用rpm方式安装后用wget更新系统：
cd /etc/yum.repos.d
mv CentOS-Base.repo CentOS-Base.repo.bak
wget http://mirrors.163.com/.help/CentOS-Base-163.repo

或
wget http://mirrors.sohu.com/help/CentOS-Base-sohu.repo

运行yum makecache生成缓存
4.根据官方文档运行# yum groupinstall -y "Web Server" "MySQL Database" "PHP Support" 安装LAMP环境
