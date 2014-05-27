---
layout: post
title:  "学习jekyll"
date:   2014-05-27 22:14:21
categories: blog
---
由于 Jekyll 的灵活性，有很多方式可以解决这个问题。一种常用做法是在工程的根目录下 创建一个文件夹，命名为assets 或者 downloads，将图片文件，下载文件或者其它的 资源放到这个文件夹下。然后在任何一篇文章中，它们都可以用站点的根目录来进行引用。  

![hahaha]({{site.url}}/assets/head.jpg "头像")

{{site.time}}

{{page.date}}



