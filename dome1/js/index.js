/*
//                            _ooOoo_  
//                           o8888888o  
//                           88" . "88  
//                           (| -_- |)  
//                            O\ = /O  
//                        ____/`---'\____  
//                      .   ' \\| |// `.  
//                       / \\||| : |||// \  
//                     / _||||| -:- |||||- \  
//                       | | \\\ - /// | |  
//                     | \_| ''\---/'' | |  
//                      \ .-\__ `-` ___/-. /  
//                   ___`. .' /--.--\ `. . __  
//                ."" '< `.___\_<|>_/___.' >'"".  
//               | | : `- \`.;`\ _ /`;.`/ - ` : | |  
//                 \ \ `-. \_ __\ /__ _/ .-` / /  
//         ======`-.____`-.___\_____/___.-`____.-'======  
//                            `=---='  
//  
//         .............................................  
//                  佛祖保佑             永无BUG 
//          佛曰:  
//                  写字楼里写字间，写字间里程序员；  
//                  程序人员写程序，又拿程序换酒钱。  
//                  酒醒只在网上坐，酒醉还来网下眠；  
//                  酒醉酒醒日复日，网上网下年复年。  
//                  但愿老死电脑间，不愿鞠躬老板前；  
//                  奔驰宝马贵者趣，公交自行程序员。  
//                  别人笑我忒疯癫，我笑自己命太贱；  
//                  不见满街漂亮妹，哪个归得程序员？ 
*/
/*
	1.获取元素
	2.生成每个ul的li
*/
window.onload=function(){
	var oTop=document.getElementById("top");
	var oLeft=document.getElementById("left");
	var oContent=document.getElementById("content");
	var oTxt=document.getElementById("text");
	var oBtn=document.getElementById("iet");
	var oUl=document.getElementById("history");
	var oDiv=document.getElementById("container");
	var oBtn2=document.getElementById("re");
	var arLi=oUl.getElementsByTagName("li");
	var oTar=document.getElementById("target");
	//记录
	var his=0;
	//旋转的角度
	var angle=0;
	//user输入的命令存放的地方
	var command=[];
	//列数
	var num=1;
	//第几列 不知道英文是否写错了英文差没办法
	var row=0;
	//每列的字数
	var len=1;
	//当检测到textarea的回车键弹起的时候
	oTxt.onkeydown=function(evb){
		var oEvent=evb||event;
		if(oEvent.keyCode==13){
			//生成li  本来还想调用之前那个生成li的方法可是~~
			var aLi=document.createElement("li");
			var arr=cdk();
			num++;
			aLi.innerHTML=num;
			oUl.appendChild(aLi);
			//如果行数太大超过父级容器的高度对不起li我要删除你
			pos(false);
			cdtf(arr,true);
		}
	}
	//当检测到textarea的退格键弹起的时候
	oTxt.onkeyup=function(evb){
		var oEvent=evb||event;
			if(oEvent.keyCode==8){
				//再次获取textarea的value值以便做判断是否减去列数
				var arr=cdk();
				//只要指令行数大于一执行
				if(oUl.firstChild&&num>1&&len==0){
					//删除最后一个行数
					pos(true);
					oUl.removeChild(oUl.lastChild);
					num--;
					console.log(num);
				}
				len=arr[arr.length-1].length;
			}
	}
	oBtn.onclick=function(){
		var arr=cdk();
		cdtf(arr,false);
		if(command!=[]){
/*			for(var i=0;i<his;i++){
				ipt(command[his]);
			}*/
			while(his<command.length){
					ipt(command[his]);
					his++;
			}
			his=command.length+1;
		}
	}
	//生成顶部的li（10个）
	createli(oTop,10,true);
	//生成左侧的li（10个）
	createli(oLeft,10,true);
	//生成大格的li（119个）
	createli(oContent,120,false);
	//生成li的方法
	function createli(obj,num,bool){
		for(var i=0;i<=num;i++){
			var aLi=document.createElement("li");
			if(bool){
				aLi.innerHTML=i;
			}
			obj.appendChild(aLi);
		}
	}
	//截取命令字符接口
	function cdk(){
			return oTxt.value.split(/\n/);
	}
	//判断命令是否输入正确
	function cdtf(arr,b){
		var pd=/([GO]{2}\s[0-9])$|([TRA]{3}\s([RIG]{3}|[LEF]{3}|[BOT]{3}|[TOP]{3})\s[0-9])$|([MOV]{3}\s([RIG]{3}|[LEF]{3}|[BOT]{3}|[TOP]{3})\s[0-9])$/.test(arr[row]);
			if(pd){
				command.push(arr[row]);
				console.log(command[command.length-1]);
			}else{
				b?arLi[num-2].className="red":arLi[num-1].className="red";
			}
			if(b){
				row++;
			}
	}
	//执行方法
	function ipt(str){
		var arr=str.split(" ");
		switch (arr[0])
		{
		case "GO":
			if(angle==0){
					if(parseInt(getStyle(oTar,"top"))<=0){
						oTar.style.top=0+"px";
					}else{
						move(oTar,{top:-52*arr[1]});
					}
			}else if(angle==180){
				if(parseInt(getStyle(oTar,"top"))>=520){
					oTar.style.top=520+"px";
				}else{
					move(oTar,{top:52*arr[1]});
				}
			}else if(angle==270){
					if(parseInt(getStyle(oTar,"left"))<=0){
						oTar.style.left=0+"px";
					}else{
						move(oTar,{left:-52*arr[1]});
					}
			}else if(angle==90){
					if(parseInt(getStyle(oTar,"left"))>=520){
						oTar.style.left=520+"px";
					}else{
						move(oTar,{left:52*arr[1]});
					}
			}
		break;
		case "TAR":
			jd(arr,function(index){
				if(index==1){
					if(parseInt(getStyle(oTar,"left"))<=0){
						oTar.style.left=0+"px";
					}else{
						move(oTar,{left:-52*arr[2]});
					}
				}else if(index==2){
					if(parseInt(getStyle(oTar,"left"))>=520){
						oTar.style.left=520+"px";
					}else{
						move(oTar,{left:52*arr[2]});
					}
				}else if(index==3){
					if(parseInt(getStyle(oTar,"top"))>=520){
						oTar.style.top=520+"px";
					}else{
						move(oTar,{top:52*arr[2]});
					}
				}else if(index==4){
					if(parseInt(getStyle(oTar,"top"))<=0){
						oTar.style.top=0+"px";
					}else{
						move(oTar,{top:-52*arr[2]});
					}
				}
			});
		break;
		case "MOV":
			jd(arr,function(index){
				if(index==1){
					if(parseInt(getStyle(oTar,"left"))<=0){
						oTar.style.left=0+"px";
					}else{
						move(oTar,{left:-52*arr[2]});					
					}
					angle=270;
					oTar.style.transform="rotate("+angle+"deg)";
				}else if(index==2){
					if(parseInt(getStyle(oTar,"left"))>=520){
						oTar.style.left=520+"px";
					}else{
						move(oTar,{left:52*arr[2]});
					}
					angle=90;
					oTar.style.transform="rotate("+angle+"deg)";
				}else if(index==3){
					if(parseInt(getStyle(oTar,"top"))>=520){
						oTar.style.top=520+"px";
					}else{
						move(oTar,{top:52*arr[2]});
					}
					angle=180;
					oTar.style.transform="rotate("+angle+"deg)";
				}else if(index==4){
					if(parseInt(getStyle(oTar,"top"))<=0){
						oTar.style.top=0+"px";
					}else{
						move(oTar,{top:-52*arr[2]});
					}
					angle=0;
					oTar.style.transform="rotate("+angle+"deg)";
				}
			});
		break;
		}
	}
	//判断方向的
	function jd(arr,fn){
			if(arr[1]=="RIG"){
				fn(1);
			}else if(arr[1]=="LEF"){
				fn(2);
			}else if(arr[1]=="BOT"){
				fn(3);
			}else if(arr[1]=="TOP"){
				fn(4);
			}
	}
	//用于列数与命令输入框同步
	function pos(b){
		if(oUl.offsetHeight>=oDiv.offsetHeight){
			if(b){
				oUl.style.top=parseInt(getStyle(oUl,"top"))+15;
			}else{
				oUl.style.top=parseInt(getStyle(oUl,"top"))-15;
			}
		}
	}
	//获取样式
	/*function getStyle(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj,false)[attr];
		}
	}*/
}