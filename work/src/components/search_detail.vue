<template>
	<div>
		<template v-if="headImg">
			<main-header :text="text" @back="back"></main-header>
		</template>
		<div class="msg" v-for="(v,k) in list" :key="k">
			<h3 class="title">通行证信息</h3>
			<img class="wait" v-if="v.status == 0" src="../../static/img/wait.png" alt="">
			<img class="wait" v-if="v.status == 1" src="../../static/img/yitongg.jpg" alt="">
			<img class="wait" v-if="v.status == 2" src="../../static/img/no.png" alt="">
			<img class="wait" v-if="v.status == 3" src="../../static/img/dated.png" alt="">
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
						<img :src="v.pics.car_pic[0]" alt="">
						<span>车辆正前方</span>
					</div>
					<div class="pic_box">
						<img :src="v.pics.car_pic[1]" alt="">
						<span>车辆左前方</span>
					</div>
					<div class="pic_box">
						<img :src="v.pics.car_pic[2]" alt="">
						<span>车辆右前方</span>
					</div>
					<div class="pic_box">
						<img :src="v.pics.car_pic[3]" alt="">
						<span>车辆正后方</span>
					</div>
					<div class="pic_box">
						<img :src="v.pics.car_pic[4]" alt="">
						<span>车辆左后方</span>
					</div>
					<div class="pic_box">
						<img :src="v.pics.car_pic[5]" alt="">
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
					<p>{{v.effectiveDays}}</p>
				</li>
				<li class="content_list" v-if="v.routesPassage">
					<span>通行路线：</span>
					<p>{{v.routesPassage}}</p>
				</li>
				<li class="content_list" v-if="v.timePassage">
					<span>通行时间：</span>
					<p>{{v.timePassage}}</p>
				</li>
				<li class="content_list" v-if="v.destination">
					<span>目的地：</span>
					<p>{{v.destination}}</p>
				</li>
				<li class="content_list">
					<span>通行证开始日期：</span>
					<p>{{v.startDate}}</p>
				</li>
				<li class="content_list">
					<span>通行证结束日期：</span>
					<p>{{v.endDate}}</p>
				</li>
				<li class="content_list" v-if="v.office.name">
					<span>区域审核单位：</span>
					<p>{{v.office.name}}</p>
				</li>
				<li class="content_list" v-if="v.pics.driving_y || v.pics.driver_licence">
					<span style="color: #333;">证件照片</span>
				</li>
				<li class="picture">
					<div class="pic_box" v-if="v.pics.driving_y">
						<img :src="v.pics.driving_y" alt="">
						<span>行驶证证明</span>
					</div>
					<div class="pic_box" v-if="v.pics.driver_licence">
						<img :src="v.pics.driver_licence" alt="">
						<span>驾驶证证明</span>
					</div>
				</li>
				<li class="content_list">
					<span style="color: #333;">资质证明</span>
				</li>
				<li class="picture">
					<div class="pic_box" v-if="v.pics.train_certificate">
						<img :src="v.pics.train_certificate" alt="">
						<span>培训合格证明</span>
					</div>
					<div class="pic_box" v-if="v.pics.clear_agree_form">
						<img :src="v.pics.clear_agree_form" alt="">
						<span>清运审批表</span>
					</div>
					<div class="pic_box" v-if="v.pics.hazardous_licence">
						<img :src="v.pics.hazardous_licence" alt="">
						<span>危化品押运员证</span>
					</div>
					<div class="pic_box" v-if="v.pics.transport_agree_licence">
						<img :src="v.pics.transport_agree_licence" alt="">
						<span>道路运输许可证</span>
					</div>
					<div class="pic_box" v-if="v.pics.transport_on_licence">
						<img :src="v.pics.transport_on_licence" alt="">
						<span>道路运输从业资格证</span>
					</div>
					<div class="pic_box" v-if="v.pics.lnsurance_policy">
						<img :src="v.pics.lnsurance_policy" alt="">
						<span>保险单</span>
					</div>
					<div class="pic_box" v-if="v.pics.reletive_data">
						<img :src="v.pics.reletive_data" alt="">
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
						<img :src="v.pics.businessLicense" alt="">
						<span>营业执照</span>
					</div>
					<div class="pic_box" v-if="v.pics.introductionLetter">
						<img :src="v.pics.introductionLetter" alt="">
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
						<img :src="v.pics.idcard[0]" alt="">
						<span>身份证（正）</span>
					</div>
					<div class="pic_box">
						<img :src="v.pics.idcard[1]" alt="">
						<span>身份证（反）</span>
					</div>
					<div class="pic_box">
						<img :src="v.pics.idcard[2]" alt="">
						<span>手持身份证照片</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="no" v-if="show">
			<img src="../../static/img/warning.png" alt="">
			<span>暂没有此通行证的详情内容</span>
		</div>
		<div class="load" v-if="load">
			<van-loading type="spinner" color="white" />
		</div>
	</div>
