$(".sort").click(function(){
	console.log($(this).index());
	for(var i=0;i<$(".sort").length;i++){
		if($(this).index()-1==i){
			$(".sort").eq(i).children().css("color","#FF4281");
			var className=$(".sort>a>span")[i].className;
			if(className=="icon-arrow-down"){
				className=$(".sort>a>span")[i].className="icon-arrow-up";
				$(".items1").css("display","block");
				$(".items2").css("display","none");
			}else{
				className=$(".sort>a>span")[i].className="icon-arrow-down";
				$(".items1").css("display","none");
				$(".items2").css("display","block");
			}
		}else{
			$(".sort").eq(i).children().css("color","#383838");
		}
	}
});

$(".page").click(function(){
	console.log($(this).index());
	for(var i=1;i<=$(".page").length;i++){
		if($(this).index()==i){
			$(".page").eq(i-1).addClass("aColor");
		}else{
			$(".page").eq(i-1).removeClass("aColor");
		}
	}
});
