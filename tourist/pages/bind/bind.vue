<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">绑定会员卡</block>
				<block slot="right"></block>
			</cu-custom>
		</view>
		<view class="produce">
			<p>请填写线下会员实体卡信息，一经绑定不可取消</p>
		</view>
		<view class="message">
			<view class="user_msg">实体卡信息</view>
			<view class="cu-form-group">
				<view class="title">姓名</view>
				<input placeholder="请输入您的姓名" name="input" v-model="user"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">手机</view>
				<input placeholder="请输入开卡手机" name="input" v-model="tel"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">会员卡号</view>
				<input placeholder="请输入会员卡号" name="input" v-model="card"></input>
			</view>
		</view>
		<view class="bind_card">
			<view class="card_btn" @tap="bindCard">绑定会员卡</view>
		</view>
		<model :show="show" @confirm="close" title="绑卡成功" content="可在线上享受会员卡同等特权" :show-cancel="false"></model>
	</view>
</template>

<script>
	import model from '../../components/model/model.vue'
	import {ajax} from '../../common/js/util.js'
	import {Toast} from 'vant'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF',
				show: false,
				tel: '',
				user: '',
				card: ''
			}
		},
		components: {
			model,
			Toast
		},
		onLoad() {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
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
			bindCard() {
				if (this.user == '') {
					Toast('姓名不能为空')
					return
				}

				if (this.tel == '') {
					Toast('手机号不能为空')
					return
				} else if (!(/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.tel))) {
					Toast('手机号格式不正确')
					return
				}

				if (this.card == '') {
					Toast('会员卡号不能为空')
					return
				}

				let self = this
				let datas = {
					url: '/api/gzh/bindCard',
					data: {
						uid: this.$store.state.uid,
						cardId: this.card,
						username: this.user,
						phone: this.tel
					},
					success: function(res) {
						console.log(res)
						if (res.data.result == 0) {
							self.show = true
						} else {
							Toast(res.data.resultNote)
						}
					},
					fail: function(res) {
						uni.showToast({
							title: res.data.resultNote,
							icon: 'none'
						});
					}
				}
				ajax(datas)
			},
			close() {
				uni.navigateBack({
				    delta: 1
				})
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
	}

	.contain {
		width: 100%;
		height: 100%;
		background: #F8F8F8;
		position: relative;
	}

	.produce {
		width: 100%;
		padding: 20upx 30upx;
		display: flex;
		box-sizing: border-box;
		/* border-bottom: 2px solid #eee;
		border-top: 2px solid #eee; */
	}

	.produce>p {
		font-size: 12px;
		color: #999;
		text-align: justify;
	}

	.message {
		width: 90%;
		padding: 30upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		font-size: 14px;
		color: #333;
		/* border-bottom: 2px solid #eee; */
		margin: 0 auto;
		border-radius: 4px;
		background: #fff;
	}

	.user_msg {
		width: 100%;
		height: 40upx;
		line-height: 40upx;
		/* border-bottom: 1px solid #eee; */
		font-size: 15px;
		color: #333;
		padding-left: 20upx;
		border-left: 2px solid #DE2910;
		margin-bottom: 20upx;
	}

	.cu-form-group {
		padding: 0 0 0 20upx !important;
		min-height: 90upx !important;
		border: none !important;
	}

	.cu-form-group>input {
		background: #F8F8F8;
		padding: 0 20upx;
		height: 60upx;
	}

	.title {
		width: 160upx;
	}

	.bind_card {
		width: 80%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 160upx auto 0;
	}

	.card_btn {
		width: 100%;
		border-radius: 4px;
		/* border: 1px solid #eee; */
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		font-size: 15px;
		color: #fff;
		background: #DE2910;
	}
</style>
