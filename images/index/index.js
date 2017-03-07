$(function(){
	
	//鼠标移入li的时候,获取当前li的index
	$("#hdp>ul>li").mouseover(function(){
		hdp($(this).index()+1);
	});
	
	//鼠标移出li的时候,轮播自动
	$("#hdp>ul>li").mouseout(function(){
		clearInterval(myTime);
		myTime = setInterval("hdp(0)", time);
	});
	
	//鼠标点击回到上一张
	$("#prev").click(function(){
		count--;
		if(count<1){
			count=5;
		}
		hdp(count);
	});
	//鼠标移出的时候,轮播自动
	$("#prev").mouseout(function(){
		clearInterval(myTime);
		myTime = setInterval("hdp(0)", time);
	});
	
	
	//鼠标点击去到下一张
	$("#next").click(function(){
		hdp(count+1);
	});
	//鼠标移出的时候,轮播自动
	$("#next").mouseout(function(){
		clearInterval(myTime);
		myTime = setInterval("hdp(0)", time);
	});
	
	
});


	var count = 1; /*设置初始值为1，也就是轮播的第一张图*/
	var myTime; /*用来接收setInterval()函数*/
	var time=3000;/*设置定时器间隔时间*/
	function hdp(id){
		count++;
		if(id > 0) {
			clearInterval(myTime); /*取消setInterval()函数设定的定时执行操作*/
			count = id; /*将当前获取到的id的值赋给count*/
		}
		if(count>5){
			count=1;
		}
		//	调用setBgColor()方法,改变背景色
		setBgColor(count);
		$("#imgs").hide();
		$("#imgs")[0].src="images/index/m_lunbo"+count+".jpg";
		$("#imgs").fadeIn(1000);
		
	}
	
	//  将hdp()的参数设置为0，实现周期循环，并赋给mytimee
	myTime = setInterval("hdp(0)", time);
	

	/*更换背景色*/
	function setBgColor(c){
		for(var i = 1; i < 6; i++) {
			if(i == c) {
				//设置选中的背景色
				$("#num"+i).attr("class","colorA");
			} else {
				//设置未被选中的背景色
				$("#num"+i).attr("class","colorB");
			}
		}
		switch(c){
			case 1:
			$(".slider").css("background-color","#d1edf9");break;
			case 2:
			$(".slider").css("background-color","#c4e9fb");break;
			case 3:
			$(".slider").css("background-color","#75b6f6");break;
			case 4:
			$(".slider").css("background-color","#11315a");break;
			case 5:
			$(".slider").css("background-color","#f9f9f9");break;
			default:
			break;
		}
	}