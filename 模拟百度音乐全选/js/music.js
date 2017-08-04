//获取元素
var musicList = document.getElementById('musicList');
var selectAll = document.getElementById('selectAll');
var add = document.getElementById('add');
var del = document.getElementById('del');
var zhezhao = document.getElementById('zhezhao');
var songTitle = document.getElementById('songTitle');
var singerName = document.getElementById('singerName');
var submit = document.getElementById('submit');
var cancel = document.getElementById('cancel');

var lis = musicList.getElementsByTagName('li');
var inps = musicList.getElementsByTagName('input');

var arrSongs =['私奔','北京北京','我爱你中国','花火','回来','爱要有你才完美'];
var arrSinger = ['梁博','梁博 黄勇','梁博','梁博','梁博','梁博 那英'];
var len = arrSongs.length;
var str = '';

var count = 0;//设置一个变量用于计数

init();
function init(){
	//每次操作，重新从页面获取元素，初始化数值
	len = arrSongs.length;
	count = 0;
	selectAll.checked = false;

	//根据数组长度及数组内容动态拼接歌单内容
	for(var k = 0; k < len; k++){
		str +='<li>\
					<input type="checkbox">\
					<span>'+ arrSongs[k] +'</span>\
					<em class="fr">'+ arrSinger[k] +'</em>\
				</li>';
	}
	musicList.innerHTML = str;
	str = '';

	for(var i = 0; i < len; i++){

		if(i%2!=0){//隔行变色
			lis[i].style.background = 'rgba(252,238,241,.8)';
		}
		lis[i].index = i;//为每一个li添加索引
		lis[i].isClick = false;//为每一个li添加是否被选中的状态，false为未被选中
		lis[i].onmouseover = function(){
			this.className = 'active';//鼠标移入，为当前添加className
		}
		lis[i].onmouseout = function(){//鼠标移出，如果当前移出的Li被选中，那么不做操作，如果没有没选中，那么去除该Li的className
			this.isClick ? '' : this.className = '';
		}
		lis[i].onclick = function(){//点击li，如果该li是被选中的，那么去除该Li的className,将其中复选框的checked属性设置为false,并将计数值减1；否则如果该li是没有被选中，那么给该Li添加className，将其中的复选框checked属性设置为true,并让计数值加1
			if(this.isClick){
				this.className = '';
				// inps[this.index].checked = false;
				// this.isClick = false;
				count--;
			}else{
				this.className = 'active';
				// inps[this.index].checked = true;
				// this.isClick = true;
				count++;
			}
			inps[this.index].checked = this.isClick = !this.isClick;
			//当计数值等于上面的复选框个数时，将全选复选框的checked属性设置为true,否则设置为false
			count == len ? selectAll.checked = true : selectAll.checked = false;
		}
	}
}


//全选
selectAll.onclick = function(){
	if(this.checked){//判断点击后全选按钮是否被选中，如果被选中了，则将上面所有的复选框都选中，给每个Li都添加className，并让计数值等于上面的复选框个数
		for(var i = 0; i < len; i++){
			inps[i].checked = true;
			lis[i].isClick = true;
			lis[i].className = 'active';
			count = len;
		}
	}else{//如果点击后全选按钮未被选中，那么则将上面所有的复选框都取消选中状态，给每个Li都去除className，并让计数值等于0
		for(var i = 0; i < len; i++){
			inps[i].checked = false;
			lis[i].isClick = false;
			lis[i].className = '';
			count = 0;
		}
	}
}

//添加
add.onclick = function(){//点击添加按钮时，让输入需要添加的歌曲的界面显示出来
	zhezhao.style.display = 'block';
}
cancel.onclick = function(){//点击取消按钮，隐藏面板，不做其他操作
	zhezhao.style.display = 'none';
	songTitle.value = '';
	singerName.value = '';
}
submit.onclick = function(){//点击提交按钮，如果歌曲及歌手名均不为空，那么先获取其中的值，并添加到对应的数组中，然后隐藏界面，并将输入框重置为空
	if(songTitle.value && singerName.value){
		arrSongs.push(songTitle.value);
		arrSinger.push(singerName.value)
		zhezhao.style.display = 'none';
		songTitle.value = '';
		singerName.value = '';
		init();
	}else{//如果歌曲或者歌手有一项为空，那么弹出提示信息
		alert('请填写完整的歌曲或者歌手名！');
	}
}
//删除
del.onclick = function(){
	if(count){//如果count不为0 ，执行这段代码块代码
		var selectLiIndex = [];
		var saveSong = [];
		var saveSinger = [];
		for(var j = 0; j < len; j++){
			if(!lis[j].isClick){//获取所有没有被选中删除的li
				selectLiIndex.push(lis[j].index);//将没有被删除的Li的索引保存在数组中
			}
		}
		console.log(selectLiIndex);
		//根据保存下来的索引，将对应的歌曲及歌手内容保存下来，并对arrSongs以及arrSinger重新赋值，完成后，执行初始化函数
		for(var i = 0; i < selectLiIndex.length; i++){
			saveSong[i] =  arrSongs[selectLiIndex[i]];
			saveSinger[i] =  arrSinger[selectLiIndex[i]];
		}
		arrSongs = saveSong;
		arrSinger = saveSinger;
		init();

	}else{
		alert('您没有选中任何歌曲！');
	}
}