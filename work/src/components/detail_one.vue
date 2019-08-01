<template>
	<div id="contain">
		<template v-if="headImg">
			<main-header :text="text" :datas="datas" @back="back" @set="del"></main-header>
		</template>
		<div class="msg" v-for="(v,k) in list" :key="k">
			<h3 class="title">通行证信息</h3>
			<img class="wait" src="../../static/img/wait.png" alt="">
			<ul class="content">
				<li class="content_list" v-if="v.categoryName">
					<span>通行证类型：</span>
					<p>{{v.categoryName}}</p>
				</li>
				<li class="content_list" v-if="v.platesCategory">
					<span>号牌种类：</span>
					<p>{{v.platesCategory}}</p>
				</li>
				<li class="content_list" v-if="v.platesNumber">
					<span>车牌号：</span>
					<p>{{v.platesNumber}}</p>
				</li>
				<li class="content_list" v-if="v.pics.car_pic.length > 0">
					<span>车辆照片</span>
				</li>
				<li class="picture" v-if="v.pics.car_pic.length > 0">
					<div class="pic_box">
						<img class="imgs" :src="v.pics.car_pic[0]" alt="">
						<span>车辆正前方</span>
					</div>
					<div class="pic_box">
						<img class="imgs" :src="v.pics.car_pic[1]" alt="">
						<span>车辆左前方</span>
					</div>
					<div class="pic_box">
						<img class="imgs" :src="v.pics.car_pic[2]" alt="">
						<span>车辆右前方</span>
					</div>
					<div class="pic_box">
						<img class="imgs" :src="v.pics.car_pic[3]" alt="">
						<span>车辆正后方</span>
					</div>
					<div class="pic_box">
						<img class="imgs" :src="v.pics.car_pic[4]" alt="">
						<span>车辆左后方</span>
					</div>
					<div class="pic_box">
						<img class="imgs" :src="v.pics.car_pic[5]" alt="">
						<span>车辆右后方</span>
					</div>
				</li>
				<li class="content_list" v-if="v.operateType">
					<span>运营类型：</span>
					<p>{{v.operateType}}</p>
				</li>
				<li class="content_list" v-if="v.carriedGoodsName">
					<span>运送货物名称：</span>
					<p>{{v.carriedGoodsName}}</p>
				</li>
				<li class="content_list" v-if="v.effectiveDays">
					<span>通行证有效期：</span>
					<p>{{v.effectiveDays}}天</p>
				</li>
				<li class="content_list" v-if="v.routesPassage">
					<span>通行路线：</span>
					<p>{{v.routesPassage}}</p>
				</li>
				<li class="content_list" v-if="v.carSb">
					<span>通行区域：</span>
					<p>{{v.carSb}}</p>
				</li>
				<li class="content_list" v-if="v.timePassage">
					<span>通行时间：</span>
					<p>{{v.timePassage}}</p>
				</li>
				<li class="content_list" v-if="v.destination">
					<span>目的地：</span>
					<p>{{v.destination}}</p>
				</li>
				<!-- <li class="content_list" v-if="v.office">
					<span>区域审核单位：</span>
					<p>{{v.office.name}}</p>
				</li> -->
				<li class="content_list">
					<span>通行证开始日期：</span>
					<p>{{startDate}}</p>
				</li>
				<li class="content_list">
					<span>通行证结束日期：</span>
					<p>{{endDate}}</p>
				</li>
				<li class="content_list" v-if="v.pics.driving_y || v.pics.driver_licence">
					<span style="color: #333;">证件照片</span>
				</li>
				<li class="picture">
					<div class="pic_box" v-if="v.pics.driving_y">
						<img class="imgs" :src="v.pics.driving_y" alt="">
						<span>行驶证证明</span>
					</div>
					<div class="pic_box" v-if="v.pics.driver_licence">
						<img class="imgs" :src="v.pics.driver_licence" alt="">
						<span>驾驶证证明</span>
					</div>
				</li>
				<li class="content_list">
					<span style="color: #333;">资质证明</span>
				</li>
				<li class="picture">
					<div class="pic_box" v-if="v.pics.train_certificate">
						<img class="imgs" :src="v.pics.train_certificate" alt="">
						<span>培训合格证明</span>
					</div>
					<div class="pic_box" v-if="v.pics.clear_agree_form">
						<img class="imgs" :src="v.pics.clear_agree_form" alt="">
						<span>清运审批表</span>
					</div>
					<div class="pic_box" v-if="v.pics.hazardous_licence">
						<img class="imgs" :src="v.pics.hazardous_licence" alt="">
						<span>危化品押运员证</span>
					</div>
					<div class="pic_box" v-if="v.pics.transport_agree_licence">
						<img class="imgs" :src="v.pics.transport_agree_licence" alt="">
						<span>道路运输许可证</span>
					</div>
					<div class="pic_box" v-if="v.pics.transport_on_licence">
						<img class="imgs" :src="v.pics.transport_on_licence" alt="">
						<span>道路运输从业资格证</span>
					</div>
					<div class="pic_box" v-if="v.pics.lnsurance_policy">
						<img class="imgs" :src="v.pics.lnsurance_policy" alt="">
						<span>保险单</span>
					</div>
					<div class="pic_box" v-if="v.pics.reletive_data">
						<img class="imgs" :src="v.pics.reletive_data" alt="">
						<span>相关备案证明资料</span>
					</div>
				</li>
				<li class="content_list" v-if="v.applyCompanyName">
					<span style="color: #333;">公司信息</span>
				</li>
				<li class="content_list" v-if="v.applyCompanyName">
					<span>公司名称：</span>
					<p>{{v.applyCompanyName}}</p>
				</li>
				<li class="content_list" v-if="v.compayManager">
					<span>法人：</span>
					<p>{{v.compayManager}}</p>
				</li>
				<li class="content_list" v-if="v.companyAddress">
					<span>公司地址：</span>
					<p>{{v.companyAddress}}</p>
				</li>
				<li class="content_list" v-if="v.compayPhone">
					<span>公司电话：</span>
					<p>{{v.compayPhone}}</p>
				</li>
				<li class="picture" v-if="v.pics.businessLicense || v.pics.introductionLetter">
					<div class="pic_box" v-if="v.pics.businessLicense">
						<img class="imgs" :src="v.pics.businessLicense" alt="">
						<span>营业执照</span>
					</div>
					<div class="pic_box" v-if="v.pics.introductionLetter">
						<img class="imgs" :src="v.pics.introductionLetter" alt="">
						<span>介绍人照片</span>
					</div>
				</li>
				<li class="content_list" v-if="v.carOwnerName">
					<span style="color: #333;">车主信息</span>
				</li>
				<li class="content_list" v-if="v.carOwnerName">
					<span>真实姓名：</span>
					<p>{{v.carOwnerName}}</p>
				</li>
				<li class="content_list" v-if="v.carOwnerPhone">
					<span>联系电话：</span>
					<p>{{v.carOwnerPhone}}</p>
				</li>
				<li class="content_list" v-if="v.pics.idcard">
					<span>身份证照片</span>
				</li>
				<li class="picture" v-if="v.pics.idcard">
					<div class="pic_box">
						<img class="imgs" :src="v.pics.idcard[0]" alt="">
						<span>身份证（正）</span>
					</div>
					<div class="pic_box">
						<img class="imgs" :src="v.pics.idcard[1]" alt="">
						<span>身份证（反）</span>
					</div>
					<div class="pic_box">
						<img class="imgs" :src="v.pics.idcard[2]" alt="">
						<span>手持身份证照片</span>
					</div>
				</li>
			</ul>
			<div class="btn" v-if="hide">
				<div class="btn1" @click="changeMsg">变更信息</div>
				<div class="btn2" data-html2canvas-ignore @click="goImg">打印通行证</div>
			</div>
		</div>
		<div class="loading" v-if="loading">
			<van-loading type="spinner" />
			<span>打印中...</span>
		</div>
		<div class="load" v-if="load">
			<van-loading type="spinner" color="white" />
		</div>
	</div>
