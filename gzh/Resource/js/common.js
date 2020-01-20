//var publicUrl = "http://116.255.239.151:9080/api/gzh" // 每个请求地址相同的部分
var publicUrl = "/api/gzh"
//http://gongxiang.thekingbull.com
//http://116.255.239.151:9080/api/gzh
var uid;
var couponIds = ''
var local = window.localStorage;
if (window.location.search.indexOf("uid") > -1) {
	var uids = GetQueryString('uid');
	local.setItem("uids", uids);
	uid = uids;
	console("有uid" + window.location.search)
} else {
	uid = local.getItem("uids");
	console.log("没有uid" + uid)
}

function queryData(url, params, success,error) {
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
			alert(res)
		}
	})
}

//获取页面参数方法
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return (r[2]);
	return null;
}

//发送验证码
var countdown = 60;

function settime(obj) {
	if (countdown == 0) {
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