</template>

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
		Dialog
	} from 'vant'

	export default {
		data() {
			return {
				text: '通行证详情',
				active: 0,
				list: [],
				clicks: true,
				hide: true,
				headImg: true,
				uid: '',
				show: '',
				load: false
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
		},
		methods: {
			init() {
				this.card = this.$route.params.platesNumber
				let self = this
				this.load = true
				let datas = {
					platesNumber: this.card
				}
				Request.postRequest('api/licence/tPermit/selectByPlateNumber1', datas).then(res => {
					if (res.data.success == true) {
						if (res.data.body.permits.length > 0) {
							console.log(res)
							self.show = false
							self.load = false
							for(let i=0;i<res.data.body.permits.length;i++){
								self.list.push(res.data.body.permits[i])
							}
						}else{
							self.show = true
							self.load = false
						}
					}
				}).catch(res => {
					console.log(res)
					self.show = true
					self.load = false
				})
			},
			dataURLToBlob(dataurl) { //ie 图片转格式
				var arr = dataurl.split(','),
					mime = arr[0].match(/:(.*?);/)[1],
					bstr = atob(arr[1]),
					n = bstr.length,
					u8arr = new Uint8Array(n);
				while (n--) {
					u8arr[n] = bstr.charCodeAt(n);
				}
				return new Blob([u8arr], {
					type: mime
				})
			},
			downloadResult(name) {
				let canvasID = document.body
				let a = document.createElement('a')
				html2canvas(canvasID).then(canvas => {
					let dom = document.body.appendChild(canvas)
					dom.style.display = "none"
					a.style.display = "none"
					document.body.removeChild(dom)
					let blob = this.dataURLToBlob(dom.toDataURL("image/png"))
					a.setAttribute("href", URL.createObjectURL(blob))
					a.setAttribute("download", name + ".png")
					document.body.appendChild(a)
					a.click()
					URL.revokeObjectURL(blob)
					document.body.removeChild(a)
				});
			},
			printOut(name) {
				var self = this
				// 个人观察只是截取可见范围以及以下的区域，所以先将滚动条置顶
				$(window).scrollTop(0) // jQuery 的方法
				document.body.scrollTop = 0 // IE的
				document.documentElement.scrollTop = 0 // 其他
				this.downloadResult(name)
				setTimeout(function() {
					self.hide = true
					self.headImg = true
				}, 800)
			},
			goImg() {
				this.hide = false
				this.headImg = false
				this.printOut('detail')
			},
			back() {
				this.$router.go(-1)
			},
			del() {
				let self = this
				var id = this.$route.params.id
				Dialog.confirm({
					title: '删除',
					message: '确认删除此通行证详情吗'
				}).then(() => {
					let datas = {
						uid: self.uid,
						id: id
					}
					Request.postRequest('api/licence/tPermit/delete', datas).then(res => {
						console.log(res)
						if (res.data.success == true) {
							Toast('删除成功')
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
	.step {
		width: 100%;
		padding: 0 0.6rem;
		box-sizing: border-box;
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
	
	.no {
		width: 80%;
		height: 6rem;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -40%;
		margin-top: -3rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.no img {
		width: 40%;
	}
	
	.no span {
		font-size: 15px;
		margin-top: 0.8rem;
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
