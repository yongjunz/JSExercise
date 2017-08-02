//获取元素
var box = document.getElementById("box");
var prev = document.getElementById("prev");
var next = document.getElementById("next");
var img = document.getElementById("img");
var list = document.getElementById("list");
var arrLi = list.getElementsByTagName("li");

//利用直接量定义数组，并将图片路径存进去
var arrImg = ['./images/1.png','./images/2.png','./images/3.png','./images/4.png','./images/5.png'];

//定义变量n，用来对应数组的下标，并利用n的变化来改变图片和li的高亮显示
var n = 0;
//存数组长度
var len = arrImg.length;
//定义一个空字符串，用来存放动态拼接的Li，最后将str放入list中
var str = '';


//动态生成底部Li结构
for(var i=0; i<len; i++){
	str += '<li>\
				<div class="smallImg">\
					<img src="'+ arrImg[i] +'">\
					<em class="triangle"></em>\
				</div>\
			</li>';
}
list.innerHTML = str;

function tab(){
	img.src = arrImg[n];
	for(var i=0; i<len; i++){
		arrLi[i].className = '';
	}
	arrLi[n].className = "on";
}

//页面加载是进行初始化
tab();

//为每一个li绑定鼠标移入、移出及点击事件
for(var j=0; j<len; j++){
	arrLi[j].index = j; //为每一个li添加索引
	arrLi[j].onmouseover = function(){
		//当鼠标移入时，显示缩略图
		this.getElementsByTagName('div')[0].style.display = "block";
	}
	arrLi[j].onmouseout = function(){
		//当鼠标移出时，隐藏缩略图
		this.getElementsByTagName('div')[0].style.display = "none";
	}
	arrLi[j].onclick = function(){
		//鼠标点击Li时，将当前li的索引赋值给n，并执行tab函数，改变显示的img及li的高亮状态
		n = this.index;
		tab();
	}
}


//上一张点击事件
prev.onclick = function(){
	n--;
	if(n<0){
		n = len-1;
	}
	tab();
}
//下一张点击事件
next.onclick = function(){
	n++;
	if(n>len-1){
		//当n的值大于数组最后一个元素的下标时，将n赋值为0，实现回到第一张的循环轮换效果
		n = 0;
	}
	tab();
}