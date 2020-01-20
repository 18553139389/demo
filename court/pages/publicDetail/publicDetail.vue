<template>
	<view class="contain">
		<view class="list">
			<view class="tit">举报人信息</view>
			<view class="forms">
				<view class="form-item">
					<view>姓名</view>
					<view>{{list.cname}}</view>
				</view>
				<view class="form-item" @tap="shows">
					<view>是否匿名</view>
					<view v-if="list.anonymous == 1">是</view>
					<view v-if="list.anonymous == 0">否</view>
				</view>
				<view class="form-item">
					<view>身份证号</view>
					<view>{{list.idnum}}</view>
				</view>
				<view class="form-item">
					<view>联系电话</view>
					<view>{{list.telnum}}</view>
				</view>
				<view class="form-item">
					<view>联系地址</view>
					<view>{{list.address}}</view>
				</view>
			</view>
			<view class="tit" style="margin-top: 30upx;">举报事项</view>
			<view class="content">
				<view class="text">{{list.content}}</view>
			</view>
			<view class="tit">其它补充材料</view>
			<view class="content">
				<view class="imgs" v-for="(v,k) in imageData" :key="k">
					<img :src="url+v" alt="">
				</view>
			</view>
			<view class="maps">
				<img src="../../static/img/weizhi.png" alt="">
				<view style="margin-left: 30upx;">{{list.location}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {ajax} from '../../common/js/util.js'
	import toast from '../../common/js/toast.js'
	import global_ from '../../common/js/global.js'
	export default {
		data() {
			return {
				show: false,
				radio: 0,
				user: '',
				card: '',
				tel: '',
				address: '',
				content: '',
				location: '',
				imageData: [],
				list: {},
				url: global_.baseUrl
			}
		},
		onLoad(option) {
			this.init(option.id)
		},
		methods: {
			init(id) {
				let self = this
				let datas = {
					id: id
				}
				toast.showLoading('加载中...')
				let data = {
					url: '/complSchool/detail',
					data: datas,
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: function(res) {
						console.log(res)
						if (res.data.success == true) {
							toast.hideLoading()
							self.list = res.data.body
							if(self.list.anonymous == 1){
								self.list.cname = '****'
							}
							self.imageData = res.data.body.material
							self.imageData = self.imageData.split('|')
						}
					}
				}
				ajax(data)
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		background: #fff;
	}

	.contain {
		width: 100%;
		display: flex;
		flex-direction: column;
		border-top: 1px solid #eee;
		padding: 30upx 0;
	}

	.list {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.tit {
		width: 100%;
		height: 32upx;
		line-height: 32upx;
		position: relative;
		font-size: 14px;
		color: #3175E4;
		padding: 0 30upx 0 50upx;
	}

	.tit::after {
		content: '';
		position: absolute;
		left: 30upx;
		top: 0;
		width: 3px;
		height: 32upx;
		background: #3175E4;
		border-radius: 4px;
	}

	.forms {
		width: 100%;
		display: flex;
		flex-direction: column;
		border-bottom: 4px solid #eee;
		padding: 0 30upx;
		box-sizing: border-box;
	}

	.form-item {
		width: 100%;
		height: 84upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16upx 0;
		border-bottom: 1px solid #eee;
		font-size: 14px;
		color: #333;
		box-sizing: border-box;
	}
	
	.form-item:last-of-type {
		border-bottom: none;
	}

	.content {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
	}
	
	.imgs {
		width: 160upx;
		height: 160upx;
		margin: 10upx 20upx;
		border-radius: 4px;
		overflow: hidden;
	}
	
	.imgs>img {
		width: 100%;
		height: 100%;
	}
	
	.text {
		width: 100%;
		border: 1px solid #eee;
		border-radius: 4px;
		padding: 20upx;
		box-sizing: border-box;
		font-size: 12px;
		color: #333;
		text-align: justify;
	}
	
	.maps {
		width: 100%;
		height: 50upx;
		display: flex;
		align-items: center;
		font-size: 14px;
		color: #333;
		padding: 0 30upx;
		box-sizing: border-box;
	}
	
	.maps>img {
		width: 28upx;
		height: 39upx;
	}
	
	.submit {
		width: 80%;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		font-size: 14px;
		color: #fff;
		border-radius: 4px;
		background: #007AFF;
		margin: 30upx auto 0;
	}
</style>
