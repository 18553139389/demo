<template>
	<div>
		<main-header :text="text" @back="back"></main-header>
		<div class="step">
			<el-steps :active="active">
				<el-step title="基本信息" icon="el-icon-success"></el-step>
				<el-step title="相关证件" icon="el-icon-success"></el-step>
				<el-step title="车主信息"></el-step>
				<el-step title="提交"></el-step>
			</el-steps>
		</div>
		<div class="select"></div>
		<scroll :click="clicks" class="wrapper_box">
			<div class="msg">
				<ul class="list">
					<li>
						<span>真实姓名</span>
						<div class="choice">
							<input type="text" placeholder="请输入" v-model="user" />
						</div>
					</li>
					<li>
						<span>联系电话</span>
						<div class="choice">
							<input type="text" placeholder="请输入" v-model="phone" />
						</div>
					</li>
				</ul>
				<h3 class="title">上传身份证件</h3>
				<ul class="img_contain">
					<li>
						<div @click="chooseUpway('1','img')" class="van-uploader">
							<img src="../../static/img/add.png" alt="">
							<span>身份证正面</span>
							<img class="upImg" :src="img1" alt="">
						</div>
						<!-- <van-uploader :after-read="onRead1">
							<img src="../../static/img/add.png" alt="">
							<span>身份证正面</span>
							<img class="upImg" :src="img1" alt="">
						</van-uploader> -->
					</li>
					<li>
						<!-- <van-uploader :after-read="onRead2">
							<img src="../../static/img/add.png" alt="">
							<span>身份证反面</span>
							<img class="upImg" :src="img2" alt="">
						</van-uploader> -->
						<div @click="chooseUpway('2','img')" class="van-uploader">
							<img src="../../static/img/add.png" alt="">
							<span>身份证反面</span>
							<img class="upImg" :src="img2" alt="">
						</div>
					</li>
					<li>
						<!-- <van-uploader :after-read="onRead3">
							<img src="../../static/img/add.png" alt="">
							<span>手持身份证照片</span>
							<img class="upImg" :src="img3" alt="">
						</van-uploader> -->
						<div @click="chooseUpway('3','img')" class="van-uploader">
							<img src="../../static/img/add.png" alt="">
							<span>手持身份证照片</span>
							<img class="upImg" :src="img3" alt="">
						</div>
					</li>
				</ul>
			</div>
			<template v-if="show_one">
				<van-popup v-model="show_one" position="bottom" :overlay="true">
					<van-picker show-toolbar :columns="columns_one" @confirm="change_one" @cancel="cancel_one" />
				</van-popup>
			</template>
		</scroll>
		<div class="btn" @click="submit">下一步</div>
		<div class="loading" v-if="loading">
			<van-loading type="spinner" color="white" size="20px" />
			<span style="margin-left: 0.3rem;">提交中...</span>
		</div>
	</div>
</template>

