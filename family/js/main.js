Vue.component('navBar', {
	template: '<van-tabbar v-model="active" active-color="#47c6fb" @change="goUrl(active)" fixed="true" z-index="15">' +
		'<van-tabbar-item>' +
		'<span>首页</span>' +
		'<img slot="icon" slot-scope="props" :src="props.active ? \'./images/icon1_light.png\' : \'./images/icon1.png\'">' +
		'</van-tabbar-item>' +
		'<van-tabbar-item>' +
		'<span>资讯</span>' +
		'<img slot="icon" slot-scope="props" :src="props.active ? \'./images/icon2_light.png\' : \'./images/icon2.png\'">' +
		'</van-tabbar-item>' +
		'<van-tabbar-item>' +
		'<span>宝贝在线</span>' +
		'<img slot="icon" slot-scope="props" :src="props.active ? \'./images/icon3_light.png\' : \'./images/icon3.png\'">' +
		'</van-tabbar-item>' +
		'<van-tabbar-item>' +
		'<span>我的</span>' +
		'<img slot="icon" slot-scope="props" :src="props.active ? \'./images/icon4_light.png\' : \'./images/icon4.png\'">' +
		'</van-tabbar-item>' +
		'</van-tabbar>' +
		'<div id="bg" class="bg">' +
		'<div id="loading" class="loading">' +
		'<img src="./images/loading.gif" alt="" />' +
		'</div>' +
		'</div>',
	props:{
		active:{
			type:Number,
			default:0
		}
	},
	methods: {
		goUrl: function(item) {
			this.$emit('choice',item)
		}
	}
});