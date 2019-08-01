<template>
	<div class="list" v-cloak>
		<main-header :text="text" @back="back"></main-header>
		<div class="store">
			<div class="wrapper">
				<div class="content">
					<textarea placeholder="请留下您宝贵的意见" v-model="value"></textarea>
				</div>
				<div class="submit" @click="submit">提交</div>
			</div>
		</div>
		<dialogs :data1="data1" :data2="data2" :showDialog="showDialog" @hide="hide"></dialogs>
	</div>
</template>

<script>
import MainHeader from '@/components/component/mainHeader'
import { Toast, Dialog } from 'vant'
import Request from '@/common/js/request'
import Dialogs from '@/components/component/dialogs'

export default {
	data() {
		return {
			text: '意见反馈',
			data1: '感谢您的宝贵意见',
			data2: '知道了',
			showDialog: false,
			value: '',
			cid: ''
		}
	},
	created() {
		this.cid = JSON.parse(localStorage.getItem('user')).cid
	},
	components: {
		MainHeader,
		Dialogs
	},
	mounted() {
    var first = null;
    mui.back = function() {
      if (!first) {
        window.history.go(-1);
        first = new Date().getTime();
        setTimeout(function() {
          first = null;
        }, 1000);
      } else {
        if (new Date().getTime() - first < 1000) {
          plus.runtime.quit();
        }
      }
    };
  },
	methods: {
		back() {
			this.$router.go(-1)
		},
		submit() {
			let self = this

			if (this.value == '') {
				Toast('反馈不能为空')
				return
			}

			if (this.value.length > 120) {
				Toast('内容长度不能超过120个字')
				return
			}
			let datas = {
				cmd: 'feedback',
				cid: this.cid,
				content: this.value
			}
			console.log(datas)
			Request.postRequest(datas).then(res => {
				console.log(res.data)
				if (res.data.result == 0) {
					self.showDialog = true
					self.clear()
				}else if(res.data.result == "2"){
              this.$router.push("/fenghao");
            }
			}).catch(res => {
				Toast(res.data.resultNote)
			})
		},
		clear() {
			this.value = ''
		},
		hide() {
			this.showDialog = false
			this.$router.go(-1)
		}
	}
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	[v-cloak] {
		display: none !important;
	}
	
	.list
		width: 100%
		height: 100%
		.store
			width: 100%
			display: flex
			flex-direction: column
			padding-top: 72px
			.wrapper
				width: 100%
				display: flex
				flex-direction: column
				border-top: 1px solid #eee
				padding: 0.5rem 0.4rem
				box-sizing: border-box
				.content
					width: 100%
					border: 1px solid #eee
					border-radius: 6px
					padding: 0.3rem
					box-sizing: border-box
					font-size: 14px
					color: #333
					textarea
						width: 100%
						height: 3rem
						resize: none
						border: none
				.submit
					width: 100%
					height: 1rem
					display: flex
					align-items: center
					justify-content: center
					background: rgb(114,209,65)
					font-size: 14px
					color: #fff
					border-radius: 6px
					margin: 1rem auto 0
</style>
