<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">日历</block>
			</cu-custom>
		</view>
		<!-- <reserve-date @changeDay='changeDay' :startDate="startDate" :disableBefore="false" /> -->
		<Calendar :initMonthCount="12" :allAbled="false" :themeColor="'#DE2910'"
		 @callback="setTime"></Calendar>
	</view>
</template>

<script>
	import reserveDate from '../../components/select-date/select-date.vue'
	import Calendar from '../../components/mobileDate/mobileDate.vue'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#F8F8F8',
				price: {
					type: true
				},
				type: 0,
				startDate: ''
			}
		},
		onLoad(option) {
			//刷新保留用户uid
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
			this.type = option.type
			if(this.type == 1){
				this.startDate = this.$store.state.priceDate1
				console.log(this.startDate)
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
			changeDay(data) {
				let year = data[0].all
				console.log(data)
				let s = data[0].date
				//把月份格式化显示
				let str = s.substr(0, s.indexOf('-'))
				str = parseInt(str) > 9 ? str : '0' + str
				str = str + s.substr(s.indexOf('-'))
				console.log(str)
				//把整个时间格式化提交给后台需要的格式
				let year1 = this.dateFtt('yyyy/MM/dd',new Date(year))
				if (this.type == 0) {
					this.$store.commit('changeDate', str)
					this.$store.commit('changeDay', this.getDay(new Date(year).getDay()))
					this.$store.commit('changeSingleStart', year1)
					this.$store.commit('changePrice', year)
					this.$store.commit('changeInit', year)
				} else if (this.type == 1) {
					this.$store.commit('changeDate2', str)
					this.$store.commit('changeDay2', this.getDay(new Date(year).getDay()))
					this.$store.commit('changeDoubleEnd', year1)
					this.$store.commit('changePrice2', year)
					this.$store.commit('changeInit2', year)
				} else if (this.type == 3) {
					this.$store.commit('changeInit', data[0].all)
					this.$store.commit('changeSingleStart', year1)
					this.$store.commit('changePrice', year)
					this.$store.commit('changeDate', str)
					this.$store.commit('changeDay', this.getDay(new Date(year).getDay()))
				}
				uni.navigateBack({
					delta: 1,
					animationType: 'slide-in-right',
					animationDuration: 500
				})
			},
			setTime(val) {
				console.log(val)
				let year = val.dateStr
				let year1 = this.dateFtt('yyyy/MM/dd',new Date(year))
				let str = val.date.month + '-' + val.date.day
				if (this.type == 0) {
					this.$store.commit('changeDate', str)
					this.$store.commit('changeDay', this.getDay(new Date(year).getDay()))
					this.$store.commit('changeSingleStart', year1)
					this.$store.commit('changePrice', year)
					this.$store.commit('changeInit', year)
				} else if (this.type == 1) {
					this.$store.commit('changeDate2', str)
					this.$store.commit('changeDay2', this.getDay(new Date(year).getDay()))
					this.$store.commit('changeDoubleEnd', year1)
					this.$store.commit('changePrice2', year)
					this.$store.commit('changeInit2', year)
				} else if (this.type == 3) {
					this.$store.commit('changeInit', year)
					this.$store.commit('changeSingleStart', year1)
					this.$store.commit('changePrice', year)
					this.$store.commit('changeDate', str)
					this.$store.commit('changeDay', this.getDay(new Date(year).getDay()))
				}
				uni.navigateBack({
					delta: 1,
					animationType: 'slide-in-right',
					animationDuration: 500
				})
			},
			dateFtt(fmt, date) {
				var o = {
					"M+": date.getMonth() + 1, //月份   
					"d+": date.getDate(), //日   
					"h+": date.getHours(), //小时   
					"m+": date.getMinutes(), //分   
					"s+": date.getSeconds(), //秒   
					"q+": Math.floor((date.getMonth() + 3) / 3), //季度   
					"S": date.getMilliseconds() //毫秒   
				}
				if (/(y+)/.test(fmt))
					fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
				for (var k in o)
					if (new RegExp("(" + k + ")").test(fmt))
						fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
				return fmt
			},
			getDay(day) {
				switch (day) {
					case 0:
						day = "星期天"
						break
					case 1:
						day = "星期一"
						break
					case 2:
						day = "星期二"
						break
					case 3:
						day = "星期三"
						break
					case 4:
						day = "星期四"
						break
					case 5:
						day = "星期五"
						break
					case 6:
						day = "星期六"
				}
				return day
			}
		},
		components: {
			reserveDate,
			Calendar
		}
	}
</script>

<style>
	.contain {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}
	
	uni-page-body {
		background: #FFFFFF;
		overflow: auto !important;
	}
</style>
