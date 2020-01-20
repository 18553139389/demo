<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">名片详情</block>
				<block slot="right" v-if="show">
					<view @tap="goEditor">编辑</view>
				</block>
			</cu-custom>
		</view>
		<view class="forms">
			<img class="imgs" :src="head == '' ? 'http://pic13.nipic.com/20110409/7119492_114440620000_2.jpg' : head"
			 alt="">
			<view class="form-item">
				<view class="items">
					<view>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</view>
					<input type="text" v-model="user" placeholder="请输入姓名" placeholder-class="place" disabled>
				</view>
				<view class="items">
					<view>公司名称：</view>
					<input style="width: 70%;" type="text" v-model="company" placeholder="请输入公司名称" placeholder-class="place" disabled>
				</view>
				<view class="items">
					<view>联系方式：</view>
					<input type="text" v-model="tel" placeholder="请输入联系方式" placeholder-class="place" disabled>
				</view>
				<view class="items">
					<view>微&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;信：</view>
					<input type="text" v-model="wx" placeholder="请输入微信号" placeholder-class="place" disabled>
				</view>
				<view class="items">
					<view>行&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业：</view>
					<input type="text" v-model="work" placeholder="请输入所属行业" placeholder-class="place" disabled>
				</view>
				<view class="items" @tap="openPicker">
					<view>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区：</view>
					<input type="text" v-model="section" placeholder="请选择所属地区" placeholder-class="place" disabled>
				</view>
				<view class="contents">
					<view class="user_msg">公司简介</view>
					<view class="msg">
						<textarea v-model="text1" placeholder="公司简介" placeholder-class="places" disabled></textarea>
					</view>
				</view>
				<view class="contents" style="padding-top: 0;">
					<view class="user_msg">个性签名</view>
					<view class="msg">
						<textarea v-model="text2" placeholder="个性签名" placeholder-class="places" disabled></textarea>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		ajaxs
	} from '../../common/js/util.js'
	import {
		Toast
	} from 'vant'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF',
				head: '',
				user: '',
				company: '',
				tel: '',
				wx: '',
				work: '',
				section: '',
				text1: '',
				text2: '',
				show: true,
				type: null,
				list: {}
			}
		},
		onLoad(options) {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
			this.type = options.type
			if(options.list != 'undefined'){
				this.list = JSON.parse(options.list)
			}
		},
		onShow() {
			let self = this
			if(this.type == 0){
				this.init1()
			}else{
				let list = this.list
				self.show = false
				self.head = list.icon
				self.user = list.username
				self.company = list.company
				self.tel = list.phone
				self.wx = list.weixin
				self.work = list.industry
				self.section = list.city
				self.text1 = list.content
				self.text2 = list.introduction
			}
		},
		methods: {
			getRequest(variable) {
				var query = window.location.search.substring(1);
				var vars = query.split("&");
				for (var i = 0; i < vars.length; i++) {
					var pair = vars[i].split("=");
					if (pair[0] == variable) {
						return pair[1];
					}
				}
				return (false);
			},
			init1() {
				let self = this
				let datas = {
					uid: this.$store.state.uid
				}
				let data = {
					url: '/api/gzh/userCard',
					data: datas,
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							self.head = res.data.icon
							self.user = res.data.username
							self.company = res.data.company
							self.tel = res.data.phone
							self.wx = res.data.weixin
							self.work = res.data.industry
							self.section = res.data.city
							self.text1 = res.data.content
							self.text2 = res.data.introduction
						}
					}
				}
				ajaxs(data)
			},
			goEditor() {
				uni.navigateTo({
					url: '../cardsEditor/cardsEditor'
				})
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		background: #FFFFFF;
	}

	.contain {
		width: 100%;
		height: 100%;
	}

	.forms {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 0 30upx 110upx;
		box-sizing: border-box;
		align-items: center;
	}

	.imgs {
		width: 160upx;
		height: 160upx;
		border-radius: 50%;
		overflow: hidden;
		margin: 30upx 0 50upx;
	}

	.form-item {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.items {
		width: 100%;
		height: 90upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px dashed #eee;
		font-size: 14px;
		color: #333;
	}

	.place {
		font-size: 14px;
		color: #999;
	}

	.places {
		font-size: 12px;
		color: #999;
	}

	input {
		text-align: right;
	}
	
	.contents {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 50upx 0 25upx;
	}
	
	.user_msg {
		width: 100%;
		height: 40upx;
		line-height: 40upx;
		font-size: 14px;
		color: #333;
		padding-left: 20upx;
		border-left: 2px solid #DE2910;
	}
	
	.msg {
		width: 100%;
		height: 240upx;
		border-radius: 4px;
		background: #E3E3E6;
		margin: 30upx 0;
	}
	
	textarea {
		display: inline-block;
		width: 100%;
		height: 240upx;
		padding: 20upx;
		box-sizing: border-box;
		font-size: 12px;
		color: #333;
	}
</style>
