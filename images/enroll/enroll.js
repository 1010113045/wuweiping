$(function(){
	btn();
})

//===============第一步验证邮箱==================
$(".font_name>input").blur(function(){
	var email=/^\w+([\.-]?\w+)*@\w([\.-]?\w+)*(\.\w{2,3})+$/;
	var val=$(".font_name>input")[0].value;
	if(val.length==0){
		$(".font_name>p")[0].innerHTML="邮箱不能为空！";
		$(".font_name>p").css("color","red");
		check("checkEmail","false");
	}else if(email.test(val)){
		//调用checkUser() 验证用户名是否存在/返回true说明存在
		if(checkUser()){
			clearText();//清除内容
		}else{
			$(".font_name>p")[0].innerHTML="邮箱格式正确可以使用!";
			$(".font_name>p").css("color","limegreen");
			check("checkEmail","true");
		}
	}else{
		$(".font_name>p")[0].innerHTML="邮箱格式不正确！";
		$(".font_name>p").css("color","red");
		check("checkEmail","false");
	}
});



//================第二步验证密码===================
$(".font_pwd>input").blur(function(){
	var pwd=$(".font_pwd>input")[0].value;
	var nub=/^\d+$/;
	var zimu=/^[a-zA-Z]+$/;
	//判断空格符
	var nulls=/^(\w*\s+\w*)*(\s+\w*)*(\w*\s+)*(\s+\S*)*(\S*\s+)*$/;
	if(pwd.length==0){
		$(".font_pwd>p")[0].innerHTML="密码不能为空!";
		$(".font_pwd>p").css("color","red");
		check("checkPwd","false");
	}else if(nulls.test(pwd)){
		$(".font_pwd>p")[0].innerHTML="密码不能含有空格符!";
		$(".font_pwd>p").css("color","red");
		check("checkPwd","false");
	}else if(pwd.length<6){
		$(".font_pwd>p")[0].innerHTML="密码不能少于6位!";
		$(".font_pwd>p").css("color","red");
		check("checkPwd","false");
	}else if(nub.test(pwd)){
		$(".font_pwd>p")[0].innerHTML="密码不能为纯数字!";
		$(".font_pwd>p").css("color","red");
		check("checkPwd","false");
	}else if(zimu.test(pwd)){
		$(".font_pwd>p")[0].innerHTML="密码不能为纯字母!";
		$(".font_pwd>p").css("color","red");
		check("checkPwd","false");
	}else{
		if(pwd.length<8){
			$(".font_pwd>p")[0].innerHTML="密码安全性：低";
			$(".font_pwd>p").css("color","lightcoral");
		}else if(pwd.length<12){
			$(".font_pwd>p")[0].innerHTML="密码安全性：中";
			$(".font_pwd>p").css("color","lightblue");
		}else{
			$(".font_pwd>p")[0].innerHTML="密码安全性：高";
			$(".font_pwd>p").css("color","limegreen");
		}
		check("checkPwd","true");
	}
});
//=============【第三步】两次密码匹配===============
$(".font_pwd2>input").blur(function(){
	var pwd=$(".font_pwd>input")[0].value;
	var pwd2=$(".font_pwd2>input")[0].value;
	if(pwd==pwd2){
		$(".font_pwd2>p")[0].innerHTML="密码一致";
		$(".font_pwd2>p").css("color","limegreen");
		check("checkPwd2","true");
	}else{
		$(".font_pwd2>p")[0].innerHTML="两次密码不相同!";
		$(".font_pwd2>p").css("color","red");
		check("checkPwd2","false");
	}
});



//======【第四步】判断是否同意注册条款==========
$(".regulations>input").click(function(){
	//如果有checked属性，就删除；没有就添加
	if($(".regulations>input").attr("checked")){
		$(".regulations>input").removeAttr("checked");
	}else{
		$(".regulations>input").attr("checked","checked");
	}
	console.log($(".regulations>input").attr("checked"));
	btn();
});
function btn(){
	//如果有checked属性就可以提交，否则就不能提交
	if($(".regulations>input").attr("checked")){
		$(".btn>input").css("background-color","#FF4281");
		$(".btn>input").attr("type","submit");
//		console.log("true");
	}else{
		$(".btn>input").css("background-color","#989898");
		$(".btn>input").attr("type","button");
//		console.log("false");
	}
}




//===========【第五步】判断表单是否全部通过====================
var checkEmail=false;
var checkPwd=false;
var checkPwd2=false;
function check(obj,why){
	if(obj=="checkEmail"&&why=="true"){
		checkEmail=true;
	}else if(obj=="checkEmail"&&why=="false"){
		checkEmail=false;
	}
	if(obj=="checkPwd"&&why=="true"){
		checkPwd=true;
	}else if(obj=="checkPwd"&&why=="false"){
		checkPwd=false;
	}
	if(obj=="checkPwd2"&&why=="true"){
		checkPwd2=true;
	}else if(obj=="checkPwd2"&&why=="false"){
		checkPwd2=false;
	}
}

//提交时，验证是否全部通过
function checkAll(){
	if(checkEmail==true&&checkPwd==true&&checkPwd2==true){
		console.log("checkEmail="+checkEmail);
		console.log("checkPwd="+checkPwd);
		console.log("checkPwd2="+checkPwd2);
		addUser();
		return isTrue;//返回false就不会执行action=""
	}else{
		caution("请核查信息是否填写完整!","去登陆","否")//调用警告框方法
		$(".centerBoxButton>button:eq(1)").remove();//删除否定按钮
		$(".centerBoxButton>button:eq(0)").click(function(){
			$(".reminderBox").remove();//删除提示框
		});
		return false;
	}
}






//======【获取用户名输入信息】 【获取localStorage存储信息】=======开始
var user=$(".font_name>input")[0];
var pwd=$(".font_pwd>input")[0];
//开始的时候获取本地存储，如果没有，置为[],否则获取
var str = window.localStorage.getItem("userpass")||"[]";
var userpass = JSON.parse(str);
//======【获取用户名输入信息】 【获取localStorage存储信息】=======结束


//验证用户名是否存在
function checkUser(){
	var username = user.value;
	if(userpass.length==0){
		return false;
	}
    for(var i=0;i<userpass.length;i++){
    	if(username==userpass[i].username){
    		return true;
    	}
    }
}



//添加新用户
function addUser(){
	var person = {username:user.value,password:pwd.value};
	userpass.push(person);
	var strr = JSON.stringify(userpass)
	window.localStorage.setItem("userpass",strr);
	caution("注册成功!","去登陆","否")//调用警告框方法
	$(".centerBoxButton>button:eq(1)").remove();//删除否定按钮
	$(".centerBoxButton>button:eq(0)").click(function(){
		$(".reminderBox").remove();//删除提示框
		window.location.href="login.html";
	});
	return isTrue=false;
}
//清空输入框内容
function clearText(){
	$(".font_name>input")[0].value="";
	$(".font_pwd>input")[0].value="";
	$(".font_pwd2>input")[0].value="";
	$(".font_name>p")[0].innerHTML="用户名已经存在,请更换其它邮箱!";
	$(".font_name>p").css("color","red");
	$(".font_pwd>p")[0].innerHTML="";
	$(".font_pwd2>p")[0].innerHTML="";
}



$(".state").click(function(){
	$(".stateBox").css("display","block");
})
$(".stateBox>h1>span").click(function(){
	$(".stateBox").css("display","none");
})
