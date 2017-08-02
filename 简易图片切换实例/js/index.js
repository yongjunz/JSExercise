// 通过id获取元素
var tab1 = document.getElementById("tab1");
var tab2 = document.getElementById("tab2");
var tabInfo = document.getElementById("tabInfo");
var alertWrap = document.getElementById("alertWrap");
var alertInfo = document.getElementById("alertInfo");
var closeBtn = document.getElementById("closeBtn");
var sure = document.getElementById("sure");
var img = document.getElementById("img");
var numShow = document.getElementById("numShow");
var tips = document.getElementById("tips");
var prev = document.getElementById("prev");
var next = document.getElementById("next");

//设置图片路径的数组以及图片的描述文字数组
var arrImg=["./images/1.png","./images/2.png","./images/3.png","./images/4.png"];
var arrText = ["钢铁战车","矿车","武装直升机","夜间巡逻车"];

//设定state为true时为循环切换状态，false时为顺序切换状态
var state = true;
//定义n，使用n通过数组下标获取到对应的图片路径及描述文字的值
var n = 0;
//存下数组长度
var len = arrImg.length;


//封装加载图片路径、文字描述及当前是第几张的函数
function tab(){
	img.src = arrImg[n];
	numShow.innerHTML = (n+1) + "/" + len;
	tips.innerHTML = arrText[n];
}

//当用户点击确定按钮以及关闭按钮是，将弹窗隐藏
sure.onclick = closeBtn.onclick = function(){
	alertWrap.style.display = "none";
	alertInfo.innerHTML = "";
}

//初始化
tab();

//通过tab1和tab2的点击，点击的当前元素添加class为on，并将另一个元素的class删除，根据点击元素的不同，让页面显示对应的切换效果描述，并改变state的状态
tab1.onclick = function(){
	this.className = "on";
	tab2.className = "";
	tabInfo.innerHTML = "图片可从最后一张跳转到第一张循环切换";
	state = true;
}
tab2.onclick = function(){
	this.className = "on";
	tab1.className = "";
	tabInfo.innerHTML = "图片只能到最后一张或者只能到第一张切换";
	state = false;
}


//点击切换下一张，根据state的状态执行不同的代码块
next.onclick = function(){
	if(state){ //如果state为true，执行此代码块代码
		n++;//自加
		if(n>len-1){//如果n的值大于数组最后一个值的下标值
			n=0;//让n=0，实现图片回到第一张
		}
	}else{//如果state为false，执行此代码块代码
		n++;
		if(n>len-1){
			//将弹窗显示出来，并往alertInfo中填充内容
			alertWrap.style.display = "block";
			alertInfo.innerHTML = "已经到最后一张啦！";
			n=len-1; //让n的值保持和数组最后一个内容的下标相同，以保证图片一直是最后一张
		}
	}
	tab();
}
//点击切换上一张，根据state的状态执行不同的代码块
prev.onclick = function(){
	if(state){//如果state为true，执行此代码块代码
		n--;//自减
		if(n<0){
			n=len-1; //当n<0时，让n的值等于数组最后一个内容的下标，实现从第一张到最后一张的切换
		}
	}else{
		n--;
		if(n<0){
			alertWrap.style.display = "block";
			alertInfo.innerHTML = "已经到第一张啦！";
			n=0;//让n的值保持在0，保证图片一直是第一张
		}
	}
	tab();
}