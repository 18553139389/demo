<template>
	<div id="contain">
		<template v-if="headImg">
			<main-header :text="text" @back="back"></main-header>
		</template>
		<div class="msg">
			<h3 class="title">通行证信息</h3>
			<img class="wait" src="../../static/img/yitongg.jpg" alt="">
			<ul class="content">
				<li class="content_list" v-if="obj.categoryName">
					<span>通行证类型：</span>
					<p>{{obj.categoryName}}</p>
				</li>
				<li class="content_list" v-if="obj.platesCategory">
					<span>号牌种类：</span>
					<p>{{obj.platesCategory}}</p>
				</li>
				<li class="content_list" v-if="obj.platesNumber">
					<span>车牌号：</span>
					<p>{{obj.platesNumber}}</p>
				</li>
				<!-- <li class="content_list" v-if="v.pics.car_pic.length > 0">
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
				</li> -->
				<li class="content_list" v-if="obj.operateType">
					<span>运营类型：</span>
					<p>{{obj.operateType}}</p>
				</li>
				<li class="content_list" v-if="obj.carriedGoodsName">
					<span>运送货物名称：</span>
					<p>{{obj.carriedGoodsName}}</p>
				</li>
				<!-- <li class="content_list" v-if="v.effectiveDays">
					<span>通行证有效期：</span>
					<p>{{v.effectiveDays}}天</p>
				</li> -->
				<li class="content_list" v-if="obj.routesPassage">
					<span>通行路线：</span>
					<p>{{obj.routesPassage}}</p>
				</li>
				<li class="content_list" v-if="obj.carSb">
					<span>通行区域：</span>
					<p>{{obj.carSb}}</p>
				</li>
				<li class="content_list" v-if="obj.timePassage">
					<span>通行时间：</span>
					<p>{{obj.timePassage}}</p>
				</li>
				<!-- <li class="content_list" v-if="v.destination">
					<span>目的地：</span>
					<p>{{v.destination}}</p>
				</li> -->
				<!-- <li class="content_list" v-if="v.office.name">
					<span>区域审核单位：</span>
					<p>{{v.office.name}}</p>
				</li> -->
				<li class="content_list">
					<span>通行证开始日期：</span>
					<p>{{obj.startDate}}</p>
				</li>
				<li class="content_list">
					<span>通行证结束日期：</span>
					<p>{{obj.endDate}}</p>
				</li>
				<!-- <li class="content_list" v-if="v.pics.driving_y || v.pics.driver_licence">
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
				</li> -->
				<li class="content_list" v-if="obj.applyCompanyName">
					<span style="color: #333;">公司信息</span>
				</li>
				<li class="content_list" v-if="obj.applyCompanyName">
					<span>公司名称：</span>
					<p>{{obj.applyCompanyName}}</p>
				</li>
				<li class="content_list" v-if="obj.compayManager">
					<span>法人：</span>
					<p>{{obj.compayManager}}</p>
				</li>
				<li class="content_list" v-if="obj.companyAddress">
					<span>公司地址：</span>
					<p>{{obj.companyAddress}}</p>
				</li>
				<li class="content_list" v-if="obj.compayPhone">
					<span>公司电话：</span>
					<p>{{obj.compayPhone}}</p>
				</li>
				<!-- <li class="picture" v-if="v.pics.businessLicense || v.pics.introductionLetter">
					<div class="pic_box" v-if="v.pics.businessLicense">
						<img :src="v.pics.businessLicense" alt="">
						<span>营业执照</span>
					</div>
					<div class="pic_box" v-if="v.pics.introductionLetter">
						<img :src="v.pics.introductionLetter" alt="">
						<span>介绍人照片</span>
					</div>
				</li> -->
				<!-- <li class="content_list" v-if="v.carOwnerName">
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
				</li> -->
			</ul>
			<div class="btn" v-if="hide">
				<!-- <div class="btn1" @click="changeMsg">变更信息</div> -->
				<div class="btn2" data-html2canvas-ignore @click="goImg">领取通行证</div>
			</div>
		</div>
		<div class="loading" v-if="loading">
			<van-loading type="spinner" />
			<span>领取中...</span>
		</div>
		<!-- <div class="load" v-if="load">
			<van-loading type="spinner" color="white" />
		</div> -->
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
				text: '车辆信息',
				active: 0,
				list: [],
				clicks: true,
				hide: true,
				headImg: true,
				uid: '',
				image: '',
				loading: false,
				load: false,
				startDate: '',
				endDate: '',
        obj: {},
        uid: ''
			}
		},
		components: {
			MainHeader,
			Step,
			Steps,
			Scroll
		},
		created() {
      this.obj = JSON.parse(this.$route.params.list)
      let ids = JSON.parse(localStorage.getItem('member'))
      this.uid = ids.id
		},
		methods: {
			goImg() {
        let self = this
        let datas = {
          uid: self.uid,
          platesNumber: this.$route.params.card,
          companyNumber: this.$route.params.nums
        }
        Request.postRequest('api/licence/tPermit/getCompanyPermit', datas).then(res => {
          console.log(res)
          if (res.data.success == true) {
            Toast('领取成功')
            setTimeout(()=>{
              this.$router.go(-1)
            },1000)
          }else{
            Toast('领取失败')
          }
        })
			},
			back() {
				this.$router.go(-1)
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

	.distance {
		padding-top: 24px !important;
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
		margin: 0.3rem 0 0.5rem;
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
