$(function(){
	$(".allChoose>input")[0].checked=true;
	allChoose();
	zongjia();
	isShopping();
});

//删除商品功能
$(".del>a").click(function(){
	var ulIndex=$(this).parent().parent().index();//记录当前要删除ul的index
	delShopping(ulIndex);//调用方法将商品删除
});

//获取 ====单价price   数量number  单个产品的总价total
//function price(obj){
//	return $(obj).parent().find("input").val();
//}
function number(obj){
	return $(obj).parent().find("input").val();
}
//function total(obj){
//	return $(obj).parent().next().html();
//}

//商品数量减少====单击-号进行数量减少
$(".number>button.sub").click(function(){
//	console.log($(this).index());
	if(number($(this))>1){
		$(this).parent().find("input").val(number($(this))-1);
	}else{
		var ulIndex=$(this).parent().parent().index();//记录当前要删除ul的index
		delShopping(ulIndex);//调用方法将商品删除
	}
	evaluate($(this));
});

//商品数量增加====单击+号进行数量增加
$(".number>button.add").click(function(){
	if(number($(this))<99){
		$(this).parent().find("input").val(parseInt(number($(this)))+1);
	}else{
		restrict();//调用提示框
	}
	evaluate($(this));
});

//手动输入商品数量
$(".number>input").blur(function(){
	var re=/^\d+$/;
	if(re.test($(this).val())){
		if($(this).val()<1){
			var ulIndex=$(this).parent().parent().index();//记录当前要删除ul的index
			delShopping(ulIndex);//调用方法将商品删除
			$(this).val(1);
		}else if($(this).val()>99){
			restrict();//调用提示框
			$(this).val(99);
		}
	}else{
		$(this).val(1);
	}
	evaluate($(this));
});

//单个产品总计功能====产品单价*产品数量
function evaluate(obj){
	$(obj).parent().parent().find(".info>input")[0].checked=true;
	var pri=$(obj).parent().prev().find("p").html();
	var num=$(obj).parent().find("input").val();
	$(obj).parent().next().html(num*pri+".00");
	zongjia();
}

//全部产品总计功能 ====将勾选的产品总价进行合计
function zongjia(){
//	$(".info>input").attr("checked","checked");
		var tot=$(".total");
		var check=$(".info>input");
		var account=0;
		for(var i=0;i<tot.length;i++){
			if(check[i].checked){
				account+=parseInt(tot.eq(i).html());
			}
		}
	$(".account>span:eq(1)").html("￥"+account+".00元");
	isAllCheck();//调用方法，判断是否全部勾选
	isShopping();//调用方法，判断是否还有商品在购物车
}

//单选功能 ：通过改变商品数量，自动勾线当前选项
$(".allGoods>ul>li").children("button").click(function(){
	$(this).parent().siblings().eq(0).children("input").check=true;
	isAllCheck();
})
$(".allGoods>ul>li").children("input").change(function(){
	$(this).parent().siblings().eq(0).children("input").check=true;
	isAllCheck();
})

//单选功能 ：通过  勾选，反选改变全部产品总价
$(".info>input").click(function(){
	var flog=false;//初始化为false
	var tot=$(this).parent().parent().find(".total").html();//获取单项产品总价
	var sum=$(".account>span:eq(1)").html();//获取全部商品总价
	//判断当前是否勾选
	if($(this)[0].checked){
		//console.log("0"+$(this)[0].checked);
		sum=parseInt(sum.slice(1,-1))+parseInt(tot);//全部商品总价=全部商品总价+单项商品总价
		$(".account>span:eq(1)").html("￥"+sum+".00元");
		isAllCheck();
	}else{
		//console.log("1"+$(this)[0].checked);
		sum=parseInt(sum.slice(1,-1))-parseInt(tot);//全部商品总价=全部商品总价-单项商品总价
		$(".account>span:eq(1)").html("￥"+sum+".00元");
		$(".allChoose>input")[0].checked=false;
	}
});

//判断是否全部勾选了
function isAllCheck(){
	for(var i=0;i<$(".info>input").length;i++){
			//判断是否为true 只要有一个false就return
			if(!$(".info>input")[i].checked){
				return;
			}else{
				//如果全部为true就将flog的值改为true
				flog=true;
			}
		}
		if(flog){
			//当flog为true时，就说明商品全都勾选了，这是将全选按钮设置为true
			$(".allChoose>input")[0].checked=true;
		}
}


//全选功能
$(".allChoose>input").click(allChoose);
function allChoose(){
	if($(".allChoose>input")[0].checked){
		for(var i=0;i<$(".info>input").length;i++){
			$(".info>input")[i].checked=true;
		}
	}else{
		for(var i=0;i<$(".info>input").length;i++){
			$(".info>input")[i].checked=false;
		}
	}
	zongjia();
}

function delShopping(index){
	caution("您确定删除么?","确定","取消");
	$(".centerBoxButton>button:eq(0)").click(function(){
		$(".reminderBox").remove();
		$(".allGoods>ul").eq(index).remove();
		zongjia();
	});
	$(".centerBoxButton>button:eq(1)").click(function(){
		$(".reminderBox").remove();
		zongjia();
	});
}

function restrict(){
	caution("对不起,一次最多只能买99件商品!","确定","取消");
	$(".centerBoxButton>button:eq(0)").click(function(){
		$(".reminderBox").remove();
	});
	$(".centerBoxButton>button:eq(1)").remove();
}

//判断购物车是否还有商品
function isShopping(){
	if($(".allGoods").children().length<1){
		$(".allChoose>input")[0].checked=false;
	}
}
