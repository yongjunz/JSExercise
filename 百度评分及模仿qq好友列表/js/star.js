//获取元素
var topStarWrap = document.getElementById('topStarWrap');
var starList = topStarWrap.querySelector('.starList');
var lis = starList.getElementsByTagName("li");
var tips = topStarWrap.querySelector('.tips');

//在数组中存放评价内容
var arrText = ['极差','一般','不错','推荐','力推'];
//记录数组长度
var n = arrText.length;
//声明一个变量j，要来存放当前点击的星星的索引
var j = 0;
//设置星星是否被点击的状态，false代表未被点击
var state = false;

function compare(num){
	for(var h = 0; h < n; h++){
		if(h<=num){//循环所有星星，给所有索引小于等于num的星星的索引的星星都添加className
			if(num < 2){//如果当前索引小于2，那么添加浅色的className，否则添加红色的className
				lis[h].className = 'lightStar';
			}else{
				lis[h].className = 'redStar';
			}
		}else{
			lis[h].className = '';
		}
	}
}

for(var i = 0; i < n; i++ ){
	lis[i].index = i;//循环添加索引
	lis[i].onmouseover = function(){
		//当鼠标滑过星星时，将评价框显示出来，并根据当前滑过的星星的索引获取对应的评价内容放到容器中
		tips.style.display = 'block';
		tips.innerHTML = arrText[this.index];
		compare(this.index);
	}
	lis[i].onmouseout = function(){
		if(state){//判断state是否为真，如果为真，代表有星星被点击过；通过被点击后记录的变量j来设置评价的内容，并给所有索引小于等于j的星星添加样式
			tips.style.display = 'block';
			tips.innerHTML = arrText[j];
			compare(j);
		}else{//如果没有星星被点击过，那么清除样式
			for(var h = 0; h <= this.index; h++){
				lis[h].className = '';
			}
			tips.style.display = 'none';
			tips.innerHTML = '';
		}
	}
	lis[i].onclick = function(){
		state == false ? state = true : '';//如果星星被点击，将state改为true
		j = this.index;//将当前被点击的星星的索引赋值给j
	}
}