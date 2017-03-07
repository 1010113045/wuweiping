$(function(){
	showPro();
	changeArea();
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