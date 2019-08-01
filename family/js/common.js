var commonUrl = 'http://39.107.108.223/kindergarten/api/service?json=';
//请求后台数据借口
function ajax(datas, successFn, errorFn) {
	$.ajax({
		type: 'POST',
		url: commonUrl + JSON.stringify(datas),
		dataType: "json",
		timeout: 20000,
		success: function(data) {
			//服务器返回响应，根据响应结果，分析是否登录成功；
			successFn(data);
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			errorFn;
		}
	});
}
//图片预览处理放大方法
function imgPreview(className, loop) {
	var images = [].slice.call(document.querySelectorAll(className + ' img'));
	var urls = [];
	images.forEach(function(item) {
		urls.push(item.src);
	});
	mui(className).on('tap', 'img', function() {
		var index = images.indexOf(this);
		plus.nativeUI.previewImage(urls, {
			current: index,
			loop: loop,
			indicator: 'number'
		});
	});
}

//数组去重方法
function unique(arr) {
	var x = 0;
	for(var i = 0; i < arr.length; i++) {
		for(var j = i + 1; j < arr.length; j++) {
			if(arr[i] == arr[j]) {
				arr.splice(j, 1);
				j--;
			}
		}
	}
	return arr
}

//发送验证码
var countdown = 60;

function settime(obj) {   
	if(countdown == 0) {       
		obj.removeAttribute("disabled");          
		obj.innerHTML = "重新获取";       
		countdown = 60;       
		return;   
	} else {       
		obj.setAttribute("disabled", true);       
		obj.innerHTML = "重新发送" + countdown + "s";       
		countdown--;   
	}
	setTimeout(function() {   
		settime(obj)
	}, 1000)
}

function getNow(date) {
	var _year = date.getFullYear();
	var _month = date.getMonth() + 1; // 月从0开始计数
	var _d = date.getDate();

	_month = (_month > 9) ? ("" + _month) : ("0" + _month);
	_d = (_d > 9) ? ("" + _d) : ("0" + _d);
	return _year + "-" + _month + "-" + _d;
}

function getMonth(date) {
	var _year = date.getFullYear();
	var _month = date.getMonth() + 1; // 月从0开始计数
	var _d = date.getDate();

	_month = (_month > 9) ? ("" + _month) : ("0" + _month);
	_d = (_d > 9) ? ("" + _d) : ("0" + _d);
	return _year + "-" + _month;
}

//获取页面参数方法
function GetQueryString(name) {　　　
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);　　　
	if(r != null) return(r[2]);　　　
	return null;
}