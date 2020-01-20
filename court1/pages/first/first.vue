<template>
	<view class="contain">
		<view class="item" @tap="goEducation">
			<img src="https://24h.haisongzi.com/userfiles//共享文档/images/cover/self-edu.jpg" alt="">
			<view style="margin-top: 30upx;">自护教育</view>
		</view>
		<view class="items" @tap="goSchool">
			<img src="https://24h.haisongzi.com/userfiles//共享文档/images/cover/compl-school.jpg" alt="">
			<view style="margin-top: 30upx;">校园及周边投诉</view>
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
					url: '../education/education'
				})
			},
			goSchool() {
				uni.navigateTo({
					url: '../school/school'
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
		height: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 14px;
		color: #333;
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
