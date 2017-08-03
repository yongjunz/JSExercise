var box = document.getElementById('box');
var btn = document.getElementById('btn');
var count=-1;//按钮点击后的状态值
var n=5;//由多少个div组成的V
var change = Math.floor(n/2);//根据多少个div计算到多少开始转折
var str = '';
var t = 0;

//箭头朝下
function down(){
	for(var i = 0; i < n; i++){
		i < change+1 ? t = i*50 : t = (n-1-i)*50;
		str+='<div style="left:' + i*50 + 'px; top:' + t + 'px;">' + (i+1) + '</div>'
	}
}
//箭头朝上
function up(){
	for(var i = 0; i < n; i++){
		i > change ? t = i*50 : t = (n-1-i)*50;
		str+='<div style="left:' + i*50 + 'px; top:' + t + 'px;">' + (i+1) + '</div>'
	}
}
//箭头朝左
function left(){
	for(var i = 0; i < n; i++){
		i > change ? t = i*50 : t = (n-1-i)*50;
		str+='<div style="top:' + i*50 + 'px; left:' + t + 'px;">' + (i+1) + '</div>'
	}
}
//箭头朝右
function right(){
	for(var i = 0; i < n; i++){
		i < change+1 ? t = i*50 : t = (n-1-i)*50;
		str+='<div style="top:' + i*50 + 'px; left:' + t + 'px;">' + (i+1) + '</div>'
	}
}

btn.onclick = function(){
	btn.value ="变换";
	count++;
	switch(count%4){
		case 0:
		down();
		break;
		case 1:
		left();
		break;
		case 2:
		up();
		break;
		case 3:
		right();
		break;
	}
	box.innerHTML = str;
	str = '';
}