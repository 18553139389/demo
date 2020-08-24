export default{
	axios(method,url,data){
		return new Promise((resolve,reject)=>{
			uni.request({
				url: url,
				method:method,
				data:data,
				header:{
					'Content-Type':'application/x-www-form-urlencoded'
				},
				success:(res)=>{
					resolve(res.data)
				},
				fail:(err)=>{
					reject(err)
				}
			})
		})
	}
}
  