var list = $('#list');
//生成结构
function creatHtml(data){
    var html = '<ul>'
    data.forEach(function(item){
        html += `<li><span>${item.title}</span>`;
        if(item.child){
            html += creatHtml(item.child);
        }
        html+= `</li>`;
    })
    html += '</ul>';
    return html;
}
list.innerHTML = creatHtml(arr);
//初始化并判断是否有下级菜单
function fn(parent){
    //var uls = parent.children;
    //Array.from(uls).forEach(function(item){
        var lis = parent.children;
        Array.from(lis).forEach(function(item){
            if( item.children.length > 1 && item.nodeName === 'LI' ){
                item.isShow = false;//状态，false代表未展开
                item.firstElementChild.className = 'add';
            }
            Array.from(item.children).forEach(function(item){
                if( item.nodeName === 'UL' ){
                    item.style.display = 'none';
                }
            });
            fn(item);
        });
    //});
}
fn(list.children[0]);
var allMenu = $('li',list);//获取所有菜单
var len = allMenu.length;
for( var i = 0; i < len; i++ ){
    allMenu[i].isShow = false;
    allMenu[i].onclick = function(){
        event.stopPropagation();
        if( this.children.length <= 1 ){
            return;
        }event
        if(this.isShow){
            this.isShow = false;
            this.firstElementChild.className = 'add';
            Array.from(this.children).forEach(function(item){
                if( item.nodeName === 'UL' ){
                    item.style.display = 'none';
                }
            });
        }else{
            var parent = this.parentNode;
            //var childs = parent.children;
            //for( var i = 0; i < childs.length; i++ ){
                fn(parent);
            //}

            /*Array.from(childs).forEach(function(item){
                if( item.children.length > 1 && item.nodeName === 'LI' ){
                    item.isShow = false;
                    item.firstElementChild.className = 'add';
                    Array.from(item.children).forEach(function(item){
                        if( item.nodeName === 'UL' ){
                            item.style.display = 'none';
                        }
                    });
                }
                fn(item);
            });*/
            this.firstElementChild.className = 'line';
            Array.from(this.children).forEach(function(item){
                if( item.nodeName === 'UL' ){
                    item.style.display = 'block';
                }
            });
            this.isShow = true;
        }
    }
}