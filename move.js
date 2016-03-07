/*运动插件一 版本1.1*/
	//var t=null;
	/*缓存运动*/
	function movePlay(obj,attr,iTarget,fn){
	iTarget=parseInt(iTarget);
	clearInterval(obj.t);
	obj.t=setInterval(function(){
		if(attr=="opacity"){
			var num=parseInt(parseFloat(getStyle(obj,attr)*100));
			if(isNaN(num)){
				num=100;
			}
		}else{
			var num=parseInt(getStyle(obj,attr));
		}
		if(iTarget>num){
			var iSpeed=Math.ceil((iTarget-num)/5);
		}else{
			var iSpeed=Math.floor((iTarget-num)/5);
		}
		if(num==iTarget){
			clearInterval(obj.t);
			if(fn){
				fn();
			}
		}else{
			if(attr=="opacity"){
				obj.style[attr]=(num+iSpeed)/100;
				obj.style.filter="alpha(opacity="+(num+iSpeed)+")"
			}else{
				obj.style[attr]=num+iSpeed+"px";
			}
		}
	},30);
	}
	/*多属性缓存运动*/
		function movePlays(obj,json,fn){
			var onOff=true;
	clearInterval(obj.t);
	obj.t=setInterval(function(){
		for(var i in json){
			var attr=i;
			var iTarget=json[i];
		if(attr=="opacity"){
			var num=parseInt(parseFloat(getStyle(obj,attr)*100));
			if(isNaN(num)){
				num=100;
			}
		}else{
			var num=parseInt(getStyle(obj,attr));
		}
		if(iTarget>num){
			var iSpeed=Math.ceil((iTarget-num)/5);
		}else{
			var iSpeed=Math.floor((iTarget-num)/5);
		}
		if(num!=iTarget){
			onOff=false;
			}
			if(attr=="opacity"){
				obj.style[attr]=(num+iSpeed)/100;
				obj.style.filter="alpha(opacity="+(num+iSpeed)+")"
			}else{
				obj.style[attr]=num+iSpeed+"px";
			}
		}
		if(onOff){
			console.log(01);
			clearInterval(obj.t);
			if(fn){
				fn();
			}
		}
	},30);
	}
	/*获取自身非行间样式属性*/
	function getStyle(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];			
		}else{
			return getComputedStyle(obj,false)[attr];			
		}
	}
	/*获取id*/
	function $(id){
		return document.getElementById(id);
	}
	/*匀速运动*/
	function Umove(obj,attr,iTarget){
		var oTxt=$("txt");
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			var s=parseInt(getStyle(obj,attr));
			var speed=0;
			if(iTarget>s){
				speed=7;
			}else{
				speed=-7;
			}
			if(Math.abs(iTarget-s)<=speed){
				obj.style[attr]=iTarget+"px";
				clearInterval(obj.timer);
			}else{
				oTxt.value+=iTarget-s+"\n";
				obj.style[attr]=s+speed+"px";
			}
		},30);
	}