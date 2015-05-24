---

layout: post
title:  "box-shadow以及结合sass在像素艺术的应用"  
date:   2015-05-24 
tags: css

---
  
> box-shadow: [投影方式:outset/inset]  |  X轴偏移量  |  阴影模糊半径  |  阴影扩展半径  |  阴影颜色 (多个阴影用","隔开)    

<!--more-->

##开始画像素块   
* box-shadow的大小由元素自身决定，针对box-shadow我们可以做的有：  
	1. 偏移量 
	2. 颜色 
	3. 数量  
	 
	因为是像素块，所以需要为纯色，故模糊半径和扩展半径都为0  

{% highlight css %}
div{
	width:10px;
	height:10px;
	background:#000;
	box-shadow:10px 10px 0 red,20px 20px 0 red;
}  
{% endhighlight %}  
![image](http://7xj9ez.com1.z0.glb.clouddn.com/20150524QQ20150524-1@2x.png)  

*实际上box-shadow是有规律可循的，因为他们的x,y偏移基本单位相同，因此我们只需记录每个像素块的偏离量，以及对应的颜色，事情就做完了。  
这里我们需要一个类二维数组，用于记录所有像素的位置。在sass中我们可以用list来表示：
{% highlight scss %}
$diamond: (o o x o o)
          (o x o x o)
          (x o o o x)
          (o x o x o)
          (o o x o o); 
{% endhighlight %}	  

对应的图像： 

![image](http://7xj9ez.com1.z0.glb.clouddn.com/20150524pixel-diamond.png)  
  
我们需要做的就是根据数组中的x的位置来写出box-shadow即可。遇到o忽略，遇到x则计算出此时x，y偏移量并添加阴影颜色。我们可以接住sass的函数功能写一个方法来自动计算：
{% highlight scss %}  
/**
//$matrix  像素地图 
//$size  每个像素矩形的宽
//$color 填充颜色
*/
@function pixelize($matrix, $size: $width, $color: hotpink) {
	$rowLength:length($matrix);
	$isFirst:true;//用于区分是否需要添加','
	$boxShadow:"";

	@for $i from 1 through $rowLength{
		$column:nth($matrix,$i);
		$columnLength:length($column);
		
		@for $j from 1 through $columnLength{
			$item:nth($column,$j);

			@if($item!=o){
				@if($isFirst==true){
					$boxShadow: $boxShadow + ($j*$size) + ' ' + ($i*$size) + ' ' + hotpink;
            		$isFirst:false;
				}
				@else{
					$boxShadow: $boxShadow + ',' + ($j*$size) + ' ' + ($i*$size) + ' ' + hotpink;
				}
			}
		}
	}

	@return unquote($boxShadow);
}
{% endhighlight %}  
在上述代码中，对`o`符号的不处理，是为了减短box-shadow的长度，而设置`isFirst`状态是为了处理多个阴影之间','连接的细节问题。   
##开始上色  
* 我们用一个类似对象来存储不同类型像素点的颜色，借助sass的map：
{% highlight scss %}
$pixel-color-map: (
  'r' : #f00,
  'w': #fff,
  'k': #000,
  'o': transparent,
  't': #83401f,
  'p': #ffbc77,
  'b': #06f,
  'y': #ff0,
  'n': #ff8000,
  'g': #5ac528
); 
$map1:   (o o o r r r r r r o o o o)
	    (o o r r r r r r r r r r o)
	    (o o t t t p p p k p o o o)
	    (o t p t p p p p k p p p o)
	    (o t p t t p p p p k p p p)
	    (o t t p p p p p k k k k o)
	    (o o o p p p p p p p p o o)
	    (o o r r b r r r r o o o o)
	    (o r r r b r r b r r r r o)
	    (r r r r b b b b r r r r o)
	    (p p r b y b b y b r p p o)
	    (p p p b b b b b b p p p o)
	    (p p b b b b b b b b p p o)
	    (o o b b b o o b b b o o o)
	    (o t t t o o o o t t t o o)
	    (t t t t o o o o t t t t o);
{% endhighlight %}	 
同时，像素地图中的标识符号也将不止一个，所以我们的`pixelize`方法也需要改造一下:
{% highlight scss %} 
@function pixelize($matrix, $size: $width) {
	$rowLength:length($matrix);
	$isFirst:true;//用于区分是否需要添加','
	$boxShadow:"";

	@for $i from 1 through $rowLength{
		$column:nth($matrix,$i);
		$columnLength:length($column);
		
		@for $j from 1 through $columnLength{
			$item:nth($column,$j);

			@if(map-has-key($pixel-color-map,$item)){
				@if($isFirst==true){
					$boxShadow: $boxShadow + ($j*$size) + ' ' + ($i*$size) + ' ' + map-get($pixel-color-map, $item);
            		$isFirst:false;
				}
				@else{
					$boxShadow: $boxShadow + ',' + ($j*$size) + ' ' + ($i*$size) + ' ' + map-get($pixel-color-map, $item);
				}
			}
		}
	}

	@return unquote($boxShadow);
}
{% endhighlight %}  
![image](http://7xj9ez.com1.z0.glb.clouddn.com/20150524QQ20150524-1.png)   

##扩展  
既然它是我们熟悉的div，而内容都是有box-shadow这个样式决定的，那我们如果结合css3动画，不断更换box-shadow或者添加其他属性让这个div“动”起来，会是怎样的效果呢？  
<p data-height="268" data-theme-id="15398" data-slug-hash="BNQBXo" data-default-tab="result" data-user="SunPeter" class='codepen'>See the Pen <a href='http://codepen.io/SunPeter/pen/BNQBXo/'>BNQBXo</a> by SunPeter (<a href='http://codepen.io/SunPeter'>@SunPeter</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>   
恩，神奇的像素过渡效果，帅呆了！

##参考  
[sass-pixel-art](http://una.im/sass-pixel-art/)  
[w3cplus sass 教程](http://www.w3cplus.com/sassguide/)