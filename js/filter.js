//页面加载完毕时执行的函数
function addLoadEvent(func){
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	}else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}
 

var canvasa = document.getElementById("canvasa");
var contexta = canvasa.getContext("2d");

var canvasb = document.getElementById("canvasb");
var contextb = canvasb.getContext("2d");

var GreyEffect_btn = document.getElementById("GreyEffect");
var black = document.getElementById("black");
var reverseEffect_btn = document.getElementById("reverseEffect")
var blurEffect_btn = document.getElementById("blurEffect")
var mosaicEffect_btn = document.getElementById("mosaicEffect")
var cameo_btn = document.getElementById("cameo");


var image = new Image();

window.onload = function(){
	image.onload = function(){
		contexta.drawImage(image, 0, 0, canvasa.width , canvasa.height);
	}
}
    function getFileUrl(sourceId) {
    	var url;
    	if (navigator.userAgent.indexOf("MSIE") >= 1) { // IE   
    		url = document.getElementById(sourceId).value;
    	} else if (navigator.userAgent.indexOf("Firefox") > 0) { // Firefox   
    		url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
    	} else if (navigator.userAgent.indexOf("Chrome") > 0) { // Chrome   
    		url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
    	}
    	return url;
    }
    function preImg(sourceId, targetId) {   
        var url = getFileUrl(sourceId);   
        var imgPre = document.getElementById(targetId);   
        image.src = url;   
    }  

//灰度滤镜
function greyEffect(){
	var imageData = contexta.getImageData(0, 0, canvasa.width, canvasa.height);

	//获取像素信息
	var pixlData = imageData.data ;

	//遍历像素点
	for(var i = 0 ; i < canvasb.width*canvasb.height ; i++)
	{
		var r = pixlData[4*i+0];
		var g = pixlData[4*i+1];
		var b = pixlData[4*i+2];

		var grey = r*0.3 + g*0.59 + b*0.11;

		pixlData[i*4+0] = grey;
		pixlData[i*4+1] = grey;
		pixlData[i*4+2] = grey;
	}
	contextb.putImageData(imageData, 0, 0, 0, 0 , canvasb.width , canvasb.height);
}


GreyEffect_btn.onclick = function(){
	greyEffect();
}

//黑白滤镜
function blackEffect(){
	var imageData = contexta.getImageData(0, 0, canvasa.width, canvasa.height);

	//获取像素信息
	var pixlData = imageData.data ;

	//遍历像素点
	for(var i = 0 ; i < canvasb.width*canvasb.height ; i++)
	{
		var r = pixlData[4*i+0];
		var g = pixlData[4*i+1];
		var b = pixlData[4*i+2];

		var grey = r*0.3 + g*0.59 + b*0.11;
		if(grey >255/2){
			v = 255;
		}else{
			v = 0;
		}

		pixlData[i*4+0] = v;
		pixlData[i*4+1] = v;
		pixlData[i*4+2] = v;
	}
	contextb.putImageData(imageData, 0, 0, 0, 0 , canvasb.width , canvasb.height);
}

black.onclick = function(){
	blackEffect();
}

//反色滤镜
function reverseEffect(){
	var imageData = contexta.getImageData(0, 0, canvasa.width, canvasa.height);

	//获取像素信息
	var pixlData = imageData.data ;

	//遍历像素点
	for(var i = 0 ; i < canvasb.width*canvasb.height ; i++)
	{
		var r = pixlData[4*i+0];
		var g = pixlData[4*i+1];
		var b = pixlData[4*i+2];

		pixlData[i*4+0] = 255-r;
		pixlData[i*4+1] = 255-g;
		pixlData[i*4+2] = 255-b;
	}
	contextb.putImageData(imageData, 0, 0, 0, 0 , canvasb.width , canvasb.height);
}
reverseEffect_btn.onclick = function(){
	reverseEffect();
}


