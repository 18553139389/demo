<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :isIcon="true" :Color="Color" :backColor="backColor" :isIcons="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">修改密码</block>
			</cu-custom>
		</view>
		<view class="list">
			<view class="pass">
				<input type="password" placeholder="请输入原支付密码" v-model="pass">
			</view>
			<view class="pass">
				<input type="password" placeholder="请输入新支付密码" v-model="newPass">
			</view>
			<view class="submit" @tap="goSubmit">确认</view>
		</view>
	</view>
</template>

<script>
	var md5 = require('js-md5')
	import {ajax,ajaxs} from '../../common/js/util.js'
	import {Toast} from 'vant'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF',
				pass: '',
				newPass: '',
				tel: ''
			}
		},
		onLoad(option) {
			
		},
		methods: {
			goSubmit() {
				let self = this
				if(this.pass == '' || this.newPass == ''){
					Toast('密码不能为空')
					return
				}
				
				var reg=new RegExp("^[0-9]{6}$")
				if(!reg.test(this.pass) || !reg.test(this.newPass)){
					Toast('密码必须为6位且是数字')
					return
				}
				
				let datas = {
					url: '/api/gzh/editPayPassword',
					data: {
						uid: this.$store.state.uid,
						oldPayPassword: md5.hex(this.pass),
						newPayPassword: md5.hex(this.newPass)
					},
					success: function(res) {
						if(res.data.result == 0){
							Toast('修改成功')
							uni.navigateBack({
								delta: 1
							})
						}else{
							Toast(res.data.resultNote)
						}
					}
				}
				
				ajaxs(datas)
				
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		background: #F8F8F8;
	}
	
	.contain {
		width: 100%;
		height: 100%;
	}
	
	.list {
		width: 100%;
		padding: 30upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}
	
	.submit {
		width: 80%;
		height: 90upx;
		line-height: 90upx;
		border-radius: 60upx;
		background: #DE2910;
		text-align: center;
		font-size: 14px;
		color: #fff;
		margin: 60upx auto 0;
	}
	
	.pass {
		width: 100%;
		height: 90upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #eee;
	}
</style>
