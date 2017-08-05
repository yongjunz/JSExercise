//获取每个容器中Li的个数
var len1 = document.querySelectorAll('#list1 li').length;
var len2 = document.querySelectorAll('#list2 li').length;
var state = false;//设置状态，false代表没有修改框显示着
//根据获取到的li的长度，循环执行函数
for(var i = 0; i < len1; i++){
	revampFunc('list1',i)
}
for(var j = 0; j < len2; j++){
	revampFunc('list2',j)
}
function revampFunc(parent,num){
	var list = document.getElementById(parent);//获取父容器
	var lis = list.querySelectorAll('li')[num];//获取单独的Li，在根据当前的Li获取li里面的input等各类元素
	var titleWrap = lis.querySelector('.titleWrap');
	var spans = lis.querySelector('span');
	var revampIcon = lis.querySelector('i');
	var revampWrap = lis.querySelector('.revampWrap');
	var inps = lis.querySelectorAll('input');


	revampIcon.onclick = function(){//为修改图标添加点击事件
		if(state){//如果有其他未关闭的修改框，则弹出提示
			alert("请先关闭其他操作项!")
		}else{
			inps[0].value = spans.innerHTML;//将目前页面上展示的信息获取到并赋值给修改框中的输入框
			titleWrap.style.display = 'none';//将标题框隐藏
			revampWrap.style.display = 'block';//将修改框显示
			inps[0].select();//让输入框中的内容默认选中
			state = true;//将状态设置为true，代表有修改框显示
		}
	}
	inps[1].onclick = function(){//为保存按钮添加点击事件
		var str = inps[0].value;
		if(!inps[0].value){//如果输入框中的值为空，弹出提示
			alert('请输入修改后的内容');
			return;
		}else if(str.charAt(0) == ' ' || str.charAt(str.length - 1) == ' '){//如果输入框中的值前后有空格，弹出提示
			alert('请勿在开始及结束位置包含空格！');
			return;
		}else if(str != spans.innerHTML){//当输入框中的值与原页面上显示的内容不同，则将值填充到页面
			spans.innerHTML = str;
		}
		titleWrap.style.display = 'block';//将标题框显示
		revampWrap.style.display = 'none';//将修改框隐藏
		state = false;//修改框隐藏，将状态设置为false
	}
	inps[2].onclick = function(){//为取消按钮添加事件
		state ? state = !state : ''; //如果状态为真，对状态值取反
		titleWrap.style.display = 'block';//将标题框显示
		revampWrap.style.display = 'none';//将修改框隐藏
	}
}