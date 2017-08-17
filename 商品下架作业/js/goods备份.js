//新建商品数据结构
var goodsData = [
	{
		goodsName : 'Apple iPhone 7 Plus 64g',
		goodsPrice : '¥5799',
		goodsImg : '<img src="./images/goods_1.png">'
	},
	{
		goodsName : '27 英寸配备 Retina 5K显示屏',
		goodsPrice : '¥15999',
		goodsImg : '<img src="./images/goods_2.png">'
	},
	{
		goodsName : 'iPad mini 4',
		goodsPrice : '¥1799',
		goodsImg : '<img src="./images/goods_3.png">'
	},
	{
		goodsName : 'Apple Watch Plus 32g ',
		goodsPrice : '¥4799',
		goodsImg : '<img src="./images/goods_4.png">'
	}
];
var len = goodsData.length;
var str = '';
//获取元素
wrap = $('#wrap');
//向wrap中渲染li结构
for( var i = 0; i < len; i++ ){
	str += `<li>
			<h2 class="setTimeH2">
				<input type="text" class="setTimeInp" value="2017 7 13 09:32:30">
				<input type="button" class="affirmTime" value="确定">
			</h2>
			<!-- 倒计时区域s -->
			<div class="residueBox">
				<div class="residueText">剩余</div>
				<div class="residueTime clearfix">
					<div class="clockNum">
						<p>
							<span>0</span>
							<span>0</span>
						</p>
					</div>
					<div class="clockNum">
						<p>
							<span>0</span>
							<span>0</span>
						</p>
					</div>
					<div class="clockPoint">
						<p><img src="./images/redPoint.png"></p>
					</div>
					<div class="clockNum">
						<p>
							<span>0</span>
							<span>0</span>
						</p>
					</div>
					<div class="clockNum">
						<p>
							<span>0</span>
							<span>0</span>
						</p>
					</div>
					<div class="clockPoint">
						<p><img src="./images/redPoint.png"></p>
					</div>
					<div class="clockNum">
						<p>
							<span>0</span>
							<span>0</span>
						</p>
					</div>
					<div class="clockNum">
						<p>
							<span>0</span>
							<span>0</span>
						</p>
					</div>
				</div>
			</div>
			<!-- 倒计时区域e -->
			<!-- 商品图片展示s -->
			<div class="goodsImg">
				<span></span>
				${goodsData[i].goodsImg}
			</div>
			<!-- 商品图片展示e -->
			<h2 class="goodsName">
				${goodsData[i].goodsName}
			</h2>
			<h2 class="goodsPrice">
				<em>抢购价：</em>
				<span>${goodsData[i].goodsPrice}</span>
			</h2>
			<!-- 倒计时完毕后显示的遮罩s -->
			<div class="shade"></div>
			<!-- 倒计时完毕后显示的遮罩e -->
		</li>`;
}
wrap.innerHTML = str;
//为每个li设置left值
var lis = $('li',wrap);
for( var j = 0; j < len; j++ ){
	lis[j].style.left = j*250 + 'px';
	/*********************/
	BuyingGoods(j)
	/***********************/
}

function BuyingGoods(liNum){
	var setTimeStr = $('.setTimeInp',lis[liNum])[0].value;

	function calculateTime(){//倒计时，计算间隔时间
		var trueTime = new Date();//获取当前的真实时间
		var tarTime = new Date( setTimeStr );//目标时间
		var intervalTime = (tarTime - trueTime)/1000;//计算目标时间与当前时间的差值，并将单位转为秒
		var intervalHour = parseInt( intervalTime%86400/3600 );//取得剩余的小时数
		var intervalMin = parseInt( intervalTime%86400%3600/60 );//取得剩余的分钟数
		var intervalSec = parseInt( intervalTime%60 );//取得剩余的秒数
		return addZero( intervalHour ) + ':' + addZero( intervalMin ) + ':' + addZero( intervalSec );
	}
	var oldTime = calculateTime( lis[liNum] );//手动运行一次，计算间隔时间，并将返回值赋给oldTime
	var ps = $('p',lis[liNum]);
	//利用获取到的oldTime值，给当前Li下的span设置时间
	function init(){
		for( var t = 0; t < ps.length; t++ ){
			if( oldTime.length > 8 ){
				return;
			}
			if( oldTime.charAt(t) == ":" ){
				flicker(ps[t]);
			}else{
				var spanNums = $('span',ps[t]);
				spanNums[0].innerHTML = oldTime.charAt(t);
			}
		}
	}
	init();
	lis[liNum].timer = setInterval(countDown,1000)
	function countDown(){
		var newTime = calculateTime( lis[liNum] );//距离目标时间最新的差值
		if( newTime.length > 8 ){//判断是否到指定时间,如果到了指定时间，那么清除定时器并执行抖动函数
			newTime.length = '00:00:00';
			var shade = $('.shade',lis[liNum])[0];
			shade.style.zIndex = 2;
			shade.style.transform = 'scale(1)';
			shade.style.opacity = '.7';
			setTimeout(function(){
				shake(lis[liNum],'left',20)
			},300)
			clearInterval( lis[liNum].timer );
			//往下方的ul中添加倒计时结束商品的li
			soldOut();
			return;
		}

		var ps = $('p',lis[liNum]);
		for( var l = 0; l < ps.length; l++ ){
			if( oldTime.charAt(l) == ":" ){//判断冒号及控制闪烁
				flicker(ps[l]);
			}else{
				if( newTime.charAt(l) != oldTime.charAt(l) ){
					moveP( ps[l],l,newTime )
				}
			}
		}
		oldTime = newTime;//将最新时间差值赋值给老时间变量
	}

	function flicker(colon){//倒计时冒号闪烁
		var imgs = $('img',colon)[0];
		imgs.src = './images/redPoint.png';
		setTimeout(function(){
			imgs.src = './images/nullPoint.png';
		},500)
	}
	function moveP(obj,l,newTime){//控制p的上移及改变span中的数值
		var spanNums = $('span',obj);
		spanNums[0].innerHTML = oldTime.charAt(l);
		spanNums[1].innerHTML = newTime.charAt(l);
		mTween(obj,'top',-28,500,'linear',function(){
			obj.style.top = 0;
			spanNums[0].innerHTML = spanNums[1].innerHTML
		});
	}
	//点击确认按钮
	var affirmTime = $('.affirmTime',lis[liNum])[0];
	affirmTime.onclick = function(){
		setTimeStr = $('.setTimeInp',lis[liNum])[0].value;
		countDown();

	}
	//往下方的ul中添加倒计时结束商品的li
	var list = $('#list');
	function soldOut(){
		//var ulHtml = '';
		list.innerHTML +=`<li>
							<span class="showName">${goodsData[liNum].goodsName}</span>
							<span class="showPrice">${goodsData[liNum].goodsPrice}</span>
							<span class="showImg">${goodsData[liNum].goodsImg}</span>
						</li>`;
	}
}