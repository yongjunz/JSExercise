//主切换
tab('.siderBar li','.showTab','active');
/*
//第一个嵌套切换
tab('.smallTab1 li','.showTab1 .tabItem','active');
//第二个嵌套切换
tab('.smallTab2 li','.showTab2 .tabItem','active');
//第三个嵌套切换
tab('.smallTab3 li','.showTab3 .tabItem','active');
//第四个嵌套切换
tab('.smallTab4 li','.showTab4 .tabItem','active');
//第五个嵌套切换
tab('.smallTab5 li','.showTab5 .tabItem','active');
*/
var len =document.querySelectorAll('.siderBar li').length;
for(var i = 1; i <= len; i++){
	tab('.smallTab' + i + ' li','.showTab' + i + ' .tabItem','active');
}

function tab(sider,siderTab,onClass){
	var tabLis = document.querySelectorAll(sider);//获取点击的元素
	var showTab = document.querySelectorAll(siderTab);//获取与点击元素对应的展示块
	for(var i = 0; i < tabLis.length; i++){//循环所有点击元素
		tabLis[i].index = i;//为点击元素添加索引
		tabLis[i].onclick = function(){//为点击元素添加onclick事件
			for(var i = 0; i < tabLis.length; i++){//先清空所有点击元素及对应展示元素的样式
				tabLis[i].className = '';
				showTab[i].style.display = 'none';
			}
			this.className = onClass;//为当前点击的元素添加样式
			showTab[this.index].style.display = 'block';//将与当前点击元素对应的展示元素显示出来
		}
	}
}