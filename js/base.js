$(function(){
	window.onscroll=function(){
		var h = window.pageYOffset ||document.documentElement.scrollTop || document.body.scrollTop|| 0;
		if(h>500){
			$(".rightsidebar").css("display","block");
		}else{
			$(".rightsidebar").css("display","none");
		}
	}
	aHref();//封掉所有<a href="#"></a>
	
	
//	window.localStorage.removeItem("users");

	isLogin(0);//加载页面时调用，且传参值为0
	
	userInfo();//限制登录
});


//封掉所有<a href="#"></a>
function aHref(){
	var a=document.getElementsByTagName("a");
	//console.log(a.length);
	for(var i=0;i<a.length;i++){
		//console.log(a[i].getAttributeNode("href").value);
		if(a[i].getAttributeNode("href").value=="#"){
			a[i].getAttributeNode("href").value="javascript:;";
		}
	}
}


//点击加入购物车
$(".addCart").click(function(){
	var users=JSON.parse(window.localStorage.getItem("users")||"[]");
	if(users.length==0){
		caution("您还未登录 , 是否进行登录?","是","否")//调用警告框方法
		$(".centerBoxButton>button:eq(0)").click(function(){
			$(".reminderBox").remove();//删除提示框
			window.location.href="login.html";
		});
		$(".centerBoxButton>button:eq(1)").click(function(){
			$(".reminderBox").remove();//删除提示框
			//window.location.href="index.html";
		});
	}else{
		caution("添加商品成功!","是","否")//调用警告框方法
		$(".centerBoxButton>button:eq(1)").remove();//删除否定按钮
		$(".centerBoxButton>button:eq(0)").click(function(){
			$(".reminderBox").remove();//删除提示框
		});
	}
});


//点击登录时调用，且传参值为1
$(".login").click(function(){
	isLogin(1);
});
function isLogin(what){
	console.log(window.location);
	var userpass = JSON.parse(window.localStorage.getItem("userpass")||"[]");
	
	var users = JSON.parse(window.localStorage.getItem("users")||"[]");

	var userVal = "";
	var pwdVal = "";
	var flag = 0;
	if(what==1){
		userVal=$(".font_name>input").val();
		pwdVal=$(".font_pwd>input").val();
		for(var i=0;i<userpass.length;i++){
			if(userVal==userpass[i].username&&pwdVal==userpass[i].password){
				users.push({username:userVal});
				var strr = JSON.stringify(users);
				window.localStorage.setItem("users",strr);
				//alert("测试：记录成功！");
				return;
			}else{
				flag++;
			};
		};
		
		if(flag == userpass.length){
			return false;
		};
		
	}else if(what==0){
		//alert("测试："users.length);
		if(users.length>0){
			user=users[0].username;//获取用户名
			$("#userName").empty();//清除子节点
			$("#userName").append("<a class='fl'>"+user+"</a>");
			$("#userName").append("<a class='exit fr'>退出</a>");
			$("#userName>a.fr").css({
				"padding":"0 5px",
				"cursor":"pointer"
			});
			
			$(".shopping_num").html(3);//设置购物车数量
		}else{
			$(".shopping_num").remove();
		}
	}
}

//单击退出，清除用户名
$("#userName").click(function(){
	if($("#userName>a.fr").hasClass("exit")){
		caution("您确定要退出?","确定","取消")//调用警告框方法
		$(".centerBoxButton>button:eq(0)").click(function(){
			window.localStorage.removeItem("users");
			$(".reminderBox").remove();//删除提示框
			window.location.assign(location.href);
			window.location.href="index.html";
		});
		$(".centerBoxButton>button:eq(1)").click(function(){
			$(".reminderBox").remove();//删除提示框
		});
	}
});

function userInfo(){
	var users=JSON.parse(window.localStorage.getItem("users")||"[]");
	var URL=window.location.href;//获取当前页面URL
	
	//===限定以下地址需要登录才能进入==开始
	var per="personal.html";
	var my="myOrders.html";
	var cart="shoppingCart.html";
	//===限定以下地址需要登录才能进入==结束
	
	var a=URL.lastIndexOf("/");//在URL地址中，找到最后一个/的下标
	var b=URL.substring(a+1);//从URL地址中，截取指定下标后面的字符串
	if(b==per||b==my||b==cart){
		if(users.length==0){
			caution("您还未登录 , 是否进行登录?","是","否")//调用警告框方法
			$(".centerBoxButton>button:eq(0)").click(function(){
				$(".reminderBox").remove();//删除提示框
				window.location.href="login.html";
			});
			$(".centerBoxButton>button:eq(1)").click(function(){
				$(".reminderBox").remove();//删除提示框
				window.location.href="index.html";
			});
		}else{
			$(".userInfo_cent>div:eq(0)").children().eq(1).html(users[0].username);
			$(".userInfo_cent>div:eq(1)").children().eq(1).html(users[0].username);
		}
	}
}



//（封装）警告框提示样式
//caution(提示文本,but1,but2);
function caution(text,but1,but2){
	//警告框开始<--
	$("body").append("<div class='reminderBox'></div>");
	$(".reminderBox").append("<div class='centerBox'></div>");
	$(".centerBox").append("<div class='centerBoxText'></div>");
	$(".centerBoxText").html(text);
	$(".centerBox").append("<div class='centerBoxButton'></div>");
	$(".centerBoxButton").append("<button>"+but1+"</button>");
	$(".centerBoxButton").append("<button>"+but2+"</button>");
	//警告框结束-->
}
