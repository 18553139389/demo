<template>
	<view class="contain">
		<view class="item" @tap="goEducation">
			<img src="https://24h.haisongzi.com/userfiles//共享文档/images/cover/law-paper.jpg" alt="">
			<view style="margin-top: 30upx;">律师预约</view>
		</view>
		<view class="items" @tap="goSchool">
			<img src="https://24h.haisongzi.com/userfiles//共享文档/images/cover/law-record.jpg" alt="">
			<view style="margin-top: 30upx;">案件卷宗刻录预约</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goEducation() {
				uni.navigateTo({
					url: '../lvshiyuyue/lvshiyuyue'
				})
			},
			goSchool() {
				uni.navigateTo({
					url: '../keluyuyue/keluyuyue'
				})
			}
		}
	}
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		background: #fff;
		overflow: hidden;
	}
	
	.contain {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-top: 1px solid #eee;
	}
	
	.item {
		width: 100%;
		height: 45%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 14px;
		color: #333;
		/* padding-top: 10%; */
		box-sizing: border-box;
	}
	
	.item>img {
		width: 500upx;
		height: 320upx;
	}
	
	.items {
		width: 100%;
		height: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 14px;
		color: #333;
		box-sizing: border-box;
	}
	
	.items>img {
		width: 500upx;
		height: 320upx;
	}
</style>
