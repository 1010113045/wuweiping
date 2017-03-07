$(function(){
	choose();
	showPro();
	checkInfo();
	revisePwd();
	personal();
});


//=====个人中心=======
function personal(){
	var URL=window.location.href;//获取当前页面URL
	var a=URL.lastIndexOf("/");//在URL地址中，找到最后一个/的下标
	var b=URL.substring(a+1);//从URL地址中，截取指定下标后面的字符串
	var per="personal.html";
	if(b==per){
		$("#menu>li").eq(0).children().removeClass("aColor");
		$(".box").eq(0).css("display","none");
		$("#menu>li").eq(4).children().addClass("aColor");
		$(".box").eq(4).css("display","block");
	}
}


//menu显示隐藏切换
function choose(){
	$("#menu>li").click(function(){
		var index=$(this).index();
		for(var i=0;i<6;i++){
			if(index==i){
				$("#menu>li").eq(i).children().addClass("aColor");
				$(".box").eq(i).css("display","block");
			}else{
				$("#menu>li").eq(i).children().removeClass("aColor");
				$(".box").eq(i).css("display","none");
			}
		}
	});
}

//我的订单开始
$(".orders_menu>li").click(function(){
	for(var i=0;i<$(".orders_menu>li").length;i++){
		if($(this).index()==i){
			$(".orders_menu>li>a").eq(i).addClass("aColor");
			$(".order"+i).css("display","block");
		}else{
			$(".orders_menu>li>a").eq(i).removeClass("aColor");
			$(".order"+i).css("display","none");
		}
	}
});



/*省市级联*/
var pro=new Array();
pro["广东省"]=["广州市","深圳市","潮州市"];
pro["海南省"]=["琼海市","海口市","三亚市"];
var city=new Array();
city["广州市"]=["艾欧尼亚","战争学院","水晶之恋"];
city["深圳市"]=["德玛西亚","皮尔特夫","暗影之岛"];
city["潮州市"]=["卡拉曼达","黑色玫瑰","诺克萨斯"];
city["琼海市"]=["雷瑟守备","钢铁烈阳","水晶之衡"];
city["海口市"]=["裁决之地","皮尔特夫","影流"];
city["三亚市"]=["守望之海","均和教派","祖安"];

function showPro(){
	var p=document.getElementById("province");
	for(var i in pro){
		var opt=document.createElement("option");
		opt.innerHTML=i;
		p.appendChild(opt);
	}
}
function changePro(){
	var p=document.getElementById("province");
	var c=document.getElementById("city");
	c.innerHTML="";
	var str=p.value;
	for(var i in pro){
		if(i==str){
			for(var y=0;y<pro[str].length;y++){
				var opt=document.createElement("option");
		        opt.innerHTML=pro[str][y];
		        c.appendChild(opt);
			}
		}
	}
}
function changeArea(){
	var c=document.getElementById("city");
	var a=document.getElementById("area");
	a.innerHTML="";
	var str=c.value;
	for(var i in city){
		if(i==str){
			for(var y=0;y<city[str].length;y++){
				var opt=document.createElement("option");
		        opt.innerHTML=city[str][y];
		        a.appendChild(opt);
			}
		}
	}
}



