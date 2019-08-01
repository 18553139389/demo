var publicUrl = "http://gongxiang.thekingbull.com/api" // 每个请求地址相同的部分

function queryData(url, params, success) {
	url = publicUrl + url; // 拼接请求地址
	var success = arguments[2] ? arguments[2] : function() {}; // 成功执行的函数
	var error = arguments[3] ? arguments[3] : function() {}; // 失败执行的函数
	$.ajax({
		url: url,
		type: "POST",
		dataType: "JSON",
		async: true,
		data: params, //参数
		success: function(res) {
			success(res)
		},
		error: function(res) {
			console.log(res)
		}
	})
}

//获取位置的经纬度
var lon = ''
var lat = ''

function getPosition(tv, name, cityName) {
	console.log(tv);
	var address = name + cityName; //地方名称
	var commonUrl = "https://api.map.baidu.com/geocoder/v2/?ak=3ug0lA8q2ZLNLMwypAbgzmicvQ59M7py";
	var url = commonUrl + '&output=json&address=' + encodeURIComponent(address);
	$.ajax({
		type: "POST",
		url: url,
		dataType: "JSONP",
		async: false,
		success: function(data) {
			if(parseInt(data.status) == 0) {
				tv.lon = data.result.location.lng
				tv.lat = data.result.location.lat
				lon = data.result.location.lng
				lat = data.result.location.lat
				local.setItem("lon",lon)
				local.setItem("lat",lat)
			}
		}
	});
}

//用户登陆判断内容
function loginUser() {
	if(sessionStorage.getItem('uid')) {
		var userName = sessionStorage.getItem('userName')
		var iconUrl = sessionStorage.getItem('icon')
		$('.h_box').hide()
		$('.nav_right span').html(userName)
		if(iconUrl) {
			$('.nav_right img').attr('src', iconUrl)
		} else {
			$('.nav_right img').attr('src', 'Resource/image/denglu.png')
		}
	}else{
		$('.h_box').show()
		$('.nav_right').hide()
		window.location.href = "./login.html"
	}
}

//获取页面传递的参数
function getRequest(paras) {
	var url = location.href;
	var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
	var paraObj = {};
	for(var i = 0; j = paraString[i]; i++) {
		paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
	}
	var returnValue = paraObj[paras.toLowerCase()];
	if(typeof(returnValue) == "undefined") {
		return "";
	} else {
		return returnValue;
	}
}

//上传文件
var flieList = []; //数据，为一个复合数组
var sizeObj = []; //存放每个文件大小的数组，用来比较去重
function analysisList(obj, self) {
	//如果没有文件
	if(obj.length < 1) {
		return false;
	}

	for(var i = 0; i < obj.length; i++) {
		var fileObj = obj[i]; //单个文件
		var name = fileObj.name; //文件名
		var size = fileObj.size; //文件大小
		var type = fileType(name); //文件类型，获取的是文件的后缀

		//文件大于30M，就不上传
		if(size > 1024 * 1024 * 1024 || size == 0) {
			self.$Message.warning('“' + name + '”超过了30M，不能上传');
			return false;
		}

		//文件类型不为这三种，就不上传
		if(("doc/png/jpg/jpeg/zip").indexOf(type) == -1) {
			self.$Message.warning('“' + name + '”文件类型不对，不能上传');
			return false;
		}

		//把文件大小放到一个数组中，然后再去比较，如果有比较上的，就认为重复了，不能上传
		if(sizeObj.indexOf(size) != -1) {
			self.$Message.warning('“' + name + '”已经选择，不能重复上传');
			return false;
		}

		//给json对象添加内容，得到选择的文件的数据
		if(flieList.length > 2) {
			self.$Message.warning('最多上传不能超过3个文件');
			return false;
		}else{
			var itemArr = [fileObj, name, size, type]; //文件，文件名，文件大小，文件类型
			flieList.push(itemArr);
		}
		//把这个文件的大小放进数组中
		sizeObj.push(size);
		$('.file_title').show();
		$('.file_list').show();
		var inputs = document.getElementById('upfile');
		var formdata = new FormData();
		var file = inputs.files[0];
		formdata.append('image', file);
		$.ajax({
			url: 'http://116.255.239.151:9080/api/uploadImage',
			type: "POST",
			data: formdata,
			cache: false,
			contentType: false,
			processData: false,
			dataType: "json",
			success: function(res) {
				console.log(res);
			},
			error: function() {
				console.log("上传失败");
			}
		});
	}

	createList()
}

//生成列表
function createList() {
	$('.file_list').empty()
	for(var i = 0; i < flieList.length; i++) {
		var fileData = flieList[i]; //flieList数组中的某一个
		var objData = fileData[0]; //文件
		var name = fileData[1]; //文件名
		var size = fileData[2]; //文件大小
		var type = fileData[3]; //文件类型
		var volume = bytesToSize(size); //文件大小格式化

		var oTr = $("<li></li>");
		var str = '<span><cite title="' + name + '">' + name + '</cite></span>';
		str += '<span>' + type + '</span>';
		str += '<span>' + volume + '</span>';
		str += '<span><a href="javascript:;" class="operation">删除</a></span>';

		oTr.html(str);
		oTr.appendTo($('.file_list'));
	}
}

//字节大小转换，参数为b
function bytesToSize(bytes) {
	var sizes = ['Bytes', 'KB', 'MB'];
	if(bytes == 0) return 'n/a';
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	return(bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};

//通过文件名，返回文件的后缀名
function fileType(name) {
	var nameArr = name.split(".");
	return nameArr[nameArr.length - 1].toLowerCase();
}

var local = window.sessionStorage;