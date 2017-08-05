//获取元素
var unitCost = [12.5,10.5,8.5,8,14.5,20];//每个商品的单价
var len = unitCost.length;
var list = document.querySelector('.list');
var allGoods = document.querySelector('.total .allGoods');
var allPay = document.querySelector('.total .allPay');
var maxPrice = document.querySelector('.total .maxPrice');
var str = '';
var count = 0;//用来存储商品数量
var price = 0;//用来存储花费的费用
var max = 0;//用来存储最高商品单价

//根据数组个数及数据动态生成Li并保存在str中
for(var i = 0; i < len; i++){
	str +=`
		<li class="clearfix">
			<input type="button" class="reduce" name="reduce">
			<input type="text" value="0" class="goodsNum">
			<input type="button" class="add" name="add">
			<div class="info fl">
				单价：<i>${unitCost[i]}</i>元
				小计：<em>0</em>元
			</div>
		</li>
		`;
}
list.innerHTML = str;//将str渲染到list中
//为每一行li都执行函数
for(var j = 0; j < len; j++){
	addUp(j)
}
var allGoodsNum = list.querySelectorAll('.goodsNum');//待结构生成后获取所有显示商品数量的input

function addUp(num){
	var lis = list.getElementsByTagName('li')[num];
	var reduce = lis.querySelector('.reduce');
	var goodsNum = lis.querySelector('.goodsNum');
	var add = lis.querySelector('.add');
	var is = lis.querySelector('i');
	var ems = lis.querySelector('em');
	var n = 0;//每一行的商品个数

	reduce.onclick = add.onclick = function(){
		var savePrice = [];//用来存储数量不为0的商品的单价
		if(this.name == 'reduce'){//按减号的是时候执行
			if( parseInt(goodsNum.value) ){
				n--; //当前商品数量
				count--;//商品数量总计减一
				price -= parseFloat(is.innerHTML);
			}
		}else{//按加号的时候执行
			n++;
			count++;
			price += parseFloat(is.innerHTML);
		}
		goodsNum.value = n; //将自加或者自减后的n值显示在input中
		ems.innerHTML = n * parseFloat(is.innerHTML);//根据当前商品的购买数量计算费用
		allGoods.innerHTML = count;//展示当前所有购买商品数量
		allPay.innerHTML = price;//展示总价
		for(var i = 0; i < len; i++){
			//筛选所有数量不为0的商品的单价，并存储在savePrice数组中
			if( parseInt(allGoodsNum[i].value) ){
				savePrice.push( unitCost[i] )
				//savePrice[i] = unitCost[i];
			}else{
				continue;
				//savePrice[i] = 0;
			}
		}
		console.log(savePrice);
		//计算商品单价最高值
		max = savePrice[0];
		for(var j = 1; j < len; j++){
			if( savePrice[j] > max ){
				max = savePrice[j];
			}
		}
		//如果通过减少商品数量至所有数量均为0，那么数组下标0位为undefined,必须经过处理才能往页面输出
		if( !savePrice[0] ){
			max = 0;
		}
		maxPrice.innerHTML = max;
	}
}