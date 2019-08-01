<template>
	<view class="contain">
		<view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white"
			 @Back="Back">
				<block slot="backText"></block>
				<block slot="content">日历</block>
			</cu-custom>
		</view>
		<Calendar :startDate="start" :endDate="end" :initMonthCount="12" :allAbled="false" :mode="2" :themeColor="'#DE2910'"
		 @callback="setTime"></Calendar>
	</view>
</template>

<script>
	import Calendar from '../../components/mobileDate/mobileDate.vue'
	export default {
		data() {
			return {
				Color: '#DE2910',
				value: '',
				backColor: '#FFFFFF',
				start: '',
				end: ''
			}
		},
		components: {
			Calendar
		},
		onLoad() {
			if (this.getRequest('uid')) {
				var uids = this.getRequest('uid')
				this.$store.commit('changeUid', uids)
			}
			let myDate = new Date()
			var m = myDate.getMonth() + 1
			var d = myDate.getDate()
			this.start = this.dateFtt('yyyy-MM-dd', myDate)
			this.end = this.getDateStr(3)
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
			setTime(obj) {
				this.$store.commit('changeDate1', obj.startDate.month + '-' + obj.startDate.day)
				this.$store.commit('changeDay1', '周' + obj.startDate.week)
				this.$store.commit('changeDate2', obj.endDate.month + '-' + obj.endDate.day)
				this.$store.commit('changeDay2', '周' + obj.endDate.week)
				this.$store.commit('changeDoubleStart', obj.startDateStr)
				this.$store.commit('changeInit1', obj.startDateStr)
				this.$store.commit('changePrice1', obj.startDateStr)
				this.$store.commit('changeDoubleEnd', obj.endDateStr)
				this.$store.commit('changeInit2', obj.endDateStr)
				this.$store.commit('changePrice2', obj.endDateStr)
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
			getDateStr(AddDayCount) {
				var dd = new Date()
				dd.setDate(dd.getDate() + AddDayCount) //获取AddDayCount天后的日期
				var y = dd.getFullYear()
				var m = dd.getMonth() + 1 //获取当前月份的日期
				var d = dd.getDate()
				return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d)
			}
		},

	}
</script>

<style>
	.contain {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}
</style>
