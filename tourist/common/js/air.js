import {md5} from './md5.js'
const air = (opt) => {
	let Timestamp = dateFtt("yyyy/MM/dd hh:mm:ss", new Date())
	let ApiKey = "b421b9a21075a359c09a36db79325d5b"
	let SecretKey = "d3243685d9922998ddd4232f38b53555"
	opt = opt || {};
	opt.data = opt.data || {}
	let datas = {
		ApiKey: ApiKey,
		Timestamp: Timestamp,
		Sign: md5("apikey" + ApiKey + "secretkey" + SecretKey + "timestamp" + Timestamp).toLowerCase(),
		Data: opt.data
	}
	opt.url = opt.url || '';
	opt.datas = JSON.stringify(datas);
	opt.method = opt.method || 'POST';
	opt.header = {
		'Access-Control-Allow-Origin': '*',
		"Content-Type": "application/json"
	};
	opt.success = opt.success || function() {};
	opt.fail = opt.fail || function() {};
	console.log(opt.data)
	console.log(Timestamp)
	console.log(datas.Sign)
	uni.request({
		url: 'http://apitest.99263.com' + opt.url,
		data: opt.datas,
		method: opt.method,
		header: {
			"Content-Type": "application/json"
		},
		success: function(res) {
			opt.success(res);
		},
		fail: function(res) {
			opt.fail(res)
			uni.showToast({
				title: '请稍后重试',
				icon: 'none'
			});
		}
	})
}

function dateFtt(fmt, date) {
	var o = {
		"M+": date.getMonth() + 1, //月份   
		"d+": date.getDate(), //日   
		"h+": date.getHours(), //小时   
		"m+": date.getMinutes(), //分   
		"s+": date.getSeconds(), //秒   
		"q+": Math.floor((date.getMonth() + 3) / 3), //季度   
		"S": date.getMilliseconds() //毫秒   
	}
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
	return fmt
}

export {
	air
}
