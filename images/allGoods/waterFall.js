$.fn.waterfall=function(col,hS){
	var container = $(this);//就是瀑布流容器
	var items = container.children();//就是item的集合
	var width = container.width();//瀑布流容器的宽度
	var childWidth = 255;//就是item的宽度
	var column = col;//就是列数
	var space = (width - column*childWidth)/(column-1);//列与列之间的空隙
	var hSpace = hS;//行与行之间的间隙
	var columnArray = [];//用于后期记录每一列的高度
	
	items.each(function(index,obj){
		$obj = $(obj);
		if(index<column){
			//第一行排列
			$obj.css({"top":0,"left":index*(childWidth+space)});
			columnArray[index] = $obj.height();
		}else{
			//第二及之后的行排列
			var min = 0;
			for(var i=0;i<columnArray.length;i++){
				if(columnArray[i]<columnArray[min]){
					min=i;
				}
			}
			$obj.css({"top":columnArray[min]+hSpace,"left":min*(childWidth+space)});
			columnArray[min] += $obj.height()+hSpace;
		}
	});
	
	//给瀑布流设置高度
	var max = Math.max.apply(null,columnArray);
	container.css("height",max);
};