</template>

<script src="../../static/js/mui.min.js"></script>
<script>
	import MainHeader from '@/components/component/mainHeader'
	import Request from '@util/request'
	import Scroll from '@/components/component/scroll'
	import html2canvas from 'html2canvas'
	import {
		Step,
		Steps
	} from 'element-ui'
	import {
		Popup,
		Picker,
		Toast,
		Dialog,
		Loading
	} from 'vant'

	export default {
		data() {
			return {
				text: '通行证详情',
				active: 0,
				datas: '撤销审核',
				list: [],
				clicks: true,
				hide: true,
				headImg: true,
				uid: '',
				image: '',
				loading: false,
				load: false,
				startDate: '',
				endDate: ''
			}
		},
		components: {
			MainHeader,
			Step,
			Steps,
			Scroll
		},
		created() {
			let obj = JSON.parse(localStorage.getItem('member'))
			this.uid = obj.id
		},
		mounted() {
			this.init()
			console.log($('.msg .imgs').length)
		},
		methods: {
			init() {
				let state = this.$route.params.state
				let id = this.$route.params.id
				let self = this
				this.load = true
				let datas = {
					uid: self.uid,
					status: state
				}
				Request.postRequest('api/licence/tPermit/listByStatus', datas).then(res => {
					if (res.data.success == true) {
						if (res.data.body.permits.length > 0) {
							self.load = false
							for (let i = 0; i < res.data.body.permits.length; i++) {
								if (res.data.body.permits[i].id == id) {
									self.list.push(res.data.body.permits[i])
									console.log(self.list)
									Request.postRequest('api/licence/region/list').then(response => {
										if (response.data.success == true) {
											if (response.data.body !== undefined || response.data.body !== {}) {
												for (let i = 0; i < response.data.body.list.length; i++) {
													if(self.list[0].regions.id.indexOf(',') > -1) {
														let arr = []
														arr = self.list[0].regions.id.split(',')
														for(let k = 0;k < arr.length; k++) {
															if(response.data.body.list[i].id == arr[k]){
																self.list[0]['carSb'] += response.data.body.list[i].name + ','
															}
														}
													}else{
														if(response.data.body.list[i].id == self.list[0].regions.id){
															self.list[0]['carSb'] += response.data.body.list[i].name + ','
														}
													}
												}
												self.list[0]['carSb'] = self.list[0]['carSb'].substr(0,self.list[0]['carSb'].length-1)
											}
										}
									})
								}
							}
							self.startDate = self.list[0]['startDate']
							self.endDate = self.list[0]['endDate']
						}
					}
				}).catch(res => {
					console.log(res)
				})
			},
			changeMsg() {
				let id = this.$route.params.id
				this.$router.push({
					name: 'changeRoute',
					params: {
						id: id
					}
				})
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
			getDpr: function() {
				if (window.devicePixelRatio && window.devicePixelRatio > 1) {
					return window.devicePixelRatio;
				}
				return 1
			},

			/**
			 * 将传入值转为整数
			 * @param value
			 * @returns {number}
			 */
			parseValue: function(value) {
				return parseInt(value, 10);
			},

			// 将图片转为base64格式
			img2base64: function(url, crossOrigin) {
				return new Promise(resolve => {
					const img = new Image();

					img.onload = () => {
						const c = document.createElement('canvas');

						c.width = img.naturalWidth;
						c.height = img.naturalHeight;

						const cxt = c.getContext('2d');

						cxt.drawImage(img, 0, 0);

						// 得到图片的base64编码数据
						resolve(c.toDataURL('image/png'));
					};

					// 结合合适的CORS响应头，实现在画布中使用跨域<img>元素的图像
					crossOrigin && img.setAttribute('crossOrigin', crossOrigin);
					img.src = url
				});
			},
			/**
			 * 生成图片
			 */
			generateImage: function() {
				console.log('保存图片')
				var _this = this;

				// 获取想要转换的dom节点
				// var dom = document.querySelector('body');
				var dom = document.getElementById('contain');
				var box = window.getComputedStyle(dom);

				// dom节点计算后宽高
				var width = _this.parseValue(box.width);
				var height = _this.parseValue(box.height);

				// 获取像素比
				var scaleBy = _this.getDpr();

				// 创建自定义的canvas元素
				var canvas = document.createElement('canvas');

				// 设置canvas元素属性宽高为 DOM 节点宽高 * 像素比
				canvas.width = width * scaleBy;
				canvas.height = height * scaleBy;

				// 设置canvas css 宽高为DOM节点宽高
				canvas.style.width = width + 'px';
				canvas.style.height = height + 'px';

				// 获取画笔
				var context = canvas.getContext('2d');

				// 将所有绘制内容放大像素比倍
				context.scale(scaleBy, scaleBy);

				// 设置需要生成的图片的大小，不限于可视区域（即可保存长图）
				var w = document.getElementById('contain').style.width;
				var h = document.getElementById('contain').style.height;

				html2canvas(dom, {
					//如果有图片必须加上此参数
					useCORS: true,
					width: w,
					height: h
				}).then(function(canvas) {
					// 将canvas转换成图片渲染到页面上
					var url = canvas.toDataURL("image/png")
					var _blob = _this.dataURLtoFile(url)
					_this.loading = true
					var formData = new FormData()
					formData.append('file', _blob, 'detail.png')
					Request.postRequest('api/upload', formData).then(res => {
						if (res.data.success == true) {
							_this.image = res.data.body.list[0]
							_this.savePicture(res.data.body.list[0])
						}
					}).catch(res => {
						console.log(res)
					})
				})
			},
			goImg() {
				this.hide = false
				this.headImg = false
				document.body.scrollTop = 0
				$('.msg').addClass('distance')
				this.generateImage()
			},
			savePicture(urls) {
				var self = this
				mui.plusReady(function() {
					// 创建下载任务
					var picurl = urls
					//图片保存到手机后的路径
					var dtask = plus.downloader.createDownload(picurl, {}, function(d, status) {
						// 下载完成
						if (status == 200) {
							plus.gallery.save(d.filename, function() { //保存到相册方法
								$('.msg').removeClass('distance')
								self.loading = false
								self.hide = true
								self.headImg = true
								setTimeout(function() {
									Toast('已保存到手机相册')
								}, 300)
							}, function() {
								self.loading = false
								self.hide = true
								self.headImg = true
								setTimeout(function() {
									Toast('打印失败')
								}, 300)
							});
						} else {
							Toast('打印失败')
						}
					})
					dtask.start() //开始下载
				})
			},
			back() {
				this.$router.go(-1)
			},
			del() {
				let self = this
				var id = this.$route.params.id
				Dialog.confirm({
					title: '撤销',
					message: '确认撤销此通行证吗'
				}).then(() => {
					let datas = {
						uid: self.uid,
						id: id
					}
					Request.postRequest('api/licence/tPermit/delete', datas).then(res => {
						console.log(res)
						if (res.data.success == true) {
							Toast('撤销成功')
							self.$router.go(-1)
						}
					}).catch(res => {
						console.log(res)
					})
				}).catch(() => {

				});
			}
		}
	}
</script>

<style scoped="scoped">
	#contain {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.step {
		width: 100%;
		padding: 0 0.6rem;
		box-sizing: border-box;
	}
	
	.distance {
		padding-top: 24px !important;
	}

	.select {
		width: 100%;
		border-top: 10px solid #f2f2f2;
		margin-top: 0.3rem;
	}

	.wrapper_box {
		position: absolute;
		top: 1rem;
		bottom: 30px;
		left: 0;
		overflow: hidden;
	}

	.msg {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 80px 0.6rem 0;
		box-sizing: border-box;
	}

	.title {
		width: 100%;
		height: 1.2rem;
		line-height: 1.2rem;
		font-size: 16px;
		color: #333;
	}

	.content {
		width: 100%;
		box-sizing: border-box;
	}

	.content_list {
		width: 100%;
		display: flex;
		font-size: 15px;
		color: #999;
		margin-bottom: 0.4rem;
		line-height: 22px;
	}

	.content_list span {
		display: inline-block;
		min-width: 25%;
	}

	.picture {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.pic_box {
		width: 47%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.pic_box img {
		width: 100%;
		height: 2.5rem;
	}

	.pic_box span {
		font-size: 15px;
		color: #999;
		margin: 0.4rem 0;
	}

	.btn {
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin: 0.3rem 0;
	}

	.btn1 {
		padding: 0.2rem 0.8rem;
		border-radius: 16px;
		background: #F8F8F8;
		text-align: center;
		font-size: 15px;
		color: #333;
	}

	.btn2 {
		padding: 0.2rem 0.8rem;
		border-radius: 16px;
		background: #17ACE6;
		text-align: center;
		font-size: 15px;
		color: #fff;
	}

	.wait {
		width: 87px;
		height: 80px;
		position: absolute;
		top: 2.4rem;
		right: 0.4rem;
	}

	.loading {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 9999;
		background: rgba(0, 0, 0, 0.8);
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 15px;
		color: #fff;
	}

	.loading span {
		margin-left: 0.3rem;
	}
	
	.load {
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
	}
</style>
