<template>
	<div v-cloak>
		<main-header :text="text" @back="back"></main-header>
		<div class="step">
			<el-steps :active="1">
				<el-step title="基本信息" icon="el-icon-success"></el-step>
				<el-step title="相关证件"></el-step>
				<el-step title="车主信息"></el-step>
				<el-step title="提交"></el-step>
			</el-steps>
		</div>
		<div class="select"></div>
		<scroll :click="clicks" class="wrapper_box">
			<div class="msg">
				<h3 class="title" v-if="car_pic">上传车辆照片</h3>
				<ul class="img_contain" v-if="car_pic">
					<li>
						<div @click="chooseUpway('1','img')" class="van-uploader">
							<img src="../../static/img/add.png" alt="">
							<span>车辆正前方</span>
							<img class="upImg" :src="img1" alt="">
						</div>
						<!-- <van-uploader :after-read="onRead1">
							<img src="../../static/img/add.png" alt="">
							<span>车辆正前方</span>
							<img class="upImg" :src="img1" alt="">
						</van-uploader> -->
					</li>
					<li>
						<div @click="chooseUpway('2','img')" class="van-uploader">
							<img src="../../static/img/add.png" alt="">
							<span>车辆左前方</span>
							<img class="upImg" :src="img2" alt="">
						</div>
						<!-- <van-uploader :after-read="onRead2">
							<img src="../../static/img/add.png" alt="">
							<span>车辆左前方</span>
							<img class="upImg" :src="img2" alt="">
						</van-uploader> -->
					</li>
					<li>
						<div @click="chooseUpway('3','img')" class="van-uploader">
							<img src="../../static/img/add.png" alt="">
							<span>车辆右前方</span>
							<img class="upImg" :src="img3" alt="">
						</div>
						<!-- <van-uploader :after-read="onRead3">
							<img src="../../static/img/add.png" alt="">
							<span>车辆右前方</span>
							<img class="upImg" :src="img3" alt="">
						</van-uploader> -->
					</li>
					<li>
						<div @click="chooseUpway('4','img')" class="van-uploader">
							<img src="../../static/img/add.png" alt="">
							<span>车辆正后方</span>
							<img class="upImg" :src="img4" alt="">
						</div>
						<!-- <van-uploader :after-read="onRead4">
							<img src="../../static/img/add.png" alt="">
							<span>车辆正后方</span>
							<img class="upImg" :src="img4" alt="">
						</van-uploader> -->
					</li>
					<li>
						<div @click="chooseUpway('5','img')" class="van-uploader">
							<img src="../../static/img/add.png" alt="">
							<span>车辆左后方</span>
							<img class="upImg" :src="img5" alt="">
						</div>
						<!-- <van-uploader :after-read="onRead5">
							<img src="../../static/img/add.png" alt="">
							<span>车辆左后方</span>
							<img class="upImg" :src="img5" alt="">
						</van-uploader> -->
					</li>
					<li>
						<!-- <van-uploader :after-read="onRead6">
							<img src="../../static/img/add.png" alt="">
							<span>车辆右后方</span>
							<img class="upImg" :src="img6" alt="">
						</van-uploader> -->
						<div @click="chooseUpway('6','img')" class="van-uploader">
							<img src="../../static/img/add.png" alt="">
							<span>车辆右后方</span>
							<img class="upImg" :src="img6" alt="">
						</div>
					</li>
				</ul>
				<h3 class="title" v-if="driving_y == true || driver_licence == true">上传车辆驾驶证</h3>
				<ul class="img_contain">
					<li v-if="driver_licence">
						<div @click="chooseUpway('1','go')" class="van-uploader">
							<img src="../../static/img/add.png" alt="">
							<span>车辆驾驶证</span>
							<img class="upImg" :src="go1" alt="">
						</div>
						<!-- <van-uploader :after-read="onGo1">
							<img src="../../static/img/add.png" alt="">
							<span>车辆驾驶证</span>
							<img class="upImg" :src="go1" alt="">
						</van-uploader> -->
					</li>
					<li v-if="driving_y">
						<!-- <van-uploader :after-read="onGo2">
							<img src="../../static/img/add.png" alt="">
							<span>车辆行驶证</span> -->
							<!-- <span class="choice" style="font-size: 12px;">注：挂车可上传</span> -->
							<!-- <img class="upImg" :src="go2" alt="">
						</van-uploader> -->
						<div @click="chooseUpway('2','go')" class="van-uploader">
							<img src="../../static/img/add.png" alt="">
							<span>车辆行驶证</span>
							<img class="upImg" :src="go2" alt="">
						</div>
					</li>
				</ul>
				<h3 class="title" v-if="train_certificate||hazardous_licence||clear_agree_form||transport_agree_licence||transport_on_licence||lnsurance_policy">上传资质证明</h3>
				<ul class="img_contain">
					<li v-if="train_certificate">
						<!-- <van-uploader :after-read="onload1">
							<img src="../../static/img/add.png" alt="">
							<span>培训合格证明</span>
							<img class="upImg" :src="load1" alt="">
						</van-uploader> -->
						<div @click="chooseUpway('1','load')" class="van-uploader">
							<img src="../../static/img/add.png" alt="">
							<span>培训合格证明</span>
							<img class="upImg" :src="load1" alt="">
						</div>
					</li>
					<li v-if="hazardous_licence">
						<div @click="chooseUpway('3','load')" class="van-uploader">
							<img src="../../static/img/add.png" alt="">
							<span>危化品押运员证</span>
							<img class="upImg" :src="load3" alt="">
						</div>
						<!-- <van-uploader :after-read="onload3">
							<img src="../../static/img/add.png" alt="">
							<span>危化品押运员证</span>
							<img class="upImg" :src="load3" alt="">
						</van-uploader> -->
					</li>
					<li v-if="clear_agree_form">
						<!-- <van-uploader :after-read="onload4">
							<img src="../../static/img/add.png" alt="">
							<span>清运审批表</span>
							<img class="upImg" :src="load4" alt="">
						</van-uploader> -->
						<div @click="chooseUpway('4','load')" class="van-uploader">
							<img src="../../static/img/add.png" alt="">
							<span>清运审批表</span>
							<img class="upImg" :src="load4" alt="">
						</div>
					</li>
					<li v-if="transport_on_licence">
						<!-- <van-uploader :after-read="onload5">
							<img src="../../static/img/add.png" alt="">
							<span>道路运输从业资格证</span>
							<img class="upImg" :src="load5" alt="">
						</van-uploader> -->
						<div @click="chooseUpway('5','load')" class="van-uploader">
							<img src="../../static/img/add.png" alt="">
							<span>道路运输从业资格证</span>
							<img class="upImg" :src="load5" alt="">
						</div>
					</li>
					<li v-if="transport_agree_licence">
						<!-- <van-uploader :after-read="onload6">
							<img src="../../static/img/add.png" alt="">
							<span>道路运输许可证</span>
							<img class="upImg" :src="load6" alt="">
						</van-uploader> -->
						<div @click="chooseUpway('6','load')" class="van-uploader">
							<img src="../../static/img/add.png" alt="">
							<span>道路运输许可证</span>
							<img class="upImg" :src="load6" alt="">
						</div>
					</li>
					<li v-if="lnsurance_policy">
						<!-- <van-uploader :after-read="onload7">
							<img src="../../static/img/add.png" alt="">
							<span>保险单</span>
							<img class="upImg" :src="load7" alt="">
						</van-uploader> -->
						<div @click="chooseUpway('7','load')" class="van-uploader">
							<img src="../../static/img/add.png" alt="">
							<span>保险单</span>
							<img class="upImg" :src="load7" alt="">
						</div>
					</li>
				</ul>
				<h3 class="title" v-if="reletive_data">上传相关部门备案材料</h3>
				<ul class="img_contain">
					<li v-if="reletive_data">
						<div @click="chooseUpway('1','about')" class="van-uploader">
							<img src="../../static/img/add.png" alt="">
							<span>上传相关部门备案材料</span>
							<img class="upImg" :src="about1" alt="">
						</div>
						<!-- <van-uploader :after-read="onabout1">
							<img src="../../static/img/add.png" alt="">
							<span>上传相关部门备案材料</span>
							<img class="upImg" :src="about1" alt="">
						</van-uploader> -->
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
				active: 1,
				clicks: true,
				img1: '',
				img2: '',
				img3: '',
				img4: '',
				img5: '',
				img6: '',
				go1: '',
				go2: '',
				load1: '',
				load3: '',
				load4: '',
				load5: '',
				load6: '',
				load7: '',
				about1: '',
				listData: [],
				car_pic: false,
				driving_y: false,
				train_certificate: false,
				driver_licence: false,
				hazardous_licence: false,
				clear_agree_form: false,
				transport_agree_licence: false,
				transport_on_licence: false,
				lnsurance_policy: false,
				reletive_data: false,

				columns_one:['拍照','从相册中选择'],
				show_one:false,
				upFlag:'',// 记录点击上传的哪一个
				imgFlag:'' //拼接图片用
			}
		},
		components: {
			MainHeader,
			Step,
			Steps,
			Scroll,
			Uploader,
			Toast
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
				let self = this
				let group = JSON.parse(localStorage.getItem('group'))
				for (let i = 0; i < group.length; i++) {
					if (group[i] == 'car_pic') {
						this.car_pic = true
					}
					if (group[i] == 'driving_y') {
						this.driving_y = true
					}
					if (group[i] == 'transport_on_licence') {
						this.transport_on_licence = true
					}
					if (group[i] == 'train_certificate') {
						this.train_certificate = true
					}
					if (group[i] == 'driver_licence') {
						this.driver_licence = true
					}
					if (group[i] == 'hazardous_licence') {
						this.hazardous_licence = true
					}
					if (group[i] == 'clear_agree_form') {
						this.clear_agree_form = true
					}
					if (group[i] == 'transport_agree_licence') {
						this.transport_agree_licence = true
					}
					if (group[i] == 'lnsurance_policy') {
						this.lnsurance_policy = true
					}
					if (group[i] == 'reletive_data') {
						this.reletive_data = true
					}
				}
				if (localStorage.getItem('param')) {
					let datas = JSON.parse(localStorage.getItem('param'))
					this.img1 = datas.car_pic[0]
					this.img2 = datas.car_pic[1]
					this.img3 = datas.car_pic[2]
					this.img4 = datas.car_pic[3]
					this.img5 = datas.car_pic[4]
					this.img6 = datas.car_pic[5]
					this.go1 = datas.driver_licence
					this.go2 = datas.driving_y
					this.load1 = datas.train_certificate
					this.load3 = datas.hazardous_licence
					this.load4 = datas.clear_agree_form
					this.load5 = datas.transport_on_licence
					this.load6 = datas.transport_agree_licence
					this.load7 = datas.lnsurance_policy
					this.about1 = datas.reletive_data
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
				if (!this.car_pic) {
					this.img1 = null
					this.img2 = null
					this.img3 = null
					this.img4 = null
					this.img5 = null
					this.img6 = null
				}
				if (!this.driver_licence) {
					this.go1 = null
				}
				if (!this.driving_y) {
					this.go2 = null
				}
				if (!this.train_certificate) {
					this.load1 = null
				}
				if (!this.hazardous_licence) {
					this.load3 = null
				}
				if (!this.clear_agree_form) {
					this.load4 = null
				}
				if (!this.transport_on_licence) {
					this.load5 = null
				}
				if (!this.transport_agree_licence) {
					this.load6 = null
				}
				if (!this.lnsurance_policy) {
					this.load7 = null
				}
				if (!this.reletive_data) {
					this.about1 = null
				}

				if (this.img1 == '' || this.img2 == '' || this.img3 == '' || this.img4 == '' || this.img5 == '' || this.img6 == '' ||
					this.go1 == '' || this.go2 == '' || this.load1 == '' || this.load3 == '' || this.load4 == '' || this.load5 == '' ||
					this.load6 == '' || this.load7 == '' || this.about1 == '') {
					Toast('请上传所有图片')
					return
				}

				let arrImg = []
				arrImg.push(this.img1)
				arrImg.push(this.img2)
				arrImg.push(this.img3)
				arrImg.push(this.img4)
				arrImg.push(this.img5)
				arrImg.push(this.img6)

				let datas = JSON.parse(localStorage.getItem('param'))
				datas.car_pic = arrImg
				datas.driver_licence = this.go1
				datas.driving_y = this.go2
				datas.train_certificate = this.load1
				datas.hazardous_licence = this.load3
				datas.clear_agree_form = this.load4
				datas.transport_on_licence = this.load5
				datas.transport_agree_licence = this.load6
				datas.lnsurance_policy = this.load7
				datas.reletive_data = this.about1
				localStorage.setItem('param', JSON.stringify(datas))
				this.$router.push('/person_three')
			},
			back() {
				let arrImg = []
				let ids = this.$route.params.id
				arrImg.push(this.img1)
				arrImg.push(this.img2)
				arrImg.push(this.img3)
				arrImg.push(this.img4)
				arrImg.push(this.img5)
				arrImg.push(this.img6)

				let datas = JSON.parse(localStorage.getItem('param'))
				datas.car_pic = arrImg
				datas.driver_licence = this.go1
				datas.driving_y = this.go2
				datas.train_certificate = this.load1
				datas.hazardous_licence = this.load3
				datas.clear_agree_form = this.load4
				datas.transport_on_licence = this.load5
				datas.transport_agree_licence = this.load6
				datas.lnsurance_policy = this.load7
				datas.reletive_data = this.about1
				localStorage.setItem('param', JSON.stringify(datas))
				this.$router.push({
					name: 'person_one',
					params: {
						id: ids
					}
				})
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

	.wrapper_box {
		position: absolute;
		top: 4.3rem;
		bottom: 40px;
		left: 0;
		right: 0;
		overflow: hidden;
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

	[v-cloak] {
		display: none !important;
	}
</style>
