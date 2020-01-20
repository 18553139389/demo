import axios from 'axios'
import { Toast } from 'vant';
// 环境的切换
// if (process.env.NODE_ENV == 'development') {
// 	axios.defaults.baseURL = 'http://112.126.98.64'
// } else if (process.env.NODE_ENV == 'debug') {
// 	axios.defaults.baseURL = '';
// } else if (process.env.NODE_ENV == 'production') {
// 	axios.defaults.baseURL = 'http://112.126.98.64'
// }

axios.defaults.timeout = 10000

axios.interceptors.response.use(
response => {
	return response;
},
error => {
	if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
	console.log("错误回调", error);
	return Promise.reject(error);          // reject这个错误信息
	}
	return Promise.reject(error);
});

export default{
    methods:{
        goto(data){			
			if(data == '0'){
				this.$router.push({ name: 'index', params: {}})
			}else if(data == '1'){
				this.$router.push({ name: 'rank', params: {}})
			}else if(data == '2'){
				this.$router.push({ name: 'my', params: {}})
			}			
			
		},
		back(){
            this.$router.back(-1)
		},
		postRequest(data = {}, method = 'post') {
			return new Promise((resolve, reject) => {
				axios({
						// url: url,http://112.126.98.64/garbage
						url: encodeURI("http://wx.yugong101.com/skilllease/api/service?json="+JSON.stringify(data)),
						method: method,
						headers: {
							'Content-Type': 'application/json'
						}
						
					})
					.then(res => {
						Toast.clear();
						//成功
						if(res.data.result == '0'){
							resolve(res)
						}else{
							if(res.data.resultNote == '扫描失败，二维码数据有误'){
								resolve(res)
							}else{
								Toast(res.data.resultNote);
							}							
						}
						
					})
					.catch(res => {
						//失败
						// reject(res)
						Toast('请求超时！')
					})
			})
		},
		dataURLtoFile(dataurl, filename) {
			let arr = dataurl.split(','),
				mime = arr[0].match(/:(.*?);/)[1],
				bstr = atob(arr[1]),
				n = bstr.length,
				u8arr = new Uint8Array(n);
			while (n--) {
				u8arr[n] = bstr.charCodeAt(n);
			}
			return new File([u8arr], filename, {
				type: mime
			});
		},
    }
}