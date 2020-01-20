<template>
	<view class="contain">
		<view class="list">
			<button type="primary" open-type="getUserInfo" @getuserinfo="getuser">授权登陆</button>
		</view>
	</view>
</template>

<script>
	import {ajax} from '../../common/js/util.js'
	import toast from '../../common/js/toast.js'
	export default {
		data() {
			return {
				code: ''
			}
		},
		onLoad(option) {
			this.code = option.code
		},
		methods: {
			getuser(detail) {
				console.log(detail)
				let list = detail.mp.detail.userInfo
				let self = this
				let datas = {
					code: self.code,
					nickName: list.nickName,
					avatarUrl: list.avatarUrl,
					gender: list.gender
				}
				toast.showLoading('加载中...')
				let data = {
					url: '/user/login',
					data: datas,
					header: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					success: function(res) {
						console.log(res)
						if (res.data.success == true) {
							toast.hideLoading()
							uni.setStorageSync('uid', res.data.body.uid)
							uni.switchTab({
								url: '/pages/index/index'
							})
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
		height: 100%;
		background: #fff;
	}
	
	.contain {
		width: 100%;
		height: 100%;
		border-top: 1px solid #eee;
	}
	
	.list {
		width: 100%;
		height: 100%;
		display: flex;justify-content: center;
		align-items: center;
	}
</style>
