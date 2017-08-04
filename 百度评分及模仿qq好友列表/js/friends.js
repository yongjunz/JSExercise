//获取元素
var list = document.getElementById('list');
var h2s = list.getElementsByTagName('h2');
var nameList = list.getElementsByClassName('nameList');
var lis = document.querySelectorAll('.nameList li');
//声明2个变量，分别存放好友类别和全部好友数量
var len = h2s.length;
var len2 = lis.length;
//声明2个变量用于记录上一次的好有类别及被点击过的好友
var prev = 0;
var liPrev = 0;


for(var i = 0; i<len; i++){
	h2s[i].index = i; //添加索引
	h2s[i].show = false;//设置好友类别是否展开的状态，false为未展开
	if(i == 0){//将第一个好友类别的展开状态设置为true
		h2s[i].show = true;
	}
	h2s[i].onclick = function(){
		if(this.show){//如果点击的为当前展开的好友分类，那么隐藏当前的
			this.className = 'normal';
			nameList[this.index].style.display = 'none';
			this.show = false;//将当前的好友类别的展开状态设置为假
		}else{
			//如果点击的是之前未展开的好友类别，执行此代码
			nameList[prev].style.display = 'none';//隐藏上一个好友展示列表
			h2s[prev].className = 'normal';//改变上一个好友类别的className
			h2s[prev].show = false;//改变上一个好友类别的展开状态
			this.className = 'on';//为当前的好友类别添加选中的className
			nameList[this.index].style.display = 'block';//将与当前好友类别索引对应的好友列表展示
			this.show = true;//将当前的好友类别的展开状态设置为真
		}
		prev = this.index;//将当前的索引赋值给prev
		// for(var i = 0; i < lis.length; i++){//清空所有好友列表的选中className
		// 	lis[i].className = '';
		// 	lis[i].click = false;
		// }
		lis[liPrev].className = '';
		lis[liPrev].click = false;
	}
}
for(var j = 0; j<len2; j++){//遍历所有好友列表并添加索引
	lis[j].index = j;
	lis[j].click = false;//设置每个Li的点击状态，false为未点击
	lis[j].onmouseover = function(){
		this.click ? '' : this.className = 'hover';
	}
	lis[j].onmouseout = function(){
		this.click ? '' : this.className = '';
	}
	lis[j].onclick = function(){
		lis[liPrev].className = '';//删除上一个的className
		this.className = 'active';//为当前设置选中的className
		lis[liPrev].click = false;
		this.click = true;
		liPrev = this.index;//将当前的索引赋值给liPrev
	}
}

