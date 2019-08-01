<template>
	<div class="auther">
		<div class="userImg">
			<img src="../../../static/img/logobig.png" alt="">
		</div>
		<div class="btn">
			<button open-type="getUserInfo" @getuserinfo="getUser">一键授权</button>
		</div>
		<mp-toast type="success" v-model="validateSuc" content="授权成功" duration="1500"></mp-toast>
	</div>
</template>

<script>
	import mpToast from 'mpvue-weui/src/toast'
	
	export default {
		data() {
			return {
				validateSuc: false
			}
		},
		components: {
			mpToast
		},
		methods: {
			getUser(msg) {
				this.$router.go(-1)
			}
		}
	}
</script>

<style lang="scss">
	.auther {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		text-align: center;

		.userImg {
			width: 100px;
			height: 100px;
			border-radius: 50%;
			margin-top: 40%;

			img {
				width: 100%;
				height: 100%;
				border-right: 50%;

			}
		}

		.btn {
			button {
				width: 200px;
				height: 40px;
				background: #1BA160;
				font-size: 16px;
				color: #fff;
				line-height: 40px;
				margin-top: 30px;
			}
		}
	}
</style>