//模糊滤镜
function blurEffect(){
	var imageData = contexta.getImageData(0, 0, canvasa.width, canvasa.height);

	var tmpimageData = contexta.getImageData(0, 0, canvasa.width, canvasa.height);

	//获取像素信息
	var pixlData = imageData.data ;
	var tmppixlData = imageData.data;

	var blueR = 1;
	var totalnum = (2*blueR+1)* (2*blueR+1);
	for(var i = blueR; i <canvasb.height - blueR ; i++){
		for(var j = blueR; j<canvasb.width - blueR; j++){

			var totalr = 0,totalg = 0, totalb = 0;

			for(var dx = -blueR ; dx <= blueR ; dx++){
				for(var dy = -blueR ; dy<= blueR; dy++){

					//第i行第j列的像素周围的某一点
					var x = i + dx;
					var y = j + dy; 

					var p = x*canvasb.width +y;
					totalr += tmppixlData[p*4+0];
					totalg += tmppixlData[p*4+1];
					totalb += tmppixlData[p*4+2];
				}
			}


			//第i行第j列的像素
			var p = i*canvasb.width + j;

			pixlData[p*4+0] = totalr /totalnum;
			pixlData[p*4+1] = totalg /totalnum;
			pixlData[p*4+2] = totalb /totalnum;
		}
	}


	contextb.putImageData(imageData, 0, 0, 0, 0 , canvasb.width , canvasb.height);
}

blurEffect_btn.onclick = function(){
	blurEffect();
}

//马赛克滤镜
function mosaicEffect(){
	var imageData = contexta.getImageData(0, 0, canvasa.width, canvasa.height);
	var tmpimageData = contexta.getImageData(0, 0, canvasa.width, canvasa.height);

	//获取像素信息
	var pixlData = imageData.data ;
	var tmppixlData = imageData.data;

	var size = 5;
	var totalnum = size*size;

	for(var i = 0; i < canvasb.height ; i += size){
		for(var j = 0; j < canvasb.width ; j += size){
 
			var totalr = 0,totalg = 0, totalb = 0;

			for(var dx = 0 ; dx < size ; dx++){
				for(var dy = 0 ; dy< size; dy++){

					//第i行第j列的像素周围的某一点
					var x = i + dx;
					var y = j + dy; 

					var p = x*canvasb.width +y;
					totalr += tmppixlData[p*4+0];
					totalg += tmppixlData[p*4+1];
					totalb += tmppixlData[p*4+2];
				}
			}


			//第i行第j列的像素
			var p = i*canvasb.width + j;

			var resr = (totalr /totalnum);
			var resg = (totalg /totalnum);
			var resb = (totalb /totalnum);

			for(var dx = 0; dx < size ; dx++){
				for(var dy = 0; dy < size ; dy++){
					var x = i + dx ;
					var y = j + dy ;

					var p = x*canvasb.width +y;
					pixlData[p*4+0] = resr;
					pixlData[p*4+1] = resg;
					pixlData[p*4+2] = resb;
				}
			}
		}
	}
	contextb.putImageData(imageData, 0, 0, 0, 0 , canvasb.width , canvasb.height);
}

mosaicEffect_btn.onclick =function(){
	mosaicEffect();
}

//浮雕效果
function cameo(){
	var imageData = contexta.getImageData(0, 0, canvasa.width, canvasa.height);

	var tmpimageData = contexta.getImageData(0, 0, canvasa.width, canvasa.height);

	//获取像素信息
	var pixlData = imageData.data ;
	var tmppixlData = imageData.data;

	// var blueR = 1;
	// var totalnum = (2*blueR+1)* (2*blueR+1);
	for(var i = 1; i <canvasb.height - 1 ; i++){
		for(var j = 1; j<canvasb.width - 1; j++){

			var totalr = 0,totalg = 0, totalb = 0;

			for(var dx = -1 ; dx <= 1 ; dx++){
				for(var dy = -1 ; dy<= 1; dy++){

					//第i行第j列的像素周围的某一点
					var x = i + dx;
					var y = j + dy; 

					var p = x*canvasb.width +y;
					totalr = tmppixlData[p*4+0];
					totalg = tmppixlData[p*4+1];
					totalb = tmppixlData[p*4+2];
				}
			}


			//第i行第j列的像素
			var p = i*canvasb.width + j;

			pixlData[p*4+0] = pixlData[p*4+0]-totalr+128;
			pixlData[p*4+1] = pixlData[p*4+1]-totalg+128;
			pixlData[p*4+2] = pixlData[p*4+2]-totalb+128;
		}
	}


	contextb.putImageData(imageData, 0, 0, 0, 0 , canvasb.width , canvasb.height);
}
cameo_btn.onclick =function(){
	cameo();
}