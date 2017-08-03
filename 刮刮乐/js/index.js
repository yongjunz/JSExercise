var str = '';
var num = 144;
var divs = document.getElementsByTagName('div');

for(var i =0; i < num; i++){
	str +='<div style="left:'+ (i%16)*120 +'px;top:'+Math.floor(i/16)*120+'px;background-position: '+ ( -(i%16)*120 ) +'px '+ ( -Math.floor(i/16)*120 ) +'px;"></div>';
}
document.body.innerHTML = str;

for(var j = 0; j < num; j++){
	divs[j].onmouseover = function(){
		if(this.style.left == '0px' && this.style.top == '0px'){
			this.style.transformOrigin = 'left top';
		}else if(this.style.left == '0px'){
			this.style.transformOrigin = 'left center';
		}else if(this.style.top == '0px'){
			this.style.transformOrigin = 'center top';
		}
		this.style.opacity = 1;
		this.style.transform = 'scale(1.3)';
		this.style.zIndex = 2;
	}
	divs[j].onmouseout = function(){
		this.style.transform = 'scale(1)';
		this.style.zIndex = 1;
	}
}