var users=false;
var address=false;
var code=false;
var phone=false;
var redColor="red";//未通过时显示的颜色
var limeColor="limegreen";//通过时显示的颜色
function checkInfo(){
	//	判断收货人姓名
	$("#userName>input").blur(function(){
		var values=$("#userName>input")[0].value;
		if(values.length==0){
			$("#userName>span")[0].innerHTML="收货人姓名不能为空!";
			$("#userName>span").css("color",redColor);
			users=false;
		}else{
			$("#userName>span")[0].innerHTML="√";
			$("#userName>span").css("color",limeColor);
			users=true;
		}
	});
	
	//  判断详细地址
	$("#amply_address>input").blur(function(){
		var values=$("#amply_address>input")[0].value;
		if(values.length==0){
			$("#amply_address>span")[0].innerHTML="详细地址不能为空!";
			$("#amply_address>span").css("color",redColor);
			address=false;
		}else{
			$("#amply_address>span")[0].innerHTML="√";
			$("#amply_address>span").css("color",limeColor);
			address=true;
		}
	});
	
	//  判断邮编号
	$("#code>input").blur(function(){
		var re=/^\d{6}$/;
		var values=$("#code>input")[0].value;
		if(values.length==0){
			$("#code>span")[0].innerHTML="邮政编号不能为空!";
			$("#code>span").css("color",redColor);
			code=false;
		}else if(re.test(values)){
			$("#code>span")[0].innerHTML="√";
			$("#code>span").css("color",limeColor);
			code=true;
		}else{
			$("#code>span")[0].innerHTML="邮政编码必须为数字，且为6位";
			$("#code>span").css("color",redColor);
			code=false;
		}
	});
	
	//  判断手机号
	$("#phone>input").blur(function(){
		var yd=/^([1](([3][456789]){1}|([5][012789]){1}|([8][78]){1})){1}([0-9]){8}$/;
		var lt=/^([1](([3][01)2]){1}|([5][56]){1}|([8][56]){1})){1}([0-9]){8}$/;
		var dx=/^([1](([35][3]){1}|([8][019]){1})){1}([0-9]){8}$/;
		var values=$("#phone>input")[0].value;
		if(values.length==0){
			$("#phone>span")[0].innerHTML="联系方式不能为空!";
			$("#phone>span").css("color",redColor);
			phone=false;
		}else if(yd.test(values)){
			$("#phone>span")[0].innerHTML="√(移动)";
			$("#phone>span").css("color",limeColor);
			phone=true;
		}else if(lt.test(values)){
			$("#phone>span")[0].innerHTML="√(联通)";
			$("#phone>span").css("color",limeColor);
			phone=true;
		}else if(dx.test(values)){
			$("#phone>span")[0].innerHTML="√(电信)";
			$("#phone>span").css("color",limeColor);
			phone=true;
		}else{
			$("#phone>span")[0].innerHTML="请输入正确的手机号!";
			$("#phone>span").css("color",redColor);
			phone=false;
		}
	});
	
	//邮箱判断
	$("#email>input").blur(function(){
		var re=/^\w+([\.-]?\w+)*@\w([\.-]?\w+)*(\.\w{2,3})+$/;
		var values=$("#email>input")[0].value;
		if(values.length==0){
			$("#email>span")[0].innerHTML="";
		}else if(re.test(values)){
			$("#email>span")[0].innerHTML="√";
			$("#email>span").css("color",limeColor);
		}else{
			$("#email>span")[0].innerHTML="请输入正确邮箱!";
			$("#email>span").css("color",redColor);
		}
	});
}


//点击重置时，将表单信息置为false
$("#btn>input[type='reset']").click(function(){
	users=false;
	address=false;
	code=false;
	phone=false;
	$("#userName>span")[0].innerHTML="";
	$("#amply_address>span")[0].innerHTML="";
	$("#code>span")[0].innerHTML="";
	$("#phone>span")[0].innerHTML="";
	$("#email>span")[0].innerHTML="";
});
//点击保存时，判断用户填写信息是否符合
$("#btn>input[type='submit']").click(function(){
	console.log(users);
	if(users&&address&&code&&phone){
		caution("信息保存成功!","确定","否")//调用警告框方法
		$(".centerBoxButton>button:eq(1)").remove();//删除否定按钮
		$(".centerBoxButton>button:eq(0)").click(function(){
			$(".reminderBox").remove();//删除提示框
		});
	}else if(!users){
		caution("请核查信息是否填写正确:【收货人】","确定","否")//调用警告框方法
		$(".centerBoxButton>button:eq(1)").remove();//删除否定按钮
		$(".centerBoxButton>button:eq(0)").click(function(){
			$(".reminderBox").remove();//删除提示框
		});
		$("#userName>span")[0].innerHTML="*(必填)";	
		$("#userName>span").css("color",redColor);
	}else if(!address){
		caution("请核查信息是否填写正确:【详细地址】","确定","否")//调用警告框方法
		$(".centerBoxButton>button:eq(1)").remove();//删除否定按钮
		$(".centerBoxButton>button:eq(0)").click(function(){
			$(".reminderBox").remove();//删除提示框
		});
		$("#amply_address>span")[0].innerHTML="*(必填)";
		$("#amply_address>span").css("color","red");
	}else if(!code){
		caution("请核查信息是否填写正确:【邮政编码】","确定","否")//调用警告框方法
		$(".centerBoxButton>button:eq(1)").remove();//删除否定按钮
		$(".centerBoxButton>button:eq(0)").click(function(){
			$(".reminderBox").remove();//删除提示框
		});
		$("#code>span")[0].innerHTML="*(必填)";
		$("#code>span").css("color",redColor);
	}else if(!phone){
		caution("请核查信息是否填写正确:【联系电话】","确定","否")//调用警告框方法
		$(".centerBoxButton>button:eq(1)").remove();//删除否定按钮
		$(".centerBoxButton>button:eq(0)").click(function(){
			$(".reminderBox").remove();//删除提示框
		});
		$("#phone>span")[0].innerHTML="*(必填)";
		$("#phone>span").css("color",redColor);
	}
});


