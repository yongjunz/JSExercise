var list = document.getElementById("list");
var imgBox = document.getElementById("imgBox");
var img = document.getElementById("img");
var text = document.getElementById("text");
var send = document.getElementById("send");
var state = true;


var className1 = "fl";
var className2 = "msgL";
var className3 = "triangleL";

imgBox.onclick = function(){
	if(state){
		img.src="images/head2.png";
		state = false;
	}else{
		img.src="images/head1.png";
		state = true;
	}
};

send.onclick = function(){
	if(text.value ==""){
		alert("请输入内容！")
	}else{
		if(state){
			className1 = "fl";
			className2 = "msgL";
			className3 = "triangleL";
		}else{
			className1 = "fr";
			className2 = "msgR";
			className3 = "triangleR";
		}
		list.innerHTML = '<li class="clearfix">'
						 	+'<div class="headShow ' + className1 +'">'+imgBox.innerHTML+'</div>'
							+'<div class="msg ' + className2 + '">'
								+'<div class="triangle ' + className3 + '"></div>'
								+'<span>'
									+ '说：' + text.value
								+'</span>'
							+'</div>'
						+'</li>' 
						+ list.innerHTML;


	}
	text.value = "";
};