<script>
	import MainHeader from '@/components/component/mainHeader'
	import Request from '@util/request'
	import Scroll from '@/components/component/scroll'
	import {
		Step,
		Steps
	} from 'element-ui'
	import {
		Popup,
		Picker,
		Toast,
		Uploader
	} from 'vant'

	export default {
		data() {
			return {
				text: '个人申请',
				active: 2,
				clicks: true,
				user: '',
				phone: '',
				img1: '',
				img2: '',
				img3: '',
				uid: '',
				loading: false,

				columns_one:['拍照','从相册中选择'],
				show_one:false,
				upFlag:'',// 记录点击上传的哪一个
				imgFlag:'' //拼接图片用
			}
		},
		created() {
			let obj = JSON.parse(localStorage.getItem('member'))
			this.uid = obj.id
		},
		components: {
			MainHeader,
			Step,
			Steps,
			Scroll,
			Uploader
		},
		mounted() {
			this.init()
		},
		methods: {
			chooseUpway(num,flag){
				this.show_one=true;
				this.upFlag=num;
				this.imgFlag=flag;
			},
			change_one(v,index){
				this.isPicfrom = false;
				this.show_one = false;
				if(index == '0'){
					this.getImage();
				}else{
					this.galleryImg();
				}

			},
			cancel_one(){
				this.show_one = false
			},
			dataURLtoFile(dataurl, filename) { //将base64转换为文件
				var arr = dataurl.split(','),
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
			galleryImg(){
				// 相册选择
				var self = this;
				plus.gallery.pick(function(a) {
					plus.io.resolveLocalFileSystemURL(a, function(entry) {
						entry.file(function(file){
							var fileReader = new plus.io.FileReader();
								fileReader.readAsDataURL(file)
								var formdata = new FormData();
								var newfile;
								fileReader.onloadend = function(f){
									newfile = self.dataURLtoFile(f.target.result.toString(),'detail.png');//图片文件流	
									// 压缩上传
									self.onRead1(newfile,f.target.result.toString())
								}	
						})
					}, function(e) {
						console.log("读取拍照文件错误：" + e.message);
					});
				}, function(a) {}, {
					filter: "image"
				})
			},
			getImage(){
				// 拍照上传
				// mui.plusReady(function() {
					var c = plus.camera.getCamera();
					var self = this;
					c.captureImage(function(e) {
						plus.io.resolveLocalFileSystemURL(e, function(entry) {
							entry.file(function(file){							
								var fileReader = new plus.io.FileReader();
								fileReader.readAsDataURL(file)
								var formdata = new FormData();
								var newfile;
								fileReader.onloadend = function(f){
									newfile = self.dataURLtoFile(f.target.result.toString(),'detail.png');//图片文件流
									
									// 压缩start
									self.onRead1(newfile,f.target.result.toString())
									// 压缩end
									// formdata.append('file',newfile)							
									// Request.postRequest('api/upload',formdata).then(res => {
									// 	if (res.data.success == true) {
									// 		self.img1 = res.data.body.list[0]
									// 	}
									// }).catch(res => {
									// 	console.log(res)
									// })
								}								
							})
							
						}, function(e) {
							console.log("读取拍照文件错误：" + e.message);
						});
					}, function(s) {
						console.log("error" + s);
					}, {
						filename: "_doc/head.jpg"
					})
				// })
				
			},
			init() {
				if(localStorage.getItem('param')){
					let datas = JSON.parse(localStorage.getItem('param'))
					this.user = datas.carOwnerName 
					this.phone = datas.carOwnerPhone 
					this.img1 = datas.idcard[0]
					this.img2 = datas.idcard[1]
					this.img3 = datas.idcard[2]
				}
			},
			//base64转file
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
			over() {
				Toast("图片大小不能超过4M")
				return
			},
			onRead1(file,content) {
				if(file.size > 6291456) {
					Toast("图片大小不能超过4M")
					return
				}
				if (/\/(?:jpeg|png)/i.test(file.type) && file.size > 204800) {
					let self = this
					let canvas = document.createElement('canvas')
					// 获取对应的CanvasRenderingContext2D对象(画笔)
					let ctx = canvas.getContext('2d')
					// 创建新的图片对象 
					let img = new Image()
					// 指定图片的DataURL(图片的base64编码数据)
					img.src = content
					img.onload = function() {
						var initSize = img.src.length;
						var width = img.width;
						var height = img.height;
						console.log(width, height, '输出宽高')
					
						//如果图片大于四百万像素，计算压缩比并将大小压至400万以下
						var ratio;
						if ((ratio = width * height / 4000000) > 1) {
							ratio = Math.sqrt(ratio);
							width /= ratio;
							height /= ratio;
						} else {
							ratio = 1;
						}
					
						canvas.width = width;
						canvas.height = height;
					
						//铺底色
						ctx.fillStyle = "#fff";
						ctx.fillRect(0, 0, canvas.width, canvas.height);
					
						// 如果图片像素大于100万则使用瓦片绘制
						var count;
						let tCanvas = document.createElement('canvas');
						let tctx = canvas.getContext('2d');
						if ((count = width * height / 10000000) > 1) {
							count = (Math.sqrt(count) + 1); //计算要分成多少块瓦片
					
							//            计算每块瓦片的宽和高
							var nw = (width / count);
							var nh = (height / count);
					
							tCanvas.width = nw;
							tCanvas.height = nh;
					
							for (var i = 0; i < count; i++) {
								for (var j = 0; j < count; j++) {
									tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
									ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
								}
							}
						} else {
							ctx.drawImage(img, 0, 0, width, height);
						}
					
						//进行最小压缩
						content = canvas.toDataURL("image/jpeg", 0.1);
						//console.log("压缩前：" + initSize);
						//console.log("压缩后：" + file.content.length);
						//console.log("压缩率：" + (100 * (initSize - file.content.length) / initSize) + "%");
						//console.log(file.content)
					
						canvas.width = canvas.height = 0;
					
						let files = self.dataURLtoFile(content, Date.parse(Date()) + '.jpg')
						files = {
							content: file.content,
							file: files
						};
						var formdata = new FormData()
						formdata.append('file', files.file)
						Request.postRequest('api/upload', formdata).then(res => {
							console.log(res)
							if (res.data.success == true) {
								let upFlag = self.upFlag;
								let imgFlag = self.imgFlag;
								self[imgFlag+upFlag] = res.data.body.list[0]
							}
						}).catch(res => {
							console.log(res)
						})
					}
				}else{
					let self = this
					var formdata = new FormData()
					formdata.append('file', file.file)
					Request.postRequest('api/upload', formdata).then(res => {
						if (res.data.success == true) {
							let upFlag = self.upFlag;
							let imgFlag = self.imgFlag;
							self[imgFlag+upFlag] = res.data.body.list[0]
						}
					}).catch(res => {
						console.log(res)
					})
				}
			},
			submit() {
				var self = this
				if(this.user == '' || this.phone == '' || this.img1 == '' || this.img2 == '' || this.img3 == ''){
					Toast('内容不能为空')
					return
				}
				this.loading = true
				let datas = JSON.parse(localStorage.getItem('param'))
				datas.uid = this.uid
				datas.applyType = 1
				datas.applyCompanyName = ''
				datas.compayManager = ''
				datas.companyAddress = ''
				datas.compayPhone = ''
				datas.businessLicense = ''
				datas.introductionLetter = ''
				datas.carOwnerName = this.user
				datas.carOwnerPhone = this.phone
				datas.idcard.push(this.img1)
				datas.idcard.push(this.img2)
				datas.idcard.push(this.img3)
				datas.car_pic = datas.car_pic.join(',')
				datas.idcard = datas.idcard.join(',')
				console.log(datas)
				Request.postRequest('api/licence/tPermit/submit', datas).then(res => {
					if (res.data.success == true) {
						self.loading = false
						this.$router.push('/result')
					}
				}).catch(res => {
					console.log(res)
				})
			},
			back() {
				let datas = JSON.parse(localStorage.getItem('param'))
				datas.carOwnerName = this.user
				datas.carOwnerPhone = this.phone
				datas.idcard.push(this.img1)
				datas.idcard.push(this.img2)
				datas.idcard.push(this.img3)
				localStorage.setItem('param', JSON.stringify(datas))
				this.$router.push('/person_two')
			}
		}
	}
</script>

<style scoped="scoped">
	.step {
		width: 100%;
		padding: 78px 0.6rem 0;
		box-sizing: border-box;
	}
	
	.list {
		width: 100%;
	}
	
	.list>li {
		width: 100%;
		height: 1.3rem;
		border-bottom: 1px solid #eee;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.list>li>span {
		font-size: 16px;
		color: #999;
	}
	
	.choice {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.choice input {
		color: #999;
		font-size: 16px;
		border: none;
		text-align: right;
	}

	.wrapper_box {
		position: absolute;
		top: 4.3rem;
		bottom: 40px;
		left: 0;
		overflow: hidden;
		width: 100%;
	}

	.select {
		width: 100%;
		border-top: 10px solid #f2f2f2;
		margin-top: 0.3rem;
		padding-bottom: 0.5rem;
	}

	.msg {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 0 0.6rem;
		box-sizing: border-box;
	}

	.title {
		width: 100%;
		height: 1.2rem;
		line-height: 1.2rem;
		font-size: 16px;
		color: #333;
	}

	.img_contain {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.img_contain li {
		width: 48%;
		height: 2.5rem;
		border: 1px dashed #999;
		margin-bottom: 0.3rem;
		position: relative;
	}

	.img_contain li img {
		width: 22px;
		height: 22px;
	}

	.img_contain li span {
		font-size: 15px;
		color: #999;
	}

	.img_contain li .choice {
		position: absolute;
		bottom: 4px;
	}

	.van-uploader {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		padding: 0.3rem 0;
		box-sizing: border-box;
	}

	.upImg {
		width: 100% !important;
		height: 100% !important;
		position: absolute;
		left: 0;
		top: 0;
	}
	
	.btn {
		width: 100%;
		height: 40px;
		line-height: 40px;
		font-size: 16px;
		color: #fff;
		background: #17ACE6;
		position: fixed;
		left: 0;
		bottom: 0;
		text-align: center;
	}
	
	.loading {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 9999;
		background: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 15px;
		color: #fff;
	}
</style>