//更改密码
var oldP=false;
var newP=false;
var newPs=false;
function revisePwd(){
	var nub=/^\d+$/;
	var zimu=/^[a-zA-Z]+$/;
	//判断空格符
	var nulls=/^(\w*\s+\w*)*(\s+\w*)*(\w*\s+)*(\s+\S*)*(\S*\s+)*$/;
	
	$("#oldPwd>input").blur(function(){
		var oldP=$("#oldPwd>input")[0].value;
		if(oldP.length==0){
			$("#oldPwd>span")[0].innerHTML="密码不能为空!";
			$("#oldPwd>span").css("color",redColor);
		}else{
			$("#oldPwd>span")[0].innerHTML="";
		}
	});
	
	$("#newPwd>input").blur(function(){
		var oldP=$("#oldPwd>input")[0].value;
		var newP=$("#newPwd>input")[0].value;
		if(newP.length==0){
			$("#newPwd>span")[0].innerHTML="密码不能为空!";
			$("#newPwd>span").css("color",redColor);
		}else if(newP.length<6){
			$("#newPwd>span")[0].innerHTML="密码不能小于6位!";
			$("#newPwd>span").css("color",redColor);
		}else if(nulls.test(newP)){
			$("#newPwd>span")[0].innerHTML="密码不能含有空格符!";
			$("#newPwd>span").css("color",redColor);
		}else if(nub.test(newP)){
			$("#newPwd>span")[0].innerHTML="密码不能为纯数字!";
			$("#newPwd>span").css("color",redColor);
		}else if(zimu.test(newP)){
			$("#newPwd>span")[0].innerHTML="密码不能为纯字母!";
			$("#newPwd>span").css("color",redColor);
		}else if(newP==oldP){
			$("#newPwd>span")[0].innerHTML="旧密码不安全，请重新输入新密码!";
			$("#newPwd>span").css("color",redColor);
		}else{
			if(newP.length<8){
				$("#newPwd>span")[0].innerHTML="密码安全性：低";
				$("#newPwd>span").css("color","lightcoral");
			}else if(newP.length<12){
				$("#newPwd>span")[0].innerHTML="密码安全性：中";
				$("#newPwd>span").css("color","lightblue");
			}else{
				$("#newPwd>span")[0].innerHTML="密码安全性：高";
				$("#newPwd>span").css("color","lime");
			}
		}
	});
	
	$("#newPwds>input").blur(function(){
		var newP=$("#newPwd>input")[0].value;
		var newPs=$("#newPwds>input")[0].value;
		if(newP==newPs){
			$("#newPwds>span")[0].innerHTML="密码一致";
			$("#newPwds>span").css("color","lime");
		}else{
			$("#newPwds>span")[0].innerHTML="两次密码不相同!";
			$("#newPwds>span").css("color",redColor);
		}
	});
}





